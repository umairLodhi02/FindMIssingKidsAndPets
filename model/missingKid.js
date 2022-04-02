const mongoose = require('mongoose')

const missingKidSchema = new mongoose.Schema({
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
    reward: {
        type: Number,
        default: 0
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
module.exports = mongoose.model("Missing Kid", missingKidSchema);
