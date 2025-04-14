const Doctor = require("../models/doctorModel");
const Appointment = require("../models/appointmentModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getDoctorCategories = async (req, res) => {
  try {
    const specialties = await Doctor.distinct("speciality");
    if (specialties.length === 0) {
      return res
        .status(200)
        .json({ success: false, message: "No specialties found" });
    }
    res.status(200).json({ success: true, specialties });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getAllDoctorByCategoreis = async (req, res) => {
  try {
    const { speciality } = req.query;
    let doctors;

    if (speciality) {
      doctors = await Doctor.find({ speciality });
      if (doctors.length === 0) {
        return res
          .status(200)
          .json({ success: false, message: `No ${speciality} doctors found` });
      }
    } else {
      doctors = await Doctor.find();
      if (doctors.length === 0) {
        return res
          .status(200)
          .json({ success: false, message: "No doctors found" });
      }
    }

    res.status(200).json({ success: true, doctors });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const doctorLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ doctorId: doctor._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });
    res.status(200).json({ success: true, token , message: "Login successfull"});
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getDoctorProfile = async (req, res) => {
  try {
    const doctorId = req.doctor_id;
    const doctor = await Doctor.findById(doctorId).select("-password");
    if (!doctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }
    res.status(200).json({ success: true, doctor });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

const getDoctorAppointments = async (req, res) => {
  try {
    const doctorId = req.doctor_id;
    const appointments = await Appointment.find({ docId: doctorId }).populate("userId");
    if (!appointments) {
      return res.status(404).json({ success: false, message: "No appointments found" });
    }
    res.status(200).json({ success: true, appointments });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

const completeAppointment = async (req, res) => {
  const { appointmentId } = req.body;
  try {
    const appointment = await Appointment.findByIdAndUpdate(appointmentId, { isCompleted: true }, { new: true });
    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }
    res.status(200).json({ success: true,appointment, message: "Appointment completed successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
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

const updateDoctorFees = async (req, res) => {
  const { updatedFees } = req.body;
  const doctorId = req.doctor_id;
  try {
    const doctor = await Doctor.findByIdAndUpdate(doctorId, { fees: updatedFees}, { new: true });
    if (!doctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }
    res.status(200).json({ success: true,doctor, message: "Doctor fees updated successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
 
module.exports = { getDoctorCategories, getAllDoctorByCategoreis , doctorLoginController , getDoctorProfile , getDoctorAppointments , completeAppointment , cancelAppointment, updateDoctorFees }; 