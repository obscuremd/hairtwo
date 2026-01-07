import { Mail, MapPin, Phone } from "lucide-react";
import { Facebook, Instagram, Whatsapp, X } from "iconoir-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function About() {
  const latitude = 6.5244;
  const longitude = 3.3792;

  const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const mapImage = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=15&size=600x300&markers=color:red%7C${latitude},${longitude}&key=${apiKey}`;

  return (
    <div className=" p-5 md:p-[48px]">
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

        <div className="">
          <p className="text-md font-bold md:text-lg">About Us</p>
          <p className="text-sm font-medium text-muted-foreground">
            For any kind of make up — Owanbe, video/photoshoot, traditional,
            registry/court — we’ve got you covered.
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-md font-bold md:text-lg">Contact Info</p>
          <div className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Phone size={18} />
            <p>(+234) 903 432 5561</p>
          </div>
          <div className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Mail size={18} />
            <p>zanimashaun65@gmail.com</p>
          </div>
          <div className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <MapPin size={18} />
            <p>1, Raji Oba Bus Stop, Alimosho, Lagos</p>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-md font-bold md:text-lg">Business Hours</p>
          <div className="text-sm font-medium text-muted-foreground grid grid-cols-2 gap-5">
            <p>Sunday</p>
            <p>10:00 AM - 04:00 AM</p>
            <p>Monday</p>
            <p>10:00 AM - 04:00 AM</p>
            <p>Tuesday</p>
            <p>10:00 AM - 04:00 AM</p>
            <p>Wednessday</p>
            <p>10:00 AM - 04:00 AM</p>
            <p>Thursday</p>
            <p>10:00 AM - 04:00 AM</p>
            <p>Friday</p>
            <p>10:00 AM - 04:00 AM</p>
            <p>Saturday</p>
            <p>10:00 AM - 04:00 AM</p>
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
