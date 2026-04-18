"use client";
import { useState } from "react";
import {
  useGetTransfers,
  useUpdateTransferStatus,
  TransferStatus,
} from "@/services/remittance.service";
import { useQueryClient } from "@tanstack/react-query";
import PaginationControls from "@/components/pages/admin/transfers/pagination-controls";
import Loading from "@/components/ui/loading";
import ErrorMessage from "@/components/ui/error-message";
import { FilterStatus } from "@/components/pages/admin/transfers/types";
import { useLastTransfer } from "@/hooks/use-get-last-transfer-websocket";
import LastTransferCard from "@/components/pages/admin/transfers/last-transfer-card";
import { toast } from "sonner";
import TransferTable from "@/components/pages/admin/transfers/transfer-table";
import { transferColumns } from "@/components/pages/admin/transfers/transfer-columns";
import TransferFilters from "@/components/pages/admin/transfers/transfer-filters";

function AdminTransfersPage() {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [dateRange, setDateRange] = useState<{
    from?: string;
    to?: string;
  }>({});
  const [finalFilter, setFinalFilter] = useState<string>("{}");
  const { data, isLoading, refetch, isError } = useGetTransfers(
    currentPage,
    pageSize,
    finalFilter,
  );

  const transfers = data?.data || [];
  const meta = data?.meta || {
    page: 1,
    limit: 10,
    itemCount: 0,
    hasNextPage: false,
  };

  // Filter transfers based on search query
  const filteredTransfers = transfers.filter((transfer) =>
    transfer.receiver.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1); // Reset to first page when changing page size
  };

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
  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorMessage />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-sm md:text-2xl font-bold text-cream">
          مدیریت انتقالات
        </h1>
      </div>

      <TransferFilters
        applyDateFilter={applyDateFilter}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />

      <TransferTable data={filteredTransfers} columns={transferColumns} />

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
  );
}

export default AdminTransfersPage;
