import { webSocketUrl } from "@/services/constant";
import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { toast } from "sonner";

// Helper function to play ringtone
const playRingtone = () => {
  try {
    const audio = new Audio("/ringtone.mp3");
    audio.volume = 0.7; // Set volume to 70%
    audio.play().catch((error) => {
      // Handle autoplay restrictions (browser may block autoplay)
      console.warn("Could not play ringtone:", error);
    });
  } catch (error) {
    console.warn("Error creating audio:", error);
  }
};

export const useGetTransferWebSocket = () => {
  const [haveTransfer, setHaveTransfer] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const previousHaveTransfer = useRef<boolean>(false);

  // Show toast when haveTransaction changes from false to true
  useEffect(() => {
    // Only show toast when it changes from false to true
    if (haveTransfer && !previousHaveTransfer.current) {
      playRingtone();
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

    // Listen to haveTransaction event
    socketInstance.on("haveTransfer", (data) => {
      const newValue = data?.msg?.haveTransfer ?? data?.haveTransfer;

      // Show toast when newValue is true and it changed from false
      if (newValue === true && !previousHaveTransfer.current) {
        playRingtone();
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
