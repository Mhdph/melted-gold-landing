"use client";

import { useWebSocket } from "./use-websocket";
import { useEffect, useState } from "react";

interface GoldPriceData {
  buy: number;
  sell: number;
  percentageChange: string;
  createdAt: string;
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

  const { isConnected, lastMessage, error, sendMessage } = useWebSocket({
    url: "wss://yellowgold.liara.run",
    token: token || undefined,
    onMessage: (data) => {
      console.log("Gold price WebSocket data received:", data);
      setPriceData(data);
    },
    onError: (error) => {
      console.error("Gold price WebSocket error:", error);
    },
    onOpen: () => {
      console.log("Gold price WebSocket connected");
    },
    onClose: () => {
      console.log("Gold price WebSocket disconnected");
    },
  });

  return {
    isConnected,
    priceData,
    error,
    sendMessage,
    lastMessage,
  };
}
