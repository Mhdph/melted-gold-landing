"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Transaction } from "./types";
import TransactionDetailsDialog from "./transaction-details-dialog";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { getStatusText, getStatusClasses, isPending } from "./utils";
import { Badge } from "@/components/ui/badge";

export function transactionColumns(
  onApprove: (id: string, userMobile: string) => void,
  onReject: (id: string, userMobile: string) => void,
): ColumnDef<Transaction>[] {
  return [
    {
      accessorKey: "user",
      header: "کاربر",
      cell: ({ row }) => {
        const tx = row.original;
        return (
          <div className="text-xs text-cream/60 font-mono">
            {tx.user.mobile}-{tx.user.name + " " + tx.user.lastName}
          </div>
        );
      },
    },

    {
      accessorKey: "type",
      header: "نوع تراکنش",
      cell: ({ row }) => {
        const tx = row.original;
        const typeClass =
          tx.type === "buy"
            ? "bg-green-400/10 text-green-400"
            : "bg-red-400/10 text-red-400";

        return (
          <span className={`text-xs px-3 py-1 rounded-full ${typeClass}`}>
            {tx.type === "buy" ? "خرید" : "فروش"}
          </span>
        );
      },
    },

    {
      accessorKey: "weight",
      header: "گرم/تعداد",
      cell: ({ row }) => (
        <p className="text-xs text-cream/60 font-mono">{row.original.weight}</p>
      ),
    },

    {
      accessorKey: "amount",
      header: "مبلغ کل",
      cell: ({ row }) => (
        <span className="text-cream">
          {new Intl.NumberFormat("fa-IR").format(row.original.amount)} ریال
        </span>
      ),
    },

    {
      accessorKey: "createdAt",
      header: "تاریخ",
      cell: ({ row }) => {
        const d = new Date(row.original.createdAt);
        return (
          <span className="text-cream/80 text-sm">
            {d.toLocaleDateString("fa-IR")}
          </span>
        );
      },
    },

    {
      accessorKey: "status",
      header: "وضعیت",
      cell: ({ row }) => {
        const tx = row.original;

        return (
          <Badge
            className={`text-xs px-3 py-1 rounded-full ${getStatusClasses(tx)}`}
          >
            {getStatusText(tx)}
          </Badge>
        );
      },
    },

    {
      id: "actions",
      header: "تایید/رد",
      cell: ({ row }) => {
        const tx = row.original;

        return (
          <div className="flex gap-2">
            <TransactionDetailsDialog transaction={tx} />

            <>
              <Button
                size="sm"
                onClick={() => onApprove(tx.id, tx.user.mobile)}
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                <Check className="h-4 w-4 ml-1" />
                تایید
              </Button>

              <Button
                size="sm"
                variant="outline"
                onClick={() => onReject(tx.id, tx.user.mobile)}
                className="border-red-400/30 text-red-400 hover:bg-red-400/10"
              >
                <X className="h-4 w-4 ml-1" />
                رد
              </Button>
            </>
          </div>
        );
      },
    },
  ];
}
