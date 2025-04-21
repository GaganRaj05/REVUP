const express = require('express');
const {handleLogin, handleRegistration, handleLogout,checkAuth} = require("../controller/auth")
const upload = require("../config/multerConfig");
const handleMulterError = require("../middlewares/handleMulterErrors");

const router = express.Router();

router.get("/check-login",checkAuth);

router.post("/login",handleLogin);

router.post("/register",upload,handleMulterError,handleRegistration);

router.post("/logout",handleLogout)

module.exports = router;

