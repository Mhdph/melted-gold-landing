"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { TrendingUp, TrendingDown, XIcon } from "lucide-react";
import { Separator } from "./ui/separator";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { Textarea } from "./ui/textarea";
import { GoldPriceData } from "@/hooks/use-gold-price-websocket";
import { useCreateTransaction } from "@/services/trade-service";

interface TradingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  type: "buy" | "sell";
  currentPrice: number;
  onTradeComplete: (trade: any) => void;
  priceData: GoldPriceData;
}

export function TradingDialog({
  isOpen,
  onClose,
  type,
  currentPrice,
  onTradeComplete,
  priceData,
}: TradingDialogProps) {
  const { toast } = useToast();
  const createTransactionMutation = useCreateTransaction();
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const amountInputRef = useRef<HTMLInputElement>(null);
  const isBuy = type === "buy";
  const tradePrice = isBuy
    ? priceData.msg.buyMithqal || 0
    : priceData.msg.sellMithqal || 0;
  const totalValue = amount ? Number.parseFloat(amount) * tradePrice : 0;

  // Focus input when dialog opens
  useEffect(() => {
    if (isOpen && amountInputRef.current) {
      setTimeout(() => {
        amountInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

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
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white border-gold/20 max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-gold text-lg text-center">
            {isBuy ? "خرید آبشده نقدی" : "فروش آبشده نقدی"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
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
              ref={amountInputRef}
              placeholder="وزن"
              value={amount}
              id="amount"
              onChange={(e) => setAmount(e.target.value)}
              required
              className="placeholder:!text-gray-500"
              autoFocus
              inputMode="decimal"
              pattern="[0-9]*"
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
          <DialogFooter className="flex gap-3">
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
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
