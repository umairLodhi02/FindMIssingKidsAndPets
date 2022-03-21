const aysncHandler = require('express-async-handler')

const MissingKid = require('../../model/missingKid')

const addMissingKidController = aysncHandler( async (req, res) => {

    const { name, address, reward, age, contactNo, location } = req.body;

    if(contactNo.length < 11 || contactNo.max > 11){
        res.status(404)
        throw new Error("Contact NO. must be equal to 11 digits")
    }

    const missingKid = await MissingKid.create( {
        name,
        address,
        reward,
        age,
        contactNo,
        location
    } )

    if(missingKid) {
        res.status(200).json(missingKid);
    }

    else {
        res.status(400);
        throw new Error("Something Went Wrong!!!");
    }

})

module.exports = { addMissingKidController }