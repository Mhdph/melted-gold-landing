"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import ProductFormFields from "./product-form-fields";
import { useAddProduct, useUpdateProduct } from "@/services/product.service";
import { useQueryClient } from "@tanstack/react-query";

// ──────────────────────────────────────────────
//              Zod Schema
// ──────────────────────────────────────────────
const productSchema = z.object({
  name: z.string().min(2, { message: "نام محصول حداقل ۲ کاراکتر باشد" }),
  sellAmountPartnerShip: z
    .number({ invalid_type_error: "مقدار باید عدد باشد" })
    .min(0, { message: "حداقل ۰" }),
  sellAmountGeneral: z
    .number({ invalid_type_error: "مقدار باید عدد باشد" })
    .min(0, { message: "حداقل ۰" }),
  buyAmountPartnerShip: z
    .number({ invalid_type_error: "مقدار باید عدد باشد" })
    .min(0, { message: "حداقل ۰" }),
  buyAmountGeneral: z
    .number({ invalid_type_error: "مقدار باید عدد باشد" })
    .min(0, { message: "حداقل ۰" }),
  isDealActive: z.boolean().default(false),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: {
    id: string;
    name: string;
    sellAmountPartnerShip: number;
    sellAmountGeneral: number;
    buyAmountPartnerShip: number;
    buyAmountGeneral: number;
    isDealActive: boolean;
  } | null; // null → create mode
}

export default function ProductFormModal({
  open,
  onOpenChange,
  product,
}: ProductFormModalProps) {
  const isUpdate = !!product;
  const addMutation = useAddProduct();
  const updateMutation = useUpdateProduct();

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: product
      ? {
          name: product.name,
          sellAmountPartnerShip: product.sellAmountPartnerShip,
          sellAmountGeneral: product.sellAmountGeneral,
          buyAmountPartnerShip: product.buyAmountPartnerShip,
          buyAmountGeneral: product.buyAmountGeneral,
          isDealActive: product.isDealActive,
        }
      : {
          name: "",
          sellAmountPartnerShip: 0,
          sellAmountGeneral: 0,
          buyAmountPartnerShip: 0,
          buyAmountGeneral: 0,
          isDealActive: false,
        },
    mode: "onChange",
  });

  const queryClient = useQueryClient();
  const onSubmit = async (values: ProductFormValues) => {
    if (isUpdate && product) {
      updateMutation.mutate(
        { id: product.id, input: values },
        {
          onSuccess: () => {
            toast.success("محصول با موفقیت ویرایش شد");
            queryClient.invalidateQueries({ queryKey: ["products"] });

            onOpenChange(false);
            form.reset();
          },
          onError: () => {
            toast.error("خطا در ویرایش محصول");
          },
        },
      );
    } else {
      addMutation.mutate(values, {
        onSuccess: () => {
          toast.success("محصول با موفقیت اضافه شد");
          queryClient.invalidateQueries({ queryKey: ["products"] });

          onOpenChange(false);
          form.reset();
        },
      });
    }
  };

  const isSubmitting = addMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger>
        <Button>{isUpdate ? "ویرایش محصول" : "افزودن محصول جدید"}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>
            {isUpdate ? "ویرایش محصول" : "افزودن محصول جدید"}
          </DialogTitle>
        </DialogHeader>

        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 py-2"
          >
            <ProductFormFields />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                انصراف
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || !form.formState.isValid}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    در حال ثبت...
                  </>
                ) : isUpdate ? (
                  "به‌روزرسانی"
                ) : (
                  "ثبت محصول"
                )}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
