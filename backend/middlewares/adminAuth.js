const jwt = require('jsonwebtoken');

const adminAuth = (req, res, next) => {
    const {admintoken} = req.headers

    if (!admintoken) {
        return res.status(401).json({ 
            success: false, 
            message: 'Access denied. No token provided. Redirecting to login.',
            redirect: '/adminLogin'
        });
    }

    try {
        const decoded = jwt.verify(admintoken, process.env.JWT_SECRET_KEY);
        if(decoded.adminEmailPassword !== process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD){
            return res.status(400).json({ success:false,message: 'Invalid Credentials.Login Again' });
        }
        next();
    } catch (error) {
        console.log(error.message)
        res.status(400).send({ error: 'Invalid token.' });
    }
};

module.exports = adminAuth;