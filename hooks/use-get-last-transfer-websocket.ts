import { webSocketUrl } from "@/services/constant";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface AdminStatusData {
  adminStatus: boolean;
}

export const useLastTransfer = () => {
  const [transfers, setTransfers] = useState<any>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // Get token from localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found in localStorage");
      return;
    }

    // Create socket connection with token as query parameter
    const socketInstance = io(webSocketUrl, {
      query: { token },
      transports: ["websocket"],
    });

    // Connection event handlers
    socketInstance.on("connect", () => {
      console.log("Socket connected last transfer");
      setIsConnected(true);
    });

    socketInstance.on("disconnect", () => {
      console.log("Socket disconnected last transfer");
      setIsConnected(false);
    });

    socketInstance.on("connect_error", (error) => {
      console.error("Socket connection error last transfer:", error);
      setIsConnected(false);
    });

    // Listen to adminStatus event
    socketInstance.on("newTransfer", (data: AdminStatusData) => {
      console.log("transfer status received:", data);
      setTransfers(data);
    });

    setSocket(socketInstance);

    // Cleanup on unmount
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return {
    transfers,
    isConnected,
    socket,
  };
};
