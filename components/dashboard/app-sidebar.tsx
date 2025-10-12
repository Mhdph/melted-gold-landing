"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  TrendingUp,
  Menu,
  X,
  LogOut,
  FileText,
  Activity,
  TrendingDown,
  Info,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import logo from "@/assets/images/zavran-dark.png";
import Image from "next/image";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Building Your Application",
      url: "#",
      items: [
        {
          title: "داشبورد",
          icon: LayoutDashboard,
          href: "/dashboard",
        },
        {
          title: "ثبت حواله",
          icon: FileText,
          href: "/dashboard/remittance",
        },
        {
          title: "گردش حساب",
          icon: Activity,
          href: "/dashboard/account-activity",
        },
        {
          title: "تغییرات قیمت",
          icon: TrendingDown,
          href: "/dashboard/price-changes",
        },
        {
          title: "معاملات",
          icon: TrendingUp,
          href: "/dashboard/trading",
        },
        {
          title: "درباره ما",
          icon: Info,
          href: "/dashboard/about",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar dir="rtl" {...props}>
      <SidebarContent className="bg-[#000e1f] text-white">
        <SidebarHeader>
          <div className="p-6 ">
            <Link href="/" className="flex items-center gap-3">
              <Image src={logo} alt="logo" width={200} height={200} />
            </Link>
          </div>
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.items?.length ? (
                    <SidebarMenuSub className="gap-1.5 px-0">
                      {item.items.map((item) => (
                        <SidebarMenuSubItem className="" key={item.title}>
                          <SidebarMenuSubButton
                            className="text-[#F6F5EE] h-9"
                            asChild
                            isActive={pathname === item.href}
                          >
                            <a href={item.href}>
                              <item.icon
                                className={cn(
                                  pathname === item.href
                                    ? "size-5 !text-slate-900"
                                    : "size-5 !text-[#D7B46A] "
                                )}
                              />
                              {item.title}
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  ) : null}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
