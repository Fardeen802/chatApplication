# Chat Application for Machine Coding Practice

A real-time chat application built with React and Node.js, perfect for practicing machine coding rounds.

## Features

- Real-time chat interface
- Username setting
- Message timestamps
- User avatars with color coding
- Connection status indicator
- Message character limit (500 chars)
- Responsive design

## Local Setup

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone or download this project
2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and go to: `http://localhost:5000`

## Project Structure

```
├── client/               # React frontend
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── pages/        # Page components
│   │   └── lib/          # Utilities
├── server/               # Express backend
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API routes
│   └── storage.ts        # In-memory storage
├── shared/               # Shared types and schemas
└── package.json          # Dependencies and scripts
```

## API Endpoints

- `GET /api/messages` - Get all messages
- `POST /api/messages` - Send a new message
- `GET /api/messages/:id` - Get specific message

## Message Format

```json
{
  "id": "number",
  "username": "string", 
  "message": "string",
  "timestamp": "ISO timestamp"
}
```

## Usage for Coding Practice

This application is designed to help you practice:

1. **Full-stack development** - React frontend + Node.js backend
2. **API design** - RESTful endpoints with proper validation
3. **Real-time features** - Message polling and updates
4. **Form handling** - Username setting and message input
5. **State management** - React hooks and TanStack Query
6. **UI/UX design** - Responsive chat interface

## Technologies Used

- **Frontend**: React 18, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Express.js, TypeScript, Zod validation
- **Build Tools**: Vite, esbuild
- **State Management**: TanStack Query
- **Storage**: In-memory (for development)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server

## Development Notes

- Messages are stored in memory and will reset when server restarts
- The app polls for new messages every 2 seconds
- Username is stored locally in browser state
- Connection status is simulated for demo purposes