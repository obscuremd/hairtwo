import { Mail, MapPin, Phone } from "lucide-react";
import { Facebook, Instagram, Whatsapp, X } from "iconoir-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function About({ provider }: { provider: Provider }) {
  const locationQuery = provider.address
    ? `${provider.address}, ${provider.local.name}`
    : provider.local.name;

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const mapImage = `https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(
    locationQuery,
  )}&zoom=15&size=600x300&markers=color:red%7C${encodeURIComponent(
    locationQuery,
  )}&key=${apiKey}`;

  const googleMapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(
    locationQuery,
  )}`;

  const dayMap: Record<string, string> = {
    Mon: "Monday",
    Tue: "Tuesday",
    Wed: "Wednesday",
    Thu: "Thursday",
    Fri: "Friday",
    Sat: "Saturday",
    Sun: "Sunday",
  };

  function formatTime(time: string) {
    const [hour, minute] = time.split(":").map(Number);
    const suffix = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minute.toString().padStart(2, "0")} ${suffix}`;
  }

  return (
    <div className=" p-5 md:pr-[48px] md:py-[68px]">
      {/* MAP */}
      <div className="space-y-10 bg-muted p-5 rounded-2xl">
        <Link
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block h-[220px] w-full overflow-hidden rounded-xl"
        >
          <img
            src={mapImage}
            alt="Location map"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition" />

          <div className="absolute bottom-3 left-3 rounded-md bg-white/90 px-3 py-1 text-xs font-semibold text-black shadow">
            Open in Google Maps
          </div>
        </Link>

        <div className="space-y-2">
          <p className="text-md font-bold md:text-lg">Contact Info</p>
          <div className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Phone size={18} />
            <p>{provider.phone_number}</p>
          </div>
          <div className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Mail size={18} />
            <p>{provider.user.email}</p>
          </div>
          <div className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <MapPin size={18} />
            <p>
              {provider.address} , {provider.local.name}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-md font-bold md:text-lg">Staffers</p>

          <div className="relative">
            {/* Scroll container */}
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
              {data.map((item, index) => (
                <div
                  key={index}
                  className="snap-start shrink-0 w-[70px] flex flex-col items-center gap-1"
                >
                  {/* Avatar */}
                  <div className="relative h-14 w-14 rounded-full overflow-hidden bg-muted">
                    <Image
                      src={item.picture}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Name */}
                  <p className="text-xs font-medium text-center truncate w-full">
                    {item.name}
                  </p>
                </div>
              ))}
            </div>

            {/* Fade edges (visual hint) */}
            <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-muted to-transparent" />
            <div className="pointer-events-none absolute left-0 top-0 h-full w-6 bg-gradient-to-r from-muted to-transparent" />
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-md font-bold md:text-lg">Business Hours</p>
          <div className="text-sm font-medium text-muted-foreground grid grid-cols-2 gap-5">
            {provider.business_hours.map((item, index) => (
              <>
                <p key={`day-${index}`}>{dayMap[item.day] || item.day}</p>
                <p key={`time-${index}`}>
                  {formatTime(item.start)} - {formatTime(item.end)}
                </p>
              </>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-md font-bold md:text-lg">Social Media</p>
          <div className="text-sm font-medium text-muted-foreground flex gap-5">
            <Button size={"icon"}>
              <Whatsapp />
            </Button>
            <Button size={"icon"}>
              <Instagram />
            </Button>
            <Button size={"icon"}>
              <Facebook />
            </Button>
            <Button size={"icon"}>
              <X />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

const data = [
  {
    picture:
      "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
    name: "John Doe",
  },
  {
    picture:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
    name: "John Doe",
  },
  {
    picture:
      "https://plus.unsplash.com/premium_photo-1683121366070-5ceb7e007a97?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
    name: "John Doe",
  },
  {
    picture:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
    name: "John Doe",
  },
  {
    picture:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
    name: "John Doe",
  },
  {
    picture:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
    name: "John Doe",
  },
  {
    picture:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHVzZXJ8ZW58MHx8MHx8fDA%3D",
    name: "John Doe",
  },
  {
    picture:
      "https://plus.unsplash.com/premium_photo-1688350808212-4e6908a03925?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHVzZXJ8ZW58MHx8MHx8fDA%3D",
    name: "John Doe",
  },
  {
    picture:
      "https://images.unsplash.com/photo-1701615004837-40d8573b6652?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHVzZXJ8ZW58MHx8MHx8fDA%3D",
    name: "John Doe",
  },
  {
    picture:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHVzZXJ8ZW58MHx8MHx8fDA%3D",
    name: "John Doe",
  },
];
