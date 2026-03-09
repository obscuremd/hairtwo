"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  BriefcaseBusiness,
  ChevronDown,
  LogOut,
  Menu,
  PercentCircle,
  Search,
  Store,
  User,
  X,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { AnimatePresence, motion, Variants } from "motion/react";
import { SearchFilters } from "@/screens/HeaderComponents/SearchFilters";
import { Dropdown } from "@/screens/HeaderComponents/Dropdown";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import LoginDialog from "../screenComponents/Auth/LoginDialog";
import RegisterDialog from "../screenComponents/Auth/RegisterDialog";
import { UseGen } from "@/context/GeneralContext";
import { Skeleton } from "../ui/skeleton";
import { Avatar, getInitials } from "./InitialsAvater";

// ─── Types ────────────────────────────────────────────────────────────────────

interface SubCat {
  id: number;
  name: string;
  slug: string;
  icon: string;
  status: string;
  cat: number;
}

interface Cat {
  id: number;
  name: string;
  slug: string; // "provider" | "vendor" | "employer"
  subs: SubCat[];
}

const SLUG_TO_PATH: Record<string, string> = {
  provider: "/find-stylist",
  vendor: "/marketplace",
  employer: "/jobs",
};

function subsToDropdown(subs: SubCat[], basePath: string): dropdownTypes[] {
  return subs.map((s) => ({
    title: s.name,
    description: undefined,
    icon: <PercentCircle />,
    href: `${basePath}/${s.slug}`,
  }));
}

// ─── Auth loading skeletons ───────────────────────────────────────────────────

