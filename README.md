# Chat Application

A real-time chat application built with React and Node.js, perfect for machine coding practice.

## Features

- Real-time messaging with automatic updates
- Username setting and user avatars
- Message timestamps and character limits
- Clean, responsive user interface
- In-memory storage (no database setup required)

## Local Setup

### Prerequisites
- Node.js 18 or higher

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

4. Open your browser to: `http://localhost:5000`

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

## Multiple Users

The application supports multiple users chatting simultaneously:

- Each user sets their own username
- Messages are shared across all connected users
- Real-time updates via polling (2-second intervals)
- Unique colored avatars for each username

To test with multiple users:
1. Open multiple browser windows/tabs
2. Set different usernames in each
3. Send messages from any window to see them appear in all

## Technologies Used

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Express.js, TypeScript, Zod validation
- **Build Tools**: Vite, esbuild
- **State Management**: TanStack Query

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server

## Development Notes

- Messages are stored in memory and reset when server restarts
- No database setup required - perfect for quick development
- Automatic polling keeps messages synchronized across users
- Character limit of 500 characters per message