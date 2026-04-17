"use client";

import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import ProductFormModal from "./product-form-modal";
import { useState } from "react";
import { IProducts } from "./type";

export function ProductRowActions({ product }: { product: IProducts }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="ghost" size="sm" onClick={() => setOpen(true)}>
        <Pencil className="h-4 w-4" />
      </Button>

      <ProductFormModal open={open} onOpenChange={setOpen} product={product} />
    </>
  );
}
