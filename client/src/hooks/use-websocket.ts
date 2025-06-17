import { useState, useEffect, useRef, useCallback } from 'react';
import { type Message } from '@shared/schema';

interface WebSocketMessage {
  type: 'initial_messages' | 'message_broadcast' | 'error';
  data?: Message | Message[];
  message?: string;
}

export function useWebSocket() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
 
  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      return;
    }

    setIsConnecting(true);
    
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${protocol}//${window.location.host}/ws`;
    
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log('WebSocket connected');
      setIsConnected(true);
      setIsConnecting(false);
    };

    ws.onmessage = (event) => {
      try {
        const wsMessage: WebSocketMessage = JSON.parse(event.data);
        
        switch (wsMessage.type) {
          case 'initial_messages':
            if (Array.isArray(wsMessage.data)) {
              setMessages(wsMessage.data);
            }
            break;
            
          case 'message_broadcast':
            if (wsMessage.data && !Array.isArray(wsMessage.data)) {
              setMessages(prev => [...prev, wsMessage.data as Message]);
            }
            break;
            
          case 'error':
            console.error('WebSocket error:', wsMessage.message);
            break;
        }
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error);
      }
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
      setIsConnected(false);
      setIsConnecting(false);
      
      // Attempt to reconnect after 3 seconds
      setTimeout(() => {
        if (wsRef.current?.readyState !== WebSocket.OPEN) {
          connect();
        }
      }, 3000);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setIsConnected(false);
      setIsConnecting(false);
    };
  }, []);

  const sendMessage = useCallback((username: string, message: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: 'new_message',
        data: { username, message }
      }));
      return true;
    }
    return false;
  }, []);

  const disconnect = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
  }, []);

  useEffect(() => {
    connect();

    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  return {
    messages,
    isConnected,
    isConnecting,
    sendMessage,
    connect,
    disconnect
  };
}