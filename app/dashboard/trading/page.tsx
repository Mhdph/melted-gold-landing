"use client";

import { useState } from "react";
import PageTitle from "@/components/page-title";
import { TradingDrawer } from "@/components/trading-drawer";
import QuickTradeButtons from "@/components/pages/trading/quick-trade-buttons";
import TradeHistoryList from "@/components/pages/trading/trade-history-list";
import { Trade } from "@/components/pages/trading/types";
import { sampleTrades } from "@/components/pages/trading/utils";

export default function TradingPage() {
  const [currentPrice] = useState(2500000);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerType, setDrawerType] = useState<"buy" | "sell">("buy");
  const [trades, setTrades] = useState<Trade[]>(sampleTrades);

  const handleOpenDrawer = (type: "buy" | "sell") => {
    setDrawerType(type);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  const handleTradeComplete = (newTrade: Trade) => {
    setTrades([newTrade, ...trades]);
  };

  return (
    <div className="min-h-screen bg-[#F6F5EE] flex" dir="rtl">
      <div className="flex-1">
        <main className="container mx-auto px-4 py-8 space-y-6">
          {/* Page Header */}
          <PageTitle
            title="معاملات طلا"
            description="خرید و فروش طلا با قیمت لحظه‌ای"
          />

          {/* Quick Trade Section */}
          <QuickTradeButtons
            currentPrice={currentPrice}
            onBuyClick={() => handleOpenDrawer("buy")}
            onSellClick={() => handleOpenDrawer("sell")}
          />

          {/* Trade History */}
          <TradeHistoryList trades={trades} />
        </main>
      </div>

      {/* Trading Drawer */}
      <TradingDrawer
        isOpen={drawerOpen}
        onClose={handleCloseDrawer}
        type={drawerType}
        currentPrice={currentPrice}
        onTradeComplete={handleTradeComplete}
      />
    </div>
  );
}
