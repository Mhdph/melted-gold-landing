"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TrendingDown, TrendingUp, Clock } from "lucide-react";
import PageTitle from "@/components/page-title";

type PriceRecord = {
  time: string;
  buyPrice: number;
  sellPrice: number;
  change: number;
};

export default function PriceChangesPage() {
  const [timeRange, setTimeRange] = useState<"today" | "7days" | "30days">(
    "today"
  );
  const [priceData, setPriceData] = useState<PriceRecord[]>([]);

  useEffect(() => {
    // Generate mock price data
    const generatePriceData = () => {
      const data: PriceRecord[] = [];
      const basePrice = 2500000;
      const now = new Date();

      const count = timeRange === "today" ? 24 : timeRange === "7days" ? 7 : 30;

      for (let i = count - 1; i >= 0; i--) {
        const variation = (Math.random() - 0.5) * 100000;
        const buyPrice = basePrice + variation;
        const sellPrice = buyPrice - 50000;
        const change = (Math.random() - 0.5) * 5;

        let timeLabel = "";
        if (timeRange === "today") {
          const hour = now.getHours() - i;
          timeLabel = `${hour >= 0 ? hour : 24 + hour}:00`;
        } else {
          const date = new Date(now);
          date.setDate(date.getDate() - i);
          timeLabel = date.toLocaleDateString("fa-IR", {
            month: "numeric",
            day: "numeric",
          });
        }

        data.push({
          time: timeLabel,
          buyPrice: Math.round(buyPrice),
          sellPrice: Math.round(sellPrice),
          change: Number.parseFloat(change.toFixed(2)),
        });
      }

      return data;
    };

    setPriceData(generatePriceData());
  }, [timeRange]);

  return (
    <div className="min-h-screen bg-navy flex" dir="rtl">
      <div className="flex-1 ">
        <main className="container mx-auto px-4 py-8 space-y-6">
          {/* Page Header */}

          <PageTitle
            title="تغییرات قیمت طلا"
            description="نمایش تغییرات قیمت خرید و فروش طلا"
          />
          {/* Current Price Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className=" border-green-500/20">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-cream/60">قیمت خرید (هر گرم)</p>
                    <p className="text-2xl font-bold text-green-400 mt-1">
                      {priceData[priceData.length - 1]?.buyPrice.toLocaleString(
                        "fa-IR"
                      )}{" "}
                      ریال
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className=" border-red-500/20">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-cream/60">قیمت فروش (هر گرم)</p>
                    <p className="text-2xl font-bold text-red-400 mt-1">
                      {priceData[
                        priceData.length - 1
                      ]?.sellPrice.toLocaleString("fa-IR")}{" "}
                      ریال
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
                    <TrendingDown className="h-6 w-6 text-red-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Price Changes Table */}
          <Card className="overflow-x-scroll w-96 lg:w-full border-gold/20">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle className="text-gold">جدول تغییرات قیمت</CardTitle>
                  <CardDescription className="text-cream/60">
                    نمایش تغییرات قیمت در بازه زمانی انتخابی
                  </CardDescription>
                </div>

                <Select
                  value={timeRange}
                  onValueChange={(value: any) => setTimeRange(value)}
                >
                  <SelectTrigger className="w-[180px] bg-navy border-gold/30 text-cream">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">نمایش امروز</SelectItem>
                    <SelectItem value="7days">۷ روز اخیر</SelectItem>
                    <SelectItem value="30days">۳۰ روز اخیر</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gold/20">
                      <th className="text-right py-3 px-4 text-gold font-semibold">
                        زمان
                      </th>
                      <th className="text-right py-3 px-4 text-gold font-semibold">
                        قیمت خرید
                      </th>
                      <th className="text-right py-3 px-4 text-gold font-semibold">
                        قیمت فروش
                      </th>
                      <th className="text-right py-3 px-4 text-gold font-semibold">
                        تغییرات (%)
                      </th>
                      <th className="text-right py-3 px-4 text-gold font-semibold">
                        نمودار
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {priceData.map((record, index) => (
                      <tr
                        key={index}
                        className="border-b border-gold/10 hover:bg-gold/5 transition-colors"
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2 text-cream">
                            <Clock className="h-4 w-4 text-cream/60" />
                            <span>{record.time}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-green-400 font-medium">
                          {record.buyPrice.toLocaleString("fa-IR")} ریال
                        </td>
                        <td className="py-3 px-4 text-red-400 font-medium">
                          {record.sellPrice.toLocaleString("fa-IR")} ریال
                        </td>
                        <td className="py-3 px-4">
                          <div
                            className={`flex items-center gap-1 ${
                              record.change >= 0
                                ? "text-green-400"
                                : "text-red-400"
                            }`}
                          >
                            {record.change >= 0 ? (
                              <TrendingUp className="h-4 w-4" />
                            ) : (
                              <TrendingDown className="h-4 w-4" />
                            )}
                            <span className="font-bold">
                              {record.change >= 0 ? "+" : ""}
                              {record.change.toLocaleString("fa-IR")}%
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1 h-8">
                            {Array.from({ length: 10 }).map((_, i) => {
                              const height =
                                Math.abs(record.change) * 10 +
                                Math.random() * 20;
                              return (
                                <div
                                  key={i}
                                  className={`w-1 rounded-full ${
                                    record.change >= 0
                                      ? "bg-green-400/50"
                                      : "bg-red-400/50"
                                  }`}
                                  style={{
                                    height: `${Math.min(height, 100)}%`,
                                  }}
                                />
                              );
                            })}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
