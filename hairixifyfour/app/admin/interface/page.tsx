"use client";
import { StaffList } from "@/components/screenComponents/Dashboard/staff/StaffInfo";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Users, ShieldCheck } from "lucide-react";
import { useState } from "react";

export type Staff = {
  name: string;
  role: string;
  email: string;
  phoneNumber: string;
  status: "Active" | "Inactive";
};

export default function Page() {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState<Staff>({
    name: "",
    role: "",
    email: "",
    phoneNumber: "",
    status: "Active",
  });

  const handleChange = (field: keyof Staff, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!form.name || !form.role) return;

    setStaff((prev) => [...prev, form]);
    setForm({
      name: "",
      role: "",
      email: "",
      phoneNumber: "",
      status: "Active",
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="w-full mx-auto mt-10">
        {staff.length === 0 ? <Empty /> : <StaffList staff={staff} />}
      </div>

      {/* ================= MODAL ================= */}
      <DialogContent className="sm:max-w-md rounded-xl p-0 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#e6e3d6]">
          <DialogTitle className="text-lg font-semibold text-[#003225]">
            Add New Staff
          </DialogTitle>
          <p className="text-xs text-muted-foreground mt-1">
            Enter staff details to add them to your team.
          </p>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground">
              Full Name
            </label>
            <input
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Jane Smith"
              className="w-full border border-[#e6e3d6] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3ad688]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground">
              Role
            </label>
            <input
              value={form.role}
              onChange={(e) => handleChange("role", e.target.value)}
              placeholder="Stylist, Manager, Receptionist..."
              className="w-full border border-[#e6e3d6] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3ad688]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground">
              Email Address
            </label>
            <input
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="staff@example.com"
              className="w-full border border-[#e6e3d6] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3ad688]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground">
              Phone Number
            </label>
            <input
              value={form.phoneNumber}
              onChange={(e) => handleChange("phoneNumber", e.target.value)}
              placeholder="+1 234 567 890"
              className="w-full border border-[#e6e3d6] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3ad688]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground">
              Status
            </label>
            <select
              value={form.status}
              onChange={(e) =>
                handleChange("status", e.target.value as "Active" | "Inactive")
              }
              className="w-full border border-[#e6e3d6] rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#3ad688]"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#e6e3d6] flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="border-[#e6e3d6]"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-[#003225] hover:bg-[#003225]/90"
          >
            Save Staff
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Empty() {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="flex flex-col items-center justify-center text-center border border-[#e6e3d6] rounded-xl p-12 bg-white shadow-sm md:w-[50%]">
        <div className="bg-[#003225]/5 p-4 rounded-lg mb-4">
          <Users className="w-8 h-8 text-[#003225]" />
        </div>

        <h2 className="text-lg font-semibold text-[#003225]">
          No Staff Members Yet
        </h2>

        <p className="text-sm text-muted-foreground mt-1 max-w-sm">
          Add staff members to manage appointments, services, and daily
          operations efficiently.
        </p>

        <DialogTrigger asChild>
          <Button className="mt-6 bg-[#003225] hover:bg-[#003225]/90">
            Add New Staff
          </Button>
        </DialogTrigger>

        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-6 max-w-md">
          <ShieldCheck className="w-4 h-4" />
          <p>
            Staff information is securely stored and only accessible to
            authorized users.
          </p>
        </div>
      </div>
    </div>
  );
}
