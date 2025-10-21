"use client";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { FileText, Activity, TrendingDown, TrendingUp } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const mobileNavItems = [
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
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden px-8 pb-4">
      <div className="bg-slate-800 backdrop-blur-xl border border-gold/30 rounded-3xl shadow-2xl shadow-gold/10">
        <div className="flex items-center justify-around py-2 px-6">
          {mobileNavItems.map((item) => (
            <Link
              href={item.href}
              className={cn(
                "flex items-center flex-col justify-center rounded-full p-2  transition-all duration-300 relative",
                pathname === item.href
                  ? "bg-[#d8c070] hover:bg-[#BFA67A] text-gold shadow-lg shadow-gold/20 scale-105"
                  : "text-[#F6F5EE] hover:bg-yellow-500/10 hover:scale-105 active:scale-95"
              )}
            >
              {/* {pathname === item.href && (
                      <div className="absolute -top-1 w-1.5 h-1.5 bg-yellow-500 rounded-full shadow-lg shadow-yellow-500/50" />
                    )} */}
              <item.icon
                className={cn(
                  "size-4  transition-transform duration-300",
                  pathname === item.href ? "text-gold" : "text-[#D7B46A]"
                )}
              />
              <p className="text-[10px] font-medium">{item.title}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
