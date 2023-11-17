require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

// PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Signup Route
app.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [username, email, hashedPassword]);
    res.status(201).send('User created successfully');
  } catch (error) {
    res.status(500).send('Error creating user');
  }
});

// Login Route
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      if (await bcrypt.compare(password, user.password)) {
        req.session.userId = user.id; // Set user session
        res.send('Logged in successfully');
      } else {
        res.status(401).send('Invalid credentials');
      }
    } else {
      res.status(401).send('Invalid credentials');
    }
  } catch (error) {
    res.status(500).send('Error logging in');
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
