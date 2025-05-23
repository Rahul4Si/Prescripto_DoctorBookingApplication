const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    paymentStatus:{
        type: String,
        default: "Pending" 
    },
    docId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Doctor'
    },
    slotDate:{
        type: String,
        required: true
    },
    slotTime:{
        type: String,
        required: true
    },
    amount:{
        type: Number,
        default: 500
    },
    date:{
        type: String,
        default: new Date().toISOString().slice(0, 10) 
    },
    cancelled:{
        type: Boolean,
        default: false
    },
    payment:{
        type: Boolean,
        default: false
    },
    isCompleted:{
        type: Boolean,
        default: false
    }
},{timestamps: true});


const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;