"use client";

import { useState } from "react";

import PageTitle from "@/components/page-title";
import SummeryCards from "@/components/pages/account-activity/summery-cards";
import TransactionTable from "@/components/pages/account-activity/transaction-table";
import TransactionFilter from "@/components/pages/account-activity/transaction-filter";
import { sampleTransactions } from "@/components/pages/account-activity/utils";
import { Transaction } from "@/components/pages/account-activity/type";

export default function AccountActivityPage() {
  const [transactions] = useState<Transaction[]>(
    sampleTransactions as Transaction[]
  );

  const [filterType, setFilterType] = useState<
    "all" | "واریز" | "برداشت" | "انتقال"
  >("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const filteredTransactions = transactions.filter(
    (t) => filterType === "all" || t.type === filterType
  );

  return (
    <div className="min-h-screen bg-[#F6F5EE] flex" dir="rtl">
      <div className="flex-1 ">
        <main className="container mx-auto px-4 py-8 space-y-6">
          {/* Page Header */}

          <PageTitle
            title="گردش حساب"
            description="مشاهده تمام تراکنش‌های حساب"
          />

          {/* Summary Cards */}
          <SummeryCards transactions={transactions} />

          {/* Filters */}
          <TransactionFilter
            filterType={filterType}
            setFilterType={(value: string) =>
              setFilterType(value as "واریز" | "برداشت" | "انتقال" | "all")
            }
            dateFrom={dateFrom}
            setDateFrom={(value: string) => setDateFrom(value)}
            dateTo={dateTo}
            setDateTo={(value: string) => setDateTo(value)}
          />

          {/* Transactions Table */}
          <TransactionTable filteredTransactions={filteredTransactions} />
        </main>
      </div>
    </div>
  );
}
