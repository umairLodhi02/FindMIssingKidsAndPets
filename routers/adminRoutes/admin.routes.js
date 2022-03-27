const router = require('express').Router()


const {
    totalComplaintsController,
    totalKidsComplaintsController,
    totalPetsComplaintsController,
    getAllFeedbacksController,
    deleteUserController

} = require('../../Controller/Admin/stats.controller')


router.get('/totalcomplaints', totalComplaintsController)
router.get('/totalkidscomplaints', totalKidsComplaintsController)
router.get('/totalpetscomplaints', totalPetsComplaintsController)
router.get('/allfeedbacks', getAllFeedbacksController)
router.delete('/deleteuser/:id', deleteUserController)

// router.get('/totalpendingcomplaint')
// router.get('/totalmissingcomplaint')

module.exports = router