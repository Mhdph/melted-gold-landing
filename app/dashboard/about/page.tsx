"use client";

import type React from "react";

import { useState } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Info,
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  Send,
  PhoneCall,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PageTitle from "@/components/page-title";

export default function AboutPage() {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    toast({
      title: "پیام ارسال شد",
      description:
        "پیام شما با موفقیت ارسال شد. به زودی با شما تماس خواهیم گرفت.",
    });

    setName("");
    setPhone("");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-navy flex" dir="rtl">
      <div className="flex-1">
        <main className="container mx-auto px-4 py-8 space-y-6">
          <PageTitle title="درباره ما" description="آشنایی با زروان" />

          {/* About Content */}
          <Card className="bg-white border-gold/20">
            <CardHeader>
              <CardTitle className="text-gold text-2xl">
                درباره زروان{" "}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-0 text-cream/80 leading-relaxed">
              <p>
                زروان از دل تجربه و شناخت عمیق از صنعت طلا متولد شد؛ با هدفی
                روشن:
                <p className="font-bold">
                  ایجاد مسیری مطمئن، شفاف و حرفه‌ای برای خرید و فروش طلا.
                </p>
                نام زروان از اسطوره‌های ایرانی الهام گرفته است — نمادی از زمان و
                ماندگاری. همان‌طور که طلا در گذر سال‌ها ارزش خود را حفظ کرده، ما
                نیز باور داریم که اعتماد و کیفیت باید ماندگار بمانند.
              </p>

              <div>
                زروان با نگاهی مدرن و در عین حال ریشه‌دار، در زمینه‌ی فروش طلای
                آب‌شده، سکه و شمش فعالیت می‌کند و تلاش دارد تجربه‌ای امن و دقیق
                را برای طلافروشان، سازندگان طلا و سرمایه‌گذاران فراهم کند.
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-white border-gold/20">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                    <Phone className="h-6 w-6 text-gold" />
                  </div>
                  <div>
                    <p className="text-sm text-cream/60">معاملات</p>
                    <p className="text-lg font-bold text-cream" dir="ltr">
                      ۰۵۱-۳۷۵۱۲۳۲۳{" "}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-gold/20">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                    <PhoneCall className="h-6 w-6 text-gold" />
                  </div>
                  <div>
                    <p className="text-sm text-cream/60">حسابداری</p>
                    <p className="text-lg font-bold text-cream" dir="ltr">
                      ۰۵۱-۳۷۵۱۲۴۲۴
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-gold/20">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                    <MessageSquare className="h-6 w-6 text-gold" />
                  </div>
                  <div>
                    <p className="text-sm text-cream/60">تلگرام</p>
                    <p className="text-lg font-bold text-cream" dir="ltr">
                      ۰۹۰۲۱۴۹۴۴۲۱
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Address */}
          <Card className="bg-white border-gold/20">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-gold" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gold mb-2">
                    آدرس دفتر مرکزی
                  </h3>
                  <p className="text-cream/80 leading-relaxed">
                    مشهد،بین ابوطالب ۳۵ و ۳۷،بازارچه طلای بهرام زاده،انتهای
                    بازارچه
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
