const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authenticateJWT = require('../middlewares/authentication');
const jwt = require('jsonwebtoken');

const SECRET_KEY='SHAURYA';
// User Registration
const generateToken=(user)=>{
return jwt.sign({userId:user._id},SECRET_KEY,{expiresIn:'6h'});
}
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const user = new User({ username, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to register user' });
    }
});

// User Login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username, password });
        if (user) {
            // Generate JWT token for authentication
            const token = generateToken(user);
            // Set the loginTime for the user

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
            // Send the token and response to the client
            res.json({ token });
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
        const {username,password} = req.body; 

        let timestamp = Date.now(); // Get current timestamp in milliseconds
        let dateObject = new Date(timestamp); // Create a new Date object

        // Extract hours, minutes, and seconds from the date object
        let hours = dateObject.getHours();
        let minutes = dateObject.getMinutes();
        let seconds = dateObject.getSeconds();
         
        // Format the time components if needed (add leading zeros)
        let formattedTime = `${hours}:${minutes}:${seconds}`;
        let logoutTime = formattedTime;
        // Update user's logout time
        const user=await User.findOne({username,password});
        user.logoutTime=logoutTime;
        await user.save();
        res.json({ message: 'Logout time logged successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to log logout time' });
    }
});
router.get('/user', async (req, res) => {
    try {
        const users = await User.find({}, { _id: 0, __v: 0 }); 
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
