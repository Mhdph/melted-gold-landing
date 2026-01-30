import ApiClient from "@/lib/apiClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { API_URL } from "./constant";

const apiClient = new ApiClient(`${API_URL}`);
export interface Setting {
  id: string;
  createdAt: string;
  updatedAt: string;
  key: string;
  value: string;
  type: "boolean" | "number" | "string";
}

export interface UpdateSettingRequest {
  id: string;
  value: string;
}

export const useGetSettings = () =>
  useQuery({
    queryKey: ["settings"],
    queryFn: () => apiClient.get<Setting[]>("/Setting"),
  });

export const useUpdateSetting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateSettingRequest) =>
      apiClient.put(`/Setting/${data.id}`, { value: data.value }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
  });
};
