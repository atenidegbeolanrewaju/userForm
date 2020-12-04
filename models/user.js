const mongoose = require('mongoose');

const userSchema = new mongoose.Schema ({
    name : {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number, 
        required: true
    },
    DOB: {
        type: Date,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);