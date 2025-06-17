# Chat Application - Replit Guide

## Overview

This is a real-time chat application built with React frontend and Express.js backend, designed for machine coding practice. The application features a modern UI with real-time messaging, user avatars, and connection status indicators.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **UI Library**: Radix UI components with custom styling
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: TanStack Query (React Query) for server state
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation
- **Build Tool**: Vite for fast development and building

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js 20
- **API Style**: RESTful API design
- **Data Storage**: In-memory storage (MemStorage class)
- **Validation**: Zod schemas for request/response validation
- **Development**: Hot reload with tsx

## Key Components

### Data Layer
- **Storage Interface**: `IStorage` abstraction for data operations
- **In-Memory Implementation**: `MemStorage` class with Maps for users and messages
- **Schema Definitions**: Drizzle ORM schemas with Zod validation in `shared/schema.ts`
- **Type Safety**: Shared TypeScript types between frontend and backend

### API Endpoints
- `GET /api/messages` - Fetch all messages
- `POST /api/messages` - Create new message
- `GET /api/messages/:id` - Get specific message by ID

### Frontend Components
- **Chat Page**: Main chat interface with real-time polling
- **Message Components**: Message list, input, and individual message rendering
- **UI Components**: Comprehensive set of reusable Radix UI components
- **Connection Status**: Visual indicator for connection state

### Real-time Features
- **Polling Strategy**: 2-second intervals for message updates
- **Connection Simulation**: Simulated connection status changes
- **Auto-scroll**: Automatic scrolling to latest messages
- **User Avatars**: Color-coded avatars based on username hash

## Data Flow

1. **Message Creation**: User types message → validation → API call → server storage → UI update
2. **Message Retrieval**: Periodic polling → API fetch → React Query cache → UI render
3. **User Management**: Username setting → local state → included in message payload
4. **Connection Status**: Simulated connection changes → visual feedback to user

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Database connector (prepared for future PostgreSQL integration)
- **drizzle-orm**: Type-safe ORM with schema definitions
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Comprehensive UI component library
- **zod**: Runtime type validation
- **wouter**: Minimal router for React

### Development Tools
- **Vite**: Build tool and dev server
- **TypeScript**: Type safety across the stack
- **Tailwind CSS**: Utility-first CSS framework
- **ESBuild**: Fast JavaScript bundler for production

## Deployment Strategy

### Development Environment
- **Runtime**: Replit with Node.js 20, Web, and PostgreSQL modules
- **Port Configuration**: Local port 5000, external port 80
- **Hot Reload**: Automatic restart on file changes
- **Process**: `npm run dev` starts both frontend and backend

### Production Build
- **Frontend Build**: Vite builds to `dist/public`
- **Backend Build**: ESBuild bundles server to `dist/index.js`
- **Deployment Target**: Autoscale deployment on Replit
- **Start Command**: `npm run start` serves production build

### Database Strategy
- **Current**: In-memory storage for development and testing
- **Future**: Drizzle schemas prepared for PostgreSQL migration
- **Migration**: `npm run db:push` for schema updates

## Changelog

- June 17, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.