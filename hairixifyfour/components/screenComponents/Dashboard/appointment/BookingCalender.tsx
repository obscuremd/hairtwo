"use client";

import { useState } from "react";
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
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  BOOKING_MOCK,
  BookingStatus,
  resolveStatus,
  STATUS_CONFIG,
} from "./bookingComponets/booking.types";
import { BookingDayCell } from "./bookingComponets/booking-day-cell";
import { BookingDayViewDialog } from "./bookingComponets/booking-day-view-dialog";
import { BookingDetailDialog } from "./bookingComponets/booking-detail-dialog";
import { AddBookingDialog } from "./bookingComponets/booking-add-dialog";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const STATUS_ORDER: BookingStatus[] = [
  "ongoing",
  "success",
  "failed",
  "upcoming",
];

export function BookingCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [bookings, setBookings] = useState<IBooking[]>(BOOKING_MOCK);

  // Detail dialog (single booking)
  const [selected, setSelected] = useState<IBooking | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  // Day view dialog (all bookings for a day)
  const [dayViewDate, setDayViewDate] = useState<Date | null>(null);
  const [dayViewOpen, setDayViewOpen] = useState(false);

  // Add dialog
  const [addOpen, setAddOpen] = useState(false);

  // Calendar grid
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const gridStart = startOfWeek(monthStart);
  const gridEnd = endOfWeek(monthEnd);
  const days = eachDayOfInterval({ start: gridStart, end: gridEnd });

  const bookingsForDay = (date: Date) =>
    bookings.filter((b) => isSameDay(parseISO(b.startDate), date));

  const handleSelectBooking = (booking: IBooking) => {
    setSelected(booking);
    setDetailOpen(true);
  };

  const handleDayClick = (date: Date) => {
    setDayViewDate(date);
    setDayViewOpen(true);
  };

  // When a booking is clicked inside the day view, open detail on top
  const handleSelectFromDayView = (booking: IBooking) => {
    setSelected(booking);
    setDetailOpen(true);
  };

  const handleAdd = (booking: IBooking) => {
    setBookings((prev) => [...prev, booking]);
  };

  // Status counts for the current month's bookings only
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
        {/* ── Header ── */}
        <div className="flex items-center justify-between gap-4 px-5 py-3.5 border-b bg-muted/30">
          {/* Month navigation */}
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="size-8"
              onClick={() => setCurrentDate((d) => subMonths(d, 1))}
            >
              <ChevronLeft className="size-4" />
            </Button>
            <span className="min-w-[9rem] text-center text-sm font-semibold tracking-tight">
              {format(currentDate, "MMMM yyyy")}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="size-8"
              onClick={() => setCurrentDate((d) => addMonths(d, 1))}
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>

          {/* Status summary — hidden on mobile */}
          <div className="hidden md:flex items-center gap-5">
            {STATUS_ORDER.map((s) => (
              <div key={s} className="flex items-center gap-1.5">
                <span
                  className={`size-2 rounded-full ${STATUS_CONFIG[s].dot} ${
                    s === "ongoing" ? "animate-pulse" : ""
                  }`}
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

          {/* Actions */}
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

        {/* ── Weekday labels ── */}
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

        {/* ── Day grid ── */}
        <div className="grid grid-cols-7">
          {days.map((day) => (
            <BookingDayCell
              key={day.toISOString()}
              date={day}
              isCurrentMonth={isSameMonth(day, currentDate)}
              bookings={bookingsForDay(day)}
              onSelect={handleSelectBooking}
              onDayClick={handleDayClick}
            />
          ))}
        </div>
      </div>

      {/* Day view — all bookings for a selected day on a timeline */}
      <BookingDayViewDialog
        date={dayViewDate}
        bookings={bookings}
        open={dayViewOpen}
        onOpenChange={(o) => {
          setDayViewOpen(o);
          if (!o) setDayViewDate(null);
        }}
        onSelectBooking={handleSelectFromDayView}
      />

      {/* Detail dialog — single booking info */}
      <BookingDetailDialog
        booking={selected}
        open={detailOpen}
        onOpenChange={(o) => {
          setDetailOpen(o);
          if (!o) setSelected(null);
        }}
      />

      {/* Add dialog */}
      <AddBookingDialog
        open={addOpen}
        onOpenChange={setAddOpen}
        onAdd={handleAdd}
      />
    </>
  );
}
