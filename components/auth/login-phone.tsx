"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Phone } from "lucide-react";
import { useGetLoginCode } from "@/services/auth-service";
import { Step } from "../login-form";
import { persianToEnglish } from "@/lib/utils";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

interface LoginPhoneProps {
  setStep: (step: Step) => void;
}

type FormValues = {
  phone: string;
};

function LoginPhone({ setStep }: LoginPhoneProps) {
  const [enabled, setEnabled] = useState(false);

  const form = useForm<FormValues>({
    defaultValues: {
      phone: "",
    },
    mode: "onChange",
  });

  const phoneValue = form.watch("phone");

  const { isLoading, isSuccess } = useGetLoginCode(phoneValue, enabled);

  const onSubmit = (data: FormValues) => {
    setEnabled(true);
    localStorage.setItem("phone", data.phone);
  };

  useEffect(() => {
    if (isSuccess) {
      setStep("otp");
    }
  }, [isSuccess, setStep]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="phone"
          rules={{
            required: "شماره موبایل الزامی است",
            pattern: {
              value: /^09\d{9}$/,
              message: "شماره موبایل معتبر نیست",
            },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#0F1724] font-medium">
                شماره موبایل
              </FormLabel>

              <FormControl>
                <div className="relative">
                  <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b6b6b]" />
                  <Input
                    {...field}
                    type="tel"
                    placeholder="09123456789"
                    maxLength={11}
                    className="pr-10 text-left dir-ltr bg-white border-[#e8e3d6] focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                    onChange={(e) => {
                      const converted = persianToEnglish(e.target.value);
                      field.onChange(converted);
                    }}
                  />
                </div>
              </FormControl>

              <p className="text-xs text-[#6b6b6b]">
                کد تایید به این شماره ارسال می‌شود
              </p>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isLoading || phoneValue.length !== 11}
          className="w-full bg-[#D4AF37] hover:bg-[#BFA67A] text-[#0F1724] font-bold py-6 rounded-xl transition-all hover:shadow-lg disabled:opacity-50"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="w-5 h-5 border-2 border-[#0F1724] border-t-transparent rounded-full animate-spin" />
              در حال ارسال...
            </span>
          ) : (
            "دریافت کد تایید"
          )}
        </Button>
      </form>
    </Form>
  );
}

export default LoginPhone;
