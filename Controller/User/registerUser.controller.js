const User = require('../../model/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const tokenKey = config.get('tokenKey')
const {check, validationResult} = require('express-validator')


const registerValidation = {
    first_name: check('first_name', 'first name is required').not().isEmpty(),
    email: check('email', 'Please! write a valid Email address').isEmail(),
    password: check('password', 'Length should be grater than 6').isLength({ min: 6 }),
    last_name: check('last_name', 'last name is required').not().isEmpty(),
    gender: check('gender', 'Gender is required').not().isEmpty(),
    contactNo: check('contactNo', 'Length must be equal to 11').isLength({min: 11,max: 11})
}

const registerUserController = async  (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try{

        const {first_name, last_name, email, password, contactNo, gender} = req.body;

        if(!(first_name && last_name && email && password && contactNo && gender)){
            return res.status(400).send("All input is required");
        }

        const oldUser = await User.findOne({email})
        if(oldUser){
            return res.status(409).send("User Already Exist. Please Login");
        }

        const encryptedPassword = await bcrypt.hash(password, 10)

        const newUser = await User.create({
            first_name,
            last_name,
            email: email.toLowerCase(),
            password: encryptedPassword,
            contactNo,
            gender
        })

        const token1 = jwt.sign({
            newUser_id: newUser._id,
            email
        },
            tokenKey,
            {expiresIn: '2h'}
        )

        newUser.token = token1

        return res.status(200).json(newUser);

    }
    catch (err){
        console.log(err)
        return res.status(500).json({ "error": err })
    }
}

module.exports = {registerValidation,registerUserController}