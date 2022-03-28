const mongoose = require('mongoose')

const foundPetSchema = new mongoose.Schema({
    mc_id: {
        type: String,
        default: null
    },
    address: {
        type: String,
        default: null
    },
    breed: {
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
    user_id:{
        type: String
    },
    profileImg:{
        type: String
    }
})
module.exports = mongoose.model("Found Pet", foundPetSchema);
