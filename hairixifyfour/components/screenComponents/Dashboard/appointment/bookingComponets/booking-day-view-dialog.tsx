"use client";

import { format, parseISO, differenceInMinutes, isSameDay } from "date-fns";
import { Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { resolveStatus, STATUS_CONFIG } from "./booking.types";

interface BookingDayViewDialogProps {
  date: Date | null;
  bookings: IBooking[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectBooking: (booking: IBooking) => void;
}

// Grid constants
const SLOT_HEIGHT_PX = 48; // height of each 30-min row
const HOUR_START = 0;
const HOUR_END = 24;
const TOTAL_SLOTS = (HOUR_END - HOUR_START) * 2; // 48 half-hour slots

function minutesFromDayStart(date: Date): number {
  return date.getHours() * 60 + date.getMinutes();
}

function slotLabel(slotIndex: number): string {
  const totalMinutes = HOUR_START * 60 + slotIndex * 30;
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

interface PositionedBooking {
  booking: IBooking;
  top: number; // px from top
  height: number; // px
  left: number; // % offset for overlap columns
  width: number; // % width
}

/** Simple overlap resolver — groups overlapping bookings into columns */
function positionBookings(
  bookings: IBooking[],
  date: Date,
): PositionedBooking[] {
  const sorted = [...bookings].sort(
    (a, b) => parseISO(a.startDate).getTime() - parseISO(b.startDate).getTime(),
  );

  // Track "columns" — each column is the end time of the last booking placed there
  const columns: number[] = [];
  const placed: Array<{ booking: IBooking; col: number }> = [];

  for (const b of sorted) {
    const start = parseISO(b.startDate);
    const end = parseISO(b.endDate);

    // Clamp to the current day
    const dayStart = new Date(date);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(date);
    dayEnd.setHours(23, 59, 59, 999);

    const clampedStart = start < dayStart ? dayStart : start;
    const clampedEnd = end > dayEnd ? dayEnd : end;

    const startMs = clampedStart.getTime();
    const endMs = clampedEnd.getTime();

    // Find first column where this booking fits
    let col = columns.findIndex((colEnd) => colEnd <= startMs);
    if (col === -1) {
      col = columns.length;
      columns.push(endMs);
    } else {
      columns[col] = endMs;
    }

    placed.push({ booking: b, col });
  }

  const numCols = Math.max(columns.length, 1);

  return placed.map(({ booking, col }) => {
    const start = parseISO(booking.startDate);
    const end = parseISO(booking.endDate);

    const startMin = minutesFromDayStart(start);
    const durationMin = Math.max(differenceInMinutes(end, start), 30);

    const top = (startMin / 30) * SLOT_HEIGHT_PX;
    const height = Math.max(
      (durationMin / 30) * SLOT_HEIGHT_PX,
      SLOT_HEIGHT_PX * 0.5,
    );
    const colWidth = 100 / numCols;
    const left = col * colWidth;
    const width = colWidth;

    return { booking, top, height, left, width };
  });
}

export function BookingDayViewDialog({
  date,
  bookings,
  open,
  onOpenChange,
  onSelectBooking,
}: BookingDayViewDialogProps) {
  if (!date) return null;

  const dayBookings = bookings.filter((b) =>
    isSameDay(parseISO(b.startDate), date),
  );

  const positioned = positionBookings(dayBookings, date);
  const totalHeight = TOTAL_SLOTS * SLOT_HEIGHT_PX;

  // Scroll to first booking or 8am
  const firstBookingMin =
    dayBookings.length > 0
      ? minutesFromDayStart(parseISO(dayBookings[0].startDate))
      : 8 * 60;
  const initialScrollPx = Math.max(
    0,
    (firstBookingMin / 30) * SLOT_HEIGHT_PX - SLOT_HEIGHT_PX * 2,
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl gap-0 p-0 overflow-hidden">
        {/* Header */}
        <DialogHeader className="px-5 pt-5 pb-3 border-b space-y-0.5">
          <DialogTitle className="text-base font-semibold">
            {format(date, "EEEE, MMMM d")}
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground flex items-center gap-1.5">
            <Clock className="size-3" />
            {dayBookings.length === 0
              ? "No appointments scheduled"
              : `${dayBookings.length} appointment${dayBookings.length > 1 ? "s" : ""}`}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea
          className="h-[520px]"
          type="always"
          // Scroll to initial position via CSS scroll-margin trick
        >
          <div className="relative flex" style={{ height: `${totalHeight}px` }}>
            {/* Time gutter */}
            <div className="sticky left-0 w-14 shrink-0 z-10 bg-background">
              {Array.from({ length: TOTAL_SLOTS }).map((_, i) => {
                const isHour = i % 2 === 0;
                return (
                  <div
                    key={i}
                    className="relative flex items-start justify-end pr-2"
                    style={{ height: `${SLOT_HEIGHT_PX}px` }}
                  >
                    {isHour && (
                      <span className="text-[0.65rem] tabular-nums text-muted-foreground -translate-y-2 select-none">
                        {slotLabel(i)}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Grid lines + events */}
            <div className="relative flex-1 border-l">
              {/* Horizontal grid lines */}
              {Array.from({ length: TOTAL_SLOTS }).map((_, i) => (
                <div
                  key={i}
                  className="absolute inset-x-0 border-t"
                  style={{
                    top: `${i * SLOT_HEIGHT_PX}px`,
                    borderColor:
                      i % 2 === 0
                        ? "hsl(var(--border))"
                        : "hsl(var(--border) / 0.4)",
                    borderStyle: i % 2 === 0 ? "solid" : "dashed",
                  }}
                />
              ))}

              {/* Current time indicator */}
              <CurrentTimeIndicator date={date} slotHeight={SLOT_HEIGHT_PX} />

              {/* Positioned bookings */}
              {positioned.map(({ booking, top, height, left, width }) => {
                const status = resolveStatus(booking);
                const cfg = STATUS_CONFIG[status];
                return (
                  <button
                    key={booking.id}
                    onClick={() => {
                      onSelectBooking(booking);
                    }}
                    className={`absolute rounded-md border-l-[3px] px-2 py-1 text-left overflow-hidden
                      transition-all hover:brightness-95 active:scale-[0.99] group
                      bg-muted/70 hover:bg-muted ${cfg.border}`}
                    style={{
                      top: `${top}px`,
                      height: `${height}px`,
                      left: `calc(${left}% + 4px)`,
                      width: `calc(${width}% - 8px)`,
                    }}
                  >
                    <p className="text-[0.7rem] font-semibold leading-tight truncate">
                      {booking.title}
                    </p>
                    <p className="text-[0.65rem] text-muted-foreground truncate">
                      {format(parseISO(booking.startDate), "HH:mm")}
                      {" – "}
                      {format(parseISO(booking.endDate), "HH:mm")}
                    </p>
                    {height >= SLOT_HEIGHT_PX * 1.5 && (
                      <p className="text-[0.65rem] text-muted-foreground truncate mt-0.5">
                        {booking.user.name}
                      </p>
                    )}
                    <span
                      className={`absolute right-1.5 top-1 text-[0.55rem] font-medium rounded-full px-1.5 py-0.5 ${cfg.badge}`}
                    >
                      {cfg.label}
                    </span>
                  </button>
                );
              })}

              {/* Empty state */}
              {dayBookings.length === 0 && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground">
                  <Clock className="size-8 opacity-20" />
                  <p className="text-sm">No appointments on this day</p>
                </div>
              )}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

/** Red line at current time, only shown if date is today */
function CurrentTimeIndicator({
  date,
  slotHeight,
}: {
  date: Date;
  slotHeight: number;
}) {
  const now = new Date();
  if (!isSameDay(now, date)) return null;

  const topPx = (minutesFromDayStart(now) / 30) * slotHeight;

  return (
    <div
      className="absolute inset-x-0 z-20 flex items-center pointer-events-none"
      style={{ top: `${topPx}px` }}
    >
      <span className="size-2 rounded-full bg-rose-500 -ml-1 shrink-0" />
      <div className="flex-1 h-px bg-rose-500" />
    </div>
  );
}
