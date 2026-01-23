import { Mail, MapPin, Phone } from "lucide-react";
import { Facebook, Instagram, Whatsapp, X } from "iconoir-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function About() {
  return (
    <div className=" p-5 md:pr-[48px] md:py-[68px] space-y-5">
      {/* MAP */}
      <div className="space-y-10 bg-muted p-5 rounded-2xl">
        <div className="space-y-2">
          <p className="text-xl font-bold p-2 bg-muted-foreground rounded-lg text-white">
            Price
          </p>
          <p className="text-3xl font-bold text-[#14ca69]">$300,000</p>
        </div>
      </div>
      <div className="space-y-10 bg-muted p-5 rounded-2xl">
        <div className="space-y-2">
          <p className="text-xl font-bold p-2 bg-muted-foreground rounded-lg text-white">
            Contact Info
          </p>
          <p className="text-xl font-bold">Mide Luxury Hair Ltd</p>
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
      <div className="space-y-10 bg-muted p-5 rounded-2xl">
        <div className="space-y-2">
          <p className="text-xl font-bold p-2 bg-muted-foreground rounded-lg text-white">
            Safety Tips
          </p>
          <p className="text-xl font-bold">Mide Luxury Hair Ltd</p>
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
