/* eslint-disable react-hooks/set-state-in-effect */
"use client";

// components/screenComponents/Dashboard/profile/EditProviderSheet.tsx

import { useEffect, useMemo, useState } from "react";
import { Loader2, Save, CheckCircle2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getStoredCredentials } from "@/utils/user";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { getStates, getLocal, getArea } from "@/utils/onboarding";

// ─── Types ────────────────────────────────────────────────────────────────────

interface EditProviderSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  provider: Provider;
  onUpdated: () => void;
}

interface FormState {
  first_name: string;
  last_name: string;
  business_name: string;
  phone_number: string;
  address: string;
  state: number | null;
  local: number | null;
  area: number | null;
}

function providerToForm(p: Provider): FormState {
  return {
    first_name: p.first_name,
    last_name: p.last_name,
    business_name: p.business_name,
    phone_number: p.phone_number ?? "",
    address: p.address ?? "",
    state: p.state?.id ?? null,
    local: p.local?.id ?? null,
    area: p.area?.id ?? null,
  };
}

function buildDiff(
  original: FormState,
  current: FormState,
): Record<string, unknown> {
  const diff: Record<string, unknown> = {};
  (Object.keys(current) as (keyof FormState)[]).forEach((key) => {
    if (current[key] !== original[key]) diff[key] = current[key];
  });
  return diff;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function EditProviderSheet({
  open,
  onOpenChange,
  provider,
  onUpdated,
}: EditProviderSheetProps) {
  const { token } = getStoredCredentials();

  const [original, setOriginal] = useState<FormState>(() =>
    providerToForm(provider),
  );
  const [form, setForm] = useState<FormState>(() => providerToForm(provider));
  const [saving, setSaving] = useState(false);
  const [savedFlash, setSavedFlash] = useState(false);

  // Raw location arrays — loaded once, never re-fetched
  const [allStates, setAllStates] = useState<stateData[]>([]);
  const [allLocals, setAllLocals] = useState<localData[]>([]);
  const [allAreas, setAllAreas] = useState<areaData[]>([]);
  const [locationsLoading, setLocationsLoading] = useState(false);

  // Re-sync form values when provider prop changes or sheet re-opens
  useEffect(() => {
    if (!open) return;
    const initial = providerToForm(provider);
    setOriginal(initial);
    setForm(initial);
    setSavedFlash(false);
  }, [provider, open]);

  // Fetch location data exactly once — skip if already loaded
  useEffect(() => {
    if (!open || allStates.length > 0) return;
    setLocationsLoading(true);
    Promise.all([getStates(), getLocal(), getArea()]).then(([s, l, a]) => {
      if (s.success && s.data) setAllStates(s.data);
      if (l.success && l.data) setAllLocals(l.data);
      if (a.success && a.data) setAllAreas(a.data);
      setLocationsLoading(false);
    });
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Memoised filtered lists ─────────────────────────────────────────────────
  // These only recompute when the selected state/local id actually changes,
  // NOT on every keystroke in the text fields. This is the core freeze fix.

  const filteredLocals = useMemo(() => {
    if (!form.state) return allLocals;
    return allLocals.filter((l) => {
      const row = l as unknown as Record<string, unknown>;
      // Try all common key names the API might use
      return row["state"] === form.state || row["state_id"] === form.state;
    });
  }, [allLocals, form.state]);

  const filteredAreas = useMemo(() => {
    if (!form.local) return allAreas;
    return allAreas.filter((a) => {
      const row = a as unknown as Record<string, unknown>;
      return (
        row["local"] === form.local ||
        row["local_id"] === form.local ||
        row["lga"] === form.local ||
        row["lga_id"] === form.local
      );
    });
  }, [allAreas, form.local]);

  const diff = useMemo(() => buildDiff(original, form), [original, form]);
  const isDirty = Object.keys(diff).length > 0;

  // ── Handlers ────────────────────────────────────────────────────────────────

  function update(partial: Partial<FormState>) {
    setForm((f) => ({ ...f, ...partial }));
  }

  // Cascade resets: changing state clears local+area; changing local clears area
  function handleStateChange(val: string) {
    update({ state: Number(val), local: null, area: null });
  }

  function handleLocalChange(val: string) {
    update({ local: Number(val), area: null });
  }

  async function handleSave() {
    if (!isDirty || saving) return;
    setSaving(true);
    try {
      const res = await fetch("/api/user/provider", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(diff),
      });
      const data = await res.json();
      console.log("update res:", data);
      if (!res.ok || !data.success) {
        toast.error(data.message ?? "Update failed");
      } else {
        setSavedFlash(true);
        setTimeout(() => setSavedFlash(false), 2500);
        setOriginal({ ...form });
        toast.success("Profile updated");
        onUpdated();
      }
    } catch {
      toast.error("Network error. Please try again.");
    }
    setSaving(false);
  }

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md p-0 flex flex-col gap-0 overflow-hidden"
      >
        <SheetHeader className="px-6 pt-6 pb-4 border-b shrink-0">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <SheetTitle className="text-base font-semibold">
                Edit Business Info
              </SheetTitle>
              <SheetDescription className="text-xs text-muted-foreground mt-0.5">
                Only changed fields will be saved.
              </SheetDescription>
            </div>
            {isDirty && (
              <Badge
                variant="outline"
                className="text-[10px] bg-sky-50 text-sky-700 border-sky-200 shrink-0"
              >
                Unsaved changes
              </Badge>
            )}
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          <SectionLabel>Personal Info</SectionLabel>

          <div className="grid grid-cols-2 gap-4">
            <Field label="First name">
              <Input
                value={form.first_name}
                onChange={(e) => update({ first_name: e.target.value })}
                disabled={saving}
                className="h-10 border-gray-200"
              />
            </Field>
            <Field label="Last name">
              <Input
                value={form.last_name}
                onChange={(e) => update({ last_name: e.target.value })}
                disabled={saving}
                className="h-10 border-gray-200"
              />
            </Field>
          </div>

          <Field label="Business name">
            <Input
              value={form.business_name}
              onChange={(e) => update({ business_name: e.target.value })}
              disabled={saving}
              className="h-10 border-gray-200"
            />
          </Field>

          <Field label="Phone number">
            <Input
              value={form.phone_number}
              onChange={(e) => update({ phone_number: e.target.value })}
              disabled={saving}
              placeholder="+234 800 000 0000"
              className="h-10 border-gray-200"
            />
          </Field>

          <SectionLabel>Location</SectionLabel>

          <Field label="Street address">
            <Input
              value={form.address}
              onChange={(e) => update({ address: e.target.value })}
              disabled={saving}
              placeholder="e.g. 14 Allen Avenue"
              className="h-10 border-gray-200"
            />
          </Field>

          {locationsLoading ? (
            <div className="flex items-center gap-2 text-xs text-muted-foreground py-3">
              <Loader2 className="size-3.5 animate-spin" />
              Loading locations…
            </div>
          ) : (
            <div className="space-y-4">
              <Field label="State">
                <Select
                  value={form.state?.toString() ?? ""}
                  onValueChange={handleStateChange}
                  disabled={saving}
                >
                  <SelectTrigger className="w-full h-10 bg-white border-gray-200 rounded-lg text-sm">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    {allStates.map((s) => (
                      <SelectItem key={s.id} value={s.id.toString()}>
                        {s.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field label="Local government">
                <Select
                  value={form.local?.toString() ?? ""}
                  onValueChange={handleLocalChange}
                  disabled={saving || !form.state}
                >
                  <SelectTrigger className="w-full h-10 bg-white border-gray-200 rounded-lg text-sm">
                    <SelectValue
                      placeholder={
                        form.state ? "Select LGA" : "Choose state first"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    {filteredLocals.map((l) => (
                      <SelectItem key={l.id} value={l.id.toString()}>
                        {l.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field label="Area">
                <Select
                  value={form.area?.toString() ?? ""}
                  onValueChange={(v) => update({ area: Number(v) })}
                  disabled={saving || !form.local}
                >
                  <SelectTrigger className="w-full h-10 bg-white border-gray-200 rounded-lg text-sm">
                    <SelectValue
                      placeholder={
                        form.local ? "Select area" : "Choose LGA first"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    {filteredAreas.map((a) => (
                      <SelectItem key={a.id} value={a.id.toString()}>
                        {a.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-gray-100 bg-white shrink-0 flex gap-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onOpenChange(false)}
            disabled={saving}
          >
            Cancel
          </Button>
          <Button
            className={cn(
              "flex-1 gap-1.5 transition-all",
              isDirty && !saving
                ? "bg-[#003225] hover:bg-[#003225]/90 text-white"
                : "bg-gray-100 text-gray-400",
            )}
            onClick={handleSave}
            disabled={!isDirty || saving}
          >
            {saving ? (
              <>
                <Loader2 className="size-3.5 animate-spin" />
                Saving…
              </>
            ) : savedFlash ? (
              <>
                <CheckCircle2 className="size-3.5 text-emerald-500" />
                Saved!
              </>
            ) : (
              <>
                <Save className="size-3.5" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 pt-1">
      {children}
    </p>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium text-gray-700">{label}</Label>
      {children}
    </div>
  );
}
