const express = require('express');
const checkAuth = require('../config/checkAuth');
const upload = require("../config/multerConfig");
const {handlePostUploads,handleGettingPosts,handlePostLike} = require("../controller/features")
const {uploadVehicle,getRentalVehicles} = require("../controller/rentFeature")
const {getEvents, uploadEvent} = require("../controller/eventFeature")

const router = express.Router()

router.post("/upload-post",checkAuth,handlePostUploads);
router.get("/posts",handleGettingPosts);
router.post("/post-like",checkAuth,handlePostLike);
router.post("/upload-vehicle",checkAuth,upload.single("image"),uploadVehicle);
router.get("/vehicles",getRentalVehicles);
router.post("/upload-event",checkAuth,uploadEvent);
router.get("/events",getEvents);

module.exports = router