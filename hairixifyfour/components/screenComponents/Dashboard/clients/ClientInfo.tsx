"use client";
import { Client } from "@/app/dashboard/clients/page";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  BookUser,
  LockKeyhole,
  User,
  Mail,
  Phone,
  MessageSquare,
  Calendar,
  FileText,
  Pin,
} from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

export function ClientsList({ clients }: { clients: Client[] }) {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleSelect = (client: Client) => {
    setSelectedClient(client);
    if (isMobile) {
      setMobileOpen(true); // open sheet on mobile
    }
  };

  return (
    <>
      <div className="flex gap-8">
        {/* ================= LEFT PANEL ================= */}
        <div className="w-full md:w-[35%] max-h-[75vh] flex flex-col bg-white border border-[#e6e3d6] rounded-xl shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[#e6e3d6]">
            <div>
              <h1 className="text-lg font-semibold text-[#003225]">Clients</h1>
              <p className="text-xs text-muted-foreground">
                {clients.length} total clients
              </p>
            </div>

            <DialogTrigger asChild>
              <Button size="sm" className="bg-[#003225] hover:bg-[#003225]/90">
                Add
              </Button>
            </DialogTrigger>
          </div>

          {/* List */}
          <div className="p-4 space-y-2 overflow-y-auto">
            {clients.map((client, index) => (
              <button
                key={index}
                onClick={() => handleSelect(client)}
                className="w-full text-left"
              >
                <ClientCard client={client} />
              </button>
            ))}
          </div>
        </div>

        {/* ================= DESKTOP RIGHT PANEL ================= */}
        <div className="hidden md:block flex-1 bg-white border border-[#e6e3d6] rounded-xl shadow-sm min-h-[75vh]">
          {selectedClient ? (
            <ClientDescription client={selectedClient} />
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground">
              <User className="w-8 h-8 mb-3 text-[#003225]" />
              <p className="text-sm">
                Select a client from your list to view details
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ================= MOBILE SHEET ================= */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="right" className="w-full sm:max-w-md p-0">
          {selectedClient && <ClientDescription client={selectedClient} />}
        </SheetContent>
      </Sheet>
    </>
  );
}

function ClientDescription({ client }: { client: Client }) {
  const [activeTab, setActiveTab] = useState<
    "overview" | "appointments" | "notes"
  >("overview");

  return (
    <div className="flex flex-col h-full">
      {/* ================= PROFILE HEADER ================= */}
      <div className="p-8 border-b border-[#e6e3d6]">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-full bg-[#003225]/10 flex items-center justify-center text-2xl font-semibold text-[#003225]">
              {client.name.charAt(0).toUpperCase()}
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#003225]">
                {client.name}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {client.gender}
              </p>

              <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
                <span>{client.email}</span>
                <span>{client.phoneNumber}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          <Button size="sm" variant="outline">
            <Calendar className="w-4 h-4 mr-2" /> Book
          </Button>
          <Button size="sm" variant="outline">
            <Mail className="w-4 h-4 mr-2" /> Email
          </Button>
          <Button size="sm" variant="outline">
            <MessageSquare className="w-4 h-4 mr-2" /> SMS
          </Button>
          <Button size="sm" variant="outline">
            <Phone className="w-4 h-4 mr-2" /> Call
          </Button>
        </div>
      </div>

      {/* ================= TABS ================= */}
      <div className="px-8 pt-6 border-b border-[#e6e3d6] flex gap-8 text-sm">
        {["overview", "appointments", "notes"].map((tab) => (
          <button
            key={tab}
            onClick={() =>
              setActiveTab(tab as "overview" | "appointments" | "notes")
            }
            className={`pb-3 capitalize ${
              activeTab === tab
                ? "border-b-2 border-[#003225] text-[#003225] font-medium"
                : "text-muted-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ================= TAB CONTENT ================= */}
      <div className="flex-1 p-8 overflow-y-auto">
        {activeTab === "overview" && <Overview />}
        {activeTab === "appointments" && <Appointments />}
        {activeTab === "notes" && <Notes />}
      </div>
    </div>
  );
}

function Overview() {
  return (
    <div className="space-y-8">
      {/* Metrics */}
      <div className="grid grid-cols-1  md:grid-cols-3 gap-6">
        <Metric label="Appointments" value="12" />
        <Metric label="Cancellations" value="2" />
        <Metric label="No Shows" value="1" />
      </div>

      {/* Activity */}
      <div>
        <h3 className="text-sm font-medium text-[#003225] mb-4">Activity</h3>
        <div className="space-y-3 text-sm text-muted-foreground">
          <p>• Booked a haircut appointment</p>
          <p>• Rescheduled appointment</p>
          <p>• Added a note</p>
        </div>
      </div>

      {/* Pinned Notes */}
      <div>
        <h3 className="text-sm font-medium text-[#003225] mb-4">
          Pinned Notes
        </h3>
        <div className="border rounded-lg p-4 text-sm text-muted-foreground flex items-start gap-3">
          <Pin className="w-4 h-4 mt-1 text-[#003225]" />
          Prefers evening appointments and organic products.
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="
      border-l border-[#3ad688]
      bg-white
      rounded-lg
      px-4 py-3
      shadow-sm
      hover:shadow
      transition-all
    "
    >
      <div className="flex items-center justify-between">
        <p
          className="
          text-[11px] 
          text-muted-foreground 
          uppercase 
          tracking-wide
        "
        >
          {label}
        </p>

        <p
          className="
          text-lg 
          font-semibold 
          text-[#003225]
        "
        >
          {value}
        </p>
      </div>
    </div>
  );
}

function Appointments() {
  return (
    <div className="space-y-4">
      <Button size="sm" className="bg-[#003225] hover:bg-[#003225]/90">
        Add Appointment
      </Button>

      <div className="space-y-3 text-sm text-muted-foreground">
        <div className="border rounded-lg p-4">
          Haircut — 12 Jan 2026 — Completed
        </div>
        <div className="border rounded-lg p-4">
          Hair Coloring — 18 Jan 2026 — Upcoming
        </div>
      </div>
    </div>
  );
}

function Notes() {
  return (
    <div className="space-y-4">
      <Button size="sm" className="bg-[#003225] hover:bg-[#003225]/90">
        Add Note
      </Button>

      <div className="space-y-3">
        <div className="border rounded-lg p-4 text-sm text-muted-foreground">
          Allergic to strong fragrances.
        </div>
        <div className="border rounded-lg p-4 text-sm text-muted-foreground">
          Prefers weekend bookings.
        </div>
      </div>
    </div>
  );
}

function ClientCard({
  client,
}: {
  client: {
    name: string;
    gender: string;
    email: string;
    phoneNumber: string;
  };
}) {
  return (
    <div className="border-l-2 border-l-[#3ad688] bg-white rounded-md p-4 shadow-sm hover:shadow-md transition-all cursor-pointer">
      <div className="flex items-center gap-3">
        <div className="bg-[#003225]/5 p-2 rounded-md">
          <User className="w-4 h-4 text-[#003225]" />
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium text-[#003225]">
              {client.name || "Unnamed Client"}
            </h3>
            <span className="text-xs bg-[#f5f5f5] px-2 py-0.5 rounded-full">
              {client.gender || "—"}
            </span>
          </div>

          <p className="text-xs text-muted-foreground mt-1">
            {client.email || "No email"} • {client.phoneNumber || "No phone"}
          </p>
        </div>
      </div>
    </div>
  );
}
