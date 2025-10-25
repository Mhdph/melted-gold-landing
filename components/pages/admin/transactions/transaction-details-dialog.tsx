import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { Transaction } from "./types";

interface TransactionDetailsDialogProps {
  transaction: Transaction;
}

export default function TransactionDetailsDialog({
  transaction,
}: TransactionDetailsDialogProps) {
  return (
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
      <DialogContent className="bg-white border-gold/20 text-cream">
        <DialogHeader>
          <DialogTitle className="text-gold">
            جزئیات تراکنش #{transaction.id}
          </DialogTitle>
          <DialogDescription className="text-cream/60">
            اطلاعات کامل تراکنش
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-cream/60">نام کاربر</p>
              <p className="text-cream font-medium">
                {transaction.User.mobile}
              </p>
            </div>
            <div>
              <p className="text-sm text-cream/60">شماره تلفن</p>
              <p className="text-cream font-mono">{transaction.User.phone}</p>
            </div>
            <div>
              <p className="text-sm text-cream/60">نوع تراکنش</p>
              <p className="text-cream">
                {transaction.type === "buy" ? "خرید" : "فروش"}
              </p>
            </div>
            <div>
              <p className="text-sm text-cream/60">وزن</p>
              <p className="text-cream">{transaction.amount} گرم</p>
            </div>
            <div>
              <p className="text-sm text-cream/60">قیمت هر گرم</p>
              <p className="text-cream font-mono">{transaction.amount} ریال</p>
            </div>
            <div>
              <p className="text-sm text-cream/60">مبلغ کل</p>
              <p className="text-gold font-bold">
                {transaction.amount.toLocaleString()} ریال
              </p>
            </div>

            <div>
              <p className="text-sm text-cream/60">تاریخ</p>
              <p className="text-cream">{transaction.createdAt}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
