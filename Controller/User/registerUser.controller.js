const User = require('../../model/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const tokenKey = config.get('tokenKey')

const registerUserController = async  (req, res) => {

    try{

        const {first_name, last_name, email, password, contactNo, gender} = req.body;

        if(!(first_name && last_name && email && password && contactNo && gender)){
            res.status(400).send("All input is required");
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

        res.status(201).json(newUser);

    }
    catch (err){
        console.log(err)
        res.status(500).json({ "error": err })
    }
}

module.exports = {registerUserController}