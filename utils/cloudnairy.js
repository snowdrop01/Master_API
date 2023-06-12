const cloudinary = require('cloudinary');
// Configuration 
cloudinary.config({
  cloud_name: "dzbatqm8j",
  api_key: "426615684381723",
  api_secret: "z_pzD4ibRNqycOOed0PQYGJkyB4"
});

const cloudinaryUploadImg = async (fileToUploads) => {
  return new Promise((resolve) => {
     cloudinary.uploader.upload(fileToUploads, (result) => {
      console.log(result);
      resolve(
        {
          url: result.secure_url
          // asset_id: result.asset_id,
          // public_id: result.public_id,
        },
        {
          resource_type: "auto",
        }
      );
    });
  });
};

module.exports = {cloudinaryUploadImg}