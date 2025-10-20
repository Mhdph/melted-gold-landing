import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileCheck, TrendingUp, AlertCircle } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    {
      title: "کاربران در انتظار تایید",
      value: "12",
      icon: Users,
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
    },
    {
      title: "تراکنش‌های در انتظار",
      value: "8",
      icon: FileCheck,
      color: "text-gold",
      bgColor: "bg-gold/10",
    },
    {
      title: "کل کاربران فعال",
      value: "247",
      icon: TrendingUp,
      color: "text-green-400",
      bgColor: "bg-green-400/10",
    },
    {
      title: "تراکنش‌های رد شده",
      value: "3",
      icon: AlertCircle,
      color: "text-red-400",
      bgColor: "bg-red-400/10",
    },
  ];

  return (
    <div className="p-6 lg:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gold mb-2">داشبورد مدیریت</h1>
        <p className="text-cream/60">خلاصه وضعیت سیستم</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="bg-navy/50 border-gold/20">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-cream/80">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-navy/50 border-gold/20">
          <CardHeader>
            <CardTitle className="text-gold">
              آخرین درخواست‌های کاربران
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-lg bg-cream/5"
                >
                  <div>
                    <p className="text-cream font-medium">علی محمدی</p>
                    <p className="text-sm text-cream/60">09123456789</p>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-gold/10 text-gold">
                    در انتظار
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-navy/50 border-gold/20">
          <CardHeader>
            <CardTitle className="text-gold">آخرین تراکنش‌ها</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-lg bg-cream/5"
                >
                  <div>
                    <p className="text-cream font-medium">خرید 10 گرم طلا</p>
                    <p className="text-sm text-cream/60">محمد رضایی</p>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-gold/10 text-gold">
                    در انتظار
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
