"use client";

import * as React from "react";
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TabCloseHandler } from "./tab-close-handler";

export function Providers({ children, ...props }: ThemeProviderProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
      mutations: {
        onError: (error: any) => {
          // Handle 401 errors globally
          if (error?.response?.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("phone");
            window.location.href = "/";
          }
        },
      },
    },
  });
  return (
    <NextThemesProvider {...props}>
      <QueryClientProvider client={queryClient}>
        <TabCloseHandler />
        {children}
      </QueryClientProvider>
    </NextThemesProvider>
  );
}
