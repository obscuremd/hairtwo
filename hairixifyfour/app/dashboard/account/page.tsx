"use client";

import { useEffect, useState } from "react";
import {
  Check,
  Clock,
  Edit,
  Mail,
  MapPin,
  Phone,
  Star,
  Trash2,
  User,
  X,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { UseGen } from "@/context/GeneralContext";
import { ProfileAvatarUpload } from "@/components/localComponents/ProfileAvatarUpload";
import { EditGalleryDialog } from "@/components/screenComponents/Dashboard/profile/EditGalleryDialog";
import { EditProviderSheet } from "@/components/screenComponents/Dashboard/profile/EditProviderSheet";
import { getStoredCredentials } from "@/utils/user";
import { toast } from "sonner";
import Image from "next/image";
import { Avatar } from "@/components/localComponents/InitialsAvater";

const BASE_IMAGE_URL = "https://api5.project.hairxify.com";
const DAY_ORDER = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const DAY_LABELS: Record<string, string> = {
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
  Sat: "Saturday",
  Sun: "Sunday",
};

// ─── Main page ────────────────────────────────────────────────────────────────

export default function ProviderProfilePage() {
  const { authProvider, authUser, authLoading, refreshAuth } = UseGen();
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [editSheetOpen, setEditSheetOpen] = useState(false);
  const [avatarImage, setAvatarImage] = useState<string | null>(null);
  const [existingProfileId, setExistingProfileId] = useState<number | null>(
    null,
  );

  useEffect(() => {
    if (!authProvider) return;
    const gallery: Gallery[] = authProvider.user.gallery ?? [];
    const profileImage = gallery.find((item) => item.type === "profile");
    setAvatarImage(
      profileImage ? `${BASE_IMAGE_URL}/${profileImage.image}` : null,
    );
    setExistingProfileId(profileImage?.id ?? null);
  }, [authProvider]);

  if (authLoading) return <ProfileSkeleton />;
  if (!authProvider) {
    return (
      <div className="py-20 text-center text-sm text-muted-foreground">
        Could not load profile. Please refresh.
      </div>
    );
  }

  const gallery: Gallery[] = authProvider.user.gallery ?? [];
  const initials =
    authProvider.first_name.charAt(0) + authProvider.last_name.charAt(0);
  const businessHours: BusinessHour[] = authProvider.business_hours ?? [];

  function handleProviderAvatarUploaded(newUrl: string, newId?: number | null) {
    setAvatarImage(newUrl);
    if (newId != null) setExistingProfileId(newId);
    refreshAuth();
  }
   if (!authUser) return null;
  console.log("profile user", authUser);

  const name = authUser.full_name || authUser.email || "user";
  const isProvider = authUser?.roles?.includes("provider");

  const formattedUser = {
    ...authUser,
    profile: Object.values(authUser.profile),
  };
  const profileImage = formattedUser?.profile?.[0]?.image;

  return (
    <div className="mx-auto space-y-4">
      <div className="flex items-center gap-2">
        <div className="flex size-12 items-center justify-center rounded-full border p-3">
          <User className="size-6 text-t-secondary" />
        </div>
        <p className="text-3xl font-semibold tracking-tight">Profile</p>
      </div>

      {/* Profile header */}
      <div className="flex items-start gap-4 p-4 border-b border-gray-200 bg-white">
        {/* <ProfileAvatarUpload
          name={`${authProvider.first_name} ${authProvider.last_name}`}
          avatarUrl={avatarImage}
          existingProfileId={existingProfileId}
          uploadType="provider"
          providerId={authProvider.id}
          onUploaded={handleProviderAvatarUploaded}
        /> */}
            {profileImage ? (
        <Image
          src={`https://api5.project.hairxify.com/${profileImage}`}
          width={64}
          height={64}
          alt={formattedUser.full_name}
          className="w-16 h-16 rounded-full object-cover shrink-0"
        />
      ) : (
        <Avatar
          name={formattedUser.full_name}
          size="md"
        />
      )}
                  <span/>
        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-bold text-[#003225] mb-0.5 truncate">
            {authProvider.business_name}
          </h1>
          <p className="text-sm text-gray-600 mb-1 truncate">
            {authProvider.first_name} {authProvider.last_name}
          </p>
          <p className="text-xs text-gray-400 truncate">
            {authProvider.category?.name}
          </p>
          {authUser?.email && (
            <p className="text-xs text-gray-400 truncate mt-0.5">
              {authUser.email}
            </p>
          )}
        </div>
        {/* Edit button removed from header — lives on Business Info section */}
      </div>

      {/* Mobile tabs */}
      <div className="lg:hidden">
        <Tabs defaultValue="business" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-100 p-1">
            {["business", "gallery", "availability"].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="text-xs py-2 data-[state=active]:bg-[#3ad688] data-[state=active]:text-[#003225]"
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="business" className="mt-4">
            <BusinessInfoSection
              provider={authProvider}
              onEdit={() => setEditSheetOpen(true)}
            />
          </TabsContent>
          <TabsContent value="gallery" className="mt-4">
            <GallerySection
              gallery={gallery}
              onEdit={() => setGalleryOpen(true)}
              onDeleted={refreshAuth}
            />
          </TabsContent>
          <TabsContent value="availability" className="mt-4">
            <AvailabilitySection
              businessHours={businessHours}
              onUpdated={refreshAuth}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Desktop */}
      <div className="hidden lg:block space-y-4">
        <GallerySection
          gallery={gallery}
          onEdit={() => setGalleryOpen(true)}
          onDeleted={refreshAuth}
        />
        <BusinessInfoSection
          provider={authProvider}
          onEdit={() => setEditSheetOpen(true)}
        />
        <AvailabilitySection
          businessHours={businessHours}
          onUpdated={refreshAuth}
        />
      </div>

      {/* Gallery upload dialog */}
      <EditGalleryDialog
        open={galleryOpen}
        onOpenChange={setGalleryOpen}
        providerId={authProvider.id}
        onUploaded={() => {
          setGalleryOpen(false);
          refreshAuth();
        }}
      />

      {/* Business info edit sheet */}
      <EditProviderSheet
        open={editSheetOpen}
        onOpenChange={setEditSheetOpen}
        provider={authProvider}
        onUpdated={() => {
          setEditSheetOpen(false);
          refreshAuth();
        }}
      />
    </div>
  );
}

// ─── Business Info ────────────────────────────────────────────────────────────

function BusinessInfoSection({
  provider,
  onEdit,
}: {
  provider: Provider;
  onEdit: () => void;
}) {
  return (
    <div className="p-4 border-b-2 border-gray-200 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-[#003225]">Business Info</h2>
        <Button
          size="sm"
          variant="outline"
          onClick={onEdit}
          className="border-[#003225] text-[#003225] hover:bg-[#003225] hover:text-white h-7 text-xs"
        >
          <Edit className="w-3 h-3 mr-1" /> Edit
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
        {provider.address && (
          <div className="flex items-center gap-2 text-gray-700">
            <MapPin className="w-4 h-4 text-[#3ad688] shrink-0" />
            <span className="truncate">
              {provider.address}
              {provider.local?.name ? `, ${provider.local.name}` : ""}
              {provider.state?.name ? `, ${provider.state.name}` : ""}
            </span>
          </div>
        )}
        {provider.phone_number && (
          <div className="flex items-center gap-2 text-gray-700">
            <Phone className="w-4 h-4 text-[#3ad688] shrink-0" />
            <span>{provider.phone_number}</span>
          </div>
        )}
        {provider.user?.email && (
          <div className="flex items-center gap-2 text-gray-700">
            <Mail className="w-4 h-4 text-[#3ad688] shrink-0" />
            <span className="truncate">{provider.user.email}</span>
          </div>
        )}
        {provider.category?.name && (
          <div className="flex items-center gap-2 text-gray-700">
            <Star className="w-4 h-4 text-[#3ad688] shrink-0" />
            <span>{provider.category.name}</span>
          </div>
        )}
      </div>
      {provider.team_size > 0 && (
        <p className="text-xs text-gray-500">
          Team size:{" "}
          <span className="font-medium text-gray-700">
            {provider.team_size}
          </span>
        </p>
      )}
    </div>
  );
}

// ─── Gallery ──────────────────────────────────────────────────────────────────

export function GallerySection({
  gallery,
  onEdit,
  onDeleted,
}: {
  gallery: Gallery[];
  onEdit: () => void;
  onDeleted: () => void;
}) {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [openAll, setOpenAll] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const { token } = getStoredCredentials();

  const hasImages = gallery.length > 0;
  const previewImages = gallery.slice(0, 5);
  const remainingCount = gallery.length - 5;

  async function handleDelete(galleryId: number, e: React.MouseEvent) {
    e.stopPropagation();
    setDeletingId(galleryId);
    try {
      const res = await fetch(`/api/me/gallery/provider/${galleryId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        toast.error(data.message ?? "Delete failed");
      } else {
        toast.success("Photo removed");
        onDeleted();
      }
    } catch {
      toast.error("Network error. Please try again.");
    }
    setDeletingId(null);
  }

  return (
    <div className="p-4 border-b-2 border-gray-200 space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-[#003225]">Gallery</h2>
        <Button
          size="sm"
          variant="outline"
          onClick={onEdit}
          className="border-[#003225] text-[#003225] hover:bg-[#003225] hover:text-white h-8 text-xs"
        >
          <Edit className="w-3 h-3 mr-1" /> Add Photo
        </Button>
      </div>

      {!hasImages ? (
        <div
          onClick={onEdit}
          className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-200 h-32 cursor-pointer hover:border-[#3ad688]/40 transition"
        >
          <p className="text-sm text-gray-400">No photos yet</p>
          <p className="text-xs text-gray-300">
            Click &quot;Add Photo&quot; to upload
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 grid-rows-2 gap-2 h-52 overflow-hidden rounded-md">
            {previewImages.map((img, index) => {
              const imageUrl = `${BASE_IMAGE_URL}/${img.image}`;
              return (
                <div
                  key={img.id}
                  onClick={() => setActiveImage(imageUrl)}
                  className={`relative cursor-pointer overflow-hidden group ${index === 0 ? "col-span-2 row-span-2" : ""}`}
                >
                  <img
                    src={imageUrl}
                    alt="Gallery"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <button
                    onClick={(e) => handleDelete(img.id, e)}
                    disabled={deletingId === img.id}
                    className="absolute top-1.5 right-1.5 size-6 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-rose-500 transition-colors opacity-0 group-hover:opacity-100 z-10"
                  >
                    {deletingId === img.id ? (
                      <Loader2 className="size-3 animate-spin" />
                    ) : (
                      <Trash2 className="size-3" />
                    )}
                  </button>
                  {index === 4 && remainingCount > 0 && (
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenAll(true);
                      }}
                      className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-sm font-semibold"
                    >
                      +{remainingCount} more
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {gallery.length > 5 && (
            <div className="flex justify-center pt-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setOpenAll(true)}
                className="text-xs text-[#003225]"
              >
                View all photos
              </Button>
            </div>
          )}

          <Dialog
            open={!!activeImage}
            onOpenChange={() => setActiveImage(null)}
          >
            <DialogContent className="max-w-3xl p-0 overflow-hidden">
              {activeImage && (
                <img
                  src={activeImage}
                  alt="Preview"
                  className="w-full h-full object-contain"
                />
              )}
            </DialogContent>
          </Dialog>

          <Dialog open={openAll} onOpenChange={setOpenAll}>
            <DialogContent className="max-w-4xl">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {gallery.map((img) => {
                  const url = `${BASE_IMAGE_URL}/${img.image}`;
                  return (
                    <div
                      key={img.id}
                      className="relative aspect-square overflow-hidden rounded-md group cursor-pointer"
                      onClick={() => {
                        setActiveImage(url);
                        setOpenAll(false);
                      }}
                    >
                      <img
                        src={url}
                        className="w-full h-full object-cover hover:scale-105 transition"
                      />
                      <button
                        onClick={(e) => handleDelete(img.id, e)}
                        disabled={deletingId === img.id}
                        className="absolute top-1.5 right-1.5 size-6 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-rose-500 transition-colors opacity-0 group-hover:opacity-100 z-10"
                      >
                        {deletingId === img.id ? (
                          <Loader2 className="size-3 animate-spin" />
                        ) : (
                          <Trash2 className="size-3" />
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
}

// ─── Availability ─────────────────────────────────────────────────────────────

function AvailabilitySection({
  businessHours,
  onUpdated,
}: {
  businessHours: BusinessHour[];
  onUpdated: () => void;
}) {
  const openDays = new Map(businessHours.map((h) => [h.day, h]));
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-[#003225]">Availability</h2>
      </div>
      <div className="space-y-2">
        {DAY_ORDER.map((short) => (
          <DayRow
            key={short}
            short={short}
            hours={openDays.get(short)}
            isOpen={!!openDays.get(short)}
            onUpdated={onUpdated}
          />
        ))}
      </div>
    </div>
  );
}

function DayRow({
  short,
  hours,
  isOpen,
  onUpdated,
}: {
  short: string;
  hours: BusinessHour | undefined;
  isOpen: boolean;
  onUpdated: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [start, setStart] = useState(hours?.start ?? "");
  const [end, setEnd] = useState(hours?.end ?? "");
  const [saving, setSaving] = useState(false);
  const { token } = getStoredCredentials();

  async function handleSave() {
    if (!hours?.id) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/me/provider/business_hour/${hours.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ start, end }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        toast.error(data.message ?? "Update failed");
      } else {
        toast.success(`${DAY_LABELS[short]} updated`);
        setEditing(false);
        onUpdated();
      }
    } catch {
      toast.error("Network error. Please try again.");
    }
    setSaving(false);
  }

  return (
    <div
      className={`border-l-2 ${isOpen ? "border-l-[#3ad688]" : "border-l-gray-300"} bg-gray-50 p-3 rounded-sm`}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-[#003225]">
            {DAY_LABELS[short]}
          </h3>
          {isOpen ? (
            <Check className="w-3.5 h-3.5 text-[#3ad688]" />
          ) : (
            <X className="w-3.5 h-3.5 text-gray-400" />
          )}
        </div>
        {isOpen && !editing && (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <Clock className="w-3 h-3" />
              <span>
                {hours?.start} – {hours?.end}
              </span>
            </div>
            <button
              onClick={() => {
                setStart(hours?.start ?? "");
                setEnd(hours?.end ?? "");
                setEditing(true);
              }}
              className="text-gray-400 hover:text-[#003225] transition-colors"
            >
              <Edit className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {!isOpen && <p className="text-xs text-gray-400 mt-0.5">Unavailable</p>}

      {isOpen && editing && (
        <div className="mt-2 flex items-center gap-2 flex-wrap">
          <Input
            type="time"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className="h-7 text-xs w-28 border-gray-200"
            disabled={saving}
          />
          <span className="text-xs text-gray-500">to</span>
          <Input
            type="time"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            className="h-7 text-xs w-28 border-gray-200"
            disabled={saving}
          />
          <div className="flex gap-1.5">
            <Button
              size="sm"
              onClick={handleSave}
              disabled={saving}
              className="h-7 text-xs bg-[#003225] text-white hover:bg-[#003225]/90 gap-1"
            >
              {saving ? (
                <Loader2 className="size-3 animate-spin" />
              ) : (
                <CheckCircle2 className="size-3" />
              )}
              Save
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setEditing(false)}
              disabled={saving}
              className="h-7 text-xs"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function ProfileSkeleton() {
  return (
    <div className="mx-auto space-y-4 animate-pulse">
      <div className="flex items-center gap-2">
        <Skeleton className="size-12 rounded-full" />
        <Skeleton className="h-8 w-32 rounded" />
      </div>
      <div className="flex items-start gap-4 p-4 border-b border-gray-200 bg-white">
        <Skeleton className="w-20 h-20 rounded-lg shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-6 w-48 rounded" />
          <Skeleton className="h-4 w-36 rounded" />
          <Skeleton className="h-3 w-28 rounded" />
        </div>
      </div>
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-32 w-full rounded-xl" />
        ))}
      </div>
    </div>
  );
}
