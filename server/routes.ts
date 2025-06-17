import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { storage } from "./storage";
import { insertMessageSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {

  const httpServer = createServer(app);
  
  // WebSocket server setup
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });
  
  wss.on('connection', (ws: WebSocket) => {
    console.log('Client connected to WebSocket');
    
    // Send initial messages to new client
    storage.getAllMessages().then(messages => {
      ws.send(JSON.stringify({ type: 'initial_messages', data: messages }));
    });
    
    ws.on('message', async (data: Buffer) => {
      try {
        const messageData = JSON.parse(data.toString());
        
        if (messageData.type === 'new_message') {
          // Validate and save message
          const validatedMessage = insertMessageSchema.parse(messageData.data);
          const newMessage = await storage.createMessage(validatedMessage);
          
          // Broadcast to all connected clients
          const broadcastData = JSON.stringify({ 
            type: 'message_broadcast', 
            data: newMessage 
          });
          
          wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(broadcastData);
            }
          });
        }
      } catch (error) {
        console.error('WebSocket message error:', error);
        ws.send(JSON.stringify({ 
          type: 'error', 
          message: 'Invalid message format' 
        }));
      }
    });
    
    ws.on('close', () => {
      console.log('Client disconnected from WebSocket');
    });
    
    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
    });
  });

  return httpServer;
}
