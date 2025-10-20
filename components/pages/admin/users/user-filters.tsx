import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { FilterStatus } from "./types";

interface UserFiltersProps {
  searchQuery: string;
  filterStatus: FilterStatus;
  onSearchChange: (value: string) => void;
  onFilterChange: (status: FilterStatus) => void;
}

export default function UserFilters({
  searchQuery,
  filterStatus,
  onSearchChange,
  onFilterChange,
}: UserFiltersProps) {
  return (
    <Card className="bg-navy/50 border-gold/20">
      <CardHeader>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cream/40" />
            <Input
              placeholder="جستجو بر اساس نام، شماره تلفن یا ایمیل..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pr-10 bg-cream/5 border-gold/20 text-cream"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filterStatus === "all" ? "default" : "outline"}
              onClick={() => onFilterChange("all")}
              className={
                filterStatus === "all"
                  ? "bg-gold text-navy hover:bg-gold/90"
                  : "border-gold/30 text-cream hover:bg-gold/10"
              }
            >
              همه
            </Button>
            <Button
              variant={filterStatus === "pending" ? "default" : "outline"}
              onClick={() => onFilterChange("pending")}
              className={
                filterStatus === "pending"
                  ? "bg-gold text-navy hover:bg-gold/90"
                  : "border-gold/30 text-cream hover:bg-gold/10"
              }
            >
              در انتظار
            </Button>
            <Button
              variant={filterStatus === "approved" ? "default" : "outline"}
              onClick={() => onFilterChange("approved")}
              className={
                filterStatus === "approved"
                  ? "bg-gold text-navy hover:bg-gold/90"
                  : "border-gold/30 text-cream hover:bg-gold/10"
              }
            >
              تایید شده
            </Button>
            <Button
              variant={filterStatus === "rejected" ? "default" : "outline"}
              onClick={() => onFilterChange("rejected")}
              className={
                filterStatus === "rejected"
                  ? "bg-gold text-navy hover:bg-gold/90"
                  : "border-gold/30 text-cream hover:bg-gold/10"
              }
            >
              رد شده
            </Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
