"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const transactions = [
  {
    id: 1,
    type: "buy",
    amount: 25,
    price: 2840000,
    date: "۱۴۰۳/۱۲/۲۰",
    time: "۱۴:۳۰",
  },
  {
    id: 2,
    type: "sell",
    amount: 10,
    price: 2855000,
    date: "۱۴۰۳/۱۲/۱۹",
    time: "۱۰:۱۵",
  },
  {
    id: 3,
    type: "buy",
    amount: 50,
    price: 2830000,
    date: "۱۴۰۳/۱۲/۱۸",
    time: "۱۶:۴۵",
  },
  {
    id: 4,
    type: "buy",
    amount: 15,
    price: 2825000,
    date: "۱۴۰۳/۱۲/۱۷",
    time: "۱۱:۲۰",
  },
  {
    id: 5,
    type: "sell",
    amount: 20,
    price: 2850000,
    date: "۱۴۰۳/۱۲/۱۶",
    time: "۰۹:۳۰",
  },
];

export function TransactionHistory() {
  return (
    <Card className="bg-[#fdf4e0] border border-[#dcd3bc]">
      <CardHeader>
        <CardTitle className="text-gold text-xl">تاریخچه معاملات</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between p-4 bg-navy/80 rounded-lg border border-gold/20 hover:border-gold/40 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`p-2 rounded-full ${
                    tx.type === "buy" ? "bg-green-600/20" : "bg-red-600/20"
                  }`}
                >
                  {tx.type === "buy" ? (
                    <ArrowDownRight className="h-5 w-5 text-green-400" />
                  ) : (
                    <ArrowUpRight className="h-5 w-5 text-red-400" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge
                      variant={tx.type === "buy" ? "default" : "destructive"}
                      className="text-xs"
                    >
                      {tx.type === "buy" ? "خرید" : "فروش"}
                    </Badge>
                    <span className="text-cream font-bold">
                      {tx.amount.toLocaleString("fa-IR")} گرم
                    </span>
                  </div>
                  <p className="text-sm text-cream/60">
                    {tx.date} - {tx.time}
                  </p>
                </div>
              </div>
              <div className="text-left">
                <p className="text-gold font-bold">
                  {tx.price.toLocaleString("fa-IR")} تومان
                </p>
                <p className="text-sm text-cream/60">قیمت هر گرم</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
