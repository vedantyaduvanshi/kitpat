const mongoose = require("mongoose");


const {ObjectId} = mongoose.Schema;



const postSchema = new mongoose.Schema({
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
  replyCheck: {
    type: Boolean,
    default: false
},
  user: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  likes:[
    {
        type:ObjectId,
        ref:"User",
    }
  ],

  comments: [
    {
      type: Array,
  }
  ],

}, {
    timestamps: true,
});



module.exports = mongoose.model("Post", postSchema);