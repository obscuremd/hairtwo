"use client";

import { useState } from "react";
import { ItemType } from "@/app/dashboard/transactions/page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { StatusBadge } from "./StatusBadge";
import { EditPencil, Plus, Clock, Calendar } from "iconoir-react";

/* ─────────────────────────────────────────────────────────────
   LIST SECTION
───────────────────────────────────────────────────────────── */

export function ListSection({
  data,
  onCreate,
  createLabel = "Create New",
}: {
  data: ItemType[];
  onCreate?: () => void;
  createLabel?: string;
}) {
  return (
    <div className="space-y-6">
      {/* Header */}
      {onCreate && (
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-base font-semibold text-secondary-c">
              Manage Items
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              View and update records below.
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

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {data.map((item) => (
          <ListItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   LIST ITEM  —  owns its own Sheet state
───────────────────────────────────────────────────────────── */

const statusStyles: Record<
  string,
  { border: string; bg: string; text: string }
> = {
  success: {
    border: "border-l-green-500",
    bg: "bg-green-50",
    text: "text-green-600",
  },
  pending: {
    border: "border-l-yellow-500",
    bg: "bg-yellow-50",
    text: "text-yellow-600",
  },
  failed: {
    border: "border-l-red-500",
    bg: "bg-red-50",
    text: "text-red-600",
  },
  active: {
    border: "border-l-blue-500",
    bg: "bg-blue-50",
    text: "text-blue-600",
  },
  default: {
    border: "border-l-primary-c",
    bg: "bg-primary-c/5",
    text: "text-primary-c",
  },
};

function ListItem({ item }: { item: ItemType }) {
  const [open, setOpen] = useState(false);

  const style =
    statusStyles[item.status as keyof typeof statusStyles] ??
    statusStyles.default;

  return (
    <>
      {/* ── CARD ──────────────────────────────────────── */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`group w-full text-left border-l-2 ${style.border} rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 bg-white`}
      >
        <div className="flex items-start gap-3">
          {/* Icon indicator */}
          <div className={`p-2 rounded-lg shrink-0 ${style.bg}`}>
            <Clock className={`w-4 h-4 ${style.text}`} />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-sm text-gray-900 leading-tight truncate group-hover:text-secondary-c transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">
                  {item.description}
                </p>
              </div>
              {item.status && <StatusBadge status={item.status} />}
            </div>

            {/* Meta row */}
            <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
              {item.price && (
                <span className="font-medium text-gray-700">{item.price}</span>
              )}
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                Updated recently
              </span>
            </div>
          </div>

          {/* Edit icon */}
          <EditPencil className="w-3.5 h-3.5 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-0.5" />
        </div>
      </button>

      {/* ── SHEET ─────────────────────────────────────── */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-md p-0 flex flex-col bg-white"
        >
          {/* Header */}
          <div className="border-l-2 border-l-primary-c px-6 py-5 border-b">
            <SheetTitle className="text-base font-semibold text-secondary-c leading-tight">
              {item.title}
            </SheetTitle>
            <p className="text-xs text-gray-400 mt-0.5">
              Update item details and manage settings below.
            </p>
          </div>

          {/* Scrollable body */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-7">
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
                  defaultValue={item.title}
                  className="h-10 border-gray-200 focus-visible:ring-1 focus-visible:ring-primary-c text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-600">
                  Description
                </label>
                <Textarea
                  defaultValue={item.description}
                  className="min-h-[100px] resize-none border-gray-200 focus-visible:ring-1 focus-visible:ring-primary-c text-sm"
                />
              </div>

              {item.price && (
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-600">
                    Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                      ₦
                    </span>
                    <Input
                      defaultValue={item.price}
                      type="number"
                      step="0.01"
                      className="pl-7 h-10 border-gray-200 focus-visible:ring-1 focus-visible:ring-primary-c text-sm"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Additional details */}
            <div className="space-y-3">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400">
                Additional Details
              </p>

              {[
                {
                  label: "Status",
                  value: (
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full ${style.bg} ${style.text} capitalize`}
                    >
                      {item.status ?? "—"}
                    </span>
                  ),
                },
                { label: "Record ID", value: `#${item.id}` },
                { label: "Last Updated", value: "Today" },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-gray-500">{row.label}</span>
                  <span className="font-medium text-gray-800">{row.value}</span>
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
                onClick={() => setOpen(false)}
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
