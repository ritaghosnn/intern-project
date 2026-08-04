import express from 'express';
import pool from './db.js';
import projectsRouter from './routes/projects.js';
import tasksRouter from './routes/tasks.js';

const app = express();
app.use(express.json());
app.use('/projects', projectsRouter);
app.use('/tasks', tasksRouter);
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Task Flow API is running');
});

async function startServer() {
  try {
    const connection = await pool.getConnection();
    console.log(`Connected to MySQL database: ${process.env.DB_NAME}`);
    connection.release();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to the database:', error.message);
    process.exit(1);
  }
}

startServer();