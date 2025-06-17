# Local Setup Instructions

## Quick Start

1. **Download the project files** to your computer
2. **Open terminal/command prompt** in the project folder
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Start the app:**
   ```bash
   npm run dev
   ```
5. **Open browser** and go to: `http://localhost:5000`

## Detailed Steps

### Step 1: Prerequisites
Make sure you have Node.js installed:
- Download from: https://nodejs.org
- Choose version 18 or newer
- Verify installation: `node --version`

### Step 2: Get the Code
- Download all project files to a folder on your computer
- Make sure you have all these folders:
  - `client/` (React frontend)
  - `server/` (Node.js backend)  
  - `shared/` (shared code)
  - `package.json` file

### Step 3: Install Dependencies
Open terminal in the project folder and run:
```bash
npm install
```
This downloads all required packages.

### Step 4: Start the Application
```bash
npm run dev
```
You should see:
```
serving on port 5000
[vite] connecting...
[vite] connected.
```

### Step 5: Use the Chat App
1. Open browser to `http://localhost:5000`
2. Set your username
3. Start chatting!

## Troubleshooting

### Port Already in Use
If you see "EADDRINUSE" error:
```bash
# Kill process using port 5000
npx kill-port 5000
# Then restart
npm run dev
```

### Module Not Found
If you see import errors:
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Browser Not Loading
- Check terminal for errors
- Try `http://127.0.0.1:5000` instead
- Clear browser cache

## Project Structure for Practice

```
chat-app/
├── client/src/
│   ├── components/     # Chat UI components
│   ├── pages/         # Main chat page
│   └── lib/           # Helper functions
├── server/
│   ├── index.ts       # Server setup
│   ├── routes.ts      # API endpoints
│   └── storage.ts     # Message storage
└── shared/
    └── schema.ts      # Data types
```

## What to Practice

1. **Add new features** - Try adding emoji reactions, message editing
2. **Modify the UI** - Change colors, layout, add dark mode
3. **Extend the API** - Add user profiles, message search
4. **Fix bugs** - Practice debugging common issues
5. **Add validation** - Improve input checking and error handling

## Commands Reference

```bash
npm run dev     # Start development server
npm run build   # Build for production
npm start       # Run production build
```