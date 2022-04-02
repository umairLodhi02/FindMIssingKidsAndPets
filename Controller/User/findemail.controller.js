const User = require('../../model/user')
const asyncHandler = require('express-async-handler')
const sendEmail = require("../../utils/sendEmail");
const findEmailController = asyncHandler ( async (req, res) => {

    const {email} = req.body
    const user = await User.findOne({email})
    const text = Math.floor(1000 + Math.random() * 9000);
    if(user){
        await sendEmail(user.email, "Your Otp", text)
        res.status(200).json(user)
    }else if(!user){
        res.status(200).json({ message: 'User Not Found'})
    }else{
        res.status(400)
        throw new Error("Something went wrong!!!")
    }

})

module.exports = {findEmailController}