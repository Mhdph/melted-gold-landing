"use client";

import { useState } from "react";
import LoginOtp from "./auth/login-otp";
import LoginPhone from "./auth/login-phone";

export type Step = "phone" | "otp";

export function LoginForm() {
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");

  if (step === "phone") {
    return <LoginPhone setStep={setStep} setPhone={setPhone} />;
  }

  return <LoginOtp setStep={setStep} phone={phone} />;
}
