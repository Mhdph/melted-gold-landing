"use client";

import { useWebSocket } from "./use-websocket";
import { useEffect, useState } from "react";

export interface GoldPriceData {
  msg: {
    lastPrice: number;
    buyGerm: number;
    buyMithqal: number;
    changePercent: number;
    sellGerm: number;
    sellMithqal: number;
  };
}

export function useGoldPriceWebSocket() {
  const [token, setToken] = useState<string | null>(null);
  const [priceData, setPriceData] = useState<GoldPriceData | null>(null);

  // Get token from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  console.log(token);

  const { isConnected, lastMessage, error, sendMessage } = useWebSocket({
    url: "https://yellowgold.liara.run", // Changed from wss:// to https:// for Socket.IO
    token: token || undefined,
    onMessage: (data) => {
      console.log("Gold price Socket.IO data received:", data);
      console.log("Data structure:", JSON.stringify(data, null, 2));
      setPriceData(data);
    },
    onError: (error) => {
      console.error("Gold price Socket.IO error:", error);
    },
    onOpen: () => {
      console.log("Gold price Socket.IO connected");
    },
    onClose: () => {
      console.log("Gold price Socket.IO disconnected");
    },
  });

  // Reconnect when token changes
  useEffect(() => {
    if (token) {
      console.log("Token is now available, reconnecting...");
    }
  }, [token]);

  // Helper function to send messages to specific Socket.IO events
  const sendGoldPriceMessage = (event: string, message: any) => {
    sendMessage(event, message);
  };

  return {
    isConnected,
    priceData,
    error,
    sendMessage: sendGoldPriceMessage,
    lastMessage,
  };
}
