"use client";

import { useState } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Activity,
  ArrowDownLeft,
  ArrowUpRight,
  Calendar,
  Filter,
} from "lucide-react";
import PageTitle from "@/components/page-title";

type Transaction = {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: "واریز" | "برداشت" | "انتقال";
  balance: number;
};

export default function AccountActivityPage() {
  const [transactions] = useState<Transaction[]>([
    {
      id: "1",
      date: "1403/10/15 - 14:30",
      description: "خرید 10 گرم طلا",
      amount: -25000000,
      type: "برداشت",
      balance: 75000000,
    },
    {
      id: "2",
      date: "1403/10/14 - 10:15",
      description: "واریز به حساب",
      amount: 50000000,
      type: "واریز",
      balance: 100000000,
    },
    {
      id: "3",
      date: "1403/10/13 - 16:45",
      description: "فروش 5 گرم طلا",
      amount: 12500000,
      type: "واریز",
      balance: 50000000,
    },
    {
      id: "4",
      date: "1403/10/12 - 09:20",
      description: "انتقال به کاربر دیگر",
      amount: -10000000,
      type: "انتقال",
      balance: 37500000,
    },
    {
      id: "5",
      date: "1403/10/11 - 11:00",
      description: "واریز اولیه",
      amount: 47500000,
      type: "واریز",
      balance: 47500000,
    },
  ]);

  const [filterType, setFilterType] = useState<
    "all" | "واریز" | "برداشت" | "انتقال"
  >("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const filteredTransactions = transactions.filter(
    (t) => filterType === "all" || t.type === filterType
  );

  const totalDeposits = transactions
    .filter((t) => t.type === "واریز")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalWithdrawals = transactions
    .filter((t) => t.type === "برداشت" || t.type === "انتقال")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  return (
    <div className="min-h-screen bg-navy flex" dir="rtl">
      <div className="flex-1 ">
        <main className="container mx-auto px-4 py-8 space-y-6">
          {/* Page Header */}

          <PageTitle
            title="گردش حساب"
            description="مشاهده تمام تراکنش‌های حساب"
          />

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className=" border-gold/20">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-cream/60">موجودی فعلی</p>
                    <p className="text-2xl font-bold text-gold mt-1">
                      {transactions[0]?.balance.toLocaleString("fa-IR")} ریال
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                    <Activity className="h-6 w-6 text-gold" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className=" border-green-500/20">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-cream/60">مجموع واریزی‌ها</p>
                    <p className="text-2xl font-bold text-green-400 mt-1">
                      {totalDeposits.toLocaleString("fa-IR")} ریال
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                    <ArrowDownLeft className="h-6 w-6 text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className=" border-red-500/20">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-cream/60">مجموع برداشت‌ها</p>
                    <p className="text-2xl font-bold text-red-400 mt-1">
                      {totalWithdrawals.toLocaleString("fa-IR")} ریال
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
                    <ArrowUpRight className="h-6 w-6 text-red-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className=" border-gold/20">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-gold" />
                <CardTitle className="text-gold">فیلترها</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-cream">نوع تراکنش</Label>
                  <Select
                    value={filterType}
                    onValueChange={(value: any) => setFilterType(value)}
                  >
                    <SelectTrigger className="bg-navy border-gold/30 text-cream">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">همه تراکنش‌ها</SelectItem>
                      <SelectItem value="واریز">واریز</SelectItem>
                      <SelectItem value="برداشت">برداشت</SelectItem>
                      <SelectItem value="انتقال">انتقال</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-cream">از تاریخ</Label>
                  <Input
                    type="text"
                    placeholder="1403/10/01"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    className="bg-navy border-gold/30 text-cream"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-cream">تا تاریخ</Label>
                  <Input
                    type="text"
                    placeholder="1403/10/30"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    className="bg-navy border-gold/30 text-cream"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Transactions Table */}
          <Card className=" border-gold/20">
            <CardHeader>
              <CardTitle className="text-gold">تراکنش‌ها</CardTitle>
              <CardDescription className="text-cream/60">
                {filteredTransactions.length} تراکنش یافت شد
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="p-4 rounded-lg bg-navy border border-gold/20 hover:border-gold/40 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                      <div className="flex items-start gap-3 flex-1">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            transaction.type === "واریز"
                              ? "bg-green-500/10"
                              : transaction.type === "برداشت"
                              ? "bg-red-500/10"
                              : "bg-blue-500/10"
                          }`}
                        >
                          {transaction.type === "واریز" ? (
                            <ArrowDownLeft className="h-5 w-5 text-green-400" />
                          ) : (
                            <ArrowUpRight className="h-5 w-5 text-red-400" />
                          )}
                        </div>
                        <div className="space-y-1 flex-1">
                          <p className="font-medium text-cream">
                            {transaction.description}
                          </p>
                          <div className="flex items-center gap-2 text-sm text-cream/60">
                            <Calendar className="h-4 w-4" />
                            <span>{transaction.date}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-left md:text-right space-y-1">
                        <p
                          className={`text-lg font-bold ${
                            transaction.amount > 0
                              ? "text-green-400"
                              : "text-red-400"
                          }`}
                        >
                          {transaction.amount > 0 ? "+" : ""}
                          {transaction.amount.toLocaleString("fa-IR")} ریال
                        </p>
                        <p className="text-sm text-cream/60">
                          موجودی: {transaction.balance.toLocaleString("fa-IR")}{" "}
                          ریال
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
