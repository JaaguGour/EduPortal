// const express = require('express');
// // const { UploadImages } = require('../controllers/Uploadimages');
// const { uploadcontroller } = require('../controllers/uploadController');
// const router = express.Router();


// router.post("/images",uploadcontroller);



// module.exports = router
const express = require("express");
const router = express.Router();
const { uploadcontroller, getProfileImage } = require("../controllers/uploadController");

// Route for file upload
router.post("/files", uploadcontroller);
router.get("/getImageByStudentId/:userid", getProfileImage);


module.exports = router;


