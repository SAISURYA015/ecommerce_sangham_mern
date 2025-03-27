const cloudinary = require('cloudinary').v2;
const multer = require('multer');

cloudinary.config({
  cloud_name: 'donlp6vbi',
  api_key: '797373327498437',
  api_secret: 'LgE17PVVBDxUg1TK8kvIGIcA46Y'
});

const storage = new multer.memoryStorage();

async function ImageUploadUtils(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: 'auto'
  }) 
  return result;
} 

const upload = multer({storage});
module.exports = {upload, ImageUploadUtils}