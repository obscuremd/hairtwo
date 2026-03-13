import Appointments from "@/components/screenComponents/Dashboard/home/Appointments";
import Notification from "@/components/screenComponents/Dashboard/home/Notification";
import Performance from "@/components/screenComponents/Dashboard/home/Performance";
import Resources from "@/components/screenComponents/Dashboard/home/Resources";
import { Home } from "lucide-react";

export default function Page() {
  return (
    <div className="min-h-screen space-y-5 p-0">
      <div className="flex items-center gap-2">
        <div className="flex size-12 items-center justify-center rounded-full border p-3">
          <Home className="size-6 text-t-secondary" />
        </div>
        <p className="text-3xl font-semibold tracking-tight">Home</p>
      </div>
      <div className=" mx-auto">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="space-y-8 md:w-[90%]">
            <Notification />
            <Performance />
            <Appointments />
          </div>
          <Resources />
        </div>
      </div>
    </div>
  );
}
