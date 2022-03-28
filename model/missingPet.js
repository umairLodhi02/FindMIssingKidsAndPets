const mongoose = require('mongoose')

const missingPetSchema = new mongoose.Schema({
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
    user_id:{
        type: String
    },
    profileImg:{
        type: String
    }
})
module.exports = mongoose.model("Missing Pet", missingPetSchema);
