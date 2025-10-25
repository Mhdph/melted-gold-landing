import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Settings, Shield, DollarSign, ToggleLeft } from "lucide-react";
import { Setting } from "@/services/settings-service";

interface SettingsSummaryProps {
  settings: Setting[];
}

export default function SettingsSummary({ settings }: SettingsSummaryProps) {
  const getSettingsByType = () => {
    const byType = settings.reduce((acc, setting) => {
      if (!acc[setting.type]) {
        acc[setting.type] = [];
      }
      acc[setting.type].push(setting);
      return acc;
    }, {} as Record<string, Setting[]>);

    return byType;
  };

  const getActivePermissions = () => {
    return settings.filter(
      (s) => s.key.includes("permission") && s.value === "true"
    ).length;
  };

  const getTotalPermissions = () => {
    return settings.filter((s) => s.key.includes("permission")).length;
  };

  const settingsByType = getSettingsByType();
  const activePermissions = getActivePermissions();
  const totalPermissions = getTotalPermissions();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Total Settings */}
      <Card className="bg-navy/50 border-gold/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-cream/80">
            کل تنظیمات
          </CardTitle>
          <Settings className="h-4 w-4 text-gold" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gold">{settings.length}</div>
          <p className="text-xs text-cream/60">تنظیمات موجود در سیستم</p>
        </CardContent>
      </Card>

      {/* Active Permissions */}
      <Card className="bg-navy/50 border-gold/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-cream/80">
            مجوزهای فعال
          </CardTitle>
          <Shield className="h-4 w-4 text-green-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-400">
            {activePermissions}/{totalPermissions}
          </div>
          <p className="text-xs text-cream/60">
            مجوزهای فعال از {totalPermissions} مجوز
          </p>
        </CardContent>
      </Card>

      {/* Boolean Settings */}
      <Card className="bg-navy/50 border-gold/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-cream/80">
            تنظیمات بولی
          </CardTitle>
          <ToggleLeft className="h-4 w-4 text-blue-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-400">
            {settingsByType.boolean?.length || 0}
          </div>
          <p className="text-xs text-cream/60">تنظیمات فعال/غیرفعال</p>
        </CardContent>
      </Card>

      {/* Numeric Settings */}
      <Card className="bg-navy/50 border-gold/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-cream/80">
            تنظیمات عددی
          </CardTitle>
          <DollarSign className="h-4 w-4 text-purple-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-400">
            {settingsByType.number?.length || 0}
          </div>
          <p className="text-xs text-cream/60">مقادیر عددی</p>
        </CardContent>
      </Card>
    </div>
  );
}
