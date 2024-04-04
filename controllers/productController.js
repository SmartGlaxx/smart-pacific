const Product = require("../models/ProductModel")
var cloudinary = require('cloudinary').v2

const getProducts = async(req, res)=>{
    try{
        const products = await Product.find()
        res.status(200).json({repsonse: "Success", products})
    }catch(error){
        res.status(404).json({response: "Fail", message: "Products not found"})
    }
}

const createProduct = async(req, res)=>{    
    try{
        const product = new Product(req.body)
        const createdProduct = await product.save()
        if(createdProduct){
            res.status(200).json({response: "Success", message: "Product created successfully", createdProduct})
        }else{
            res.status(400).json({response: "Fail", message: "Error creating product"})
        }
    }catch(error){
        res.status(400).json({response: "Fail", message: 'Error creating product'})
    }

}

const getProduct = async(req, res)=>{
    try{
        const {id} = req.params
        const product = await Product.findOne({_id: id})
        res.status(200).json({response: "Success", product})
    }catch(error){
        res.status(404).json({response: "Fail", message: "Product not found"})
    }
}

const uploadImage = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(200).json({ response: "Fail", message: 'Please select at least one picture' });
        }

        const maxSize = 10000 * 1024;

        const promises = req.files.images.map(async (file) => {
            if (!file.mimetype.startsWith("image")) {
                return { response: "Fail", message: 'Please upload only pictures' };
            }

            if (file.size > maxSize) {
                return { response: "Fail", message: `Picture size is higher than ${maxSize}. Please resize it` };
            }

            const result = await cloudinary.uploader.upload(file.tempFilePath, {
                use_filename: true,
                folder: "e-commerce-project",
            });

            return { src: result.secure_url };
        });

        const uploadedImages = await Promise.all(promises);

        return res.status(200).json({ images: uploadedImages });
    } catch (error) {
        return res.status(200).json({ response: "Fail", message: error.message });
    }
};

const updateProduct = async(req, res)=>{
    try{
        const {id} = req.params
        const product = await Product.findOneAndUpdate({_id: id},
            req.body, {new: true, runValidators: true})
        if(product){
            res.status(200).json({response: "Success", product})
        }else{
            res.status(400).json({response: "Fail", message: "Error updating product"}) 
        }
    }catch(error){
        res.status(400).json({response: "Fail", message: "Error updating product"})
    }
}

const deleteProduct = async(req, res)=>{
    try{
        const {id} = req.params
        const productDeleted = await Product.deleteOne({_id: id})
        if(productDeleted){
            res.status(200).json({response: "Success", message: "Product deleted"})
        }else{
            res.status(400).json({response: "Fail", message: "Error deleting product"}) 
        }
    }catch(error){
        res.status(400).json({response: "Fail", message: "Error deleting product"})
    }
}

module.exports = {getProducts, createProduct, getProduct, updateProduct, uploadImage, deleteProduct}