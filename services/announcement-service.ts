import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { apiClient } from "./constant";

export interface CreateAnnouncementRequest {
  content: string;
  allUsers: boolean;
  userIds?: string[];
}

export const useCreateAnnouncement = () => {
  return useMutation({
    mutationFn: (data: CreateAnnouncementRequest) =>
      apiClient.post("/announcements", data),
    onSuccess: () => {
      toast.success("اعلان با موفقیت ارسال شد");
    },
    onError: (error: any) => {
      toast.error("خطا در ارسال اعلان", {
        description: error?.response?.data?.message || "لطفاً دوباره تلاش کنید",
      });
    },
  });
};
