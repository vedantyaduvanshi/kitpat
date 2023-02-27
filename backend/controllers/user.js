const { validateEmail, validateLength } = require("../helpers/validation");
const User = require("../models/User");
const Post = require("../models/Post");
const Code = require("../models/Code");
const jwt = require("jsonwebtoken");
const { sendVerificationEmail, sendResetCode } = require("../helpers/mailer");
const bcrypt = require("bcrypt");
const { generateToken } = require("../helpers/token");
const generateCode  = require("../helpers/generateCode");
const { ProfilingLevel } = require("mongodb");
const { default: mongoose } = require("mongoose");
exports.register = async (req, res) => {
  try {
    const { first_name, username, email, password } = req.body;

    const checkemail = await User.findOne({ email });
    const checkusername = await User.findOne({ username });

    if (!validateEmail(email)) {
      return res.status(400).json({
        message: "Invalid Email Address.",
      });
    } else if (checkemail) {
      return res.status(400).json({
        message: "Email Address already in use.",
      });
    } else if (!validateLength(first_name, 4, 22)) {
      return res.status(400).json({
        message: "Name must contain 4-22 characters.",
      });
    } else if (!validateLength(username, 4, 13)) {
      return res.status(400).json({
        message: "Username must contain 4-13 characters.",
      });
    } else if (checkusername) {
      return res.status(400).json({
        message: "Username not unique, try another one.",
      });
    } else if (!validateLength(password, 9, 45)) {
      return res.status(400).json({
        message: "Password must be atleast 9 characters",
      });
    } else {
      const cryptedPassword = await bcrypt.hash(password, 12);
      const user = await new User({
        first_name,
        username,
        email,
        password: cryptedPassword,
      }).save();
      const emailVerificationToken = generateToken(
        { id: user._id.toString() },
        "30m"
      );
      const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
      sendVerificationEmail(user.email, user.first_name, url);
      const token = generateToken({ id: user._id.toString() }, "5d");
      res.send({
        id: user._id,
        email: user.email,
        createdAt: user.createdAt,
        username: user.username,
        picture: user.picture,
        first_name: user.first_name,
        token: token,
        verified: user.verified,
        message: "Done! Please check your inbox to activate your account.",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.activateAccount = async (req, res) => {
  try {
    const validUser = req.user.id;
    const { token } = req.body;
    const user = jwt.verify(token, process.env.TOKEN_SECRET);
    const checkverification = await User.findById(user.id);

    if(validUser !== user.id){
      return res
      .status(400)
      .json({ message: "Operation denied!" });
    }
    if (checkverification.verified == true) {
      return res
        .status(400)
        .json({ message: "This account is already activated." });
    } else {
      await User.findByIdAndUpdate(user.id, { verified: true });
      return res
        .status(200)
        .json({ message: "You have successfully verified your account." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
   const {email, password} = req.body;
   const user = await User.findOne({email});
   if(!user){
    return res.status(400).json({message:"Email address not registered."});
   } 
   const checkPasswordCorrectorNot = await bcrypt.compare(password, user.password);
   if(!checkPasswordCorrectorNot){
    return res.status(400).json({message:"Incorrect email or password."});
   }
   const token = generateToken({ id: user._id.toString() }, "7d");
   res.send({
     id: user._id,
     email: user.email,
     createdAt: user.createdAt,
     username: user.username,
     picture: user.picture,
     first_name: user.first_name,
     token: token,
     verified: user.verified,
   });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.resendVerification= async(req,res)=>{
   try {
    const id= req.user.id;
    const user = await User.findById(id);
    if(user.verified === true){
      return res.status(400).json({message:"This account is already activated."});
    }
    const emailVerificationToken = generateToken(
      { id: user._id.toString() },
      "60m"
    );
    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    sendVerificationEmail(user.email, user.first_name, url);
    return res.status(200).json({message:"Verification link sent."});
   } catch (error) {
    res.status(500).json({ message: error.message });
   }
}


exports.checkifverfied= async(req,res)=>{
  try {
   const id= req.user.id;
   const user = await User.findById(id);
   if(user.verified === true){
     return res.status(200).json({message:true});
   }
   if(user.verified === false){
    return res.status(200).json({message:false});
  }
  } catch (error) {
   res.status(500).json({ message: error.message });
  }
}


exports.recoverAcc= async (req,res)=>{
   try {
     const {email} = req.body;
     const user = await User.findOne({email}).select("-password"); 
     if (!user){
      return res.status(400).json({message:"Account doesn't exist."});
     }else{
      await Code.findOneAndRemove({user:user._id})
      const code = generateCode(5);
      const savedCode = await new Code({
       code,
       user:user._id,
      }).save();
      sendResetCode(user.email,user.first_name, code);
     }
     return res.status(200).json({
      message: "Account Recovery mail sent."
     })
   } catch (error) {
    res.status(500).json({ message: error.message });
   }
}

exports.validateResetCode = async (req,res)=>{
 
  try {
    const {email, code} = req.body;
    const user = await User.findOne({email});
    const Dbcode = await Code.findOne({user:user._id});
    if(Dbcode.code !== code){
    return res.status(400).json({message:"Incorrect Recovery Code."});
    }
    return res.status(200).json({message:"Success"});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


exports.changePass = async (req,res)=>{
 
  try {
   const {email,password} = req.body;

   const cryptedPassword = await bcrypt.hash(password,12);
   await User.findOneAndUpdate(
    {email}, 
    {
    password: cryptedPassword,
    }
   );
   return res.status(200).json({message:"Success"})

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


exports.getProfile = async (req,res)=>{
  try {
    const {username} = req.params;
    const user = await User.findById(req.user.id)
    const profile = await User.findOne({username}).select("-password");
    const followingorNot = {
      following: false
    }
    const followingBackorNot = {
      followingBack: false
    }
    if(!profile){
      return res.json({ok: false});
    }


   if(user.following.includes(profile._id) &&
      profile.followers.includes(user._id)
   ) {
    followingorNot.following = true;
   }


   if(user.followers.includes(profile._id) &&
   profile.following.includes(user._id)
   ) {
  followingBackorNot.followingBack = true;
   }
   
    const posts = await Post.find({user:profile._id}).populate("user").sort({createdAt: -1 });
    
    res.json({ ...profile.toObject(),posts, followingorNot,followingBackorNot })
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

exports.updateProfilePicture = async (req,res)=>{
  try {
    const {url} = req.body;

     await User.findByIdAndUpdate(req.user.id, {
      picture: url,
    })
     res.json(url)
  } catch (error) {
    res.status(500).json({message: error.message});
  }

}


exports.updatedetails = async (req,res)=> {
  try {
    const {Infos} = req.body;
    const NewName = req.body.NewName.name;
    const updated = await User.findByIdAndUpdate(req.user.id, {
      details: Infos,
      first_name: NewName,
    },
    {
      new: true,
    });
    res.json(updated.details);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}


exports.followUser = async (req,res)=> {
  try {
    if(req.user.id !== req.params.id){
      const sender = await User.findById(req.user.id)
      const receiver = await User.findById(req.params.id)

      if(
        !receiver.followers.includes(sender._id) &&
        !sender.following.includes(receiver._id) 
        ){
        await receiver.updateOne({
          $push: {followers: sender._id}
        })
        await sender.updateOne({
          $push: {following: receiver._id}
        })
        res.json({message:"Followed"})
      }else{
        return res.status(400).json({message: "You already follow."});
      }
      

    }else{
      return res.status(400).json({message: "Wait, no you cannot do that!"});
    }
    
  } catch (error) {
    res.status(500).json({message: error.message});
  }

}



exports.unfollowUser = async (req,res)=> {
  try {
    if(req.user.id !== req.params.id){
      const sender = await User.findById(req.user.id)
      const receiver = await User.findById(req.params.id)

      if(
        receiver.followers.includes(sender._id) &&
        sender.following.includes(receiver._id) 
        ){
        await receiver.updateOne({
          $pull: {followers: sender._id}
        })
        await sender.updateOne({
          $pull: {following: receiver._id}
        })
        res.json({message:"Unfollowed"})
      }else{
        return res.status(400).json({message: "You already follow."});
      }
      

    }else{
      return res.status(400).json({message: "Wait, no you cannot do that!"});
    }
    
  } catch (error) {
    res.status(500).json({message: error.message});
  }

}





exports.getFollowersList = async (req,res)=> {
  try {
    const skip = req.body.skip
    const profile = await User.findById(req.params.id)
    .select("followers")
    .populate({
      path: 'followers',  
      options: {
        select: 'username first_name picture',
        skip: skip,
        limit: 9,
      }
    })
   


    res.json(profile.followers)
  } catch (error) {
    res.status(500).json({message: error.message});
  }

}


exports.getFollowingList =  async (req,res)=> {
  try {
    const skip = req.body.skip
    const profile = await User.findById(req.params.id)
    .select("following")
    .populate({
      path: 'following',  
      options: {
        select: 'username first_name picture',
        skip: skip,
        limit: 9,
      }
    })
   

    res.json(profile.following)
    
  } catch (error) {
    res.status(500).json({message: error.message});
  }

}





exports.getUsersFollowersList = async (req,res)=> {
 try {
  const sender = await User.findById(req.user.id).select("followers")
  res.json(sender)
 } catch (error) {
  res.status(500).json({message: error.message});
 }

}


exports.getUsersFollowingList = async (req,res)=> {
  try {
   const sender = await User.findById(req.user.id).select("following")
   res.json(sender)
  } catch (error) {
   res.status(500).json({message: error.message});
  }
 
 }





 exports.getUsersLikedPosts = async (req,res)=> {
  try {
   const sender = await User.findById(req.user.id).select("likedPosts")
   res.json(sender)
  } catch (error) {
   res.status(500).json({message: error.message});
  }
 
 }




 exports.getProfileLikedPostPopulated = async (req,res)=> {
  try {
    const skip = req.body.skip
    const profile = await User.findById(req.params.id)
  .populate({
      path: 'likedPosts',
      model: 'Post',
      options: {
        skip: skip,
        limit: 9,
      },
      populate: {
        path: 'user'
      }
  })
  // const posts = await Post.find({user:profile._id}).populate("user").sort({createdAt: -1 });
 
  // const profile2 = profile.likedPosts.populate("user")
    res.json(profile.likedPosts ) 
   
  } catch (error) {
    res.status(500).json({message: error.message});
  }

}