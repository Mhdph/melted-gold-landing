"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IProducts } from "./type";
import { ProductRowActions } from "./product-row-actions";

export const productColumns: ColumnDef<IProducts>[] = [
  {
    accessorKey: "name",
    header: "نام",
    cell: ({ row }) => (
      <span className="text-cream/80 text-sm">{row.original.name}</span>
    ),
  },

  {
    accessorKey: "isDealActive",
    header: "وضعیت معامله",
    cell: ({ row }) => (
      <span
        className={`text-xs px-3 py-1 rounded-full ${
          row.original.isDealActive
            ? "bg-green-400/10 text-green-400"
            : "bg-red-400/10 text-red-400"
        }`}
      >
        {row.original.isDealActive ? "فعال" : "غیرفعال"}
      </span>
    ),
  },

  {
    accessorKey: "buyAmountGeneral",
    header: "مبلغ خرید کاربر",
    cell: ({ row }) =>
      new Intl.NumberFormat("fa-IR").format(row.original.buyAmountGeneral) +
      " ریال",
  },

  {
    accessorKey: "sellAmountGeneral",
    header: "مبلغ فروش کاربر",
    cell: ({ row }) =>
      new Intl.NumberFormat("fa-IR").format(row.original.sellAmountGeneral) +
      " ریال",
  },

  {
    accessorKey: "buyAmountPartnerShip",
    header: "مبلغ خرید همکار",
    cell: ({ row }) =>
      new Intl.NumberFormat("fa-IR").format(row.original.buyAmountPartnerShip) +
      " ریال",
  },

  {
    accessorKey: "sellAmountPartnerShip",
    header: "مبلغ فروش همکار",
    cell: ({ row }) =>
      new Intl.NumberFormat("fa-IR").format(
        row.original.sellAmountPartnerShip,
      ) + " ریال",
  },

  {
    id: "actions",
    header: "عملیات",
    cell: ({ row }) => <ProductRowActions product={row.original} />,
  },
];
