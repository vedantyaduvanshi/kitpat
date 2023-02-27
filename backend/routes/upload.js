const express = require("express");
const { uploadImages } = require("../controllers/upload");
const {uploadVideo} = require("../controllers/vidUpload");

const { authUser } = require("../middleware/auth");
// const  imageUpload  = require("../middleware/imageUpload");
const router = express.Router();



router.post("/uploadImages",authUser, uploadImages);
router.post("/uploadVideo",authUser, uploadVideo);



module.exports = router;
