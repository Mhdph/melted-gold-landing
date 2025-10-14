"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useToast } from "@/hooks/use-toast";
import { TrendingUp, TrendingDown } from "lucide-react";

interface TradingDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  type: "buy" | "sell";
  currentPrice: number;
  onTradeComplete: (trade: any) => void;
}

export function TradingDrawer({
  isOpen,
  onClose,
  type,
  currentPrice,
  onTradeComplete,
}: TradingDrawerProps) {
  const { toast } = useToast();
  const [amount, setAmount] = useState("");

  const isBuy = type === "buy";
  const tradePrice = isBuy ? currentPrice : currentPrice - 50000;
  const totalValue = amount ? Number.parseFloat(amount) * tradePrice : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;

    const tradeAmount = Number.parseFloat(amount);
    const newTrade = {
      id: Date.now().toString(),
      date:
        new Date().toLocaleDateString("fa-IR") +
        " - " +
        new Date().toLocaleTimeString("fa-IR"),
      type: isBuy ? "خرید" : "فروش",
      amount: tradeAmount,
      pricePerGram: tradePrice,
      totalValue: totalValue,
      status: "در انتظار",
    };

    onTradeComplete(newTrade);
    setAmount("");
    onClose();

    toast({
      title: "معامله ثبت شد",
      description: `${
        isBuy ? "خرید" : "فروش"
      } ${tradeAmount} گرم طلا با موفقیت ثبت شد`,
    });
  };

  const handleClose = () => {
    setAmount("");
    onClose();
  };

  return (
    <Drawer open={isOpen} onOpenChange={handleClose} direction="bottom">
      <DrawerContent className="bg-white  flex justify-center items-center border-gold/20">
        <DrawerHeader className="text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                isBuy ? "bg-green-500/20" : "bg-red-500/20"
              }`}
            >
              {isBuy ? (
                <TrendingUp className="h-6 w-6 text-green-400" />
              ) : (
                <TrendingDown className="h-6 w-6 text-red-400" />
              )}
            </div>
          </div>
          <DrawerTitle className="text-gold text-xl">
            {isBuy ? "خرید طلا" : "فروش طلا"}
          </DrawerTitle>
          <DrawerDescription className="text-cream/60">
            {isBuy
              ? "مقدار طلای مورد نظر برای خرید را وارد کنید"
              : "مقدار طلای مورد نظر برای فروش را وارد کنید"}
          </DrawerDescription>
        </DrawerHeader>

        <form
          onSubmit={handleSubmit}
          className="px-4 space-y-6 bg-white md:w-1/2 "
        >
          {/* Price Display */}
          <div className="p-4 rounded-lg bg-gold/10 border border-gold/30">
            <div className="flex items-center justify-between">
              <span className="text-cream/80">
                قیمت {isBuy ? "خرید" : "فروش"} (هر گرم):
              </span>
              <span
                className={`text-xl font-bold ${
                  isBuy ? "text-green-400" : "text-red-400"
                }`}
              >
                {tradePrice.toLocaleString("fa-IR")} ریال
              </span>
            </div>
          </div>

          {/* Amount Input */}
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-cream text-base">
              مقدار (گرم)
            </Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="مقدار طلا را وارد کنید"
              className="bg-navy border-gold/30 text-cream text-lg h-12"
              required
              autoFocus
            />
          </div>

          {/* Total Value Display */}
          {amount && (
            <div
              className={`p-4 rounded-lg border ${
                isBuy
                  ? "bg-green-500/10 border-green-500/30"
                  : "bg-red-500/10 border-red-500/30"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-cream/80 text-base">
                  {isBuy ? "مبلغ قابل پرداخت:" : "مبلغ دریافتی:"}
                </span>
                <span
                  className={`text-xl font-bold ${
                    isBuy ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {totalValue.toLocaleString("fa-IR")} ریال
                </span>
              </div>
            </div>
          )}

          <DrawerFooter className="px-0">
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="flex-1 border-gold/30 text-cream hover:bg-gold/10"
              >
                انصراف
              </Button>
              <Button
                type="submit"
                className={`flex-1 font-bold   ${
                  isBuy
                    ? "bg-[#D4AF37] hover:bg-[#BFA67A] text-[#0F1724]"
                    : "bg-red-500 hover:bg-red-600 text-white"
                }`}
              >
                {isBuy ? "ثبت خرید" : "ثبت فروش"}
              </Button>
            </div>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
