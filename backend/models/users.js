const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
    },
    city: {
        type: String,
    },
    photo: {
        type: String
    },
    role: {
        type: String,
        enum: ["admin", "seller", "buyer"]
    },
    becomeSeller: {
        type: String,
        enum: ["true", "false"]
    },
    properties: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'properties'
    }],
   
});

const userDB = mongoose.model('users', schema);
module.exports = userDB;