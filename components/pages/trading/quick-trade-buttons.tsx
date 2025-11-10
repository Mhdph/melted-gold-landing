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
import { useGetSettings } from "@/services/settings-service";
interface QuickTradeButtonsProps {
  currentPrice: number;
  onBuyClick: () => void;
  onSellClick: () => void;
  priceData: any;
}

export default function QuickTradeButtons({
  currentPrice,
  onBuyClick,
  onSellClick,
  priceData,
}: QuickTradeButtonsProps) {
  console.log(priceData, "priceData");

  // Fetch settings to check permissions
  const { data: settings } = useGetSettings();

  // Get permission settings
  const buyPermission = settings?.find(
    (setting) => setting.key === "permission Buy"
  );
  const sellPermission = settings?.find(
    (setting) => setting.key === "permission Sell"
  );

  // Check if permissions are enabled (default to true if not found)
  const canBuy = buyPermission ? buyPermission.value === "true" : true;
  const canSell = sellPermission ? sellPermission.value === "true" : true;

  // Safe access to price data with fallbacks
  const buyGerm = priceData?.msg?.buyGerm || 0;
  const sellGerm = priceData?.msg?.sellGerm || 0;
  const buyMithqal = priceData?.msg?.buyMithqal || 0;
  const sellMithqal = priceData?.msg?.sellMithqal || 0;

  // Handle buy click with permission check
  const handleBuyClick = () => {
    if (canBuy) {
      onBuyClick();
    }
  };

  // Handle sell click with permission check
  const handleSellClick = () => {
    if (canSell) {
      onSellClick();
    }
  };

  return (
    <div className="space-y-4">
      {/* Main Trading Card */}
      {priceData && priceData.msg && (
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
                  {buyGerm.toLocaleString("fa-IR")} تومان
                </p>
              </div>
            </CardContent>
          </Card>
          <CardContent className="p-0">
            <div className="grid grid-cols-2 gap-4">
              {/* Buy Panel */}
              <div
                onClick={handleBuyClick}
                className={`bg-white rounded-lg p-4 border border-gray-200 ${
                  !canBuy
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer hover:shadow-md transition-shadow"
                }`}
              >
                <div className="flex flex-col items-center space-y-3">
                  <div
                    className={`w-8 h-8 border-2 rounded flex items-center justify-center ${
                      canBuy ? "border-green-500" : "border-gray-400"
                    }`}
                  >
                    <TrendingUp
                      className={`h-4 w-4 ${
                        canBuy ? "text-green-500" : "text-gray-400"
                      }`}
                    />
                  </div>
                  <h3
                    className={`font-bold text-lg ${
                      canBuy ? "text-gray-800" : "text-gray-400"
                    }`}
                  >
                    بخرید
                  </h3>
                  <p className="text-gray-500 text-sm">
                    گرم: {buyGerm.toLocaleString("fa-IR")}
                  </p>
                  <Button
                    disabled={!canBuy}
                    className={`w-full border-0 rounded-lg py-2 ${
                      canBuy
                        ? "bg-green-500 hover:bg-green-600 text-white"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {buyMithqal.toLocaleString("fa-IR")}
                  </Button>
                  {!canBuy && (
                    <p className="text-xs text-red-500 text-center">
                      خرید غیرفعال است
                    </p>
                  )}
                </div>
              </div>
              {/* Sell Panel */}
              <div
                onClick={handleSellClick}
                className={`bg-white rounded-lg p-4 border border-gray-200 ${
                  !canSell
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer hover:shadow-md transition-shadow"
                }`}
              >
                <div className="flex flex-col items-center space-y-3">
                  <div
                    className={`w-8 h-8 border-2 rounded flex items-center justify-center ${
                      canSell ? "border-red-500" : "border-gray-400"
                    }`}
                  >
                    <TrendingDown
                      className={`h-4 w-4 ${
                        canSell ? "text-red-400" : "text-gray-400"
                      }`}
                    />
                  </div>
                  <h3
                    className={`font-bold text-lg ${
                      canSell ? "text-gray-800" : "text-gray-400"
                    }`}
                  >
                    بفروشید
                  </h3>
                  <p className="text-gray-500 text-sm">
                    گرم : {sellGerm.toLocaleString("fa-IR")}
                  </p>
                  <Button
                    disabled={!canSell}
                    className={`w-full border-0 rounded-lg py-2 ${
                      canSell
                        ? "bg-red-500 hover:bg-red-600 text-white"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {sellMithqal.toLocaleString("fa-IR")}
                  </Button>
                  {!canSell && (
                    <p className="text-xs text-red-500 text-center">
                      فروش غیرفعال است
                    </p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
