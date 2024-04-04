const User = require("../models/UserModel")

const getUsers = async(req, res)=>{
    const users = await User.find({role: "user"}).select('-password')
    res.status(200).json({response: "Success", users})
}

const getAUser = async(req, res)=>{
    const {id} =  req.params
    const user = await User.findOne({_id:id}).select("-password")
    if(!user){
        return res.send(404).json({response: "Fail", message:"User not found"})
    }
    res.status(200).send({response: "Success", user})
}


const updateUser = async(req, res)=>{
    const {id, firstname, lastname, email} = req.body
    if(!firstname || !lastname || !email){
        return res.status(400).json({response: "Fail", message: "Plesae provide name and email"})
    }
    const user = await User.findOneAndUpdate({_id : id},{
        email, firstname, lastname
    }, {new : true, runValidators: true})
    if(!user){
        return res.status(404).json({response: "Fail", message: "User not found"})
    }else{
        return res.status(200).json({response: "Success", message: "User updated"})    
    }
    
}


module.exports = {getUsers, getAUser, updateUser}