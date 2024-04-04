const express = require("express")
const router  = express.Router()

const {getProducts, createProduct, 
    getProduct, updateProduct, uploadImage, deleteProduct} = require("../controllers/productController")

router.post("/create", createProduct)
router.get("/all", getProducts)
router.get("/product/:id", getProduct)
router.patch("/update/:id",updateProduct)
router.post("/upload-image", uploadImage)
router.delete("/delete/:id", deleteProduct)

module.exports = router
