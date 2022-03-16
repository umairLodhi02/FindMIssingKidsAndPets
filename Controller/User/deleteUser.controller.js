const User = require('../../model/user')

const deleteUserController = async (req, res) => {
    try {
        const id = await User.findOneAndDelete({ _id: req.params.id })
        console.log("adsjf", id)
        return res.status(200).json({ success: true, message: "User has been deleted", status: 200 })

    } catch (err) {
        console.log(err)
        return res.status(400).json({ msg: err.message })
    }
}

module.exports = {deleteUserController}