function AuthSkeleton({ mobile = false }: { mobile?: boolean }) {
  if (mobile) {
    return (
      <div className="border-2 rounded-lg border-[#3ad688]/30 inline-flex items-center gap-2 px-3 py-1.5">
        <Skeleton className="h-4 w-10 bg-white/10" />
        <Skeleton className="h-7 w-16 rounded-md bg-[#3ad688]/20" />
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2 rounded-lg border border-[#3ad688]/30 px-2.5 py-1.5">
      <Skeleton className="size-8 rounded-full bg-[#3ad688]/20" />
      <Skeleton className="h-3.5 w-16 hidden sm:block bg-white/10" />
      <Skeleton className="size-3.5 bg-white/10" />
    </div>
  );
}

// ─── Profile dropdown ─────────────────────────────────────────────────────────

function ProfileMenu() {
  const { authUser, authProvider, logout } = UseGen();
  const router = useRouter();

  if (!authUser) return null;

  const name = authUser.full_name || authUser.email;
  const isProvider = authUser.role === "provider";

  function handleLogout() {
    logout();
    router.push("/");
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 rounded-lg border border-[#3ad688] px-2.5 py-1.5 hover:bg-[#ffffff10] transition-colors">
          <Avatar name={name} />
          <span className="text-sm text-white font-medium max-w-[100px] truncate hidden sm:block">
            {name.split(" ")[0]}
          </span>
          <ChevronDown className="size-3.5 text-[#3ad688]" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56 mt-1">
        <DropdownMenuLabel className="flex flex-col gap-0.5">
          <span className="font-semibold text-sm">{name}</span>
          <span className="text-xs text-muted-foreground font-normal truncate">
            {authUser.email}
          </span>
          {isProvider && authProvider && (
            <span className="text-xs text-[#3ad688] font-medium mt-0.5">
              {authProvider.business_name}
            </span>
          )}
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/profile">
            <User className="size-3.5 mr-2" />
            My Profile
          </Link>
        </DropdownMenuItem>

        {isProvider && (
          <DropdownMenuItem asChild>
            <Link href="/dashboard">
              <Store className="size-3.5 mr-2" />
              Provider Dashboard
            </Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="text-destructive focus:text-destructive"
          onClick={handleLogout}
        >
          <LogOut className="size-3.5 mr-2" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// ─── Auth buttons ─────────────────────────────────────────────────────────────

function AuthButtons() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="border-2 rounded-lg border-[#3ad688] flex space-x-2">
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger>
          <Button
            variant="ghost"
            className="text-white font-medium hover:bg-transparent hover:text-muted-foreground"
          >
            Login
          </Button>
        </DialogTrigger>
        <DialogContent>
          <LoginDialog setDialogOpen={setDialogOpen} />
        </DialogContent>
      </Dialog>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger>
          <Button className="text-[#003226] bg-[#3ad688] font-medium">
            Sign up
          </Button>
        </DialogTrigger>
        <DialogContent>
          <RegisterDialog setDialogOpen={setDialogOpen} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────

export default function Header() {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const [showCategories, setShowCategories] = useState(false);
  const [type, setType] = useState<"provider" | "vendor" | "employer" | null>(
    null,
  );
  const showHeader = pathname?.startsWith("/dashboard");
  const hideTimeout = useRef<NodeJS.Timeout | null>(null);
  const { isAuthenticated, authLoading } = UseGen();

  // ── Fetch real categories ─────────────────────────────────────────────────
  const [cats, setCats] = useState<Cat[]>([]);

  useEffect(() => {
    fetch("/api/cats")
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setCats(d.cat);
      })
      .catch(() => {
        /* fall back to empty silently */
      });
  }, []);

  const openCategories = () => {
    if (hideTimeout.current) clearTimeout(hideTimeout.current);
    setShowCategories(true);
  };

  const scheduleClose = () => {
    hideTimeout.current = setTimeout(() => setShowCategories(false), 2000);
  };

  const shouldShowCategories =
    (isMobile && pathname !== "/" && pathname !== "/auth/register") ||
    showCategories;

  const getDropdownData = (): dropdownTypes[] => {
    // While hovering a nav button, use the active type
    const slug =
      type ??
      (pathname.startsWith("/find-stylist")
        ? "provider"
        : pathname.startsWith("/marketplace")
          ? "vendor"
          : pathname.startsWith("/jobs")
            ? "employer"
            : null);
    if (!slug) return [];
    const cat = cats.find((c) => c.slug === slug);
    return cat ? subsToDropdown(cat.subs, SLUG_TO_PATH[slug]) : [];
  };

  const categoryVariants: Variants = {
    hidden: { opacity: 0, y: -12, pointerEvents: "none" },
    visible: {
      opacity: 1,
      y: 0,
      pointerEvents: "auto",
      transition: { duration: 0.25, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -12,
      pointerEvents: "none",
      transition: { duration: 0.2, ease: "easeIn" },
    },
  };

  return (
    <div className={`${showHeader ? "hidden" : ""}`}>
      <header className="relative w-full bg-[#09090b] md:h-[70px] md:py-0 flex flex-col md:flex-row items-center p-5 md:px-[60px]">
        <div className="w-full mx-auto flex justify-between items-center font-semibold text-[#1CAB70]">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold md:w-36 w-28">
            <img src="/Logo.png" className="md:w-36 w-28 rounded-xl" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex justify-between items-center w-full">
            <div className="space-x-10 flex items-center justify-center w-full">
              {(["provider", "vendor", "employer"] as const).map((t) => (
                <Button
                  key={t}
                  variant="ghost"
                  onMouseEnter={() => {
                    openCategories();
                    setType(t);
                  }}
                  onMouseLeave={scheduleClose}
                  className="border border-transparent text-white font-medium hover:bg-[#ffffff15] hover:text-[#3ad688] hover:border-[#3ad688]"
                >
                  {t === "provider"
                    ? "Find Stylist"
                    : t === "vendor"
                      ? "Marketplace"
                      : "Job Seekers"}
                </Button>
              ))}
            </div>

            {/* Desktop auth — skeleton while loading */}
            {authLoading ? (
              <AuthSkeleton />
            ) : isAuthenticated ? (
              <ProfileMenu />
            ) : (
              <AuthButtons />
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger className="md:hidden">
              <Button
                className="bg-[#003226] text-[#3ad688]"
                variant="secondary"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="md:hidden w-screen bg-[#000000dd] border-0">
              <div className="px-4 py-3 flex flex-col gap-2 w-full">
                {(
                  [
                    {
                      slug: "provider",
                      label: "Find Stylist",
                      fallback: "/find-stylist/barbershop",
                    },
                    {
                      slug: "vendor",
                      label: "Marketplace",
                      fallback: "/marketplace/hair-styling-accessories",
                    },
                    {
                      slug: "employer",
                      label: "Job Seekers",
                      fallback: "/jobs/wigs-and-extensions",
                    },
                  ] as const
                ).map(({ slug, label, fallback }) => {
                  const cat = cats.find((c) => c.slug === slug);
                  const href =
                    cat && cat.subs.length > 0
                      ? `${SLUG_TO_PATH[slug]}/${cat.subs[0].slug}`
                      : fallback;
                  return (
                    <Link key={slug} href={href}>
                      <Button
                        variant="ghost"
                        onClick={() => setIsOpen(false)}
                        className="text-white w-full font-medium"
                      >
                        {label}
                      </Button>
                    </Link>
                  );
                })}

                {/* Mobile auth — skeleton while loading */}
                <div className="mt-6 self-center">
                  {authLoading ? (
                    <AuthSkeleton mobile />
                  ) : isAuthenticated ? (
                    <ProfileMenu />
                  ) : (
                    <div className="border-2 rounded-lg border-[#3ad688] inline-flex space-x-2">
                      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                        <DialogTrigger>
                          <Button
                            variant="ghost"
                            className="text-white font-medium hover:bg-transparent hover:text-muted-foreground"
                          >
                            Login
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <LoginDialog setDialogOpen={setDialogOpen} />
                        </DialogContent>
                      </Dialog>
                      <Link href="/auth/register">
                        <Button className="text-[#003226] bg-[#3ad688] font-medium">
                          Sign up
                        </Button>
                      </Link>
                    </div>
                  )}
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
              className="hidden md:flex md:absolute md:top-full left-0 md:z-9999 w-full justify-center md:rounded-2xl"
            >
              <Dropdown data={getDropdownData()} />
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {pathname !== "/" && <SearchFilters />}
      {isMobile && pathname !== "/" && (
        <div className="flex md:hidden">
          <Dropdown data={getDropdownData()} />
        </div>
      )}
    </div>
  );
}

// ─── Bottom Tabs ──────────────────────────────────────────────────────────────

export function BottomTabs() {
  const { isAuthenticated, authUser } = UseGen();
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <nav className="w-full bg-zinc-800 px-5 py-2 flex justify-between">
      <Link href="/find-stylist/aesthetics">
        <Button variant="ghost" className="flex flex-col h-fit text-tertiary-c">
          <Search />
          Find Stylist
        </Button>
      </Link>
      <Link href="/marketplace/hair-styling-accessories">
        <Button variant="ghost" className="flex flex-col h-fit text-tertiary-c">
          <Store />
          Marketplace
        </Button>
      </Link>
      <Link href="/jobs/wigs-and-extensions">
        <Button variant="ghost" className="flex flex-col h-fit text-tertiary-c">
          <BriefcaseBusiness />
          Jobs
        </Button>
      </Link>

      {isAuthenticated && authUser ? (
        <Link href="/profile">
          <Button
            variant="ghost"
            className="flex flex-col h-fit text-tertiary-c"
          >
            <div className="size-6 rounded-full bg-[#3ad688] text-[#003226] text-[9px] font-bold flex items-center justify-center">
              {getInitials(authUser.full_name || authUser.email)}
            </div>
            Profile
          </Button>
        </Link>
      ) : (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger>
            <Button
              variant="ghost"
              className="flex flex-col h-fit text-tertiary-c"
            >
              <User />
              Login
            </Button>
          </DialogTrigger>
          <DialogContent>
            <LoginDialog setDialogOpen={setDialogOpen} />
          </DialogContent>
        </Dialog>
      )}
    </nav>
  );
}
