const jwt = require('jsonwebtoken');
const User = require('../models/User');
const SECRET_KEY = 'SHAURYA';
const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    jwt.verify(token,SECRET_KEY, async (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Forbidden" });
        }
        try {
            const user = await User.findById(decoded.userId);
            if (!user) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            req.user = user;
            next();
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    });
};

module.exports = authenticateJWT;
