import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
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
import { Setting } from "@/services/settings-service";
import { useToast } from "@/hooks/use-toast";

interface SettingCardProps {
  setting: Setting;
  onUpdate: (id: string, value: string) => void;
  isUpdating?: boolean;
}

// Translate setting keys to Persian
const translateSettingKey = (key: string): string => {
  const translations: Record<string, string> = {
    "buy Spread": "اختلاف قیمت خرید و فروش",
    "permission Sell": "مجوز فروش",
    "permission Buy": "مجوز خرید",
  };
  return translations[key] || key;
};

// Create Zod schema based on setting type
const createSettingSchema = (type: "boolean" | "number" | "string") => {
  switch (type) {
    case "boolean":
      return z.object({
        value: z.string().refine((val) => val === "true" || val === "false", {
          message: "مقدار باید true یا false باشد",
        }),
      });
    case "number":
      return z.object({
        value: z
          .string()
          .min(1, "مقدار الزامی است")
          .refine(
            (val) => {
              const num = Number.parseFloat(val);
              return !Number.isNaN(num);
            },
            {
              message: "مقدار باید عدد معتبر باشد",
            }
          ),
      });
    case "string":
      return z.object({
        value: z.string().min(1, "مقدار الزامی است"),
      });
    default:
      return z.object({
        value: z.string(),
      });
  }
};

type SettingFormData = z.infer<ReturnType<typeof createSettingSchema>>;

export default function SettingCard({
  setting,
  onUpdate,
  isUpdating,
}: SettingCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  const schema = createSettingSchema(setting.type);
  const form = useForm<SettingFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      value: setting.value,
    },
  });

  // Reset form when setting changes or editing mode changes
  useEffect(() => {
    if (!isEditing) {
      form.reset({ value: setting.value });
    }
  }, [setting.value, isEditing, form]);

  const handleSave = (data: SettingFormData) => {
    if (data.value !== setting.value) {
      onUpdate(setting.id, data.value);
      toast({
        title: "تنظیمات به‌روزرسانی شد",
        description: `${translateSettingKey(
          setting.key
        )} با موفقیت به‌روزرسانی شد.`,
      });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    form.reset({ value: setting.value });
    setIsEditing(false);
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case "boolean":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "number":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      case "string":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    }
  };

  const formatValue = (value: string, type: string) => {
    if (type === "boolean") {
      return value === "true" ? "فعال" : "غیرفعال";
    }
    if (type === "number") {
      return new Intl.NumberFormat("fa-IR").format(Number(value));
    }
    return value;
  };

  const renderInput = () => {
    if (setting.type === "boolean") {
      return (
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center space-x-2 gap-2 space-x-reverse">
                  <Switch
                    checked={field.value === "true"}
                    onCheckedChange={(checked) =>
                      field.onChange(checked.toString())
                    }
                    disabled={!isEditing}
                  />
                  <Label className="text-sm text-cream/80">
                    {field.value === "true" ? "فعال" : "غیرفعال"}
                  </Label>
                </div>
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />
      );
    }

    if (setting.type === "number") {
      return (
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="number"
                  value={field.value}
                  onChange={field.onChange}
                  disabled={!isEditing}
                  className="bg-navy/30 border-gold/20 text-cream"
                  dir="ltr"
                />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />
      );
    }

    return (
      <FormField
        control={form.control}
        name="value"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                value={field.value}
                onChange={field.onChange}
                disabled={!isEditing}
                className="bg-navy/30 border-gold/20 text-cream"
              />
            </FormControl>
            <FormMessage className="text-red-400" />
          </FormItem>
        )}
      />
    );
  };

  return (
    <Card className="bg-white border-gold/20 hover:border-gold/30 transition-colors">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-gold text-lg">
            {translateSettingKey(setting.key)}
          </CardTitle>
          <div className="flex items-center gap-2">
            {/* <Badge className={getTypeBadgeColor(setting.type)}>
              {setting.type}
            </Badge> */}
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
              <Label className="text-cream/80 text-sm">مقدار فعلی:</Label>
              {!isEditing ? (
                <div className="p-3 bg-white rounded-lg border border-gold/10">
                  <span className="text-cream ">
                    {formatValue(setting.value, setting.type)}
                  </span>
                </div>
              ) : (
                renderInput()
              )}
            </div>

            {isEditing && (
              <div className="flex gap-2 pt-2">
                <Button
                  type="submit"
                  size="sm"
                  disabled={isUpdating}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white"
                >
                  <Save className="h-4 w-4 ml-1" />
                  {isUpdating ? "در حال ذخیره..." : "ذخیره"}
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

        <div className="text-xs text-cream/50 pt-2 border-t border-gold/10">
          <div>
            آخرین به‌روزرسانی:{" "}
            {new Date(setting.updatedAt).toLocaleDateString("fa-IR")}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
