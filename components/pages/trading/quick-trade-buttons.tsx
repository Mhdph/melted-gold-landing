import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useGoldPriceWebSocket } from "@/hooks/use-gold-price-websocket";
import { GoldPriceData } from "@/hooks/use-gold-price-websocket";
interface QuickTradeButtonsProps {
  currentPrice: number;
  onBuyClick: () => void;
  onSellClick: () => void;
  priceData: GoldPriceData;
}

export default function QuickTradeButtons({
  currentPrice,
  onBuyClick,
  onSellClick,
  priceData,
}: QuickTradeButtonsProps) {
  return (
    <div className="space-y-4">
      {/* Main Trading Card */}
      <Card className="bg-[#F6F5EE] border-0 py-2 shadow-none">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-gray-800 text-xl font-semibold">
            آبشده نقدی
          </CardTitle>
        </CardHeader>
        {/* Price Info Card */}
        <Card className="bg-gray-300 border border-gray-600 rounded-sm gap-0 py-2 shadow-none">
          <CardContent className="py-0">
            <div className="flex justify-between items-center">
              <p className="text-gray-600 text-sm">نرخ هر گرم طلا</p>
              <p className="text-gray-800 font-semibold">
                {priceData?.msg.buyGerm.toLocaleString("fa-IR") || 0} تومان
              </p>
            </div>
          </CardContent>
        </Card>
        <CardContent className="p-0">
          <div className="grid grid-cols-2 gap-4">
            {/* Buy Panel */}
            <div
              onClick={onBuyClick}
              className="bg-white rounded-lg p-4 border border-gray-200"
            >
              <div className="flex flex-col items-center space-y-3">
                <div className="w-8 h-8 border-2 border-green-500 rounded flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
                <h3 className="font-bold text-gray-800 text-lg">بخرید</h3>
                <p className="text-gray-500 text-sm">
                  گرم: {priceData?.msg.buyGerm.toLocaleString("fa-IR") || 0}
                </p>
                <Button className="w-full bg-green-500 hover:bg-green-600 text-white border-0 rounded-lg py-2">
                  {priceData?.msg.buyMithqal.toLocaleString("fa-IR") || 0}
                </Button>
              </div>
            </div>
            {/* Sell Panel */}
            <div
              onClick={onSellClick}
              className="bg-white rounded-lg p-4 border border-gray-200"
            >
              <div className="flex flex-col items-center space-y-3">
                <div className="w-8 h-8 border-2 border-red-500 rounded flex items-center justify-center">
                  <TrendingDown className="h-4 w-4 text-red-400" />
                </div>
                <h3 className="font-bold text-gray-800 text-lg">بفروشید</h3>
                <p className="text-gray-500 text-sm">
                  گرم : {priceData?.msg.sellGerm.toLocaleString("fa-IR") || 0}
                </p>
                <Button className="w-full bg-red-500 hover:bg-red-600 text-white border-0 rounded-lg py-2">
                  {priceData?.msg.sellMithqal.toLocaleString("fa-IR") || 0}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
