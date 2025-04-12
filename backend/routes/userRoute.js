const express = require('express');
const { registerUser, loginUser, getUserProfile,updateUserProfile, getDoctorById, bookDoctor,checkBookingStatus, getUserAppointments, cancelAppointment, cancelledAppointment } = require('../controllers/userController');
const userAuth = require('../middlewares/userAuth');



const router = express.Router();

router.post('/registerUser',registerUser)
router.get('/getDoctorById',getDoctorById)
router.post('/loginUser',loginUser)
router.get('/getUserProfile',userAuth,getUserProfile)
router.post('/updateUserProfile',userAuth,updateUserProfile)
router.post('/bookDoctor',userAuth,bookDoctor)
router.post('/checkBookingStatus',userAuth,checkBookingStatus)
router.get('/getUserAppointments',userAuth,getUserAppointments)
router.put('/cancelAppointment',userAuth,cancelAppointment)
router.get('/cancelledAppointments',userAuth,cancelledAppointment)

module.exports = router;