"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  BriefcaseBusiness,
  Brush,
  Clock,
  Dumbbell,
  HandFist,
  MapPin,
  Menu,
  Search,
  SearchIcon,
  Store,
  TabletSmartphoneIcon,
  User,
  X,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import {
  ScissorAlt,
  FaceId,
  UserStar,
  Spark,
  SpockHandGesture,
  GraduationCap,
  Eye,
  HotAirBalloon,
  Pin,
  Droplet,
  Flower,
  UserCircle,
  PharmacyCrossCircle,
} from "iconoir-react";
import { Input } from "../ui/input";

export default function Header() {
  const isMobile = useIsMobile();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full bg-[#09090b] md:h-[70px] md:py-0 flex flex-col md:flex-row items-center p-5 md:px-[60px]">
      <div className="w-full mx-auto flex justify-between items-center font-semibold text-[#1CAB70]">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          <img src={"/Logo.png"} className="md:w-36 w-28 rounded-xl" />
        </Link>

        {/* Desktop Nav */}
        <NavigationMenu className="hidden md:flex items-center gap-4">
          <NavigationMenuList className="hidden md:flex items-center gap-4">
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-[#003226] text-[#3ad688] font-medium">
                Find Stylist
              </NavigationMenuTrigger>

              <NavigationMenuContent>
                <StylistContent />
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
          <Link href="/find-talent">
            <Button className="bg-[#003226] text-[#3ad688] font-medium">
              Marketplace
            </Button>
          </Link>
          <Link href="/find-recruiters">
            <Button className="bg-[#003226] text-[#3ad688] font-medium">
              Job Seekers
            </Button>
          </Link>
          <Link href="/auth" className="ml-4">
            <Button className="text-[#003226] bg-[#3ad688] font-bold">
              Login / SIgn up
            </Button>
          </Link>
        </NavigationMenu>

        {/* Mobile Menu Toggle */}
        <Button
          variant={"secondary"}
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden px-4 py-3 flex flex-col gap-2 w-full">
          <Link href="/find-stylist/barbershop">
            <Button
              onClick={() => setIsOpen(false)}
              className="bg-[#003226] w-full text-[#1CAB70] font-medium"
            >
              Find Stylist
            </Button>
          </Link>
          <Link href="/find-talent">
            <Button
              onClick={() => setIsOpen(false)}
              className="bg-[#003226] w-full text-[#1CAB70] font-medium"
            >
              Marketplace
            </Button>
          </Link>
          <Link href="/find-recruiters">
            <Button
              onClick={() => setIsOpen(false)}
              className="bg-[#003226] w-full text-[#1CAB70] font-medium"
            >
              Job Seekers
            </Button>
          </Link>
          <Link href="/auth">
            <Button
              onClick={() => setIsOpen(false)}
              className="text-[#003226] w-full bg-[#1CAB70] font-semibold "
            >
              Login / SIgn up
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
}

export function StylistHeader() {
  const { category } = useParams<{ category?: string }>();
  const activeCategory = category?.toLowerCase();

  return (
    <header className="w-full bg-[#09090b] flex flex-col gap-5 items-center p-5 md:px-[60px] md:py-5">
      <div className="w-full flex gap-2">
        <div className="relative w-full h-[45px]">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-10 " />
          <Input
            type="text"
            placeholder="Search Services or Buisnesses"
            className="pl-10 py-6 text-[#898989] bg-white border-0 text-md md:text-md h-[45px]"
          />
        </div>
        <div className="relative w-full h-[45px]">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-10 " />
          <Input
            type="text"
            placeholder="Where"
            className="pl-10 py-6 text-[#898989] bg-white border-0 text-md md:text-md h-[45px]"
          />
        </div>
        <div className="relative w-1/3 h-[45px]">
          <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-10 " />
          <Input
            type="text"
            placeholder="When"
            className="pl-10 py-6 text-[#898989] bg-white border-0 text-md md:text-md h-[45px]"
          />
        </div>
      </div>
      {/* Categories */}
      <div className="flex gap-10 overflow-x-auto w-full py-2">
        {stylistCategories.map((item, index) => {
          const hrefCategory = item.href.split("/").pop()?.toLowerCase();

          const isActive = hrefCategory === activeCategory;
          return (
            <Link key={index} href={item.href}>
              <Button
                className={`
              flex items-center gap-2 rounded-none px-4 py-2 text-sm
              bg-transparent border-b-2 transition
              ${
                isActive
                  ? "border-primary-c text-[#3ad688]"
                  : "border-transparent text-muted-foreground hover:border-gray-300"
              }
            `}
              >
                {item.title}
              </Button>
            </Link>
          );
        })}
      </div>
    </header>
  );
}

export function BottomTabs() {
  const router = useRouter();

  return (
    <nav className="w-full bg-zinc-800 px-5 py-2 flex justify-between">
      {/* Desktop Nav */}
      <Link href="/find-talent">
        <Button
          variant={"ghost"}
          className="flex flex-col h-fit text-tertiary-c"
        >
          <Search />
          Find Stylist
        </Button>
      </Link>
      <Link href="/find-talent">
        <Button
          variant={"ghost"}
          className="flex flex-col h-fit text-tertiary-c"
        >
          <Store />
          Marketplace
        </Button>
      </Link>
      <Link href="/find-recruiters">
        <Button
          variant={"ghost"}
          className="flex flex-col h-fit text-tertiary-c"
        >
          <BriefcaseBusiness /> Jobs
        </Button>
      </Link>
      <Link href="/auth">
        <Button
          variant={"ghost"}
          className="flex flex-col h-fit text-tertiary-c"
        >
          <User />
          Login
        </Button>
      </Link>
    </nav>
  );
}

function StylistContent() {
  return (
    <div
      className="
        w-[520px]
        max-h-[420px]
        overflow-y-auto
        p-4
        scrollbar-thin
        scrollbar-thumb-muted
        scrollbar-track-transparent
      "
    >
      <div className="grid grid-cols-2 gap-3">
        {stylistCategories.map((item, index) => (
          <NavigationMenuLink asChild key={index}>
            <Link
              href={item.href}
              className=" group flex gap-3 rounded-xl border-2 border-border bg-background p-4 transition hover:bg-muted/50 hover:border-[#3ad688] "
            >
              {/* Icon */}
              <div className=" flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted text-[#003226] transition group-hover:bg-[#3ad688] ">
                {item.icon}
              </div>

              {/* Text */}

              <div className="space-y-1 ">
                <p className="text-sm font-semibold leading-none group-hover:text-[#3ad688]">
                  {item.title}
                </p>
                <p className="text-xs text-muted-foreground leading-snug group-hover:text-[#4ef1a0]">
                  {item.description}
                </p>
              </div>
            </Link>
          </NavigationMenuLink>
        ))}
      </div>
    </div>
  );
}

const stylistCategories = [
  {
    title: "Aesthetics",
    description: "Non-surgical beauty treatments and skin enhancements.",
    icon: <Spark />,
    href: "/find-stylist/aesthetics",
  },
  {
    title: "Barbershop",
    description: "Professional grooming, fades, and classic cuts.",
    icon: <ScissorAlt />,
    href: "/find-stylist/barbershop",
  },
  {
    title: "Beauty Training Centre",
    description: "Learn professional beauty and cosmetology skills.",
    icon: <GraduationCap />,
    href: "/find-stylist/training",
  },
  {
    title: "Braids & Locs",
    description: "Protective styling, braiding, and dreadlocks.",
    icon: <Brush />,
    href: "/find-stylist/braids",
  },
  {
    title: "Eyebrows & Lashes",
    description: "Brow shaping, microblading, and lash extensions.",
    icon: <Eye />,
    href: "/find-stylist/lashes",
  },
  {
    title: "Hair Salon",
    description: "Cuts, coloring, styling, and hair treatments.",
    icon: <HotAirBalloon />,
    href: "/find-stylist/hair-salon",
  },
  {
    title: "Health & Fitness",
    description: "Personal trainers, wellness, and body fitness.",
    icon: <Dumbbell />,
    href: "/find-stylist/fitness",
  },
  {
    title: "Makeup",
    description: "Event, bridal, and everyday makeup services.",
    icon: <FaceId />,
    href: "/find-stylist/makeup",
  },
  {
    title: "Massage",
    description: "Relaxation, deep tissue, and therapeutic massage.",
    icon: <Spark />,
    href: "/find-stylist/massage",
  },
  {
    title: "Nail Salon",
    description: "Manicure, pedicure, and nail art services.",
    icon: <HandFist />,
    href: "/find-stylist/nails",
  },
  {
    title: "Piercing",
    description: "Safe and professional body piercing services.",
    icon: <Pin />,
    href: "/find-stylist/piercing",
  },
  {
    title: "Skin Care",
    description: "Facials, skin treatments, and consultations.",
    icon: <Droplet />,
    href: "/find-stylist/skincare",
  },
  {
    title: "Spa",
    description: "Luxury spa treatments and relaxation packages.",
    icon: <Flower />,
    href: "/find-stylist/spa",
  },
  {
    title: "Tattoo Shops",
    description: "Professional tattoo artists and studios.",
    icon: <TabletSmartphoneIcon />,
    href: "/find-stylist/tattoos",
  },
  {
    title: "Teeth Whitening",
    description: "Cosmetic teeth brightening services.",
    icon: <UserCircle />,
    href: "/find-stylist/teeth",
  },
  {
    title: "Therapy Centre",
    description: "Mental, physical, and wellness therapy services.",
    icon: <PharmacyCrossCircle />,
    href: "/find-stylist/therapy",
  },
];
