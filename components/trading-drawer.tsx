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
import { TrendingUp, TrendingDown, XIcon } from "lucide-react";
import { Separator } from "./ui/separator";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { Textarea } from "./ui/textarea";
import { GoldPriceData } from "@/hooks/use-gold-price-websocket";
import { useCreateTransaction } from "@/services/trade-service";

interface TradingDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  type: "buy" | "sell";
  currentPrice: number;
  onTradeComplete: (trade: any) => void;
  priceData: GoldPriceData;
}

export function TradingDrawer({
  isOpen,
  onClose,
  type,
  currentPrice,
  onTradeComplete,
  priceData,
}: TradingDrawerProps) {
  const { toast } = useToast();
  const createTransactionMutation = useCreateTransaction();
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const isBuy = type === "buy";
  const tradePrice = isBuy ? priceData.msg.buyGerm : priceData.msg.sellGerm;
  const totalValue = amount ? Number.parseFloat(amount) * tradePrice : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;

    const tradeAmount = Number.parseFloat(amount);

    try {
      const response = await createTransactionMutation.mutateAsync({
        weight: tradeAmount,
        type: isBuy ? "buy" : "sell",
        livePrice: tradePrice,
        description: description || undefined,
      });

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
      setDescription("");
      onClose();

      toast({
        title: "معامله ثبت شد",
        description: `${
          isBuy ? "خرید" : "فروش"
        } ${tradeAmount} گرم طلا با موفقیت ثبت شد`,
      });
    } catch (error) {
      toast({
        title: "خطا در ثبت معامله",
        description: "لطفاً دوباره تلاش کنید",
        variant: "destructive",
      });
    }
  };

  const handleClose = () => {
    setAmount("");
    setDescription("");
    onClose();
  };

  return (
    <Drawer open={isOpen} onOpenChange={handleClose} direction="bottom">
      <DrawerContent className="bg-white  flex justify-center items-center border-gold/20">
        <div className=" flex items-center px-6 justify-between  w-full  py-2">
          <p className="text-gold text-sm">
            {isBuy ? "خرید آبشده نقدی" : "فروش آبشده نقدی"}
          </p>
          <XIcon onClick={handleClose} className="size-4" />
        </div>
        <Separator />
        <form
          onSubmit={handleSubmit}
          className="px-4 space-y-6 py-2 bg-white md:w-1/2 "
        >
          {/* Price Display */}

          <div className="bg-gray-300 mt-2 justify-between rounded-lg border-black p-2 border flex">
            <div className="flex items-center gap-1 pl-2  border-black">
              <p className="text-cream/80">مثقال:</p>
              <p className="text-gold font-bold">
                {" "}
                {tradePrice.toLocaleString("fa-IR")}
              </p>
              <p>ریال</p>
            </div>
            <div className="border-r pl-2 border-black"></div>
            <div className="flex items-center gap-1 border-black">
              <p className="text-cream/80">گرم:</p>
              <p className="text-gold font-bold">
                {" "}
                {tradePrice.toLocaleString("fa-IR")}
              </p>
              <p>ریال</p>
            </div>
          </div>

          <InputGroup>
            <InputGroupInput
              placeholder="وزن"
              value={amount}
              id="amount"
              onChange={(e) => setAmount(e.target.value)}
              required
              className="placeholder:!text-gray-500"
            />
            <InputGroupAddon align="inline-end">
              <div className="pl-2">گرم </div>
            </InputGroupAddon>
          </InputGroup>
          {/* Total Value Display */}
          <InputGroup>
            <InputGroupInput
              placeholder="مبلغ کل"
              value={totalValue.toLocaleString("fa-IR")}
              onChange={(e) => setAmount(e.target.value)}
              disabled
            />
            <InputGroupAddon align="inline-end">
              <div className="pl-2">ریال </div>
            </InputGroupAddon>
          </InputGroup>
          <Textarea
            placeholder="توضیحات"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-navy border-gold/30 text-cream text-lg h-12 placeholder:!text-gray-500"
          />
          <DrawerFooter className="px-0 mb-2">
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
                disabled={createTransactionMutation.isPending}
                className={`flex-1 font-bold   ${
                  isBuy
                    ? "bg-[#D4AF37] hover:bg-[#BFA67A] text-[#0F1724]"
                    : "bg-red-500 hover:bg-red-600 text-white"
                }`}
              >
                {createTransactionMutation.isPending
                  ? "در حال ثبت..."
                  : isBuy
                  ? "ثبت خرید"
                  : "ثبت فروش"}
              </Button>
            </div>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
