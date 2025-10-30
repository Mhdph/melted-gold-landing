import { z } from "zod";

// Transaction approval form schema
export const transactionApprovalSchema = z.object({
  transactionId: z.string().min(1, "شناسه تراکنش الزامی است"),
  action: z.enum(["approve", "reject"], {
    errorMap: () => ({ message: "عملیات نامعتبر است" }),
  }),
  reason: z.string().optional(),
});

export type TransactionApprovalFormData = z.infer<
  typeof transactionApprovalSchema
>;

// Transaction filters form schema
export const transactionFiltersSchema = z.object({
  searchQuery: z.string().optional(),
  filterStatus: z
    .enum(["all", "pending", "approved", "rejected"])
    .default("pending"),
  page: z.number().min(1).default(1),
  pageSize: z.number().min(1).max(100).default(10),
});

export type TransactionFiltersFormData = z.infer<
  typeof transactionFiltersSchema
>;
