const express = require('express');
const helmet = require('helmet');
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

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

// Example CSP for development
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"], // Allow everything from the same origin
      scriptSrc: [
        "'self'",
        "'unsafe-inline'", // Allow inline scripts for development convenience
        "'unsafe-eval'", // Allow string-to-JavaScript evaluations for development tools
        'http://localhost:3000', // Allow scripts from your local dev server
        // Add additional script sources as needed for your development environment
      ],
      styleSrc: [
        "'self'",
        "'unsafe-inline'",
        'https:',
        'http://localhost:3000',
      ], // Allow styles from the same origin, unsafe-inline for inline styles, and over HTTPS
      imgSrc: ["'self'", 'data:', 'https:'], // Allow images from the same origin, data URIs, and over HTTPS
      connectSrc: ["'self'", 'ws://localhost:3000'], // Allow WebSocket connections for hot-reload (change if your dev server uses a different port)
      // Add any other directives needed for your development environment
    },
    reportOnly: false, // Set to true if you want browsers to report errors but not enforce the policy
  })
);

// Additional development-specific Helmet configuration can go here

app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Try to insert the new user into the database
    const [result] = await pool.query(
      'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );
    res
      .status(201)
      .send({ message: 'User signed up', userId: result.insertId });
  } catch (error) {
    // This will catch any SQL errors, including the unique constraint violation
    if (error.code === 'ER_DUP_ENTRY') {
      // If a duplicate email is found, send a 409 Conflict response
      res.status(409).send({ message: 'Email already in use' });
    } else {
      // For other SQL errors, send a 500 Internal Server Error response
      res.status(500).send({ message: 'Error signing up user', error });
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
