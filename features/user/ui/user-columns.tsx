// features/user/ui/user-columns.tsx

import { ColumnDef } from "@tanstack/react-table";
import { IUser } from "../model/user-type";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import ActionButtons from "./action-buttons";
import StatusActions from "./status-actions";

// این کال‌بک به جدول پاس داده میشه برای کنترل انتخاب‌ها
export const columns = (
  onSelectUser: (id: string, selected: boolean) => void,
): ColumnDef<IUser>[] => [
  {
    id: "select",
    header: () => <span>انتخاب</span>,
    cell: ({ row }) => (
      <Checkbox
        className="mr-2"
        checked={row.original.isSelected}
        onCheckedChange={(checked) => onSelectUser(row.original.id, !!checked)}
      />
    ),
  },
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
    cell: ({ row }) => {
      const type = row.getValue("type");
      return <div>{type === "General" ? "عمومی" : "همکار"}</div>;
    },
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
    accessorKey: "actions",
    header: "تغییر وضعیت کاربر",
    cell: ({ row }) => {
      const user = row.original;
      return <StatusActions userId={user.id} verify={user.verify} />;
    },
  },
  {
    accessorKey: "action",
    header: "عملیات",
    cell: ({ row }) => {
      const user = row.original;
      return <ActionButtons userId={user.id} verify={user.verify} />;
    },
  },
];
