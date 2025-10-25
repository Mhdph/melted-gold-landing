"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import TransactionFilters from "@/components/pages/admin/transactions/transaction-filters";
import TransactionTable from "@/components/pages/admin/transactions/transaction-table";
import {
  Transaction,
  FilterStatus,
} from "@/components/pages/admin/transactions/types";
import {
  useApproveTransaction,
  useGetTransactions,
  useRejectTransaction,
} from "@/services/trade-service";

export default function TransactionsApprovalPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("pending");
  const approveTransaction = useApproveTransaction();
  const rejectTransaction = useRejectTransaction();

  const {
    data: transactionsData,
    isLoading,
    isError,
    error,
  } = useGetTransactions();

  const handleApprove = (transactionId: string, userName: string) => {
    approveTransaction.mutate(transactionId, {
      onSuccess: () => {
        toast({
          title: "تراکنش تایید شد",
          description: `تراکنش ${userName} با موفقیت تایید و پردازش شد.`,
        });
      },
      onError: (error) => {
        toast({
          title: "خطا در تایید تراکنش",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  };

  const handleReject = (transactionId: string, userName: string) => {
    rejectTransaction.mutate(transactionId, {
      onSuccess: () => {
        toast({
          title: "تراکنش رد شد",
          description: `تراکنش ${userName} رد شد.`,
          variant: "destructive",
        });
      },
      onError: (error) => {
        toast({
          title: "خطا در رد تراکنش",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;
  if (!transactionsData) return <div>No transactions found</div>;
  const pendingCount = transactionsData?.data.filter(
    (tx) => tx.accept === false
  ).length;

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gold mb-2">تایید تراکنش‌ها</h1>
          <p className="text-cream/60">{pendingCount} تراکنش در انتظار تایید</p>
        </div>
      </div>

      {/* Filters */}
      <TransactionFilters
        searchQuery={searchQuery}
        filterStatus={filterStatus}
        onSearchChange={setSearchQuery}
        onFilterChange={setFilterStatus}
      />

      {/* Transaction Table */}
      <TransactionTable
        transactions={transactionsData.data}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
}
