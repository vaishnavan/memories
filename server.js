const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const auth = require("./middleware/auth");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();

//heroku cmd git push heroku HEAD:main

//middleware
app.use(cors());
app.use(express.json());


//routes
app.use("/auth/api", require("./route/user.route"));


app.listen((port), () => {
    console.log(`server up and running on port ${port}`);  
})

app.use("/", (req, res) => {
    res.json({message:"Memories API creation"})
})

mongoose.connect(process.env.MONGO_URL, err => {
    if(!err){
        console.log("database connected successfully")
    }else{
        console.log(err);
    }
})