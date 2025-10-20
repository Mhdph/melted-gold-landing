import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SortBy, FilterUnit } from "./types";

interface RemittanceFiltersProps {
  sortBy: SortBy;
  filterUnit: FilterUnit;
  onSortChange: (value: SortBy) => void;
  onFilterChange: (value: FilterUnit) => void;
}

export default function RemittanceFilters({
  sortBy,
  filterUnit,
  onSortChange,
  onFilterChange,
}: RemittanceFiltersProps) {
  return (
    <div className="flex gap-2">
      <Select value={sortBy} onValueChange={onSortChange}>
        <SelectTrigger className="w-[140px] bg-navy border-gold/30 text-cream">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="date">مرتب‌سازی: تاریخ</SelectItem>
          <SelectItem value="amount">مرتب‌سازی: مقدار</SelectItem>
        </SelectContent>
      </Select>

      <Select value={filterUnit} onValueChange={onFilterChange}>
        <SelectTrigger className="w-[140px] bg-navy border-gold/30 text-cream">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">همه واحدها</SelectItem>
          <SelectItem value="گرم طلا">گرم طلا</SelectItem>
          <SelectItem value="ریال">ریال</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
