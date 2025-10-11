"use client"

import type React from "react"

import { useState } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Info, Phone, Mail, MapPin, MessageSquare, Send } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function AboutPage() {
  const { toast } = useToast()
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    toast({
      title: "پیام ارسال شد",
      description: "پیام شما با موفقیت ارسال شد. به زودی با شما تماس خواهیم گرفت.",
    })

    setName("")
    setPhone("")
    setMessage("")
  }

  return (
    <div className="min-h-screen bg-navy flex" dir="rtl">
      <Sidebar />

      <div className="flex-1 lg:mr-64">
        <main className="container mx-auto px-4 py-8 space-y-6">
          {/* Page Header */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
              <Info className="h-6 w-6 text-gold" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gold">درباره ما</h1>
              <p className="text-cream/60">آشنایی با طلای آب‌شده</p>
            </div>
          </div>

          {/* About Content */}
          <Card className="bg-navy/50 border-gold/20">
            <CardHeader>
              <CardTitle className="text-gold text-2xl">طلای آب‌شده - سرمایه‌گذاری مطمئن</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-cream/80 leading-relaxed">
              <p>
                طلای آب‌شده یکی از معتبرترین و قدیمی‌ترین مراکز خرید و فروش طلای خالص در ایران است. ما با بیش از ۲۰ سال
                سابقه درخشان در این صنعت، به ارائه خدمات با کیفیت و قابل اعتماد به مشتریان خود افتخار می‌کنیم.
              </p>

              <p>
                تمامی محصولات ما دارای گواهی خلوص از آزمایشگاه‌های معتبر بین‌المللی بوده و با بسته‌بندی اختصاصی و ایمن به
                دست شما می‌رسد. ما متعهد هستیم که بهترین قیمت بازار را برای خرید و فروش طلا به شما ارائه دهیم.
              </p>

              <div className="bg-gold/10 border border-gold/30 rounded-lg p-6 my-6">
                <h3 className="text-xl font-bold text-gold mb-4">ارزش‌های ما</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-gold mt-1">•</span>
                    <span>
                      <strong className="text-gold">اعتماد:</strong> شفافیت کامل در تمام مراحل خرید و فروش
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold mt-1">•</span>
                    <span>
                      <strong className="text-gold">کیفیت:</strong> ارائه طلای خالص با بالاترین عیار
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold mt-1">•</span>
                    <span>
                      <strong className="text-gold">امنیت:</strong> بسته‌بندی حرفه‌ای و بیمه ارسال
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold mt-1">•</span>
                    <span>
                      <strong className="text-gold">پشتیبانی:</strong> خدمات پس از فروش و بازخرید تضمینی
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                ماموریت ما ایجاد بستری امن و مطمئن برای سرمایه‌گذاری در طلا است. ما باور داریم که هر ایرانی باید بتواند
                به راحتی و با اطمینان خاطر، در طلا سرمایه‌گذاری کند.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-navy/50 border-gold/20">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                    <Phone className="h-6 w-6 text-gold" />
                  </div>
                  <div>
                    <p className="text-sm text-cream/60">تلفن تماس</p>
                    <p className="text-lg font-bold text-cream" dir="ltr">
                      021-12345678
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-navy/50 border-gold/20">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                    <MessageSquare className="h-6 w-6 text-gold" />
                  </div>
                  <div>
                    <p className="text-sm text-cream/60">واتساپ</p>
                    <p className="text-lg font-bold text-cream" dir="ltr">
                      0912-345-6789
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-navy/50 border-gold/20">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                    <Mail className="h-6 w-6 text-gold" />
                  </div>
                  <div>
                    <p className="text-sm text-cream/60">ایمیل</p>
                    <p className="text-lg font-bold text-cream" dir="ltr">
                      info@meltedgold.ir
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="bg-navy/50 border-gold/20">
            <CardHeader>
              <CardTitle className="text-gold">تماس با ما</CardTitle>
              <CardDescription className="text-cream/60">
                سوالات یا پیشنهادات خود را با ما در میان بگذارید
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-cream">
                      نام و نام خانوادگی
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="نام خود را وارد کنید"
                      className="bg-navy border-gold/30 text-cream"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-cream">
                      شماره تماس
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="شماره تماس خود را وارد کنید"
                      className="bg-navy border-gold/30 text-cream"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-cream">
                    پیام
                  </Label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="پیام خود را بنویسید..."
                    className="bg-navy border-gold/30 text-cream min-h-[120px]"
                    required
                  />
                </div>

                <Button type="submit" className="w-full bg-gold hover:bg-gold/90 text-navy font-bold">
                  <Send className="ml-2 h-4 w-4" />
                  ارسال پیام
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Address */}
          <Card className="bg-navy/50 border-gold/20">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-gold" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gold mb-2">آدرس دفتر مرکزی</h3>
                  <p className="text-cream/80 leading-relaxed">
                    تهران، خیابان ولیعصر، نرسیده به میدان ونک، پلاک ۱۲۳۴، طبقه سوم، واحد ۸
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
