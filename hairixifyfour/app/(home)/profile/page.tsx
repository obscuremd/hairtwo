// app/profile/page.tsx
"use client";

import { useRef, useState } from "react";
import { UseGen } from "@/context/GeneralContext";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ExternalLink,
  LogOut,
  Loader2,
  Mail,
  Edit,
  Shield,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { uploadImage } from "@/utils/upload";
import { getStoredCredentials } from "@/utils/user";
import { toast } from "sonner";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string | null | undefined;
}) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3">
      <div className="size-8 rounded-lg bg-muted flex items-center justify-center shrink-0 mt-0.5">
        <Icon className="size-4 text-muted-foreground" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}

// ─── Avatar upload ─────────────────────────────────────────────────────────────
// Wraps the initials circle. Clicking it opens a file picker, uploads the image
// via uploadImage() then registers it via POST /api/gallery/user.

function AvatarUpload({
  name,
  avatarUrl,
  onUploaded,
}: {
  name: string;
  avatarUrl: string | null;
  onUploaded: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const { token } = getStoredCredentials();
  const initials = getInitials(name);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);

    // Step 1: upload the file asset
    const uploadResult = await uploadImage(file, "users/profile");
    if (!uploadResult.success || !uploadResult.imagePath) {
      toast.error(uploadResult.message);
      setUploading(false);
      return;
    }

    // Step 2: register it as the user profile image
    try {
      const res = await fetch("/api/gallery/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          type_type: "profile",
          image: uploadResult.imagePath,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        toast.error(data.message ?? "Failed to update profile photo");
      } else {
        toast.success("Profile photo updated");
        onUploaded();
      }
    } catch {
      toast.error("Network error. Please try again.");
    }

    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div
      className="relative shrink-0 group cursor-pointer"
      onClick={() => !uploading && inputRef.current?.click()}
    >
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={name}
          className="size-20 rounded-full object-cover border-2 border-[#3ad688]"
        />
      ) : (
        <div className="size-20 rounded-full bg-[#3ad688] text-[#003226] text-2xl font-bold flex items-center justify-center shrink-0">
          {initials}
        </div>
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
        {uploading ? (
          <Loader2 className="size-5 text-white animate-spin" />
        ) : (
          <Edit className="size-4 text-white" />
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProfilePage() {
  const {
    authUser,
    authProvider,
    isAuthenticated,
    authLoading,
    logout,
    refreshAuth,
  } = UseGen();
  const router = useRouter();

  function handleLogout() {
    logout();
    router.push("/");
  }

  if (authLoading) {
    return (
      <div className="max-w-lg mx-auto px-5 py-12 space-y-6">
        <div className="flex items-center gap-4">
          <Skeleton className="size-20 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-3.5 w-28" />
          </div>
        </div>
        <Skeleton className="h-px w-full" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="size-8 rounded-lg" />
            <div className="space-y-1.5">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-4 w-36" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!isAuthenticated || !authUser) {
    router.replace("/");
    return null;
  }

  const isProvider = authUser.roles.includes("provider");

  const name = authUser.full_name || authUser.email;

  // Use first gallery image as avatar if available
  const BASE_URL = "https://api5.project.hairxify.com";
  const galleryImages = (authProvider?.user?.gallery ?? []) as Gallery[];
  const avatarUrl = galleryImages[0]
    ? `${BASE_URL}/${galleryImages[0].image}`
    : null;

  return (
    <div className="max-w-lg mx-auto px-5 py-12 space-y-8">
      {/* ── Hero ── */}
      <div className="flex items-center gap-5">
        <AvatarUpload
          name={name}
          avatarUrl={avatarUrl}
          onUploaded={refreshAuth}
        />
        <div className="space-y-1">
          <h1 className="text-xl font-semibold">{name}</h1>
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
                isProvider
                  ? "bg-[#12ab594a] text-[#004737]"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              <Shield className="size-3" />
              {isProvider ? "Provider" : "Client"}
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground">
            Tap photo to change
          </p>
        </div>
      </div>

      {/* ── Account info ── */}
      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Account
        </p>
        <div className="space-y-4">
          <InfoRow icon={Mail} label="Email" value={authUser.email} />
        </div>
      </div>

      {/* ── Provider dashboard link ── */}
      {isProvider && (
        <Button
          className="w-full bg-secondary-c gap-2"
          onClick={() => router.push("/dashboard/account")}
        >
          <ExternalLink className="size-4" />
          Go to Provider Dashboard
        </Button>
      )}

      <Separator />

      {/* ── Log out ── */}
      <Button
        variant="outline"
        className="w-full text-destructive border-destructive/30 hover:bg-destructive/5 hover:text-destructive"
        onClick={handleLogout}
      >
        <LogOut className="size-4 mr-2" />
        Log out
      </Button>
    </div>
  );
}
