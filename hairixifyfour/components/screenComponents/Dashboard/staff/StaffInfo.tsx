"use client";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import { User, Mail, Phone, Calendar, Pin, Briefcase } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

export type Staff = {
  name: string;
  role: string;
  email: string;
  phoneNumber: string;
  status?: "Active" | "Inactive";
};

export function StaffList({ staff }: { staff: Staff[] }) {
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleSelect = (member: Staff) => {
    setSelectedStaff(member);
    if (isMobile) setMobileOpen(true);
  };

  return (
    <>
      <div className="flex gap-8">
        {/* ================= LEFT PANEL ================= */}
        <div className="w-full md:w-[35%] max-h-[75vh] flex flex-col bg-white border border-[#e6e3d6] rounded-xl shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[#e6e3d6]">
            <div>
              <h1 className="text-lg font-semibold text-[#003225]">
                Staff Members
              </h1>
              <p className="text-xs text-muted-foreground">
                {staff.length} total staff
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
            {staff.map((member, index) => (
              <button
                key={index}
                onClick={() => handleSelect(member)}
                className="w-full text-left"
              >
                <StaffCard member={member} />
              </button>
            ))}
          </div>
        </div>

        {/* ================= DESKTOP RIGHT PANEL ================= */}
        <div className="hidden md:block flex-1 bg-white border border-[#e6e3d6] rounded-xl shadow-sm min-h-[75vh]">
          {selectedStaff ? (
            <StaffDescription member={selectedStaff} />
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground">
              <User className="w-8 h-8 mb-3 text-[#003225]" />
              <p className="text-sm">Select a staff member to view details</p>
            </div>
          )}
        </div>
      </div>

      {/* ================= MOBILE SHEET ================= */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="right" className="w-full sm:max-w-md p-0">
          {selectedStaff && <StaffDescription member={selectedStaff} />}
        </SheetContent>
      </Sheet>
    </>
  );
}

function StaffDescription({ member }: { member: Staff }) {
  const [activeTab, setActiveTab] = useState<"overview" | "schedule" | "notes">(
    "overview",
  );

  return (
    <div className="flex flex-col h-full">
      {/* ================= PROFILE HEADER ================= */}
      <div className="p-8 border-b border-[#e6e3d6]">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-full bg-[#003225]/10 flex items-center justify-center text-2xl font-semibold text-[#003225]">
              {member.name.charAt(0).toUpperCase()}
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#003225]">
                {member.name}
              </h2>
              <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
                <Briefcase className="w-3 h-3" />
                {member.role}
              </p>

              <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
                <span>{member.email}</span>
                <span>{member.phoneNumber}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          <Button size="sm" variant="outline">
            <Calendar className="w-4 h-4 mr-2" /> Schedule
          </Button>
          <Button size="sm" variant="outline">
            <Mail className="w-4 h-4 mr-2" /> Email
          </Button>
          <Button size="sm" variant="outline">
            <Phone className="w-4 h-4 mr-2" /> Call
          </Button>
        </div>
      </div>

      {/* ================= TABS ================= */}
      <div className="px-8 pt-6 border-b border-[#e6e3d6] flex gap-8 text-sm">
        {["overview", "schedule", "notes"].map((tab) => (
          <button
            key={tab}
            onClick={() =>
              setActiveTab(tab as "overview" | "schedule" | "notes")
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
        {activeTab === "schedule" && <Schedule />}
        {activeTab === "notes" && <Notes />}
      </div>
    </div>
  );
}

function Overview() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Metric label="Appointments Handled" value="48" />
        <Metric label="This Month" value="12" />
        <Metric label="Performance Rating" value="4.8★" />
      </div>

      <div>
        <h3 className="text-sm font-medium text-[#003225] mb-4">
          Recent Activity
        </h3>
        <div className="space-y-3 text-sm text-muted-foreground">
          <p>• Completed 3 appointments today</p>
          <p>• Updated availability</p>
          <p>• Added internal note</p>
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-l border-[#3ad688] bg-white rounded-lg px-4 py-3 shadow-sm hover:shadow transition-all">
      <div className="flex items-center justify-between">
        <p className="text-[11px] text-muted-foreground uppercase tracking-wide">
          {label}
        </p>
        <p className="text-lg font-semibold text-[#003225]">{value}</p>
      </div>
    </div>
  );
}

function Schedule() {
  return (
    <div className="space-y-3 text-sm text-muted-foreground">
      <div className="border rounded-lg p-4">Monday — 9:00 AM - 5:00 PM</div>
      <div className="border rounded-lg p-4">
        Wednesday — 10:00 AM - 6:00 PM
      </div>
    </div>
  );
}

function Notes() {
  return (
    <div className="space-y-3">
      <div className="border rounded-lg p-4 text-sm text-muted-foreground flex items-start gap-3">
        <Pin className="w-4 h-4 mt-1 text-[#003225]" />
        Excellent customer satisfaction feedback.
      </div>
    </div>
  );
}

function StaffCard({ member }: { member: Staff }) {
  return (
    <div className="border-l-2 border-l-[#3ad688] bg-white rounded-md px-3 py-2 shadow-sm hover:shadow-md transition-all cursor-pointer">
      <div className="flex items-center gap-3">
        <div className="bg-[#003225]/5 p-1.5 rounded-md">
          <User className="w-3.5 h-3.5 text-[#003225]" />
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium text-[#003225]">
              {member.name}
            </h3>
            <span className="text-[10px] bg-[#f5f5f5] px-2 py-0.5 rounded-full">
              {member.role}
            </span>
          </div>

          <p className="text-[11px] text-muted-foreground mt-0.5 truncate">
            {member.email} • {member.phoneNumber}
          </p>
        </div>
      </div>
    </div>
  );
}
