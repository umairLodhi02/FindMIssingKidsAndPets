const User = require('../../model/user')
const asyncHandler = require('express-async-handler')
const jwt = require("jsonwebtoken");
const config = require('config')
const tokenKey = config.get('tokenKey')


const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.body.user_id);

    console.log("user: ",user)
    if (user) {
        user.first_name = req.body.first_name || user.first_name;
        user.last_name = req.body.last_name || user.last_name;
        user.email = req.body.email || user.email;
        user.gender = req.body.gender || user.gender;
        user.contactNo = req.body.contactNo || user.contactNo;
        if (req.body.password) {
            user.password = req.body.password;
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

        res.json({
           updatedUser
        });
    } else {
        res.status(404);
        throw new Error("User Not Found");
    }
});

module.exports = { updateUserProfile}