import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function AboutCard() {
  return (
    <Card className="bg-white dark:bg-slate-800 border-gold/20">
      <CardHeader>
        <CardTitle className="text-gold text-2xl">درباره زروان </CardTitle>
      </CardHeader>
      <CardContent className="space-y-0 text-cream/80 leading-relaxed">
        <p>
          زروان از دل تجربه و شناخت عمیق از صنعت طلا متولد شد؛ با هدفی روشن:
          <p className="font-bold">
            ایجاد مسیری مطمئن، شفاف و حرفه‌ای برای خرید و فروش طلا.
          </p>
          نام زروان از اسطوره‌های ایرانی الهام گرفته است — نمادی از زمان و
          ماندگاری. همان‌طور که طلا در گذر سال‌ها ارزش خود را حفظ کرده، ما نیز
          باور داریم که اعتماد و کیفیت باید ماندگار بمانند.
        </p>

        <div>
          زروان با نگاهی مدرن و در عین حال ریشه‌دار، در زمینه‌ی فروش طلای
          آب‌شده، سکه و شمش فعالیت می‌کند و تلاش دارد تجربه‌ای امن و دقیق را
          برای طلافروشان، سازندگان طلا و سرمایه‌گذاران فراهم کند.
        </div>
      </CardContent>
    </Card>
  );
}

export default AboutCard;
