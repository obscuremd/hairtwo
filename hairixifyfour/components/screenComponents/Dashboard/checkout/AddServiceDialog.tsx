"use client";

// ─────────────────────────────────────────────
// components/screenComponents/Dashboard/checkout/AddServiceDialog.tsx
// ─────────────────────────────────────────────

import { useRef, useState } from "react";
import { CheckCircle2, ImagePlus, Loader2, Plus, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { uploadImage } from "@/utils/upload";
import { CreateProviderService } from "@/utils/services";
import { UseGen } from "@/context/GeneralContext";
import { cn } from "@/lib/utils";

interface AddServiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated?: () => void;
}

// Internal form state — uses string fields matching the Service interface
interface FormState {
  title: string;
  price: string;
  discount_price: string;
  duration: string;
  description: string;
  status: "active" | "inactive";
  premium: boolean; // boolean in form, serialised to 0|1 on submit
}

interface ImageEntry {
  id: string;
  file: File;
  preview: string;
  path: string | null; // null until uploaded
  uploading: boolean;
  error: string | null;
}

const EMPTY_FORM: FormState = {
  title: "",
  price: "",
  discount_price: "",
  duration: "",
  description: "",
  status: "active",
  premium: false,
};

type DialogStep = "form" | "submitting" | "done" | "error";

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

