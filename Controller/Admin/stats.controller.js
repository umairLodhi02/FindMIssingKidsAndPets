const asyncHandler = require('express-async-handler')
const MissingKid = require('../../model/missingKid')
const MissingPet = require('../../model/missingPet')
const FoundKid = require('../../model/foundKid')
const FoundPet = require('../../model/foundPet')
const GiveFeedback = require('../../model/givefeedback')
const User = require('../../model/user')
const totalComplaintsController = asyncHandler( async (req, res) => {
    const missingkidslist = await MissingKid.find({})
    const missingpetslist = await MissingPet.find({})
    const foundkidslist = await FoundKid.find({})
    const foundpetslist = await FoundPet.find({})

    const totalComplaints = missingkidslist.length + missingpetslist.length
        + foundpetslist.length + foundkidslist.length

    if(totalComplaints) {
        res.status(200).json({
            TotalComplaints: totalComplaints,
            MissingKidsList: missingkidslist,
            FoundKidsList: foundkidslist,
            MissingPetsList: missingpetslist,
            FoundPetsList: foundpetslist
        })
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
        res.status(200).json(
            {
                TotalKidsComplaints: totalKidsComplaints,
                MissingKidsList: missingkidslist,
                FoundKidsList: foundkidslist
            }
        )
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
        res.status(200).json(
            {
                TotalPetsComplaints: totalPetsComplaints,
                MissingPetsList: missingpetslist,
                FoundPetsList: foundpetslist
            }
            )
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
    else if(feedbacks.length === 0){
        res.status(200).json({
            "Message": "Theres is no data to show"
        })
    }

    else{
        res.status(400)
        throw new Error("Something went wrong")
    }

})

const deleteUserController = asyncHandler( async (req, res) => {
    console.log(req.params.id)
    const user = await User.find({_id: req.params.id})

    console.log(user)
    if (user){
        User.findOneAndRemove({ _id: req.params.id} ,
            function(err, member) {
                if (!err && member) {
                    console.log(member);
                    console.log("member successfully deleted")
                }
                else {
                    console.log("error")
                }}
            )
        res.status(200).json(user)
    }
    else{
        res.status(404)
        throw new Error('Some thing went wrong!!!')
    }
})
module.exports = {
    totalComplaintsController ,
    totalKidsComplaintsController,
    totalPetsComplaintsController,
    getAllFeedbacksController,
    deleteUserController
}