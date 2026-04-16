# MongoDB Web App - Quick Start Guide

## One-Command Setup (Quick Reference)

### Windows Users
```bash
# Terminal 1 - Backend
cd mongodb-web-app\backend
npm install
npm run dev

# Terminal 2 - Frontend (new terminal)
cd mongodb-web-app\frontend
npm install
npm start
```

### macOS/Linux Users
```bash
# Terminal 1 - Backend
cd mongodb-web-app/backend
npm install
npm run dev

# Terminal 2 - Frontend (new terminal)
cd mongodb-web-app/frontend
npm install
npm start
```

## What You'll Get

✅ Full-stack MongoDB web app
✅ Create, Read, Update, Delete (CRUD) operations
✅ Beautiful UI with React
✅ REST API with Express.js
✅ Mongoose schema validation
✅ Notes with priority and categories
✅ Responsive design (mobile-friendly)

## Initial Requirements

1. **MongoDB Running:** Make sure `mongod` is running in a terminal
2. **Node.js Installed:** Check with `node -v` and `npm -v`
3. **Two Terminal Windows:** One for backend, one for frontend

## Workflow

```
1. Start MongoDB (mongod in terminal)
   ↓
2. Start Backend (npm run dev)
   ↓
3. Start Frontend (npm start)
   ↓
4. App opens at http://localhost:3000
```

## Database

- **Connection String:** `mongodb://localhost:27017/mongodb-webapp`
- **Collection:** `notes`
- **Fields:** title, content, category, priority, isCompleted, timestamps

## Default Ports

- **Backend:** http://localhost:5000
- **Frontend:** http://localhost:3000
- **MongoDB:** localhost:27017

## Common Issues

| Issue | Solution |
|-------|----------|
| "Cannot connect to MongoDB" | Start MongoDB with `mongod` |
| "Port 5000 already in use" | Change PORT in `.env` file |
| "Module not found" | Run `npm install` in backend folder |
| "React app not loading" | Check backend proxy in `package.json` |

## Features to Try

- ✏️ Add a new note
- 📝 Edit existing notes
- ✅ Mark notes as complete
- 🏷️ Filter by priority and category
- 🗑️ Delete notes
- 🔄 Real-time updates

## Next Steps

1. Explore the database using MongoDB Compass
2. Add new fields to the Note schema
3. Implement user authentication
4. Deploy to production (Heroku, Vercel, etc.)

Enjoy your MongoDB web app! 🚀
