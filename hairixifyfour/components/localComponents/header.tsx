"use client";

import Link from "next/link";
import { ReactNode, useEffect, useRef, useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
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

import { Input } from "../ui/input";
import {
  jobsDropdownData,
  marketplaceDropdownData,
  stylistDropdownData,
} from "@/lib/dummyData";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { AnimatePresence, motion, Variants } from "motion/react";
import { Filter } from "iconoir-react";

export default function Header() {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [showCategories, setShowCategories] = useState(false);
  const [type, setType] = useState<"stylist" | "marketplace" | "jobs" | null>(
    null,
  );

  const hideTimeout = useRef<NodeJS.Timeout | null>(null);

  const openCategories = () => {
    if (hideTimeout.current) clearTimeout(hideTimeout.current);
    setShowCategories(true);
  };

  const scheduleClose = () => {
    hideTimeout.current = setTimeout(() => {
      setShowCategories(false);
    }, 2000); // 10 seconds
  };
  const shouldShowCategories = (isMobile && pathname !== "/") || showCategories;

  const categoryVariants: Variants = {
    hidden: {
      opacity: 0,
      y: -12,
      pointerEvents: "none",
    },
    visible: {
      opacity: 1,
      y: 0,
      pointerEvents: "auto",
      transition: {
        duration: 0.25,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -12,
      pointerEvents: "none",
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  };

  return (
    <div className="relative">
      <header className="w-full bg-[#09090b] md:h-[70px] md:py-0 flex flex-col md:flex-row items-center p-5 md:px-[60px]">
        <div className="w-full mx-auto flex justify-between items-center font-semibold text-[#1CAB70]">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold md:w-36 w-28">
            <img src={"/Logo.png"} className="md:w-36 w-28 rounded-xl" />
          </Link>
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              onMouseEnter={() => [openCategories(), setType("stylist")]}
              onMouseLeave={scheduleClose}
              className="bg-[#003226] text-[#3ad688] font-medium"
            >
              Find Stylist
            </Button>

            <Button
              onMouseEnter={() => [openCategories(), setType("marketplace")]}
              onMouseLeave={scheduleClose}
              className="bg-[#003226] text-[#3ad688] font-medium"
            >
              Marketplace
            </Button>
            <Button
              onMouseEnter={() => [openCategories(), setType("jobs")]}
              onMouseLeave={scheduleClose}
              className="bg-[#003226] text-[#3ad688] font-medium"
            >
              Job Seekers
            </Button>
            <div className="w-[0.5px] h-[25px] bg-[#3ad688] mx-4" />
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
      {pathname !== "/" && <SearchFilters />}

      <AnimatePresence>
        {shouldShowCategories && (
          <motion.div
            variants={categoryVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onMouseEnter={!isMobile ? openCategories : undefined}
            onMouseLeave={!isMobile ? scheduleClose : undefined}
            className="
        md:absolute md:top-full z-10 w-full flex justify-center
        md:rounded-2xl
      "
          >
            <Dropdown
              data={
                type === "stylist"
                  ? stylistDropdownData
                  : type === "marketplace"
                    ? marketplaceDropdownData
                    : jobsDropdownData
              }
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function SearchFilters() {
  const { category } = useParams<{ category?: string }>();
  const activeCategory = category?.toLowerCase();

  return (
    <div className="w-full bg-[#09090b] md:h-[70px] md:py-0 gap-2 md:gap-5 flex flex-col md:flex-row items-center p-5 md:px-[60px]">
      <div className="relative w-full h-[40px]">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-10 " />
        <Input
          type="text"
          placeholder="Search Services Providers"
          className="pl-10 text-[#898989] bg-white border-0 text-md md:text-md h-[40px]"
        />
      </div>
      <div className="md:w-1/2 flex gap-2 md:gap-5">
        <div className="relative w-full h-[40px]">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-10 " />
          <Input
            type="text"
            placeholder="Where"
            className="pl-10 text-[#898989] bg-white border-0 text-md md:text-md h-[40px]"
          />
        </div>
        <div className="relative w-full h-[40px]">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-10 " />
          <Input
            type="text"
            placeholder="Filter"
            className="pl-10 text-[#898989] bg-white border-0 text-md md:text-md h-[40px]"
          />
        </div>
      </div>
    </div>
  );
}

interface dropdownTypes {
  title: string;
  icon: ReactNode;
  href: string;
}
export function Dropdown({ data }: { data: dropdownTypes[] }) {
  const { category } = useParams<{ category?: string }>();
  const activeCategory = category?.toLowerCase();

  return (
    // OUTER WRAPPER (controls shape & background)
    <div className="w-full md:w-[70%] bg-[#09090b] rounded-b-4xl overflow-hidden px-5">
      {/* SCROLL CONTAINER */}
      <div
        className="
          flex gap-2 md:gap-6
          overflow-x-auto
          px-3 py-3
          scrollbar-thin scrollbar-thumb-muted
          scrollbar-track-transparent
        "
        style={{ scrollbarGutter: "stable" }}
      >
        {data.map((item, index) => {
          const hrefCategory = item.href.split("/").pop()?.toLowerCase();
          const isActive = hrefCategory === activeCategory;

          return (
            <Link key={index} href={item.href} className="shrink-0">
              <div
                className={`
                  group flex flex-col items-center justify-between
                  w-[84px] min-h-[76px] px-2 pb-1
                  text-xs font-medium transition
                  ${isActive ? "text-[#3ad688]" : "text-muted-foreground"}
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
                        : "bg-[#003226] text-[#3ad688] group-hover:bg-[#003226]/60"
                    }
                  `}
                >
                  {item.icon}
                </div>

                {/* Label */}
                <span
                  className={`
                    mt-1 text-center leading-tight line-clamp-2
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
    </div>
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
