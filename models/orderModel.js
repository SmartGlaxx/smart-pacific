const mongoose = require("mongoose")

const CartItem = mongoose.Schema({
    productName: {
        type: String, 
        required : true
    },
    productImage: {
        type: String, 
        required : true
    },
    productPrice: {
        type: Number, 
        required : true
    },
    productAmount: {
        type: Number, 
        required : true
    },
    productId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: true
    }
})

const OrderSchema = mongoose.Schema({
    total:{
        type: Number,
        required: true
    },
    orderProducts: [CartItem],
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    paymentId:{
        type: String
    }
},{timestamps: true})

module.exports = mongoose.model("Order", OrderSchema)