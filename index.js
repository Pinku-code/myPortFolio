const { log } = require("console");
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const path = require("path");
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 8000;

const cors = require('cors');
app.use(cors());

// PostgreSQL database configuration
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Middleware to parse JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
const staticPath = path.join(__dirname, "/public");
app.use(express.static(staticPath));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Handle form submission
app.post('/', async (req, res) => {
  try {
    const { fullname, email, message } = req.body;

    // Insert data into PostgreSQL database
    const result = await pool.query(
      'INSERT INTO submit_form (fullname, email, message) VALUES ($1, $2, $3) RETURNING *',
      [fullname, email, message]
    );

    console.log('Form data submitted:', result.rows[0]);

    // Send a JSON response indicating success
    res.json({ success: true, message: 'Form data submitted successfully!' });
  } catch (error) {
    console.error(`Error submitting form data at ${new Date().toISOString()}:`, error);

    // Send a JSON response indicating failure
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});


app.listen(port, () => {
  console.log(`⚙️ Server is running at port: ${port}`);
});
