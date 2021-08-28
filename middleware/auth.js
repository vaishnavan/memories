const User = require("../model/user.model");
//jsonwebtoken pkg impl
const jwt = require("jsonwebtoken");

//exporting auth
module.exports = (req, res, next) => {

    //getting authorization from headers
    const { authorization } = req.headers
    if(!authorization){
        return res.status(404).json({message:"you must be logged in"});
    }
    else{
        //getting accesstoken
        const accesstoken = authorization.replace("Bearer ","")
        //verifying the accesstoken
        jwt.verify(accesstoken, process.env.JWT_SUSPENSE, (err, payload) => {
            if(err){
                return res.status(404).json({message:"you must be logged in"});
            }else{
                const {_id} = payload;
                User.findOne({_id})
                .then((userData) => {
                    req.user = userData,
                    next();
                })
            }
        })
    }

}