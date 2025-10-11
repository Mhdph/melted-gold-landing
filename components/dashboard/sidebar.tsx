"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
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
import { cn } from "@/lib/utils";

const menuItems = [
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
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 right-4 z-50 lg:hidden text-gold hover:bg-gold/10"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed right-0 top-0 h-screen w-64 bg-[#fdf4e0] border-l border-gold/20 z-40 transition-transform duration-300 flex flex-col",
          isOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        )}
        dir="rtl"
      >
        {/* Logo */}
        <div className="p-6 border-b border-gold/20">
          <Link
            href="/"
            className="flex items-center gap-3"
            onClick={() => setIsOpen(false)}
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-accent flex items-center justify-center">
              <span className="text-navy font-bold text-2xl">ط</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gold">طلای آب‌شده</h1>
              <p className="text-xs text-cream/60">پنل کاربری</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                  isActive
                    ? "bg-gold/10 text-gold border border-gold/30"
                    : "text-cream hover:bg-gold/5 hover:text-gold"
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.title}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-gold/20">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-gold/5 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-accent flex items-center justify-center">
              <span className="text-navy font-bold">ک</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-cream">کاربر عزیز</p>
              <p className="text-xs text-cream/60">09123456789</p>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full border-gold/30 text-gold hover:bg-gold/10 bg-transparent"
            onClick={() => setIsOpen(false)}
          >
            <LogOut className="ml-2 h-4 w-4" />
            خروج از حساب
          </Button>
        </div>
      </aside>
    </>
  );
}
