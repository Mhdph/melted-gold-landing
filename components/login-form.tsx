"use client";

import { useState } from "react";
import LoginOtp from "./auth/login-otp";
import LoginPhone from "./auth/login-phone";
import LoginPassword from "./auth/login-with-password";
import ResetPassword from "./auth/reset-password";
import ForgotPassword from "./auth/forgot-password";

export type Step = "phone" | "otp" | "password" | "forgot" | "reset";

export function LoginForm() {
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");

  if (step === "phone") {
    return <LoginPhone setStep={setStep} setPhone={setPhone} />;
  }

  if (step === "otp") {
    return <LoginOtp setStep={setStep} phone={phone} />;
  }

  if (step === "password") {
    return <LoginPassword setStep={setStep} setPhone={setPhone} />;
  }

  if (step === "forgot") {
    return <ForgotPassword setStep={setStep} setPhone={setPhone} />;
  }

  if (step === "reset") {
    return <ResetPassword setStep={setStep} phone={phone} />;
  }

  return null;
}
