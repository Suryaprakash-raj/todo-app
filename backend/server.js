const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Get all tasks
app.get('/tasks', (req, res) => {
  db.query('SELECT * FROM tasks', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Add a task
app.post('/tasks', (req, res) => {
  const { title, description } = req.body;
  if (!title) return res.status(400).send('Title is required');
  db.query('INSERT INTO tasks (title, description) VALUES (?, ?)', [title, description], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ id: result.insertId, title, description });
  });
});

// Update a task
app.put('/tasks/:id', (req, res) => {
  const { title, description } = req.body;
  const { id } = req.params;
  db.query('UPDATE tasks SET title = ?, description = ? WHERE id = ?', [title, description, id], (err) => {
    if (err) return res.status(500).send(err);
    res.send('Task updated');
  });
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
  db.query('DELETE FROM tasks WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.send('Task deleted');
  });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
