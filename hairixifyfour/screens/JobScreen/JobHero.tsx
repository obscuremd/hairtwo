import Image from "next/image";
import { Eye, Calendar } from "lucide-react";
import Link from "next/link";

export default function JobHero() {
  return (
    <div className="relative h-[320px] w-full">
      <Image
        src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5"
        alt="Job banner"
        fill
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/60" />

      <div className="absolute bottom-8 left-5 md:left-[68px] text-white space-y-3">
        <h1 className="text-3xl md:text-4xl font-bold">
          Experienced Barber Needed
        </h1>

        <div className="flex flex-wrap gap-4 text-sm text-white/80">
          <span>Cutz & Polish Haven</span>
          <Link href="/jobs/barber" className="underline">
            Barber Jobs
          </Link>
          <span className="flex items-center gap-1">
            <Eye size={16} /> 125 views
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={16} /> 26 Nov 2025
          </span>
        </div>
      </div>
    </div>
  );
}
