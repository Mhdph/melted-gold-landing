"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { Form } from "@/components/ui/form";
import TransactionFilters from "@/components/pages/admin/transactions/transaction-filters";
import TransactionTable from "@/components/pages/admin/transactions/transaction-table";
import {
  Transaction,
  FilterStatus,
} from "@/components/pages/admin/transactions/types";
import { isPending } from "@/components/pages/admin/transactions/utils";
import {
  transactionFiltersSchema,
  TransactionFiltersFormData,
} from "@/components/pages/admin/transactions/transaction-form-schema";
import {
  useApproveTransaction,
  useGetTransactions,
  useRejectTransaction,
} from "@/services/trade-service";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useLastTransaction } from "@/hooks/use-get-last-transaction-websocket";
import { useState } from "react";

export default function TransactionsApprovalPage() {
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

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

  const { watch, setValue, handleSubmit } = form;
  const watchedValues = watch();

  const approveTransaction = useApproveTransaction();
  const rejectTransaction = useRejectTransaction();

  const { transactions, isConnected } = useLastTransaction();

  console.log("first", transactions);
  console.log("isConnected", isConnected);

  const {
    data: transactionsData,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetTransactions(watchedValues.page, watchedValues.pageSize);

  const handleApprove = async (transactionId: string, userName: string) => {
    try {
      console.log(
        "Attempting to approve transaction:",
        transactionId,
        userName
      );

      // Validate form data
      const isValid = await form.trigger();
      if (!isValid) {
        console.log("Form validation failed");
        toast({
          title: "خطا در اعتبارسنجی",
          description: "لطفاً فرم را به درستی پر کنید",
          variant: "destructive",
        });
        return;
      }

      console.log("Form validation passed, calling mutation");
      approveTransaction.mutate(transactionId, {
        onSuccess: () => {
          console.log("Transaction approved successfully");
          toast({
            title: "تراکنش تایید شد",
            description: `تراکنش ${userName} با موفقیت تایید و پردازش شد.`,
          });
          refetch();
        },
        onError: (error) => {
          console.error("Transaction approval failed:", error);
          toast({
            title: "خطا در تایید تراکنش",
            description: error.message,
            variant: "destructive",
          });
        },
      });
    } catch (error) {
      console.error("Unexpected error in handleApprove:", error);
      toast({
        title: "خطا در پردازش",
        description: "خطایی در پردازش درخواست رخ داد",
        variant: "destructive",
      });
    }
  };

  const handleReject = async (transactionId: string, userName: string) => {
    try {
      console.log("Attempting to reject transaction:", transactionId, userName);

      // Validate form data
      const isValid = await form.trigger();
      if (!isValid) {
        console.log("Form validation failed");
        toast({
          title: "خطا در اعتبارسنجی",
          description: "لطفاً فرم را به درستی پر کنید",
          variant: "destructive",
        });
        return;
      }

      console.log("Form validation passed, calling mutation");
      rejectTransaction.mutate(transactionId, {
        onSuccess: () => {
          console.log("Transaction rejected successfully");
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

  // Form submission handler
  const onSubmit = (data: TransactionFiltersFormData) => {
    console.log("Form submitted with data:", data);
    // Handle form submission logic here
  };

  const totalPages = transactionsData?.meta
    ? Math.ceil(transactionsData.meta.itemCount / watchedValues.pageSize)
    : 1;

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;
  if (!transactionsData) return <div>No transactions found</div>;
  const pendingCount = transactionsData?.data.filter(isPending).length;

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gold mb-2">
              تایید تراکنش‌ها
            </h1>
            <p className="text-cream/60">
              {pendingCount} تراکنش در انتظار تایید
            </p>
          </div>
        </div>

        {/* Filters */}
        {/* <TransactionFilters
          searchQuery={searchQuery}
          filterStatus={filterStatus}
          onSearchChange={setSearchQuery}
          onFilterChange={setFilterStatus}
        /> */}

        {/* Transaction Table */}
        <TransactionTable
          transactions={transactionsData.data}
          onApprove={handleApprove}
          onReject={handleReject}
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (watchedValues.page > 1) {
                        handlePageChange(watchedValues.page - 1);
                      }
                    }}
                    className={
                      watchedValues.page <= 1
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(page);
                        }}
                        isActive={watchedValues.page === page}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (watchedValues.page < totalPages) {
                        handlePageChange(watchedValues.page + 1);
                      }
                    }}
                    className={
                      watchedValues.page >= totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </form>
    </Form>
  );
}
