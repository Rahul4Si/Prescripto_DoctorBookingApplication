const Doctor = require('../models/doctorModel');
const User = require('../models/userModel');
const Appointment = require('../models/appointmentModel');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');

const addDoctorController = async (req, res) => {
    try {
        const {name,email,password,image,speciality,degree,experience,about,fees,address} = req.body;
        if(!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address){
            return res.status(200).json({ success:false,message: '*Some fields are missing' });
        }
        if(password.length < 8){
            return res.status(200).json({ success:false,message: 'Weak Password' });
        }
        let doctor = await Doctor.find({email});
        if(doctor.length > 0){
            return res.status(200).json({ success:false,message: 'Doctor already exists' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        doctor = new Doctor({name,email,password:hashedPassword,image,speciality,degree,experience,about,fees,address});
        await doctor.save();
        res.status(200).json({ success:true,message: 'Doctor added successfully' });
    } catch (error) {
        return res.status(400).json({ success:false,message: error.message });
    }
}

const adminLoginController = async (req,res)=>{
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(200).json({ success:false,message: '*Some fields are missing' });
        }
        if(email!=process.env.ADMIN_EMAIL || password!=process.env.ADMIN_PASSWORD){
            return res.status(200).json({ success:false,message: 'Invalid Credentials' });
        }
        const adminEmailPassword = email+password
        const token = jwt.sign({adminEmailPassword}, process.env.JWT_SECRET_KEY,{expiresIn: '1h'});
        res.status(200).json({ success:true,message: 'Doctor logged in successfully',token });
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ success:false,message: error.message });
    }
}

const adminGetAllDoctors = async (req,res)=>{
    try {
        const doctors = await Doctor.find({}).select('-password');
        res.status(200).json({ success:true,doctors });
    } catch (error) {
        return res.status(500).json({ success:false,message: error.message });
    }
}

const adminDoctorUpdateController = async (req, res) => {
    try {
        const {doctorId,name,image,speciality,degree,experience,about,fees} = req.body;
        if(!name || !image || !speciality || !degree || !experience || !about || !fees){
            return res.status(200).json({success:false,message:"Some fields are missing"})
        }
        await Doctor.findByIdAndUpdate(
            doctorId,
            { name, image, speciality, degree, experience, about, fees },
          );
        res.status(200).json({
            success: true,
            message: "Doctor updated successfully",
        });
        }  catch (error) {
        console.error("Error:", error);
        res.json({ success: false, message: "An error occurred" });
    };
}

const getAllAppointment = async (req,res)=>{
    try {
        const appointments = await Appointment.find({});
        if(!appointments){
            return res.status(200).json({ success:false,message: 'No Appointment Scheduled Currently' });
        }
        res.status(200).json({ success:true,appointments });
    } catch (error) {
        console.log('Error:',error.message);
        return res.status(500).json({ success:false,message: error.message });
    }
}

const getDashBoardData = async (req,res)=>{
    try {
        const doctors = await Doctor.find({});
        const users = await User.find({});
        const appointments = await Appointment.find({});
        const doctorCount = doctors.length;
        const userCount = users.length;
        let totalSum = 0;
        for(let i=0;i<appointments.length;i++){
            totalSum += appointments[i].currentBooking;
        }
        res.status(200).json({ success:true,doctorCount,userCount,totalSum });  
    } catch (error) {
        console.log('Error:',error.message);
        return res.status(500).json({ success:false,message: error.message });
    }
}

module.exports = {addDoctorController,adminLoginController,adminGetAllDoctors,adminDoctorUpdateController,getAllAppointment,getDashBoardData};