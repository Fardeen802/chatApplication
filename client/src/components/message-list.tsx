import { formatDistanceToNow } from "date-fns";
import { type Message } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { Check } from "lucide-react";

interface MessageListProps {
  messages: Message[];
  currentUsername: string;
  isLoading: boolean;
}

export default function MessageList({ messages, currentUsername, isLoading }: MessageListProps) {
  const getInitials = (username: string) => {
    return username.charAt(0).toUpperCase();
  };

  const getAvatarColor = (username: string) => {
    const colors = [
      'bg-blue-500',
      'bg-emerald-500', 
      'bg-purple-500',
      'bg-pink-500',
      'bg-yellow-500',
      'bg-red-500',
      'bg-indigo-500',
      'bg-green-500'
    ];
    
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
      hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return colors[Math.abs(hash) % colors.length];
  };

  const formatTimestamp = (timestamp: Date) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };

  if (isLoading && messages.length === 0) {
    return (
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-start space-x-3">
            <Skeleton className="w-8 h-8 rounded-full" />
            <div className="flex-1 max-w-xs lg:max-w-md">
              <Skeleton className="h-16 w-full rounded-lg" />
              <div className="flex items-center space-x-2 mt-1">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-3 w-12" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
      {messages.length === 0 ? (
        <div className="flex justify-center">
          <div className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
            Welcome to the chat room! Start sending messages below.
          </div>
        </div>
      ) : (
        messages.map((message) => {
          const isCurrentUser = message.username === currentUsername;
          
          return (
            <div
              key={message.id}
              className={`flex items-start space-x-3 ${isCurrentUser ? 'justify-end' : ''}`}
            >
              {!isCurrentUser && (
                <div className={`w-8 h-8 ${getAvatarColor(message.username)} rounded-full flex items-center justify-center flex-shrink-0`}>
                  <span className="text-white text-sm font-medium">
                    {getInitials(message.username)}
                  </span>
                </div>
              )}
              
              <div className="flex-1 max-w-xs lg:max-w-md">
                <div className={`rounded-lg px-4 py-2 shadow-sm ${
                  isCurrentUser 
                    ? 'bg-indigo-600 ml-auto' 
                    : 'bg-white border border-gray-200'
                }`}>
                  <p className={`text-sm ${
                    isCurrentUser ? 'text-white' : 'text-gray-900'
                  }`}>
                    {message.message}
                  </p>
                </div>
                <div className={`flex items-center space-x-2 mt-1 ${
                  isCurrentUser ? 'justify-end' : ''
                }`}>
                  {!isCurrentUser && (
                    <span className="text-xs text-gray-500 font-medium">
                      {message.username}
                    </span>
                  )}
                  <span className="text-xs text-gray-400">
                    {formatTimestamp(message.timestamp)}
                  </span>
                  {isCurrentUser && (
                    <>
                      <span className="text-xs text-gray-500 font-medium">You</span>
                      <Check className="text-emerald-500" size={12} />
                    </>
                  )}
                </div>
              </div>

              {isCurrentUser && (
                <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-medium">
                    {getInitials(message.username)}
                  </span>
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
