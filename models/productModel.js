const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    productName: {
        type: String,
        trim: true,
        required: [true, "Please provide a product name"],
        maxlength: [100, "Name should not be more than 80 characters long"]
    },
    price: {
        type: Number,
        trim: true,
        required: [true, "Please provide product price"],
        default: 0
    },
    description: {
        type: String,
        trim: true,
        required: [true, "Plese provide product description"],
    },
    productImages:{
        type: [String]
    },
    productCategory:{
        type: String,
        required: [true, "Please provide product category"],
    },
    manufacturer:{
        type: String,
        required: [true, "Please provide company"],
    },
    colors:{
        type: [String],
        default: ["#765"],
        required: true,
    },
    featured:{
        type: Boolean,
        default: false,
    },
    freeShipping:{
        type: Boolean,
        default: false
    },
    inventory:{
        type: Number,
        required: true,
        default: 20
    },
    averageRating: {
        type: Number,
        deafult: 0
    }
}, {timestamps: true})

module.exports = mongoose.model("Product", ProductSchema)
