const express = require('express');
const { getDoctorCategories,getAllDoctorByCategoreis, doctorLoginController, getDoctorProfile, getDoctorAppointments, cancelAppointment, completeAppointment, updateDoctorFees, } = require('../controllers/doctorControllers');
const doctorAuth = require('../middlewares/doctorAuth');


const router = express.Router();

router.get('/getDoctorsCategories',getDoctorCategories);
router.get('/getDoctorProfile', doctorAuth , getDoctorProfile);
router.get('/getAllDoctorByCategory',getAllDoctorByCategoreis);
router.get('/getDoctorAppointments',doctorAuth,getDoctorAppointments);
router.post('/cancelAppointment',doctorAuth,cancelAppointment);
router.post('/completeAppointment',doctorAuth,completeAppointment);
router.post('/updateDoctorFees',doctorAuth,updateDoctorFees);
router.post('/doctorLogin',doctorLoginController);

module.exports = router;