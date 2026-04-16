# MongoDB Web App - Setup & Installation Guide

## Project Overview
This is a full-stack web application demonstrating MongoDB integration with:
- **Backend:** Node.js + Express + Mongoose
- **Frontend:** React
- **Database:** MongoDB
- **Features:** Notes management system (CRUD operations)

## Prerequisites
Before starting, ensure you have:
1. **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
2. **MongoDB** (installed locally or MongoDB Atlas) - [Download](https://www.mongodb.com/try/download/community)
3. **Git** (optional)

## Step 1: Install MongoDB

### Option A: MongoDB Community Server (Local)
1. Download and install from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
2. Start MongoDB:
   - **Windows (Command Prompt - as Administrator):**
     ```bash
     mongod
     ```
   - MongoDB will run on `mongodb://localhost:27017`

### Option B: MongoDB Atlas (Cloud)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account and cluster
3. Get your connection string (replace in `.env` file)
4. Connection string format: `mongodb+srv://username:password@cluster.mongodb.net/dbname`

## Step 2: Setup Backend

1. Navigate to the backend folder:
   ```bash
   cd mongodb-web-app/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables (`.env` file already exists):
   - If using MongoDB locally: Keep `MONGODB_URI=mongodb://localhost:27017/mongodb-webapp`
   - If using MongoDB Atlas: Replace with your connection string
   - Port: `5000` (default)

4. Start the backend server:
   ```bash
   # Development mode with auto-reload
   npm run dev

   # Or production mode
   npm start
   ```

   Expected output:
   ```
   Connected to MongoDB successfully!
   Server is running on http://localhost:5000
   ```

## Step 3: Setup Frontend

1. In a new terminal, navigate to the frontend folder:
   ```bash
   cd mongodb-web-app/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

   The app will automatically open at `http://localhost:3000`

## Step 4: Test the Application

1. Open http://localhost:3000 in your browser
2. Try these features:
   - **Add Note:** Fill the form and click "Add Note"
   - **View Notes:** All notes are displayed as cards
   - **Edit Note:** Click pencil icon on a card
   - **Delete Note:** Click trash icon to remove
   - **Mark Complete:** Click checkbox to mark completed
   - **Filter:** Use filter buttons to view All/Completed/Pending notes

## Project Structure

```
mongodb-web-app/
├── backend/
│   ├── models/
│   │   └── Note.js          # MongoDB Note schema
│   ├── routes/
│   │   └── noteRoutes.js    # API endpoints
│   ├── server.js            # Express server
│   ├── .env                 # Environment variables
│   └── package.json         # Dependencies
├── frontend/
│   ├── public/
│   │   └── index.html       # HTML template
│   ├── src/
│   │   ├── components/
│   │   │   ├── NoteForm.js  # Form to add notes
│   │   │   ├── NoteList.js  # Display notes
│   │   │   └── NoteCard.js  # Individual note card
│   │   ├── App.js           # Main app component
│   │   ├── App.css          # Styling
│   │   └── index.js         # Entry point
│   └── package.json         # Dependencies
└── README.md                # This file
```

## API Endpoints

### Base URL: `http://localhost:5000/api`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/notes` | Get all notes |
| GET | `/notes/:id` | Get a specific note |
| POST | `/notes` | Create a new note |
| PUT | `/notes/:id` | Update a note |
| DELETE | `/notes/:id` | Delete a note |
| GET | `/health` | Health check |

### Example API Calls

**Create Note:**
```bash
curl -X POST http://localhost:5000/api/notes \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Note",
    "content": "Note content here",
    "category": "Work",
    "priority": "High"
  }'
```

**Get All Notes:**
```bash
curl http://localhost:5000/api/notes
```

**Update Note:**
```bash
curl -X PUT http://localhost:5000/api/notes/NOTE_ID \
  -H "Content-Type: application/json" \
  -d '{"isCompleted": true}'
```

## Troubleshooting

### MongoDB Connection Error
- **Issue:** "Cannot connect to MongoDB"
- **Solution:** 
  - Ensure MongoDB is running (`mongod` command)
  - Check connection string in `.env` file
  - Verify MongoDB port is 27017

### Port Already in Use
- **Issue:** "Port 5000 is already in use"
- **Solution:**
  - Kill the process: `netstat -ano | findstr :5000` (Windows)
  - Or change PORT in `.env` file

### CORS Error
- **Issue:** Frontend can't connect to backend
- **Solution:**
  - Ensure backend is running on port 5000
  - Check proxy in frontend `package.json`
  - May need to update `process.env.REACT_APP_API_URL`

### Modules Not Found
- **Issue:** "Cannot find module 'express'"
- **Solution:** Run `npm install` in the respective folder

## Learning Resources

- **MongoDB Docs:** https://docs.mongodb.com/
- **Mongoose Docs:** https://mongoosejs.com/
- **Express Docs:** https://expressjs.com/
- **React Docs:** https://react.dev/

## Next Steps

Try extending this app with:
- User authentication (JWT/sessions)
- Search functionality
- Export notes to PDF
- Dark mode toggle
- Cloud deployment (Heroku, Vercel, Azure)
- Real-time updates (WebSocket)

## License
MIT License - Feel free to use for learning!
