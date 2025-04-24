const mongoose = require('mongoose');

const cancelledAppointmentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    }
},{timestamps: true});

const CancelledAppointment = mongoose.model('CancelledAppointment', cancelledAppointmentSchema);
module.exports = CancelledAppointment;