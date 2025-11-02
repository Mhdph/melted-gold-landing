import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  Weight,
  DollarSign,
} from "lucide-react";
import { Trade } from "./types";
import { useGetUserTransactions } from "@/services/trade-service";

interface TradeHistoryListProps {
  trades: Trade[];
}

export default function TradeHistoryList({ trades }: TradeHistoryListProps) {
  const {
    data: transactions,
    isLoading,
    isError,
    error,
  } = useGetUserTransactions();

  console.log(transactions);
  return (
    <Card className="border-gold/20">
      <CardHeader>
        <CardTitle className="text-gold">تاریخچه معاملات</CardTitle>
        <CardDescription className="text-cream/60">
          مشاهده معاملات انجام شده
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {transactions?.data.map((trade) => (
            <div
              key={trade.id}
              className="p-4 rounded-lg bg-navy border border-gold/20 hover:border-gold/40 transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div
                    className={`w-10 h-10 hidden rounded-lg md:flex items-center justify-center flex-shrink-0 ${
                      trade.type === "buy" ? "bg-green-500/10" : "bg-red-500/10"
                    }`}
                  >
                    {trade.type === "buy" ? (
                      <TrendingUp className="h-5 w-5 text-green-400" />
                    ) : (
                      <TrendingDown className="h-5 w-5 text-red-400" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          trade.type === "buy" ? "default" : "destructive"
                        }
                        className={
                          trade.type === "buy"
                            ? "bg-green-500/20 text-green-400 border-green-500/30"
                            : "bg-red-500/20 text-red-400 border-red-500/30"
                        }
                      >
                        {trade.type}
                      </Badge>
                      <Badge
                        variant={
                          trade.accept === true ? "default" : "secondary"
                        }
                        className={
                          trade.accept === true
                            ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                            : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                        }
                      >
                        {trade.accept ? "تکمیل شده" : "در انتظار"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-cream/60">
                      <div className="flex items-center gap-1">
                        <Weight className="h-4 w-4 hidden md:inline" />
                        <span>{trade.weight.toLocaleString("fa-IR")} گرم</span>
                      </div>
                      {/* <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4 hidden md:inline" />
                        <span>
                          {trade.livePrice.toLocaleString("fa-IR")} ریال/گرم
                        </span>
                      </div> */}
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 hidden md:inline" />
                        <span>
                          {new Date(trade.createdAt).toLocaleDateString(
                            "fa-IR"
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-left md:text-right">
                  <p className="text-lg font-bold  text-gold">
                    {new Intl.NumberFormat("fa-IR").format(trade.amount)} ریال
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
