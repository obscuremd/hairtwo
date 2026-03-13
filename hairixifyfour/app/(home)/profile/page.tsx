// app/profile/page.tsx
"use client";

import { UseGen } from "@/context/GeneralContext";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Building2,
  Calendar,
  Clock,
  ExternalLink,
  LogOut,
  Mail,
  MapPin,
  Phone,
  Shield,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

// ─── Avatar ───────────────────────────────────────────────────────────────────

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

// ─── Info row ─────────────────────────────────────────────────────────────────

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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProfilePage() {
  const { authUser, isAuthenticated, authLoading, logout } = UseGen();
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
  const initials = getInitials(name);

  return (
    <div className="max-w-lg mx-auto px-5 py-12 space-y-8">
      {/* ── Hero ── */}
      <div className="flex items-center gap-5">
        <div className="size-20 rounded-full bg-[#3ad688] text-[#003226] text-2xl font-bold flex items-center justify-center shrink-0">
          {initials}
        </div>
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

      {/* ── Provider section ── */}

      {/* Dashboard link */}
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
