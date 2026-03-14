"use client";

// ─────────────────────────────────────────────
// components/screenComponents/Admin/site-editor/components/fields/FieldRenderer.tsx
//
// Renders a single field based on its FieldDef type.
// List fields are handled separately in ListField.tsx
// ─────────────────────────────────────────────

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ImageUp, Link2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { FieldDef, FieldValue } from "./types";

interface FieldRendererProps {
  field: FieldDef;
  value: FieldValue;
  onChange: (value: FieldValue) => void;
  error?: string;
}

export function FieldRenderer({
  field,
  value,
  onChange,
  error,
}: FieldRendererProps) {
  const strVal = (value as string) ?? "";
  const numVal = (value as number) ?? 0;
  const boolVal = (value as boolean) ?? false;

  const inputClass = cn(
    "h-10 border-gray-200 text-sm focus-visible:ring-primary-c/20 focus-visible:border-primary-c/40",
    error && "border-rose-300 focus-visible:ring-rose-200",
  );

  switch (field.type) {
    // ── Text ──────────────────────────────────
    case "text":
    case "richtext":
      return (
        <FieldWrapper field={field} error={error}>
          <Input
            value={strVal}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
            className={inputClass}
          />
        </FieldWrapper>
      );

    // ── Textarea ─────────────────────────────
    case "textarea":
      return (
        <FieldWrapper field={field} error={error}>
          <Textarea
            value={strVal}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
            rows={3}
            className={cn(
              "border-gray-200 text-sm resize-none focus-visible:ring-primary-c/20 focus-visible:border-primary-c/40",
              error && "border-rose-300",
            )}
          />
        </FieldWrapper>
      );

    // ── URL ───────────────────────────────────
    case "url":
      return (
        <FieldWrapper field={field} error={error}>
          <div className="relative">
            <Link2
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            <Input
              value={strVal}
              onChange={(e) => onChange(e.target.value)}
              placeholder={field.placeholder ?? "https://"}
              className={cn(inputClass, "pl-9")}
            />
          </div>
        </FieldWrapper>
      );

    // ── Image ─────────────────────────────────
    case "image":
      return (
        <FieldWrapper field={field} error={error}>
          <div className="space-y-2">
            {strVal ? (
              <div className="relative group w-full h-28 rounded-lg overflow-hidden border border-gray-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={strVal}
                  alt={field.label}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => onChange("")}
                  className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-medium"
                >
                  Remove
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center gap-2 h-24 rounded-lg border-2 border-dashed border-gray-200 hover:border-primary-c/40 hover:bg-primary-c/3 transition-all cursor-pointer text-gray-400 hover:text-primary-c">
                <ImageUp size={20} />
                <span className="text-xs">Upload image or paste URL</span>
                {/* In production: wire to your upload handler */}
                <input type="file" className="hidden" accept="image/*" />
              </label>
            )}
            <Input
              value={strVal}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Or paste image URL…"
              className={cn(inputClass, "text-xs")}
            />
          </div>
        </FieldWrapper>
      );

    // ── Color ─────────────────────────────────
    case "color":
      return (
        <FieldWrapper field={field} error={error}>
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              <input
                type="color"
                value={strVal || "#000000"}
                onChange={(e) => onChange(e.target.value)}
                className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer p-0.5 bg-white"
              />
            </div>
            <Input
              value={strVal}
              onChange={(e) => onChange(e.target.value)}
              placeholder="#000000"
              className={cn(inputClass, "font-mono flex-1")}
            />
          </div>
        </FieldWrapper>
      );

    // ── Number ────────────────────────────────
    case "number":
      return (
        <FieldWrapper field={field} error={error}>
          <Input
            type="number"
            value={numVal}
            onChange={(e) => onChange(Number(e.target.value))}
            placeholder={field.placeholder}
            className={cn(inputClass, "w-32")}
          />
        </FieldWrapper>
      );

    // ── Boolean / toggle ─────────────────────
    case "boolean":
      return (
        <div className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-gray-50 border border-gray-100">
          <div>
            <Label className="text-sm font-medium text-t-primary cursor-pointer">
              {field.label}
              {field.required && (
                <span className="text-rose-500 ml-0.5">*</span>
              )}
            </Label>
            {field.hint && (
              <p className="text-xs text-t-secondary mt-0.5">{field.hint}</p>
            )}
          </div>
          <Switch
            checked={boolVal}
            onCheckedChange={(v) => onChange(v)}
            className="data-[state=checked]:bg-primary-c"
          />
        </div>
      );

    // ── Select ────────────────────────────────
    case "select":
      return (
        <FieldWrapper field={field} error={error}>
          <select
            value={strVal}
            onChange={(e) => onChange(e.target.value)}
            className={cn(
              "w-full h-10 px-3 rounded-lg border border-gray-200 bg-white text-sm text-gray-700",
              "focus:outline-none focus:ring-2 focus:ring-primary-c/20 focus:border-primary-c/40 transition-all appearance-none",
              "bg-[url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E\")] bg-no-repeat bg-[right_10px_center] bg-[length:14px] pr-8",
              error && "border-rose-300",
            )}
          >
            <option value="">Select…</option>
            {field.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </FieldWrapper>
      );

    // ── Icon ──────────────────────────────────
    case "icon":
      return (
        <FieldWrapper field={field} error={error}>
          <Input
            value={strVal}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder ?? "e.g. Star, Heart, Zap"}
            className={inputClass}
          />
          {strVal && (
            <p className="text-xs text-t-secondary mt-1">
              Uses Lucide icon names. Preview updates on save.
            </p>
          )}
        </FieldWrapper>
      );

    default:
      return null;
  }
}

// ─── Shared field wrapper ────────────────────

function FieldWrapper({
  field,
  error,
  children,
}: {
  field: FieldDef;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium text-t-primary">
        {field.label}
        {field.required && <span className="text-rose-500 ml-0.5">*</span>}
      </Label>
      {children}
      {field.hint && !error && (
        <p className="text-xs text-t-secondary">{field.hint}</p>
      )}
      {error && (
        <p className="flex items-center gap-1 text-xs text-rose-500">
          <AlertCircle size={11} />
          {error}
        </p>
      )}
    </div>
  );
}
