const { ImageUploadUtils } = require("../../helpers/cloudinary");


const handleImageUpload = async (req, res) => {
  try {

    const b64 = Buffer.from(req.file.buffer).toString('base64');
    const url = "data:" + req.file.mimeType + ";base64," + b64;
    const result = await ImageUploadUtils(url)

    res.json({
      success: true,
      result
    })

  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: 'Error occured',
    })
  }
}

// add a  new product

module.exports = { handleImageUpload }