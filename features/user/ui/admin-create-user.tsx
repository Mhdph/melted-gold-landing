"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useCreateUser } from "@/services/user-service";
import { useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const createUserSchema = z.object({
  mobile: z
    .string()
    .min(10, "شماره موبایل معتبر نیست")
    .max(11, "شماره موبایل معتبر نیست"),
  name: z.string().min(2, "نام حداقل ۲ کاراکتر است"),
  lastName: z.string().min(2, "نام خانوادگی حداقل ۲ کاراکتر است"),
  password: z.string().min(4, "رمز عبور حداقل ۴ کاراکتر است"),
});

type CreateUserFormValues = z.infer<typeof createUserSchema>;

export function CreateUserDialog() {
  const [open, setOpen] = useState(false);

  const form = useForm<CreateUserFormValues>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      mobile: "",
      name: "",
      lastName: "",
      password: "",
    },
  });

  const { mutate: createUser, isPending } = useCreateUser();

  const onSubmit = (values: CreateUserFormValues) => {
    // values دقیقا همون بدنه‌ایه که API توی عکس می‌خواد
    createUser(values, {
      onSuccess: () => {
        form.reset();
        setOpen(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>ایجاد کاربر جدید</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>ایجاد کاربر</DialogTitle>
          <DialogDescription>
            اطلاعات کاربر جدید را وارد کنید.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* mobile */}
            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>شماره موبایل</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="مثلاً 09123456789"
                      {...field}
                      dir="ltr"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نام</FormLabel>
                  <FormControl>
                    <Input placeholder="نام" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* lastName */}
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نام خانوادگی</FormLabel>
                  <FormControl>
                    <Input placeholder="نام خانوادگی" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>رمز عبور</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="رمز عبور" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                انصراف
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "در حال ثبت..." : "ثبت کاربر"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
