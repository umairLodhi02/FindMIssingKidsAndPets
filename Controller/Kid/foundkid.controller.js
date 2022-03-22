const aysncHandler = require('express-async-handler')

const FoundKid = require('../../model/foundKid')

const addFoundKidController = aysncHandler( async (req, res) => {

    const { name, address, age, contactNo, location, user_id } = req.body;

    if(contactNo.length < 11 || contactNo.max > 11){
        res.status(404)
        throw new Error("Contact NO. must be equal to 11 digits")
    }

    console.log(user_id)
    const foundKid = await FoundKid.create( {
        name,
        address,
        age,
        contactNo,
        location,
        user_id
    } )

    if(foundKid) {
        res.status(200).json(foundKid);
    }

    else {
        res.status(400);
        throw new Error("Something Went Wrong!!!");
    }

})

module.exports = { addFoundKidController }