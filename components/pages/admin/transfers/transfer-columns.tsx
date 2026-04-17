"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CheckCircle, XCircle, MoreHorizontal } from "lucide-react";
import {
  Transfer,
  TransferStatus,
  useUpdateTransferStatus,
} from "@/services/remittance.service";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export const transferColumns: ColumnDef<Transfer>[] = [
  {
    accessorKey: "receiver",
    header: "گیرنده",
    cell: ({ row }) => row.original.receiver,
  },
  {
    accessorKey: "valueType",
    header: "نوع انتقال",
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className={
          row.original.valueType === "gold"
            ? "bg-yellow-100/10 text-yellow-400 border-yellow-400/30"
            : "bg-green-100/10 text-green-400 border-green-400/30"
        }
      >
        {row.original.valueType === "gold" ? "طلا" : "پول"}
      </Badge>
    ),
  },
  {
    accessorKey: "value",
    header: "مقدار",
    cell: ({ row }) => {
      const t = row.original;
      return t.valueType === "gold" ? `${t.value} گرم` : `${t.value} تومان`;
    },
  },
  {
    accessorKey: "status",
    header: "وضعیت",
    cell: ({ row }) => {
      const s = row.original.status;

      const m = {
        inProgress: {
          label: "در حال انجام",
          class: "bg-blue-100/10 text-blue-400 border-blue-400/30",
        },
        reject: {
          label: "رد شده",
          class: "bg-red-100/10 text-red-400 border-red-400/30",
        },
        success: {
          label: "موفق",
          class: "bg-green-100/10 text-green-400 border-green-400/30",
        },
      }[s];

      return <Badge className={m.class}>{m.label}</Badge>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "تاریخ",
    cell: ({ row }) => {
      const d = new Date(row.original.createdAt);
      return d.toLocaleString("fa-IR");
    },
  },

  // ⭐ عملیات (Approve/Reject)
  {
    id: "actions",
    header: "عملیات",
    cell: ({ row }) => <TransferRowActions transfer={row.original} />,
  },
];

function TransferRowActions({ transfer }: { transfer: Transfer }) {
  const queryClient = useQueryClient();
  const mutation = useUpdateTransferStatus();

  const update = async (status: TransferStatus) => {
    toast.loading("در حال به‌روزرسانی...", {
      id: `t-${transfer.id}`,
    });

    await mutation.mutateAsync({
      id: transfer.id,
      status,
    });

    queryClient.invalidateQueries({ queryKey: ["transfers"] });
    queryClient.invalidateQueries({ queryKey: ["user-transfers"] });

    toast.success("به‌روزرسانی شد", {
      id: `t-${transfer.id}`,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="bg-white border-gold/20">
        {transfer.status !== "success" && (
          <DropdownMenuItem
            onClick={() => update(TransferStatus.success)}
            className="text-green-600"
          >
            <CheckCircle className="mr-2 h-4 w-4" /> تأیید انتقال
          </DropdownMenuItem>
        )}

        {transfer.status !== "reject" && (
          <DropdownMenuItem
            onClick={() => update(TransferStatus.reject)}
            className="text-red-600"
          >
            <XCircle className="mr-2 h-4 w-4" /> رد انتقال
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
