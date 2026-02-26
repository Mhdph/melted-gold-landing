"use client";

import { useGetSettings, useUpdateSetting } from "@/services/settings-service";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import SettingsSummary from "@/components/pages/admin/settings/settings-summary";
import SettingCard from "@/components/pages/admin/settings/setting-card";
import PriceModeCard from "@/components/pages/admin/settings/price-mode-card";
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

  console.log(settings);

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gold mb-2">تنظیمات سیستم</h1>
          <p className="text-cream/60">مدیریت و ویرایش تنظیمات سیستم</p>
        </div>
      </div>

      {/* Settings Tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Price Mode Card */}
        <PriceModeCard />
        
        {/* Other Settings Cards */}
        {settings?.map((setting) => (
          <SettingCard
            key={setting.id}
            setting={setting}
            onUpdate={handleUpdateSetting}
            isUpdating={updateSetting.isPending}
          />
        ))}
      </div>
    </div>
  );
}
