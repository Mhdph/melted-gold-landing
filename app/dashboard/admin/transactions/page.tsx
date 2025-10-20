"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, X, Search, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Transaction = {
  id: string;
  userName: string;
  userPhone: string;
  type: "buy" | "sell";
  weight: number;
  price: number;
  totalAmount: number;
  date: string;
  status: "pending" | "approved" | "rejected";
  paymentMethod: string;
};

export default function TransactionsApprovalPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "pending" | "approved" | "rejected"
  >("pending");

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "1",
      userName: "علی محمدی",
      userPhone: "09123456789",
      type: "buy",
      weight: 10,
      price: 2850000,
      totalAmount: 28500000,
      date: "1403/09/15 - 14:30",
      status: "pending",
      paymentMethod: "کارت به کارت",
    },
    {
      id: "2",
      userName: "سارا احمدی",
      userPhone: "09121234567",
      type: "sell",
      weight: 5,
      price: 2840000,
      totalAmount: 14200000,
      date: "1403/09/15 - 12:15",
      status: "pending",
      paymentMethod: "واریز به حساب",
    },
    {
      id: "3",
      userName: "محمد رضایی",
      userPhone: "09131234567",
      type: "buy",
      weight: 20,
      price: 2850000,
      totalAmount: 57000000,
      date: "1403/09/14 - 16:45",
      status: "approved",
      paymentMethod: "کارت به کارت",
    },
    {
      id: "4",
      userName: "فاطمه کریمی",
      userPhone: "09141234567",
      type: "buy",
      weight: 3,
      price: 2850000,
      totalAmount: 8550000,
      date: "1403/09/14 - 10:20",
      status: "pending",
      paymentMethod: "درگاه پرداخت",
    },
  ]);

  const handleApprove = (transactionId: string, userName: string) => {
    setTransactions(
      transactions.map((tx) =>
        tx.id === transactionId ? { ...tx, status: "approved" as const } : tx
      )
    );
    toast({
      title: "تراکنش تایید شد",
      description: `تراکنش ${userName} با موفقیت تایید و پردازش شد.`,
    });
  };

  const handleReject = (transactionId: string, userName: string) => {
    setTransactions(
      transactions.map((tx) =>
        tx.id === transactionId ? { ...tx, status: "rejected" as const } : tx
      )
    );
    toast({
      title: "تراکنش رد شد",
      description: `تراکنش ${userName} رد شد.`,
      variant: "destructive",
    });
  };

  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch =
      tx.userName.includes(searchQuery) ||
      tx.userPhone.includes(searchQuery) ||
      tx.id.includes(searchQuery);
    const matchesFilter = filterStatus === "all" || tx.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const pendingCount = transactions.filter(
    (tx) => tx.status === "pending"
  ).length;

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gold mb-2">تایید تراکنش‌ها</h1>
          <p className="text-cream/60">{pendingCount} تراکنش در انتظار تایید</p>
        </div>
      </div>

      <Card className="bg-navy/50 border-gold/20">
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cream/40" />
              <Input
                placeholder="جستجو بر اساس نام، شماره تلفن یا شناسه تراکنش..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10 bg-cream/5 border-gold/20 text-cream"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterStatus === "all" ? "default" : "outline"}
                onClick={() => setFilterStatus("all")}
                className={
                  filterStatus === "all"
                    ? "bg-gold text-navy hover:bg-gold/90"
                    : "border-gold/30 text-cream hover:bg-gold/10"
                }
              >
                همه
              </Button>
              <Button
                variant={filterStatus === "pending" ? "default" : "outline"}
                onClick={() => setFilterStatus("pending")}
                className={
                  filterStatus === "pending"
                    ? "bg-gold text-navy hover:bg-gold/90"
                    : "border-gold/30 text-cream hover:bg-gold/10"
                }
              >
                در انتظار
              </Button>
              <Button
                variant={filterStatus === "approved" ? "default" : "outline"}
                onClick={() => setFilterStatus("approved")}
                className={
                  filterStatus === "approved"
                    ? "bg-gold text-navy hover:bg-gold/90"
                    : "border-gold/30 text-cream hover:bg-gold/10"
                }
              >
                تایید شده
              </Button>
              <Button
                variant={filterStatus === "rejected" ? "default" : "outline"}
                onClick={() => setFilterStatus("rejected")}
                className={
                  filterStatus === "rejected"
                    ? "bg-gold text-navy hover:bg-gold/90"
                    : "border-gold/30 text-cream hover:bg-gold/10"
                }
              >
                رد شده
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gold/20">
                  <th className="text-right py-3 px-4 text-cream/80 font-medium">
                    شناسه
                  </th>
                  <th className="text-right py-3 px-4 text-cream/80 font-medium">
                    کاربر
                  </th>
                  <th className="text-right py-3 px-4 text-cream/80 font-medium">
                    نوع
                  </th>
                  <th className="text-right py-3 px-4 text-cream/80 font-medium">
                    وزن (گرم)
                  </th>
                  <th className="text-right py-3 px-4 text-cream/80 font-medium">
                    مبلغ کل
                  </th>
                  <th className="text-right py-3 px-4 text-cream/80 font-medium">
                    تاریخ
                  </th>
                  <th className="text-right py-3 px-4 text-cream/80 font-medium">
                    وضعیت
                  </th>
                  <th className="text-right py-3 px-4 text-cream/80 font-medium">
                    عملیات
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((tx) => (
                  <tr
                    key={tx.id}
                    className="border-b border-gold/10 hover:bg-cream/5"
                  >
                    <td className="py-4 px-4 text-cream/80 font-mono">
                      #{tx.id}
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="text-cream">{tx.userName}</p>
                        <p className="text-xs text-cream/60 font-mono">
                          {tx.userPhone}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`text-xs px-3 py-1 rounded-full ${
                          tx.type === "buy"
                            ? "bg-green-400/10 text-green-400"
                            : "bg-red-400/10 text-red-400"
                        }`}
                      >
                        {tx.type === "buy" ? "خرید" : "فروش"}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-cream">{tx.weight}</td>
                    <td className="py-4 px-4 text-cream font-mono">
                      {tx.totalAmount.toLocaleString()} ریال
                    </td>
                    <td className="py-4 px-4 text-cream/80 text-sm">
                      {tx.date}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`text-xs px-3 py-1 rounded-full ${
                          tx.status === "pending"
                            ? "bg-gold/10 text-gold"
                            : tx.status === "approved"
                            ? "bg-green-400/10 text-green-400"
                            : "bg-red-400/10 text-red-400"
                        }`}
                      >
                        {tx.status === "pending"
                          ? "در انتظار"
                          : tx.status === "approved"
                          ? "تایید شده"
                          : "رد شده"}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-gold/30 text-gold hover:bg-gold/10 bg-transparent"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-navy border-gold/20 text-cream">
                            <DialogHeader>
                              <DialogTitle className="text-gold">
                                جزئیات تراکنش #{tx.id}
                              </DialogTitle>
                              <DialogDescription className="text-cream/60">
                                اطلاعات کامل تراکنش
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 mt-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm text-cream/60">
                                    نام کاربر
                                  </p>
                                  <p className="text-cream font-medium">
                                    {tx.userName}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm text-cream/60">
                                    شماره تلفن
                                  </p>
                                  <p className="text-cream font-mono">
                                    {tx.userPhone}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm text-cream/60">
                                    نوع تراکنش
                                  </p>
                                  <p className="text-cream">
                                    {tx.type === "buy" ? "خرید" : "فروش"}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm text-cream/60">وزن</p>
                                  <p className="text-cream">{tx.weight} گرم</p>
                                </div>
                                <div>
                                  <p className="text-sm text-cream/60">
                                    قیمت هر گرم
                                  </p>
                                  <p className="text-cream font-mono">
                                    {tx.price.toLocaleString()} ریال
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm text-cream/60">
                                    مبلغ کل
                                  </p>
                                  <p className="text-gold font-bold">
                                    {tx.totalAmount.toLocaleString()} ریال
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm text-cream/60">
                                    روش پرداخت
                                  </p>
                                  <p className="text-cream">
                                    {tx.paymentMethod}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm text-cream/60">تاریخ</p>
                                  <p className="text-cream">{tx.date}</p>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        {tx.status === "pending" && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => handleApprove(tx.id, tx.userName)}
                              className="bg-green-500 hover:bg-green-600 text-white"
                            >
                              <Check className="h-4 w-4 ml-1" />
                              تایید
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleReject(tx.id, tx.userName)}
                              className="border-red-400/30 text-red-400 hover:bg-red-400/10"
                            >
                              <X className="h-4 w-4 ml-1" />
                              رد
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
