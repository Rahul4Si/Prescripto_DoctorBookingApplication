const User = require("../models/userModel");
const Doctor = require("../models/doctorModel")
const Appointment = require("../models/appointmentModel");
const CancelledAppointment = require("../models/cancelledAppointment"); 
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");

const registerUser = async(req,res)=>{
    try {
        const {name,email,password} = req.body;
        if(!name || !email || !password){
            return res.status(200).json({ success:false,message: '*Some fields are missing' });
        }
        if(password.length < 8){
            return res.status(200).json({ success:false,message: 'Weak Password' });
        }
        let user = await User.find({email});
        if(user.length > 0){
            return res.status(200).json({ success:false,message: 'User already exists' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });
        await newUser.save();
        return res.status(200).json({ success:true,message: 'User registered successfully' });
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ success:false,message: error.message });
    }
}

const loginUser = async(req,res) =>{
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(200).json({ success:false,message: '*Some fields are missing' });
        }
        let user = await User.find({email});
        if(!user){
            return res.status(200).json({ success:false,message: 'User does not exist' });
        }
        const validPassword = await bcrypt.compare(password,user[0].password);
        if(!validPassword){
            return res.status(200).json({ success:false,message: 'Invalid Password' });
        }
        const userEmail = user[0].email
        const token = jwt.sign({userEmail},process.env.JWT_SECRET_KEY,{expiresIn: '1d'});
        return res.status(200).json({ success:true,message: 'User logged in successfully',token,user });
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ success:false,message: error.message });
    }
    
}

const getUserProfile = async(req,res) =>{
    try {
        const user = await User.findById(req.user_id).select('-password');
        if(!user){
            return res.status(200).json({ success:false,message: 'User not found' });
        }
        return res.status(200).json({ success:true,user });
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ success:false,message: error.message });
    }
}

const isInteger = (str) => {
    const num = Number(str);
    return Number.isInteger(num);
  };

const updateUserProfile = async(req,res) =>{
    try {
        const {phone,addressLine1,addressLine2,dob,gender,image} = req.body;
        if(!phone || !addressLine1 || !addressLine2 || !dob || !gender || !image){
            return res.status(200).json({ success:false,message: '*Some fields are missing' });
        }
        if(phone.length < 10 || phone.length > 10 || !isInteger(phone)){
            return res.status(200).json({ success:false,message: 'Invalid Phone Number' });
         }
        const user = await User.findById(req.user_id);
        if(!user){
            return res.status(200).json({ success:false,message: 'User not found' });
        }
        await User.findByIdAndUpdate(
            req.user_id,
            { phone, address: [addressLine1,addressLine2], dob,gender,image },)
        return res.status(200).json({ success:true,message: 'User profile updated successfully' });
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ success:false,message: error.message });        
    }
}

const getDoctorById = async(req,res) =>{
    const { id } = req.query; // Get the specialty from the query parameter

    if (!id) {
      return res.status(200).json({success:false, message: 'ID is required' });
    }
  
    try {
      // Search for doctors with the specified specialty
      const doctor = await Doctor.find({ _id:id });
  
      if (doctor.length === 0) {
        return res.status(200).json({success:false, message: 'No doctors found for this specialty' });
      }
  
      return res.status(200).json({success:true,doctor});
    } catch (error) {
        console.log("error",error.message)
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const bookDoctor = async(req,res) =>{
    try {
        const { doctorId, slotDate,slotTime } = req.body;
        if(!doctorId || !slotDate || !slotTime){
            return res.status(200).json({ success:false,message: '*Some fields are missing' });
        }
        const userId = req.user_id;
        const newAppointment = new Appointment({
            docId:doctorId,slotDate,slotTime,userId
        })
        await newAppointment.save()
        return res.status(200).json({ success:true,message: 'Appointment booked successfully' });  
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ success:false,message: error.message });
        
    }
}

const checkBookingStatus = async(req,res) =>{
    try {
        const { doctorId, slotDate,slotTime } = req.body;
        if(!doctorId || !slotDate || !slotTime){
            return res.status(200).json({ success:false,message: '*Some fields are missing' });
        }
        const userId = req.user_id;
        let appointment = await Appointment.findOne({docId:doctorId,slotDate,slotTime});
        if(!appointment){
            return res.status(200).json({ success:true,message: 'Slot is available' });
        }
        if(appointment.userId.equals(userId) && appointment.cancelled === false){
            return res.status(200).json({ success:false,message: "Slot is already booked by you" });
        }
        if(appointment.userId.equals(userId) && appointment.cancelled === true){
            return res.status(200).json({ success:true,message: "Slot is available" });
        }
        return res.status(200).json({ success:false,message: "Slot is currently booked" });
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ success:false,message: error.message });
    }
}

const getUserAppointments = async(req,res) =>{
    try {
        const userId = req.user_id;
        let appointments = await Appointment.find({userId}).select('-userId').populate('docId').sort({createdAt: -1});
        if(appointments.length === 0){
            return res.status(200).json({ success:false,message: 'No appointments found' });
        }
        return res.status(200).json({ success:true,appointments });
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ success:false,message: error.message });
    }
}

const cancelledAppointment = async(req,res) =>{
    try {
        const userId = req.user_id;
        const cancelledAppointments = await Appointment.find({userId,cancelled:true}).populate('docId').sort({createdAt: -1}); 
        if(cancelledAppointments.length === 0){
            return res.status(200).json({ success:false,message: 'No cancelled appointments found' });
        }
        return res.status(200).json({ success:true,cancelledAppointments });
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ success:false,message: error.message });
    }
}

const cancelAppointment = async (req, res) => {
  const { appointmentId } = req.body;
  try {
    const appointment = await Appointment.findByIdAndUpdate(appointmentId, { cancelled: true }, { new: true });
    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }
    res.status(200).json({ success: true,appointment, message: "Appointment cancelled successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

const getAIResponse = async (req,res) =>{
    const userMessage = req.body.message;
    try {
        const response = await axios.post(
            'https://api.groq.com/openai/v1/chat/completions',
            {
                model: "llama3-8b-8192",
                messages: [{ role: "user", content: userMessage }]
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );
       return  res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error contacting GROQ API', details: error.message });
    }
}

module.exports = { registerUser,loginUser,getUserProfile,updateUserProfile,getDoctorById,bookDoctor,checkBookingStatus,getUserAppointments,cancelAppointment,cancelledAppointment,getAIResponse }; 