const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));

module.exports = app;
