import { CalendarIcon } from "lucide-react";
import { BookingCalendar } from "@/components/screenComponents/Dashboard/appointment/BookingCalender";

export default function Page() {
  return (
    <main className="flex max-h-screen  flex-col">
      <div className="container md:mx-auto space-y-2">
        <div className="flex items-center gap-2">
          <div className="flex size-12 items-center justify-center rounded-full border p-3">
            <CalendarIcon className="size-6 text-t-secondary" />
          </div>
          <p className="text-3xl font-semibold tracking-tight">Appointments</p>
        </div>
        <BookingCalendar />
      </div>
    </main>
  );
}
