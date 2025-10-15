"use client";

import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallPWA({
  setIsInstallPWA,
}: {
  setIsInstallPWA: (isInstallPWA: boolean) => void;
}) {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setSupportsPWA(true);
      setPromptInstall(e as BeforeInstallPromptEvent);
      setIsVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setSupportsPWA(false);
    }

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const onClick = async () => {
    if (!promptInstall) return;

    await promptInstall.prompt();
    const { outcome } = await promptInstall.userChoice;

    if (outcome === "accepted") {
      setIsVisible(false);
    }

    setPromptInstall(null);
  };

  // if (!supportsPWA || !isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-md">
      <div className="flex items-center gap-3 rounded-lg border bg-white p-4 justify-between shadow-lg dark:bg-gray-800">
        <Download className="h-8 w-8 text-blue-500" />
        <div className="">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            دریافت رابط کاربری بهتر با نصب این برنامه{" "}
          </p>
        </div>
        <div className="flex gap-1">
          <Button onClick={onClick} size="sm">
            نصب
          </Button>
          <Button onClick={() => setIsInstallPWA(false)} size="sm">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
