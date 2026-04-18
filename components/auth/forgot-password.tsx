"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useResetPasswordRequest } from "@/services/auth-service";
import { Step } from "../login-form";

interface LoginOtpProps {
  setStep: (step: Step) => void;
  setPhone: (phone: string) => void;
}

export default function ForgotPassword({ setStep, setPhone }: LoginOtpProps) {
  const form = useForm();
  const { mutate, isPending } = useResetPasswordRequest();

  const onSubmit = (values: any) => {
    setPhone(values.mobile);
    mutate(values, {
      onSuccess: () => setStep("reset"),
    });
    setStep("reset");
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <Input
        className="pr-10 text-left dir-ltr bg-white dark:bg-white dark:text-gray-900 border-[#e8e3d6] focus:border-[#D4AF37] focus:ring-[#D4AF37]"
        placeholder="09121234567"
        {...form.register("mobile")}
      />

      <Button
        type="submit"
        className="w-full bg-[#D4AF37] hover:bg-[#BFA67A] text-[#0F1724] font-bold py-2 rounded-xl transition-all hover:shadow-lg disabled:opacity-50"
        disabled={isPending}
      >
        ارسال کد بازیابی
      </Button>

      <div className="text-center text-sm">
        <button type="button" onClick={() => setStep("password")}>
          برگشت به ورود
        </button>
      </div>
    </form>
  );
}
