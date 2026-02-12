import { AppSidebar } from "@/components/localComponents/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React, { PropsWithChildren } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider className="relative w-full flex ">
      <div className=" md:w-20">
        <AppSidebar />
      </div>
      <div className="md:hidden absolute z-10">
        <SidebarTrigger />
      </div>
      <div className="p-5 md:py-10 md:px-5 w-full">{children}</div>
    </SidebarProvider>
  );
}
