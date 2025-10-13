"use client";

import type React from "react";

import { useState } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
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
import { Badge } from "@/components/ui/badge";
import { FileText, Calendar, User, Weight } from "lucide-react";
import PageTitle from "@/components/page-title";

type Remittance = {
  id: string;
  date: string;
  amount: number;
  unit: "گرم طلا" | "ریال";
  recipient: string;
  status: "تکمیل شده" | "در انتظار";
};

export default function RemittancePage() {
  const [amount, setAmount] = useState("");
  const [unit, setUnit] = useState<"گرم طلا" | "ریال">("گرم طلا");
  const [recipient, setRecipient] = useState("");
  const [remittances, setRemittances] = useState<Remittance[]>([
    {
      id: "1",
      date: "1403/10/15",
      amount: 50,
      unit: "گرم طلا",
      recipient: "علی احمدی",
      status: "تکمیل شده",
    },
    {
      id: "2",
      date: "1403/10/14",
      amount: 50000000,
      unit: "ریال",
      recipient: "مریم رضایی",
      status: "در انتظار",
    },
  ]);
  const [sortBy, setSortBy] = useState<"date" | "amount">("date");
  const [filterUnit, setFilterUnit] = useState<"all" | "گرم طلا" | "ریال">(
    "all"
  );

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

    setRemittances([newRemittance, ...remittances]);
    setAmount("");
    setRecipient("");
  };

  const filteredRemittances = remittances
    .filter((r) => filterUnit === "all" || r.unit === filterUnit)
    .sort((a, b) => {
      if (sortBy === "date") return b.id.localeCompare(a.id);
      return b.amount - a.amount;
    });

  return (
    <div className="min-h-screen bg-[#F6F5EE]  " dir="rtl">
      <main className=" px-4 py-4 space-y-6">
        {/* Page Header */}

        <PageTitle
          title="ثبت حواله"
          description="ثبت و مدیریت حواله‌های طلا و ریال"
        />

        {/* New Remittance Form */}
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
                    onValueChange={(value: any) => setUnit(value)}
                  >
                    <SelectTrigger className="bg-navy border-gold/30 mb-2 text-cream ">
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
                className=" bg-[#d8c070] hover:bg-[#BFA67A] text-gray-800 font-bold py-4 w-40 rounded-xl transition-all hover:shadow-lg disabled:opacity-50"
              >
                ثبت حواله
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Remittance History */}
        <Card className="bg-white border-gold/20">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle className="text-gold">تاریخچه حواله‌ها</CardTitle>
                <CardDescription className="text-cream/60">
                  مشاهده و مدیریت حواله‌های ثبت شده
                </CardDescription>
              </div>

              <div className="flex gap-2">
                <Select
                  value={sortBy}
                  onValueChange={(value: any) => setSortBy(value)}
                >
                  <SelectTrigger className="w-[140px] bg-navy border-gold/30 text-cream">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">مرتب‌سازی: تاریخ</SelectItem>
                    <SelectItem value="amount">مرتب‌سازی: مقدار</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={filterUnit}
                  onValueChange={(value: any) => setFilterUnit(value)}
                >
                  <SelectTrigger className="w-[140px] bg-navy border-gold/30 text-cream">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">همه واحدها</SelectItem>
                    <SelectItem value="گرم طلا">گرم طلا</SelectItem>
                    <SelectItem value="ریال">ریال</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredRemittances.map((remittance) => (
                <div
                  key={remittance.id}
                  className="p-4 rounded-lg bg-navy border border-gold/20 hover:border-gold/40 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                        <Weight className="h-5 w-5 text-gold" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-cream">
                            {remittance.amount.toLocaleString("fa-IR")}
                          </span>
                          <span className="text-sm text-cream/60">
                            {remittance.unit}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-cream/60">
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            <span>{remittance.recipient}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{remittance.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Badge
                      variant={
                        remittance.status === "تکمیل شده"
                          ? "default"
                          : "secondary"
                      }
                      className={
                        remittance.status === "تکمیل شده"
                          ? "bg-green-500/20 text-green-400 border-green-500/30"
                          : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                      }
                    >
                      {remittance.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
