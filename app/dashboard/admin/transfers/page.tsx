"use client";
import { useState } from "react";
import { useGetTransfers, Transfer } from "@/services/remittance.service";
import TransferTable from "@/components/pages/admin/transfers/transfer-table";
import PaginationControls from "@/components/pages/admin/transfers/pagination-controls";
import TransferFilters from "@/components/pages/admin/transfers/transfer-filters";
import Loading from "@/components/ui/loading";
import ErrorMessage from "@/components/ui/error-message";
import { FilterStatus } from "@/components/pages/admin/transfers/types";

function AdminTransfersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");

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

      <TransferFilters
        searchQuery={searchQuery}
        filterStatus={filterStatus}
        onSearchChange={handleSearchChange}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />

      <TransferTable transfers={filteredTransfers} />

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
