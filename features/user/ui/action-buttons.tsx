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
import { useApproveUser, useChangeUserRole } from "@/services/user-service";
import { toast } from "sonner";

interface ActionButtonsProps {
  userId: string;
  verify: boolean;
}

function ActionButtons({ userId, verify }: ActionButtonsProps) {
  const { mutate: approveUser, isPending: isApproving } = useApproveUser();
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
    <DropdownMenu>
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

        {verify === false && (
          <>
            <DropdownMenuLabel>تایید کاربر</DropdownMenuLabel>

            <DropdownMenuItem
              onClick={() => handleApprove(userId)}
              className="text-green-600 focus:text-green-700"
            >
              <Check className="h-4 w-4 ml-2" />
              تایید
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default ActionButtons;
