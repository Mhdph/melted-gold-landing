import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { toast } from "sonner";

export const useGetTransferWebSocket = () => {
  const [haveTransfer, setHaveTransfer] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const previousHaveTransfer = useRef<boolean>(false);

  // Show toast when haveTransaction changes from false to true
  useEffect(() => {
    console.log(
      "haveTransfer changed:",
      haveTransfer,
      "previous:",
      previousHaveTransfer.current
    );
    // Only show toast when it changes from false to true
    if (haveTransfer && !previousHaveTransfer.current) {
      console.log("Showing toast for new transfer");
      toast.info("انتقال جدید", {
        description: "یک انتقال جدید برای بررسی وجود دارد",
        duration: 10000,
        position: "top-center",
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

    // Listen to haveTransaction event
    socketInstance.on("haveTransfer", (data) => {
      const newValue = data?.msg?.haveTransfer ?? data?.haveTransfer;
      console.log(newValue, "newValue");

      // Show toast when newValue is true and it changed from false
      if (newValue === true && !previousHaveTransfer.current) {
        toast.info("انتقال جدید", {
          description: "یک انتقال جدید برای بررسی وجود دارد",
          duration: 10000,
          position: "top-center",
        });
      }
      // Update the ref before setting state
      previousHaveTransfer.current = newValue;
      setHaveTransfer(newValue);
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
