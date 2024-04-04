const stripe = require("stripe")(process.env.STRIPE_SECRET)
const { createOrder } = require("./orderController")

const makePayment = async(req, res)=>{

    try{
        const {userId, products} = req.body
        const lineItems = products.map((product)=>({
            price_data:{
                currency: "cad",
                product_data: {
                    name: product.productName,
                    images: [product.image]
                },
                unit_amount: Math.round(product.price * 100) 
            },
            quantity: product.quantity
        }))
        const session = await stripe.checkout.sessions.create({
            payment_method_types:["card"],
            line_items: lineItems,
            mode:"payment",
            success_url:"http://localhost:5173/cart/?clearCart=true",
            cancel_url:"http://localhost:5173/canceled"
        })

        const orderResult = await createOrder(userId, products);

        if (orderResult.response === "Success") {
            res.json({ id: session.id });
        } else {
            res.status(500).json({ error: "orderResult.message" });
        }
    }catch (error) {
        console.error("Error during checkout:", error);
        res.status(500).json({ error: "An error occurred during checkout" });
    }


}

module.exports = {makePayment}
