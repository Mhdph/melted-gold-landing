"use client";

import ProductFormModal from "@/components/pages/admin/products/product-form-modal";
import ProductsTable from "@/components/pages/admin/products/product-table";
import { useGetProducts } from "@/services/product.service";
import { useState } from "react";

export default function ProductsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const { data, isLoading, isError } = useGetProducts();

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
      <ProductsTable products={data?.data || []} />
    </div>
  );
}
