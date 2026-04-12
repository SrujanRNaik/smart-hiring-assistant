const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
connectDB();
const app = express();
// Middleware — parse incoming JSON bodies

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
// Test route
app.get('/', (req, res) => {
    res.json({ message: 'Hello World — server is running!' });
});
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

