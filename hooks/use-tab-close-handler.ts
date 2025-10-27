import { useEffect } from "react";
import { useChangeUserStatus } from "@/services/user-service";

interface UseTabCloseHandlerProps {
  enabled?: boolean;
  onBeforeClose?: () => void;
}

export const useTabCloseHandler = ({
  enabled = true,
  onBeforeClose,
}: UseTabCloseHandlerProps = {}) => {
  const changeUserStatusMutation = useChangeUserStatus();

  useEffect(() => {
    if (!enabled) return;

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      // Call the optional callback first
      if (onBeforeClose) {
        onBeforeClose();
      }

      // Call the user status change service
      try {
        // Use sendBeacon for more reliable delivery when page is closing
        if (navigator.sendBeacon) {
          const data = JSON.stringify({ status: false });
          navigator.sendBeacon("/api/setting/user", data);
        } else {
          // Fallback to regular mutation
          changeUserStatusMutation.mutate({ status: false });
        }
      } catch (error) {
        console.error("Failed to update user status on tab close:", error);
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        // Page is being hidden (tab switched, minimized, etc.)
        try {
          if (navigator.sendBeacon) {
            const data = JSON.stringify({ status: false });
            navigator.sendBeacon("/api/setting/user", data);
          } else {
            changeUserStatusMutation.mutate({ status: false });
          }
        } catch (error) {
          console.error(
            "Failed to update user status on visibility change:",
            error
          );
        }
      }
    };

    // Add event listeners
    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Cleanup
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [enabled, onBeforeClose, changeUserStatusMutation]);

  return {
    isUpdating: changeUserStatusMutation.isPending,
    error: changeUserStatusMutation.error,
  };
};
