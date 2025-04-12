import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

try {
  const connection = await pool.getConnection();
  console.log('MySQL connected successfully');
  await connection.release();
} catch (err) {
  console.error('MySQL connection failed:', err.message);
  process.exit(1); 
}

export default pool;
