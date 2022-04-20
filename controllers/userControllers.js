import userModel from '../models/userModel.js'

export const getHomePage = async (req, res) => {
    
    console.log('Homepage')
    
    const users = await userModel.find({})
    res.send(users)
    console.log(users) 
}

export const addUser = async (req, res) => {
    console.log('coucou')
    const user = new userModel(req.body)

    await user.save()
    res.send(user)
}