"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, TrendingUp, Package } from "lucide-react";

export function Portfolio() {
  const portfolio = {
    totalGrams: 125.5,
    totalValue: 357675000,
    profit: 12500000,
    profitPercent: 3.6,
  };

  return (
    <Card className="bg-[#fdf4e0] border border-[#dcd3bc]">
      <CardHeader>
        <CardTitle className="text-gold text-xl">پرتفوی من</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-gradient-to-br from-gold/10 to-transparent rounded-lg border border-gold/30">
          <div className="flex items-center gap-2 mb-2">
            <Package className="h-5 w-5 text-gold" />
            <span className="text-cream/70 text-sm">موجودی طلا</span>
          </div>
          <p className="text-3xl font-bold text-gold">
            {portfolio.totalGrams.toLocaleString("fa-IR")} گرم
          </p>
        </div>

        <div className="p-4 bg-navy/80 rounded-lg border border-gold/20">
          <div className="flex items-center gap-2 mb-2">
            <Wallet className="h-5 w-5 text-gold" />
            <span className="text-cream/70 text-sm">ارزش کل</span>
          </div>
          <p className="text-2xl font-bold text-cream">
            {portfolio.totalValue.toLocaleString("fa-IR")} تومان
          </p>
        </div>

        <div className="p-4 bg-green-600/10 rounded-lg border border-green-600/30">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-5 w-5 text-green-400" />
            <span className="text-cream/70 text-sm">سود</span>
          </div>
          <p className="text-xl font-bold text-green-400">
            {portfolio.profit.toLocaleString("fa-IR")} تومان
          </p>
          <p className="text-sm text-green-400/70 mt-1">
            +{portfolio.profitPercent.toLocaleString("fa-IR")}%
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
