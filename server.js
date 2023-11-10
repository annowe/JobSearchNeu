const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'mickey00',
  database: 'jobSearchNeu',
});

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const [result] = await pool.query(
      'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );
    res
      .status(201)
      .send({ message: 'User signed up', userId: result.insertId });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      // Handle duplicate entry (email already exists)
      res.status(409).send({ message: 'Email already in use' });
    } else {
      // Handle other possible errors
      res.status(500).send({ message: 'Error signing up user' });
    }
  }
});
const jwtSecret = 'your_jwt_secret'; // This should be in an environment variable and not hardcoded

app.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [
      email,
    ]);
    if (users.length === 0) {
      return res.status(401).send({ message: 'Invalid email or password' });
    }

    // Check if password is correct
    const user = users[0];
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).send({ message: 'Invalid email or password' });
    }

    // Generate a token
    const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });

    // Send the token to the client
    res.send({ message: 'Authenticated successfully', token });
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Error signing in user', error: error.message });
  }
});

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
