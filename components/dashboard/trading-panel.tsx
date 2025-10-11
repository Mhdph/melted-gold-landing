"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TradingPanelProps {
  onTradeComplete: () => void;
}

export function TradingPanel({ onTradeComplete }: TradingPanelProps) {
  const [buyAmount, setBuyAmount] = useState("");
  const [sellAmount, setSellAmount] = useState("");
  const { toast } = useToast();
  const currentPrice = 2850000;

  const handleBuy = () => {
    if (!buyAmount || Number.parseFloat(buyAmount) <= 0) {
      toast({
        title: "خطا",
        description: "لطفاً مقدار معتبری وارد کنید",
        variant: "destructive",
      });
      return;
    }

    const total = Number.parseFloat(buyAmount) * currentPrice;
    toast({
      title: "خرید موفق",
      description: `${buyAmount} گرم طلا به مبلغ ${total.toLocaleString(
        "fa-IR"
      )} تومان خریداری شد`,
    });
    setBuyAmount("");
    onTradeComplete();
  };

  const handleSell = () => {
    if (!sellAmount || Number.parseFloat(sellAmount) <= 0) {
      toast({
        title: "خطا",
        description: "لطفاً مقدار معتبری وارد کنید",
        variant: "destructive",
      });
      return;
    }

    const total = Number.parseFloat(sellAmount) * currentPrice;
    toast({
      title: "فروش موفق",
      description: `${sellAmount} گرم طلا به مبلغ ${total.toLocaleString(
        "fa-IR"
      )} تومان فروخته شد`,
    });
    setSellAmount("");
    onTradeComplete();
  };

  return (
    <Card className="bg-[#fdf4e0] border border-[#dcd3bc]">
      <CardHeader>
        <CardTitle className="text-gold text-xl">پنل معاملات</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="buy" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-navy/80">
            <TabsTrigger
              value="buy"
              className="data-[state=active]:bg-green-600/20 data-[state=active]:text-green-400"
            >
              <TrendingUp className="ml-2 h-4 w-4" />
              خرید
            </TabsTrigger>
            <TabsTrigger
              value="sell"
              className="data-[state=active]:bg-red-600/20 data-[state=active]:text-red-400"
            >
              <TrendingDown className="ml-2 h-4 w-4" />
              فروش
            </TabsTrigger>
          </TabsList>

          <TabsContent value="buy" className="space-y-4 mt-6">
            <div className="space-y-2">
              <Label htmlFor="buy-amount" className="text-cream">
                مقدار (گرم)
              </Label>
              <Input
                id="buy-amount"
                type="number"
                placeholder="۰"
                value={buyAmount}
                onChange={(e) => setBuyAmount(e.target.value)}
                className="bg-navy/80 border-gold/30 text-cream text-right"
              />
            </div>
            <div className="p-4 bg-navy/80 rounded-lg border border-gold/20">
              <div className="flex justify-between items-center mb-2">
                <span className="text-cream/70 text-sm">قیمت هر گرم:</span>
                <span className="text-gold font-bold">
                  {currentPrice.toLocaleString("fa-IR")} تومان
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-cream/70 text-sm">مجموع:</span>
                <span className="text-gold font-bold text-lg">
                  {buyAmount
                    ? (
                        Number.parseFloat(buyAmount) * currentPrice
                      ).toLocaleString("fa-IR")
                    : "۰"}{" "}
                  تومان
                </span>
              </div>
            </div>
            <Button
              onClick={handleBuy}
              className="w-full bg-[#D4AF37] hover:bg-[#BFA67A] text-[#0F1724] font-bold py-6 rounded-xl transition-all hover:shadow-lg disabled:opacity-50"
            >
              خرید طلا
            </Button>
          </TabsContent>

          <TabsContent value="sell" className="space-y-4 mt-6">
            <div className="space-y-2">
              <Label htmlFor="sell-amount" className="text-cream">
                مقدار (گرم)
              </Label>
              <Input
                id="sell-amount"
                type="number"
                placeholder="۰"
                value={sellAmount}
                onChange={(e) => setSellAmount(e.target.value)}
                className="bg-navy/80 border-gold/30 text-cream text-right"
              />
            </div>
            <div className="p-4 bg-navy/80 rounded-lg border border-gold/20">
              <div className="flex justify-between items-center mb-2">
                <span className="text-cream/70 text-sm">قیمت هر گرم:</span>
                <span className="text-gold font-bold">
                  {currentPrice.toLocaleString("fa-IR")} تومان
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-cream/70 text-sm">مجموع:</span>
                <span className="text-gold font-bold text-lg">
                  {sellAmount
                    ? (
                        Number.parseFloat(sellAmount) * currentPrice
                      ).toLocaleString("fa-IR")
                    : "۰"}{" "}
                  تومان
                </span>
              </div>
            </div>
            <Button
              onClick={handleSell}
              className="w-full bg-red-600 hover:bg-red-700 text-white"
            >
              فروش طلا
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
