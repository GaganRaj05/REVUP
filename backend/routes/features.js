const express = require('express');
const checkAuth = require('../middlewares/checkAuth');
const {handlePostUploads,handleGettingPosts,handlePostLike} = require("../controller/features")
const {uploadVehicle,getRentalVehicles} = require("../controller/rentFeature")
const {getEvents, uploadEvent} = require("../controller/eventFeature")
const upload = require("../config/multerConfig");
const handleMulterError = require("../middlewares/handleMulterErrors");
const router = express.Router()

router.post("/upload-post",checkAuth,upload,handleMulterError,handlePostUploads);
router.get("/posts",handleGettingPosts);
router.patch("/post-like",checkAuth,handlePostLike);
router.post("/upload-vehicle",checkAuth,upload,handleMulterError,uploadVehicle);
router.get("/vehicles",getRentalVehicles);
router.post("/upload-event",checkAuth,upload,handleMulterError,uploadEvent);
router.get("/events",getEvents);

module.exports = router