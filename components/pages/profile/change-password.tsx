import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Lock, Save } from "lucide-react";
import { useChangePassword } from "@/services/user-service";

// -----------------------
//   Validation Schema
// -----------------------
const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(1, "رمز عبور فعلی الزامی است"),
    newPassword: z.string().min(8, "رمز عبور جدید باید حداقل ۸ کاراکتر باشد"),
    confirmPassword: z.string().min(1, "تکرار رمز عبور جدید الزامی است"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "رمز جدید و تکرار آن مطابقت ندارند",
    path: ["confirmPassword"],
  });

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

// -----------------------
//   Main Component
// -----------------------
export default function ChangePasswordForm() {
  const changePassword = useChangePassword();

  const form = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: ChangePasswordFormData) => {
    changePassword.mutate(data, {
      onSuccess: () => form.reset(),
    });
  };

  return (
    <Card className="bg-white dark:bg-slate-800 border-gold/20">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Lock className="h-5 w-5 text-gold" />
          <CardTitle className="text-gold text-lg">تغییر رمز عبور</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Old Password */}
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-cream/80 text-sm">
                    رمز عبور فعلی
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="رمز عبور فعلی را وارد کنید"
                      className="bg-white dark:bg-slate-900 border-gold/20"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* New Password */}
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-cream/80 text-sm">
                    رمز عبور جدید
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="رمز عبور جدید را وارد کنید"
                      className="bg-white dark:bg-slate-900 border-gold/20"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Confirm Password */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-cream/80 text-sm">
                    تکرار رمز عبور جدید
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="رمز عبور جدید را دوباره وارد کنید"
                      className="bg-white dark:bg-slate-900 border-gold/20"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={changePassword.isPending}
              className="w-full border-gold/30 cursor-pointer text-gold hover:bg-gold/10"
            >
              <Save className="h-4 w-4 ml-2" />
              {changePassword.isPending ? "در حال ذخیره..." : "ثبت تغییرات"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
