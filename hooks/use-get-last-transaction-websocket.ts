import { webSocketUrl } from "@/services/constant";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface AdminStatusData {
  adminStatus: boolean;
}

export const useLastTransaction = () => {
  const [transactions, setTransactions] = useState<any>(null);
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
      console.log("Socket connected last transaction");
      setIsConnected(true);
    });

    socketInstance.on("disconnect", () => {
      console.log("Socket disconnected last transaction");
      setIsConnected(false);
    });

    socketInstance.on("connect_error", (error) => {
      console.error("Socket connection error last transaction:", error);
      setIsConnected(false);
    });

    // Listen to adminStatus event
    socketInstance.on("newTransaction", (data: AdminStatusData) => {
      console.log("transaction status received:", data);
      setTransactions(data);
    });

    setSocket(socketInstance);

    // Cleanup on unmount
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return {
    transactions,
    isConnected,
    socket,
  };
};
