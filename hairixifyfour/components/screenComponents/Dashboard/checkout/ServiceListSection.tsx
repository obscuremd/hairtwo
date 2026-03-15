"use client";

// ─────────────────────────────────────────────
// components/screenComponents/Dashboard/checkout/ServiceListSection.tsx
// ─────────────────────────────────────────────

import { useState } from "react";
import { Clock, ImageOff, Pencil, Plus, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AddServiceDialog } from "./AddServiceDialog";
import { EditServiceSheet } from "./EditServiceSheet";
import { cn } from "@/lib/utils";

const BASE_IMAGE_URL = "https://api5.project.hairxify.com";

interface ServiceListSectionProps {
  data: Service[];
  onRefresh: () => void;
  createLabel?: string;
}

function formatPrice(price: string) {
  const num = parseFloat(price);
  if (isNaN(num)) return price;
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(num);
}

export function ServiceListSection({
  data,
  onRefresh,
  createLabel = "New Service",
}: ServiceListSectionProps) {
  const [addOpen, setAddOpen] = useState(false);
  const [editService, setEditService] = useState<Service | null>(null);

  const activeCount = data.filter((s) => s.status === "active").length;

  return (
    <>
      {/* Header row */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-semibold text-t-primary">
            {data.length} service{data.length !== 1 ? "s" : ""}
          </h3>
          <p className="text-xs text-t-secondary mt-0.5">
            {activeCount} active
          </p>
        </div>
        <Button
          size="sm"
          onClick={() => setAddOpen(true)}
          className="bg-primary-c hover:bg-primary-c/90 text-white gap-1.5"
        >
          <Plus className="size-3.5" />
          {createLabel}
        </Button>
      </div>

      {/* Service list */}
      {data.length === 0 ? (
        <div className="py-14 flex flex-col items-center gap-3 text-center">
          <div className="size-12 rounded-full bg-gray-100 flex items-center justify-center">
            <Zap className="size-5 text-gray-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-t-primary">
              No services yet
            </p>
            <p className="text-xs text-t-secondary mt-0.5">
              Add your first service to start accepting bookings.
            </p>
          </div>
          <Button
            size="sm"
            onClick={() => setAddOpen(true)}
            className="bg-primary-c hover:bg-primary-c/90 text-white mt-1"
          >
            <Plus className="size-3.5 mr-1.5" />
            {createLabel}
          </Button>
        </div>
      ) : (
        <div className="divide-y divide-gray-100">
          {data.map((service, i) => (
            <ServiceRow
              key={service.id ?? i}
              service={service}
              onEdit={() => setEditService(service)}
            />
          ))}
        </div>
      )}

      {/* Add dialog */}
      <AddServiceDialog
        open={addOpen}
        onOpenChange={setAddOpen}
        onCreated={() => {
          setAddOpen(false);
          onRefresh();
        }}
      />

      {/* Edit sheet */}
      {editService && (
        <EditServiceSheet
          open
          onOpenChange={(o) => {
            if (!o) setEditService(null);
          }}
          service={editService}
          onUpdated={onRefresh}
        />
      )}
    </>
  );
}

// ─── Individual service row ───────────────────

function ServiceRow({
  service,
  onEdit,
}: {
  service: Service;
  onEdit: () => void;
}) {
  const isActive = service.status === "active";
  const isPremium = service.premium === 1;
  const hasDiscount =
    service.discount_price != null && service.discount_price !== "";

  // First image for the thumbnail
  const firstImage = service.images?.[0] ?? null;

  return (
    <div className="flex items-center gap-4 py-4 group">
      {/* Thumbnail */}
      <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 shrink-0 flex items-center justify-center">
        {firstImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`${BASE_IMAGE_URL}/${firstImage.image}`}
            alt={service.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Swap to fallback icon on broken URL
              (e.target as HTMLImageElement).style.display = "none";
              (
                e.target as HTMLImageElement
              ).nextElementSibling?.classList.remove("hidden");
            }}
          />
        ) : null}
        <ImageOff
          className={cn(
            "size-4 text-gray-300",
            firstImage ? "hidden" : "block",
          )}
        />
      </div>

      {/* Left — info */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-sm font-semibold text-t-primary truncate">
            {service.title}
          </p>
          {isPremium && (
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-[10px] font-medium text-amber-700">
              <Star className="size-2.5 fill-amber-500 text-amber-500" />
              Premium
            </span>
          )}
          <Badge
            variant="outline"
            className={cn(
              "text-[10px] font-medium",
              isActive
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : "bg-gray-100 text-gray-500 border-gray-200",
            )}
          >
            <span
              className={cn(
                "mr-1 inline-block w-1.5 h-1.5 rounded-full",
                isActive ? "bg-emerald-500" : "bg-gray-400",
              )}
            />
            {isActive ? "Active" : "Inactive"}
          </Badge>
        </div>

        <p className="text-xs text-t-secondary mt-0.5 line-clamp-1">
          {service.description}
        </p>

        <div className="flex items-center gap-3 mt-1">
          <span className="flex items-center gap-1 text-xs text-t-secondary">
            <Clock className="size-3 text-gray-400" />
            {service.duration} min
          </span>
        </div>
      </div>

      {/* Right — price + edit */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="text-right">
          <p className="text-sm font-bold text-t-primary">
            {formatPrice(hasDiscount ? service.discount_price! : service.price)}
          </p>
          {hasDiscount && (
            <p className="text-[11px] text-gray-400 line-through">
              {formatPrice(service.price)}
            </p>
          )}
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={onEdit}
          className="h-8 w-8 p-0 text-gray-400 hover:text-primary-c hover:bg-primary-c/5 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label={`Edit ${service.title}`}
        >
          <Pencil className="size-3.5" />
        </Button>
      </div>
    </div>
  );
}
