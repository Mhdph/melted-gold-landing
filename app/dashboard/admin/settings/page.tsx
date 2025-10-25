"use client";

import { useGetSettings, useUpdateSetting } from "@/services/settings-service";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import SettingsSummary from "@/components/pages/admin/settings/settings-summary";
import SettingCard from "@/components/pages/admin/settings/setting-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Settings, Filter } from "lucide-react";

export default function SettingsPage() {
  const { data: settings, isLoading, isError, error } = useGetSettings();
  const updateSetting = useUpdateSetting();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");

  const handleUpdateSetting = (id: string, value: string) => {
    updateSetting.mutate(
      { id, value },
      {
        onSuccess: () => {
          toast({
            title: "تنظیمات به‌روزرسانی شد",
            description: "تنظیمات با موفقیت به‌روزرسانی شد.",
          });
        },
        onError: (error: any) => {
          toast({
            title: "خطا در به‌روزرسانی",
            description: error?.message || "خطایی رخ داد.",
            variant: "destructive",
          });
        },
      }
    );
  };

  const filteredSettings =
    settings?.filter((setting) => {
      const matchesSearch = setting.key
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesType = filterType === "all" || setting.type === filterType;
      return matchesSearch && matchesType;
    }) || [];

  const getSettingsByType = () => {
    if (!settings) return {};
    return settings.reduce((acc, setting) => {
      if (!acc[setting.type]) {
        acc[setting.type] = [];
      }
      acc[setting.type].push(setting);
      return acc;
    }, {} as Record<string, typeof settings>);
  };

  if (isLoading) {
    return (
      <div className="p-6 lg:p-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-cream/60">در حال بارگذاری تنظیمات...</div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 lg:p-8">
        <Card className="bg-red-500/10 border-red-500/20">
          <CardContent className="p-6">
            <div className="text-red-400 text-center">
              خطا در بارگذاری تنظیمات: {error?.message}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!settings || settings.length === 0) {
    return (
      <div className="p-6 lg:p-8">
        <Card className="bg-white border-gold/20">
          <CardContent className="p-6 text-center">
            <Settings className="h-12 w-12 text-gold/50 mx-auto mb-4" />
            <div className="text-cream/60">هیچ تنظیماتی یافت نشد</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const settingsByType = getSettingsByType();

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gold mb-2">تنظیمات سیستم</h1>
          <p className="text-cream/60">مدیریت و ویرایش تنظیمات سیستم</p>
        </div>
      </div>

      {/* Summary Cards */}
      <SettingsSummary settings={settings} />

      {/* Search and Filter */}
      <Card className="bg-white border-gold/20">
        <CardHeader>
          <CardTitle className="text-gold">جستجو و فیلتر</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Label
                htmlFor="search"
                className="text-cream/80 text-sm mb-2 block"
              >
                جستجو در تنظیمات
              </Label>
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-cream/40" />
                <Input
                  id="search"
                  placeholder="جستجو در نام تنظیمات..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-navy/30 border-gold/20 text-cream pr-10"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <Label
                htmlFor="filter"
                className="text-cream/80 text-sm mb-2 block"
              >
                نوع تنظیمات
              </Label>
              <select
                id="filter"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-3 py-2 bg-navy/30 border border-gold/20 rounded-md text-cream focus:outline-none focus:ring-2 focus:ring-gold/50"
              >
                <option value="all">همه</option>
                <option value="boolean">بولی</option>
                <option value="number">عددی</option>
                <option value="string">متنی</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Settings Tabs */}
      <Tabs dir="rtl" defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-navy/30">
          <TabsTrigger
            value="all"
            className="data-[state=active]:bg-yellow-500/20"
          >
            همه ({settings.length})
          </TabsTrigger>
          <TabsTrigger
            value="boolean"
            className="data-[state=active]:bg-yellow-500/20"
          >
            معاملات ({settingsByType.boolean?.length || 0})
          </TabsTrigger>
          <TabsTrigger
            value="number"
            className="data-[state=active]:bg-yellow-500/20"
          >
            عددی ({settingsByType.number?.length || 0})
          </TabsTrigger>
          <TabsTrigger
            value="string"
            className="data-[state=active]:bg-yellow-500/20"
          >
            متنی ({settingsByType.string?.length || 0})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredSettings.map((setting) => (
              <SettingCard
                key={setting.id}
                setting={setting}
                onUpdate={handleUpdateSetting}
                isUpdating={updateSetting.isPending}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="boolean" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredSettings
              .filter((s) => s.type === "boolean")
              .map((setting) => (
                <SettingCard
                  key={setting.id}
                  setting={setting}
                  onUpdate={handleUpdateSetting}
                  isUpdating={updateSetting.isPending}
                />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="number" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredSettings
              .filter((s) => s.type === "number")
              .map((setting) => (
                <SettingCard
                  key={setting.id}
                  setting={setting}
                  onUpdate={handleUpdateSetting}
                  isUpdating={updateSetting.isPending}
                />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="string" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredSettings
              .filter((s) => s.type === "string")
              .map((setting) => (
                <SettingCard
                  key={setting.id}
                  setting={setting}
                  onUpdate={handleUpdateSetting}
                  isUpdating={updateSetting.isPending}
                />
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {filteredSettings.length === 0 && (
        <Card className="bg-white border-gold/20">
          <CardContent className="p-6 text-center">
            <Filter className="h-12 w-12 text-gold/50 mx-auto mb-4" />
            <div className="text-cream/60">
              هیچ تنظیماتی با فیلترهای انتخابی یافت نشد
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
