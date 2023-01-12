const mongoose = require('mongoose')
const userModel = require('../model/user')
const bcrypt = require('bcrypt')
const validator = require('email-validator')

exports.signup = async (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) return res.status(400).json({ message: "plese provide full credentials" })
    try {
        const emailvalidation = validator.validate(email)
        if (!emailvalidation) return res.status(400).json({ message: "plese enter a valid email address" })
        const userExist = await userModel.findOne({ email })
        if (userExist) return res.status(400).json({ message: "A user is existed with this email" })
        const crypted = await bcrypt.hash(password, 10)
        const user = await new userModel({ name, email, password: crypted }).save()
        res.status(200).json({ message: 'signup success' })
    } catch (error) {
        console.log(error);

    }
}
exports.login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'plese provide full credentials' })
    try {
        const emailvalidation = validator.validate(email)
        if (!emailvalidation) return res.status(400).json({ message: "plese enter a valid email address" })
        const validUser = await userModel.findOne({ email });
        console.log(validUser, 'valid');
        if (!validUser) return res.status(400).json({ message: "No user is asociated with this email" })
        const validPassword = await bcrypt.compare(password, validUser.password)
        if (!validPassword) return res.status(400).json({ message: 'invalid password' })
        res.status(200).json({ message: "login success" })
    } catch (error) {
        console.log(error);

    }
}

