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
import {
  TrendingDown,
  TrendingUp,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import PageTitle from "@/components/page-title";
import { useGetPrices, PriceData } from "@/services/price-service";

type PriceRecord = {
  time: string;
  buyPrice: number;
  sellPrice: number;
  change: number;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("fa-IR", {
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function PriceChangesPage() {
  const [timeRange, setTimeRange] = useState<"today" | "7days" | "30days">(
    "today"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const {
    data: pricesResponse,
    isLoading,
    error,
  } = useGetPrices(currentPage, pageSize);

  const priceData = pricesResponse?.data || [];
  const meta = pricesResponse?.meta;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1); // Reset to first page when changing page size
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F6F5EE] flex items-center justify-center">
        <div className="text-gold">در حال بارگذاری...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F6F5EE] flex items-center justify-center">
        <div className="text-red-400">خطا در بارگذاری داده‌ها</div>
      </div>
    );
  }

  console.log(meta);

  return (
    <div className="min-h-screen bg-[#F6F5EE] flex" dir="rtl">
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
                      {priceData[0]?.buy.toLocaleString("fa-IR")} ریال
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
                      {priceData[0]?.sell.toLocaleString("fa-IR")} ریال
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
                    {priceData.map((record, index) => {
                      const change = parseFloat(record.percentageChange);
                      return (
                        <tr
                          key={index}
                          className="border-b border-gold/10 hover:bg-gold/5 transition-colors"
                        >
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2 text-cream">
                              <Clock className="h-4 w-4 text-cream/60" />
                              <span>{formatDate(record.createdAt)}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-green-400 font-medium">
                            {record.buy.toLocaleString("fa-IR")} ریال
                          </td>
                          <td className="py-3 px-4 text-red-400 font-medium">
                            {record.sell.toLocaleString("fa-IR")} ریال
                          </td>
                          <td className="py-3 px-4">
                            <div
                              className={`flex items-center gap-1 ${
                                change >= 0 ? "text-green-400" : "text-red-400"
                              }`}
                            >
                              {change >= 0 ? (
                                <TrendingUp className="h-4 w-4" />
                              ) : (
                                <TrendingDown className="h-4 w-4" />
                              )}
                              <span className="font-bold">
                                {change >= 0 ? "+" : ""}
                                {change.toLocaleString("fa-IR")}%
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-1 h-8">
                              {Array.from({ length: 10 }).map((_, i) => {
                                const height =
                                  Math.abs(change) * 10 + Math.random() * 20;
                                return (
                                  <div
                                    key={i}
                                    className={`w-1 rounded-full ${
                                      change >= 0
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
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>

            {/* Pagination Controls */}
            {meta && (
              <div className="flex items-center justify-between px-6 py-4 border-t border-gold/20">
                <div className="flex items-center gap-2 text-cream/60 text-sm">
                  <span>نمایش</span>
                  <Select
                    value={pageSize.toString()}
                    onValueChange={(value) =>
                      handlePageSizeChange(parseInt(value))
                    }
                  >
                    <SelectTrigger className="w-20 bg-navy border-gold/30 text-cream">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                    </SelectContent>
                  </Select>
                  <span>از {meta.itemCount} رکورد</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-md bg-navy border border-gold/30 text-cream disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gold/10 transition-colors"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>

                  <span className="px-3 py-1 text-cream text-sm">
                    صفحه {currentPage} از {Math.ceil(meta.itemCount / pageSize)}
                  </span>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={!meta.hasNextPage}
                    className="p-2 rounded-md bg-navy border border-gold/30 text-cream disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gold/10 transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </Card>
        </main>
      </div>
    </div>
  );
}
