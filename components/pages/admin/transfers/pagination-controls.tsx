import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationControlsProps {
  meta: {
    page: number;
    limit: number;
    itemCount: number;
    hasNextPage: boolean;
  };
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export default function PaginationControls({
  meta,
  currentPage,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: PaginationControlsProps) {
  const totalPages = Math.ceil(meta.itemCount / meta.limit);

  return (
    <div className="flex items-center justify-between px-6 py-4 border-t border-gold/20 bg-white rounded-md">
      <div className="flex items-center gap-2 text-cream/60 text-sm">
        <span>نمایش</span>
        <Select
          value={pageSize.toString()}
          onValueChange={(value) => onPageSizeChange(parseInt(value))}
        >
          <SelectTrigger className="w-20 bg-navy border-gold/30 text-cream">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectContent>
        </Select>
        <span>از {meta.itemCount} رکورد</span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-md bg-navy border border-gold/30 text-cream disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gold/10 transition-colors"
        >
          <ChevronRight className="h-4 w-4" />
        </button>

        <span className="px-3 py-1 text-cream text-sm">
          صفحه {currentPage} از {totalPages}
        </span>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!meta.hasNextPage}
          className="p-2 rounded-md bg-navy border border-gold/30 text-cream disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gold/10 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
