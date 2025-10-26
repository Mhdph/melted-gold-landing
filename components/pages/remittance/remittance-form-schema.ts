import { z } from "zod";

export const remittanceFormSchema = z.object({
  value: z
    .number({
      required_error: "مقدار الزامی است",
      invalid_type_error: "مقدار باید عدد باشد",
    })
    .min(0.01, "مقدار باید بیشتر از صفر باشد")
    .max(999999999, "مقدار خیلی بزرگ است"),

  valueType: z.enum(["gold", "mony"], {
    required_error: "نوع مقدار الزامی است",
    invalid_type_error: "نوع مقدار نامعتبر است",
  }),

  receiver: z
    .string({
      required_error: "نام گیرنده الزامی است",
    })
    .min(2, "نام گیرنده باید حداقل 2 کاراکتر باشد")
    .max(100, "نام گیرنده خیلی طولانی است")
    .regex(/^[\u0600-\u06FF\s]+$/, "نام گیرنده باید فارسی باشد"),
});

export type RemittanceFormData = z.infer<typeof remittanceFormSchema>;
