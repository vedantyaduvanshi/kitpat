const express = require("express");
const { createComment,gettingComments, specificComment,likeComment} = require("../controllers/comment");
const { authUser } = require("../middleware/auth");
const router = express.Router();



router.post("/createcomment",authUser, createComment);
router.put("/gettingcomments",authUser, gettingComments);
router.get("/comment/:specificcomment",authUser, specificComment);
router.put("/likeComment/:postid",authUser,likeComment);
module.exports = router;