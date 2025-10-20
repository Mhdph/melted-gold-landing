"use client";

import { useState } from "react";
import PageTitle from "@/components/page-title";
import { useGetPrices } from "@/services/price-service";
import PriceSummaryCards from "@/components/pages/price-changes/price-summary-cards";
import PriceTable from "@/components/pages/price-changes/price-table";
import PaginationControls from "@/components/pages/price-changes/pagination-controls";
import { TimeRange } from "@/components/pages/price-changes/types";
import Loading from "@/components/ui/loading";
import ErrorMessage from "@/components/ui/error-message";

export default function PriceChangesPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>("today");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const {
    data: pricesResponse,
    isLoading,
    error,
  } = useGetPrices(currentPage, pageSize);

  const priceData = pricesResponse?.data || [];
  const meta = pricesResponse?.meta;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  if (isLoading) return <Loading />;

  if (error) return <ErrorMessage />;

  return (
    <div className="min-h-screen bg-[#F6F5EE] flex" dir="rtl">
      <div className="flex-1">
        <main className="container mx-auto px-4 py-8 space-y-6">
          {/* Page Header */}
          <PageTitle
            title="تغییرات قیمت طلا"
            description="نمایش تغییرات قیمت خرید و فروش طلا"
          />

          {/* Current Price Summary */}
          <PriceSummaryCards latestPrice={priceData[0]} />

          {/* Price Changes Table */}
          <div>
            <PriceTable
              priceData={priceData}
              timeRange={timeRange}
              onTimeRangeChange={setTimeRange}
            />

            {/* Pagination Controls */}
            {meta && (
              <PaginationControls
                meta={meta as any}
                currentPage={currentPage}
                pageSize={pageSize}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
