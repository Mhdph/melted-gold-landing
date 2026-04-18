// features/announcements/ui/announcement-dialog.tsx
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCreateAnnouncement } from "@/services/announcement-service";
import { Switch } from "@/components/ui/switch";

const announcementSchema = z.object({
  content: z.string().min(3, "متن اعلان الزامی است"),
  allUsers: z.boolean(),
});

type AnnouncementFormData = z.infer<typeof announcementSchema>;

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  selectedUserIds: string[];
}

export default function AnnouncementDialog({
  open,
  onOpenChange,
  selectedUserIds,
}: Props) {
  const createAnnouncement = useCreateAnnouncement();
  const form = useForm<AnnouncementFormData>({
    resolver: zodResolver(announcementSchema),
    defaultValues: {
      content: "",
      allUsers: false,
    },
  });

  const onSubmit = (data: AnnouncementFormData) => {
    createAnnouncement.mutate(
      {
        ...data,
        userIds: data.allUsers ? [] : selectedUserIds,
      },
      {
        onSuccess: () => {
          form.reset();
          onOpenChange(false);
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>ارسال اعلان جدید</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>متن اعلان</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="پیام خود را وارد کنید..."
                      className="min-h-[100px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {selectedUserIds.length === 0 ? (
              <FormField
                control={form.control}
                name="allUsers"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between border p-3 rounded-md">
                    <FormLabel>ارسال به همه کاربران</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            ) : (
              <div className="text-sm text-gray-400">
                {`اعلان به ${selectedUserIds.length} کاربر ارسال خواهد شد`}
              </div>
            )}

            <DialogFooter>
              <Button
                type="submit"
                disabled={createAnnouncement.isPending}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white"
              >
                {createAnnouncement.isPending
                  ? "در حال ارسال..."
                  : "ارسال اعلان"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
