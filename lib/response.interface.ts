/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Sort } from "./sort.type";

export interface BaseResponse<T extends any> {
  success: boolean;
  message: string;
  data: T;
}

export interface BasePaginationResponse<T> {
  data: T;
  meta: {
    page: number;
    limit: number;
    itemCount: number;
    hasNextPage: boolean;
  };
}
