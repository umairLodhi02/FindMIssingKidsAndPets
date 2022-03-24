const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        default: null
    },
    last_name: {
        type: String,
        default: null
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    token: {
        type: String,
        default: ''
    },
    contactNo: {
        type: String
    },
    gender: {
        type: String
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    profileImgName: {
        type: String,
        default: ''
    },
    profileImg: {
        type: String,
        default: null
    }

})
module.exports = mongoose.model("User", userSchema);
