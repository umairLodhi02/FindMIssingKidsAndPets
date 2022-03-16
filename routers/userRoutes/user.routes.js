const router = require('express').Router()

const auth = require('../../middleware/auth')

const {registerValidation: validReg, registerUserController} = require("../../Controller/User/registerUser.controller")
const {loginValidation: validLog ,loginUserController} = require("../../Controller/User/loginUser.controller")
const {getRegisterUserList} = require('../../Controller/User/getUserList.controller')
const {deleteUserController} = require('../../Controller/User/deleteUser.controller')



router.get('/userlist', auth,  getRegisterUserList )
router.post('/register',
    [
        validReg.first_name, validReg.last_name,
        validReg.password,validReg.email,
        validReg.gender, validReg.contactNo
    ] ,
    registerUserController)

router.post('/login',
    [
        validLog.email,
        validLog.password
    ],
    loginUserController)

router.delete('/deleteuser/:id', deleteUserController)


module.exports = router