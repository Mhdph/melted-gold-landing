import ApiClient from "@/lib/apiClient";
import { BaseResponse } from "@/lib/response.interface";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { apiClient } from "./constant";

export const useGetLoginCode = (slug: string, enabled: boolean) =>
  useQuery({
    queryKey: ["auth", slug],
    queryFn: () => apiClient.get<any>(`/auth/code/${slug}`),
    enabled,
  });

interface LoginParams {
  mobile: string;
  otpCode: string;
}

interface SignUpParams {
  mobile: string;
  name: string;
  lastName: string;
}

export const useLogin = () => {
  return useMutation({
    mutationFn: (params: LoginParams) =>
      apiClient.post<BaseResponse<any>>(`/auth/login`, params),

    onError: () => {
      toast.error("Failed to login");
    },
  });
};

export const useSignUp = () => {
  return useMutation({
    mutationFn: (params: SignUpParams) =>
      apiClient.post<BaseResponse<any>>(`/auth/signup`, params),

    onError: () => {
      toast.error("Failed to login");
    },
  });
};

export const useLoginWithPassword = () =>
  useMutation({
    mutationFn: (data: any) => apiClient.post("/auth/login/pass", data),
    onError: (e) => toast.error(e?.message ?? "خطا!"),
  });

// reset-pass request
export const useResetPasswordRequest = () =>
  useMutation({
    mutationFn: (data: any) =>
      apiClient.post("/auth/reset-password/request", data),
    onSuccess: () => toast.success("کد ارسال شد"),
    onError: (e) => toast.error(e?.message ?? "خطا!"),
  });

// reset-pass confirm
export const useResetPasswordConfirm = () =>
  useMutation({
    mutationFn: (data: any) =>
      apiClient.post("/auth/reset-password/confirm", data),
    onSuccess: () => toast.success("رمز عبور با موفقیت تغییر کرد"),
    onError: (e) => toast.error(e?.message ?? "خطا!"),
  });
