const FoundKid = require('../../model/foundKid')
const MissingKid = require('../../model/missingKid')
const FoundPet = require('../../model/foundPet')
const MissingPet = require('../../model/missingPet')
const asyncHandler = require('express-async-handler')


const getPostsController = asyncHandler(async (req, res) => {

    console.log('user id: ', req.params.id)

    const missingkidslist = await MissingKid.find({user_id: req.params.id})
    const missingpetslist = await MissingPet.find({user_id: req.params.id})
    const foundkidslist = await FoundKid.find({user_id: req.params.id})
    const foundpetslist = await FoundPet.find({user_id: req.params.id})

    const emptyListsMessages = {
        missingkidsmessage: '',
        foundkidsmessage: '',
        missingpetsmessage: '',
        foundpetsmessage: ''
    }


    if (missingkidslist.length === 0) {
        emptyListsMessages.missingkidsmessage = "List Empty"
    }
    if (foundkidslist.length === 0) {
        emptyListsMessages.foundkidsmessage = "List Empty"
    }
    if (missingpetslist.length === 0) {
        emptyListsMessages.missingpetsmessage = "List Empty"
    }
    if (foundpetslist.length === 0) {
        emptyListsMessages.foundpetsmessage = "List Empty"
    }
    if (missingkidslist.length !== 0 ||
        foundkidslist.length !== 0 ||
        missingpetslist.length !== 0 ||
        foundpetslist.length !== 0 ||
        emptyListsMessages) {

        console.log(emptyListsMessages)
        res.status(200).json({
            MissingKidsList: missingkidslist,
            FoundKidsList: foundkidslist,
            MissingPetsList: missingpetslist,
            FoundPetsList: foundpetslist,
            EmptyListsMessages: emptyListsMessages
        })
    }
    else{
        res.status(400)
        throw new Error('Something went wrong!!!!')
    }
})

module.exports = {getPostsController}