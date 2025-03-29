const express = require("express");

const { handleImageUpload, addProduct, fetchAllProducts, editProduct, deletePoduct } = require('../../controllers/admin/products-controller');

const { upload } = require('../../helpers/cloudinary');

const router = express.Router();

router.post("/upload-image", upload.single('my_file'), handleImageUpload);
router.post("/add", addProduct);
router.put("/edit/:id", editProduct);
router.delete("/delete/:id", deletePoduct);
router.get("/get", fetchAllProducts);


module.exports = router;

