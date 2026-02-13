# 📝 Task Manager - Two-Tier Web Application

A simple task management app built with **ReactJS** (frontend), **Node.js** (backend), and **PostgreSQL** (database). Perfect for learning Docker and DevOps!

---

## 🎯 What This App Does

- ✅ Add new tasks
- ✅ View all your tasks
- ✅ Delete tasks you've completed
- ✅ Stores everything in a PostgreSQL database

---

## 🏗️ Architecture

```
┌─────────────────┐
│   React App     │  ← What you see (runs in browser on port 3000)
│   (Frontend)    │
└────────┬────────┘
         │
         │ HTTP requests
         ▼
┌─────────────────┐
│   Node.js API   │  ← Handles requests (runs on server on port 5000)
│   (Backend)     │
└────────┬────────┘
         │
         │ SQL queries
         ▼
┌─────────────────┐
│   PostgreSQL    │  ← Stores your tasks (runs on port 5432)
│   (Database)    │
└─────────────────┘
```

---

## 📂 Project Structure

```
project-two-tier-app/
│
├── frontend/                 # React application (what users see)
│   ├── public/
│   │   └── index.html       # HTML entry point
│   ├── src/
│   │   ├── App.js           # Main React component
│   │   ├── App.css          # Styling
│   │   ├── index.js         # React entry point
│   │   └── index.css        # Global styles
│   └── package.json         # Frontend dependencies
│
└── backend/                  # Node.js API (handles business logic)
    ├── server.js            # API routes + database connection
    └── package.json         # Backend dependencies
```

---

## 🚀 How to Run (Without Docker)

### **Prerequisites**

