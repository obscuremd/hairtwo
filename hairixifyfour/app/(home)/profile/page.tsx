// app/profile/page.tsx
"use client";

import { useEffect, useState } from "react";
import { UseGen } from "@/context/GeneralContext";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ExternalLink,
  LogOut,
  Mail,
  Shield,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { getStoredCredentials } from "@/utils/user";
import { ProfileAvatarUpload } from "@/components/localComponents/ProfileAvatarUpload";

// ─── Helpers ──────────────────────────────────────────────────────────────────

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

  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [existingProfileId, setExistingProfileId] = useState<number | null>(null);
  const BASE_URL = "https://api5.project.hairxify.com";

  useEffect(() => {
    async function loadAvatar() {
      if (authProvider && authUser?.roles.includes("provider")) {
        const gallery = (authProvider.user.gallery ?? []) as Gallery[];
        const profilePhoto = gallery.find((item) => item.type === "profile");
        setAvatarUrl(profilePhoto ? `${BASE_URL}/${profilePhoto.image}` : null);
        setExistingProfileId(profilePhoto?.id ?? null);
        return;
      }

      const { token } = getStoredCredentials();
      if (!token) {
        setAvatarUrl(null);
        setExistingProfileId(null);
        return;
      }

      try {
        const res = await fetch("/api/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) return;
        const body = await res.json();
        const me = body.data?.user ?? body.data ?? body;
        const gallery = (me.gallery ?? me.user?.gallery ?? []) as Gallery[];
        const profilePhoto = gallery.find((item) => item.type === "profile");

        setAvatarUrl(profilePhoto ? `${BASE_URL}/${profilePhoto.image}` : null);
        setExistingProfileId(profilePhoto?.id ?? null);
      } catch {
        // fallback
      }
    }

    loadAvatar();
  }, [authProvider, authUser]);

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

  function handleAvatarUploaded(newUrl: string, newId?: number | null) {
    setAvatarUrl(newUrl);
    if (newId != null) {
      setExistingProfileId(newId);
    }
    refreshAuth();
  }

  return (
    <div className="max-w-lg mx-auto px-5 py-12 space-y-8">
      {/* ── Hero ── */}
      <div className="flex items-center gap-5">
        <ProfileAvatarUpload
          name={name}
          avatarUrl={avatarUrl}
          existingProfileId={existingProfileId}
          uploadType={isProvider ? "provider" : "user"}
          providerId={authProvider?.id ?? null}
          onUploaded={handleAvatarUploaded}
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
