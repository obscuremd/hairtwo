"use client";

import * as React from "react";
import { format, isBefore, startOfDay } from "date-fns";
import { CalendarIcon, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const DAY_MAP: Record<number, string> = {
  0: "Sun",
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thu",
  5: "Fri",
  6: "Sat",
};

interface DatePickerProps {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  businessHours: IBusinessHours[];
}

export function DatePicker({
  value,
  onChange,
  businessHours,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  const businessDays = businessHours.map((b) => b.day);

  const isDisabled = (date: Date) => {
    if (isBefore(date, startOfDay(new Date()))) return true;
    return !businessDays.includes(DAY_MAP[date.getDay()]);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-between font-normal h-10 text-sm",
            !value && "text-muted-foreground",
          )}
        >
          <div className="flex items-center gap-2">
            <CalendarIcon className="size-4 text-muted-foreground" />
            {value ? format(value, "EEE, MMM d, yyyy") : "Select a date"}
          </div>
          <ChevronDown className="size-4 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(d) => {
            onChange(d);
            setOpen(false);
          }}
          disabled={isDisabled}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
