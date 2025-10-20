import type React from "react";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Remittance, RemittanceUnit } from "./types";

interface RemittanceFormProps {
  onSubmit: (remittance: Remittance) => void;
}

export default function RemittanceForm({ onSubmit }: RemittanceFormProps) {
  const [amount, setAmount] = useState("");
  const [unit, setUnit] = useState<RemittanceUnit>("گرم طلا");
  const [recipient, setRecipient] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !recipient) return;

    const newRemittance: Remittance = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString("fa-IR"),
      amount: Number.parseFloat(amount),
      unit,
      recipient,
      status: "در انتظار",
    };

    onSubmit(newRemittance);
    setAmount("");
    setRecipient("");
  };

  return (
    <Card className="bg-white border-gold/20">
      <CardHeader>
        <CardTitle className="text-gold">ثبت حواله جدید</CardTitle>
        <CardDescription className="text-cream/60">
          اطلاعات حواله را وارد کنید
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4 items-center">
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-cream">
                مقدار
              </Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="مقدار را وارد کنید"
                className="bg-navy border-gold/30 text-cream w-full xl:w-96"
                required
              />
            </div>

            <div className="space-y-2 mt-2">
              <Label htmlFor="unit" className="text-cream">
                واحد
              </Label>
              <Select
                value={unit}
                onValueChange={(value: RemittanceUnit) => setUnit(value)}
              >
                <SelectTrigger className="bg-navy border-gold/30 mb-2 text-cream">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="گرم طلا">گرم طلا</SelectItem>
                  <SelectItem value="ریال">ریال</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="recipient" className="text-cream">
              نام گیرنده
            </Label>
            <Input
              id="recipient"
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="نام گیرنده را وارد کنید"
              className="bg-navy border-gold/30 text-cream w-full xl:w-96"
              required
            />
          </div>

          <Button
            type="submit"
            className="bg-[#d8c070] hover:bg-[#BFA67A] text-gray-800 font-bold py-4 w-40 rounded-xl transition-all hover:shadow-lg disabled:opacity-50"
          >
            ثبت حواله
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
