import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import { useState, useEffect } from "react";
import { TransferStatus } from "@/services/remittance.service";

interface LastTransfer {
  id: string;
  userId: string;
  receiver: string;
  value: string;
  valueType: "gold" | "mony";
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface LastTransferCardProps {
  transfer: LastTransfer;
  onApprove: (transferId: string) => void;
  onReject: (transferId: string) => void;
}

export default function LastTransferCard({
  transfer,
  onApprove,
  onReject,
}: LastTransferCardProps) {
  const [isActionPending, setIsActionPending] = useState(false);

  // Reset pending state when transfer status changes (via WebSocket update)
  useEffect(() => {
    if (transfer.status !== TransferStatus.inProgress) {
      setIsActionPending(false);
    }
  }, [transfer.status]);

  if (!transfer) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatValue = (value: string, valueType: "gold" | "mony") => {
    if (valueType === "gold") {
      return `${value} گرم`;
    }
    return `${new Intl.NumberFormat("fa-IR").format(Number(value))} تومان`;
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      inProgress: {
        label: "در حال انجام",
        className: "bg-blue-100/10 text-blue-400 border-blue-400/30",
      },
      reject: {
        label: "رد شده",
        className: "bg-red-100/10 text-red-400 border-red-400/30",
      },
      success: {
        label: "موفق",
        className: "bg-green-100/10 text-green-400 border-green-400/30",
      },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || {
      label: "نامشخص",
      className: "bg-gray-100/10 text-gray-400 border-gray-400/30",
    };

    return (
      <Badge variant="outline" className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const canApproveReject =
    transfer.status === TransferStatus.inProgress && !isActionPending;

  const handleApprove = async () => {
    setIsActionPending(true);
    try {
      await onApprove(transfer.id);
    } finally {
      // Keep buttons hidden even if there's an error
      // The status will update via WebSocket
    }
  };

  const handleReject = async () => {
    setIsActionPending(true);
    try {
      await onReject(transfer.id);
    } finally {
      // Keep buttons hidden even if there's an error
      // The status will update via WebSocket
    }
  };

  return (
    <Card className="bg-white border-gold/20">
      <CardHeader>
        <CardTitle className="text-gold text-xl">
          آخرین انتقال ثبت شده
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-cream/60 mb-1">گیرنده</p>
              <p className="text-cream font-medium">{transfer.receiver}</p>
            </div>
            <div>
              <p className="text-sm text-cream/60 mb-1">نوع انتقال</p>
              <Badge
                variant="outline"
                className={
                  transfer.valueType === "gold"
                    ? "bg-yellow-100/10 text-yellow-400 border-yellow-400/30"
                    : "bg-green-100/10 text-green-400 border-green-400/30"
                }
              >
                {transfer.valueType === "gold" ? "طلا" : "پول"}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-cream/60 mb-1">مقدار</p>
              <p className="text-cream font-medium">
                {formatValue(transfer.value, transfer.valueType)}
              </p>
            </div>
            <div>
              <p className="text-sm text-cream/60 mb-1">وضعیت</p>
              {getStatusBadge(transfer.status)}
            </div>
            <div>
              <p className="text-sm text-cream/60 mb-1">شناسه کاربر</p>
              <p className="text-xs text-cream/80 font-mono">
                {transfer.userId}
              </p>
            </div>
            <div>
              <p className="text-sm text-cream/60 mb-1">تاریخ</p>
              <p className="text-cream/80 text-sm">
                {formatDate(transfer.createdAt)}
              </p>
            </div>
          </div>

          {canApproveReject && (
            <div className="flex gap-2 pt-4 border-t border-gold/10">
              <Button
                size="sm"
                onClick={handleApprove}
                disabled={isActionPending}
                className="bg-green-500 hover:bg-green-600 text-white flex-1 disabled:opacity-50"
              >
                <Check className="h-4 w-4 ml-1" />
                {isActionPending ? "در حال تایید..." : "تایید"}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleReject}
                disabled={isActionPending}
                className="border-red-400/30 text-red-400 hover:bg-red-400/10 flex-1 disabled:opacity-50"
              >
                <X className="h-4 w-4 ml-1" />
                {isActionPending ? "در حال رد..." : "رد"}
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
