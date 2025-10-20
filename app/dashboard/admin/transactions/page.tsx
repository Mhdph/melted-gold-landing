"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import TransactionFilters from "@/components/pages/admin/transactions/transaction-filters";
import TransactionTable from "@/components/pages/admin/transactions/transaction-table";
import {
  Transaction,
  FilterStatus,
} from "@/components/pages/admin/transactions/types";
import { sampleTransactions } from "@/components/pages/admin/transactions/utils";

export default function TransactionsApprovalPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("pending");
  const [transactions, setTransactions] =
    useState<Transaction[]>(sampleTransactions);

  const handleApprove = (transactionId: string, userName: string) => {
    setTransactions(
      transactions.map((tx) =>
        tx.id === transactionId ? { ...tx, status: "approved" as const } : tx
      )
    );
    toast({
      title: "تراکنش تایید شد",
      description: `تراکنش ${userName} با موفقیت تایید و پردازش شد.`,
    });
  };

  const handleReject = (transactionId: string, userName: string) => {
    setTransactions(
      transactions.map((tx) =>
        tx.id === transactionId ? { ...tx, status: "rejected" as const } : tx
      )
    );
    toast({
      title: "تراکنش رد شد",
      description: `تراکنش ${userName} رد شد.`,
      variant: "destructive",
    });
  };

  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch =
      tx.userName.includes(searchQuery) ||
      tx.userPhone.includes(searchQuery) ||
      tx.id.includes(searchQuery);
    const matchesFilter = filterStatus === "all" || tx.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const pendingCount = transactions.filter(
    (tx) => tx.status === "pending"
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
        transactions={filteredTransactions}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
}
