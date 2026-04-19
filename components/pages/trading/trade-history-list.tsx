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
import { getStatusClasses, getStatusText } from "../admin/transactions/utils";
import { useState } from "react";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";
import { Button } from "@/components/ui/button";
import PaginationControls from "../price-changes/pagination-controls";
interface TradeHistoryListProps {
  trades: Trade[];
}

export default function TradeHistoryList({ trades }: TradeHistoryListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [dateRange, setDateRange] = useState({
    from: "",
    to: "",
  });

  const [finalFilter, setFinalFilter] = useState<{
    gte?: string;
    lte?: string;
  }>();

  const applyFilter = () => {
    if (!dateRange.from || !dateRange.to) return;

    setFinalFilter({
      gte: new Date(dateRange.from).toISOString(),
      lte: new Date(dateRange.to).toISOString(),
    });

    setCurrentPage(1);
  };

  const { data: transactions, isLoading } = useGetUserTransactions({
    page: currentPage,
    limit: pageSize,
    createdAt: finalFilter,
  });
  const meta = transactions?.meta || {
    page: 1,
    limit: 10,
    itemCount: 0,
    hasNextPage: false,
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

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
          <div className="flex gap-4 items-end">
            <div className="flex flex-col">
              <label className="text-sm text-cream/80 mb-1">از تاریخ</label>
              <DatePicker
                calendar={persian}
                locale={persian_fa}
                inputClass="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm shadow-none placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:border-slate-700 dark:text-slate-50 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900"
                value={dateRange.from ? new Date(dateRange.from) : null}
                onChange={(d) => {
                  if (!d) return;
                  setDateRange((prev) => ({
                    ...prev,
                    from: d.toDate()?.toISOString(),
                  }));
                }}
                className="bg-white text-black rounded-md p-2"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-cream/80 mb-1">تا تاریخ</label>
              <DatePicker
                inputClass="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm shadow-none placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:border-slate-700 dark:text-slate-50 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900"
                calendar={persian}
                locale={persian_fa}
                value={dateRange.to ? new Date(dateRange.to) : null}
                onChange={(d) => {
                  if (!d) return;
                  setDateRange((prev) => ({
                    ...prev,
                    to: d.toDate()?.toISOString(),
                  }));
                }}
                className="bg-white text-black rounded-md p-2"
              />
            </div>

            <Button className=" text-black px-5 py-2" onClick={applyFilter}>
              جستجو
            </Button>
          </div>

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
                      <div>
                        <span
                          className={`text-xs px-3 py-1 rounded-full ${getStatusClasses(
                            trade,
                          )}`}
                        >
                          {getStatusText(trade)}
                        </span>{" "}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-cream/60">
                      <div className="flex items-center gap-1">
                        <Weight className="h-4 w-4 hidden md:inline" />
                        <span>{trade.weight.toLocaleString("fa-IR")} گرم</span>
                      </div>

                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 hidden md:inline" />
                        <span>
                          {new Date(trade.createdAt).toLocaleDateString(
                            "fa-IR",
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
        {meta?.itemCount > 0 && (
          <PaginationControls
            meta={meta}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        )}
      </CardContent>
    </Card>
  );
}
