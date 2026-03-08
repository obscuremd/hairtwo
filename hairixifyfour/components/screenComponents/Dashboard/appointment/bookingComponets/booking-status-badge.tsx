import { cn } from "@/lib/utils";
import { BookingStatus, STATUS_CONFIG } from "./booking.types";

interface BookingStatusBadgeProps {
  status: BookingStatus;
  pulse?: boolean;
  className?: string;
}

export function BookingStatusBadge({
  status,
  pulse,
  className,
}: BookingStatusBadgeProps) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium",
        cfg.badge,
        className,
      )}
    >
      <span
        className={cn(
          "size-1.5 rounded-full",
          cfg.dot,
          pulse && status === "ongoing" && "animate-pulse",
        )}
      />
      {cfg.label}
    </span>
  );
}
