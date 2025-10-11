"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Phone, Lock, ArrowLeft } from "lucide-react"

type Step = "phone" | "otp"

export function LoginForm() {
  const [step, setStep] = useState<Step>("phone")
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [isLoading, setIsLoading] = useState(false)
  const [countdown, setCountdown] = useState(0)

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call to send OTP
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsLoading(false)
    setStep("otp")
    setCountdown(120) // 2 minutes countdown

    // Start countdown
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      nextInput?.focus()
    }
  }

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`)
      prevInput?.focus()
    }
  }

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call to verify OTP
    await new Promise((resolve) => setTimeout(resolve, 1500))

    console.log("[v0] OTP verified:", otp.join(""))
    setIsLoading(false)

    // Redirect to dashboard or home
    window.location.href = "/"
  }

  const handleResendOtp = async () => {
    if (countdown > 0) return

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)

    setCountdown(120)
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  if (step === "phone") {
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
          <p className="text-xs text-[#6b6b6b]">کد تایید به این شماره ارسال می‌شود</p>
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
    )
  }

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

        <p className="text-sm text-[#6b6b6b]">کد ۶ رقمی ارسال شده به {phone} را وارد کنید</p>

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
              ارسال مجدد کد تا <span className="font-mono font-bold">{formatCountdown(countdown)}</span>
            </p>
          ) : (
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={isLoading}
              className="text-sm text-[#D4AF37] hover:underline font-medium disabled:opacity-50"
            >
              ارسال مجدد کد
            </button>
          )}
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading || otp.some((d) => !d)}
        className="w-full bg-[#D4AF37] hover:bg-[#BFA67A] text-[#0F1724] font-bold py-6 rounded-xl transition-all hover:shadow-lg disabled:opacity-50"
      >
        {isLoading ? (
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
  )
}
