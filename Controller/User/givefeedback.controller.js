const asyncHandler = require('express-async-handler')
const GiveFeedback = require('../../model/givefeedback')
const User = require('../../model/user')

const giveFeedbackController = asyncHandler( async ( req, res ) => {

    const user = await User.findById(req.body.user_id)

    if(!user){
        res.status(404)
        throw new Error("User Not Found")
    }
    else {

        const { feedback } = req.body

        const newFeedback = await GiveFeedback.create({
            feedback,
            user_id: user._id
        })

        if(newFeedback){
            res.status(200).json(newFeedback)
        }
        else {
            res.status(400)
            throw new Error("Something went wrong")
        }
    }
})

module.exports = {giveFeedbackController}