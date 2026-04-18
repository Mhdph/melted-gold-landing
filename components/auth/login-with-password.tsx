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
      <Input
        className=" text-right bg-white dark:bg-white dark:text-gray-900 border-[#e8e3d6] focus:border-[#D4AF37] focus:ring-[#D4AF37]"
        placeholder="شماره موبایل"
        {...form.register("mobile")}
      />

      <Input
        className=" text-right bg-white dark:bg-white dark:text-gray-900 border-[#e8e3d6] focus:border-[#D4AF37] focus:ring-[#D4AF37]"
        placeholder="رمز عبور"
        type="password"
        {...form.register("password")}
      />

      <Button
        className="w-full bg-[#D4AF37] hover:bg-[#BFA67A] text-[#0F1724] font-bold py-2 rounded-xl transition-all hover:shadow-lg disabled:opacity-50"
        type="submit"
        disabled={isPending}
      >
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
