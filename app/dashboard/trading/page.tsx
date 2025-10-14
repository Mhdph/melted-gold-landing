"use client";

import type React from "react";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  Weight,
  DollarSign,
} from "lucide-react";
import PageTitle from "@/components/page-title";
import { TradingDrawer } from "@/components/trading-drawer";

type Trade = {
  id: string;
  date: string;
  type: "خرید" | "فروش";
  amount: number;
  pricePerGram: number;
  totalValue: number;
  status: "تکمیل شده" | "در انتظار";
};

export default function TradingPage() {
  const [currentPrice] = useState(2500000);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerType, setDrawerType] = useState<"buy" | "sell">("buy");
  const [trades, setTrades] = useState<Trade[]>([
    {
      id: "1",
      date: "1403/10/15 - 14:30",
      type: "خرید",
      amount: 10,
      pricePerGram: 2500000,
      totalValue: 25000000,
      status: "تکمیل شده",
    },
    {
      id: "2",
      date: "1403/10/13 - 16:45",
      type: "فروش",
      amount: 5,
      pricePerGram: 2450000,
      totalValue: 12250000,
      status: "تکمیل شده",
    },
  ]);

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
      <div className="flex-1 ">
        <main className="container mx-auto px-4 py-8 space-y-6">
          {/* Page Header */}
          <PageTitle
            title="معاملات طلا"
            description="خرید و فروش طلا با قیمت لحظه‌ای"
          />

          {/* Current Price Display */}
          {/* <Card className="bg-gradient-to-br from-gold/20 to-accent/20 border-gold/30">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                    <TrendingUp className="h-8 w-8 text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-cream/80">قیمت خرید (هر گرم)</p>
                    <p className="text-3xl font-bold text-green-400">
                      {currentPrice.toLocaleString("fa-IR")}
                    </p>
                    <p className="text-xs text-cream/60">ریال</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
                    <TrendingDown className="h-8 w-8 text-red-400" />
                  </div>
                  <div>
                    <p className="text-sm text-cream/80">قیمت فروش (هر گرم)</p>
                    <p className="text-3xl font-bold text-red-400">
                      {(currentPrice - 50000).toLocaleString("fa-IR")}
                    </p>
                    <p className="text-xs text-cream/60">ریال</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card> */}

          {/* Quick Trade Section */}
          <Card className=" border-gold/20">
            <CardHeader>
              <CardTitle className="text-gold">معامله سریع</CardTitle>
              <CardDescription className="text-cream/60">
                خرید یا فروش فوری طلا
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Buy Button */}
                <Button
                  onClick={() => handleOpenDrawer("buy")}
                  className="h-20 bg-[#F6F5EE] flex flex-col hover:bg-zinc-100  text-green-500 "
                >
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-8 w-8 text-green-400" />
                    <p className="font-bold text-center text-base">بخرید</p>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <p className="text-sm text-cream/80">مظنه خرید</p>
                    <p className="text-xl font-semibold ">
                      {currentPrice.toLocaleString("fa-IR")}
                    </p>
                  </div>
                </Button>

                {/* Sell Button */}
                <Button
                  onClick={() => handleOpenDrawer("sell")}
                  className="h-20 bg-[#F6F5EE] flex flex-col hover:bg-zinc-100 transition-all duration-200 text-red-500"
                >
                  <div className="flex items-center gap-2">
                    <TrendingDown className="h-8 w-8" />
                    <p className="font-bold text-center text-base">بفروشید</p>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <p className="text-sm text-cream/80">مظنه فروش</p>
                    <p className="text-xl font-semibold ">
                      {(currentPrice - 50000).toLocaleString("fa-IR")}
                    </p>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Trade History */}
          <Card className=" border-gold/20">
            <CardHeader>
              <CardTitle className="text-gold">تاریخچه معاملات</CardTitle>
              <CardDescription className="text-cream/60">
                مشاهده معاملات انجام شده
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {trades.map((trade) => (
                  <div
                    key={trade.id}
                    className="p-4 rounded-lg bg-navy border border-gold/20 hover:border-gold/40 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-10 h-10 hidden  rounded-lg md:flex items-center justify-center flex-shrink-0 ${
                            trade.type === "خرید"
                              ? "bg-green-500/10"
                              : "bg-red-500/10"
                          }`}
                        >
                          {trade.type === "خرید" ? (
                            <TrendingUp className="h-5 w-5 text-green-400" />
                          ) : (
                            <TrendingDown className="h-5 w-5 text-red-400" />
                          )}
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={
                                trade.type === "خرید"
                                  ? "default"
                                  : "destructive"
                              }
                              className={
                                trade.type === "خرید"
                                  ? "bg-green-500/20 text-green-400 border-green-500/30"
                                  : "bg-red-500/20 text-red-400 border-red-500/30"
                              }
                            >
                              {trade.type}
                            </Badge>
                            <Badge
                              variant={
                                trade.status === "تکمیل شده"
                                  ? "default"
                                  : "secondary"
                              }
                              className={
                                trade.status === "تکمیل شده"
                                  ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                                  : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                              }
                            >
                              {trade.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-cream/60">
                            <div className="flex items-center gap-1">
                              <Weight className="h-4 w-4 hidden md:inline" />
                              <span>
                                {trade.amount.toLocaleString("fa-IR")} گرم
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <DollarSign className="h-4 w-4 hidden md:inline" />
                              <span>
                                {trade.pricePerGram.toLocaleString("fa-IR")}{" "}
                                ریال/گرم
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4 hidden md:inline" />
                              <span>{trade.date}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-left md:text-right">
                        <p className="text-lg font-bold text-gold">
                          {trade.totalValue.toLocaleString("fa-IR")} ریال
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
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
