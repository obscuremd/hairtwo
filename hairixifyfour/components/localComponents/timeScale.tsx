"use client";

import { format, isSameDay, parseISO } from "date-fns";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

const DAY_MAP: Record<number, string> = {
  0: "Sun",
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thu",
  5: "Fri",
  6: "Sat",
};

const ALL_SLOTS: string[] = Array.from({ length: 48 }, (_, i) => {
  const h = Math.floor(i / 2);
  const m = i % 2 === 0 ? "00" : "30";
  return `${String(h).padStart(2, "0")}:${m}`;
});

const AM_SLOTS = ALL_SLOTS.slice(0, 24);
const PM_SLOTS = ALL_SLOTS.slice(24);

function toMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

interface TimeScaleProps {
  date: Date | undefined;
  value: string | undefined;
  serviceDuration: number; // minutes
  onChange: (slot: string) => void;
  existingBookings: NormalisedBooking[];
  businessHours: IBusinessHours[];
}

export function TimeScale({
  date,
  value,
  serviceDuration,
  onChange,
  existingBookings,
  businessHours,
}: TimeScaleProps) {
  if (!date) {
    return (
      <div className="rounded-lg border border-dashed bg-muted/30 py-6 text-center">
        <p className="text-sm text-muted-foreground">
          Select a date to see available times.
        </p>
      </div>
    );
  }

  const dayName = DAY_MAP[date.getDay()];
  const bizDay = businessHours.find((b) => b.day === dayName);
  const dayBookings = existingBookings.filter((b) =>
    isSameDay(parseISO(b.startDate), date),
  );

  function isSlotDisabled(slot: string): boolean {
    const slotStart = toMinutes(slot);
    const slotEnd = slotStart + serviceDuration;
    if (!bizDay) return true;
    if (slotStart < toMinutes(bizDay.start) || slotEnd > toMinutes(bizDay.end))
      return true;
    for (const b of dayBookings) {
      const bStart = toMinutes(format(parseISO(b.startDate), "HH:mm"));
      const bEnd = toMinutes(format(parseISO(b.endDate), "HH:mm"));
      if (slotStart < bEnd && slotEnd > bStart) return true;
    }
    return false;
  }

  const allAmDisabled = AM_SLOTS.every(isSlotDisabled);
  const allPmDisabled = PM_SLOTS.every(isSlotDisabled);

  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        Available times
      </p>
      <ScrollArea className="h-52 rounded-lg border bg-muted/20">
        <div className="p-3 space-y-4">
          <Section label="Morning" empty={allAmDisabled}>
            {AM_SLOTS.map((slot) => (
              <SlotButton
                key={slot}
                slot={slot}
                selected={value === slot}
                disabled={isSlotDisabled(slot)}
                onClick={() => onChange(slot)}
              />
            ))}
          </Section>
          <Section label="Afternoon & Evening" empty={allPmDisabled}>
            {PM_SLOTS.map((slot) => (
              <SlotButton
                key={slot}
                slot={slot}
                selected={value === slot}
                disabled={isSlotDisabled(slot)}
                onClick={() => onChange(slot)}
              />
            ))}
          </Section>
        </div>
      </ScrollArea>
      {!bizDay && (
        <p className="text-xs text-muted-foreground text-center">
          This day is outside business hours.
        </p>
      )}
    </div>
  );
}

function Section({
  label,
  empty,
  children,
}: {
  label: string;
  empty: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70 shrink-0">
          {label}
        </p>
        <div className="flex-1 h-px bg-border" />
      </div>
      {empty ? (
        <p className="text-xs text-muted-foreground/60 py-1">No availability</p>
      ) : (
        <div className="grid grid-cols-4 gap-1.5">{children}</div>
      )}
    </div>
  );
}

function SlotButton({
  slot,
  selected,
  disabled,
  onClick,
}: {
  slot: string;
  selected: boolean;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      size="sm"
      variant={selected ? "default" : "outline"}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "w-full h-8 text-xs font-medium px-0",
        disabled && "opacity-25 cursor-not-allowed",
      )}
    >
      {slot}
    </Button>
  );
}
