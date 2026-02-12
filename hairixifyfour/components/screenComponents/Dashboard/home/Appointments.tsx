"use client";
import { Calendar, Clock, User, Plus, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

const upcomingAppointments = [
  {
    id: 1,
    clientName: "Sarah Johnson",
    service: "Brand Consultation",
    date: "Feb 15, 2026",
    time: "10:00 AM",
    duration: "1 hour",
    location: "Office",
  },
  {
    id: 2,
    clientName: "Michael Chen",
    service: "Design Review",
    date: "Feb 16, 2026",
    time: "2:30 PM",
    duration: "45 min",
    location: "Virtual",
  },
  {
    id: 3,
    clientName: "Emma Davis",
    service: "Strategy Session",
    date: "Feb 18, 2026",
    time: "11:00 AM",
    duration: "2 hours",
    location: "Office",
  },
  {
    id: 4,
    clientName: "James Wilson",
    service: "Project Kickoff",
    date: "Feb 20, 2026",
    time: "9:00 AM",
    duration: "1.5 hours",
    location: "Virtual",
  },
];

const tomorrowAppointments = [
  {
    id: 5,
    clientName: "Olivia Martinez",
    service: "Initial Consultation",
    date: "Feb 12, 2026",
    time: "9:30 AM",
    duration: "30 min",
    location: "Office",
  },
  {
    id: 6,
    clientName: "David Brown",
    service: "Follow-up Meeting",
    date: "Feb 12, 2026",
    time: "1:00 PM",
    duration: "45 min",
    location: "Virtual",
  },
  {
    id: 7,
    clientName: "Sophia Lee",
    service: "Portfolio Review",
    date: "Feb 12, 2026",
    time: "3:30 PM",
    duration: "1 hour",
    location: "Office",
  },
];

export default function Appointments() {
  const router = useRouter();

  return (
    <div className="space-y-4">
      {/* Upcoming Appointments Section */}
      <AppointmentSection
        title="Upcoming Appointments"
        appointments={upcomingAppointments}
        onAddClick={() => router.push("/dashboard/appointments")}
      />

      {/* Tomorrow Section */}
      <AppointmentSection
        title="Tomorrow"
        appointments={tomorrowAppointments}
        onAddClick={() => router.push("/dashboard/appointments")}
      />
    </div>
  );
}

function AppointmentSection({
  title,
  appointments,
  onAddClick,
}: {
  title: string;
  appointments: Array<{
    id: number;
    clientName: string;
    service: string;
    date: string;
    time: string;
    duration: string;
    location: string;
  }>;
  onAddClick: () => void;
}) {
  return (
    <div className="bg-white border border-[#e6e3d6] rounded-lg p-4 h-[40vh] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 pb-3 border-b border-[#e6e3d6] shrink-0">
        <div>
          <h2 className="text-lg font-semibold text-[#003225]">{title}</h2>
          <p className="text-xs text-gray-500">
            {appointments.length} scheduled
          </p>
        </div>
        <Link href={"/dashboard/appointments"}>
          <Button
            size="sm"
            onClick={onAddClick}
            className="font-medium border-0 h-8 text-xs"
          >
            <Plus className="w-3.5 h-3.5 mr-1" />
            Add
          </Button>
        </Link>
      </div>

      {/* Appointments List - Scrollable */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-1 scrollbar-thin scrollbar-thumb-[#e6e3d6] scrollbar-track-transparent">
        {appointments.map((appointment) => (
          <AppointmentCard key={appointment.id} appointment={appointment} />
        ))}
      </div>
    </div>
  );
}

function AppointmentCard({
  appointment,
}: {
  appointment: {
    id: number;
    clientName: string;
    service: string;
    date: string;
    time: string;
    duration: string;
    location: string;
  };
}) {
  const isVirtual = appointment.location === "Virtual";

  return (
    <div className="border-l-2 border-l-[#3ad688] rounded-md p-3 shadow-sm hover:shadow-md transition-all cursor-pointer group">
      <div className="flex items-start gap-3">
        {/* Time indicator */}
        <div className="bg-[#3ad688]/10 text-[#3ad688] p-2 rounded-md shrink-0">
          <Clock className="w-4 h-4" strokeWidth={2} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm text-[#003225] leading-tight">
                {appointment.clientName}
              </h3>
              <p className="text-xs text-gray-600 line-clamp-1">
                {appointment.service}
              </p>
            </div>
            <span
              className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${
                isVirtual
                  ? "bg-blue-50 text-blue-700 border border-blue-200"
                  : "bg-amber-50 text-amber-700 border border-amber-200"
              }`}
            >
              {appointment.location}
            </span>
          </div>

          <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{appointment.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{appointment.time}</span>
            </div>
            <span className="text-gray-400">•</span>
            <span>{appointment.duration}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
