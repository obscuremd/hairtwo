"use client";

import { format, parseISO } from "date-fns";
import { ExternalLink, Mail, Phone, User } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { BookingStatusBadge } from "./booking-status-badge";
import { resolveStatus, STATUS_CONFIG } from "./booking.types";

interface BookingDetailDialogProps {
  booking: IBooking | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function DetailRow({
  icon: Icon,
  label,
  children,
}: {
  icon?: React.ElementType;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      {Icon && (
        <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md bg-muted">
          <Icon className="size-3.5 text-muted-foreground" />
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="text-[0.7rem] font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
        <div className="mt-0.5 text-sm font-medium">{children}</div>
      </div>
    </div>
  );
}

export function BookingDetailDialog({
  booking,
  open,
  onOpenChange,
}: BookingDetailDialogProps) {
  if (!booking) return null;

  const status = resolveStatus(booking);
  const cfg = STATUS_CONFIG[status];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md gap-0 overflow-hidden p-0">
        {/* Accent stripe */}
        <div className={`h-1 w-full ${cfg.dot}`} />

        <div className="p-6 space-y-5">
          <DialogHeader className="space-y-1">
            <div className="flex items-start justify-between gap-4">
              <DialogTitle className="text-base font-semibold leading-snug">
                {booking.title}
              </DialogTitle>
              <BookingStatusBadge
                status={status}
                pulse
                className="shrink-0 mt-0.5"
              />
            </div>
            <DialogDescription className="text-sm text-muted-foreground leading-relaxed">
              {booking.description}
            </DialogDescription>
          </DialogHeader>

          <Separator />

          {/* Client info */}
          <div className="space-y-3">
            <p className="text-[0.7rem] font-semibold uppercase tracking-widest text-muted-foreground">
              Client
            </p>
            <DetailRow icon={User} label="Name">
              {booking.user.name}
            </DetailRow>
            <DetailRow icon={Mail} label="Email">
              <a
                href={`mailto:${booking.user.email}`}
                className="text-primary hover:underline underline-offset-2 truncate block"
              >
                {booking.user.email}
              </a>
            </DetailRow>
            <DetailRow icon={Phone} label="Phone">
              {booking.user.phone}
            </DetailRow>
          </div>

          <Separator />

          {/* Booking info */}
          <div className="space-y-3">
            <p className="text-[0.7rem] font-semibold uppercase tracking-widest text-muted-foreground">
              Appointment
            </p>
            <div className="grid grid-cols-2 gap-4">
              <DetailRow label="Start">
                <span className="tabular-nums">
                  {format(parseISO(booking.startDate), "MMM d, yyyy")}{" "}
                  <span className="text-muted-foreground font-normal">
                    {format(parseISO(booking.startDate), "HH:mm")}
                  </span>
                </span>
              </DetailRow>
              <DetailRow label="End">
                <span className="tabular-nums">
                  {format(parseISO(booking.endDate), "MMM d, yyyy")}{" "}
                  <span className="text-muted-foreground font-normal">
                    {format(parseISO(booking.endDate), "HH:mm")}
                  </span>
                </span>
              </DetailRow>
            </div>
            <DetailRow label="Service">
              <a
                href={booking.service.href}
                className="inline-flex items-center gap-1.5 text-primary hover:underline underline-offset-2"
              >
                {booking.service.name}
                <ExternalLink className="size-3 opacity-60" />
              </a>
            </DetailRow>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
