"use client";

import { productColumns } from "@/components/pages/admin/products/product-columns";
import ProductFormModal from "@/components/pages/admin/products/product-form-modal";
import ProductsTable from "@/components/pages/admin/products/product-table";
import PaginationControls from "@/components/pages/admin/transfers/pagination-controls";
import { useGetProducts } from "@/services/product.service";
import { useState } from "react";

export default function ProductsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const { data, isLoading, isError } = useGetProducts();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  if (isLoading) return <p className="flex items-center">در حال بارگذاری</p>;

  const meta = data?.meta || {
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
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold text-cream">مدیریت محصولات</h1>
        <ProductFormModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          product={null}
        />
      </div>
      <ProductsTable columns={productColumns} data={data?.data || []} />
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
