const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();

app.listen((port), () => {
    console.log(`server up and running on port ${port}`);  
})

mongoose.connect(process.env.MONGO_URL, err => {
    if(!err){
        console.log("database connected")
    }else{
        console.log(err);
    }
})