"use client";

import { transactionColumns } from "@/components/pages/admin/transactions/transaction-columns";
import TransactionFilters from "@/components/pages/admin/transactions/transaction-filters";
import {
  TransactionFiltersFormData,
  transactionFiltersSchema,
} from "@/components/pages/admin/transactions/transaction-form-schema";
import TransactionDataTable from "@/components/pages/admin/transactions/transaction-table";
import { isPending } from "@/components/pages/admin/transactions/utils";
import PaginationControls from "@/components/pages/price-changes/pagination-controls";
import { useToast } from "@/hooks/use-toast";
import {
  useApproveTransaction,
  useGetTransactions,
  useRejectTransaction,
} from "@/services/trade-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function TransactionsApprovalPage() {
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [dateRange, setDateRange] = useState<{
    from?: string;
    to?: string;
  }>({});
  const [finalFilter, setFinalFilter] = useState<string>("{}");
  // Initialize React Hook Form with Zod resolver
  const form = useForm<TransactionFiltersFormData>({
    resolver: zodResolver(transactionFiltersSchema),
    defaultValues: {
      searchQuery: "",
      filterStatus: "pending",
      page: 1,
      pageSize: 10,
    },
  });

  const { watch, setValue } = form;
  const watchedValues = watch();

  const approveTransaction = useApproveTransaction();
  const rejectTransaction = useRejectTransaction();

  const {
    data: transactionsData,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetTransactions(
    watchedValues.page,
    watchedValues.pageSize,
    finalFilter,
  );

  const applyDateFilter = () => {
    if (dateRange.from && dateRange.to) {
      setFinalFilter(
        JSON.stringify({
          createdAt: {
            gte: dateRange.from,
            lte: dateRange.to,
          },
        }),
      );
    } else {
      setFinalFilter("{}");
    }

    refetch();
  };

  const handleApprove = async (transactionId: string, userName: string) => {
    try {
      // Validate form data
      const isValid = await form.trigger();
      if (!isValid) {
        toast({
          title: "خطا در اعتبارسنجی",
          description: "لطفاً فرم را به درستی پر کنید",
          variant: "destructive",
        });
        return;
      }

      approveTransaction.mutate(transactionId, {
        onSuccess: () => {
          toast({
            title: "تراکنش تایید شد",
            description: `تراکنش ${userName} با موفقیت تایید و پردازش شد.`,
          });
          refetch();
        },
        onError: (error) => {
          toast({
            title: "خطا در تایید تراکنش",
            description: error.message,
            variant: "destructive",
          });
        },
      });
    } catch (error) {
      toast({
        title: "خطا در پردازش",
        description: "خطایی در پردازش درخواست رخ داد",
        variant: "destructive",
      });
    }
  };

  const handleReject = async (transactionId: string, userName: string) => {
    try {
      // Validate form data
      const isValid = await form.trigger();
      if (!isValid) {
        toast({
          title: "خطا در اعتبارسنجی",
          description: "لطفاً فرم را به درستی پر کنید",
          variant: "destructive",
        });
        return;
      }

      rejectTransaction.mutate(transactionId, {
        onSuccess: () => {
          toast({
            title: "تراکنش رد شد",
            description: `تراکنش ${userName} رد شد.`,
            variant: "destructive",
          });
          refetch();
        },
        onError: (error) => {
          console.error("Transaction rejection failed:", error);
          toast({
            title: "خطا در رد تراکنش",
            description: error.message,
            variant: "destructive",
          });
        },
      });
    } catch (error) {
      console.error("Unexpected error in handleReject:", error);
      toast({
        title: "خطا در پردازش",
        description: "خطایی در پردازش درخواست رخ داد",
        variant: "destructive",
      });
    }
  };

  const handlePageChange = (page: number) => {
    setValue("page", page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1); // Reset to first page when changing page size
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;
  if (!transactionsData) return <div>No transactions found</div>;
  const pendingCount = transactionsData?.data.filter(isPending).length;
  const meta = transactionsData?.meta || {
    page: 1,
    limit: 10,
    itemCount: 0,
    hasNextPage: false,
  };
  return (
    <div className="p-6 lg:p-8  space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gold mb-2">تایید تراکنش‌ها</h1>
          <p className="text-cream/60">{pendingCount} تراکنش در انتظار تایید</p>
        </div>
      </div>

      {/* Filters */}
      <TransactionFilters
        applyDateFilter={applyDateFilter}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />

      {/* Transaction Table */}

      <TransactionDataTable
        data={transactionsData.data}
        columns={transactionColumns(handleApprove, handleReject)}
      />

      {/* Pagination */}
      <div className="bg-white">
        {meta.itemCount > 0 && (
          <PaginationControls
            meta={meta}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        )}
      </div>
    </div>
  );
}
