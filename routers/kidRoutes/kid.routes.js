const router = require('express').Router()

const auth = require('../../middleware/auth')

const { addMissingKidController } = require('../../Controller/Kid/missingkid.controller')
const { addFoundKidController } = require('../../Controller/Kid/foundkid.controller')

router.post('/addmissingkid' ,addMissingKidController )
router.post('/addfoundkid' ,addFoundKidController )

module.exports = router