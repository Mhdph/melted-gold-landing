import ApiClient from "@/lib/apiClient";
import { useQuery } from "@tanstack/react-query";
import { BaseResponse, BasePaginationResponse } from "@/lib/response.interface";

const apiClient = new ApiClient("https://yellowgold.liara.run");

export interface PriceData {
  createdAt: string;
  buy: number;
  sell: number;
  percentageChange: string;
}

export const useGetPrices = (page: number = 1, limit: number = 10) =>
  useQuery({
    queryKey: ["prices", page, limit],
    queryFn: () =>
      apiClient.get<BasePaginationResponse<PriceData[]>>(
        `/price?filter={}&search={}&page=${page}&limit=${limit}`
      ),
  });
