"use client";
import logo from "@/assets/images/zarvaan.png";
import logoDark from "@/assets/images/zavran-dark.png";
import Address from "@/components/pages/about/address";
import { Card, CardContent } from "@/components/ui/card";
import { Link2Icon, LinkIcon, PhoneIcon } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

function page() {
  const { theme } = useTheme();
  return (
    <div className="h-screen font-vazir flex gap-4 px-4 text-center flex-col  justify-center bg-white dark:bg-[#000e1f] ">
      <div className="flex items-center justify-center">
        <img
          className="size-40"
          src={theme === "dark" ? logoDark.src : logo.src}
          alt=""
        />
      </div>
      <p className="text-gray-800 dark:text-gray-300 text-base">زروان</p>
      <p className="text-gray-600 text-sm dark:text-gray-200">
        {" "}
        زروان از دل تجربه و شناخت عمیق از صنعت طلا با هدف ایجاد مسیری مطمئن،
        شفاف و حرفه‌ای برای خرید و فروش طلا. متولد شد
      </p>
      <Card className="bg-white dark:bg-slate-800 border-gold/20">
        <CardContent className="w-full">
          <div className="flex  gap-3 flex-col w-full">
            <div className="text-right bg-gold/10 flex gap-1 items-center">
              <LinkIcon className="size-4 text-gold" />
              <p>لینک های مفید ما:</p>
            </div>

            <div className="flex border p-2 gap-1 text-sm text-gray-700 dark:text-gray-300">
              {" "}
              <Link2Icon />
              <Link href="/">نرم افزار معاملات</Link>
            </div>
            <div className="flex border p-2 gap-1  text-sm text-gray-700 dark:text-gray-300">
              {" "}
              <Link2Icon />
              <Link href="https://t.me/zarvangoldonline">کانال اعلام قیمت</Link>
            </div>
            <div className="flex border p-2 gap-1  text-sm text-gray-700 dark:text-gray-300">
              {" "}
              <Link2Icon />
              <Link href="https://t.me/zaarvan4421">تلگرام حسابداری</Link>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-white dark:bg-slate-800 border-gold/20">
        <CardContent className="w-full">
          <div className="flex  gap-3 flex-col w-full">
            <div className="text-right bg-gold/10 flex gap-1 items-center">
              <PhoneIcon className="size-4 text-gold" />
              <p>شماره تماس ها:</p>
            </div>
            <div>
              <p className="text-sm text-right text-cream/60">معاملات</p>
              <p className="text-lg flex gap-1 flex-col text-left font-bold text-cream">
                <p>۰۵۱-۳۷۵۱۲۱۲۱</p>
                <p>۰۵۱-۳۷۵۱۲۳۲۳</p>
              </p>
            </div>
            <div>
              <p className="text-sm text-right text-cream/60">حسابداری</p>
              <p className="text-lg text-left font-bold text-cream" dir="ltr">
                ۰۵۱-۳۷۵۱۲۴۲۴
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Address />
    </div>
  );
}

export default page;
