const express = require("express");
const { createPost,getAllPosts,getSpecificPost,likePost, getThisPostLikers } = require("../controllers/post");
const { authUser } = require("../middleware/auth");
const router = express.Router();



router.post("/createPost",authUser, createPost);
router.get("/getAllPosts",authUser, getAllPosts);
router.get("/getSpecificPost/:specificpost",authUser, getSpecificPost);
router.put("/likepost/:postid",authUser,likePost);
router.put("/getThisPostLikers/:id",authUser, getThisPostLikers);


module.exports = router;
