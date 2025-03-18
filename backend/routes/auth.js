const express = require('express');
const {handleLogin, handleRegistration, handleLogout} = require("../controller/auth")
const router = express.Router();

router.post("/login",handleLogin);

router.post("/register",handleRegistration);

router.post("/logout",handleLogout)

module.exports = router;

