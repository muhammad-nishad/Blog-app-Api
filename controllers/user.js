const mongoose = require('mongoose')
const userModel = require('../model/user')
const bcrypt = require('bcrypt')

exports.signup = async (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) return res.status(400).json({ message: "plese provide full credentials" })
    try {
        const userExist = await userModel.findOne({ email })
        if (userExist) return res.status(400).json({ message: "A user is existed with this email" })
        const crypted = await bcrypt.hash(password, 10)
        console.log(crypted);
        const user = await new userModel({ name, email, password: crypted }).save()
        console.log(user);
        res.status(200).json({message:'signup success'})
    } catch (error) {
        console.log(error);

    }
}
exports.login=async(req,res)=>{
    const {email,password}=req.body;
    if(!email ||!password)return res.status(400).json({message:'plese provide full credentials'})
    try {
        const validUser=await userModel.findOne({email});
        console.log(validUser,'valid');
        if(!validUser)return res.status(400).json({message:"No user is asociated with this email"})
        const validPassword=await bcrypt.compare(password,validUser.password)
        if(!validPassword)return res.status(400).json({message:'invalid password'})
        console.log(validPassword,'pass');
        res.status(200).json({message:"login success"})
    } catch (error) {
        console.log(error);
        
    }
}

