import express from 'express';
import auth from '../middleware/authMiddleware.js';
import {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask
} from '../controllers/taskController.js';
import { body } from 'express-validator';

const router = express.Router();
router.use(auth);

router.post('/', [
  body('title').notEmpty(),
  body('dueDate').isISO8601()
], createTask);

router.get('/', getTasks);
router.get('/:id', getTask);
router.patch('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
