const express = require("express");
const { register,
    activateAccount,
    login,
     auth,
     resendVerification,
     checkifverfied,
     recoverAcc,
     validateResetCode,
     changePass,
     getProfile,
     updatedetails,
     updateProfilePicture,
     followUser,
     unfollowUser,
     getFollowersList,
     getFollowingList,
     getUsersFollowersList,
     getUsersFollowingList,
     getUsersLikedPosts,
     getProfileLikedPostPopulated} = require("../controllers/user");
const { authUser } = require("../middleware/auth");
const router = express.Router();



router.post("/register", register);
router.post("/activate",authUser, activateAccount);
router.post("/login", login);
router.post("/resendVerification",authUser, resendVerification);
router.post("/checkifverfied",authUser, checkifverfied);
router.post("/recoverAcc", recoverAcc);
router.post("/validateResetCode", validateResetCode);
router.post("/changePass", changePass);
router.get("/getProfile/:username",authUser, getProfile);
router.put("/updateProfilePicture",authUser, updateProfilePicture);
router.put("/updatedetails",authUser, updatedetails);
router.put("/followUser/:id",authUser, followUser);
router.put("/unfollowUser/:id",authUser, unfollowUser);
router.put("/getFollowersList/:id",authUser, getFollowersList);
router.put("/getFollowingList/:id",authUser, getFollowingList);
router.get("/getUsersFollowersList",authUser, getUsersFollowersList);
router.get("/getUsersFollowingList",authUser, getUsersFollowingList);
router.get("/getUsersLikedPosts",authUser, getUsersLikedPosts);
router.put("/getProfileLikedPostsforShowcase/:id",authUser, getProfileLikedPostPopulated);



module.exports = router;
