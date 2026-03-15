"use client";

// ─────────────────────────────────────────────
// components/screenComponents/Dashboard/checkout/EditServiceSheet.tsx
// ─────────────────────────────────────────────

import { useEffect, useRef, useState } from "react";
import { CheckCircle2, ImagePlus, Loader2, Save, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { uploadImage } from "@/utils/upload";
import { UpdateProviderService } from "@/utils/services";
import { UseGen } from "@/context/GeneralContext";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const BASE_IMAGE_URL = "https://api5.project.hairxify.com";

interface EditServiceSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service: Service;
  onUpdated?: () => void;
}

// Internal form state.
// images holds the existing Image objects from the service.
// New uploads are tracked separately in newImages until saved,
// then appended as path strings (the API accepts string[] on write).
interface EditFormState {
  title: string;
  price: string;
  discount_price: string;
  duration: string;
  description: string;
  status: "active" | "inactive";
  premium: boolean;
  images: Image[]; // existing Image objects from the API
}

interface NewImageEntry {
  id: string;
  file: File;
  preview: string;
  path: string | null; // null until uploaded
  uploading: boolean;
  error: string | null;
}

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

function serviceToForm(s: Service): EditFormState {
  return {
    title: s.title,
    price: s.price,
    discount_price: s.discount_price ?? "",
    duration: s.duration,
    description: s.description,
    status: s.status ?? "active",
    premium: (s.premium ?? 0) === 1,
    images: s.images ? [...s.images] : [],
  };
}

// Returns the diff as a partial payload.
// images in the diff is string[] (path-only) because the API write
// endpoint accepts paths, not full Image objects.
function buildDiff(
  original: EditFormState,
  current: EditFormState,
  newImagePaths: string[],
): Partial<
  Omit<Service, "id" | "created_at" | "updated_at" | "images"> & {
    images: string[];
  }
> {
  type Payload = Partial<
    Omit<Service, "id" | "created_at" | "updated_at" | "images"> & {
      images: string[];
    }
  >;
  const diff: Payload = {};

  if (current.title !== original.title) diff.title = current.title;
  if (current.price !== original.price) diff.price = current.price;
  if (current.discount_price !== original.discount_price)
    diff.discount_price = current.discount_price || undefined;
  if (current.duration !== original.duration) diff.duration = current.duration;
  if (current.description !== original.description)
    diff.description = current.description;
  if (current.status !== original.status) diff.status = current.status;
  if (current.premium !== original.premium)
    diff.premium = current.premium ? 1 : 0;

  // Compare image sets: existing paths + any new paths
  const originalPaths = original.images.map((img) => img.image);
  const currentPaths = [
    ...current.images.map((img) => img.image),
    ...newImagePaths,
  ];
  if (JSON.stringify(currentPaths) !== JSON.stringify(originalPaths)) {
    diff.images = currentPaths;
  }

  return diff;
}

