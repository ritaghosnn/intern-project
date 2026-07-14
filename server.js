import express from 'express';
import pool from './db.js';

const app = express();
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