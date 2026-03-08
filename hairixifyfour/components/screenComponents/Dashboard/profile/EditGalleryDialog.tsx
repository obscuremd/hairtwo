"use client";

import { useRef, useState } from "react";
import { ImagePlus, Loader2, Upload, X, CheckCircle2 } from "lucide-react";
import axios, { AxiosError } from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { getStoredCredentials } from "@/utils/providers";

const BASE_URL = "https://api5.project.hairxify.com/api";
const ACCESS_KEY = process.env.NEXT_PUBLIC_ACCESS_PASS_KEY ?? "";

interface EditGalleryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  providerId: number;
  /** Called after a successful upload so the parent can refresh */
  onUploaded?: () => void;
}

type UploadState = "idle" | "uploading" | "posting" | "done" | "error";

export function EditGalleryDialog({
  open,
  onOpenChange,
  providerId,
  onUploaded,
}: EditGalleryDialogProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [error, setError] = useState<string | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setUploadState("idle");
    setError(null);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (!f || !f.type.startsWith("image/")) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setUploadState("idle");
    setError(null);
  }

  function clearFile() {
    setFile(null);
    setPreview(null);
    setUploadState("idle");
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  async function handleUpload() {
    if (!file) return;
    const { token } = getStoredCredentials();
    setError(null);

    try {
      // ── Step 1: Upload asset file ────────────────────────────────────────────
      setUploadState("uploading");

      const formData = new FormData();
      formData.append("images[1]", file);
      formData.append("size", "1");
      formData.append("path", `services/${providerId}`);
      formData.append("type[0]", file.type);

      const uploadRes = await axios.post<{ images: Record<string, string> }>(
        `${BASE_URL}/uploadassets`,
        formData,
        {
          headers: {
            "ACCESS-PASS-KEY": ACCESS_KEY,
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            // Do NOT set Content-Type — axios sets it with the correct boundary
          },
        },
      );

      // The response is { images: { "1": "images1/services/..." } }
      const imagePath = uploadRes.data?.images?.["1"];
      if (!imagePath)
        throw new Error("Upload succeeded but no image path returned");

      // ── Step 2: Register in gallery ──────────────────────────────────────────
      setUploadState("posting");

      await axios.post(
        `${BASE_URL}/gallery`,
        {
          type: "provider",
          type_id: providerId,
          type_type: "gallery",
          image: imagePath,
        },
        {
          headers: {
            "ACCESS-PASS-KEY": ACCESS_KEY,
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      );

      setUploadState("done");
      onUploaded?.();
    } catch (err) {
      const e = err as AxiosError<{ message?: string; error?: string }>;
      setError(
        e.response?.data?.message ||
          e.response?.data?.error ||
          e.message ||
          "Upload failed. Please try again.",
      );
      setUploadState("error");
    }
  }

  function handleClose() {
    clearFile();
    onOpenChange(false);
  }

  const isLoading = uploadState === "uploading" || uploadState === "posting";

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (!o) handleClose();
        else onOpenChange(true);
      }}
    >
      <DialogContent className="max-w-sm gap-0 p-0 overflow-hidden">
        <DialogHeader className="px-5 pt-5 pb-3 border-b space-y-0.5">
          <DialogTitle className="text-base font-semibold">
            Add Gallery Photo
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Upload one image to add to your gallery.
          </DialogDescription>
        </DialogHeader>

        <div className="p-5 space-y-4">
          {uploadState === "done" ? (
            /* ── Success state ── */
            <div className="flex flex-col items-center gap-4 py-6 text-center">
              <div className="flex size-14 items-center justify-center rounded-full bg-emerald-50">
                <CheckCircle2 className="size-7 text-emerald-600" />
              </div>
              <div className="space-y-0.5">
                <p className="text-sm font-semibold">Photo Added!</p>
                <p className="text-xs text-muted-foreground">
                  Your gallery has been updated successfully.
                </p>
              </div>
              <Button className="w-full" onClick={handleClose}>
                Done
              </Button>
            </div>
          ) : (
            <>
              {/* ── Drop zone / preview ── */}
              {preview ? (
                <div className="relative rounded-xl overflow-hidden border">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-52 object-cover"
                  />
                  <button
                    onClick={clearFile}
                    disabled={isLoading}
                    className="absolute top-2 right-2 size-7 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                  >
                    <X className="size-3.5" />
                  </button>
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/50 to-transparent px-3 py-2">
                    <p className="text-white text-[11px] truncate">
                      {file?.name}
                    </p>
                  </div>
                </div>
              ) : (
                <div
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  onClick={() => inputRef.current?.click()}
                  className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-muted-foreground/25 bg-muted/20 h-52 cursor-pointer hover:border-muted-foreground/40 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex size-11 items-center justify-center rounded-full bg-muted">
                    <ImagePlus className="size-5 text-muted-foreground" />
                  </div>
                  <div className="text-center space-y-0.5">
                    <p className="text-sm font-medium">Drop image here</p>
                    <p className="text-xs text-muted-foreground">
                      or click to browse
                    </p>
                    <p className="text-[10px] text-muted-foreground/60">
                      PNG, JPG, JPEG up to 10MB
                    </p>
                  </div>
                </div>
              )}

              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />

              {/* ── Upload progress label ── */}
              {isLoading && (
                <p className="text-xs text-muted-foreground text-center">
                  {uploadState === "uploading"
                    ? "Uploading image…"
                    : "Saving to gallery…"}
                </p>
              )}

              {/* ── Error ── */}
              {error && (
                <p className="text-xs text-destructive text-center">{error}</p>
              )}

              {/* ── Actions ── */}
              <div className="flex gap-2 pt-1">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={handleClose}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 gap-1.5"
                  disabled={!file || isLoading}
                  onClick={handleUpload}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="size-3.5 animate-spin" />
                      {uploadState === "uploading" ? "Uploading…" : "Saving…"}
                    </>
                  ) : (
                    <>
                      <Upload className="size-3.5" />
                      Upload
                    </>
                  )}
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
