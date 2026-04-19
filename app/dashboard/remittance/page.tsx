"use client";

import PageTitle from "@/components/page-title";
import PaginationControls from "@/components/pages/price-changes/pagination-controls";
import RemittanceForm from "@/components/pages/remittance/remittance-form";
import RemittanceList from "@/components/pages/remittance/remittance-list";
import {
  CreateTransferRequest,
  FilterUnit,
  Remittance,
  SortBy,
} from "@/components/pages/remittance/types";
import { Card, CardContent } from "@/components/ui/card";
import {
  useCreateTransfer,
  useGetUserTransfers,
} from "@/services/remittance.service";
import { useState } from "react";

export default function RemittancePage() {
  const [pageSize, setPageSize] = useState(10);
  const [filterUnit, setFilterUnit] = useState<FilterUnit>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [finalFilter, setFinalFilter] = useState<string>("{}");

  // API hooks
  const createTransfer = useCreateTransfer();
  const {
    data: transfersData,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetUserTransfers(currentPage, pageSize, finalFilter);

  const handleNewRemittance = async (newRemittance: CreateTransferRequest) => {
    const transferData: CreateTransferRequest = {
      value: newRemittance.value,
      valueType: newRemittance.valueType as "gold" | "mony",
      receiver: newRemittance.receiver,
    };

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
    value: transfer.value,
    valueType: transfer.valueType as "gold" | "money",
    receiver: transfer.receiver,
  });

  const remittances =
    transfersData?.data?.map(convertTransferToRemittance) || [];

  const filteredRemittances = remittances
    .filter((r) => filterUnit === "all" || r.valueType === filterUnit)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (isLoading) {
    return (
      <div className="min-h-screen" dir="rtl">
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
      <div className="min-h-screen " dir="rtl">
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

  const meta = transfersData?.meta || {
    page: 1,
    limit: 10,
    itemCount: 0,
    hasNextPage: false,
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1); // Reset to first page when changing page size
  };

  return (
    <div className="min-h-screen bg-[#F6F5EE] dark:bg-slate-800" dir="rtl">
      <main className="px-4 py-4 space-y-6">
        {/* Page Header */}
        <PageTitle
          title="ثبت حواله"
          description="ثبت و مدیریت حواله‌های طلا و ریال"
        />

        {/* Statistics Cards */}

        {/* New Remittance Form */}
        <RemittanceForm
          onSubmit={handleNewRemittance}
          isPending={createTransfer.isPending}
        />

        {/* Remittance History */}
        <RemittanceList
          remittances={filteredRemittances}
          setFinalFilter={setFinalFilter}
          refetch={refetch}
        />
        <div className="bg-white rounded-md">
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
      </main>
    </div>
  );
}
