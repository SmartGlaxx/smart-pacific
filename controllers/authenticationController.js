require('dotenv').config()
const User = require("../models/UserModel")

const createUser = async (req, res) => {
    try {
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).json({ response: "Fail", message: 'Email already in use' });
      }
      const user = new User(req.body);
      const users = await User.find({})
      if(users.length == 0){
        user.role = "admin"
      }
      await user.save();
      
      const userValue = { id: user._id, name: user.name, email: user.email, role: user.role}
      
      res.status(200).json({response: "Success", userValue})
    } catch (error) {
      res.status(500).json({ response: "Fail" ,message: 'Internal Server Error' });
    }
  };
  

const signInUser = async(req, res)=>{

  const {email, password} = req.body
  if(!email || !password){
    return res.send({response: "Fail", message:"Please enter email and password"})
  }

  const user = await User.findOne({email})
  if(!user){
    return res.send({response: "Fail", message: "Invalid credentials"})
  }

  const passwordMatch = await user.checkPassword(password)
  if(!passwordMatch){
    return res.send({response: "Fail", message: "Password incorrect"})
  }

  const userValue = {id: user._id, name: user.name, email: user.email, role: user.role}
  res.status(200).json({response: "Success", userValue})

}


module.exports = {createUser, signInUser}