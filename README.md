# Node.js + MongoDB + Mongoose Backend App (CRUD + Auth + JWT)

This project demonstrates how to build a **production-ready backend REST API** using **Node.js**, **Express**, **MongoDB**, and **Mongoose**, following **industry-standard MVC architecture**.

It is designed to work seamlessly with a React frontend and supports authentication, authorization, pagination, and search.

---

## 🚀 Features

- User Authentication (Register & Login)
- JWT-based Authorization
- Full CRUD for Books
- Pagination & Search (Backend-ready)
- Protected Routes using Middleware
- MongoDB Local & Atlas Support
- Frontend-ready REST APIs

---

## 📁 Project Structure````
```text
my-node-app/
│
├── controllers/
│   ├── bookController.js     # Book CRUD, pagination, search
│   └── authController.js     # Register & Login logic
│
├── routes/
│   ├── bookRoutes.js         # Book APIs
│   └── authRoutes.js         # Auth APIs
│
├── models/
│   ├── Book.js               # Book schema
│   └── User.js               # User schema
│
├── middleware/
│   └── authMiddleware.js     # JWT verification
│
├── seed.js                   # One-time DB seeding
├── server.js                 # App entry point
├── .env                      # Environment variables
├── package.json
└── README.md
```

---

## 🧱 MVC Architecture Explained

### controllers/
Handles business logic only.
- Validates input
- Communicates with models
- Sends responses

### routes/
Maps HTTP routes to controller functions.
- No business logic here

### models/
Defines MongoDB schemas using Mongoose.
- Validation
- Structure enforcement

### middleware/
Used for JWT authentication.
- Protects POST, PUT, DELETE routes

---

## ⚙️ Environment Variables (.env)

### Local MongoDB
MONGO_URL=mongodb://localhost:27017/bookdb  
PORT=8800  
JWT_SECRET=supersecretkey  

### MongoDB Atlas
MONGO_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/bookdb  
PORT=8800  
JWT_SECRET=supersecretkey  

⚠️ Never commit `.env` to GitHub

---

## 🔄 Request Flow

Client (Frontend / Postman)  
→ Express Server  
→ Routes  
→ Controllers  
→ Models  
→ MongoDB  
→ JSON Response  

---

## 🧪 Prerequisites

- Node.js v16+
- MongoDB (Local or Atlas)
- Postman (optional)

---

## 📦 Install Dependencies

```bash
npm install
```

Installs:
- express
- mongoose
- dotenv
- cors
- bcryptjs
- jsonwebtoken

---

## ▶️ Run the Project

### Step 1: Seed Database (Run Once)
```bash
node seed.js
```

### Step 2: Start Server
```bash
node server.js
```

Expected output:
Server running on port 8800  
Connected to MongoDB  

---

## 🔐 Authentication APIs

### Register
POST /api/auth/register

```json
{
  "username": "nischal",
  "email": "nischal@test.com",
  "password": "password123"
}
```

### Login
POST /api/auth/login

Response:
```json
{
  "token": "JWT_TOKEN",
  "user": {
    "id": "...",
    "username": "nischal",
    "email": "nischal@test.com"
  }
}
```

---

## 📚 Book APIs

### Get Books (Public, Pagination + Search)
GET /books?page=1&limit=5&search=clean

### Create Book (Protected)
POST /books  
Headers:
Authorization: Bearer <JWT_TOKEN>

```json
{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "year": 2008
}
```

### Update Book (Protected)
PUT /books/:id  

### Delete Book (Protected)
DELETE /books/:id  

---

## ❌ Common Errors

- Missing JWT token
- Invalid / expired token
- MongoDB connection issues
- Wrong route prefix
- IP not whitelisted in Atlas

---

## 🎯 Learning Outcomes

- MVC architecture in Node.js
- REST API design
- JWT authentication
- Pagination & search APIs
- Secure backend development
- Frontend-backend integration

---

## 👤 Author

**Nischal Aremanda**  
Backend & Full‑Stack Developer




