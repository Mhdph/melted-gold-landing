import { webSocketUrl } from "@/services/constant";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useGetPriceNotification } from "@/services/user-service";
import { toast } from "sonner";

export interface PriceChangeData {
  price: number;
  changePercent: string;
  timestamp: string;
}

export const usePriceNotificationWebSocket = () => {
  const [priceChangeData, setPriceChangeData] =
    useState<PriceChangeData | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [socket, setSocket] = useState<Socket | null>(null);

  // Get price notification setting to check if notifications are enabled
  const { data: priceNotification, isLoading: isLoadingNotification } =
    useGetPriceNotification();

  useEffect(() => {
    // Get token from localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found in localStorage");
      return;
    }

    // Don't connect if still loading or notifications are disabled
    if (isLoadingNotification) {
      return;
    }

    // Only connect if notifications are enabled
    if (!priceNotification?.enabled) {
      return;
    }

    // Create socket connection with token as query parameter
    const socketInstance = io(webSocketUrl, {
      query: { token },
      transports: ["websocket"],
    });

    // Connection event handlers
    socketInstance.on("connect", () => {
      setIsConnected(true);
    });

    socketInstance.on("disconnect", () => {
      setIsConnected(false);
    });

    socketInstance.on("connect_error", (error) => {
      setIsConnected(false);
    });

    // Listen to price change notification event
    socketInstance.on("priceChangeNotification", (data: PriceChangeData) => {
      console.log(priceChangeData, "priceChangeData");
      setPriceChangeData(data);

      // Show toast notification to user
      const priceFormatted = new Intl.NumberFormat("fa-IR").format(data.price);
      toast.success("تغییر قیمت", {
        description: `قیمت جدید: ${priceFormatted} تومان (تغییر: ${data.changePercent}%)`,
        duration: 5000,
      });
    });

    setSocket(socketInstance);

    // Cleanup on unmount
    return () => {
      socketInstance.disconnect();
    };
  }, [priceNotification, isLoadingNotification]);

  // Disconnect when notifications are disabled
  useEffect(() => {
    if (!isLoadingNotification && !priceNotification?.enabled && socket) {
      socket.disconnect();
      setIsConnected(false);
      setSocket(null);
    }
  }, [priceNotification, isLoadingNotification, socket]);

  return {
    priceChangeData,
    isConnected,
    socket,
  };
};
