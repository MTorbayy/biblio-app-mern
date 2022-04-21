import userModel from '../models/userModel.js'

export const getUsers = async (req, res) => {
    const users = await userModel.find({})
    res.send(users)
    console.log(users) 
}

export const getUser = async (req, res) => {
    const users = await userModel.find({userFirebaseID : req.params.id })
    res.send(users[0])
}

export const addUser = async (req, res) => {
    const user = new userModel(req.body)

    await user.save()
    res.send(user)
}

export const updateUser = async (req, res) => {
     console.log(req.body)
    userModel.updateOne({_id : req.params.id}, req.body)
    .exec()
    .then(console.log('yes'))

    // const user = await userModel.findByIdAndUpdate({_id : req.params.id}, req.body)
    // await user.save()
    // res.send(user)

}