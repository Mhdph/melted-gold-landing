import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import { FilterStatus } from "./types";

interface TransferFiltersProps {
  searchQuery: string;
  filterStatus: FilterStatus;
  onSearchChange: (query: string) => void;
  onFilterChange: (status: FilterStatus) => void;
  onClearFilters: () => void;
}

export default function TransferFilters({
  searchQuery,
  filterStatus,
  onSearchChange,
  onFilterChange,
  onClearFilters,
}: TransferFiltersProps) {
  return (
    <Card className="bg-white border-gold/20">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium text-cream/80 mb-2">
              جستجو در گیرندگان
            </label>
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cream/40 h-4 w-4" />
              <Input
                type="text"
                placeholder="نام گیرنده را وارد کنید..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pr-10 bg-navy border-gold/30 text-cream placeholder:text-cream/40"
              />
            </div>
          </div>

          <div className="sm:w-48">
            <label className="block text-sm font-medium text-cream/80 mb-2">
              نوع انتقال
            </label>
            <Select
              value={filterStatus}
              onValueChange={(value: FilterStatus) => onFilterChange(value)}
            >
              <SelectTrigger className="bg-navy border-gold/30 text-cream">
                <SelectValue placeholder="انتخاب کنید" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">همه</SelectItem>
                <SelectItem value="gold">طلا</SelectItem>
                <SelectItem value="mony">پول</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={onClearFilters}
              variant="outline"
              className="border-gold/30 text-cream hover:bg-gold/10"
            >
              <Filter className="h-4 w-4 ml-2" />
              پاک کردن فیلترها
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
