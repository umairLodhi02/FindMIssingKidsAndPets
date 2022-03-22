const router = require('express').Router()

const auth = require('../../middleware/auth')

const { registerUserController} = require("../../Controller/User/registerUser.controller")
const {loginUserController} = require("../../Controller/User/loginUser.controller")
const {getRegisterUserList} = require('../../Controller/User/getUserList.controller')
const {deleteUserController} = require('../../Controller/User/deleteUser.controller')
const {updateUserProfile} = require('../../Controller/User/updateUser.controller')
const { giveFeedbackController } = require('../../Controller/User/givefeedback.controller')

router.get('/userlist',  getRegisterUserList )
router.post('/register', registerUserController)
router.post('/login', loginUserController)
router.post('/editprofile', updateUserProfile)
router.post('/givefeedback', giveFeedbackController)

router.delete('/deleteuser/:id', deleteUserController)


module.exports = router