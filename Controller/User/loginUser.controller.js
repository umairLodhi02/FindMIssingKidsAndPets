const User = require('../../model/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const {validationResult} = require("express-validator");
const {check} = require("express-validator");
const tokenKey = config.get('tokenKey')


const loginValidation = {
    email: check('email', 'Please! write a valid Email address').isEmail(),
    password: check('password', 'Password is required').exists()
}

const loginUserController = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try{
        const {email, password} = req.body;

        if(!(email && password)){
            return res.status(400).send("All input is required")
        }

        const user = await User.findOne({email})

        if(user && ( await bcrypt.compare(password, user.password))){
            const token = jwt.sign(
                {user_id: user._id, email},
                tokenKey,
                {expiresIn: "2h"}
            )
            // save user token
            user.token = token;

            // user
            return res.status(200).json(user);
        }
        return res.status(400).send("Invalid Credentials")
    }
    catch (err){
        console.log(err)
        return res.status(500).send({error: err})
    }
}


module.exports = {loginValidation,loginUserController}