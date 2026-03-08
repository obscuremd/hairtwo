"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import {
  Clock,
  EditPencil,
  MediaImage,
  NavArrowRight,
  Plus,
  Star,
} from "iconoir-react";
import { Tag } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

/* ─────────────────────────────────────────────────────────────
   LIST SECTION
───────────────────────────────────────────────────────────── */

export function ServiceListSection({
  data,
  onCreate,
  createLabel = "New Service",
}: {
  data: Service[];
  onCreate?: () => void;
  createLabel?: string;
}) {
  return (
    <div className="space-y-5">
      {/* Header */}
      {onCreate && (
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-base font-semibold text-secondary-c">
              Services
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              {data.length} service{data.length !== 1 ? "s" : ""} configured
            </p>
          </div>
          <Button
            onClick={onCreate}
            className="h-9 rounded-lg bg-primary-c hover:bg-secondary-c text-white text-sm border-0 gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            {createLabel}
          </Button>
        </div>
      )}

      {/* Divided list */}
      <div className="divide-y divide-gray-100">
        {data.map((service, idx) => (
          <ServiceRow key={service.id ?? idx} service={service} />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   SERVICE ROW  —  owns its own Sheet state
───────────────────────────────────────────────────────────── */

function ServiceRow({ service }: { service: Service }) {
  const [sheetOpen, setSheetOpen] = useState(false);

  const images = service.images ?? [];
  const hasDiscount = !!service.discount_price;
  const isActive = service.status !== "inactive";
  const isPremium = service.premium === 1;
  const savePct =
    hasDiscount && service.discount_price
      ? Math.round(
          ((parseFloat(service.price) - parseFloat(service.discount_price)) /
            parseFloat(service.price)) *
            100,
        )
      : null;

  return (
    <>
      {/* ── ROW ─────────────────────────────────────────── */}
      <div className="group py-5 flex flex-col md:flex-row md:items-start md:justify-between gap-5">
        {/* LEFT — info */}
        <div className="flex gap-4 flex-1 min-w-0">
          {/* Text block */}
          <div className="flex-1 min-w-0 space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-sm font-semibold text-gray-900 leading-tight">
                {service.title}
              </p>

              {isPremium && (
                <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-amber-700 bg-amber-100 border border-amber-200 px-1.5 py-0.5 rounded-full">
                  <Star className="w-2.5 h-2.5" />
                  Premium
                </span>
              )}

              <span
                className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                  isActive
                    ? "bg-primary-c/10 text-primary-c"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {isActive ? "Active" : "Inactive"}
              </span>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">
              {service.description}
            </p>

            {/* Portfolio thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-1.5 pt-0.5">
                {images.map((src, i) => (
                  <motion.img
                    key={i}
                    src={src}
                    alt=""
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.15 }}
                    className="h-10 w-10 rounded-md object-cover border border-gray-200 cursor-pointer"
                  />
                ))}
                {images.length > 5 && (
                  <div className="h-8 w-8 rounded-md bg-gray-100 border border-gray-200 flex items-center justify-center text-[10px] font-medium text-gray-500">
                    +{images.length - 5}
                  </div>
                )}
              </div>
            )}

            {/* Discount badge */}
            {savePct && (
              <Badge className="text-[#004737] bg-[#12ab594a] border-0 text-[10px] px-2 py-0.5 w-fit">
                <Tag className="w-2.5 h-2.5 mr-1" />
                Save {savePct}%
              </Badge>
            )}
          </div>
        </div>

        {/* RIGHT — price + duration + action */}
        <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start gap-3 md:min-w-[130px] shrink-0">
          {/* Price block */}
          <div className="flex items-baseline gap-1.5">
            <p
              className={`text-base ${
                hasDiscount
                  ? "line-through text-gray-400 text-sm"
                  : "font-semibold text-secondary-c"
              }`}
            >
              ₦{service.price}
            </p>
            {hasDiscount && (
              <p className="text-base font-semibold text-secondary-c">
                ₦{service.discount_price}
              </p>
            )}
          </div>

          {/* Duration */}
          <p className="flex items-center gap-1 text-xs text-gray-400">
            <Clock className="w-3.5 h-3.5" />
            {parseInt(service.duration) >= 60
              ? `${Math.floor(parseInt(service.duration) / 60)}h${parseInt(service.duration) % 60 ? ` ${parseInt(service.duration) % 60}m` : ""}`
              : `${service.duration} min`}
          </p>

          {/* Edit button */}
          <Button
            size="sm"
            variant="outline"
            onClick={() => setSheetOpen(true)}
            className="h-8 rounded-lg text-xs font-medium border-gray-200 text-gray-600 hover:border-primary-c hover:text-primary-c gap-1.5 transition-colors"
          >
            <EditPencil className="w-3.5 h-3.5" />
            Edit
          </Button>
        </div>
      </div>

      {/* ── SHEET ───────────────────────────────────────── */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-md p-0 flex flex-col bg-white"
        >
          {/* Top accent header */}
          <div className="border-l-2 border-l-primary-c px-6 py-5 border-b">
            <SheetTitle className="text-base font-semibold text-secondary-c leading-tight">
              {service.title}
            </SheetTitle>
            <p className="text-xs text-gray-400 mt-0.5">
              Update service details below.
            </p>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-7">
            {/* Portfolio images */}
            {images.length > 0 && (
              <div className="space-y-2">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400">
                  Portfolio Images
                </p>
                <div className="flex gap-2 flex-wrap">
                  {images.map((src, i) => (
                    <div
                      key={i}
                      className="h-20 w-20 rounded-xl overflow-hidden border border-gray-200"
                    >
                      <img
                        src={src}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Basic info */}
            <div className="space-y-4">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400">
                Basic Information
              </p>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-600">
                  Title
                </label>
                <Input
                  defaultValue={service.title}
                  className="h-10 border-gray-200 focus-visible:ring-1 focus-visible:ring-primary-c text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-600">
                  Description
                </label>
                <Textarea
                  defaultValue={service.description}
                  className="min-h-[90px] resize-none border-gray-200 focus-visible:ring-1 focus-visible:ring-primary-c text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-600">
                    Price (₦)
                  </label>
                  <Input
                    defaultValue={service.price}
                    type="number"
                    className="h-10 border-gray-200 focus-visible:ring-1 focus-visible:ring-primary-c text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-600">
                    Discount price (₦)
                  </label>
                  <Input
                    defaultValue={service.discount_price ?? ""}
                    type="number"
                    placeholder="—"
                    className="h-10 border-gray-200 focus-visible:ring-1 focus-visible:ring-primary-c text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-600">
                  Duration (minutes)
                </label>
                <Input
                  defaultValue={service.duration}
                  type="number"
                  className="h-10 border-gray-200 focus-visible:ring-1 focus-visible:ring-primary-c text-sm"
                />
              </div>
            </div>

            {/* Meta */}
            <div className="space-y-3">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400">
                Details
              </p>
              {[
                { label: "Status", value: service.status ?? "active" },
                {
                  label: "Recurrence",
                  value: `Every ${service.recurrence} booking(s)`,
                },
                {
                  label: "Last updated",
                  value: service.updated_at
                    ? new Date(service.updated_at).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })
                    : "—",
                },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-gray-500">{row.label}</span>
                  <span className="font-medium text-gray-800 capitalize">
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Fixed bottom action bar */}
          <div className="border-t px-6 py-4 bg-white">
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 rounded-lg border-gray-200 text-sm"
                onClick={() => setSheetOpen(false)}
              >
                Cancel
              </Button>
              <Button className="flex-1 rounded-lg bg-primary-c hover:bg-secondary-c text-white border-0 text-sm">
                Save changes
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
