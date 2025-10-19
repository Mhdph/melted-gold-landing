import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Phone } from "lucide-react";
import { Label } from "../ui/label";
import { useGetLoginCode } from "@/services/auth-service";
import { Step } from "../login-form";

interface LoginPhoneProps {
  setStep: (step: Step) => void;
}

function LoginPhone({ setStep }: LoginPhoneProps) {
  const [phone, setPhone] = useState("");
  const [enabled, setEnabled] = useState(false);

  const { isLoading, isSuccess } = useGetLoginCode(phone, enabled);

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnabled(!enabled);
    localStorage.setItem("phone", phone);
  };

  useEffect(() => {
    if (isSuccess) {
      setStep("otp");
      localStorage.setItem("phone", phone);
    }
  }, [isSuccess]);

  return (
    <form onSubmit={handlePhoneSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="phone" className="text-[#0F1724] font-medium">
          شماره موبایل
        </Label>
        <div className="relative">
          <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b6b6b]" />
          <Input
            id="phone"
            type="tel"
            placeholder="09123456789"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="pr-10 text-left dir-ltr bg-white border-[#e8e3d6] focus:border-[#D4AF37] focus:ring-[#D4AF37]"
            required
            pattern="09[0-9]{9}"
            maxLength={11}
          />
        </div>
        <p className="text-xs text-[#6b6b6b]">
          کد تایید به این شماره ارسال می‌شود
        </p>
      </div>

      <Button
        type="submit"
        disabled={isLoading || phone.length !== 11}
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
  );
}

export default LoginPhone;
