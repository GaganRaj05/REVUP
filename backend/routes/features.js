const express = require('express');
const checkAuth = require('../middlewares/checkAuth');
const {handlePostUploads,handleGettingPosts,handlePostLike, handleDeletingPosts, handleFollowRequest, handleUnfollowRequest} = require("../controller/features")
const {uploadVehicle,getRentalVehicles, handleDeletingVehicles} = require("../controller/rentFeature")
const {getEvents, uploadEvent,handleDeletingEvents} = require("../controller/eventFeature")
const upload = require("../config/multerConfig");
const getProfile = require("../controller/profiles");
const handleMulterError = require("../middlewares/handleMulterErrors");
const router = express.Router()

router.post("/upload-post",checkAuth,upload,handleMulterError,handlePostUploads);
router.get("/posts",handleGettingPosts);
router.patch("/post-like",checkAuth,handlePostLike);
router.post("/upload-vehicle",checkAuth,upload,handleMulterError,uploadVehicle);
router.get("/vehicles",getRentalVehicles);
router.post("/upload-event",checkAuth,upload,handleMulterError,uploadEvent);
router.get("/events",getEvents);
router.get("/profile-info", getProfile);
router.delete("/delete-post",handleDeletingPosts);
router.delete("/delete-event",handleDeletingEvents);
router.delete("/delete-vehicle",handleDeletingVehicles);
router.post("/follow-request",checkAuth,handleFollowRequest);
router.post("/unfollow-request",checkAuth,handleUnfollowRequest);
module.exports = router