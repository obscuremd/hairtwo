"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Calendar,
  CreditCard,
  Users,
  Package,
  Megaphone,
  Gift,
  BarChart3,
  UsersRound,
  BookOpen,
  LogOut,
  Home,
  DollarSignIcon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export function AppSidebar() {
  return (
    <TooltipProvider delayDuration={0}>
      <Sidebar className="bg-black border-r border-neutral-800 w-64 md:w-16">
        <SidebarContent className="flex h-full flex-col bg-black">
          {/* ---------- HEADER ---------- */}
          <SidebarHeader className="flex items-center justify-center md:justify-center px-4 py-6 ">
            <TooltipWrapper label="Account">
              <Link
                href={"/dashboard/account"}
                className="flex items-center gap-3 md:gap-0"
              >
                <Image
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
                  alt="User avatar"
                  width={36}
                  height={36}
                  className="rounded-lg"
                />
                <div className="md:hidden leading-tight">
                  <p className="text-sm font-medium text-white">Shadcn</p>
                  <p className="text-xs text-neutral-500">m@example.com</p>
                </div>
              </Link>
            </TooltipWrapper>
          </SidebarHeader>
          <div className="bg-white/30 h-[0.2px] w-[70%] self-center" />

          {/* ---------- MAIN NAV ---------- */}
          <div className="flex-1 flex items-center justify-center">
            <SidebarMenu className="flex flex-col gap-2 px-2">
              <NavItem href="/dashboard/" icon={Home} label="Home" />
              <NavItem
                href="/dashboard/appointments"
                icon={Calendar}
                label="Appointments"
              />
              <NavItem
                href="/dashboard/transactions"
                icon={DollarSignIcon}
                label="Transactions"
              />
              <NavItem href="/dashboard/clients" icon={Users} label="Clients" />

              <NavItem
                href="/dashboard/staff"
                icon={UsersRound}
                label="Staff Management"
              />
            </SidebarMenu>
          </div>
          <div className="bg-white/30 h-[0.2px] w-[70%] self-center" />

          {/* ---------- FOOTER ---------- */}
          <SidebarFooter className="px-2 py-4 space-y-2">
            <NavItem
              href="/dashboard/resources"
              icon={BookOpen}
              label="Resources"
            />
            <NavItem href="/logout" icon={LogOut} label="Log out" danger />
          </SidebarFooter>
        </SidebarContent>
      </Sidebar>
    </TooltipProvider>
  );
}

/* ----------------------------------------
 * Nav Item
 * -------------------------------------- */

function NavItem({
  href,
  icon: Icon,
  label,
  danger,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  danger?: boolean;
}) {
  const content = (
    <SidebarMenuButton
      asChild
      className={cn(
        "h-10 px-3 rounded-lg flex items-center gap-3 transition-colors",
        "text-neutral-400 hover:bg-neutral-900 hover:text-white",
        danger && "text-red-500 hover:text-red-500 hover:bg-red-500/10",
        "md:justify-center md:px-0",
      )}
    >
      <Link href={href}>
        <Icon className="h-5 w-5 shrink-0" />
        <span className="md:hidden text-sm">{label}</span>
      </Link>
    </SidebarMenuButton>
  );

  return (
    <SidebarMenuItem>
      {/* Desktop → tooltip, Mobile → full label */}
      <div className="hidden md:block">
        <Tooltip>
          <TooltipTrigger asChild>{content}</TooltipTrigger>
          <TooltipContent side="right" className="text-sm">
            {label}
          </TooltipContent>
        </Tooltip>
      </div>

      <div className="md:hidden">{content}</div>
    </SidebarMenuItem>
  );
}

/* ----------------------------------------
 * Tooltip Wrapper for header avatar
 * -------------------------------------- */

function TooltipWrapper({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <>
      <div className="hidden md:block">
        <Tooltip>
          <TooltipTrigger asChild>{children}</TooltipTrigger>
          <TooltipContent side="right">{label}</TooltipContent>
        </Tooltip>
      </div>
      <div className="md:hidden">{children}</div>
    </>
  );
}
