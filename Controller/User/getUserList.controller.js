const User = require('../../model/user')

const getRegisterUserList = async (req, res) => {
    try{
        const userList = await User.find({})
        return res.status(200).send({
            success: true,
            data: userList,
            status: 200
        })
    }
    catch (err){
        console.log(err)
        return res.status(500).send({error: err})
    }
}

module.exports = {getRegisterUserList}