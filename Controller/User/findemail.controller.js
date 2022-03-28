const User = require('../../model/user')
const asyncHandler = require('express-async-handler')
const findEmailController = asyncHandler ( async (req, res) => {

    const {email} = req.body
    const user = await User.findOne({email})

    if(user){
        res.status(200).json(user)
    }else if(!user){
        res.status(200).json({ message: 'User Not Found'})
    }else{
        res.status(400)
        throw new Error("Something went wrong!!!")
    }
})

module.exports = {findEmailController}