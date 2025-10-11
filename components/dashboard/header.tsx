"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LogOut, User } from "lucide-react"

export function DashboardHeader() {
  return (
    <header className="border-b border-gold/20 bg-navy/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-accent flex items-center justify-center">
            <span className="text-navy font-bold text-xl">ط</span>
          </div>
          <span className="text-xl font-bold text-gold">طلای آب‌شده</span>
        </Link>

        <nav className="flex items-center gap-4">
          <Button variant="ghost" className="text-cream hover:text-gold">
            <User className="ml-2 h-4 w-4" />
            حساب کاربری
          </Button>
          <Button variant="outline" className="border-gold/30 text-gold hover:bg-gold/10 bg-transparent">
            <LogOut className="ml-2 h-4 w-4" />
            خروج
          </Button>
        </nav>
      </div>
    </header>
  )
}
