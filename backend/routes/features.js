const express = require('express');
const checkAuth = require('../config/checkAuth');
const upload = require("../config/multerConfig");
const {handlePostUploads,handleGettingPosts,handlePostLike} = require("../controller/features")
const {uploadVehicle,getRentalVehicles} = require("../controller/rentFeature")
const {getEvents, uploadEvent} = require("../controller/eventFeature")

const router = express.Router()

router.post("/upload-post",checkAuth,upload.array("image",5),handlePostUploads);
router.get("/posts",handleGettingPosts);
router.patch("/post-like",checkAuth,handlePostLike);
router.post("/upload-vehicle",checkAuth,upload.array("image",5),uploadVehicle);
router.get("/vehicles",getRentalVehicles);
router.post("/upload-event",checkAuth,upload.array("image",5),uploadEvent);
router.get("/events",getEvents);

module.exports = router