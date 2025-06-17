import { useState, useEffect, useRef } from "react";
import { type Message } from "@shared/schema";
import ChatHeader from "@/components/chat-header";
import MessageList from "@/components/message-list";
import MessageInput from "@/components/message-input";
import ConnectionStatus from "@/components/connection-status";
import { useToast } from "@/hooks/use-toast";
import { useWebSocket } from "@/hooks/use-websocket";

export default function Chat() {
  const [username, setUsername] = useState<string>("");
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false); 

  // Use WebSocket instead of polling
  const { messages, isConnected, isConnecting, sendMessage } = useWebSocket();

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (message: string) => {
    if (!username.trim()) {
      toast({
        title: "Error",
        description: "Please set your username first.",
        variant: "destructive",
      });
      return;
    }

    if (!message.trim()) {
      toast({
        title: "Error", 
        description: "Message cannot be empty.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    const success = sendMessage(username.trim(), message.trim());
    
    if (!success) {
      toast({
        title: "Error",
        description: "Failed to send message. Please check your connection.",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <ChatHeader messageCount={messages.length} isConnected={isConnected} />
      
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
        <MessageList 
          messages={messages} 
          currentUsername={username}
          isLoading={isLoading}
        />
        <div ref={messagesEndRef} />
        
        <MessageInput
          username={username}
          onUsernameChange={setUsername}
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
      </div>

      <ConnectionStatus isConnected={isConnected} />
    </div>
  );
}
