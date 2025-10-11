"use client";

import { useState } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { PriceChart } from "@/components/dashboard/price-chart";
import { TradingPanel } from "@/components/dashboard/trading-panel";
import { Portfolio } from "@/components/dashboard/portfolio";
import { TransactionHistory } from "@/components/dashboard/transaction-history";
import { LivePriceTicker } from "@/components/dashboard/live-price-ticker";

export default function DashboardPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleTradeComplete = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-[#c7b99a]  flex" dir="rtl">
      <Sidebar />

      <div className="flex-1 lg:mr-64">
        <LivePriceTicker />

        <main className="container mx-auto px-4 py-8 space-y-6">
          {/* Price Chart */}
          <PriceChart />

          {/* Trading and Portfolio Grid */}
          <div className="grid  grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 ">
              <TradingPanel onTradeComplete={handleTradeComplete} />
            </div>
            <div>
              <Portfolio key={refreshKey} />
            </div>
          </div>

          {/* Transaction History */}
          <TransactionHistory key={refreshKey} />
        </main>
      </div>
    </div>
  );
}
