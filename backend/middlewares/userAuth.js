const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Adjust the path as necessary

const userAuth = async (req, res, next) => {
    try {
        const {token} = req.headers;
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findOne({email: decoded.userEmail});
        
        if (!user) {
            return res.status(401).send({success:false, message: 'User not found. Login Again' });
        }
        req.user_id = user._id; 
        next();
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
};

module.exports = userAuth;