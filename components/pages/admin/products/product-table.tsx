import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, X, Pencil, ChevronLeft, ChevronRight } from "lucide-react";
import { IProducts } from "./type";
import ProductFormModal from "./product-form-modal";
import { useState, useMemo } from "react";

interface ProductsTableProps {
  products: IProducts[];
}

export default function ProductsTable({ products }: ProductsTableProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProducts | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter products based on search query
  const filteredProducts = useMemo(() => {
    if (!searchQuery) return products;
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [products, searchQuery]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage]);

  // Reset to page 1 when search query changes
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  return (
    <>
      <Card className="bg-white dark:bg-slate-800 border-gold/20">
        <CardContent>
          {/* Search Input */}
          <div className="mb-4">
            <Input
              placeholder="جستجوی محصول..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gold/20">
                  <th className="text-right py-3 px-4 text-cream/80 font-medium">
                    نام
                  </th>
                  <th className="text-right py-3 px-4 text-cream/80 font-medium">
                    وضعیت معامله
                  </th>
                  <th className="text-right py-3 px-4 text-cream/80 font-medium">
                    مبلغ خرید کاربر
                  </th>
                  <th className="text-right py-3 px-4 text-cream/80 font-medium">
                    مبلغ فروش کاربر
                  </th>
                  <th className="text-right py-3 px-4 text-cream/80 font-medium">
                    مبلغ خرید همکار
                  </th>
                  <th className="text-right py-3 px-4 text-cream/80 font-medium">
                    مبلغ فروش همکار
                  </th>
                  <th className="text-right py-3 px-4 text-cream/80 font-medium">
                    عملیات
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-gold/10 hover:bg-cream/5"
                  >
                    <td className="py-4 px-4">
                      <p className="text-xs text-cream/60 ">{product.name}</p>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`text-xs px-3 py-1 rounded-full ${
                          product.isDealActive
                            ? "bg-green-400/10 text-green-400"
                            : "bg-red-400/10 text-red-400"
                        }`}
                      >
                        {product.isDealActive ? "فعال" : "غیرفعال"}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-cream">
                      {new Intl.NumberFormat("fa-IR").format(
                        product.buyAmountGeneral,
                      )}{" "}
                      ریال
                    </td>
                    <td className="py-4 px-4 text-cream">
                      {new Intl.NumberFormat("fa-IR").format(
                        product.sellAmountGeneral,
                      )}{" "}
                      ریال
                    </td>
                    <td className="py-4 px-4 text-cream">
                      {new Intl.NumberFormat("fa-IR").format(
                        product.buyAmountPartnerShip,
                      )}{" "}
                      ریال
                    </td>
                    <td className="py-4 px-4 text-cream">
                      {new Intl.NumberFormat("fa-IR").format(
                        product.sellAmountPartnerShip,
                      )}{" "}
                      ریال
                    </td>

                    {/* Edit button – now just opens modal + sets product */}
                    <td className="py-4 px-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedProduct(product);
                          setModalOpen(true);
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                        {/* یا فقط متن: ویرایش */}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {filteredProducts.length > itemsPerPage && (
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-cream/60">
                نمایش{" "}
                {Math.min(
                  (currentPage - 1) * itemsPerPage + 1,
                  filteredProducts.length,
                )}{" "}
                تا{" "}
                {Math.min(currentPage * itemsPerPage, filteredProducts.length)}{" "}
                از {filteredProducts.length} مورد
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                >
                  <ChevronRight className="h-4 w-4" />
                  قبلی
                </Button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    return (
                      <Button
                        key={pageNum}
                        variant={
                          currentPage === pageNum ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => setCurrentPage(pageNum)}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                >
                  بعدی
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      {modalOpen && (
        <ProductFormModal
          open={modalOpen}
          onOpenChange={(open) => {
            setModalOpen(open);
          }}
          product={selectedProduct}
        />
      )}
    </>
  );
}
