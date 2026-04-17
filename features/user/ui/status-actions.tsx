"use client";

import { Switch } from "@/components/ui/switch";
import { useApproveUser, useRejectUser } from "@/services/user-service";
import { toast } from "sonner";
import { useState } from "react";

interface StatusSwitchProps {
  userId: string;
  verify: boolean;
}

function StatusSwitch({ userId, verify }: StatusSwitchProps) {
  const [checked, setChecked] = useState(verify);

  const { mutate: approveUser } = useApproveUser();
  const { mutate: rejectUser } = useRejectUser();

  const handleToggle = (value: boolean) => {
    setChecked(value);

    if (value) {
      approveUser(userId, {
        onSuccess: () => toast.success("کاربر فعال شد"),
        onError: () => {
          toast.error("خطا در فعال‌سازی");
          setChecked(!value);
        },
      });
    } else {
      rejectUser(userId, {
        onSuccess: () => toast.success("کاربر غیرفعال شد"),
        onError: () => {
          toast.error("خطا در غیرفعال کردن");
          setChecked(!value);
        },
      });
    }
  };

  return (
    <div className="flex items-center gap-3">
      <Switch checked={checked} onCheckedChange={handleToggle} />
      {/* <span className="text-sm">{checked ? "فعال" : "غیرفعال"}</span> */}
    </div>
  );
}

export default StatusSwitch;
