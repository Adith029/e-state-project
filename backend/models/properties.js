const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['House', 'Villa', 'Apartment', "Office", "Land", "Shop"],
        required: true
    },
    saleOrRent: {
        type: String,
        enum: ["Rent", "Sale"]
    },
    bathroom: {
        type: String,
    },
    bedroom: {
        type: String,
    },
    measurements: {
        type: String,
        required: true
    },
    builtIn: {
        type: String,
        required: true
    },
    parking: {
        type: String,
        enum: ["Yes", "No",""]
    },
    address: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    zipcode: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    photo: {
        type: [String]
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    name:{
        type: String,
        ref: 'users',
    },
    favorites: 
    [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],

    ratings:[{
        star:Number,
        postedBy:{type:mongoose.Schema.Types.ObjectId,ref:"users"}
    }],
    totalRatings:{
        type:String,
        default:0
    }
    
});

const propertyDB = mongoose.model('properties', schema);
module.exports = propertyDB;
