const fs = require("fs");

//S3 setup
const aws = require("aws-sdk");
const s3 = new aws.S3({
    endpoint: process.env.S3_SPACEENDPOINT_KEY,
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRETACCESS_KEY,
  });



  exports.uploadImages = async(req, res) =>{
  try {

    let files = Object.values(req.files).flat();
    if (
      !req.files || 
      Object.values(req.files).flat().length === 0 ||
      Object.values(req.files).flat().length > 4 
      ) 
      {
       files.forEach((file) => {
        removeTmp(file.tempFilePath);
      })
      return res.status(400).json("Invalid Files Selected");
    }else{
      files.forEach((file) => {
        if (
          file.mimetype !== "image/jpeg" &&
          file.mimetype !== "image/png" &&
          file.mimetype !== "image/gif" &&
          file.mimetype !== "image/webp"
        ) {
          removeTmp(file.tempFilePath);
          return res.status(400).json("Unsupported format.");
        }else if (file.size > 1024 * 1024 * 5) {
          removeTmp(file.tempFilePath);
          return res.status(400).json("File too large. Max: 5mb");
        }
      })
    }
    const {path} = req.body;
    let images = [];
    for(const file of files){
      const url = await uploadToClodinary(file, path);
      images.push(url);
      removeTmp(file.tempFilePath);
     }
     res.json(images);

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

const uploadToClodinary = async(file,path)=>{
  return new Promise((resolve)=>{
    var seconds = new Date().getTime() / 1000;
    FileNaming = file.md5 + seconds    
    const fileStream = fs.createReadStream(file.tempFilePath);

    s3.upload({
      Bucket: "kitpatio", // Add bucket name here
      ACL: "public-read", // Specify whether anyone with link can access the file
      Key: `${path}/${FileNaming}`, // Specify folder and file name
      Body:  fileStream,
      ContentType: file.mimetype
    },(err, res)=>{
      if (err) {
        removeTmp(file.tempFilePath);
        return res.status(400).json("Upload image failed.");
      }
      let str = res.Location;
      let stringToAdd = "cdn.";
      function addStr(str, index, stringToAdd){
          return str.substring(0, index) + stringToAdd + str.substring(index, str.length);
      }
      const finalLocation = (addStr(str, 22, stringToAdd));
      resolve({
        url:finalLocation,
    });
   })

  })
}







const removeTmp=(path)=>{
  fs.unlink(path,(err)=>{
   if(err) throw err;
  })
}