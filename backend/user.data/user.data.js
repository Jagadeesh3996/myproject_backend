
const mongoose = require('mongoose');

// Define user schema and model
const userSchema = new mongoose.Schema({
    name : String,
    email : String,
    password : String,
    age : Number,
    gender : String,
    dob : Date,
    mobile : Number,
    city : String
},{
    timestamps :true
});

const users = mongoose.model('users', userSchema);

module.exports = users;