You need these installed on your computer:
- **Node.js** (download from https://nodejs.org/)
- **PostgreSQL** (or use Docker - easier!)

### **Step 1: Set Up PostgreSQL Database**

**Option A: Using Docker (Easiest!)**
```bash
docker run --name postgres-db \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=taskdb \
  -p 5432:5432 \
  -d postgres:15
```

**Option B: Install PostgreSQL Locally**
- Download from https://www.postgresql.org/download/
- After installation, create a database:
```bash
psql -U postgres
CREATE DATABASE taskdb;
\q
```

---

### **Step 2: Install Backend Dependencies**

```bash
cd backend
npm install
```

This will:
- Read `package.json`
- Download all required packages (express, pg, cors)
- Create `node_modules` folder and `package-lock.json`

---

### **Step 3: Start the Backend Server**

```bash
npm start
```

You should see:
```
Server running on http://localhost:5000
Table created or already exists
```

**What just happened?**
- Backend API started on port 5000
- Connected to PostgreSQL
- Created a `tasks` table if it didn't exist

---

### **Step 4: Install Frontend Dependencies**

Open a **new terminal** (keep backend running):

```bash
cd frontend
npm install
```

This downloads React and all its dependencies.

---

### **Step 5: Start the Frontend**

```bash
npm start
```

Your browser will automatically open to `http://localhost:3000`

**What you'll see:**
- A clean task manager interface
- An input box to add tasks
- A list showing all your tasks

---

## 🧪 Testing the App

1. **Add a task**: Type "Buy groceries" and click "Add Task"
2. **See it appear**: Your task shows up immediately
3. **Delete it**: Click the red "Delete" button
4. **Check the database**: Your tasks are actually saved in PostgreSQL!

To verify database storage:
```bash
# Connect to PostgreSQL
docker exec -it postgres-db psql -U postgres -d taskdb

# View all tasks
SELECT * FROM tasks;

# Exit
\q
```

---

## 🐳 Running with Docker (What You'll Do Next!)

You'll create these files yourself:

### **Files to Create:**

1. **frontend/Dockerfile** - Builds React app image
2. **backend/Dockerfile** - Builds Node.js API image
3. **docker-compose.yml** - Runs all 3 containers together
4. **.dockerignore** files - Excludes unnecessary files

### **Docker Compose Structure:**

```yaml
# What docker-compose.yml will do:
services:
  frontend:    # React app (port 3000)
  backend:     # Node.js API (port 5000)
  postgres:    # PostgreSQL database (port 5432)
```

---

## 📚 Key Concepts

### **What is ReactJS?**
- A JavaScript library for building user interfaces
- Runs in the **browser** (frontend)
- Makes your app interactive and responsive

### **What is Node.js?**
- JavaScript runtime for servers
- Runs on your **server** (backend)
- Handles API requests and talks to the database

### **What is PostgreSQL?**
- A powerful database system
- Stores your data permanently
- Similar to MySQL but with more features

### **What is npm?**
- **N**ode **P**ackage **M**anager
- Like `pip` for Python or `apt` for Linux
- Installs JavaScript libraries/packages

---

## 🔧 Common Commands

### **Frontend Commands:**
```bash
npm install          # Install dependencies
npm start            # Run development server (port 3000)
npm run build        # Create production build
```

### **Backend Commands:**
```bash
npm install          # Install dependencies
npm start            # Start API server (port 5000)
node server.js       # Alternative way to start
```

### **PostgreSQL Commands:**
```bash
# Using Docker
docker exec -it postgres-db psql -U postgres -d taskdb

# View tables
\dt

# View tasks
SELECT * FROM tasks;

# Exit
\q
```

---

## 🛠️ Technologies Used

| Technology | Purpose | Port |
|------------|---------|------|
| **React 18** | Frontend UI | 3000 |
| **Node.js + Express** | Backend API | 5000 |
| **PostgreSQL 15** | Database | 5432 |
| **npm** | Package management | - |

---

## 📝 API Endpoints

Your backend exposes these REST API endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/tasks` | Get all tasks |
| `POST` | `/tasks` | Create a new task |
| `DELETE` | `/tasks/:id` | Delete a specific task |

### **Example API Requests:**

**Get all tasks:**
```bash
curl http://localhost:5000/tasks
```

**Add a task:**
```bash
curl -X POST http://localhost:5000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Learn Docker"}'
```

**Delete a task:**
```bash
curl -X DELETE http://localhost:5000/tasks/1
```

---

## 🎓 Learning Points

### **For Beginners:**

1. **Two-Tier Architecture**: Frontend talks to backend, backend talks to database
2. **REST API**: Backend provides endpoints that frontend can call
3. **CORS**: Allows frontend (port 3000) to talk to backend (port 5000)
4. **Environment Variables**: Database credentials can be changed via env vars
5. **Async/Await**: JavaScript way of handling asynchronous operations

### **DevOps Skills You'll Practice:**

- ✅ Dockerizing applications
- ✅ Multi-stage builds
- ✅ Docker Compose orchestration
- ✅ Distroless images for security
- ✅ Container networking
- ✅ Environment variable management

---

## 🐛 Troubleshooting

### **Frontend won't start?**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm start
```

### **Backend can't connect to PostgreSQL?**
```bash
# Check if PostgreSQL is running
docker ps

# Check logs
docker logs postgres-db

# Make sure port 5432 is not in use
lsof -i :5432
```

### **"Cannot GET /tasks" error?**
- Make sure backend is running (`npm start` in backend folder)
- Check backend terminal for errors
- Verify PostgreSQL is running

### **Tasks not showing up?**
- Open browser console (F12) and check for errors
- Make sure backend is on port 5000
- Check `API_URL` in `App.js` is `http://localhost:5000`

---

## 🎯 Next Steps

1. ✅ Test the app locally (you're here!)
2. ⬜ Create Dockerfiles for frontend and backend
3. ⬜ Create docker-compose.yml
4. ⬜ Implement multi-stage builds
5. ⬜ Use Distroless images for security
6. ⬜ Add .dockerignore files
7. ⬜ Run everything with `docker-compose up`

---

## 💡 Tips

- **Keep it simple**: This is a learning project, don't overcomplicate!
- **Test locally first**: Make sure everything works before Dockerizing
- **Read error messages**: They usually tell you exactly what's wrong
- **Use Docker**: It makes PostgreSQL setup much easier
- **Check ports**: Make sure 3000, 5000, and 5432 aren't already in use

---

## 📧 Database Schema

```sql
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,              -- Auto-incrementing ID
  title VARCHAR(255) NOT NULL,        -- Task description
  created_at TIMESTAMP DEFAULT NOW()  -- When task was created
);
```

---

## 🎉 Success Checklist

- [ ] PostgreSQL is running
- [ ] Backend starts without errors
- [ ] Frontend opens in browser
- [ ] Can add tasks
- [ ] Can delete tasks
- [ ] Tasks persist after page refresh
- [ ] No errors in browser console
- [ ] No errors in backend terminal

---

## 📖 Additional Resources

- **React Docs**: https://react.dev/
- **Node.js Docs**: https://nodejs.org/docs/
- **PostgreSQL Docs**: https://www.postgresql.org/docs/
- **Express.js Guide**: https://expressjs.com/
- **Docker Tutorial**: https://docs.docker.com/get-started/

---

## 🏆 What You've Built

Congratulations! You've built a **full-stack web application** with:
- A beautiful React frontend
- A RESTful API backend
- A PostgreSQL database
- Complete CRUD operations (Create, Read, Delete)

Now you're ready to Dockerize it and learn DevOps! 🚀

---

**Made with ❤️ for learning Docker & DevOps**
