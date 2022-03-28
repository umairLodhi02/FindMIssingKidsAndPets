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
    }
})
module.exports = mongoose.model("Found Kid", foundKidSchema);
