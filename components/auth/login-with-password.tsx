"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLoginWithPassword } from "@/services/auth-service";
import { Step } from "../login-form";

interface LoginOtpProps {
  setStep: (step: Step) => void;
  setPhone: (phone: string) => void;
}

export default function LoginPassword({ setStep, setPhone }: LoginOtpProps) {
  const form = useForm();
  const { mutate, isPending } = useLoginWithPassword();

  const onSubmit = (values: any) => {
    setPhone(values.mobile);
    mutate(values);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <Input placeholder="شماره موبایل" {...form.register("mobile")} />

      <Input
        placeholder="رمز عبور"
        type="password"
        {...form.register("password")}
      />

      <Button type="submit" className="w-full" disabled={isPending}>
        ورود با رمز عبور
      </Button>

      <div className="text-center text-sm">
        <button
          type="button"
          className="text-blue-600"
          onClick={() => setStep("forgot")}
        >
          فراموشی رمز عبور
        </button>
      </div>

      <div className="text-center text-sm">
        <button
          type="button"
          className="text-blue-600"
          onClick={() => setStep("phone")}
        >
          ورود با OTP
        </button>
      </div>
    </form>
  );
}
