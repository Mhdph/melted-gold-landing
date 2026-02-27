"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox"; // optional alternative
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ProductFormFields() {
  const { control } = useFormContext();

  return (
    <div className="grid gap-4">
      {/* Name */}
      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>نام محصول</FormLabel>
            <FormControl>
              <Input placeholder="مثال: سکه تمام  " {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Unit Type */}
      <FormField
        control={control}
        name="unitType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>نوع واحد</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="انتخاب نوع واحد" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="gram">گرم</SelectItem>
                <SelectItem value="teedad">تعداد</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-2 gap-4">
        {/* Sell – Partnership */}
        <FormField
          control={control}
          name="sellAmountPartnerShip"
          render={({ field }) => (
            <FormItem>
              <FormLabel>قیمت فروش (شریک)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Sell – General */}
        <FormField
          control={control}
          name="sellAmountGeneral"
          render={({ field }) => (
            <FormItem>
              <FormLabel>قیمت فروش (عمومی)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Buy – Partnership */}
        <FormField
          control={control}
          name="buyAmountPartnerShip"
          render={({ field }) => (
            <FormItem>
              <FormLabel>قیمت خرید (شریک)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Buy – General */}
        <FormField
          control={control}
          name="buyAmountGeneral"
          render={({ field }) => (
            <FormItem>
              <FormLabel>قیمت خرید (عمومی)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Active Switch */}
      <FormField
        control={control}
        name="isDealActive"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">فعال بودن معامله</FormLabel>
              <p className="text-sm text-muted-foreground">
                آیا این محصول هم‌اکنون برای فروش/خرید فعال است؟
              </p>
            </div>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}
