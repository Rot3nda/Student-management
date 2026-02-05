# 🎓 Student Management System (MERN Stack)

A full-stack Student Management web application built using the **MERN stack**.  
This system allows users to **create, read, update, and delete student records** through a responsive React frontend connected to a RESTful Node.js/Express backend with MongoDB.

---

## Tech Stack

**Frontend**
- React (Vite)
- Axios (API communication)
- CSS / Modern UI layout

**Backend**
- Node.js
- Express.js
- MongoDB (MongoDB Atlas)
- Mongoose (ODM)

**Deployment**
- Frontend: Vercel  
- Backend: Render  
- Database: MongoDB Atlas (Cloud)

---

## 📌 Features

- Add new students  
- View all students  
- Edit student information  
- Delete students  
- RESTful API architecture  
- Cloud database integration  
- Production-ready deployment  

---

## 🏗️ System Architecture

User → React Frontend → Express/Node API → MongoDB Database → Response back to UI

---

## 🔄 Application Flow

### 1️⃣ Fetch Students
- React loads dashboard
- Sends **GET /api/students**
- Backend fetches students from MongoDB
- JSON response displayed in UI

### 2️⃣ Add Student
- User fills form
- React sends **POST /api/students**
- Backend validates & saves to DB
- Updated list returned

### 3️⃣ Update Student
- User edits record
- React sends **PUT /api/students/:id**
- Database record updated

### 4️⃣ Delete Student
- User clicks delete
- React sends **DELETE /api/students/:id**
- Record removed from DB

---

## 📂 Project Structure

### Backend (Node + Express)

backend/  
│  
├── config/  
│   └── db.js  
├── models/  
│   └── Student.js  
├── routes/  
│   └── studentRoutes.js  
├── controllers/  
│   └── studentController.js  
├── server.js  
└── .env  

### Frontend (React)

frontend/src/  
│  
├── api/  
│   └── api.js  
├── pages/  
│   ├── Dashboard.jsx  
│   └── AddStudent.jsx  
├── components/  
│   └── StudentCard.jsx  
└── App.jsx  

---

## 🧠 Backend Logic Overview

### Database Connection (`config/db.js`)
Establishes a secure connection to MongoDB Atlas using Mongoose.

### Student Model (`models/Student.js`)
Defines the schema for student records.

### Controller Functions (`studentController.js`)

| Function         |         Purpose        |
|------------------|------------------------|
| getStudents      | Fetch all students     |
| getStudentById   | Fetch one student      |
| createStudent    | Add a new student      |
| updateStudent    | Modify student details |
| deleteStudent    | Remove a student       |

### Routes (`studentRoutes.js`)

| Method | Endpoint          | Description        |
|--------|-------------------|--------------------|
| GET    | /api/students     | Get all students   |
| GET    | /api/students/:id | Get single student |
| POST   | /api/students     | Create student     |
| PUT    | /api/students/:id | Update student     |
| DELETE | /api/students/:id | Delete student     |

---

## 🗄️ Database Design

### Student Collection Structure (.Jason)

{
  "_id": "ObjectId",
  "name": "John Doe",
  "age": 21,
  "course": "Computer Science",
  "year": 3,
  "createdAt": "2026-02-01T10:00:00Z",
  "updatedAt": "2026-02-01T10:00:00Z"
}

### Schema (Mongoose)

const studentSchema = new mongoose.Schema(
  {
    name :   { type: String, required: true },
    age :    { type: Number, required: true },
    course : { type: String, required: true },
    year :   { type: Number, required: true }
}, 
{ timestamps: true });

---

## 🌍 Live Demo of the Full Application

***Visit site at** https://student-management-eight-steel.vercel.app 

🚀 **Frontend:** https://student-management-eight-steel.vercel.app
🔗 **Backend API:**  https://student-management-qhbg.onrender.com/api/students

> The app is fully deployed with a cloud-hosted MongoDB database and live API.

---

## 🧩 Challenges Faced

### CORS Issues During Deployment
Browsers blocked frontend requests to the backend due to different domains.

**Solution:** Configured Express CORS middleware to allow requests from the deployed frontend.

### Environment Variable Management
Different API URLs and database credentials were needed for development and production.

**Solution:** Used `.env` files and environment-based configuration.

### MongoDB Connection Setup
Initial connection issues occurred due to incorrect URI formatting and IP restrictions.

**Solution:** Corrected the MongoDB connection string and configured Atlas network access.

### UI Not Updating After CRUD Operations
The interface did not automatically reflect changes after creating or deleting records.

**Solution:** Updated React state after each successful API response.

---

## 🎯 Key Learning Outcomes

- Built a full CRUD REST API  
- Designed a NoSQL document schema  
- Connected frontend to backend using Axios  
- Handled CORS and environment variables  
- Deployed a full-stack application to cloud platforms  

---

## 👨‍💻 Author

Rotenda Ramugondo  
Software Engineer | MERN Stack Developer | Asp.net developer
