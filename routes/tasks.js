import express from 'express';
import pool from '../db.js';

const router = express.Router();

// CREATE - POST /tasks
router.post('/', async (req, res) => {
  try {
    const { user_id, project_id, title, description, status, priority, due_date } = req.body;
    const [result] = await pool.query(
      'INSERT INTO tasks (user_id, project_id, title, description, status, priority, due_date) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [user_id, project_id ?? null, title, description ?? null, status ?? 'pending', priority ?? 'medium', due_date]
    );
    res.status(201).json({ id: result.insertId, user_id, project_id: project_id ?? null, title, description, status: status ?? 'pending', priority: priority ?? 'medium', due_date });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ ALL - GET /tasks
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM tasks');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ ONE - GET /tasks/:id
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM tasks WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE - PUT /tasks/:id
router.put('/:id', async (req, res) => {
  try {
    const { title, description, status, priority, due_date, project_id } = req.body;
    const [result] = await pool.query(
      'UPDATE tasks SET title = ?, description = ?, status = ?, priority = ?, due_date = ?, project_id = ? WHERE id = ?',
      [title, description, status, priority, due_date, project_id ?? null, req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json({ id: req.params.id, title, description, status, priority, due_date, project_id: project_id ?? null });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE - DELETE /tasks/:id
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM tasks WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;