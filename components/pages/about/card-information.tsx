import { Card, CardContent } from "@/components/ui/card";
import { MessageSquareIcon, PhoneCallIcon, PhoneIcon } from "lucide-react";

function CardInformation() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="bg-white dark:bg-slate-800 border-gold/20">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
              <PhoneIcon className="h-6 w-6 text-gold" />
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

      <Card className="bg-white dark:bg-slate-800 border-gold/20">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
              <PhoneCallIcon className="h-6 w-6 text-gold" />
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

      <Card className="bg-white dark:bg-slate-800 border-gold/20">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
              <MessageSquareIcon className="h-6 w-6 text-gold" />
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
  );
}

export default CardInformation;
