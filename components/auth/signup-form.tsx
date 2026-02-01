"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useSignUp } from "@/services/auth-service";

// ──────────────────────────────────────────────
//              Zod Schema + Type
// ──────────────────────────────────────────────
const formSchema = z.object({
  name: z.string().min(2, { message: "نام کوچک باید حداقل دو کرکتر باشد" }),
  lastName: z
    .string()
    .min(2, { message: "نام خانوادگی باید حداقل دو کرکتر باشد" }),
  mobile: z
    .string()
    .min(9, { message: "شماره موبایل کوتاه است" })
    .max(15, { message: "شماره موبایل طولانی است" })
    .regex(/^\+?\d+$/, { message: "فقط اعداد مجاز هستند (اختیاری + پیشوند)" }),
});

type FormValues = z.infer<typeof formSchema>;

interface SignUpFormProps {
  setStep: React.Dispatch<React.SetStateAction<string>>;
}

export default function SignUpForm({ setStep }: SignUpFormProps) {
  const signUpMutation = useSignUp();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      lastName: "",
      mobile: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: FormValues) => {
    signUpMutation.mutate(
      {
        name: values.name.trim(),
        lastName: values.lastName.trim(),
        mobile: values.mobile.trim(),
      },
      {
        onSuccess: () => {
          toast.success("Account created successfully!");
          setStep("otp");
          form.reset();
        },
        onError: (error) => {
          // your hook already shows toast.error("Failed to login")
          // but you can show more specific message if you want
          console.error(error);
        },
      },
    );
  };

  return (
    <div className="flex items-center justify-center px-4">
      <div className="mx-auto w-full max-w-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نام</FormLabel>
                  <FormControl>
                    <Input placeholder="حسن" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Last Name */}
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نام خانوادگی</FormLabel>
                  <FormControl>
                    <Input placeholder="رضایی" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Mobile */}
            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>شماره موبایل</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="۰۹۱۵۱۰۱۰۱۱۱"
                      {...field}
                      onChange={(e) => {
                        // Optional: clean input in real-time
                        const value = e.target.value.replace(/[^\d+]/g, "");
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={signUpMutation.isPending || !form.formState.isValid}
            >
              {signUpMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  در حال ایجاد حساب کاربری...
                </>
              ) : (
                "ایجاد"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
