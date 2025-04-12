const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
    address: {
        type: [String],
        default: ['Not Selected','Not Selected']
    },
    gender: {
        type: String,
        default: 'Not Seleced',
        enum: ['Male','Female','Not Seleced']
    },
    dob: {
        type: String,
        required: true,
        default: '01/01/2000'
    },
    phone: {
        type: String,
        default: '0000000000',
    },
},{minimize: false});

const User = mongoose.model('User', userSchema);

module.exports = User;