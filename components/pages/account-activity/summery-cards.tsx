import { Card, CardContent } from "@/components/ui/card";
import {
  ActivityIcon,
  ArrowDownLeftIcon,
  ArrowUpRightIcon,
} from "lucide-react";
import { Transaction } from "./type";

function SummeryCards({ transactions }: { transactions: Transaction[] }) {
  const totalDeposits = transactions
    .filter((t) => t.type === "واریز")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalWithdrawals = transactions
    .filter((t) => t.type === "برداشت" || t.type === "انتقال")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  return (
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
              <ActivityIcon className="h-6 w-6 text-gold" />
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
              <ArrowDownLeftIcon className="h-6 w-6 text-green-400" />
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
              <ArrowUpRightIcon className="h-6 w-6 text-red-400" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default SummeryCards;
