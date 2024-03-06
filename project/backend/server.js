const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./controllers/auth');
const dotenv = require('dotenv');
const app = express();


// load environment variables
dotenv.config();
const PORT = process.env.PORT;
// Middleware
app.use(cors());
app.use(bodyParser.json());


// Routes
app.use('/api', authRoutes);

// Connect to MongoDB
mongoose.connect(`${process.env.MONGO_URI}`)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(error => console.error('Error connecting to MongoDB:', error));
