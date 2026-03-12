"use client";
import { AppSidebar } from "@/components/localComponents/AppSidebar";
import { DashboardSkeleton } from "@/components/screenComponents/Dashboard/skeleton";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { UseGen } from "@/context/GeneralContext";
import { GetAuthProvider } from "@/utils/user";
import { useRouter } from "next/navigation";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { toast } from "sonner";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setAuthProvider } = UseGen();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function validateProvider() {
    try {
      const response = await GetAuthProvider();
      if (response.success && response.user) {
        setAuthProvider(response.user);
      } else {
        toast.message("Unauthorized");
        router.push("/");
      }
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    validateProvider();
  }, []);

  if (loading) {
    return <DashboardSkeleton />;
  }

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
