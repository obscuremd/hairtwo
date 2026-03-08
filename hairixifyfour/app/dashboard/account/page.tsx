"use client";

import { useState } from "react";
import {
  Edit,
  MapPin,
  Phone,
  Mail,
  Star,
  Clock,
  Check,
  X,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UseGen } from "@/context/GeneralContext";
import { EditGalleryDialog } from "@/components/screenComponents/Dashboard/profile/EditGalleryDialog";

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
  const avatarImage = gallery[0]
    ? `${BASE_IMAGE_URL}/${gallery[0].image}`
    : null;

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
        {avatarImage ? (
          <img
            src={avatarImage}
            alt={authProvider.business_name}
            className="w-20 h-20 rounded-lg object-cover border border-gray-200 shrink-0"
          />
        ) : (
          <div className="w-20 h-20 rounded-lg border border-gray-200 bg-[#003225]/10 flex items-center justify-center shrink-0">
            <span className="text-2xl font-bold text-[#003225]">
              {initials}
            </span>
          </div>
        )}
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
        <Button
          size="sm"
          variant="outline"
          className="border-[#003225] text-[#003225] hover:bg-[#003225] hover:text-white h-8 text-xs shrink-0"
        >
          <Edit className="w-3 h-3 mr-1" /> Edit
        </Button>
      </div>

      {/* Mobile tabs */}
      <div className="lg:hidden">
        <Tabs defaultValue="business" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-100 p-1">
            {["business", "gallery", "services", "availability"].map((tab) => (
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
            <BusinessInfoSection provider={authProvider} />
          </TabsContent>
          <TabsContent value="gallery" className="mt-4">
            <GallerySection
              gallery={gallery}
              onEdit={() => setGalleryOpen(true)}
            />
          </TabsContent>
          <TabsContent value="services" className="mt-4">
            <ServiceMenuSection provider={authProvider} />
          </TabsContent>
          <TabsContent value="availability" className="mt-4">
            <AvailabilitySection
              businessHours={authProvider.business_hours ?? []}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Desktop: all sections */}
      <div className="hidden lg:block space-y-4">
        <GallerySection gallery={gallery} onEdit={() => setGalleryOpen(true)} />
        <BusinessInfoSection provider={authProvider} />
        <ServiceMenuSection provider={authProvider} />
        <AvailabilitySection
          businessHours={authProvider.business_hours ?? []}
        />
      </div>

      {/* Gallery upload dialog */}
      <EditGalleryDialog
        open={galleryOpen}
        onOpenChange={setGalleryOpen}
        providerId={authProvider.id}
        onUploaded={() => {
          setGalleryOpen(false);
          refreshAuth(); // re-fetch provider so new gallery image appears
        }}
      />
    </div>
  );
}

// ─── Business Info ────────────────────────────────────────────────────────────

function BusinessInfoSection({ provider }: { provider: Provider }) {
  return (
    <div className="p-4 border-b-2 border-gray-200 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-[#003225]">Business Info</h2>
        <Button
          size="sm"
          variant="outline"
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

function GallerySection({
  gallery,
  onEdit,
}: {
  gallery: Gallery[];
  onEdit: () => void;
}) {
  const hasImages = gallery.length > 0;

  return (
    <div className="p-4 border-b-2 border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-[#003225]">Gallery</h2>
        <Button
          size="sm"
          variant="outline"
          onClick={onEdit}
          className="border-[#003225] text-[#003225] hover:bg-[#003225] hover:text-white h-7 text-xs"
        >
          <Edit className="w-3 h-3 mr-1" /> Add Photo
        </Button>
      </div>

      {!hasImages ? (
        <div
          onClick={onEdit}
          className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-200 h-36 cursor-pointer hover:border-[#3ad688]/40 transition-colors"
        >
          <p className="text-sm text-gray-400">No photos yet</p>
          <p className="text-xs text-gray-300">
            Click &quot;Add Photo&quot; to get started
          </p>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-2">
          {/* First two as large banners */}
          {gallery.slice(0, 2).map((img, i) => (
            <div
              key={img.id}
              className="flex-1 h-36 overflow-hidden rounded-sm"
            >
              <img
                src={`${BASE_IMAGE_URL}/${img.image}`}
                alt={`Gallery ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          {/* Rest as grid */}
          {gallery.length > 2 && (
            <div className="grid grid-cols-2 gap-2">
              {gallery.slice(2, 6).map((img, i) => (
                <div
                  key={img.id}
                  className="h-[68px] overflow-hidden rounded-sm"
                >
                  <img
                    src={`${BASE_IMAGE_URL}/${img.image}`}
                    alt={`Gallery ${i + 3}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Service menu (from provider context — name + category placeholder) ───────
// Full service list lives on CheckoutPage; here we show a lightweight summary

function ServiceMenuSection({ provider }: { provider: Provider }) {
  return (
    <div className="p-4 border-b-2 border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-[#003225]">Service Menu</h2>
        <Button
          size="sm"
          variant="outline"
          className="border-[#003225] text-[#003225] hover:bg-[#003225] hover:text-white h-7 text-xs"
        >
          <Edit className="w-3 h-3 mr-1" /> Edit
        </Button>
      </div>
      <div className="border-l-2 border-l-[#3ad688] bg-gray-50 p-3 rounded-sm">
        <div className="flex justify-between items-start gap-2">
          <div>
            <h3 className="text-sm font-semibold text-[#003225]">
              {provider.category?.name ?? "Services"}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Manage all services from the Transactions page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Availability ─────────────────────────────────────────────────────────────

function AvailabilitySection({
  businessHours,
}: {
  businessHours: BusinessHour[];
}) {
  // Show all days Mon–Sun; mark open ones from businessHours
  const openDays = new Map(businessHours.map((h) => [h.day, h]));

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-[#003225]">Availability</h2>
        <Button
          size="sm"
          variant="outline"
          className="border-[#003225] text-[#003225] hover:bg-[#003225] hover:text-white h-7 text-xs"
        >
          <Edit className="w-3 h-3 mr-1" /> Edit
        </Button>
      </div>
      <div className="space-y-2">
        {DAY_ORDER.map((short) => {
          const hours = openDays.get(short);
          const isOpen = !!hours;
          return (
            <div
              key={short}
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
                {isOpen && hours && (
                  <div className="flex items-center gap-1 text-xs text-gray-600">
                    <Clock className="w-3 h-3" />
                    <span>
                      {hours.start} – {hours.end}
                    </span>
                  </div>
                )}
              </div>
              {!isOpen && (
                <p className="text-xs text-gray-400 mt-0.5">Unavailable</p>
              )}
            </div>
          );
        })}
      </div>
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