export function AddServiceDialog({
  open,
  onOpenChange,
  onCreated,
}: AddServiceDialogProps) {
  const { authProvider } = UseGen();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [images, setImages] = useState<ImageEntry[]>([]);
  const [step, setStep] = useState<DialogStep>("form");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});

  // ── Validation ────────────────────────────
  function validate(): boolean {
    const errors: Partial<Record<keyof FormState, string>> = {};
    if (!form.title.trim()) errors.title = "Title is required";
    if (!form.price || isNaN(Number(form.price)))
      errors.price = "Enter a valid price";
    if (!form.duration || isNaN(Number(form.duration)))
      errors.duration = "Enter duration in minutes";
    if (!form.description.trim())
      errors.description = "Description is required";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  // ── Image handling ────────────────────────
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    setImages((prev) => [
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

  function removeImage(id: string) {
    setImages((prev) => prev.filter((img) => img.id !== id));
  }

  async function uploadPendingImages(): Promise<string[] | null> {
    const pending = images.filter((img) => img.path === null);
    const done = images
      .filter((img) => img.path !== null)
      .map((img) => img.path as string);

    if (pending.length === 0) return done;

    setImages((prev) =>
      prev.map((img) =>
        pending.some((u) => u.id === img.id)
          ? { ...img, uploading: true, error: null }
          : img,
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
        setImages((prev) =>
          prev.map((img) =>
            img.id === entry.id
              ? { ...img, path: result.imagePath!, uploading: false }
              : img,
          ),
        );
      } else {
        hasError = true;
        setImages((prev) =>
          prev.map((img) =>
            img.id === entry.id
              ? { ...img, uploading: false, error: result.message }
              : img,
          ),
        );
      }
    }

    return hasError ? null : paths;
  }

  // ── Submit ────────────────────────────────
  async function handleSubmit() {
    if (!validate()) return;
    if (!authProvider) {
      setSubmitError("Provider context not available");
      return;
    }

    setStep("submitting");
    setSubmitError(null);

    const imagePaths = await uploadPendingImages();
    if (imagePaths === null) {
      setStep("error");
      setSubmitError(
        "One or more images failed to upload. Fix errors and try again.",
      );
      return;
    }

    // Build payload — images is string[] (paths) as the API write endpoint expects
    const payload: Omit<
      Service,
      "id" | "created_at" | "updated_at" | "images"
    > & {
      images: string[];
    } = {
      title: form.title.trim(),
      price: form.price,
      discount_price: form.discount_price || undefined,
      duration: form.duration,
      description: form.description.trim(),
      recurrence: 1,
      provider: authProvider.id,
      premium: form.premium ? 1 : 0,
      status: form.status,
      images: imagePaths,
    };

    const result = await CreateProviderService(payload);

    if (result.success) {
      setStep("done");
      onCreated?.();
    } else {
      setStep("error");
      setSubmitError(result.message);
    }
  }

  function handleClose() {
    if (step === "submitting") return;
    setForm(EMPTY_FORM);
    setImages([]);
    setStep("form");
    setSubmitError(null);
    setFieldErrors({});
    onOpenChange(false);
  }

  const isSubmitting = step === "submitting";
  const anyUploading = images.some((img) => img.uploading);

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (!o && !isSubmitting) handleClose();
        else if (o) onOpenChange(true);
      }}
    >
      <DialogContent className="max-w-lg gap-0 p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <DialogTitle className="text-base font-semibold">
            Add New Service
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Fill in the details below. Images are optional but recommended.
          </DialogDescription>
        </DialogHeader>

        {/* ── Done state ── */}
        {step === "done" ? (
          <div className="flex flex-col items-center gap-4 py-10 px-6 text-center">
            <div className="flex size-14 items-center justify-center rounded-full bg-emerald-50">
              <CheckCircle2 className="size-7 text-emerald-600" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-semibold">Service Created!</p>
              <p className="text-xs text-muted-foreground">
                Your new service is now live on your profile.
              </p>
            </div>
            <Button
              className="w-full bg-primary-c hover:bg-primary-c/90 text-white"
              onClick={handleClose}
            >
              Done
            </Button>
          </div>
        ) : (
          <div className="overflow-y-auto max-h-[75vh]">
            <div className="px-6 py-5 space-y-5">
              {/* Title */}
              <FormField
                label="Service Title"
                required
                error={fieldErrors.title}
              >
                <Input
                  value={form.title}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, title: e.target.value }))
                  }
                  placeholder="e.g. Classic Haircut & Style"
                  className={cn(
                    "h-10 border-gray-200",
                    fieldErrors.title && "border-rose-300",
                  )}
                  disabled={isSubmitting}
                />
              </FormField>

              {/* Price + Duration */}
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Price (₦)" required error={fieldErrors.price}>
                  <Input
                    value={form.price}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, price: e.target.value }))
                    }
                    placeholder="5000"
                    type="number"
                    min="0"
                    className={cn(
                      "h-10 border-gray-200",
                      fieldErrors.price && "border-rose-300",
                    )}
                    disabled={isSubmitting}
                  />
                </FormField>
                <FormField
                  label="Duration (mins)"
                  required
                  error={fieldErrors.duration}
                >
                  <Input
                    value={form.duration}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, duration: e.target.value }))
                    }
                    placeholder="45"
                    type="number"
                    min="1"
                    className={cn(
                      "h-10 border-gray-200",
                      fieldErrors.duration && "border-rose-300",
                    )}
                    disabled={isSubmitting}
                  />
                </FormField>
              </div>

              {/* Discount price */}
              <FormField label="Discount Price (₦)">
                <Input
                  value={form.discount_price}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, discount_price: e.target.value }))
                  }
                  placeholder="Optional"
                  type="number"
                  min="0"
                  className="h-10 border-gray-200"
                  disabled={isSubmitting}
                />
              </FormField>

              {/* Description */}
              <FormField
                label="Description"
                required
                error={fieldErrors.description}
              >
                <Textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, description: e.target.value }))
                  }
                  placeholder="Describe what this service includes…"
                  rows={3}
                  className={cn(
                    "resize-none border-gray-200 text-sm",
                    fieldErrors.description && "border-rose-300",
                  )}
                  disabled={isSubmitting}
                />
              </FormField>

              {/* Status + Premium */}
              <div className="flex gap-3">
                <ToggleCard
                  label="Active"
                  hint="Visible to clients"
                  checked={form.status === "active"}
                  onCheckedChange={(v) =>
                    setForm((f) => ({
                      ...f,
                      status: v ? "active" : "inactive",
                    }))
                  }
                  disabled={isSubmitting}
                />
                <ToggleCard
                  label="Premium"
                  hint="Featured listing"
                  checked={form.premium}
                  onCheckedChange={(v) =>
                    setForm((f) => ({ ...f, premium: v }))
                  }
                  disabled={isSubmitting}
                />
              </div>

              {/* Images */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-t-primary">
                  Service Images
                  <span className="text-gray-400 font-normal ml-1.5">
                    (optional)
                  </span>
                </Label>
                <ImageGrid
                  images={images}
                  onRemove={removeImage}
                  onAdd={() => fileInputRef.current?.click()}
                  disabled={isSubmitting}
                />
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>

              {/* Submit error */}
              {submitError && (
                <p className="text-xs text-rose-500 text-center">
                  {submitError}
                </p>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 pb-6 pt-2 flex gap-2 border-t border-gray-100">
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-primary-c hover:bg-primary-c/90 text-white gap-1.5"
                onClick={handleSubmit}
                disabled={isSubmitting || anyUploading}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-3.5 animate-spin" />
                    Creating…
                  </>
                ) : (
                  <>
                    <Plus className="size-3.5" />
                    Create Service
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

// ─── Shared sub-components ────────────────────

function FormField({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium text-t-primary">
        {label}
        {required && <span className="text-rose-500 ml-0.5">*</span>}
      </Label>
      {children}
      {error && <p className="text-xs text-rose-500">{error}</p>}
    </div>
  );
}

function ToggleCard({
  label,
  hint,
  checked,
  onCheckedChange,
  disabled,
}: {
  label: string;
  hint: string;
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex-1 flex items-center justify-between py-2.5 px-3 rounded-lg bg-gray-50 border border-gray-100">
      <div>
        <Label className="text-sm font-medium text-t-primary">{label}</Label>
        <p className="text-[11px] text-gray-400 mt-0.5">{hint}</p>
      </div>
      <Switch
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        className="data-[state=checked]:bg-primary-c"
      />
    </div>
  );
}

function ImageGrid({
  images,
  onRemove,
  onAdd,
  disabled,
}: {
  images: ImageEntry[];
  onRemove: (id: string) => void;
  onAdd: () => void;
  disabled?: boolean;
}) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {images.map((img) => (
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
          {img.path && !img.uploading && (
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
              onClick={() => onRemove(img.id)}
              disabled={disabled}
              className="absolute top-1 right-1 size-5 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors disabled:opacity-50"
            >
              <X className="size-3" />
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={onAdd}
        disabled={disabled}
        className="aspect-square rounded-lg border-2 border-dashed border-gray-200 hover:border-primary-c/40 hover:bg-primary-c/3 transition-all flex flex-col items-center justify-center gap-1 text-gray-400 hover:text-primary-c disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ImagePlus className="size-5" />
        <span className="text-[10px] font-medium">Add</span>
      </button>
    </div>
  );
}
