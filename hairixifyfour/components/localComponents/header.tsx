"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { BriefcaseBusiness, Menu, Search, Store, User, X } from "lucide-react";

export default function Header() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full bg-foreground py-5 ox-2 md:px-10">
      <div className="w-full mx-auto flex justify-between items-center font-semibold text-[#1CAB70]">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          <img src={"/Logo.png"} className="w-40 rounded-xl" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-4">
          <Link href="/find-talent">
            <Button className="bg-[#003226] text-[#1CAB70] font-medium">
              Find Stylist
            </Button>
          </Link>
          <Link href="/find-talent">
            <Button className="bg-[#003226] text-[#1CAB70] font-medium">
              Marketplace
            </Button>
          </Link>
          <Link href="/find-recruiters">
            <Button className="bg-[#003226] text-[#1CAB70] font-medium">
              Job Seekers
            </Button>
          </Link>
          <Link href="/auth">
            <Button className="text-[#003226] bg-[#1CAB70] font-semibold">
              Login / SIgn up
            </Button>
          </Link>
        </nav>

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
        <div className="md:hidden px-4 py-3 flex flex-col gap-2">
          <Link href="/find-talent">
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
              className="text-[#003226] w-full bg-[#1CAB70] font-semibold"
            >
              Login / SIgn up
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
}
export function BottomTabs() {
  const router = useRouter();

  return (
    <nav className="w-full bg-foreground px-5 py-2 flex justify-between">
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
