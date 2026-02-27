"use client";

import PageTitle from "@/components/page-title";
import ProfileSettings from "@/components/pages/profile/profile-settings";
import { usePriceNotificationWebSocket } from "@/hooks/use-price-notification-websocket";

export default function ProfilePage() {
  // Initialize price notification WebSocket for price change notifications
  usePriceNotificationWebSocket();

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <PageTitle
        title="پروفایل کاربری"
        description="مدیریت اطلاعات شخصی و تنظیمات حساب کاربری"
      />

      <ProfileSettings />
    </div>
  );
}
