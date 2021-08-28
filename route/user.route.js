const router = require("express").Router();
const { userSignup, userSignin, resetPassword, newPassword } = require("../controller/user.controller");

router.post("/signup", userSignup);
router.post("/signin", userSignin);
//reset route
router.post("/resetpass", resetPassword );
//password change
router.post("/newpassword", newPassword);


module.exports = router;