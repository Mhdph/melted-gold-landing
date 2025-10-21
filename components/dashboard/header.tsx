"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Sidebar } from "./sidebar";
import { SidebarTrigger } from "../ui/sidebar";
import Image from "next/image";
import logo from "@/assets/images/zavran-dark.png";

export function DashboardHeader() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("fa-IR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("fa-IR", {
      weekday: "long",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  };

  return (
    <div className="bg-[#000e1f]  text-white">
      {/* Main Header */}
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left - Status */}
        <SidebarTrigger className="col-span-1" />

        {/* Center - Logo and Brand */}

        <Image
          src={logo}
          alt="logo"
          width={80}
          height={80}
          className="mr-5 md:hidden"
        />

        {/* Right - Menu */}
        <div className="flex items-center gap-2 col-span-1">
          <span className="text-gray-300 text-xs font-normal">مدیر آفلاین</span>
          <div className="bg-gray-300 rounded-full p-[2px]">
            <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Date/Time Bar */}
      <div className="bg-gray-200 border-t border-gray-300 px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="text-gray-700 text-sm font-medium">
            {formatDate(currentTime)}
          </div>
          <div className="text-gray-700 text-sm font-medium">
            {formatTime(currentTime)}
          </div>
        </div>
      </div>
    </div>
  );
}