export function EditServiceSheet({
  open,
  onOpenChange,
  service,
  onUpdated,
}: EditServiceSheetProps) {
  const { authProvider } = UseGen();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [original, setOriginal] = useState<EditFormState>(() =>
    serviceToForm(service),
  );
  const [form, setForm] = useState<EditFormState>(() => serviceToForm(service));
  const [newImages, setNewImages] = useState<NewImageEntry[]>([]);
  const [saving, setSaving] = useState(false);
  const [savedFlash, setSavedFlash] = useState(false);

  // Re-sync when the service prop changes
  useEffect(() => {
    if (open) {
      const initial = serviceToForm(service);
      setOriginal(initial);
      setForm(initial);
      setNewImages([]);
      setSavedFlash(false);
    }
  }, [service, open]);

  // ── Dirty state ───────────────────────────
  const uploadedNewPaths = newImages
    .filter((i) => i.path !== null)
    .map((i) => i.path as string);
  const diff = buildDiff(original, form, uploadedNewPaths);
  const hasPendingUploads = newImages.some((i) => i.path === null && !i.error);
  const isDirty = Object.keys(diff).length > 0 || hasPendingUploads;
  const anyUploading = newImages.some((i) => i.uploading);

  // ── Image handling ────────────────────────
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    setNewImages((prev) => [
      ...prev,
      ...files.map((f) => ({
        id: uid(),
        file: f,
        preview: URL.createObjectURL(f),
        path: null,
        uploading: false,
        error: null,
      })),
    ]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function removeExistingImage(imageId: number) {
    setForm((f) => ({
      ...f,
      images: f.images.filter((img) => img.id !== imageId),
    }));
  }

  function removeNewImage(id: string) {
    setNewImages((prev) => prev.filter((i) => i.id !== id));
  }

  async function uploadPendingImages(): Promise<string[] | null> {
    const pending = newImages.filter((i) => i.path === null && !i.error);
    // Return already-uploaded paths if nothing left to upload
    const done = newImages
      .filter((i) => i.path !== null)
      .map((i) => i.path as string);

    if (pending.length === 0) return done;

    setNewImages((prev) =>
      prev.map((i) =>
        pending.some((u) => u.id === i.id)
          ? { ...i, uploading: true, error: null }
          : i,
      ),
    );

    const paths: string[] = [...done];
    let hasError = false;

    for (const entry of pending) {
      const result = await uploadImage(
        entry.file,
        `providers/${authProvider?.id ?? "unknown"}`,
      );
      if (result.success && result.imagePath) {
        paths.push(result.imagePath);
        setNewImages((prev) =>
          prev.map((i) =>
            i.id === entry.id
              ? { ...i, path: result.imagePath!, uploading: false }
              : i,
          ),
        );
      } else {
        hasError = true;
        setNewImages((prev) =>
          prev.map((i) =>
            i.id === entry.id
              ? { ...i, uploading: false, error: result.message }
              : i,
          ),
        );
      }
    }

    return hasError ? null : paths;
  }

  // ── Save ──────────────────────────────────
  async function handleSave() {
    if (!isDirty || saving || !service.id) return;

    setSaving(true);

    const newPaths = await uploadPendingImages();
    if (newPaths === null) {
      setSaving(false);
      toast.error("One or more images failed to upload. Try again.");
      return;
    }

    const payload = buildDiff(original, form, newPaths);

    if (Object.keys(payload).length === 0) {
      setSaving(false);
      return;
    }

    const result = await UpdateProviderService(service.id, payload);

    if (result.success) {
      setSavedFlash(true);
      setTimeout(() => setSavedFlash(false), 2500);
      // Reset baseline — keep existing Image objects, clear new uploads
      setOriginal({ ...form });
      setNewImages([]);
      toast.success("Service updated");
      onUpdated?.();
    } else {
      toast.error(result.message ?? "Failed to update service");
    }

    setSaving(false);
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md p-0 flex flex-col gap-0 overflow-hidden"
      >
        {/* ── Header ── */}
        <SheetHeader className="px-6 pt-6 pb-4 border-b shrink-0">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <SheetTitle className="text-base font-semibold truncate">
                Edit Service
              </SheetTitle>
              <SheetDescription className="text-xs text-muted-foreground mt-0.5 truncate">
                {service.title}
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

        {/* ── Scrollable fields ── */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          <SheetField label="Service Title">
            <Input
              value={form.title}
              onChange={(e) =>
                setForm((f) => ({ ...f, title: e.target.value }))
              }
              className="h-10 border-gray-200"
              disabled={saving}
            />
          </SheetField>

          <div className="grid grid-cols-2 gap-4">
            <SheetField label="Price (₦)">
              <Input
                value={form.price}
                onChange={(e) =>
                  setForm((f) => ({ ...f, price: e.target.value }))
                }
                type="number"
                min="0"
                className="h-10 border-gray-200"
                disabled={saving}
              />
            </SheetField>
            <SheetField label="Duration (mins)">
              <Input
                value={form.duration}
                onChange={(e) =>
                  setForm((f) => ({ ...f, duration: e.target.value }))
                }
                type="number"
                min="1"
                className="h-10 border-gray-200"
                disabled={saving}
              />
            </SheetField>
          </div>

          <SheetField label="Discount Price (₦)" hint="Leave empty to remove">
            <Input
              value={form.discount_price}
              onChange={(e) =>
                setForm((f) => ({ ...f, discount_price: e.target.value }))
              }
              type="number"
              min="0"
              placeholder="None"
              className="h-10 border-gray-200"
              disabled={saving}
            />
          </SheetField>

          <SheetField label="Description">
            <Textarea
              value={form.description}
              onChange={(e) =>
                setForm((f) => ({ ...f, description: e.target.value }))
              }
              rows={3}
              className="resize-none border-gray-200 text-sm"
              disabled={saving}
            />
          </SheetField>

          {/* Toggles */}
          <div className="flex gap-3">
            <div className="flex-1 flex items-center justify-between py-2.5 px-3 rounded-lg bg-gray-50 border border-gray-100">
              <div>
                <Label className="text-sm font-medium text-t-primary">
                  Active
                </Label>
                <p className="text-[11px] text-gray-400">Visible to clients</p>
              </div>
              <Switch
                checked={form.status === "active"}
                onCheckedChange={(v) =>
                  setForm((f) => ({
                    ...f,
                    status: v ? "active" : "inactive",
                  }))
                }
                disabled={saving}
                className="data-[state=checked]:bg-primary-c"
              />
            </div>
            <div className="flex-1 flex items-center justify-between py-2.5 px-3 rounded-lg bg-gray-50 border border-gray-100">
              <div>
                <Label className="text-sm font-medium text-t-primary">
                  Premium
                </Label>
                <p className="text-[11px] text-gray-400">Featured listing</p>
              </div>
              <Switch
                checked={form.premium}
                onCheckedChange={(v) => setForm((f) => ({ ...f, premium: v }))}
                disabled={saving}
                className="data-[state=checked]:bg-primary-c"
              />
            </div>
          </div>

          <Separator />

          {/* ── Images ── */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-t-primary">Images</Label>

            {/* Existing Image objects */}
            {form.images.length > 0 && (
              <div className="space-y-1.5">
                <p className="text-[11px] text-gray-400 uppercase tracking-wide font-medium">
                  Current
                </p>
                {form.images.map((img) => (
                  <div
                    key={img.id}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 border border-gray-100"
                  >
                    {/* Thumbnail */}
                    <div className="w-9 h-9 rounded-md overflow-hidden bg-gray-200 shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`${BASE_IMAGE_URL}/${img.image}`}
                        alt=""
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 truncate flex-1 font-mono">
                      {img.image.split("/").pop()}
                    </p>
                    <button
                      onClick={() => removeExistingImage(img.id)}
                      disabled={saving}
                      className="text-gray-400 hover:text-rose-500 transition-colors disabled:opacity-50 shrink-0"
                      aria-label="Remove image"
                    >
                      <X className="size-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* New uploads (local previews) */}
            {newImages.length > 0 && (
              <div className="space-y-1.5">
                <p className="text-[11px] text-gray-400 uppercase tracking-wide font-medium">
                  New uploads
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {newImages.map((img) => (
                    <div
                      key={img.id}
                      className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 bg-gray-50"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img.preview}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                      {img.uploading && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <Loader2 className="size-4 text-white animate-spin" />
                        </div>
                      )}
                      {img.path && (
                        <div className="absolute top-1 left-1 size-4 rounded-full bg-emerald-500 flex items-center justify-center">
                          <CheckCircle2 className="size-2.5 text-white" />
                        </div>
                      )}
                      {img.error && (
                        <div className="absolute inset-x-0 bottom-0 bg-rose-500/90 px-1.5 py-1">
                          <p className="text-[9px] text-white leading-tight truncate">
                            {img.error}
                          </p>
                        </div>
                      )}
                      {!img.uploading && (
                        <button
                          onClick={() => removeNewImage(img.id)}
                          disabled={saving}
                          className="absolute top-1 right-1 size-5 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                        >
                          <X className="size-3" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={saving}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg border-2 border-dashed border-gray-200 hover:border-primary-c/40 hover:bg-primary-c/3 transition-all text-gray-400 hover:text-primary-c text-sm disabled:opacity-50"
            >
              <ImagePlus className="size-4" />
              Add images
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </div>

        {/* ── Sticky footer ── */}
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
                ? "bg-primary-c hover:bg-primary-c/90 text-white"
                : "bg-gray-100 text-gray-400",
            )}
            onClick={handleSave}
            disabled={!isDirty || saving || anyUploading}
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

// ─── Shared field wrapper ─────────────────────

function SheetField({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium text-t-primary">{label}</Label>
      {children}
      {hint && <p className="text-xs text-gray-400">{hint}</p>}
    </div>
  );
}
