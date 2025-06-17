# Chat Application

## Overview

This is a real-time chat application built with a modern full-stack architecture using React on the frontend and Express.js on the backend. The application allows users to send and receive messages in a shared chat room with a clean, responsive user interface.

## System Architecture

The application follows a client-server architecture with clear separation between frontend and backend concerns:

- **Frontend**: React-based SPA with TypeScript, built with Vite
- **Backend**: Express.js REST API server with TypeScript
- **Database**: PostgreSQL with Drizzle ORM for data persistence
- **UI Framework**: shadcn/ui components with Tailwind CSS
- **State Management**: TanStack Query for server state management

## Key Components

### Frontend Architecture
- **React 18** with TypeScript for type safety
- **Vite** as the build tool and development server
- **Wouter** for lightweight client-side routing
- **TanStack Query** for server state management and data fetching
- **shadcn/ui** component library built on Radix UI primitives
- **Tailwind CSS** for styling with CSS custom properties for theming

### Backend Architecture
- **Express.js** server with TypeScript
- **Drizzle ORM** for database operations and schema management
- **Zod** for request validation and type inference
- **RESTful API** design with proper error handling
- **In-memory storage fallback** for development without database

### Database Schema
- **users** table: id, username, password
- **messages** table: id, username, message, timestamp
- PostgreSQL as the primary database with Neon serverless driver

### UI Components
- Real-time message display with auto-scrolling
- User avatar generation with color coding
- Connection status indicators
- Responsive design for mobile and desktop
- Toast notifications for user feedback

## Data Flow

1. **Message Creation**: User types message → Frontend validation → API POST request → Backend validation → Database storage → Response
2. **Message Retrieval**: Periodic polling (2-second intervals) → API GET request → Database query → Frontend state update → UI re-render
3. **User Management**: Username setting → Local state management → Included in message payloads

## External Dependencies

### Core Framework Dependencies
- React ecosystem: react, react-dom, react-router (wouter)
- Backend: express, drizzle-orm, @neondatabase/serverless
- Validation: zod, drizzle-zod
- UI: @radix-ui components, tailwindcss, lucide-react

### Development Tools
- Build: vite, esbuild, tsx
- TypeScript: full type coverage across client and server
- Database: drizzle-kit for migrations and schema management

### Third-party Services
- **Neon Database**: Serverless PostgreSQL hosting
- **Replit**: Development environment and deployment platform

## Deployment Strategy

The application is configured for deployment on Replit with the following setup:

### Development
- `npm run dev`: Starts development server with hot reload
- Vite dev server for frontend assets
- Express server with auto-restart via tsx

### Production Build
- `npm run build`: Builds both frontend and backend
- Frontend: Vite builds optimized React bundle
- Backend: esbuild bundles server code with external packages
- Static assets served from Express in production

### Environment Configuration
- PostgreSQL connection via DATABASE_URL environment variable
- Automatic fallback to in-memory storage for development
- Port configuration for Replit's proxy system (port 5000 → 80)

## Changelog
- June 17, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.