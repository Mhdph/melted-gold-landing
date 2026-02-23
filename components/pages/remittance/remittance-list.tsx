import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
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
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

export default function RemittanceList({
  remittances,
  sortBy,
  filterUnit,
  onSortChange,
  onFilterChange,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}: RemittanceListProps) {
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
                    <div className="flex items-center gap-4 text-sm text-cream/60">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{remittance.receiver}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {new Date(remittance.date).toLocaleDateString(
                            "fa-IR"
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

        {/* Pagination */}
        {totalPages > 1 && onPageChange && (
          <div className="flex justify-center mt-6">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) {
                        onPageChange(currentPage - 1);
                      }
                    }}
                    className={
                      currentPage <= 1 ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          onPageChange(page);
                        }}
                        isActive={currentPage === page}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages) {
                        onPageChange(currentPage + 1);
                      }
                    }}
                    className={
                      currentPage >= totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
