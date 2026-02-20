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
