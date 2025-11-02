import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { getStatusText, getStatusClasses, isPending } from "./utils";

interface LastTransaction {
  id: string;
  userId: string;
  type: "buy" | "sell";
  amount: string;
  weight: number;
  status: string;
  createdAt: string;
  description?: string;
  livePrice?: string;
}

interface LastTransactionCardProps {
  transaction: LastTransaction | null;
  onApprove: (transactionId: string, userName: string) => void;
  onReject: (transactionId: string, userName: string) => void;
}

export default function LastTransactionCard({
  transaction,
  onApprove,
  onReject,
}: LastTransactionCardProps) {
  if (!transaction) return null;

  // Convert amount string to number for display
  const amountNumber = parseFloat(transaction.amount);

  console.log("transaction", transaction);

  // Create a transaction-like object for status utilities
  const statusObject = {
    id: transaction.id,
    type: transaction.type,
    status: transaction.status,
    accept:
      transaction.status === "inProgress"
        ? false
        : transaction.status === "success"
        ? true
        : null,
    amount: amountNumber,
    weight: transaction.weight,
    createdAt: transaction.createdAt,
    User: { mobile: transaction.userId } as any, // Placeholder for type compatibility
  };

  const canApproveReject = isPending(statusObject as any);

  return (
    <Card className="bg-white border-gold/20">
      <CardHeader>
        <CardTitle className="text-gold text-xl">
          آخرین تراکنش ثبت شده
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-cream/60 mb-1">نوع تراکنش</p>
              <span
                className={`text-xs px-3 py-1 rounded-full inline-block ${
                  transaction.type === "buy"
                    ? "bg-green-400/10 text-green-400"
                    : "bg-red-400/10 text-red-400"
                }`}
              >
                {transaction.type === "buy" ? "خرید" : "فروش"}
              </span>
            </div>
            <div>
              <p className="text-sm text-cream/60 mb-1">وزن (گرم)</p>
              <p className="text-cream font-mono">{transaction.weight}</p>
            </div>
            <div>
              <p className="text-sm text-cream/60 mb-1">مبلغ کل</p>
              <p className="text-cream">
                {amountNumber.toLocaleString("fa-IR")} تومان
              </p>
            </div>
            {transaction.livePrice && (
              <div>
                <p className="text-sm text-cream/60 mb-1">قیمت زنده هر گرم</p>
                <p className="text-cream font-mono">
                  {new Intl.NumberFormat("fa-IR").format(
                    Number(transaction.livePrice)
                  )}{" "}
                </p>
              </div>
            )}
            <div>
              <p className="text-sm text-cream/60 mb-1">تاریخ</p>
              <p className="text-cream/80 text-sm">
                {new Date(transaction.createdAt).toLocaleDateString("fa-IR")}
              </p>
            </div>
            <div>
              <p className="text-sm text-cream/60 mb-1">وضعیت</p>
              <span
                className={`text-xs px-3 py-1 rounded-full inline-block ${getStatusClasses(
                  statusObject as any
                )}`}
              >
                {getStatusText(statusObject as any)}
              </span>
            </div>
            {transaction.description && (
              <div>
                <p className="text-sm text-cream/60 mb-1">توضیحات</p>
                <p className="text-cream/80 text-sm">
                  {transaction.description}
                </p>
              </div>
            )}
          </div>

          {canApproveReject && (
            <div className="flex gap-2 pt-4 border-t border-gold/10">
              <Button
                size="sm"
                onClick={() => onApprove(transaction.id, transaction.userId)}
                className="bg-green-500 hover:bg-green-600 text-white flex-1"
              >
                <Check className="h-4 w-4 ml-1" />
                تایید
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onReject(transaction.id, transaction.userId)}
                className="border-red-400/30 text-red-400 hover:bg-red-400/10 flex-1"
              >
                <X className="h-4 w-4 ml-1" />
                رد
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
