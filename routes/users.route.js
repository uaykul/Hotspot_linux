const express         = require("express");
const passport        = require("passport");
const router          = express.Router();
const AuthController  = require("../controller/user.controller");

router.post("/login", AuthController.login);
router.post("/register", AuthController.register);
router.get("/profile",passport.authenticate("jwt", {session: false,}),AuthController.profile);

module.exports = router;


