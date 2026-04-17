"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import { TimeRange } from "./types";

interface PriceTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];

  timeRange: TimeRange;
  onTimeRangeChange: (value: TimeRange) => void;
}

export default function PriceTable<TData, TValue>({
  data,
  columns,
  timeRange,
  onTimeRangeChange,
}: PriceTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-hidden rounded-md border p-4 space-y-4">
      {/* FILTER HEADER */}
      <div className="flex justify-end">
        <Select
          value={timeRange}
          onValueChange={(value) => onTimeRangeChange(value as TimeRange)}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="بازه زمانی" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="today">امروز</SelectItem>
            <SelectItem value="7days">۷ روز اخیر</SelectItem>
            <SelectItem value="30days">۳۰ روز اخیر</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* TABLE */}
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((group) => (
            <TableRow key={group.id}>
              {group.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center h-24">
                نتیجه‌ای یافت نشد.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
