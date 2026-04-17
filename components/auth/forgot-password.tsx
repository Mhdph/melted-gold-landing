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
      <Input placeholder="شماره موبایل" {...form.register("mobile")} />

      <Button type="submit" className="w-full" disabled={isPending}>
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
