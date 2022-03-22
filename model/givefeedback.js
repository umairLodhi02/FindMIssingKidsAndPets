const mongoose = require('mongoose')

const giveFeedbackSchema = new mongoose.Schema({

    feedback: {
        type: String,
        default: null
    },
    user_id: {
        type: String,
        default: null
    }
})

module.exports = mongoose.model("Give Feedback", giveFeedbackSchema)