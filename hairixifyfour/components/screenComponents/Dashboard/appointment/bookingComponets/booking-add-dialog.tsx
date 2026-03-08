"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookingStatus, SERVICES } from "./booking.types";

interface AddBookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (booking: IBooking) => void;
}

const toDatetimeLocal = (d: Date) => format(d, "yyyy-MM-dd'T'HH:mm");

export function AddBookingDialog({
  open,
  onOpenChange,
  onAdd,
}: AddBookingDialogProps) {
  const now = new Date();
  const later = new Date(now.getTime() + 60 * 60000);

  const [form, setForm] = useState({
    title: "",
    description: "",
    startDate: toDatetimeLocal(now),
    endDate: toDatetimeLocal(later),
    serviceId: SERVICES[0].id,
    status: "upcoming" as BookingStatus,
    userName: "",
    userEmail: "",
    userPhone: "",
  });

  const set =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((p) => ({ ...p, [key]: e.target.value }));

  const handleSubmit = () => {
    const service = SERVICES.find((s) => s.id === form.serviceId)!;
    const booking: IBooking = {
      id: Date.now(),
      title: form.title || service.name,
      description: form.description,
      startDate: new Date(form.startDate).toISOString(),
      endDate: new Date(form.endDate).toISOString(),
      status: form.status,
      service,
      user: {
        id: `u-${Date.now()}`,
        name: form.userName,
        email: form.userEmail,
        phone: form.userPhone,
      },
    };
    onAdd(booking);
    onOpenChange(false);
    // reset
    setForm({
      title: "",
      description: "",
      startDate: toDatetimeLocal(new Date()),
      endDate: toDatetimeLocal(new Date(Date.now() + 60 * 60000)),
      serviceId: SERVICES[0].id,
      status: "upcoming",
      userName: "",
      userEmail: "",
      userPhone: "",
    });
  };

  const isValid =
    form.userName.trim() &&
    form.userEmail.trim() &&
    form.startDate &&
    form.endDate;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>New Appointment</DialogTitle>
          <DialogDescription>
            Fill in the details to schedule a new booking.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Service + Status row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Service</Label>
              <Select
                value={form.serviceId}
                onValueChange={(v) => setForm((p) => ({ ...p, serviceId: v }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SERVICES.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Status</Label>
              <Select
                value={form.status}
                onValueChange={(v) =>
                  setForm((p) => ({ ...p, status: v as BookingStatus }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="ongoing">Ongoing</SelectItem>
                  <SelectItem value="success">Completed</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Title */}
          <div className="space-y-1.5">
            <Label>
              Title{" "}
              <span className="text-muted-foreground font-normal">
                (optional)
              </span>
            </Label>
            <Input
              placeholder="Defaults to service name"
              value={form.title}
              onChange={set("title")}
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Start</Label>
              <Input
                type="datetime-local"
                value={form.startDate}
                onChange={set("startDate")}
              />
            </div>
            <div className="space-y-1.5">
              <Label>End</Label>
              <Input
                type="datetime-local"
                value={form.endDate}
                onChange={set("endDate")}
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label>
              Notes{" "}
              <span className="text-muted-foreground font-normal">
                (optional)
              </span>
            </Label>
            <Textarea
              placeholder="Any relevant details about the appointment..."
              value={form.description}
              onChange={set("description")}
              className="resize-none h-16"
            />
          </div>

          <div className="border-t pt-4 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Client
            </p>
            <div className="space-y-1.5">
              <Label>
                Full name <span className="text-destructive">*</span>
              </Label>
              <Input
                placeholder="Jane Smith"
                value={form.userName}
                onChange={set("userName")}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>
                  Email <span className="text-destructive">*</span>
                </Label>
                <Input
                  type="email"
                  placeholder="jane@example.com"
                  value={form.userEmail}
                  onChange={set("userEmail")}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Phone</Label>
                <Input
                  placeholder="+1 (555) 000-0000"
                  value={form.userPhone}
                  onChange={set("userPhone")}
                />
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!isValid}>
            <Plus className="size-4 mr-1.5" />
            Add Appointment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
