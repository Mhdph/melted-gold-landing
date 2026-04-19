import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { Calendar, User, Weight } from "lucide-react";
import { Remittance } from "./types";
import RemittanceFilters from "./remittance-filters";
import { Dispatch, SetStateAction, useState } from "react";

interface RemittanceListProps {
  remittances: Remittance[];
  setFinalFilter: Dispatch<SetStateAction<string>>;
  refetch: any;
}

export default function RemittanceList({
  remittances,
  setFinalFilter,
  refetch,
}: RemittanceListProps) {
  const [dateRange, setDateRange] = useState<{
    from?: string;
    to?: string;
  }>({});

  const applyDateFilter = () => {
    if (dateRange.from && dateRange.to) {
      setFinalFilter(
        JSON.stringify({
          createdAt: {
            gte: dateRange.from,
            lte: dateRange.to,
          },
        }),
      );
    } else {
      setFinalFilter("{}");
    }

    refetch();
  };

  return (
    <Card className="bg-white dark:bg-slate-800 border-gold/20">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle className="text-gold">تاریخچه حواله‌ها</CardTitle>
            <CardDescription className="text-cream/60">
              مشاهده و مدیریت حواله‌های ثبت شده
            </CardDescription>
          </div>

          <RemittanceFilters
            applyDateFilter={applyDateFilter}
            dateRange={dateRange}
            setDateRange={setDateRange}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {remittances.map((remittance) => (
            <div
              key={remittance.id}
              className="p-4 rounded-lg bg-navy border border-gold/20 hover:border-gold/40 transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <Weight className="h-5 w-5 text-gold" />
                  </div>
                  <div className="space-y-1">
                    <Badge
                      variant={
                        remittance.valueType === "gold"
                          ? "default"
                          : "secondary"
                      }
                      className={
                        remittance.valueType === "gold"
                          ? "bg-green-500/20 text-green-400 border-green-500/30"
                          : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                      }
                    >
                      {remittance.value +
                        " " +
                        (remittance.valueType === "gold" ? "گرم طلا" : "ریال")}
                    </Badge>
                    <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-cream/60">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{remittance.receiver}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {new Date(remittance.date).toLocaleDateString(
                            "fa-IR",
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
