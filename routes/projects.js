import express from 'express';
import pool from '../db.js';

const router = express.Router();

export default router;

router.post('/', async (req, res) => {
    try {
        const { user_id, name, description} = req.body;
        const [result] = await pool.query(
            'INSERT INTO projects (user_id, name, description) VALUES (?, ?, ?)',
            [user_id, name, description]
        );
        res.status(201).json({ id: result.insertId, user_id, name, description });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM projects');
        res.json(rows);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM projects WHERE id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.json(rows[0]);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { name, description } = req.body;
        const [result] = await pool.query(
            'UPDATE projects SET name = ?, description = ? WHERE id = ?',
            [name, description, req.params.id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.json({ id: req.params.id, name, description });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM projects WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});