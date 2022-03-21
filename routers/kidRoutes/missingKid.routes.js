const router = require('express').Router()

const auth = require('../../middleware/auth')

const { addMissingKidController } = require('../../Controller/Kid/missingkid.controller')

router.post('/addmissingkid' ,addMissingKidController )

module.exports = router