"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { getStoredCredentials } from "@/utils/user";
import { uploadImage } from "@/utils/upload";
import { updateImage } from "@/utils/update";

export interface ProfileAvatarUploadProps {
  name: string;
  avatarUrl: string | null;
  existingProfileId: number | null;
  uploadType: "user" | "provider";
  providerId?: number | null;
  onUploaded?: (newAvatarUrl: string, newProfileId?: number | null) => void;
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

async function resizeImage(file: File, maxDimension: number): Promise<File> {
  const bitmap = await createImageBitmap(file);

  const ratio = Math.min(
    maxDimension / bitmap.width,
    maxDimension / bitmap.height,
    1,
  );

  const width = Math.round(bitmap.width * ratio);
  const height = Math.round(bitmap.height * ratio);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Failed to get canvas context");

  ctx.drawImage(bitmap, 0, 0, width, height);

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, file.type || "image/jpeg", 0.92),
  );

  if (!blob) throw new Error("Image resize failed");

  return new File([blob], file.name, {
    type: file.type || "image/jpeg",
  });
}

export function ProfileAvatarUpload({
  name,
  avatarUrl,
  existingProfileId,
  uploadType,
  providerId,
  onUploaded,
}: ProfileAvatarUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [avatarUrlState, setAvatarUrlState] = useState<string | null>(
    avatarUrl,
  );

  const [uploading, setUploading] = useState(false);
  const [justUploaded, setJustUploaded] = useState(false);
  const [resizeDimension, setResizeDimension] = useState(512);

  const { token } = getStoredCredentials();
  const initials = getInitials(name);

  const displayUrl = avatarUrlState || previewUrl || avatarUrl;

  useEffect(() => {
    setAvatarUrlState(avatarUrl);
  }, [avatarUrl]);

  // ─── File select ─────────────────────────────────────────────
  function onFileSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const localUrl = URL.createObjectURL(file);

    setSelectedFile(file);
    setPreviewUrl(localUrl);
    setAvatarUrlState(localUrl); // optimistic preview
    if (inputRef.current) inputRef.current.value = "";
  }

  function resetSelection() {
    setSelectedFile(null);
    setPreviewUrl(null);
    setJustUploaded(false);
    setResizeDimension(512);
  }

  // ─── Upload handler ──────────────────────────────────────────
  async function handleUpload() {
    if (!selectedFile) return;

    setUploading(true);

    try {
      const resizedFile = await resizeImage(
        selectedFile,
        resizeDimension,
      );

      const pathHint =
        uploadType === "provider"
          ? `providers/${providerId ?? "me"}`
          : "users/profile";

      const hasExistingProfile = existingProfileId != null;

      // 🔥 Choose correct upload method
      const uploadResult = hasExistingProfile
        ? await updateImage(resizedFile, pathHint)
        : await uploadImage(resizedFile, pathHint);

      if (!uploadResult.success || !uploadResult.imagePath) {
        toast.error(uploadResult.message || "Upload failed");
        return;
      }

      // ─── Save to DB ───────────────────────────────────────
      const method = hasExistingProfile ? "PUT" : "POST";
      const endpoint = `/api/gallery/${uploadType}`;

      const payload: Record<string, unknown> = {
        type_type: "profile",
        image: uploadResult.imagePath,
      };

      if (uploadType === "provider") {
        payload.type_id = providerId ?? undefined;
      }

      if (hasExistingProfile) {
        payload.id = existingProfileId;
      }

      const res = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success || data.errors) {
        toast.error(data.message ?? "Failed to update profile photo");
        return;
      }

      const finalUrl = `https://api5.project.hairxify.com/${uploadResult.imagePath}`;

      // ─── UI update ───────────────────────────────────────
      setAvatarUrlState(finalUrl);
      setJustUploaded(true);

      setTimeout(() => setJustUploaded(false), 600);

      toast.success(
        hasExistingProfile
          ? "Profile photo updated"
          : "Profile photo uploaded",
      );

      // notify parent (important for persistence)
      onUploaded?.(finalUrl, existingProfileId ?? null);

      resetSelection();
    } catch (error) {
      console.error(error);
      toast.error("Network error. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  // ─── UI ─────────────────────────────────────────────────────
  return (
    <div className="space-y-2">
      <div
        className="relative shrink-0 group cursor-pointer"
        onClick={() => !uploading && inputRef.current?.click()}
      >
        {displayUrl ? (
          <img
            src={displayUrl}
            alt={name}
            className={`size-20 rounded-full object-cover border-2 border-[#3ad688] transition-transform duration-300 ${
              justUploaded ? "scale-110" : "scale-100"
            }`}
          />
        ) : (
          <div className="size-20 rounded-full bg-[#3ad688] text-[#003226] text-2xl font-bold flex items-center justify-center">
            {initials}
          </div>
        )}

        <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
          {uploading ? (
            <Loader2 className="size-5 text-white animate-spin" />
          ) : (
            <Edit className="size-4 text-white" />
          )}
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onFileSelected}
      />

      {selectedFile && (
        <div className="space-y-2 w-64">
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={resetSelection}
              disabled={uploading}
            >
              Cancel
            </Button>

            <Button
              size="sm"
              onClick={handleUpload}
              disabled={uploading}
            >
              {uploading ? "Uploading…" : "Upload"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}