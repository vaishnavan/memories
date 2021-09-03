const express = require("express");
const Post = require("../model/post.model");
const router = express.Router();
const cloudinary = require("../utils/clodinary");
const upload = require("../utils/multer");
const auth = require("../middleware/auth");

router.post("/uploadData", auth, upload.single("image"), async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        // console.log(result);
        // console.log(req.body)

        req.user.password = undefined
        req.user.createdAt = undefined
        req.user.updatedAt = undefined

        let postData = new Post({
            title: req.body.title,
            desc: req.body.desc,
            photo: result.secure_url,
            cloudinary_id: result.public_id,
            postedBy:req.user
        })
        await postData.save();
        res.json(postData);
    } catch (error) {
        return  res.status(404).json({message:error.message})
    }
})

router.get("/allpost", auth , async(req, res) => {
    try {
        const myData = await Post.find().populate("postedBy","_id username");
        return res.status(200).json(myData);
    } catch (error) {
        return  res.status(404).json({message:error.message})
    }
})

module.exports = router;