import { z } from "zod";
import { TransferStatus } from "@/services/remittance.service";

export const transferStatusUpdateSchema = z.object({
  transferId: z.string().min(1, "شناسه انتقال الزامی است"),
  status: z.nativeEnum(TransferStatus, {
    errorMap: () => ({ message: "وضعیت نامعتبر است" }),
  }),
});

export type TransferStatusUpdateFormData = z.infer<
  typeof transferStatusUpdateSchema
>;
