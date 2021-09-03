const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types

const postSchema = new mongoose.Schema({
    title:{
        type:String,    
    },
    desc:{
        type:String,
    },
    photo:{
        type:String
    },
    cloudinary_id: {
        type: String,
    },
    likes:[{type:ObjectId,ref:"User"}],
    comments:[{
        text:String,
        postedBy:{type:ObjectId,ref:"User"}
    }],
    postedBy:{
       type:ObjectId,
       ref:"User"
    }
},
    {timestamps: true},
)

module.exports = mongoose.model("Post", postSchema);