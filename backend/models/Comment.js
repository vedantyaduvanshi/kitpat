const mongoose = require("mongoose");


const {ObjectId} = mongoose.Schema;



const commentSchema = new mongoose.Schema({
  type:{
    type:String,
    enum: ["profilePicture", "cover", null],
    default: null,
  },
  text: {
    type: String,
  },
  images: {
    type: Array,
  },
  video: {
    type: Array,
  },
  user: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  postID: {
    type: ObjectId,
    required: true,
  },
  checkReplyNumber: {
    type: Boolean,
    default: false
},
  likes:[
    {
        type:ObjectId,
        ref:"User",
    }
  ],
  replyingto: {
    type: Array,
  },
  comments:[
    {
        type:ObjectId,
        ref:"Comment",
    }
],

}, {
    timestamps: true,
});



module.exports = mongoose.model("Comment", commentSchema);