# Task Manager – MERN Stack Application

## 📌 Project Overview

This is a **full-stack Task Manager application** built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js).

The application allows users to:

* Register and log in securely using JWT authentication
* Create, update, delete, and manage tasks
* Mark tasks as completed or pending
* Search and filter tasks
* View and update user profile information

This project was built as part of a **Frontend Developer Assignment** and follows industry-grade best practices for authentication, API security, and clean UI design.

---

## 🛠 Tech Stack

### Frontend

* React.js
* Axios
* React Router
* CSS (Responsive Design)

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* bcrypt.js

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone <your-github-repo-url>
cd task-manager
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside `backend`:

```
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
```

Start backend server:

```bash
node server.js
```

Backend will run at:

```
http://localhost:5000
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend will run at:

```
http://localhost:3000
```

---

## 🔐 Authentication Flow

* User registers or logs in
* Backend returns a JWT token
* Token is stored in `localStorage`
* Axios interceptor automatically attaches token to protected API calls
* Unauthorized users are redirected to login

---

## 📡 API Endpoints

### Auth Routes

| Method | Endpoint         | Description       |
| ------ | ---------------- | ----------------- |
| POST   | /api/auth/signup | Register new user |
| POST   | /api/auth/login  | Login user        |

### User Routes

| Method | Endpoint      | Description      |
| ------ | ------------- | ---------------- |
| GET    | /api/users/me | Get user profile |
| PUT    | /api/users/me | Update profile   |

### Task Routes

| Method | Endpoint       | Description     |
| ------ | -------------- | --------------- |
| GET    | /api/tasks     | Get all tasks   |
| POST   | /api/tasks     | Create new task |
| PUT    | /api/tasks/:id | Update task     |
| DELETE | /api/tasks/:id | Delete task     |

> All task and profile routes are **JWT protected**.

---

## 🧪 Testing

* API tested using **Postman**
* Postman collection included in repository
* Includes:

  * Signup
  * Login
  * Profile
  * Task CRUD

---

## 📄 Logs

A `LOGS.txt` file is included with:

```
Server running on port 5000
MongoDB connected successfully
POST /api/auth/login 200 OK
GET /api/tasks 200 OK
```

---

## 🚀 Deployment (Optional Bonus)

### Backend

* Deployed using Render :
https://task-manager-backend-ca8f.onrender.com

### Frontend

* Deployed using Vercel :

https://task-manager-frontendd-e0cbt4d6r-geethas-projects-4c31d4ab.vercel.app/
https://task-manager-frontendd.vercel.app/

---

## 📈 Scalability Notes

* Can add task pagination
* Role-based access (Admin/User)
* Refresh tokens for auth
* Task reminders & notifications
* Dockerization for deployment

---

## 👩‍💻 Author

**Geethanjali Banda**

---

## ✅ Final Checklist

* Signup & Login working
* JWT authentication implemented
* Protected routes secured
* Task CRUD functional
* Search & filter implemented
* Profile update works
* Postman collection included
* Logs included
* Clean & structured codebase

---

✨ This project meets all requirements of the assignment and is ready for evaluation.
