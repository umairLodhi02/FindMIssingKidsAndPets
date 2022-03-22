const router = require('express').Router()

const auth = require('../../middleware/auth')

const { addMissingPetController } = require('../../Controller/Pet/missingPet.controller')
const { addFoundPetController } = require('../../Controller/Pet/foundPet.controller')

router.post('/addmissingpet' ,addMissingPetController )
router.post('/addfoundpet' ,addFoundPetController )

module.exports = router