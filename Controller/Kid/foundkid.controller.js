const aysncHandler = require('express-async-handler')

const FoundKid = require('../../model/foundKid')

const addFoundKidController = aysncHandler( async (req, res) => {

    const url = req.protocol + '://' + req.get('host')

    const { name, address, age, contactNo, location, user_id, latitude, longitude } = req.body;

    if(contactNo.length < 11 || contactNo.length > 11){
        res.status(404)
        throw new Error("Contact NO. must be equal to 11 digits")
    }

    const foundKid = await FoundKid.create( {
        name,
        address,
        age,
        contactNo,
        location,
        user_id,
        profileImg: url + '/uploads/' + req.file.filename,
        latitude,
        longitude
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