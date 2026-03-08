"use client";

import { format, isToday } from "date-fns";
import { cn } from "@/lib/utils";
import { resolveStatus, STATUS_CONFIG } from "./booking.types";

interface BookingDayCellProps {
  date: Date;
  isCurrentMonth: boolean;
  bookings: IBooking[];
  onSelect: (booking: IBooking) => void;
  onDayClick: (date: Date) => void;
}

const MAX_VISIBLE = 3;

export function BookingDayCell({
  date,
  isCurrentMonth,
  bookings,
  onSelect,
  onDayClick,
}: BookingDayCellProps) {
  const today = isToday(date);
  const visible = bookings.slice(0, MAX_VISIBLE);
  const overflow = bookings.length - MAX_VISIBLE;

  return (
    <div
      className={cn(
        "min-h-[5.5rem] p-1.5 border-l border-t flex flex-col gap-1 transition-colors",
        !isCurrentMonth && "bg-muted/20",
      )}
    >
      {/* Day number — clicking opens the day view */}
      <button
        onClick={() => onDayClick(date)}
        className={cn(
          "self-start h-6 w-6 flex items-center justify-center rounded-full text-xs font-medium transition-colors",
          today
            ? "bg-primary text-primary-foreground font-semibold"
            : isCurrentMonth
              ? "text-foreground hover:bg-muted"
              : "text-muted-foreground/40 hover:bg-muted/50",
        )}
      >
        {format(date, "d")}
      </button>

      {/* Booking pills */}
      <div className="flex flex-col gap-0.5">
        {visible.map((b) => {
          const status = resolveStatus(b);
          const cfg = STATUS_CONFIG[status];
          return (
            <button
              key={b.id}
              onClick={() => onSelect(b)}
              className={cn(
                "w-full text-left text-[0.625rem] font-medium px-1.5 py-[3px] rounded-sm",
                "border-l-[2.5px] truncate leading-tight",
                "bg-muted/50 hover:bg-muted transition-colors",
                cfg.border,
                !isCurrentMonth && "opacity-40",
              )}
            >
              {b.title}
            </button>
          );
        })}
      </div>

      {overflow > 0 && (
        <span className="text-[0.6rem] text-muted-foreground font-medium px-1 mt-auto">
          +{overflow} more
        </span>
      )}
    </div>
  );
}
