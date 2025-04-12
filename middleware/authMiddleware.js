import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default function (req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer '))
    return res.status(401).json({ message: 'No token provided' });

  try {
    const token = authHeader.split(' ')[2];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    console.log(decoded)
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
}
