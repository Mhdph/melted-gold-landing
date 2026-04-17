"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useResetPasswordConfirm } from "@/services/auth-service";
import { Step } from "../login-form";
interface LoginOtpProps {
  setStep: (step: Step) => void;
  phone: string;
}

export default function ResetPassword({ setStep, phone }: LoginOtpProps) {
  const form = useForm();
  const { mutate, isPending } = useResetPasswordConfirm();

  const onSubmit = (values: any) => {
    mutate(
      {
        ...values,
        mobile: phone,
      },
      {
        onSuccess: () => setStep("password"),
      },
    );
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
      <Input placeholder="کد ارسال شده" {...form.register("otp")} />

      <Input
        placeholder="رمز جدید"
        type="password"
        {...form.register("newPassword")}
      />

      <Button type="submit" className="w-full" disabled={isPending}>
        تایید و تغییر رمز
      </Button>
    </form>
  );
}
