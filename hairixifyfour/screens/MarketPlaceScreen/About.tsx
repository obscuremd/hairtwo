import { Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { Facebook, Instagram, Whatsapp, X } from "iconoir-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function About() {
  return (
    <div className="space-y-6 p-4 md:py-[68px] md:pr-[48px]">
      {/* PRICE */}
      <div className="bg-white rounded-2xl border p-5 space-y-3">
        <p className="text-sm font-medium text-muted-foreground">Price</p>
        <p className="text-3xl font-bold text-[#14ca69]">₦300,000</p>
      </div>

      {/* SELLER INFO */}
      <div className="bg-white rounded-2xl border p-5 space-y-5">
        <p className="text-sm font-semibold text-gray-900">
          Seller Information
        </p>

        <div className="flex items-center gap-3">
          <Image
            src="https://plus.unsplash.com/premium_photo-1688350808212-4e6908a03925?w=600&auto=format&fit=crop&q=60"
            alt="Seller profile"
            height={48}
            width={48}
            className="rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-gray-900">Mide Luxury Hair Ltd</p>
            <p className="text-xs text-muted-foreground">Verified seller</p>
          </div>
        </div>

        <div className="space-y-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Phone size={16} />
            <span>(+234) 903 432 5561</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={16} />
            <span>zanimashaun65@gmail.com</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} />
            <span>Alimosho, Lagos</span>
          </div>
        </div>

        {/* SOCIAL */}
        <div>
          <p className="text-sm font-medium mb-2">Social media</p>
          <div className="flex gap-3">
            <Button size="icon" variant="outline">
              <Whatsapp />
            </Button>
            <Button size="icon" variant="outline">
              <Instagram />
            </Button>
            <Button size="icon" variant="outline">
              <Facebook />
            </Button>
            <Button size="icon" variant="outline">
              <X />
            </Button>
          </div>
        </div>
      </div>

      {/* SAFETY */}
      <div className="bg-white rounded-2xl border p-5 space-y-3">
        <div className="flex items-center gap-2 text-gray-900">
          <ShieldCheck className="w-5 h-5 text-[#14ca69]" />
          <p className="font-semibold">Safety tips</p>
        </div>

        <ol className="list-disc pl-5 space-y-2 text-sm text-muted-foreground leading-relaxed">
          <li>Avoid sending pre-payments.</li>
          <li>Meet the seller in a public place.</li>
          <li>
            Inspect the item carefully and only pay once you’re fully satisfied.
          </li>
        </ol>
      </div>
    </div>
  );
}
