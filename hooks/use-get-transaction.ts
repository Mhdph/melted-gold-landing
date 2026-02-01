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

export const useGetTransactionWebSocket = () => {
  const [haveTransaction, setHaveTransaction] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const previousHaveTransaction = useRef<boolean>(false);

  // Show toast when haveTransaction changes from false to true
  useEffect(() => {
    console.log(
      "haveTransaction changed:",
      haveTransaction,
      "previous:",
      previousHaveTransaction.current,
    );
    // Only show toast when it changes from false to true
    if (haveTransaction && !previousHaveTransaction.current) {
      console.log("Showing toast for new transaction");
      playRingtone();
      toast.info("تراکنش جدید", {
        description: "یک تراکنش جدید برای بررسی وجود دارد",
        duration: 10000,
        position: "top-center",
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
    const socketInstance = io("wss://api-zarvangold.runflare.run", {
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
      const newValue = data?.msg?.haveTransaction ?? data?.haveTransaction;
      console.log(newValue, "newValue");

      // Show toast when newValue is true and it changed from false
      if (newValue === true && !previousHaveTransaction.current) {
        playRingtone();
        toast.info("تراکنش جدید", {
          description: "یک تراکنش جدید برای بررسی وجود دارد",
          duration: 10000,
          position: "top-center",
        });
      }

      // Update the ref before setting state
      previousHaveTransaction.current = newValue;
      setHaveTransaction(newValue);
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
