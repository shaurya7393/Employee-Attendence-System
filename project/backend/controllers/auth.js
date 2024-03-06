const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt= require('bcrypt');

router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        const existingUser = await User.findOne({ username });
        
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        const user = new User({ username,password: hashedPassword });
        await user.save();
        
        res.status(201).json({ message: 'User registered successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to register user' });
    }
});

// User Login
router.post('/login',async (req, res) => {
    try {
        const { username, password } = req.body;
        
        const user = await User.findOne({ username});
        const isMatch = await bcrypt.compare(password,user.password);
        if (username ===user.username && isMatch) {
            
            let timestamp = Date.now(); // Get current timestamp in milliseconds
            let dateObject = new Date(timestamp); // Create a new Date object

            // Extract hours, minutes, and seconds from the date object
            let hours = dateObject.getHours();
            let minutes = dateObject.getMinutes();
            let seconds = dateObject.getSeconds();

            // Format the time components if needed (add leading zeros)
            let formattedTime = `${hours}:${minutes}:${seconds}`;



            user.loginTime = formattedTime;
            await user.save(); // Save the changes to the user document
            
            res.json({ message: 'LogIn time logged successfully'});
            
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Login failed' });
    }
});

router.post('/logout',async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        const isMatch = await bcrypt.compare(password, user.password);
        if (username === user.username && isMatch) {

            let timestamp = Date.now(); // Get current timestamp in milliseconds
            let dateObject = new Date(timestamp); // Create a new Date object

            // Extract hours, minutes, and seconds from the date object
            let hours = dateObject.getHours();
            let minutes = dateObject.getMinutes();
            let seconds = dateObject.getSeconds();

            // Format the time components if needed (add leading zeros)
            let formattedTime = `${hours}:${minutes}:${seconds}`;



            user.logoutTime = formattedTime;
            await user.save(); // Save the changes to the user document
            
            res.json({ message: 'LogOut time logged successfully' });
        }
        else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to log logout time' });
    }
});
router.get('/user', async (req, res) => {
    try {
        const users = await User.find({}); 
        // console.log(users);
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch user data' });
    }
});

router.delete('/del', async (req, res) => {
    try {
        const result = await User.deleteMany();
        res.json({ message: `${result.deletedCount} documents deleted successfully` });
    } catch (err) {
        console.error('Error deleting users:', err);
        res.status(500).json({ message: 'Failed to delete users' });
    }
});

module.exports = router;
