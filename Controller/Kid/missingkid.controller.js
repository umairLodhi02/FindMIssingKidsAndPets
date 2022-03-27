const aysncHandler = require('express-async-handler')

const MissingKid = require('../../model/missingKid')

const addMissingKidController = aysncHandler( async (req, res) => {
    const url = req.protocol + '://' + req.get('host')

    const { name, address, reward, age, contactNo, location, user_id } = req.body;

    if(contactNo.length < 11 || contactNo.max > 11){
        res.status(404)
        throw new Error("Contact NO. must be equal to 11 digits")
    }

    console.log(user_id)
    const missingKid = await MissingKid.create( {
        name,
        address,
        reward,
        age,
        contactNo,
        location,
        user_id,
        profileImg: url + '/uploads/' + req.file.filename,
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