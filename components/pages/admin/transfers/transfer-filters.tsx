import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";

interface TransferFiltersProps {
  applyDateFilter: () => void;
  dateRange: {
    from?: string | undefined;
    to?: string | undefined;
  };
  setDateRange: Dispatch<
    SetStateAction<{
      from?: string;
      to?: string;
    }>
  >;
}
export default function TransferFilters({
  applyDateFilter,
  dateRange,
  setDateRange,
}: TransferFiltersProps) {
  return (
    <div className="flex flex-col gap-4 p-4 bg-white dark:bg-slate-800 rounded-md border border-gold/20">
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

        <Button className=" text-black px-5 py-2" onClick={applyDateFilter}>
          جستجو
        </Button>
      </div>
    </div>
  );
}
