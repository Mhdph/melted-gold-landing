"use client";
import Link from "next/link";
import logo from "@/assets/images/zavran-dark.png";
import Image from "next/image";
import SignUpForm from "@/components/auth/signup-form";
import LoginOtp from "@/components/auth/login-otp";
import { useState } from "react";

export default function SignupPage() {
  const [step, setStep] = useState<string>("signup");

  if (step === "signup") {
    return (
      <div className="min-h-screen  flex items-center justify-center p-4">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 w-64 h-64 bg-[#d7b46a] opacity-5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#d7b46a] opacity-3 rounded-full blur-3xl" />
        </div>

        <div className="w-full max-w-md relative z-10">
          {/* Logo/Brand */}
          <div className="flex justify-center items-center">
            <Image src={logo} alt="logo" width={200} height={200} />
          </div>

          {/* Login Card */}
          <div className="bg-[#F6F5EE] rounded-2xl shadow-2xl p-8 border border-[#d7b46a]/20">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#0F1724] mb-2">
                ساخت اکانت کاربری
              </h2>
              <p className="text-[#6b6b6b]">
                برای دسترسی به پنل کاربری ابتدا یک حساب بسازید
              </p>
            </div>
            <SignUpForm setStep={setStep} />
            <div className="flex items-center gap-0.5 justify-center mt-3">
              <p className=" text-sm text-[#6b6b6b]">اکانت کاربری دارید؟</p>
              <Link className="text-sm" href="/">
                ورود
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (step === "otp") {
    return ( <div className="min-h-screen  flex items-center justify-center p-4">
    {/* Background decorative elements */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-20 right-20 w-64 h-64 bg-[#d7b46a] opacity-5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#d7b46a] opacity-3 rounded-full blur-3xl" />
    </div>

    <div className="w-full max-w-md relative z-10">
      {/* Logo/Brand */}
      <div className="flex justify-center items-center">
        <Image src={logo} alt="logo" width={200} height={200} />
      </div>

      {/* Login Card */}
      <div className="bg-[#F6F5EE] rounded-2xl shadow-2xl p-8 border border-[#d7b46a]/20">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#0F1724] mb-2">
تکمیل ثبت نام         </h2>
          <p className="text-[#6b6b6b]">
            کد تایید را وارد کنید
          </p>
        </div>
        <LoginOtp setStep={setStep} />
     
      </div>
    </div>
  </div>)}
}
