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
        type: Number,
        default: 0
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
    }
})
module.exports = mongoose.model("Missing Kid", missingKidSchema);
