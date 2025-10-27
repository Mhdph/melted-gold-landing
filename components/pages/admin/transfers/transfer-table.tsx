import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Transfer,
  TransferStatus,
  useUpdateTransferStatus,
} from "@/services/remittance.service";
import { CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import {
  transferStatusUpdateSchema,
  TransferStatusUpdateFormData,
} from "./transfer-status-form-schema";

interface TransferTableProps {
  transfers: Transfer[];
  onTransferUpdate?: () => void;
}

export default function TransferTable({
  transfers,
  onTransferUpdate,
}: TransferTableProps) {
  const queryClient = useQueryClient();
  const updateTransferStatusMutation = useUpdateTransferStatus();

  // Initialize React Hook Form with Zod resolver
  const form = useForm<TransferStatusUpdateFormData>({
    resolver: zodResolver(transferStatusUpdateSchema),
    defaultValues: {
      transferId: "",
      status: TransferStatus.inProgress,
    },
  });

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

  const formatValue = (value: number, valueType: "gold" | "mony") => {
    if (valueType === "gold") {
      return `${value} گرم`;
    }
    return `${value} تومان`;
  };

  const getStatusBadge = (status: TransferStatus) => {
    const statusConfig = {
      [TransferStatus.inProgress]: {
        label: "در حال انجام",
        className: "bg-blue-100/10 text-blue-400 border-blue-400/30",
      },
      [TransferStatus.reject]: {
        label: "رد شده",
        className: "bg-red-100/10 text-red-400 border-red-400/30",
      },
      [TransferStatus.success]: {
        label: "موفق",
        className: "bg-green-100/10 text-green-400 border-green-400/30",
      },
    };

    const config = statusConfig[status];
    return (
      <Badge variant="outline" className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const handleStatusUpdate = async (
    transferId: string,
    newStatus: TransferStatus
  ) => {
    try {
      // Set form values and trigger validation
      form.setValue("transferId", transferId);
      form.setValue("status", newStatus);

      // Validate the form data
      const isValid = await form.trigger();

      if (!isValid) {
        const errors = form.formState.errors;
        toast.error(
          "داده‌های نامعتبر: " +
            Object.values(errors)
              .map((e) => e?.message)
              .join(", ")
        );
        return;
      }

      // Get validated form data
      const formData = form.getValues();

      // Show loading toast
      toast.loading("در حال به‌روزرسانی وضعیت...", {
        id: `update-${transferId}`,
      });

      await updateTransferStatusMutation.mutateAsync({
        id: formData.transferId,
        status: formData.status,
      });

      // Manually invalidate queries to refresh the UI
      await queryClient.invalidateQueries({ queryKey: ["transfers"] });
      await queryClient.invalidateQueries({ queryKey: ["user-transfers"] });

      // Notify parent component
      if (onTransferUpdate) {
        onTransferUpdate();
      }

      // Show success toast
      toast.success("وضعیت انتقال با موفقیت به‌روزرسانی شد", {
        id: `update-${transferId}`,
      });
    } catch (error) {
      // Show error toast
      toast.error("خطا در به‌روزرسانی وضعیت انتقال", {
        id: `update-${transferId}`,
      });

      console.error("Transfer status update error:", error);
    }
  };

  const getStatusActions = (transfer: Transfer) => {
    return (
      <div className="flex gap-1">
        {transfer.status !== TransferStatus.success && (
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              handleStatusUpdate(transfer.id, TransferStatus.success)
            }
            disabled={updateTransferStatusMutation.isPending}
            className="h-8 px-2 text-green-600 border-green-400 hover:bg-green-50"
            title="تأیید انتقال"
          >
            <CheckCircle className="w-3 h-3" />
          </Button>
        )}
        {transfer.status !== TransferStatus.reject && (
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              handleStatusUpdate(transfer.id, TransferStatus.reject)
            }
            disabled={updateTransferStatusMutation.isPending}
            className="h-8 px-2 text-red-600 border-red-400 hover:bg-red-50"
            title="رد انتقال"
          >
            <XCircle className="w-3 h-3" />
          </Button>
        )}
      </div>
    );
  };

  return (
    <Card className="bg-white border-gold/20">
      <CardContent>
        <Form {...form}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gold/20">
                  <th className="text-right py-3 px-4 text-cream/80 font-medium">
                    گیرنده
                  </th>
                  <th className="text-right py-3 px-4 text-cream/80 font-medium">
                    نوع انتقال
                  </th>
                  <th className="text-right py-3 px-4 text-cream/80 font-medium">
                    مقدار
                  </th>
                  <th className="text-right py-3 px-4 text-cream/80 font-medium">
                    وضعیت
                  </th>
                  <th className="text-right py-3 px-4 text-cream/80 font-medium">
                    عملیات
                  </th>
                  <th className="text-right py-3 px-4 text-cream/80 font-medium">
                    تاریخ
                  </th>
                </tr>
              </thead>
              <tbody>
                {transfers.map((transfer) => (
                  <tr
                    key={transfer.id}
                    className="border-b border-gold/10 hover:bg-cream/5"
                  >
                    <td className="py-4 px-4 text-cream/80">
                      {transfer.receiver}
                    </td>
                    <td className="py-4 px-4">
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
                    </td>
                    <td className="py-4 px-4 text-cream/80 font-medium">
                      {formatValue(transfer.value, transfer.valueType)}
                    </td>
                    <td className="py-4 px-4">
                      {getStatusBadge(transfer.status)}
                    </td>
                    <td className="py-4 px-4">{getStatusActions(transfer)}</td>
                    <td className="py-4 px-4 text-cream/60 text-sm">
                      {formatDate(transfer.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
}
