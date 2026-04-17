"use client";

import { ColumnDef } from "@tanstack/react-table";
import { PriceData } from "./types";
import { TrendingUp, TrendingDown, Clock } from "lucide-react";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("fa-IR", {
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const priceColumns: ColumnDef<PriceData>[] = [
  {
    accessorKey: "createdAt",
    header: "زمان",
    cell: ({ row }) => (
      <div className="flex items-center gap-2 text-cream">
        <Clock className="h-4 w-4 text-cream/60" />
        <span>{formatDate(row.original.createdAt)}</span>
      </div>
    ),
  },

  {
    accessorKey: "buy",
    header: "قیمت خرید",
    cell: ({ row }) => (
      <span className="text-green-400 font-medium">
        {row.original.buy.toLocaleString("fa-IR")} ریال
      </span>
    ),
  },

  {
    accessorKey: "sell",
    header: "قیمت فروش",
    cell: ({ row }) => (
      <span className="text-red-400 font-medium">
        {row.original.sell.toLocaleString("fa-IR")} ریال
      </span>
    ),
  },

  {
    accessorKey: "percentageChange",
    header: "تغییرات (%)",
    cell: ({ row }) => {
      const change = parseFloat(row.original.percentageChange);
      return (
        <div
          className={`flex items-center gap-1 ${
            change >= 0 ? "text-green-400" : "text-red-400"
          }`}
        >
          {change >= 0 ? (
            <TrendingUp className="h-4 w-4" />
          ) : (
            <TrendingDown className="h-4 w-4" />
          )}
          <span className="font-bold">
            {change >= 0 ? "+" : ""}
            {change.toLocaleString("fa-IR")}%
          </span>
        </div>
      );
    },
  },

  {
    id: "chart",
    header: "نمودار",
    cell: ({ row }) => {
      const change = parseFloat(row.original.percentageChange);

      return (
        <div className="flex items-center gap-1 h-8">
          {Array.from({ length: 10 }).map((_, i) => {
            const height = Math.abs(change) * 8 + Math.random() * 15;

            return (
              <div
                key={i}
                className={`w-1 rounded-full ${
                  change >= 0 ? "bg-green-400/50" : "bg-red-400/50"
                }`}
                style={{ height: `${Math.min(height, 100)}%` }}
              />
            );
          })}
        </div>
      );
    },
  },
];
