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
import { SortBy, FilterUnit } from "./types";

interface RemittanceListProps {
  remittances: Remittance[];
  sortBy: SortBy;
  filterUnit: FilterUnit;
  onSortChange: (value: SortBy) => void;
  onFilterChange: (value: FilterUnit) => void;
}

export default function RemittanceList({
  remittances,
  sortBy,
  filterUnit,
  onSortChange,
  onFilterChange,
}: RemittanceListProps) {
  return (
    <Card className="bg-white border-gold/20">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle className="text-gold">تاریخچه حواله‌ها</CardTitle>
            <CardDescription className="text-cream/60">
              مشاهده و مدیریت حواله‌های ثبت شده
            </CardDescription>
          </div>

          <RemittanceFilters
            sortBy={sortBy}
            filterUnit={filterUnit}
            onSortChange={onSortChange}
            onFilterChange={onFilterChange}
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
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-cream">
                        {remittance.amount.toLocaleString("fa-IR")}
                      </span>
                      <span className="text-sm text-cream/60">
                        {remittance.unit}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-cream/60">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{remittance.recipient}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{remittance.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <Badge
                  variant={
                    remittance.status === "تکمیل شده" ? "default" : "secondary"
                  }
                  className={
                    remittance.status === "تکمیل شده"
                      ? "bg-green-500/20 text-green-400 border-green-500/30"
                      : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                  }
                >
                  {remittance.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
