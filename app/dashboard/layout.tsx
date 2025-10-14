import { AppSidebar } from "@/components/dashboard/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import type React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar side="right" />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center text-[#000e1f] bg-[#F6F5EE] gap-2 border-b px-4">
          {/* <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink className="text-[#000e1f]" href="#">
                  ثبت حواله
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-[#000e1f]">
                  داشبورد
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb> */}
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
