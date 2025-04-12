import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import { validationResult } from 'express-validator';
import {errorH} from './middleware/errorMiddleware.js'

dotenv.config();

const app = express();
app.use(express.json());
app.use(errorH);

app.use((req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
});

// route

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.get("/", (req, res) => {
    console.log("server is running");
    res.send("server is running")
})

// DB Connection

import pool from './db/connection.js';

(async () => {
  try {
    await pool.query('SELECT 1');
    console.log('Database connection successful');
  } catch (err) {
    console.error('Unable to connect to DB:', err.message);
    process.exit(1);
  }
})();

//server
app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT} `);
});
