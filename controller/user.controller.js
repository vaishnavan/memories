const express = require("express");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const User = require("../model/user.model");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

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
        return res.status(200).json({message:error.message})
    }
} 

const userSignin = async (req, res) => {
   try {
    const { email, password } = req.body;

    if(!email || !password){
        return res.status(400).json({message:"All the fields are required"});
    }

    const user = await User.findOne({email});
    if(!user) return res.status(400).json({message: "user doesn't exist"});

    const domatch = await bcrypt.compare(password, user.password);
    if(!domatch) return res.status(400).json({message: "password incorrect"})

    if(domatch){
        const token = jwt.sign({_id:user._id}, process.env.JWT_SUSPENSE, {expiresIn:"8h"});

         //email login sccuessfull message
         transport.sendMail({
            to: user.email,
            from: process.env.EMAIL,
            subject: "Logged In Successfully",
            html:`
                <h3>You are Logged In</h3>
                <p>Login experies in one day time interval</p>
            `
        })

        const {_id, username, email} = user
        return res.status(200).json({
            status:200,
            token: token,
            user: {
                _id,
                username,
                email
            }
        })     
    }
   } catch (error) {
       return res.status(404).json({message:error.message});
   }
}

//password reset token generate
const resetPassword = async (req, res) => {
    try {
        crypto.randomBytes(32, async (err, buffer) => {
            if(err){
                console.log(err);
            }
            const token = buffer.toString("hex");
            const user = await User.findOne({email:req.body.email});
            if(!user){
                return res.status(422).json({error:"User don't exists with the email"})
            }
            user.resetToken = token;
            user.expireTime = Date.now() + 3600000
            await user.save()
                transport.sendMail({
                    to:user.email,
                    from:process.env.EMAIL,
                    subject:"password reset",
                    html:`
                        <p>You requested for password reset</p>
                        <h5>click on this <a target="_blank" href="http://localhost:3000/reset/${token}">link</a> to reset password</h5>
                    `
                })
                res.json({message:"check your email"})
        })
    } catch (error) {
        return res.status(404).json({message: error.message})
    }
}

//newpassword 
const newPassword = async (req, res) => {
    try {   
        const newPass = req.body.password;
        const sentToken = req.body.token;
        const user = await User.findOne({resetToken:sentToken, expireTime:{$gt: Date.now()}});
        if(!user){
            return res.status(422).json({message:"try again"})
        }
        const hashpass = await bcrypt.hash(newPass,12)
        user.password = hashpass
        user.resetToken = undefined
        user.expireTime = undefined
        await user.save()
        transport.sendMail({
            to:user.email,
            from:process.env.EMAIL,
            subject:"password reset Successfull",
            html:`
                <p>Password updated successfully</p>
            `
        })
        return res.status(200).json({message:"password updated successfully"});
        
    } catch (error) {
        return res.status(404).json({message: error.message})
    }
}



module.exports = {
    userSignup,
    userSignin,
    resetPassword,
    newPassword
}