"use client";

import { AppSidebar } from "@/components/dashboard/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import type React from "react";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
    }
  }, [router]);
  return (
    <SidebarProvider>
      <AppSidebar side="right" />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center text-[#000e1f] bg-[#F6F5EE] gap-2 border-b px-4">
          <SidebarTrigger className="-mr-1 ml-auto rotate-180" />
        </header>
        <div
          dir="rtl"
          className="flex flex-1 bg-[#F6F5EE]   flex-col gap-4 p-4"
        >
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
