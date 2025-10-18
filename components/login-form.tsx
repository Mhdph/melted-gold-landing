"use client";

import { useState } from "react";
import LoginOtp from "./auth/login-otp";
import LoginPhone from "./auth/login-phone";
export type Step = "phone" | "otp";

export function LoginForm() {
  const [step, setStep] = useState<Step>("phone");

  if (step === "phone") {
    return <LoginPhone setStep={setStep} />;
  } else if (step === "otp") {
    return <LoginOtp setStep={setStep} />;
  }
}
