"use client";
import type React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CreateTransferRequest } from "./types";
import { Loader2Icon } from "lucide-react";
import {
  remittanceFormSchema,
  RemittanceFormData,
} from "./remittance-form-schema";

interface RemittanceFormProps {
  onSubmit: (remittance: CreateTransferRequest) => void;
  isPending: boolean;
}

export default function RemittanceForm({
  onSubmit,
  isPending,
}: RemittanceFormProps) {
  const form = useForm<RemittanceFormData>({
    resolver: zodResolver(remittanceFormSchema),
    defaultValues: {
      value: 0,
      valueType: "gold",
      receiver: "",
    },
  });

  const handleSubmit = (data: RemittanceFormData) => {
    const newTransfer: CreateTransferRequest = {
      value: data.value,
      valueType: data.valueType,
      receiver: data.receiver,
    };

    onSubmit(newTransfer);
    form.reset();
  };

  return (
    <Card className="bg-white dark:bg-slate-800 border-gold/20">
      <CardHeader>
        <CardTitle className="text-gold">ثبت حواله جدید</CardTitle>
        <CardDescription className="text-cream/60">
          اطلاعات حواله را وارد کنید
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <div className="flex gap-4 items-start">
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-cream">مقدار</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="مقدار را وارد کنید"
                        className="bg-navy border-gold/30 text-cream"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="valueType"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-cream">واحد</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-navy border-gold/30 text-cream">
                          <SelectValue placeholder="انتخاب واحد" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="gold">گرم طلا</SelectItem>
                        <SelectItem value="mony">ریال</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="receiver"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-cream">نام گیرنده</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="نام گیرنده را وارد کنید"
                      className="bg-navy border-gold/30 text-cream"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="bg-[#d8c070] hover:bg-[#BFA67A] text-gray-800 font-bold py-4 w-40 rounded-xl transition-all hover:shadow-lg disabled:opacity-50"
              disabled={isPending}
            >
              {isPending ? (
                <Loader2Icon className="w-4 h-4 animate-spin" />
              ) : (
                "ثبت حواله"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
