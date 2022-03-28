const FoundPet = require('../../model/foundPet')

const aysncHandler = require('express-async-handler')


const addFoundPetController = aysncHandler( async (req, res) => {

    const url = req.protocol + '://' + req.get('host')

    const { mc_id, address, breed, contactNo, location, user_id } = req.body;

    if(contactNo.length < 11 || contactNo.max > 11){
        res.status(404)
        throw new Error("Contact NO. must be equal to 11 digits")
    }

    console.log(user_id)
    const foundPet = await FoundPet.create( {
        mc_id,
        address,
        breed,
        contactNo,
        location,
        user_id,
        profileImg: url + '/uploads/' + req.file.filename,
    } )

    if(foundPet) {
        res.status(200).json(foundPet);
    }

    else {
        res.status(400);
        throw new Error("Something Went Wrong!!!");
    }

})

module.exports = { addFoundPetController }