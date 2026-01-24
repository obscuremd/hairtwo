import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";

export default function JobSidebar() {
  return (
    <div className="sticky top-24 space-y-6">
      {/* APPLY CARD */}
      <div className="bg-white dark:bg-muted rounded-2xl p-6 space-y-4">
        <p className="text-xl font-bold text-green-600">₦40,000 – ₦50,000</p>

        <Button className="w-full">Apply Now</Button>

        <p className="text-xs text-muted-foreground text-center">
          Never send pre-payments. Meet employers in a safe location.
        </p>
      </div>

      {/* CONTACT INFO */}
      <div className="bg-white dark:bg-muted rounded-2xl p-6 space-y-4">
        <p className="font-bold">Employer Info</p>

        <div className="flex items-center gap-3">
          <Image
            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d"
            alt="Company"
            width={48}
            height={48}
            className="rounded-full object-cover"
          />
          <div>
            <p className="font-semibold">Cutz & Polish Haven</p>
            <p className="text-xs text-muted-foreground">Joined Nov 2025</p>
          </div>
        </div>

        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex gap-2 items-center">
            <Phone size={16} /> 07065083468
          </div>
          <div className="flex gap-2 items-center">
            <Mail size={16} /> cutzandpolish@gmail.com
          </div>
          <div className="flex gap-2 items-center">
            <MapPin size={16} /> Surulere, Lagos
          </div>
        </div>
      </div>
    </div>
  );
}
