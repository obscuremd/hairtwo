"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DollarSign } from "lucide-react";
import { ListSection } from "@/components/screenComponents/Dashboard/checkout/ListSection";
import { ServiceListSection } from "@/components/screenComponents/Dashboard/checkout/ServiceListSection";

export type ItemType = {
  id: number;
  title: string;
  description: string;
  status?: "success" | "pending" | "failed" | "active";
  price?: string;
};

export default function CheckoutPage() {
  const services: Service[] = [
    {
      id: 1,
      title: "Classic Haircut",
      description:
        "Precision cut tailored to your personal style and face shape.",
      price: "40",
      discount_price: "35",
      duration: "30",
      recurrence: 1,
      status: "active",
      premium: 0,
      created_at: "2025-11-01T10:00:00Z",
      updated_at: "2026-01-15T08:30:00Z",
      Images: [
        "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400&q=80",
        "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400&q=80",
      ],
    },
    {
      id: 2,
      title: "Premium Hair Coloring",
      description:
        "Full head color with ammonia-free products and glossing treatment.",
      price: "95",
      duration: "120",
      recurrence: 2,
      status: "active",
      premium: 1,
      created_at: "2025-11-05T09:00:00Z",
      updated_at: "2026-02-01T11:00:00Z",
      Images: [
        "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&q=80",
        "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&q=80",
        "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=400&q=80",
      ],
    },
    {
      id: 3,
      title: "Beard Grooming",
      description:
        "Trim, shape and finish with hot towel and premium beard oil.",
      price: "25",
      duration: "20",
      recurrence: 1,
      status: "active",
      premium: 0,
      created_at: "2025-11-10T08:00:00Z",
      updated_at: "2026-01-20T09:00:00Z",
      Images: [
        "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&q=80",
      ],
    },
    {
      id: 4,
      title: "Keratin Treatment",
      description: "Smooth and frizz-free finish lasting up to 4 months.",
      price: "150",
      discount_price: "130",
      duration: "180",
      recurrence: 3,
      status: "active",
      premium: 1,
      created_at: "2025-12-01T10:00:00Z",
      updated_at: "2026-02-10T14:00:00Z",
      Images: [
        "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80",
        "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&q=80",
      ],
    },
    {
      id: 5,
      title: "Hair Wash & Blow Dry",
      description:
        "Professional wash with volume styling and conditioning mask.",
      price: "35",
      duration: "45",
      recurrence: 1,
      status: "inactive",
      premium: 0,
      created_at: "2025-12-15T09:00:00Z",
      updated_at: "2026-01-30T10:00:00Z",
      Images: [
        "https://images.unsplash.com/photo-1552642986-ccb41e7059e7?w=400&q=80",
      ],
    },
    {
      id: 6,
      title: "Bridal Styling Package",
      description:
        "Complete wedding day hair styling with trials and touch-up kit.",
      price: "220",
      duration: "240",
      recurrence: 4,
      status: "active",
      premium: 1,
      created_at: "2026-01-01T08:00:00Z",
      updated_at: "2026-02-20T12:00:00Z",
      Images: [
        "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=400&q=80",
        "https://images.unsplash.com/photo-1525373698358-041e3a460346?w=400&q=80",
        "https://images.unsplash.com/photo-1559599101-f09722fb4948?w=400&q=80",
      ],
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
            <ServiceListSection
              data={services}
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
            <ListSection data={transactions} />
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
            <ListSection data={sales} />
          </div>
        </TabsContent>
      </Tabs>
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
