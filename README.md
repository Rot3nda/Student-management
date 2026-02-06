# 🎓 Student Management System (MERN Stack)

A full-stack Student Management web application built using the MERN stack.  
This system allows users to create, read, update, and delete student records through a responsive React interface connected to a Node/Express API and MongoDB database.

## visit site at : https://student-management-eight-steel.vercel.app

---

## 🛠 Tech Stack

- MongoDB  
- Express.js  
- React (Vite)  
- Node.js  

---

## ✨ Features

- Add new students  
- View student list  
- Update student details  
- Delete students  
- RESTful backend API  

---

## 📁 Project Structure

```
backend/   → Express + MongoDB API
frontend/  → React client (Vite)
```

---

## 🚀 Running the Project Locally

### 1️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the **backend** folder and add:

```
MONGO_URI=your_mongodb_connection_string
PORT=5001
```

Start the backend server:

```bash
npm start
```

Backend runs on:  
http://localhost:5001

---

### 2️⃣ Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:  
http://localhost:5173

---

## 🌐 API Example

Get all students:

GET http://localhost:5001/api/students

---

## 🧪 Environment Variables

| Variable     | Description                               |
|--------------|-------------------------------------------|
| MONGO_URI    | MongoDB connection string                 |
| PORT         | Backend server port (default 5000)        |

---

## 🗄 Database Design

The application uses a MongoDB database with a **Student** collection.

### Student Schema Structure

| Field       | Type   | Description              |
|------------|--------|--------------------------|
| name       | String | Student full name        |
| email      | String | Student email address    |
| age        | Number | Student age              |
| course     | String | Course enrolled in       |
| createdAt  | Date   | Record creation date     |

### Example Student JSON

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "age": 22,
  "course": "Computer Science"
}
```
---

## 🔄 Application Flow

1. User opens the React frontend  
2. Frontend sends API requests to the Express backend  
3. Backend processes requests and interacts with MongoDB  
4. Database returns data to the backend  
5. Backend sends JSON response to the frontend  
6. Frontend updates the UI dynamically  

---

## 🧩 API Routes Overview

| Method | Endpoint            | Description              |
|--------|---------------------|--------------------------|
| GET    | /api/students       | Get all students         |
| GET    | /api/students/:id   | Get single student       |
| POST   | /api/students       | Create new student       |
| PUT    | /api/students/:id   | Update student           |
| DELETE | /api/students/:id   | Delete student           |

---

## 🌍 Live Demo

## visit site at : https://student-management-eight-steel.vercel.app

---

## 🧠 Challenges Faced

- Connecting frontend and backend across different ports  
- Managing environment variables securely  
- Structuring a clean REST API  
- Handling MongoDB schema validation  

---

## 👤 Author

Rotenda Ramugondo  
Software Engineer MERN Stack | Asp.net Stack

email : rotenda.ra@yahoo.com | rotenda.ra@gmail.com

cell : +27 79 133 6480

---
