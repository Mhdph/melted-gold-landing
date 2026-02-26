"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IUser } from "../model/user-type";
import { Badge } from "@/components/ui/badge";
import ActionButtons from "./action-buttons";

export const columns: ColumnDef<IUser>[] = [
  {
    accessorKey: "name",
    header: "نام", 
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div>
          {user.name} {user.lastName}
        </div>
      );
    },
  },
  {
    accessorKey: "mobile",
    header: "موبایل",
  }, 
  {
    accessorKey: "type",
    header: "نوع کاربر",
  },
  {
    accessorKey: "verify",
    header: "وضعیت",
    cell: ({ row }) => {
      const status = row.getValue("verify");
      return (
        <div>
          {status ? (
            <Badge variant="success">فعال</Badge>
          ) : (
            <Badge variant="destructive">غیرفعال</Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "action",
    header: "عملیات",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div>
          <ActionButtons userId={user.id} verify={user.verify} />
        </div>
      );
    },
  },
];
