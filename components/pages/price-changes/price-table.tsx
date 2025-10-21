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
import { PriceData, TimeRange } from "./types";

interface PriceTableProps {
  priceData: PriceData[];
  timeRange: TimeRange;
  onTimeRangeChange: (value: TimeRange) => void;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("fa-IR", {
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function PriceTable({
  priceData,
  timeRange,
  onTimeRangeChange,
}: PriceTableProps) {
  return (
    <Card className="overflow-x-scroll w-[340px] lg:w-full border-gold/20">
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
            onValueChange={(value: any) => onTimeRangeChange(value)}
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
    </Card>
  );
}
