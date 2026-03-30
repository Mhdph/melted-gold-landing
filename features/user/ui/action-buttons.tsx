"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Check, MoreVertical } from "lucide-react";
import {
  useApproveUser,
  useChangeUserRole,
  useRejectUser,
} from "@/services/user-service";
import { toast } from "sonner";

interface ActionButtonsProps {
  userId: string;
  verify: boolean;
}

function ActionButtons({ userId, verify }: ActionButtonsProps) {
  const { mutate: approveUser, isPending: isApproving } = useApproveUser();
  const { mutate: rejectUser, isPending: isRejecting } = useRejectUser();

  const { mutate: changeRole, isPending: isChangingRole } = useChangeUserRole();

  const handleApprove = (userId: string) => {
    approveUser(userId, {
      onSuccess: () => {
        toast.success("کاربر تایید شد");
      },
      onError: (err) => {
        toast.error("خطا در تایید کاربر");
      },
    });
  };

  const handleReject = (userId: string) => {
    rejectUser(userId, {
      onSuccess: () => {
        toast.success("کاربر غیر فعال شد");
      },
      onError: (err) => {
        toast.error("خطا در تغییر وضغیت کاربر");
      },
    });
  };

  const handleChangeRole = (userId: string, newType: string) => {
    changeRole(
      { userId, type: newType },
      {
        onSuccess: () => {
          // toast already handled in mutation
        },
      },
    );
  };

  return (
    <DropdownMenu dir="rtl">
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <MoreVertical />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>تغییر نقش</DropdownMenuLabel>

        <DropdownMenuItem onClick={() => handleChangeRole(userId, "General")}>
          کاربر عمومی
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => handleChangeRole(userId, "PartnerShip")}
        >
          شریک / همکار
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuLabel>وضعیت کاربر</DropdownMenuLabel>

        <DropdownMenuItem
          onClick={() => handleApprove(userId)}
          className="text-green-600 focus:text-green-700"
        >
          تایید
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleReject(userId)}
          disabled={isRejecting}
          className="text-red-600 focus:text-red-700"
        >
          عیرفعال کردن
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default ActionButtons;
