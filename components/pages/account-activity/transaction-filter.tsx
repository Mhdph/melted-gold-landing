import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FilterIcon } from "lucide-react";

function TransactionFilter({
  filterType,
  setFilterType,
  dateFrom,
  setDateFrom,
  dateTo,
  setDateTo,
}: {
  filterType: string;
  setFilterType: (value: string) => void;
  dateFrom: string;
  setDateFrom: (value: string) => void;
  dateTo: string;
  setDateTo: (value: string) => void;
}) {
  return (
    <Card className=" border-gold/20">
      <CardHeader>
        <div className="flex items-center gap-2">
          <FilterIcon className="h-5 w-5 text-gold" />
          <CardTitle className="text-gold">فیلترها</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label className="text-cream">نوع تراکنش</Label>
            <Select
              value={filterType}
              onValueChange={(value: any) => setFilterType(value)}
            >
              <SelectTrigger className="bg-navy border-gold/30 text-cream">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">همه تراکنش‌ها</SelectItem>
                <SelectItem value="واریز">واریز</SelectItem>
                <SelectItem value="برداشت">برداشت</SelectItem>
                <SelectItem value="انتقال">انتقال</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-cream">از تاریخ</Label>
            <Input
              type="text"
              placeholder="1403/10/01"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="bg-navy border-gold/30 text-cream"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-cream">تا تاریخ</Label>
            <Input
              type="text"
              placeholder="1403/10/30"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="bg-navy border-gold/30 text-cream"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default TransactionFilter;
