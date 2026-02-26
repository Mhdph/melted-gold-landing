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
  SmartphoneIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import logo from "@/assets/images/zavran-dark.png";
import Image from "next/image";
import InstallPWA from "../install-pwa";
import { useState, useEffect } from "react";

// Navigation data
const getNavigationData = (isAdmin: boolean) => ({
  navMain: [
    {
      title: "Building Your Application",
      url: "#",
      items: [
        {
          title: "معاملات",
          icon: TrendingUp,
          href: "/dashboard/trading",
        },
        {
          title: "ثبت حواله",
          icon: FileText,
          href: "/dashboard/remittance",
        },
        {
          title: "تغییرات قیمت",
          icon: TrendingDown,
          href: "/dashboard/price-changes",
        },

        {
          title: "درباره ما",
          icon: Info,
          href: "/dashboard/about",
        },
        // Admin-only pages
        ...(isAdmin
          ? [
              {
                title: "مدیریت کاربران",
                icon: LayoutDashboard,
                href: "/dashboard/admin/users",
              },
              {
                title: "مدیریت تراکنش‌ها",
                icon: Activity,
                href: "/dashboard/admin/transactions",
              },
              {
                title: "مدیریت مظنه",
                icon: Activity,
                href: "/dashboard/admin/settings",
              },
              {
                title: "مدیریت حواله ها",
                icon: Activity,
                href: "/dashboard/admin/transfers",
              },
              {
                title: "مدیریت محصولات",
                icon: Activity,
                href: "/dashboard/admin/products",
              },
            ]
          : []),
      ],
    },
  ],
});

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const [isInstallPWA, setIsInstallPWA] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check localStorage for admin role
    const checkAdminRole = () => {
      if (typeof window !== "undefined") {
        const role = localStorage.getItem("role");
        setIsAdmin(role === "admin");
      }
    };

    checkAdminRole();

    // Listen for storage changes (in case role changes in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "role") {
        setIsAdmin(e.newValue === "admin");
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const data = getNavigationData(isAdmin);

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
                            className="text-[#F6F5EE]  h-9"
                            asChild
                            isActive={pathname === item.href}
                          >
                            <a href={item.href}>
                              <item.icon
                                className={cn(
                                  pathname === item.href
                                    ? "size-5 !text-slate-900"
                                    : "size-5 !text-[#D7B46A] ",
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
              <SidebarMenuSubItem
                className="px-3.5 py-1"
                onClick={() => setIsInstallPWA(true)}
              >
                <SidebarMenuSubButton className="text-[#F6F5EE]  h-9 cursor-pointer">
                  <SmartphoneIcon className="size-5 !text-[#D7B46A]" />
                  نصب برنامه
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
              {isInstallPWA && <InstallPWA setIsInstallPWA={setIsInstallPWA} />}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
