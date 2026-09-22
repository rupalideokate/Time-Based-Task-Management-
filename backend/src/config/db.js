const mysql = require('mysql2/promise');
require('dotenv').config();

// Connection pool - reuses connections instead of opening a new one per query
const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || '',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Quick helper to verify the connection works on startup
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Connected to MySQL database:', process.env.DB_NAME);
    connection.release();
  } catch (err) {
    console.error('❌ Failed to connect to MySQL:', err.message);
    throw err;
  }
}

module.exports = { pool, testConnection };
