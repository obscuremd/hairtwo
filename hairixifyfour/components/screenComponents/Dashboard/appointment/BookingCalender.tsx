"use client";

import { useCallback, useEffect, useState } from "react";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  parseISO,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { ChevronLeft, ChevronRight, Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import {
  BookingStatus,
  resolveStatus,
  STATUS_CONFIG,
} from "./bookingComponets/booking.types";
import { BookingDayCell } from "./bookingComponets/booking-day-cell";
import { BookingDayViewDialog } from "./bookingComponets/booking-day-view-dialog";
import { BookingDetailDialog } from "./bookingComponets/booking-detail-dialog";
import { AddBookingDialog } from "./bookingComponets/booking-add-dialog";
import { GetBookedSlots } from "@/utils/booking";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const STATUS_ORDER: BookingStatus[] = [
  "ongoing",
  "success",
  "failed",
  "upcoming",
];

function CalendarSkeleton() {
  return (
    <div className="grid grid-cols-7">
      {Array.from({ length: 35 }).map((_, i) => (
        <div
          key={i}
          className="border-b border-r min-h-[90px] p-1.5 space-y-1.5"
        >
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-3/4 rounded" />
        </div>
      ))}
    </div>
  );
}

export function BookingCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selected, setSelected] = useState<IBooking | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [dayViewDate, setDayViewDate] = useState<Date | null>(null);
  const [dayViewOpen, setDayViewOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    setError(null);
    // GetBookedSlots now takes only the month — provider identity comes from the auth token
    const result = await GetBookedSlots(currentDate);
    console.log("fetching:::::", result);
    if (result.success && result.bookings) {
      setBookings(result.bookings);
    } else {
      setError(result.message);
      toast.error(result.message);
    }
    setLoading(false);
  }, [currentDate]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchBookings();
  }, [fetchBookings]);

  const monthStart = startOfMonth(currentDate);
  const days = eachDayOfInterval({
    start: startOfWeek(monthStart),
    end: endOfWeek(endOfMonth(currentDate)),
  });

  const bookingsForDay = (date: Date) =>
    bookings.filter((b) => isSameDay(parseISO(b.startDate), date));

  const monthBookings = bookings.filter((b) =>
    isSameMonth(parseISO(b.startDate), currentDate),
  );
  const counts = monthBookings.reduce(
    (acc, b) => {
      const s = resolveStatus(b);
      acc[s] = (acc[s] ?? 0) + 1;
      return acc;
    },
    {} as Partial<Record<BookingStatus, number>>,
  );

  return (
    <>
      <div className="w-full rounded-xl border bg-background shadow-sm overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 px-5 py-3.5 border-b bg-muted/30">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="size-8"
              onClick={() => setCurrentDate((d) => subMonths(d, 1))}
              disabled={loading}
            >
              <ChevronLeft className="size-4" />
            </Button>
            <span className="min-w-[9rem] text-center text-sm font-semibold tracking-tight flex items-center justify-center gap-1.5">
              {format(currentDate, "MMMM yyyy")}
              {loading && (
                <Loader2 className="size-3 animate-spin text-muted-foreground" />
              )}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="size-8"
              onClick={() => setCurrentDate((d) => addMonths(d, 1))}
              disabled={loading}
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>

          <div className="hidden md:flex items-center gap-5">
            {STATUS_ORDER.map((s) => (
              <div key={s} className="flex items-center gap-1.5">
                <span
                  className={`size-2 rounded-full ${STATUS_CONFIG[s].dot} ${s === "ongoing" ? "animate-pulse" : ""}`}
                />
                <span className="text-xs text-muted-foreground">
                  {STATUS_CONFIG[s].label}
                </span>
                {counts[s] !== undefined && (
                  <span className="text-xs font-semibold tabular-nums">
                    {counts[s]}
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-8"
              onClick={() => setCurrentDate(new Date())}
            >
              Today
            </Button>
            <Button
              size="sm"
              className="text-xs h-8 gap-1.5"
              onClick={() => setAddOpen(true)}
            >
              <Plus className="size-3.5" />
              New Appointment
            </Button>
          </div>
        </div>

        {/* Weekday labels */}
        <div className="grid grid-cols-7 border-b bg-muted/10">
          {WEEKDAYS.map((d) => (
            <div
              key={d}
              className="py-2 text-center text-[0.7rem] font-medium uppercase tracking-wider text-muted-foreground"
            >
              {d}
            </div>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <CalendarSkeleton />
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-muted-foreground">
            <p className="text-sm">{error}</p>
            <Button variant="outline" size="sm" onClick={fetchBookings}>
              Retry
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-7">
            {days.map((day) => (
              <BookingDayCell
                key={day.toISOString()}
                date={day}
                isCurrentMonth={isSameMonth(day, currentDate)}
                bookings={bookingsForDay(day)}
                onSelect={(b) => {
                  setSelected(b);
                  setDetailOpen(true);
                }}
                onDayClick={(d) => {
                  setDayViewDate(d);
                  setDayViewOpen(true);
                }}
              />
            ))}
          </div>
        )}
      </div>

      <BookingDayViewDialog
        date={dayViewDate}
        bookings={bookings}
        open={dayViewOpen}
        onOpenChange={(o) => {
          setDayViewOpen(o);
          if (!o) setDayViewDate(null);
        }}
        onSelectBooking={(b) => {
          setSelected(b);
          setDetailOpen(true);
        }}
      />

      <BookingDetailDialog
        booking={selected}
        open={detailOpen}
        onOpenChange={(o) => {
          setDetailOpen(o);
          if (!o) setSelected(null);
        }}
      />

      <AddBookingDialog open={addOpen} onOpenChange={setAddOpen} />
    </>
  );
}
