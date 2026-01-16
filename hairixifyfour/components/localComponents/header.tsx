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
  Eye,
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

import { Input } from "../ui/input";
import { stylistCategories } from "@/lib/dummyData";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Separator } from "../ui/separator";

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
        <div className="hidden md:flex items-center gap-4">
          <Dialog>
            <DialogTrigger>
              <Button className="bg-[#003226] text-[#3ad688] font-medium">
                Find Stylist
              </Button>
            </DialogTrigger>

            <DialogContent>
              <StylistContent />
            </DialogContent>
          </Dialog>

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
          <div className="w-[0.5px] h-[25px] bg-[#3ad688]" />
          <Link href="/auth">
            <Button className="text-[#003226] bg-[#3ad688] font-bold">
              Login / SIgn up
            </Button>
          </Link>
        </div>
        {/* Mobile Menu Toggle */}
        <DropdownMenu>
          <DropdownMenuTrigger className="md:hidden">
            <Button variant={"secondary"} onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </DropdownMenuTrigger>

          {/* Mobile Nav */}
          <DropdownMenuContent className="md:hidden w-screen bg-black backdrop-blur-xl border-0">
            <div className=" px-4 py-3 flex flex-col gap-2 w-full">
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
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export function StylistHeader() {
  const { category } = useParams<{ category?: string }>();
  const activeCategory = category?.toLowerCase();

  return (
    <header className="w-full flex flex-col items-center">
      <div className="w-full flex flex-col md:flex-row gap-2 bg-[#09090b]  p-5 md:px-[60px] pb-5 pt-1">
        <div className="relative w-full h-[45px]">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-10 " />
          <Input
            type="text"
            placeholder="Search Services or Buisnesses"
            className="pl-10 -py-2 text-[#898989] bg-white border-0 text-md md:text-md h-[45px]"
          />
        </div>
        <div className="flex gap-2 md:w-1/2">
          <div className="relative w-full h-[45px]">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-10 " />
            <Input
              type="text"
              placeholder="Where"
              className="pl-10 -py-2 text-[#898989] bg-white border-0 text-md md:text-md h-[45px]"
            />
          </div>
          <div className="relative w-full h-[45px]">
            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-10 " />
            <Input
              type="text"
              placeholder="When"
              className="pl-10 -py-2 text-[#898989] bg-white border-0 text-md md:text-md h-[45px]"
            />
          </div>
        </div>
      </div>
      {/* Categories */}
      <div className="w-full md:w-[70%] flex gap-2 md:gap-6 overflow-x-auto p-3 -mt-2 scrollbar-thin scrollbar-thumb-muted bg-[#09090b] rounded-b-2xl">
        {stylistCategories.map((item, index) => {
          const hrefCategory = item.href.split("/").pop()?.toLowerCase();
          const isActive = hrefCategory === activeCategory;

          return (
            <Link key={index} href={item.href} className="shrink-0">
              <div
                className={`
            group flex flex-col items-center justify-between
            w-[84px] min-h-[76px] px-2 pb-2
            text-xs font-medium transition
            border-b-2
            ${
              isActive
                ? "border-[#3ad688] text-[#3ad688]"
                : "border-transparent text-muted-foreground hover:border-muted"
            }
          `}
              >
                {/* Icon */}
                <div
                  className={`
              flex h-10 w-10 items-center justify-center rounded-lg
              transition-all duration-200
              ${
                isActive
                  ? "bg-[#1CAB70] text-white"
                  : "bg-[#003226] text-[#3ad688] group-hover:bg-muted/70"
              }
            `}
                >
                  {item.icon}
                </div>

                {/* Label */}
                <span
                  className={`
              mt-1 text-center leading-tight
              line-clamp-2
              ${isActive ? "text-[#3ad688]" : "group-hover:text-muted"}
            `}
                >
                  {item.title}
                </span>
              </div>
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
        w-full
        max-h-[420px]
        overflow-y-auto
        p-5
        rounded-2xl
        bg-background
        scrollbar-thin
        scrollbar-thumb-muted
        scrollbar-track-transparent
      "
    >
      <p className="text-center text-2xl font-bold pb-5">Stylists</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {stylistCategories.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="
                group flex flex-col items-center text-center gap-3
                rounded-xl border border-border bg-white p-4
                transition-all duration-200
                hover:border-[#3ad688]
                hover:shadow-sm
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#3ad688]/50
              "
          >
            <div className="text-4xl group-hover:text-[#3ad688]">
              {item.icon}
            </div>
            <p className="text-xs font-medium text-foreground transition-colors group-hover:text-[#3ad688] flex flex-col items-center gap-2">
              {/* Bigger icon */}
              {item.title}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
