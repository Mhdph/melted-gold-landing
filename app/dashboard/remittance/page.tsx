"use client";

import { useState } from "react";
import PageTitle from "@/components/page-title";
import RemittanceForm from "@/components/pages/remittance/remittance-form";
import RemittanceList from "@/components/pages/remittance/remittance-list";
import {
  Remittance,
  SortBy,
  FilterUnit,
  CreateTransferRequest,
  TransferFilters,
} from "@/components/pages/remittance/types";
import {
  useGetUserTransfers,
  useCreateTransfer,
  useGetTransferStats,
} from "@/services/remittance.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingUp, Clock, CheckCircle } from "lucide-react";

export default function RemittancePage() {
  const [sortBy, setSortBy] = useState<SortBy>("date");
  const [filterUnit, setFilterUnit] = useState<FilterUnit>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  // API hooks
  const createTransfer = useCreateTransfer();
  const {
    data: transfersData,
    isLoading,
    isError,
    error,
  } = useGetUserTransfers({
    page: currentPage,
    limit: pageSize,
    type:
      filterUnit === "all"
        ? undefined
        : filterUnit === "گرم طلا"
        ? "remittance"
        : "transfer",
  });
  const { data: statsData } = useGetTransferStats();

  const handleNewRemittance = async (newRemittance: Remittance) => {
    // Get current user ID from localStorage or use phone number as fallback
    const currentUserId =
      localStorage.getItem("userId") ||
      localStorage.getItem("phone") ||
      "unknown-user";

    const transferData: CreateTransferRequest = {
      value: newRemittance.amount,
      valueType: newRemittance.unit === "گرم طلا" ? "gold" : "mony",
      userId: currentUserId,
      receiver: newRemittance.recipient,
      description: newRemittance.description,
      fees: newRemittance.fees,
      exchangeRate: newRemittance.exchangeRate,
    };

    console.log("Creating transfer with data:", transferData);

    try {
      await createTransfer.mutateAsync(transferData);
    } catch (error) {
      console.error("Error creating transfer:", error);
    }
  };

  // Convert API data to component format
  const convertTransferToRemittance = (transfer: any): Remittance => ({
    id: transfer.id,
    date: transfer.createdAt,
    amount: transfer.value || transfer.amount,
    unit: transfer.valueType === "gold" ? "گرم طلا" : "ریال",
    recipient: transfer.receiver || transfer.toUser || "نامشخص",
    status:
      transfer.status === "completed"
        ? "تکمیل شده"
        : transfer.status === "pending"
        ? "در انتظار"
        : transfer.status === "cancelled"
        ? "لغو شده"
        : "ناموفق",
    description: transfer.description,
    fees: transfer.fees,
    exchangeRate: transfer.exchangeRate,
    transactionId: transfer.transactionId,
  });

  const remittances =
    transfersData?.data?.map(convertTransferToRemittance) || [];
  const totalPages = transfersData?.meta
    ? Math.ceil(transfersData.meta.itemCount / pageSize)
    : 1;

  const filteredRemittances = remittances
    .filter((r) => filterUnit === "all" || r.unit === filterUnit)
    .sort((a, b) => {
      if (sortBy === "date")
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      return b.amount - a.amount;
    });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F6F5EE]" dir="rtl">
        <main className="px-4 py-4 space-y-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-600">در حال بارگذاری حواله‌ها...</div>
          </div>
        </main>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-[#F6F5EE]" dir="rtl">
        <main className="px-4 py-4 space-y-6">
          <Card className="bg-red-50 border-red-200">
            <CardContent className="p-6">
              <div className="text-red-600 text-center">
                خطا در بارگذاری حواله‌ها: {error?.message}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F5EE]" dir="rtl">
      <main className="px-4 py-4 space-y-6">
        {/* Page Header */}
        <PageTitle
          title="ثبت حواله"
          description="ثبت و مدیریت حواله‌های طلا و ریال"
        />

        {/* Statistics Cards */}
        {statsData?.data && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-white border-gray-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  کل حواله‌ها
                </CardTitle>
                <DollarSign className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {statsData.data.totalTransfers}
                </div>
                <p className="text-xs text-gray-500">تعداد کل حواله‌ها</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  در انتظار
                </CardTitle>
                <Clock className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">
                  {statsData.data.pendingTransfers}
                </div>
                <p className="text-xs text-gray-500">حواله‌های در انتظار</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  تکمیل شده
                </CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {statsData.data.completedTransfers}
                </div>
                <p className="text-xs text-gray-500">حواله‌های تکمیل شده</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  مبلغ کل
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">
                  {new Intl.NumberFormat("fa-IR").format(
                    statsData.data.totalAmount
                  )}
                </div>
                <p className="text-xs text-gray-500">ریال</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* New Remittance Form */}
        <RemittanceForm onSubmit={handleNewRemittance} />

        {/* Remittance History */}
        <RemittanceList
          remittances={filteredRemittances}
          sortBy={sortBy}
          filterUnit={filterUnit}
          onSortChange={setSortBy}
          onFilterChange={setFilterUnit}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </main>
    </div>
  );
}
