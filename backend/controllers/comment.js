const Post = require("../models/Post");

const User = require("../models/User");

const Comment = require("../models/Comment");

exports.createComment = async (req, res) => {
    try {
     const post = await new Comment(req.body).save();
     if (req.body.checkReplyNumber === true) {
      const findPost = await Post.findById(req.body.postID);
      await findPost.updateOne({
         $push: {comments: post._id}
       })
     }else if(req.body.checkReplyNumber === false){
      const findPost = await Comment.findById(req.body.postID);
      await findPost.updateOne({
         $push: {comments: post._id}
       })
     }
      res.json(post);
    } catch (error) {
       return res.status(500).json({ message: error.message });
    }
};  





exports.gettingComments = async (req, res) => {
   try {
      const replies = await Comment.find({postID:req.body.postId}).populate("user").sort({createdAt: -1 });
      res.json(replies)
   } catch (error) {
      return res.status(500).json({ message: error.message });
   }
};  





exports.specificComment = async (req, res) => {
   try {
      const {specificcomment} = req.params;
      const certainComment = await Comment.findById(specificcomment)
      .populate("user", "first_name username picture reputationLevel")
      var finalresult = [];
      let i = certainComment
      while (i.checkReplyNumber === false) {
         const newcomment = await Comment.findById(i.postID).populate("user", "first_name username picture reputationLevel")
         finalresult.push(newcomment);
         i = newcomment
      }
      const mainPostWas = await Post.findById(i.postID).populate("user", "first_name username picture reputationLevel")
      res.json({certainComment,finalresult,mainPostWas})
   } catch (error) {
      return res.status(500).json({ message: error.message });
   }
};  



//  For Liking Comment

exports.likeComment = async (req,res)=> {
   try {
      
   
       const sender = await User.findById(req.user.id)
       const postId = await Comment.findById(req.params.postid)
 

       if(
         postId.likes.includes(sender._id) &&
         sender.likedPosts.includes(postId._id) 
         ){
         await postId.updateOne({
           $pull: {likes: sender._id}
         })
         await sender.updateOne({
           $pull: {likedPosts: postId._id}
         })
         res.json({message:"Unliked"})
       }else if
       (
           !postId.likes.includes(sender._id) &&
           !sender.likedPosts.includes(postId._id) 
       )
       {
           await postId.updateOne({
               $push: {likes: sender._id}
             })
             await sender.updateOne({
               $push: {likedPosts: postId._id}
             })
           res.json({message:"Liked"}) 
        
       }else{
           return res.status(400).json({message: "Error"});
       }
      
 

     
   } catch (error) {
     res.status(500).json({message: error.message});
   }
 
 }