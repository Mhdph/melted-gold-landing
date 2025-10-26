import React, { useState } from "react";
import { Button } from "../ui/button";
import { ArrowLeft, Lock } from "lucide-react";
import { Label } from "../ui/label";
import { Step } from "../login-form";
import { useGetLoginCode, useLogin } from "@/services/auth-service";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface LoginOtpProps {
  setStep: (step: Step) => void;
}
function LoginOtp({ setStep }: LoginOtpProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [countdown, setCountdown] = useState(0);
  const phone = localStorage.getItem("phone");
  const [enabled, setEnabled] = useState(false);

  const { isLoading, isSuccess } = useGetLoginCode(phone!, enabled);

  const { mutate: login, isPending } = useLogin();
  const router = useRouter();

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    login(
      { mobile: phone!, otpCode: otp.join("") },
      {
        onSuccess: (data) => {
          console.log(data, "salam");
          localStorage.setItem("token", data?.access_token);
          localStorage.setItem("role", data.roles);

          router.push("/dashboard/trading");
        },
        onError: () => {
          toast.error("کد تایید یا شماره تماس نادرست است");
        },
      }
    );
  };

  const handleResendOtp = async () => {
    if (countdown > 0) return;
    setEnabled(true);
    setCountdown(120);
  };

  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  return (
    <form onSubmit={handleOtpSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-[#0F1724] font-medium">کد تایید</Label>
          <button
            type="button"
            onClick={() => setStep("phone")}
            className="text-sm text-[#D4AF37] hover:underline flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" />
            تغییر شماره
          </button>
        </div>

        <p className="text-sm text-[#6b6b6b]">
          کد ۶ رقمی ارسال شده به {phone} را وارد کنید
        </p>

        {/* OTP Input */}
        <div className="flex gap-2 justify-center" dir="ltr">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleOtpKeyDown(index, e)}
              className="w-12 h-14 text-center text-2xl font-bold border-2 border-[#e8e3d6] rounded-lg focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37] focus:outline-none transition-all"
            />
          ))}
        </div>

        {/* Countdown and Resend */}
        <div className="text-center">
          {countdown > 0 ? (
            <p className="text-sm text-[#6b6b6b]">
              ارسال مجدد کد تا{" "}
              <span className="font-mono font-bold">
                {formatCountdown(countdown)}
              </span>
            </p>
          ) : (
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={isPending}
              className="text-sm text-[#D4AF37] hover:underline font-medium disabled:opacity-50"
            >
              ارسال مجدد کد
            </button>
          )}
        </div>
      </div>

      <Button
        type="submit"
        disabled={isPending || otp.some((d) => !d)}
        className="w-full bg-[#D4AF37] hover:bg-[#BFA67A] text-[#0F1724] font-bold py-6 rounded-xl transition-all hover:shadow-lg disabled:opacity-50"
      >
        {isPending ? (
          <span className="flex items-center gap-2">
            <span className="w-5 h-5 border-2 border-[#0F1724] border-t-transparent rounded-full animate-spin" />
            در حال تایید...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Lock className="w-5 h-5" />
            ورود به حساب
          </span>
        )}
      </Button>
    </form>
  );
}

export default LoginOtp;
