import { Card, CardContent } from "@/components/ui/card";
import { TrendingDown, TrendingUp } from "lucide-react";
import { PriceData } from "./types";

interface PriceSummaryCardsProps {
  latestPrice: PriceData | undefined;
}

export default function PriceSummaryCards({
  latestPrice,
}: PriceSummaryCardsProps) {
  if (!latestPrice) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 pl-8 gap-4">
      <Card className="border-green-500/20">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-cream/60">قیمت خرید (هر گرم)</p>
              <p className="text-2xl font-bold text-green-400 mt-1">
                {latestPrice.buy.toLocaleString("fa-IR")} ریال
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-green-400" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-red-500/20">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-cream/60">قیمت فروش (هر گرم)</p>
              <p className="text-2xl font-bold text-red-400 mt-1">
                {latestPrice.sell.toLocaleString("fa-IR")} ریال
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
              <TrendingDown className="h-6 w-6 text-red-400" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
