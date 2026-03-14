"use client";

// ─────────────────────────────────────────────
// components/screenComponents/Admin/site-editor/components/sections/SectionEditor.tsx
// ─────────────────────────────────────────────

import { useState, useEffect } from "react";
import { CheckCircle2, RefreshCw, Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { FieldRenderer } from "./FieldRenderer";
import { ListField } from "./ListField";
import { FieldValue, ListItemValue, SectionDef, SectionState } from "./types";

interface SectionEditorProps {
  section: SectionDef;
  data: Record<string, FieldValue>;
  sectionState: SectionState;
  onSave: (
    sectionId: string,
    data: Record<string, FieldValue>,
  ) => Promise<void>;
  onDataChange: (sectionId: string, data: Record<string, FieldValue>) => void;
}

const STATUS_BADGE: Record<
  SectionState["status"],
  { label: string; style: string }
> = {
  published: {
    label: "Published",
    style: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  draft: {
    label: "Draft",
    style: "bg-amber-50 text-amber-700 border-amber-200",
  },
  modified: {
    label: "Unsaved changes",
    style: "bg-sky-50 text-sky-700 border-sky-200",
  },
};

export function SectionEditor({
  section,
  data,
  sectionState,
  onSave,
  onDataChange,
}: SectionEditorProps) {
  const [localData, setLocalData] = useState<Record<string, FieldValue>>(data);
  const [saving, setSaving] = useState(false);
  const [savedFlash, setSavedFlash] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setLocalData(data);
    setErrors({});
  }, [section.id, data]);

  const isDirty = JSON.stringify(localData) !== JSON.stringify(data);

  const updateField = (key: string, value: FieldValue) => {
    const next = { ...localData, [key]: value };
    setLocalData(next);
    onDataChange(section.id, next);
    if (errors[key])
      setErrors((e) => {
        const n = { ...e };
        delete n[key];
        return n;
      });
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    section.fields.forEach((f) => {
      if (f.required) {
        const v = localData[f.key];
        const empty =
          v === undefined ||
          v === null ||
          v === "" ||
          (Array.isArray(v) && v.length === 0);
        if (empty) newErrors[f.key] = `${f.label} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    setSaving(true);
    try {
      await onSave(section.id, localData);
      setSavedFlash(true);
      setTimeout(() => setSavedFlash(false), 2000);
    } finally {
      setSaving(false);
    }
  };

  const handleDiscard = () => {
    setLocalData(data);
    setErrors({});
    onDataChange(section.id, data);
  };

  const statusInfo = STATUS_BADGE[isDirty ? "modified" : sectionState.status];

  return (
    <div className="flex flex-col h-full">
      {/* ── Editor header ────────────────────── */}
      <div className="px-4 sm:px-6 pt-4 sm:pt-6 pb-4 sm:pb-5 border-b border-gray-100 shrink-0 space-y-3">
        {/* Title row */}
        <div className="flex items-start justify-between gap-3 flex-wrap sm:flex-nowrap">
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-base sm:text-lg font-semibold text-t-primary tracking-tight">
                {section.label}
              </h2>
              <Badge
                variant="outline"
                className={`text-[11px] font-medium ${statusInfo.style}`}
              >
                {statusInfo.label}
              </Badge>
            </div>
            <p className="text-xs sm:text-sm text-t-secondary mt-1">
              {section.description}
            </p>
            {sectionState.lastSaved && !isDirty && (
              <p className="text-xs text-gray-400 mt-1">
                Last saved{" "}
                {new Date(sectionState.lastSaved).toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            )}
          </div>

          {/* Save / Discard — hidden on mobile, shown in sticky footer instead */}
          <div className="hidden sm:flex gap-2 shrink-0">
            {isDirty && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleDiscard}
                className="text-gray-500 border-gray-200 hover:bg-gray-50"
              >
                <RefreshCw size={13} className="mr-1.5" />
                Discard
              </Button>
            )}
            <Button
              size="sm"
              onClick={handleSave}
              disabled={saving || (!isDirty && !savedFlash)}
              className="bg-primary-c hover:bg-primary-c/90 text-white min-w-[90px]"
            >
              {saving ? (
                <Loader2 size={13} className="animate-spin mr-1.5" />
              ) : savedFlash ? (
                <CheckCircle2 size={13} className="mr-1.5" />
              ) : (
                <Save size={13} className="mr-1.5" />
              )}
              {saving ? "Saving…" : savedFlash ? "Saved!" : "Save"}
            </Button>
          </div>
        </div>
      </div>

      {/* ── Fields ───────────────────────────── */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-5 sm:py-6 space-y-5 sm:space-y-6 pb-24 sm:pb-6">
        {section.fields.map((field) => {
          const value =
            localData[field.key] ??
            (field.type === "boolean"
              ? false
              : field.type === "list"
                ? []
                : "");

          if (field.type === "list") {
            return (
              <div key={field.key} className="space-y-2">
                <div>
                  <p className="text-sm font-medium text-t-primary">
                    {field.label}
                    {field.required && (
                      <span className="text-rose-500 ml-0.5">*</span>
                    )}
                  </p>
                  {field.hint && (
                    <p className="text-xs text-t-secondary mt-0.5">
                      {field.hint}
                    </p>
                  )}
                </div>
                <ListField
                  field={field}
                  value={(value as ListItemValue[]) ?? []}
                  onChange={(v) => updateField(field.key, v)}
                />
                {errors[field.key] && (
                  <p className="text-xs text-rose-500">{errors[field.key]}</p>
                )}
              </div>
            );
          }

          return (
            <FieldRenderer
              key={field.key}
              field={field}
              value={value as FieldValue}
              onChange={(v) => updateField(field.key, v)}
              error={errors[field.key]}
            />
          );
        })}
      </div>

      {/* ── Mobile sticky save footer ────────── */}
      <div className="sm:hidden shrink-0 px-4 py-3 border-t border-gray-100 bg-white flex gap-2">
        {isDirty && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleDiscard}
            className="text-gray-500 border-gray-200 flex-1"
          >
            <RefreshCw size={13} className="mr-1.5" />
            Discard
          </Button>
        )}
        <Button
          size="sm"
          onClick={handleSave}
          disabled={saving || (!isDirty && !savedFlash)}
          className="bg-primary-c hover:bg-primary-c/90 text-white flex-1"
        >
          {saving ? (
            <Loader2 size={13} className="animate-spin mr-1.5" />
          ) : savedFlash ? (
            <CheckCircle2 size={13} className="mr-1.5" />
          ) : (
            <Save size={13} className="mr-1.5" />
          )}
          {saving ? "Saving…" : savedFlash ? "Saved!" : "Save"}
        </Button>
      </div>
    </div>
  );
}

export function SectionEditorSkeleton() {
  return (
    <div className="px-4 sm:px-6 py-5 sm:py-6 space-y-6">
      <div className="space-y-2 pb-5 border-b border-gray-100">
        <Skeleton className="h-6 w-48 rounded" />
        <Skeleton className="h-4 w-72 rounded" />
      </div>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="space-y-1.5">
          <Skeleton className="h-4 w-24 rounded" />
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
      ))}
    </div>
  );
}
