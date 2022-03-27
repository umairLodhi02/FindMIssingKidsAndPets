const User = require('../../model/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const tokenKey = config.get('tokenKey')
const {check, validationResult} = require('express-validator')
const asyncHandler = require('express-async-handler')

const registerValidation = {
    first_name: check('first_name', 'first name is required').not().isEmpty(),
    email: check('email', 'Please! write a valid Email address').isEmail(),
    password: check('password', 'Length should be grater than 6').isLength({min: 6}),
    last_name: check('last_name', 'last name is required').not().isEmpty(),
    gender: check('gender', 'Gender is required').not().isEmpty(),
    contactNo: check('contactNo', 'Length must be equal to 11').isLength({min: 11, max: 11})
}

const registerUserController = asyncHandler(async (req, res) => {

    const url = req.protocol + '://' + req.get('host')

    const {first_name, last_name, email, password, contactNo, gender, isAdmin} = req.body;

    const oldUser = await User.findOne({email})
    if (oldUser) {
        res.status(404)
        throw new Error("User already exists");
    }

    if(contactNo.length < 11 || contactNo.max > 11){
        res.status(404)
        throw new Error("Contact NO. must be equal to 11 digits")
    }
    if(password.length < 3){
        res.status(404)
        throw new Error("Password must be greater than 3")
    }
    const encryptedPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({
        first_name,
        last_name,
        email: email.toLowerCase(),
        password: encryptedPassword,
        contactNo,
        gender,
        profileImg: url + '/uploads/' + req.file.filename,
        profileImgName: req.file.filename,
        isAdmin
    })
    console.log(newUser)

    if(newUser) {
        res.status(200).json(newUser);
    }

    else {
        res.status(400);
        throw new Error("User not found");
    }

})
module.exports = {registerValidation, registerUserController}