import {
  ArrowDownLeftIcon,
  ArrowUpRightIcon,
  CalendarIcon,
} from "lucide-react";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Transaction } from "./type";
import { useLastTransaction } from "@/hooks/use-get-last-transaction-websocket";

function TransactionTable({
  filteredTransactions,
}: {
  filteredTransactions: Transaction[];
}) {
  return (
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
                      <ArrowDownLeftIcon className="h-5 w-5 text-green-400" />
                    ) : (
                      <ArrowUpRightIcon className="h-5 w-5 text-red-400" />
                    )}
                  </div>
                  <div className="space-y-1 flex-1">
                    <p className="font-medium text-cream">
                      {transaction.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-cream/60">
                      <CalendarIcon className="h-4 w-4" />
                      <span>{transaction.date}</span>
                    </div>
                  </div>
                </div>

                <div className="text-left md:text-right space-y-1">
                  <p
                    className={`text-lg font-bold ${
                      transaction.amount > 0 ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {transaction.amount > 0 ? "+" : ""}
                    {transaction.amount.toLocaleString("fa-IR")} ریال
                  </p>
                  <p className="text-sm text-cream/60">
                    موجودی: {transaction.balance.toLocaleString("fa-IR")} ریال
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default TransactionTable;
