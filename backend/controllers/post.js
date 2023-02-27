const Post = require("../models/Post");

const User = require("../models/User");

exports.createPost = async (req, res) => {
    try {
        const post = await new Post(req.body).save();
        res.json(post);
    } catch (error) {
       return res.status(500).json({ message: error.message });
    }
};

exports.getAllPosts= async (req, res) => {
    try {
        const posts = await Post.find().populate("user", "first_name username picture reputationLevel")
        .sort({createdAt: -1 })
        res.json(posts);
        
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}



exports.getSpecificPost= async (req, res) => {
    try {
        const {specificpost} = req.params;
        const certainPost = await Post.findOne({_id:specificpost})
        .populate("user", "first_name username picture reputationLevel")
        if(!certainPost) { 
          return res.json({ok: false});
        }
        res.json(certainPost)
      } catch (error) {
        return res.json({ok: false});
      }
 }



//  For Liking Post

 exports.likePost = async (req,res)=> {
    try {
       
    
        const sender = await User.findById(req.user.id)
        const postId = await Post.findById(req.params.postid)
  

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


  //Get likers of this post 
  exports.getThisPostLikers = async (req,res)=> {
    try {
      const skip = req.body.skip
      const post = await Post.findOne({_id:req.params.id})
      .select("likes")
      .populate({
        path: 'likes',  
        options: {
          select: 'username first_name picture',
          skip: skip,
          limit: 9,
        }
      })
     

      res.json(post.likes)
    } catch (error) {
      res.status(500).json({message: error.message});
    }
  
  }