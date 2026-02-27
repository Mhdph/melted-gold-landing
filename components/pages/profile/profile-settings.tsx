import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Save, Edit3, X, User, Bell, Shield, Phone } from "lucide-react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  useOneMyUserInfo,
  useUpdateProfile,
  useGetPriceNotification,
  useUpdatePriceNotification,
} from "@/services/user-service";

const profileSchema = z.object({
  name: z.string().min(1, "نام الزامی است"),
  lastName: z.string().min(1, "نام خانوادگی الزامی است"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProfileSettings() {
  const [isEditing, setIsEditing] = useState(false);
  const { data: userProfile, isLoading: isLoadingProfile } = useOneMyUserInfo();
  const { data: priceNotification, isLoading: isLoadingNotification } =
    useGetPriceNotification();
  const updateProfile = useUpdateProfile();
  const updatePriceNotification = useUpdatePriceNotification();

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: userProfile?.name || "",
      lastName: userProfile?.lastName || "",
    },
  });

  // Reset form when profile data changes or editing mode changes
  useEffect(() => {
    if (!isEditing && userProfile) {
      form.reset({ name: userProfile.name, lastName: userProfile.lastName });
    }
  }, [userProfile, isEditing, form]);

  const handleSaveProfile = (data: ProfileFormData) => {
    updateProfile.mutate(
      { name: data.name, lastName: data.lastName },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      }
    );
  };

  const handleCancel = () => {
    form.reset({ name: userProfile?.name || "", lastName: userProfile?.lastName || "" });
    setIsEditing(false);
  };

  const handleToggleNotification = (enabled: boolean) => {
    updatePriceNotification.mutate({ enabled });
  };

  const formatPhoneNumber = (phone: string) => {
    if (!phone) return "";
    return phone.replace(/(\d{4})(\d{3})(\d{4})/, "$1 $2 $3");
  };

  if (isLoadingProfile || isLoadingNotification) {
    return (
      <div className="space-y-6">
        <Card className="bg-white dark:bg-slate-800 border-gold/20">
          <CardContent className="p-6">
            <div className="text-cream/60 text-center">در حال بارگذاری...</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Profile Information Card */}
      <Card className="bg-white dark:bg-slate-800 border-gold/20">
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-gold" />
            <CardTitle className="text-gold text-lg">اطلاعات شخصی</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSaveProfile)} className="space-y-4">
              {/* Mobile (Read-only) */}
              <div className="space-y-2">
                <Label className="text-cream/80 text-sm flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  شماره موبایل
                </Label>
                <div className="p-3 bg-gray-50 dark:bg-slate-900 rounded-lg border border-gold/10">
                  <span className="text-cream" dir="ltr">
                    {formatPhoneNumber(userProfile?.mobile || "")}
                  </span>
                </div>
              </div>

              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-cream/80 text-sm">نام</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={!isEditing}
                        className="bg-white dark:bg-slate-900 border-gold/20"
                        placeholder="نام خود را وارد کنید"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              {/* Last Name */}
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-cream/80 text-sm">نام خانوادگی</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={!isEditing}
                        className="bg-white dark:bg-slate-900 border-gold/20"
                        placeholder="نام خانوادگی خود را وارد کنید"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              {/* Account Status */}
              <div className="space-y-2">
                <Label className="text-cream/80 text-sm flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  وضعیت حساب
                </Label>
                <div className="p-3 bg-gray-50 dark:bg-slate-900 rounded-lg border border-gold/10">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        userProfile?.verify ? "bg-green-500" : "bg-red-500"
                      }`}
                    />
                    <span className="text-cream">
                      {userProfile?.verify ? "احراز هویت شده" : "تایید نشده"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Edit/Save/Cancel Buttons */}
              {!isEditing ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditing(true)}
                  className="w-full border-gold/30 text-gold hover:bg-gold/10"
                >
                  <Edit3 className="h-4 w-4 ml-2" />
                  ویرایش پروفایل
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    type="submit"
                    disabled={updateProfile.isPending}
                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white"
                  >
                    <Save className="h-4 w-4 ml-2" />
                    {updateProfile.isPending ? "در حال ذخیره..." : "ذخیره"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    className="flex-1 border-red-400/30 text-red-400 hover:bg-red-400/10"
                  >
                    <X className="h-4 w-4 ml-2" />
                    لغو
                  </Button>
                </div>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Price Notification Card */}
      <Card className="bg-white dark:bg-slate-800 border-gold/20">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-gold" />
            <CardTitle className="text-gold text-lg">
              نوتیفیکیشن تغییر قیمت
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-900 rounded-lg border border-gold/10">
            <div>
              <p className="text-cream font-medium">
                دریافت نوتیفیکیشن تغییر قیمت
              </p>
              <p className="text-cream/60 text-sm">
                با فعال‌سازی این گزینه، هنگام تغییر قیمت اعلان دریافت خواهید کرد
              </p>
            </div>
            <Switch
              checked={priceNotification?.enabled ?? false}
              onCheckedChange={handleToggleNotification}
              disabled={updatePriceNotification.isPending}
            />
          </div>
          <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <Shield className="h-4 w-4 text-blue-500" />
            <p className="text-blue-700 dark:text-blue-300 text-sm">
              این نوتیفیکیشن‌ها از طریق WebSocket ارسال می‌شوند و در زمان واقعی
              تغییرات قیمت را به شما اطلاع می‌دهند.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
