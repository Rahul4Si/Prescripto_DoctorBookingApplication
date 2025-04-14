const express = require('express');
const {addDoctorController,adminLoginController,adminGetAllDoctors, adminDoctorUpdateController, getAllAppointment, getDashBoardData} = require('../controllers/adminControllers');
const adminAuth = require('../middlewares/adminAuth');

const router = express.Router();

router.post('/addDoctor',adminAuth,addDoctorController);
router.post('/adminlogin',adminLoginController);
router.get('/getDoctors',adminAuth,adminGetAllDoctors);
router.post('/updateDoctor',adminAuth,adminDoctorUpdateController)
router.get('/getAllAppointment',adminAuth,getAllAppointment)
router.get('/getDashboardData',adminAuth,getDashBoardData)

module.exports = router;