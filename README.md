# 💬 ChatApp — Real-Time Messaging Application

A modern, full-stack real-time chat application built with the MERN stack and Socket.IO. Features instant messaging, live online status, secure authentication, and a sleek glassmorphism UI.

🔗 **Live Demo:** [chat-application-taupe-ten.vercel.app](https://chat-application-taupe-ten.vercel.app)

---

## ✨ Features

- 🔐 **Secure Authentication** — JWT tokens, bcrypt password hashing, HTTP-only cookies
- 💬 **Real-Time Messaging** — Instant delivery powered by WebSockets (Socket.IO)
- 🟢 **Live Online Status** — See who's active in real time
- 📊 **Smart Sidebar** — Conversations sorted by most recent activity
- 🛡️ **Input Validation** — Dual-layer validation on client and server
- 💾 **Persistent Sessions** — Stay logged in across page refreshes (Redux Persist)
- 🚪 **Welcome Page** — Guest landing page with Login/Sign Up options
- ✨ **Modern UI** — Glassmorphism design with smooth animations and dark theme

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| React | UI Library |
| Redux Toolkit | State Management |
| Redux Persist | Session Persistence |
| Socket.IO Client | Real-Time Communication |
| Axios | HTTP Requests |
| Tailwind CSS | Styling |
| DaisyUI | UI Components |
| React Router | Navigation |
| React Hot Toast | Notifications |

### Backend
| Technology | Purpose |
|-----------|---------|
| Node.js | Runtime |
| Express | Server Framework |
| MongoDB + Mongoose | Database & ODM |
| Socket.IO | WebSocket Server |
| JWT | Authentication |
| bcryptjs | Password Hashing |

---

## 📂 Project Structure

```
Chat_Application/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Route handlers (user, message)
│   ├── middlewares/     # Authentication middleware
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API routes
│   ├── socket/          # Socket.IO setup
│   └── index.js         # Server entry point
│
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── hooks/       # Custom hooks
│   │   ├── redux/       # Redux slices & store
│   │   ├── App.jsx      # Root component
│   │   └── main.jsx     # Entry point
│   └── public/          # Static assets
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/anss009/Chat_Application.git
cd Chat_Application
```

### 2. Setup Backend
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:
```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_secret_key
```

Start the backend:
```bash
node index.js
```

### 3. Setup Frontend
```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` folder:
```env
VITE_API_URL=http://localhost:3000
```

Start the frontend:
```bash
npm run dev
```

### 4. Open the App
Visit `http://localhost:5173` in your browser.

---

## 🌐 Deployment

| Service | Platform |
|---------|----------|
| Frontend | [Vercel](https://vercel.com) |
| Backend | [Render](https://render.com) |
| Database | [MongoDB Atlas](https://cloud.mongodb.com) |

---

## 👤 Author

**Anss** — Full-Stack Developer (Solo)

Designed, developed, and deployed the entire application end-to-end.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
