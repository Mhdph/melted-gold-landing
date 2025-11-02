"use client";
import { useState } from "react";
import {
  useGetTransfers,
  Transfer,
  useUpdateTransferStatus,
  TransferStatus,
} from "@/services/remittance.service";
import { useQueryClient } from "@tanstack/react-query";
import TransferTable from "@/components/pages/admin/transfers/transfer-table";
import PaginationControls from "@/components/pages/admin/transfers/pagination-controls";
import TransferFilters from "@/components/pages/admin/transfers/transfer-filters";
import Loading from "@/components/ui/loading";
import ErrorMessage from "@/components/ui/error-message";
import { FilterStatus } from "@/components/pages/admin/transfers/types";
import { useLastTransfer } from "@/hooks/use-get-last-transfer-websocket";
import LastTransferCard from "@/components/pages/admin/transfers/last-transfer-card";
import { toast } from "sonner";

function AdminTransfersPage() {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const { transfers: lastTransfers } = useLastTransfer();
  const { data, isLoading, isError, error } = useGetTransfers({
    page: currentPage,
    limit: pageSize,
    type: filterStatus === "all" ? undefined : filterStatus,
  });

  const transfers = data?.data || [];
  const meta = data?.meta || {
    page: 1,
    limit: 10,
    itemCount: 0,
    hasNextPage: false,
  };

  // Filter transfers based on search query
  const filteredTransfers = transfers.filter((transfer) =>
    transfer.receiver.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1); // Reset to first page when changing page size
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (status: FilterStatus) => {
    setFilterStatus(status);
    setCurrentPage(1); // Reset to first page when changing filter
  };

  const updateTransferStatusMutation = useUpdateTransferStatus();

  const handleApprove = async (transferId: string) => {
    try {
      toast.loading("در حال تایید انتقال...", {
        id: `approve-${transferId}`,
      });

      await updateTransferStatusMutation.mutateAsync({
        id: transferId,
        status: TransferStatus.success,
      });

      await queryClient.invalidateQueries({ queryKey: ["transfers"] });
      await queryClient.invalidateQueries({ queryKey: ["user-transfers"] });

      toast.success("انتقال با موفقیت تایید شد", {
        id: `approve-${transferId}`,
      });
    } catch (error) {
      toast.error("خطا در تایید انتقال", {
        id: `approve-${transferId}`,
      });
      console.error("Transfer approval error:", error);
    }
  };

  const handleReject = async (transferId: string) => {
    try {
      toast.loading("در حال رد انتقال...", {
        id: `reject-${transferId}`,
      });

      await updateTransferStatusMutation.mutateAsync({
        id: transferId,
        status: TransferStatus.reject,
      });

      await queryClient.invalidateQueries({ queryKey: ["transfers"] });
      await queryClient.invalidateQueries({ queryKey: ["user-transfers"] });

      toast.success("انتقال رد شد", {
        id: `reject-${transferId}`,
      });
    } catch (error) {
      toast.error("خطا در رد انتقال", {
        id: `reject-${transferId}`,
      });
      console.error("Transfer rejection error:", error);
    }
  };

  const handleTransferUpdate = () => {
    // Force refetch of transfers data
    queryClient.invalidateQueries({ queryKey: ["transfers"] });
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setFilterStatus("all");
    setCurrentPage(1);
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
        <h1 className="text-2xl font-bold text-cream">مدیریت انتقالات</h1>
      </div>
      {lastTransfers?.msg && (
        <LastTransferCard
          transfer={lastTransfers.msg}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      )}
      <TransferFilters
        searchQuery={searchQuery}
        filterStatus={filterStatus}
        onSearchChange={handleSearchChange}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />

      <TransferTable
        transfers={filteredTransfers}
        onTransferUpdate={handleTransferUpdate}
      />

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
