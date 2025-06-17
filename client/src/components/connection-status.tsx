import { useState, useEffect } from "react";
import { Wifi, WifiOff, Loader2 } from "lucide-react";

interface ConnectionStatusProps {
  isConnected: boolean;
}

export default function ConnectionStatus({ isConnected }: ConnectionStatusProps) {
  const [isReconnecting, setIsReconnecting] = useState(false);

  useEffect(() => {
    if (!isConnected) {
      setIsReconnecting(true);
      const timer = setTimeout(() => {
        setIsReconnecting(false);
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      setIsReconnecting(false);
    }
  }, [isConnected]);

  if (isConnected) {
    return (
      <div className="fixed bottom-4 left-4 z-50">
        <div className="bg-emerald-500 text-white px-3 py-2 rounded-lg shadow-lg text-sm flex items-center space-x-2">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          <span>Connected</span>
        </div>
      </div>
    );
  }

  if (isReconnecting) {
    return (
      <div className="fixed bottom-4 left-4 z-50">
        <div className="bg-amber-500 text-white px-3 py-2 rounded-lg shadow-lg text-sm flex items-center space-x-2">
          <Loader2 className="animate-spin" size={12} />
          <span>Reconnecting...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <div className="bg-red-500 text-white px-3 py-2 rounded-lg shadow-lg text-sm flex items-center space-x-2">
        <WifiOff size={12} />
        <span>Connection Lost</span>
      </div>
    </div>
  );
}
