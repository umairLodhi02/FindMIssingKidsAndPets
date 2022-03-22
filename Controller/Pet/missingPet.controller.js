const aysncHandler = require('express-async-handler')

const MissingPet = require('../../model/missingPet')

const addMissingPetController = aysncHandler( async (req, res) => {

    const { mc_id, address, reward, breed, contactNo, location, user_id } = req.body;

    if(contactNo.length < 11 || contactNo.max > 11){
        res.status(404)
        throw new Error("Contact NO. must be equal to 11 digits")
    }

    console.log(user_id)
    const missingPet = await MissingPet.create( {
        mc_id,
        address,
        reward,
        breed,
        contactNo,
        location,
        user_id
    } )

    if(missingPet) {
        res.status(200).json(missingPet);
    }

    else {
        res.status(400);
        throw new Error("Something Went Wrong!!!");
    }

})

module.exports = { addMissingPetController }