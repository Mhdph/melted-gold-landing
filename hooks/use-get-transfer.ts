import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { toast } from "sonner";

export const useGetTransferWebSocket = () => {
  const [haveTransfer, setHaveTransfer] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const previousHaveTransfer = useRef<boolean>(false);

  // Show toast when haveTransfer changes from false to true
  useEffect(() => {
    // Only show toast when it changes from false to true
    if (haveTransfer && !previousHaveTransfer.current) {
      toast.info("انتقال جدید", {
        description: "یک انتقال جدید برای بررسی وجود دارد",
        duration: 5000,
      });
    }
    // Update the ref to track previous value
    previousHaveTransfer.current = haveTransfer;
  }, [haveTransfer]);

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

    // Listen to haveTransfer event (similar structure to haveTransaction)
    socketInstance.on("haveTransfer", (data) => {
      if (data?.msg?.haveTransfer !== undefined) {
        setHaveTransfer(data.msg.haveTransfer);
      } else if (data?.haveTransfer !== undefined) {
        setHaveTransfer(data.haveTransfer);
      }
    });

    // Also listen to newTransfer event (when a new transfer is created)
    socketInstance.on("newTransfer", (data) => {
      // Show toast immediately when newTransfer event is received
      if (data) {
        toast.info("انتقال جدید", {
          description: "یک انتقال جدید برای بررسی وجود دارد",
          duration: 5000,
        });
        // Also update the state for consistency
        setHaveTransfer(true);
      }
    });

    setSocket(socketInstance);

    // Cleanup on unmount
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return {
    haveTransfer,
    isConnected,
    socket,
  };
};
