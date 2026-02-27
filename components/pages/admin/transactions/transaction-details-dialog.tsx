import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Eye,
  User,
  Phone,
  TrendingUp,
  TrendingDown,
  Scale,
  Calendar,
  Receipt,
  Wallet,
} from "lucide-react";
import { Transaction } from "./types";
import { Badge } from "@/components/ui/badge";

interface TransactionDetailsDialogProps {
  transaction: Transaction;
}

export default function TransactionDetailsDialog({
  transaction,
}: TransactionDetailsDialogProps) {
  const isBuy = transaction.type === "buy";
  const formattedDate = new Date(transaction.createdAt).toLocaleDateString(
    "fa-IR",
    {
      calendar: "persian",
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  const formattedTime = new Date(transaction.createdAt).toLocaleTimeString(
    "fa-IR",
    {
      hour: "2-digit",
      minute: "2-digit",
    },
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className="border-gold/30 text-gold hover:bg-gold/10 bg-transparent transition-all duration-200 hover:border-gold/50"
        >
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border-gold/30 text-slate-800 dark:text-cream shadow-2xl max-w-md">
        <DialogHeader className="border-b border-gold/20 pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-gold text-xl mt-2 font-bold flex items-center gap-2">
              <Receipt className="h-5 w-5" />
              جزئیات تراکنش
            </DialogTitle>
            <Badge
              variant={isBuy ? "default" : "destructive"}
              className={`${isBuy ? "bg-green-500/20 text-green-700 dark:text-green-400 border-green-500/30" : "bg-red-500/20 text-red-700 dark:text-red-400 border-red-500/30"}`}
            >
              {isBuy ? (
                <TrendingUp className="h-3 w-3 ml-1" />
              ) : (
                <TrendingDown className="h-3 w-3 ml-1" />
              )}
              {isBuy ? "خرید" : "فروش"}
            </Badge>
          </div>
          <DialogDescription className="text-slate-500 dark:text-cream/60 mt-2">
            شناسه تراکنش: <span className=" text-cream">#{transaction.id}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 mt-4">
          {/* User Information */}
          <div className="bg-gold/5 rounded-lg p-4 space-y-3 border border-gold/10">
            <h3 className="text-sm font-semibold text-gold mb-3 flex items-center gap-2">
              <User className="h-4 w-4" />
              اطلاعات کاربر
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-xs text-slate-500 dark:text-cream/50 flex items-center gap-1">
                  <User className="h-3 w-3" />
                  نام کاربر
                </p>
                <p className="text-sm font-medium text-slate-700 dark:text-cream bg-white dark:bg-slate-800 rounded px-2 py-1 border border-slate-200 dark:border-slate-700">
                  {transaction.User.mobile}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-slate-500 dark:text-cream/50 flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  شماره تلفن
                </p>
                <p className="text-sm  text-slate-700 dark:text-cream bg-white dark:bg-slate-800 rounded px-2 py-1 border border-slate-200 dark:border-slate-700">
                  {transaction.User.phone}
                </p>
              </div>
            </div>
          </div>

          {/* Transaction Details */}
          <div className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-700/50 rounded-lg p-4 space-y-3 border border-slate-200 dark:border-slate-700">
            <h3 className="text-sm font-semibold text-gold mb-3 flex items-center gap-2">
              <Wallet className="h-4 w-4" />
              مشخصات تراکنش
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2">
                  <Scale className="h-4 w-4 text-slate-500 dark:text-cream/50" />
                  <span className="text-sm text-slate-500 dark:text-cream/60">
                    وزن طلا
                  </span>
                </div>
                <span className="text-sm font-semibold text-slate-700 dark:text-cream">
                  {transaction.amount} گرم
                </span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-slate-200 dark:border-slate-700">
                <span className="text-sm text-slate-500 dark:text-cream/60">
                  قیمت هر گرم
                </span>
                <span className="text-sm  font-semibold text-slate-700 dark:text-cream">
                  {Number(transaction.amount).toLocaleString("fa-IR")} ریال
                </span>
              </div>

              <div className="flex justify-between items-center py-3 bg-gradient-to-r from-gold/10 to-amber-500/10 dark:from-gold/20 dark:to-amber-500/20 rounded-lg px-3 -mx-3">
                <span className="text-sm font-medium text-slate-700 dark:text-cream">
                  مبلغ کل
                </span>
                <span className="text-lg font-bold text-gold">
                  {Number(transaction.amount).toLocaleString("fa-IR")} ریال
                </span>
              </div>
            </div>
          </div>

          {/* Date Information */}
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 space-y-2 border border-slate-200 dark:border-slate-700">
            <h3 className="text-sm font-semibold text-gold flex items-center gap-2 mb-3">
              <Calendar className="h-4 w-4" />
              اطلاعات زمانی
            </h3>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500 dark:text-cream/60">
                تاریخ
              </span>
              <span className="text-sm font-medium text-slate-700 dark:text-cream bg-white dark:bg-slate-700 rounded px-3 py-1.5 border border-slate-200 dark:border-slate-600">
                {formattedDate}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500 dark:text-cream/60">
                ساعت
              </span>
              <span className="text-sm  text-slate-700 dark:text-cream">
                {formattedTime}
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
