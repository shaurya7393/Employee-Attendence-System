// const express = require('express');
// const router = express.Router();
// const Presence = require('../models/presence');
// const authenticateJWT = require('../middlewares/authentication');

// // Log user login time
// router.post('/login', authenticateJWT, async (req, res) => {
//     try {
//         const { userId } = req.user;
//         const loginTime = new Date();
//         const presence = new Presence({ userId, loginTime });
//         await presence.save();
//         res.json({ message: 'Login time logged successfully' });
//     } catch (error) {
//         res.status(500).json({ message: 'Failed to log login time' });
//     }
// });

// // Log user logout time
// router.post('/logout', authenticateJWT, async (req, res) => {
//     try {
//         const { userId } = req.user;
//         const logoutTime = new Date();
//         await Presence.updateOne({ userId, logoutTime: null }, { logoutTime });
//         res.json({ message: 'Logout time logged successfully' });
//     } catch (error) {
//         res.status(500).json({ message: 'Failed to log logout time' });
//     }
// });

// module.exports = router;
