import pool from '../db/connection.js';

export const createTask = async (req, res) => {
  const { title, description, status = 'pending', dueDate } = req.body;
  const userId = req.userId;

  if (!title || !dueDate) {
    return res.status(400).json({ message: 'Title and dueDate are required' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO tasks (title, description, status, dueDate, userId) VALUES (?, ?, ?, ?, ?)',
      [title, description || null, status, dueDate, userId]
    );

    res.status(201).json({
      message: 'Task created successfully',
      taskId: result.insertId
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


export const getTasks = async (req, res) => {

  const { page = 1, limit = 10 } = req.query; // Default page 1, limit 10
  const offset = (page - 1) * limit;
  try {
    const [countResult] = await pool.query(
      'SELECT COUNT(*) AS total FROM tasks WHERE userId = ?',
      [req.userId]
    );
    const totalTasks = countResult[0].total;
    const totalPages = Math.ceil(totalTasks / limit);

    const [tasks] = await pool.query(
      'SELECT id, title, description, status, dueDate FROM tasks WHERE userId = ? LIMIT ? OFFSET ?',
      [req.userId, parseInt(limit), offset]
    );
    res.json({
      tasks,
      currentPage: parseInt(page),
      totalPages,
      totalTasks,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tasks', error: err.message });
  }
};


export const getTask = async (req, res) => {
  const { id } = req.params;

  try {
    const [task] = await pool.query(
      'SELECT * FROM tasks WHERE id = ? AND userId = ?',
      [id, req.userId]
    );

    if (task.length === 0) {
      return res.status(404).json({ message: 'Task not found or unauthorized' });
    }

    res.json(task[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching task', error: err.message });
  }
};



export const updateTask = async (req, res) => {
  const { title, description, status, dueDate } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE tasks SET title=?, description=?, status=?, dueDate=? WHERE id=? AND userId=?',
      [title, description, status, dueDate, req.params.id, req.userId]
    );

    // Check the number of affected rows
    if (result.affectedRows > 0) {
      res.json({ message: 'Task updated' });
    } else {
      res.status(404).json({ message: 'Task not found or unauthorized to update' });
    }
  } catch (err) {
    console.error("Error updating task:", err);
    res.status(500).json({ message: 'Error updating task', error: err.message });
  }
};


export const deleteTask = async (req, res) => {
  try {
    const [result] = await pool.query(
      'DELETE FROM tasks WHERE id = ? AND userId = ?',
      [req.params.id, req.userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Task not found or unauthorized' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting task', error: err.message });
  }
};

