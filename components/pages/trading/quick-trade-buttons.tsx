import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown } from "lucide-react";

interface QuickTradeButtonsProps {
  currentPrice: number;
  onBuyClick: () => void;
  onSellClick: () => void;
}

export default function QuickTradeButtons({
  currentPrice,
  onBuyClick,
  onSellClick,
}: QuickTradeButtonsProps) {
  const sellPrice = currentPrice - 50000;

  return (
    <Card className="border-gold/20">
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
            onClick={onBuyClick}
            className="h-20 bg-[#F6F5EE] flex flex-col hover:bg-zinc-100 text-green-500"
          >
            <div className="flex items-center gap-2">
              <TrendingUp className="h-8 w-8 text-green-400" />
              <p className="font-bold text-center text-base">بخرید</p>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <p className="text-sm text-cream/80">مظنه خرید</p>
              <p className="text-xl font-semibold">
                {currentPrice.toLocaleString("fa-IR")}
              </p>
            </div>
          </Button>

          {/* Sell Button */}
          <Button
            onClick={onSellClick}
            className="h-20 bg-[#F6F5EE] flex flex-col hover:bg-zinc-100 transition-all duration-200 text-red-500"
          >
            <div className="flex items-center gap-2">
              <TrendingDown className="h-8 w-8" />
              <p className="font-bold text-center text-base">بفروشید</p>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <p className="text-sm text-cream/80">مظنه فروش</p>
              <p className="text-xl font-semibold">
                {sellPrice.toLocaleString("fa-IR")}
              </p>
            </div>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
