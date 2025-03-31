const express = require('express');
const {handleLogin, handleRegistration, handleLogout} = require("../controller/auth")
const checkLogin = require("../middlewares/checkLogin")
const upload = require("../config/multerConfig")
const router = express.Router();

router.post("/login",checkLogin,handleLogin);

router.post("/register",upload.single("image"),handleRegistration);

router.post("/logout",handleLogout)

module.exports = router;

