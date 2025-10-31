import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface AdminStatusData {
  adminStatus: boolean;
}

export const useAdminStatusWebSocket = () => {
  const [adminStatus, setAdminStatus] = useState<any>(null);
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
    const socketInstance = io("wss://yellowgold.liara.run", {
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

    // Listen to adminStatus event
    socketInstance.on("adminStatus", (data: AdminStatusData) => {
      setAdminStatus(data);
    });

    setSocket(socketInstance);

    // Cleanup on unmount
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return {
    adminStatus,
    isConnected,
    socket,
  };
};
