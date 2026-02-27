"use client";

import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

interface UseWebSocketOptions {
  url: string;
  token?: string;
  onMessage?: (data: any) => void;
  onError?: (error: any) => void;
  onOpen?: () => void;
  onClose?: () => void;
  reconnectInterval?: number;
  maxReconnectAttempts?: number;
}

export function useWebSocket({
  url,
  token,
  onMessage,
  onError,
  onOpen,
  onClose,
  reconnectInterval = 5000,
  maxReconnectAttempts = 5,
}: UseWebSocketOptions) {
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttemptsRef = useRef(0);

  const connect = () => {
    try {
      const socket = io(url, {
        query: token ? { token } : undefined,
        auth: token ? { token } : undefined,
        extraHeaders: token
          ? {
              Authorization: `Bearer ${token}`,
              "x-auth-token": token,
              token: token,
            }
          : undefined,
        autoConnect: true,
        reconnection: true,
        reconnectionAttempts: maxReconnectAttempts,
        reconnectionDelay: reconnectInterval,
        transports: ["polling", "websocket"],
        forceNew: true, // Force a new connection
      });

      socketRef.current = socket;

      socket.on("connect", () => {
        setIsConnected(true);
        setError(null);
        reconnectAttemptsRef.current = 0;
        onOpen?.();
      });

      socket.on("disconnect", (reason) => {
        setIsConnected(false);
        onClose?.();
      });

      socket.on("connect_error", (err) => {
        console.error("Socket.IO connection error:", err);
        console.error("Error details:", {
          message: err.message,
          description: (err as any).description,
          context: (err as any).context,
          type: (err as any).type,
        });
        setError("Socket.IO connection error");
        onError?.(err);
      });

      // Listen for gold price updates - this matches your server's event name
      socket.on("updatePrice", (data) => {
        setLastMessage(data);
        onMessage?.(data);
      });

      // Listen for admin status updates
      socket.on("adminStatus", (data) => {
        setLastMessage(data);
        onMessage?.(data);
      });

      // Listen for other potential events
      socket.on("message", (data) => {
        setLastMessage(data);
        onMessage?.(data);
      });
    } catch (err) {
      console.error("Error creating Socket.IO connection:", err);
      setError("Failed to create Socket.IO connection");
    }
  };

  const disconnect = () => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }
    setIsConnected(false);
  };

  const sendMessage = (event: string, message: any) => {
    if (socketRef.current && socketRef.current.connected) {
      socketRef.current.emit(event, message);
    } else {
      console.warn("Socket.IO is not connected");
    }
  };

  useEffect(() => {
    connect();

    return () => {
      disconnect();
    };
  }, [url, token]);

  return {
    isConnected,
    lastMessage,
    error,
    sendMessage,
    connect,
    disconnect,
  };
}
