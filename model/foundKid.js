const mongoose = require('mongoose')

const foundKidSchema = new mongoose.Schema({
    name: {
        type: String,
        default: null
    },
    address: {
        type: String,
        default: null
    },
    age: {
        type: String,
        default: null
    },
    contactNo: {
        type: String,
        default: null
    },
    location:{
        type: String,
        default: null
    },
    gender:{
        type: String,
    },
    user_id:{
        type: String
    },
    profileImg:{
        type: String
    },
    latitude: {
        type:String,
        default: null
    },
    longitude: {
        type:String,
        default: null
    }
})
module.exports = mongoose.model("Found Kid", foundKidSchema);
