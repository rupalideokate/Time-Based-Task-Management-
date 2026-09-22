const { pool } = require('../config/db');

// GET /api/users
async function getUsers(req, res) {
  try {
    const [rows] = await pool.query('SELECT * FROM users ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// GET /api/users/:id
async function getUserById(req, res) {
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'User not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// POST /api/users
async function createUser(req, res) {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'name and email are required' });
  }
  try {
    const [result] = await pool.query(
      'INSERT INTO users (name, email) VALUES (?, ?)',
      [name, email]
    );
    res.status(201).json({ id: result.insertId, name, email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// PUT /api/users/:id
async function updateUser(req, res) {
  const { name, email } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE users SET name = ?, email = ? WHERE id = ?',
      [name, email, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'User not found' });
    res.json({ id: req.params.id, name, email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// DELETE /api/users/:id
async function deleteUser(req, res) {
  try {
    const [result] = await pool.query('DELETE FROM users WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'User not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };
