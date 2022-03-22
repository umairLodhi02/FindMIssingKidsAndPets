const asyncHandler = require('express-async-handler')
const MissingKid = require('../../model/missingKid')
const MissingPet = require('../../model/missingPet')
const FoundKid = require('../../model/foundKid')
const FoundPet = require('../../model/foundPet')
const GiveFeedback = require('../../model/givefeedback')

const totalComplaintsController = asyncHandler( async (req, res) => {
    const missingkidslist = await MissingKid.find({})
    const missingpetslist = await MissingPet.find({})
    const foundkidslist = await FoundKid.find({})
    const foundpetslist = await FoundPet.find({})

    const totalComplaints = missingkidslist.length + missingpetslist.length
        + foundpetslist.length + foundkidslist.length

    if(totalComplaints) {
        res.status(200).json(totalComplaints)
    }
    else{
        res.status(400);
        throw new Error("Something went Wrong!!!!")
    }
} )


const totalKidsComplaintsController = asyncHandler( async (req, res) => {
    const missingkidslist = await MissingKid.find({})
    const foundkidslist = await FoundKid.find({})

    const totalKidsComplaints = missingkidslist.length + foundkidslist.length


    if(totalKidsComplaints) {
        res.status(200).json(totalKidsComplaints)
    }
    else{
        res.status(400);
        throw new Error("Something went Wrong!!!!")
    }
} )


const totalPetsComplaintsController = asyncHandler( async (req, res) => {
    const missingpetslist = await MissingPet.find({})
    const foundpetslist = await FoundPet.find({})

    const totalPetsComplaints = missingpetslist.length + foundpetslist.length


    if(totalPetsComplaints) {
        res.status(200).json(totalPetsComplaints)
    }
    else{
        res.status(400);
        throw new Error("Something went Wrong!!!!")
    }
} )


const getAllFeedbacksController = asyncHandler( async (req, res) => {

    const feedbacks = await GiveFeedback.find({})

    if(feedbacks){
        res.status(200).json(feedbacks)
    }
    else{
        res.status(400)
        throw new Error("Something went wrong")
    }

})
module.exports = {
    totalComplaintsController ,
    totalKidsComplaintsController,
    totalPetsComplaintsController,
    getAllFeedbacksController
}