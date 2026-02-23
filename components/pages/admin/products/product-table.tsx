import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, Pencil } from "lucide-react"; // ← add Pencil icon or use text
import { IProducts } from "./type";
import ProductFormModal from "./product-form-modal";
import { Activity, useState } from "react";

interface ProductsTableProps {
  products: IProducts[];
}

export default function ProductsTable({ products }: ProductsTableProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<IProducts | null>(
    null
  );

  return (
    <>
      <Card className="bg-white dark:bg-slate-800 border-gold/20">
        <CardContent>
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
                {products.map((product) => (
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
                        product.buyAmountGeneral
                      )}{" "}
                      ریال
                    </td>
                    <td className="py-4 px-4 text-cream">
                      {new Intl.NumberFormat("fa-IR").format(
                        product.sellAmountGeneral
                      )}{" "}
                      ریال
                    </td>
                    <td className="py-4 px-4 text-cream">
                      {new Intl.NumberFormat("fa-IR").format(
                        product.buyAmountPartnerShip
                      )}{" "}
                      ریال
                    </td>
                    <td className="py-4 px-4 text-cream">
                      {new Intl.NumberFormat("fa-IR").format(
                        product.sellAmountPartnerShip
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
