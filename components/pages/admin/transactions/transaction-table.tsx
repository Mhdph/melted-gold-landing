import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { Transaction } from "./types";
import TransactionDetailsDialog from "./transaction-details-dialog";

interface TransactionTableProps {
  transactions: Transaction[];
  onApprove: (transactionId: string, userName: string) => void;
  onReject: (transactionId: string, userName: string) => void;
}

export default function TransactionTable({
  transactions,
  onApprove,
  onReject,
}: TransactionTableProps) {
  return (
    <Card className="bg-white border-gold/20">
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gold/20">
                <th className="text-right py-3 px-4 text-cream/80 font-medium">
                  کاربر
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
                  تایید/رد
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr
                  key={tx.id}
                  className="border-b border-gold/10 hover:bg-cream/5"
                >
                  <td className="py-4 px-4">
                    <div>
                      <p className="text-xs text-cream/60 font-mono">
                        {tx.User.mobile}
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
                  <td className="py-4 px-4 text-cream">{tx.amount}</td>
                  <td className="py-4 px-4 text-cream font-mono">
                    {tx.amount.toLocaleString()} ریال
                  </td>
                  <td className="py-4 px-4 text-cream/80 text-sm">
                    {tx.createdAt}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`text-xs px-3 py-1 rounded-full ${
                        tx.accept === false
                          ? "bg-gold/10 text-gold"
                          : tx.accept === true
                          ? "bg-green-400/10 text-green-400"
                          : "bg-red-400/10 text-red-400"
                      }`}
                    >
                      {tx.accept === false
                        ? "در انتظار"
                        : tx.accept === true
                        ? "تایید شده"
                        : "رد شده"}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex gap-2">
                      <TransactionDetailsDialog transaction={tx} />
                      {tx.accept === false && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => onApprove(tx.id, tx.User.mobile)}
                            className="bg-green-500 hover:bg-green-600 text-white"
                          >
                            <Check className="h-4 w-4 ml-1" />
                            تایید
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onReject(tx.id, tx.User.mobile)}
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
  );
}
