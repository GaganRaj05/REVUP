const express = require('express');
const {handleLogin, handleRegistration, handleLogout} = require("../controller/auth")
const checkLogin = require("../middlewares/checkLogin");
const upload = require("../config/multerConfig");
const handleMulterError = require("../middlewares/handleMulterErrors");

const router = express.Router();

router.post("/login",handleLogin);

router.post("/register",upload,handleMulterError,handleRegistration);

router.post("/logout",handleLogout)

module.exports = router;

