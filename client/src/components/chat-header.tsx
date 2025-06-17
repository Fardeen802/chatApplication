import { MessageCircle, Wifi } from "lucide-react";

interface ChatHeaderProps {
  messageCount: number; 
  isConnected: boolean;
}

export default function ChatHeader({ messageCount, isConnected }: ChatHeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
          <MessageCircle className="text-white" size={16} />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-gray-900">Chat Room</h1>
          <p className="text-sm text-gray-500">
            {messageCount} {messageCount === 1 ? 'message' : 'messages'}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-500' : 'bg-red-500'}`} />
        <span className="text-sm text-gray-600">
          {isConnected ? 'Connected' : 'Disconnected'}
        </span>
      </div>
    </header>
  );
}
