const router = require("express").Router();
const { userSignup } = require("../controller/user.controller");

router.post("/signup", userSignup)


module.exports = router;