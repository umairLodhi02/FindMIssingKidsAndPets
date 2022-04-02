const User = require('../../model/user')
const asyncHandler = require('express-async-handler')
const jwt = require("jsonwebtoken");
const config = require('config')
const tokenKey = config.get('tokenKey')


const updateUserProfile = asyncHandler(async (req, res) => {
    console.log(req.body)
    const {first_name, last_name, email, password, contactNo, gender, user_id} = req.body;

    const user = await User.findById(user_id);


    console.log("user: ",user)
    if (user) {
        user.first_name = first_name || user.first_name;
        user.last_name = last_name || user.last_name;
        user.email = email || user.email;
        user.gender = gender || user.gender;
        user.contactNo = contactNo || user.contactNo;
        if (password) {
            user.password = password;
        }

        user.token = jwt.sign({
                first_name: user.first_name,
                last_name: user.last_name,
                gender:user.gender,
                contactNo: user.contactNo,
                email:user.email,
                password: user.password,
                user_id: user._id
            },
            tokenKey,
            {expiresIn: '2h'}
        )
        const updatedUser = await user.save();

        res.json(updatedUser);
    } else {
        res.status(404);
        throw new Error("User Not Found");
    }
});

module.exports = { updateUserProfile}