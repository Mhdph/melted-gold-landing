import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { toast } from "sonner";

export const useGetTransactionWebSocket = () => {
  const [haveTransaction, setHaveTransaction] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const previousHaveTransaction = useRef<boolean>(false);

  // Show toast when haveTransaction changes from false to true
  useEffect(() => {
    // Only show toast when it changes from false to true
    if (haveTransaction && !previousHaveTransaction.current) {
      toast.info("تراکنش جدید", {
        description: "یک تراکنش جدید برای بررسی وجود دارد",
        duration: 5000,
      });
    }
    // Update the ref to track previous value
    previousHaveTransaction.current = haveTransaction;
  }, [haveTransaction]);

  useEffect(() => {
    // Check if user is admin
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      return;
    }

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

    // Listen to haveTransaction event
    socketInstance.on("haveTransaction", (data) => {
      setHaveTransaction(data.msg.haveTransaction);
    });

    setSocket(socketInstance);

    // Cleanup on unmount
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return {
    haveTransaction,
    isConnected,
    socket,
  };
};
