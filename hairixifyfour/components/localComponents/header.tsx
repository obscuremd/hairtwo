"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { BriefcaseBusiness, Menu, Search, Store, User, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

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
import { SearchFilters } from "@/screens/HeaderComponents/SearchFilters";
import { Dropdown } from "@/screens/HeaderComponents/Dropdown";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { DialogContent } from "@/components/ui/dialog";
import LoginDialog from "../screenComponents/Auth/LoginDialog";
import RegisterDialog from "../screenComponents/Auth/RegisterDialog";

export default function Header() {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [showCategories, setShowCategories] = useState(false);
  const [type, setType] = useState<"stylist" | "marketplace" | "jobs" | null>(
    null,
  );
  const showHeader = pathname?.startsWith("/dashboard");

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
  const shouldShowCategories =
    (isMobile && pathname !== "/" && pathname !== "/auth/register") ||
    showCategories;

  const getDropdownData = (): dropdownTypes[] => {
    if (pathname.startsWith("/find-stylist")) {
      return stylistDropdownData;
    }

    if (pathname.startsWith("/marketplace")) {
      return marketplaceDropdownData;
    }

    if (pathname.startsWith("/jobs")) {
      return jobsDropdownData;
    }

    return [];
  };

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
    <div className={`${showHeader ? "hidden" : ""}`}>
      <header className="relative w-full bg-[#09090b] md:h-[70px] md:py-0 flex flex-col md:flex-row items-center p-5 md:px-[60px]">
        <div className="w-full mx-auto flex justify-between items-center font-semibold text-[#1CAB70]">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold md:w-36 w-28">
            <img src={"/Logo.png"} className="md:w-36 w-28 rounded-xl" />
          </Link>
          {/* Desktop Nav */}
          <div className="hidden md:flex justify-between items-center w-full">
            <div className="space-x-10 flex items-center justify-center w-full">
              <Button
                variant={"ghost"}
                onMouseEnter={() => [openCategories(), setType("stylist")]}
                onMouseLeave={scheduleClose}
                className="border border-transparent text-white font-medium hover:bg-[#ffffff15] hover:text-[#3ad688] hover:border-[#3ad688] "
              >
                Find Stylist
              </Button>

              <Button
                variant={"ghost"}
                onMouseEnter={() => [openCategories(), setType("marketplace")]}
                onMouseLeave={scheduleClose}
                className="border border-transparent text-white font-medium hover:bg-[#ffffff15] hover:text-[#3ad688] hover:border-[#3ad688]"
              >
                Marketplace
              </Button>
              <Button
                variant={"ghost"}
                onMouseEnter={() => [openCategories(), setType("jobs")]}
                onMouseLeave={scheduleClose}
                className="border border-transparent text-white font-medium hover:bg-[#ffffff15] hover:text-[#3ad688] hover:border-[#3ad688] "
              >
                Job Seekers
              </Button>
            </div>

            <div className="border-2 rounded-lg border-[#3ad688] flex space-x-2">
              <Dialog>
                <DialogTrigger>
                  <Button
                    variant={"ghost"}
                    className="text-white font-medium hover:bg-transparent hover:text-muted-foreground"
                  >
                    Login{" "}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <LoginDialog />
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger>
                  <Button className="text-[#003226] bg-[#3ad688] font-medium">
                    Sign up
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <RegisterDialog />
                </DialogContent>
              </Dialog>
            </div>
          </div>
          {/* Mobile Menu Toggle */}
          <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger className="md:hidden">
              <Button
                className="bg-[#003226] text-[#3ad688]"
                variant={"secondary"}
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </DropdownMenuTrigger>

            {/* Mobile Nav */}
            <DropdownMenuContent className="md:hidden w-screen bg-[#000000dd] border-0">
              <div className=" px-4 py-3 flex flex-col gap-2 w-full">
                <Link href="/find-stylist/barbershop">
                  <Button
                    variant={"ghost"}
                    onClick={() => setIsOpen(false)}
                    className="text-white w-full  font-medium"
                  >
                    Find Stylist
                  </Button>
                </Link>
                <Link href="/marketplace/hair-styling-accessories">
                  <Button
                    variant={"ghost"}
                    onClick={() => setIsOpen(false)}
                    className="text-white w-full  font-medium"
                  >
                    Marketplace
                  </Button>
                </Link>
                <Link href="/jobs/wigs-and-extensions">
                  <Button
                    variant={"ghost"}
                    onClick={() => setIsOpen(false)}
                    className="text-white w-full  font-medium"
                  >
                    Job Seekers
                  </Button>
                </Link>
                <div className="mt-10 border-2 rounded-lg border-[#3ad688] w-fit space-x-2 inline-flex self-center">
                  <Dialog>
                    <DialogTrigger>
                      <Button
                        variant={"ghost"}
                        className="text-white font-medium hover:bg-transparent hover:text-muted-foreground"
                      >
                        Login{" "}
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <LoginDialog />
                    </DialogContent>
                  </Dialog>
                  <Link href="/auth/register">
                    <Button className="text-[#003226] bg-[#3ad688] font-medium">
                      Sign up
                    </Button>
                  </Link>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <AnimatePresence>
          {shouldShowCategories && (
            <motion.div
              variants={categoryVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onMouseEnter={!isMobile ? openCategories : undefined}
              onMouseLeave={!isMobile ? scheduleClose : undefined}
              className="hidden md:flex md:absolute md:top-full left-0 md:z-9999 w-full justify-center md:rounded-2xl "
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
      </header>
      {pathname !== "/" && <SearchFilters />}
      {/* mobile */}
      {isMobile && pathname !== "/" && (
        <div className="flex md:hidden">
          <Dropdown data={getDropdownData()} />
        </div>
      )}
    </div>
  );
}

export function BottomTabs() {
  const router = useRouter();

  return (
    <nav className="w-full bg-zinc-800 px-5 py-2 flex justify-between">
      {/* Desktop Nav */}
      <Link href="/find-stylist/aesthetics">
        <Button
          variant={"ghost"}
          className="flex flex-col h-fit text-tertiary-c"
        >
          <Search />
          Find Stylist
        </Button>
      </Link>
      <Link href="/marketplace/hair-styling-accessories">
        <Button
          variant={"ghost"}
          className="flex flex-col h-fit text-tertiary-c"
        >
          <Store />
          Marketplace
        </Button>
      </Link>
      <Link href="/jobs/wigs-and-extensions">
        <Button
          variant={"ghost"}
          className="flex flex-col h-fit text-tertiary-c"
        >
          <BriefcaseBusiness /> Jobs
        </Button>
      </Link>
      <Dialog>
        <DialogTrigger>
          <Button
            variant={"ghost"}
            className="flex flex-col h-fit text-tertiary-c"
          >
            <User />
            Login
          </Button>
        </DialogTrigger>
        <DialogContent>
          <LoginDialog />
        </DialogContent>
      </Dialog>
    </nav>
  );
}
