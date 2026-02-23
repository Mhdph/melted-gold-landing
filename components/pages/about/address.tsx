import { Card, CardContent } from "@/components/ui/card";
import { MapPinIcon } from "lucide-react";
import React from "react";

function Address() {
  return (
    <Card className="bg-white dark:bg-slate-800 border-gold/20">
      <CardContent className="pt-6">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
            <MapPinIcon className="h-6 w-6 text-gold" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gold mb-2">
              آدرس دفتر مرکزی
            </h3>
            <p className="text-cream/80 leading-relaxed">
              مشهد،بین ابوطالب ۳۵ و ۳۷،بازارچه طلای بهرام زاده،انتهای بازارچه
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default Address;
