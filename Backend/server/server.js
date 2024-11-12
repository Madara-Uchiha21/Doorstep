console.log('Starting server...');

const express = require('express');
const cors = require('cors');
const connectDB = require('./server/config/db');
const authRoutes = require('./server/controllers/authController');
require('dotenv').config();

const app = express();

// Connect to MongoDB
function connectdb() {
  connectDB(); 
  console.log("Database Connected");
}
connectdb()

// Middleware to parse JSON
app.use(express.json());

// CORS configuration
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend URL if it's different
  credentials: true,
}));

// Use the authentication routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
