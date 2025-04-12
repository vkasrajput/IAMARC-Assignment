#  Task Manager API

A RESTful Task Management API built with **Node.js**, **Express.js**, and **MySQL**, using **JWT authentication** and **manual SQL queries** (no ORM).

##  Features

- User Registration and Login (with hashed passwords)
- JWT-based Authentication
- CRUD operations for tasks
- Only the owner of a task can view or delete it
- Field validation using `express-validator`
- **Pagination with limit and page query parameters**

### NOTE: this end point work for paging and limit http://localhost:7007/api/tasks?page=3&limit=2

-  Task attributes:

  - `id`: Auto-incremented primary key
  - `title`: String (required)
  - `description`: String (optional)
  - `status`: Enum (`pending`, `in-progress`, `completed`) - default: `pending`
  - `dueDate`: ISO8601 Date (required)
  - `userId`: Foreign key to `users` table

## 🛠️ Tech Stack

- Node.js
- Express.js
- MySQL (using `mysql2`)
- JWT (jsonwebtoken)
- Bcrypt
- Express Validator
- Dotenv

## 🚀 Getting Started

### 1. Clone the repo



### 2. Install dependencies

install all the dependencies


### 3. Setup `.env`

### For you convenience I am adding env file too, which is not a good practice 

Create a `.env` file or change it accordingly.

env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=task_manager
JWT_SECRET=your_jwt_secret


### 4. Setup MySQL Database

Run the following SQL to create required tables:

sql

CREATE DATABASE  task_manager; 

USE task_manager;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status ENUM('pending', 'in-progress', 'completed') DEFAULT 'pending',
  dueDate DATE NOT NULL,
  userId INT,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);


### 5. Start the server

node app.js

##  API Endpoints

###  Auth

| Method | Endpoint      | Description            |
|--------|---------------|------------------------|
| POST   | `/api/register` | Register new user      |
| POST   | `/api/login`    | Login and get JWT token |

###  Tasks (Protected)

| Method | Endpoint         | Description                  |
|--------|------------------|------------------------------|
| GET    | `/api/tasks`     | Get all tasks for user      |
| GET    | `/api/tasks/:id` | Get specific task by ID     |
| POST   | `/api/tasks`     | Create new task             |
| PUT    | `/api/tasks/:id` | Update task by ID           |
| DELETE | `/api/tasks/:id` | Delete task by ID           |

| GET    | `/api/tasks/?page=3&limit=2`| for limiting page |

> Use JWT token in `Authorization` header as `Bearer <token>`

---

##  Sample Request (Create Task)

http
POST /api/tasks
Authorization: Bearer <your_token>

{
  "title": "Title Name",
  "description": "Write the description of your task here",
  "dueDate": "2025-04-15",
  "status": "pending"// optional
}
