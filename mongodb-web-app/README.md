# MongoDB Web App

A practical full-stack web application demonstrating MongoDB database integration with a Node.js/Express backend and React frontend.

## Features

- 📝 **Notes Management System** - Create, read, update, and delete notes
- 🗂️ **Categories & Priority** - Organize notes by category (General, Work, Personal, Ideas)
- ✅ **Task Completion** - Mark notes as completed
- 🎨 **Beautiful UI** - Modern, responsive design using CSS Grid
- 🔄 **Real-time Updates** - Instant synchronization with MongoDB
- 🛡️ **Data Validation** - Mongoose schema validation
- 💾 **Cloud Ready** - Can be deployed to any cloud platform

## Technology Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM

### Frontend
- **React** - UI library
- **Axios** - HTTP client
- **CSS3** - Styling with gradients and animations

## Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)

### Installation

1. **Backend Setup:**
   ```bash
   cd mongodb-web-app/backend
   npm install
   npm run dev
   ```

2. **Frontend Setup (new terminal):**
   ```bash
   cd mongodb-web-app/frontend
   npm install
   npm start
   ```

3. **MongoDB:**
   - Local: `mongod` (in another terminal)
   - Atlas: Update `.env` with connection string

Open http://localhost:3000 in your browser!

## Project Structure

```
mongodb-web-app/
├── backend/
│   ├── models/Note.js           # Data schema
│   ├── routes/noteRoutes.js     # API routes  
│   ├── server.js                # Express server
│   ├── .env                     # Environment config
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/          # React components
│   │   ├── App.js               # Main component
│   │   └── index.js             # Entry point
│   ├── public/index.html        # HTML template
│   └── package.json
├── SETUP.md                     # Detailed setup
├── QUICKSTART.md                # Quick reference
└── README.md                    # This file
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/notes` | Get all notes |
| GET | `/api/notes/:id` | Get specific note |
| POST | `/api/notes` | Create note |
| PUT | `/api/notes/:id` | Update note |
| DELETE | `/api/notes/:id` | Delete note |

## Database Schema

```javascript
{
  title: String (required, max 100),
  content: String (required, max 5000),
  category: String (General, Work, Personal, Ideas),
  priority: String (Low, Medium, High),
  isCompleted: Boolean,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

## Development

### Add to Backend
1. Add new model in `backend/models/`
2. Create routes in `backend/routes/`
3. Connect in `server.js`

### Add to Frontend
1. Create component in `frontend/src/components/`
2. Import in `App.js`
3. Add API calls using axios

## Deployment

### Heroku (Backend)
```bash
git push heroku main
```

### Vercel (Frontend)
```bash
vercel
```

### MongoDB Atlas (Cloud Database)
1. Create cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Update connection string in `.env`

## Troubleshooting

- **MongoDB not connecting?** Ensure `mongod` is running
- **Port conflicts?** Update PORT in `.env`
- **CORS errors?** Check backend is running on 5000
- **Dependencies error?** Run `npm install` again

## Learning Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Guide](https://mongoosejs.com/)
- [Express Tutorial](https://expressjs.com/)
- [React Docs](https://react.dev/)

## License

MIT - Free to use for learning and projects!

---

**Created:** 2024  
**Purpose:** Educational - Learn MongoDB with a complete web app example
