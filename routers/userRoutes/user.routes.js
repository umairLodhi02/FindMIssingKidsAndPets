const router = require('express').Router()
const {registerUserController} = require("../../Controller/User/registerUser.controller")
const {loginUserController} = require("../../Controller/User/loginUser.controller")

router.post('/register', registerUserController)
router.post('/login', loginUserController)


module.exports = router