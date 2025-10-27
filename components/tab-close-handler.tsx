"use client";

import { useTabCloseHandler } from "@/hooks/use-tab-close-handler";

export function TabCloseHandler() {
  useTabCloseHandler({
    enabled: true,
    onBeforeClose: () => {
      console.log("User is closing the tab");
    },
  });

  return null; // This component doesn't render anything
}
