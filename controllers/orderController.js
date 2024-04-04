const Order = require("../models/orderModel")
const Product = require("../models/ProductModel")


const createOrder = async (userId, products) => {
    try {
        let total = 0;

        if (!products || products.length === 0) {
            return { response: "Fail", message: "No products" };
        }
        const newProducts = []
        for (const product of products) {
            const { id: productIdWithColor, productName, selectedColor, 
                quantity: productAmount, inventory, image: productImage, 
                price: productPrice } = product;
            total += productAmount * productPrice;
            const productIdSplit = productIdWithColor.split('_');
            const productId = productIdSplit[0]
            const newProduct = {
                productName, productImage, productPrice, productAmount, productId
            }
            newProducts.push(newProduct)
        }

        const orderCreated = await Order.create({ orderProducts: newProducts, total, userId });
        if (orderCreated) {
            return { response: "Success", orderCreated };
        } else {
            return { response: "Fail", message: "Order not set" };
        }
    } catch (error) {
        return { response: "Fail", message: error.message };
    }
};

const getUserOrders = async(req, res)=>{
    try{
        const {userId} = req.params
        const userOrders = await Order.find({userId: userId})
        if(userOrders){
            res.status(200).json({response: "Success", userOrders})
        }else{
            res.status(400).json({response: "Success", message: "Orders not fetched"})
        }
    }catch(error){
        res.status(400).json({response: "Success", message: "Error fetching orders"})
    }
}


// const getOrder = async(req, res)=>{
//     try{
//         const {id} = req.params
//         const order = await Order.findOne({_id: id})
//         if(order){
//             res.status(200).json({response: "Success", order})
//         }else{
//             res.status(400).json({response: "Success", message: "Order not fetched"})
//         }
//     }catch(error){
//         res.status(400).json({response: "Success", message: "Error fetching order"})
//     }
// }


module.exports = {createOrder, getUserOrders}