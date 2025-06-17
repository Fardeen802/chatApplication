import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { apiRequest } from "@/lib/queryClient";
import { type Message } from "@shared/schema";
import ChatHeader from "@/components/chat-header";
import MessageList from "@/components/message-list";
import MessageInput from "@/components/message-input";
import ConnectionStatus from "@/components/connection-status";
import { useToast } from "@/hooks/use-toast";

export default function Chat() {
  const [username, setUsername] = useState<string>("");
  const [isConnected, setIsConnected] = useState(true);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch messages
  const { data: messages = [], isLoading, error } = useQuery<Message[]>({
    queryKey: ["/api/messages"],
    refetchInterval: 2000, // Poll for new messages every 2 seconds
  });

  // Create message mutation
  const createMessageMutation = useMutation({
    mutationFn: async (data: { username: string; message: string }) => {
      const response = await apiRequest("POST", "/api/messages", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/messages"] });
    },
    onError: (error) => {
      console.error("Failed to send message:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Simulate connection status (in a real app, this would be WebSocket status)
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate occasional connection issues
      setIsConnected(Math.random() > 0.1);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

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

    createMessageMutation.mutate({
      username: username.trim(),
      message: message.trim(),
    });
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Connection Error</h2>
          <p className="text-gray-600">Failed to load messages. Please refresh the page.</p>
        </div>
      </div>
    );
  }

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
          isLoading={createMessageMutation.isPending}
        />
      </div>

      <ConnectionStatus isConnected={isConnected} />
    </div>
  );
}
