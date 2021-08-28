const express = require("express");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const User = require("../model/user.model");

//creating a transporter
const transport = nodemailer.createTransport({
    host:"in-v3.mailjet.com",
    port: 587,
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
    }
});


const userSignup = async (req, res) => {
    try {
        const {username, password, email} = req.body;

        if(!email || !username || !password){
            return res.status(400).json({message:"All the fields are required"});
        }
    
        const user = await User.findOne({email}) 
        if(user) return res.status(400).json({message:"User already exists"});

        //email validation check
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!re.test(email)) return res.status(422).json({message:"Invalid E-mail"});

        if(password.length < 4) return res.status(400).json({message:"password length should more than 4 characters"})

        const hashpass = await bcrypt.hash(password, 10);
        const saveUser = new User({
            username,
            email,
            password: hashpass
        })
        await saveUser.save();

        transport.sendMail({
            to:email,
            from:process.env.EMAIL,
            subject: "Signup successfully - Have a great day",
            html:`
                <h3>Welcome, ${username}</h3>
                <p>You are successfully created a account</p>
            `
        })

        return res.status(200).json({
            status:200,
            data:saveUser
        })

    } catch (error) {
        return res.status(200).json(error)
    }
} 

module.exports = {
    userSignup
}