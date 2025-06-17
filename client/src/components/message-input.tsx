import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Send, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MessageInputProps {
  username: string;
  onUsernameChange: (username: string) => void;
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export default function MessageInput({ 
  username, 
  onUsernameChange, 
  onSendMessage, 
  isLoading 
}: MessageInputProps) {
  const [message, setMessage] = useState("");
  const [tempUsername, setTempUsername] = useState("");
  const [showUsernameInput, setShowUsernameInput] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (username) {
      setShowUsernameInput(false);
    }
  }, [username]);

  const handleSetUsername = () => {
    if (!tempUsername.trim()) {
      toast({
        title: "Error",
        description: "Username cannot be empty.",
        variant: "destructive",
      });
      return;
    }

    if (tempUsername.trim().length < 2) {
      toast({
        title: "Error", 
        description: "Username must be at least 2 characters long.",
        variant: "destructive",
      });
      return;
    }

    onUsernameChange(tempUsername.trim());
    setShowUsernameInput(false);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) {
      return;
    }

    if (message.length > 500) {
      toast({
        title: "Error",
        description: "Message cannot exceed 500 characters.",
        variant: "destructive",
      });
      return;
    }

    onSendMessage(message);
    setMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (showUsernameInput) {
        handleSetUsername();
      } else {
        handleSendMessage(e);
      }
    }
  };

  return (
    <div className="border-t border-gray-200 bg-white px-4 py-4">
      {showUsernameInput && (
        <div className="mb-3">
          <Label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
            Your Name
          </Label>
          <div className="flex space-x-2">
            <Input
              id="username"
              type="text"
              placeholder="Enter your name..."
              value={tempUsername}
              onChange={(e) => setTempUsername(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
              maxLength={50}
            />
            <Button 
              type="button"
              onClick={handleSetUsername}
              disabled={!tempUsername.trim()}
            >
              Set Name
            </Button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex space-x-2">
        <div className="flex-1 relative">
          <Input
            id="messageInput"
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading || showUsernameInput}
            className="pr-12"
            maxLength={500}
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
            {message.length}/500
          </div>
        </div>
        <Button 
          type="submit"
          disabled={!message.trim() || isLoading || showUsernameInput}
          className="px-6 flex items-center space-x-2"
        >
          <span className="hidden sm:inline">Send</span>
          <Send size={16} />
        </Button>
      </form>

      {message.length > 400 && (
        <div className="mt-2 text-xs text-amber-600 flex items-center space-x-1">
          <AlertTriangle size={12} />
          <span>You're approaching the character limit.</span>
        </div>
      )}
    </div>
  );
}
