"use client";

import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { Textarea } from "./ui/textarea";
import { useCreateTransaction } from "@/services/trade-service";

// Convert Persian digits to English digits
const persianToEnglish = (str: string): string => {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  const englishDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  return str.replace(/[۰-۹]/g, (char) => {
    const index = persianDigits.indexOf(char);
    return index !== -1 ? englishDigits[index] : char;
  });
};

const tradingFormSchema = z.object({
  amount: z
    .string({
      required_error: "وزن الزامی است",
    })
    .min(1, "وزن الزامی است")
    .refine(
      (val) => {
        const num = Number.parseFloat(val);
        return !Number.isNaN(num) && num > 0;
      },
      {
        message: "وزن باید عددی مثبت باشد",
      }
    ),
  description: z.string().optional(),
});

type TradingFormData = z.infer<typeof tradingFormSchema>;

interface TradingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  type: "buy" | "sell";
  currentPrice: number;
  onTradeComplete: (trade: any) => void;
  priceData: any;
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
  const amountInputRef = useRef<HTMLInputElement>(null);
  const isBuy = type === "buy";

  const form = useForm<TradingFormData>({
    resolver: zodResolver(tradingFormSchema),
    defaultValues: {
      amount: "",
      description: "",
    },
  });

  const amount = form.watch("amount");
  const totalValue = amount
    ? Number.parseFloat(amount) *
      (isBuy ? priceData.msg.buyGerm : priceData.msg.sellGerm)
    : 0;

  // Focus input when dialog opens
  useEffect(() => {
    if (isOpen && amountInputRef.current) {
      setTimeout(() => {
        amountInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Reset form when dialog closes
  useEffect(() => {
    if (!isOpen) {
      form.reset();
    }
  }, [isOpen, form]);

  const handleSubmit = async (data: TradingFormData) => {
    const tradeAmount = Number.parseFloat(data.amount);

    try {
      const response = await createTransactionMutation.mutateAsync({
        weight: tradeAmount,
        type: isBuy ? "buy" : "sell",
        livePrice: isBuy ? priceData.msg.buyGerm : priceData.msg.sellGerm,
        description: data.description || undefined,
      });

      const newTrade = {
        id: Date.now().toString(),
        date:
          new Date().toLocaleDateString("fa-IR") +
          " - " +
          new Date().toLocaleTimeString("fa-IR"),
        type: isBuy ? "خرید" : "فروش",
        amount: tradeAmount,
        pricePerGram: isBuy ? priceData.msg.buyGram : priceData.msg.sellGram,
        totalValue: totalValue,
        status: "در انتظار",
      };

      onTradeComplete(newTrade);
      form.reset();
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
    form.reset();
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
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            {/* Price Display */}
            <div className="bg-gray-300 mt-2 justify-between rounded-lg border-black p-2 border flex">
              <div className="flex items-center gap-1 border-black">
                <p className="text-cream/80">گرم:</p>
                <p className="text-gold font-bold">
                  {isBuy
                    ? priceData.msg.buyGerm.toLocaleString("fa-IR")
                    : priceData.msg.sellGerm.toLocaleString("fa-IR")}
                </p>
                <p>تومان</p>
              </div>
              <div className="border-r pl-2 border-black"></div>
              <div className="flex items-center gap-1 pl-2  border-black">
                <p className="text-cream/80">مثقال:</p>
                <p className="text-gold font-bold">
                  {isBuy
                    ? priceData.msg.buyMithqal.toLocaleString("fa-IR")
                    : priceData.msg.sellMithqal.toLocaleString("fa-IR")}
                </p>
                <p>تومان</p>
              </div>
            </div>

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputGroup>
                      <InputGroupInput
                        ref={amountInputRef}
                        placeholder="وزن"
                        value={field.value}
                        id="amount"
                        onChange={(e) => {
                          const convertedValue = persianToEnglish(
                            e.target.value
                          );
                          field.onChange(convertedValue);
                        }}
                        className="placeholder:!text-gray-500"
                        autoFocus
                        inputMode="decimal"
                        pattern="[0-9]*"
                      />
                      <InputGroupAddon align="inline-end">
                        <div className="pl-2">گرم </div>
                      </InputGroupAddon>
                    </InputGroup>
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            {/* Total Value Display */}
            <InputGroup>
              <InputGroupInput
                placeholder="مبلغ کل"
                value={totalValue.toLocaleString("fa-IR")}
                disabled
              />
              <InputGroupAddon align="inline-end">
                <div className="pl-2">تومان </div>
              </InputGroupAddon>
            </InputGroup>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="توضیحات"
                      value={field.value || ""}
                      onChange={field.onChange}
                      className="bg-navy border-gold/30 text-cream text-lg h-12 placeholder:!text-gray-500"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
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
        </Form>
      </DialogContent>
    </Dialog>
  );
}
