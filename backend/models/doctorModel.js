const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: 'https://i.pinimg.com/736x/21/20/b0/2120b058cb9946e36306778243eadae5.jpg'
    },
    speciality: {
        type: String,
        required: true
    },
    degree: {
        type: String,
        required: true
    },
    experience: {
        type: Number,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    available: {
        type: Boolean,
        default: true
    },
    rating: {
        type: Number,
        default: 0
    },
    fees: {
        type: Number,
        required: true
    },
    address: {
        type: Object,
        default:{
            line1: '',
            line2: '',
        }
    },
    date: {
        type: String,
        default: new Date().toISOString().slice(0, 10)
    },
    slots_booked: {
        type: Object,
        default: {}
    }
},{minimize: false});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;