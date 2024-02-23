const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./controllers/auth');
// const presenceRoutes = require('./controllers/presenceRoute');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', authRoutes);
// app.use('/api/presence', presenceRoutes);

// Connect to MongoDB
mongoose.connect('mongodb+srv://shaurya:Ayush123@cluster0.6mzcap8.mongodb.net/')
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(error => console.error('Error connecting to MongoDB:', error));
