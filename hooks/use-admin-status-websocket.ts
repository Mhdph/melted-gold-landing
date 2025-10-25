"use client";

import { useWebSocket } from "./use-websocket";
import { useEffect, useState } from "react";
import { SOCKET_PATTERN } from "@/lib/socket-patterns";

export interface AdminStatusData {
  isOnline: boolean;
  lastSeen?: string;
  adminName?: string;
  status?: "online" | "offline" | "away" | "busy";
}

export function useAdminStatusWebSocket() {
  const [token, setToken] = useState<string | null>(null);
  const [adminStatus, setAdminStatus] = useState<AdminStatusData>({
    isOnline: false,
    status: "offline",
  });

  // Get token from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const { isConnected, lastMessage, error, sendMessage } = useWebSocket({
    url: "https://yellowgold.liara.run",
    token: token || undefined,
    onMessage: (data) => {
      console.log("Admin status Socket.IO data received:", data);
      console.log("Data structure:", JSON.stringify(data, null, 2));

      // Handle admin status updates
      if (data && typeof data === "object") {
        setAdminStatus({
          isOnline: data.isOnline || false,
          lastSeen: data.lastSeen,
          adminName: data.adminName,
          status: data.status || (data.isOnline ? "online" : "offline"),
        });
      }
    },
    onError: (error) => {
      console.error("Admin status Socket.IO error:", error);
    },
    onOpen: () => {
      console.log("Admin status Socket.IO connected");
    },
    onClose: () => {
      console.log("Admin status Socket.IO disconnected");
    },
  });

  // Reconnect when token changes
  useEffect(() => {
    if (token) {
      console.log("Token is now available for admin status, reconnecting...");
    }
  }, [token]);

  // Helper function to send messages to specific Socket.IO events
  const sendAdminStatusMessage = (event: string, message: any) => {
    sendMessage(event, message);
  };

  // Function to request admin status
  const requestAdminStatus = () => {
    sendAdminStatusMessage(SOCKET_PATTERN.AdminStatus, { action: "getStatus" });
  };

  // Function to update admin status
  const updateAdminStatus = (status: AdminStatusData) => {
    sendAdminStatusMessage(SOCKET_PATTERN.AdminStatus, {
      action: "updateStatus",
      data: status,
    });
  };

  return {
    isConnected,
    adminStatus,
    error,
    sendMessage: sendAdminStatusMessage,
    lastMessage,
    requestAdminStatus,
    updateAdminStatus,
  };
}
