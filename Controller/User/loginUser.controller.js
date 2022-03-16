const User = require('../../model/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const tokenKey = config.get('tokenKey')

const loginUserController = async (req, res) => {

    try{
        const {email, password} = req.body;

        if(!(email && password)){
            res.status(400).send("All input is required")
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
            res.status(200).json(user);
        }
        res.status(400).send("Invalid Credentials")
    }
    catch (err){
        console.log(err)
        res.status(500).send({error: err})
    }
}


module.exports = {loginUserController}