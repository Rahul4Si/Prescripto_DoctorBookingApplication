const jwt = require('jsonwebtoken');
const Doctor = require('../models/doctorModel'); // Adjust the path as necessary

const doctorAuth = async (req, res, next) => {
    try {
        const {token} = req.headers;
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const doctor = await Doctor.findOne({_id: decoded.doctorId});
        
        if (!doctor) {
            return res.status(401).send({success:false, message: 'Doctor not found. Login Again' });
        }
        req.doctor_id = doctor._id;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
};

module.exports = doctorAuth;