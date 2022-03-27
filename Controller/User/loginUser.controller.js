const User = require('../../model/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const {validationResult} = require("express-validator");
const {check} = require("express-validator");
const tokenKey = config.get('tokenKey')
const asyncHandler = require('express-async-handler')


const loginValidation = {
    email: check('email', 'Please! write a valid Email address').isEmail(),
    password: check('password', 'Password is required').exists()
}

const loginUserController = asyncHandler(async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    const {email, password} = req.body;

    const user = await User.findOne({email})

    if (user && (await bcrypt.compare(password, user.password))) {
        user.token =  jwt.sign({
                first_name: user.first_name,
                last_name: user.last_name,
                gender:user.gender,
                contactNo: user.contactNo,
                email, password,
                user_id: user._id,
                isAdmin: user.isAdmin,
                profileImgName: user.profileImgName,
                profileImg: user.profileImg
            },
            tokenKey,
            {expiresIn: '2h'}
        )
        res.status(200).json(user);
    }
    else{
        res.status(400)
        throw new Error("Invalid Email or Password!")
    }

})


module.exports = {loginValidation, loginUserController}