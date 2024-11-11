console.log('Starting server...');

const path = require('mongodb://localhost:27017');
const connectDB = require(path.resolve(__dirname, 'config/db'));

const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();
connectDB();

app.use(express.json());
app.use('/api/auth', authRoutes); // Use the authentication routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

