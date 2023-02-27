const mongoose = require("mongoose");


const {ObjectId} = mongoose.Schema;

const userSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: [true, "first name is required"],
        trim: true,
        text: true
    },
    username: {
        type: String,
        required: [true, "username is required"],
        trim: true,
        text: true,
        lowercase: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, "email is required"],
        trim: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],    
    },
    picture: {
        type: String,
        default:"../assets/defaultpic.jpg"
    },
    verified: {
        type: Boolean,
        required: [true, "username is required"],
        default: false
    },
    following:[
        {
            type:ObjectId,
            ref:"User",
        }
    ],
    followers:[
        {
            type:ObjectId,
            ref:"User",
        }
    ],
    likedPosts:[
        {
            type:ObjectId,
            ref:"User",
        }
    ],
    reputationLevel:{
        type: String,
        enum:["Rooket","PathReady","FetchKing", "Bagtect", "PrimeKat", "Supreme-Regent"],
        default: "Rooket"
    },
    reputationNumber:{
        type: String,
        default: "1000"
    },
    search:[
      {
        user:{
            type:ObjectId,
            ref:'User'
        }
      }
    ],
    details: {
        bio:{
            type: String
        },
        github:{
            type: String
        },
        linkdin:{
            type: String
        },
        twitter:{
            type: String
        },
        youtube:{
            type: String
        }
    },
    bookmarkedPost:[
        {
            post:{
                type: ObjectId,
                ref: "Post",
            },
            savedAt:{
                type:Date,
                default: new Date(),
            }
        }
    ],
        
    
}, {
    timestamps:true,
});


module.exports = mongoose.model('User', userSchema)