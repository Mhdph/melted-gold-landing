import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Save, Edit3, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  useGetPriceMode,
  useUpdatePriceMode,
} from "@/services/settings-service";
import { useToast } from "@/hooks/use-toast";

const priceModeSchema = z.object({
  enabled: z.boolean(),
});

type PriceModeFormData = z.infer<typeof priceModeSchema>;

export default function PriceModeCard() {
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();
  const { data: priceModeData, isLoading } = useGetPriceMode();
  const updatePriceMode = useUpdatePriceMode();

  const form = useForm<PriceModeFormData>({
    resolver: zodResolver(priceModeSchema),
    defaultValues: {
      enabled: priceModeData?.isManualMode ?? false,
    },
  });

  // Reset form when price mode data changes or editing mode changes
  useEffect(() => {
    if (!isEditing && priceModeData !== undefined) {
      form.reset({ enabled: priceModeData.isManualMode });
    }
  }, [priceModeData, isEditing, form]);

  const handleSave = (data: PriceModeFormData) => {
    if (data.enabled !== priceModeData?.isManualMode) {
      updatePriceMode.mutate(
        { enabled: data.enabled },
        {
          onSuccess: () => {
            toast({
              title: "حالت قیمت به‌روزرسانی شد",
              description: "حالت قیمت با موفقیت به‌روزرسانی شد.",
            });
            setIsEditing(false);
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
    } else {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    form.reset({ enabled: priceModeData?.isManualMode ?? false });
    setIsEditing(false);
  };

  const formatMode = (isManual: boolean) => {
    return isManual ? "دستی" : "خودکار";
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fa-IR").format(price);
  };

  if (isLoading) {
    return (
      <Card className="bg-white dark:bg-slate-800 border-gold/20">
        <CardContent className="p-6">
          <div className="text-cream/60 text-center">در حال بارگذاری...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white dark:bg-slate-800 border-gold/20 hover:border-gold/30 transition-colors">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-gold text-lg">حالت قیمت</CardTitle>
          <div className="flex items-center gap-2">
            {!isEditing && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsEditing(true)}
                className="border-gold/30 text-gold hover:bg-gold/10"
              >
                <Edit3 className="h-4 w-4 ml-1" />
                ویرایش
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSave)} className="space-y-4">
            <div className="space-y-2">
              <Label className="text-cream/80 text-sm">حالت فعلی:</Label>
              {!isEditing ? (
                <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-gold/10">
                  <span className="text-cream">
                    {formatMode(priceModeData?.isManualMode ?? false)}
                  </span>
                </div>
              ) : (
                <FormField
                  control={form.control}
                  name="enabled"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex items-center space-x-2 gap-2 space-x-reverse">
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                          <Label className="text-sm text-cream/80">
                            {field.value ? "دستی" : "خودکار"}
                          </Label>
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              )}
            </div>

            {/* {priceModeData && (
              <div className="space-y-2">
                <Label className="text-cream/80 text-sm">قیمت فعلی:</Label>
                <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-gold/10">
                  <span className="text-cream" dir="ltr">
                    {formatPrice(priceModeData.currentPrice)} تومان
                  </span>
                </div>
              </div>
            )}

            {priceModeData && (
              <div className="space-y-2">
                <Label className="text-cream/80 text-sm">تغییر درصد:</Label>
                <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-gold/10">
                  <span className="text-cream" dir="ltr">
                    {priceModeData.changePercent}%
                  </span>
                </div>
              </div>
            )} */}

            {isEditing && (
              <div className="flex gap-2 pt-2">
                <Button
                  type="submit"
                  size="sm"
                  disabled={updatePriceMode.isPending}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white"
                >
                  <Save className="h-4 w-4 ml-1" />
                  {updatePriceMode.isPending ? "در حال ذخیره..." : "ذخیره"}
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={handleCancel}
                  className="border-red-400/30 text-red-400 hover:bg-red-400/10"
                >
                  <X className="h-4 w-4 ml-1" />
                  لغو
                </Button>
              </div>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

