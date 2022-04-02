const asyncHandler = require('express-async-handler')
const FoundKids = require('../../model/foundKid')
const FoundPets = require('../../model/foundPet')
const MissingKids = require('../../model/missingKid')
const MissingPets = require('../../model/missingPet')
const User = require('../../model/user')

const locationSearchController = asyncHandler ( async (req, res) => {

    const {location, search, userId} = req.body;


    if (search === 'kidsmissing'){
        const user = await getUser( userId)

        if(!user){
            res.status(200).json( { message: 'User Not Found!!!' } )
        }
        else {
           const data = await MissingKids.find({ location: location })
            console.log(data)
        }
    }
    else if(search === 'kidsfound'){
        const user = await getUser( userId)
        if(!user){
            res.status(200).json( { message: 'User Not Found!!!' } )
        }
        else {
            const data = await FoundKids.find({ location: location })
            console.log(data)
        }
    }
    else if(search === 'petsmissing'){
        const user = await getUser( userId)
        if(!user){
            res.status(200).json( { message: 'User Not Found!!!' } )
        }
        else {
            const data = await MissingPets.find({ location: location })
            console.log(data)
        }
    }
    else if(search === 'petsfound'){
        const user = await getUser( userId)
        if(!user){
            res.status(200).json( { message: 'User Not Found!!!' } )
        }
        else {
            const data = await FoundPets.find({ location: location })
            console.log(data)
        }
    }

    console.log(req.body)

})

const getUser = (id) => {
    return User.findOne({ user_id: id })
}
module.exports = {locationSearchController}