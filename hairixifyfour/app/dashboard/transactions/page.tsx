"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Pencil, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";
import { ListSection } from "@/components/screenComponents/Dashboard/checkout/ListSection";

export type ItemType = {
  id: number;
  title: string;
  description: string;
  status?: "success" | "pending" | "failed" | "active";
  price?: string;
};

export default function CheckoutPage() {
  const [activeItem, setActiveItem] = useState<ItemType | null>(null);
  const [open, setOpen] = useState(false);

  const services: ItemType[] = [
    {
      id: 1,
      title: "Classic Haircut",
      description: "Precision cut tailored to your style",
      price: "$40",
    },
    {
      id: 2,
      title: "Premium Hair Coloring",
      description: "Full head color with ammonia-free products",
      price: "$95",
    },
    {
      id: 3,
      title: "Beard Grooming",
      description: "Trim, shape and finish with hot towel",
      price: "$25",
    },
    {
      id: 4,
      title: "Keratin Treatment",
      description: "Smooth and frizz-free finish",
      price: "$150",
    },
    {
      id: 5,
      title: "Hair Wash & Blow Dry",
      description: "Professional wash with volume styling",
      price: "$35",
    },
    {
      id: 6,
      title: "Bridal Styling Package",
      description: "Complete wedding day hair styling",
      price: "$220",
    },
  ];

  const transactions: ItemType[] = [
    {
      id: 101,
      title: "Order #2041",
      description: "Keratin Treatment payment",
      status: "success",
    },
    {
      id: 102,
      title: "Order #2042",
      description: "Beard Grooming",
      status: "pending",
    },
    {
      id: 103,
      title: "Order #2043",
      description: "Hair Coloring",
      status: "failed",
    },
    {
      id: 104,
      title: "Order #2044",
      description: "Bridal Styling Deposit",
      status: "success",
    },
    {
      id: 105,
      title: "Order #2045",
      description: "Hair Wash & Blow Dry",
      status: "success",
    },
    {
      id: 106,
      title: "Order #2046",
      description: "Classic Haircut",
      status: "pending",
    },
  ];

  const sales: ItemType[] = [
    {
      id: 301,
      title: "Booking #5021",
      description: "Classic Haircut - John D.",
      status: "active",
    },
    {
      id: 302,
      title: "Booking #5022",
      description: "Hair Coloring - Maria K.",
      status: "success",
    },
    {
      id: 303,
      title: "Booking #5023",
      description: "Beard Grooming - Alex R.",
      status: "failed",
    },
    {
      id: 304,
      title: "Booking #5024",
      description: "Keratin Treatment - Sarah W.",
      status: "active",
    },
    {
      id: 305,
      title: "Booking #5025",
      description: "Bridal Styling - Emily T.",
      status: "success",
    },
    {
      id: 306,
      title: "Booking #5026",
      description: "Wash & Blow Dry - Chloe M.",
      status: "active",
    },
  ];

  function openSheet(item: ItemType) {
    setActiveItem(item);
    setOpen(true);
  }

  return (
    <div className="w-full space-y-10 min-h-screen">
      {/* ---------- PAGE HEADER ---------- */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="flex size-12 items-center justify-center rounded-full border p-3">
            <DollarSign className="size-6 text-t-secondary" />
          </div>
          <p className="text-3xl font-semibold tracking-tight">Transactions</p>
        </div>
        <p className="text-sm text-gray-500 max-w-2xl">
          Manage your salon operations in one place. Track services offered,
          monitor transaction history, and review completed or active sales.
        </p>
      </div>

      {/* ---------- QUICK STATS ---------- */}
      <div className="flex flex-wrap items-center gap-6">
        <StatItem
          label="Services"
          value={services.length}
          subtext="Active offerings"
        />

        <StatItem
          label="Transactions"
          value={transactions.length}
          subtext="All time"
        />

        <StatItem
          label="Active Sales"
          value={sales.filter((s) => s.status === "active").length}
          subtext="Currently running"
        />
      </div>

      {/* ---------- TABS ---------- */}
      <Tabs defaultValue="services" className="w-full">
        {/* Tabs Header */}
        <TabsList className=" inline-flex bg-white border border-gray-200 rounded-xl p-1 gap-1 shadow-sm ">
          <TabsTrigger
            value="services"
            className=" px-5 py-2 text-sm font-medium rounded-lg text-gray-600 data-[state=active]:bg-[#003225] data-[state=active]:text-white transition-all "
          >
            Services
          </TabsTrigger>
          <TabsTrigger
            value="transactions"
            className=" px-5 py-2 text-sm font-medium rounded-lg text-gray-600 data-[state=active]:bg-[#003225] data-[state=active]:text-white transition-all "
          >
            Transactions
          </TabsTrigger>

          <TabsTrigger
            value="sales"
            className=" px-5 py-2 text-sm font-medium rounded-lg text-gray-600 data-[state=active]:bg-[#003225] data-[state=active]:text-white transition-all "
          >
            Sales
          </TabsTrigger>
        </TabsList>

        {/* ---------- SERVICES TAB ---------- */}
        <TabsContent value="services" className="pt-8 space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-[#003225]">
              Available Services
            </h2>
            <p className="text-sm text-gray-500">
              Create and manage the services your salon offers, including
              pricing and descriptions.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <ListSection
              data={services}
              onItemClick={openSheet}
              onCreate={() => console.log("Create service")}
              createLabel="New Service"
            />
          </div>
        </TabsContent>

        {/* ---------- TRANSACTIONS TAB ---------- */}
        <TabsContent value="transactions" className="pt-8 space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-[#003225]">
              Transaction History
            </h2>
            <p className="text-sm text-gray-500">
              Monitor payment activity, review successful transactions, and
              investigate failed or pending payments.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <ListSection data={transactions} onItemClick={openSheet} />
          </div>
        </TabsContent>

        {/* ---------- SALES TAB ---------- */}
        <TabsContent value="sales" className="pt-8 space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-[#003225]">
              Sales & Bookings
            </h2>
            <p className="text-sm text-gray-500">
              Track active bookings, completed sales, and cancelled appointments
              in real time.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <ListSection data={sales} onItemClick={openSheet} />
          </div>
        </TabsContent>
      </Tabs>

      {/* ---------- RIGHT SHEET ---------- */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-md p-0 flex flex-col bg-white"
        >
          {activeItem && (
            <>
              {/* Top Accent + Header */}
              <div className="border-l-2 border-l-[#3ad688] px-6 py-6 border-b">
                <SheetTitle className="text-lg font-semibold text-[#003225] leading-tight">
                  {activeItem.title}
                </SheetTitle>

                <p className="text-xs text-gray-500 mt-1">
                  Update item details and manage settings below.
                </p>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
                {/* Basic Info Section */}
                <div className="space-y-5">
                  <h3 className="text-xs uppercase tracking-wide text-gray-400 font-medium">
                    Basic Information
                  </h3>

                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-600">
                      Title
                    </label>
                    <Input
                      defaultValue={activeItem.title}
                      className="h-10 border-gray-200 focus-visible:ring-1 focus-visible:ring-[#3ad688]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-600">
                      Description
                    </label>
                    <Textarea
                      defaultValue={activeItem.description}
                      className="min-h-[110px] resize-none border-gray-200 focus-visible:ring-1 focus-visible:ring-[#3ad688]"
                    />
                  </div>

                  {activeItem.price && (
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-gray-600">
                        Price
                      </label>

                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                          $
                        </span>
                        <Input
                          defaultValue={activeItem.price}
                          type="number"
                          step="0.01"
                          className="pl-7 h-10 border-gray-200 focus-visible:ring-1 focus-visible:ring-[#3ad688]"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Additional Details Section */}
                <div className="space-y-5">
                  <h3 className="text-xs uppercase tracking-wide text-gray-400 font-medium">
                    Additional Details
                  </h3>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Status</span>
                    <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs border border-blue-200">
                      Active
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Created</span>
                    <span className="text-gray-700">12 Feb 2026</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Last Updated</span>
                    <span className="text-gray-700">Today</span>
                  </div>
                </div>
              </div>

              {/* Fixed Bottom Action Bar */}
              <div className="border-t px-6 py-4 bg-white">
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button className="flex-1 bg-[#003225] hover:bg-[#00251b]">
                    Save Changes
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

function StatItem({
  label,
  value,
  subtext,
}: {
  label: string;
  value: number;
  subtext: string;
}) {
  return (
    <div className="shadow-sm py-2 px-4 rounded-md flex items-center gap-4">
      <div className="h-9 w-9 rounded-md bg-[#3ad688]/10 flex items-center justify-center">
        <div className="h-2 w-2 rounded-full bg-[#3ad688]" />
      </div>

      <div>
        <p className="text-sm font-semibold text-[#003225]">{value}</p>
        <p className="text-xs text-gray-500">
          {label} · {subtext}
        </p>
      </div>
    </div>
  );
}
