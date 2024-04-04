require('dotenv').config()
const express = require("express")
const app = express()
const PORT = process.env.PORT || 5000
const middlewareRouteNotfound = require("./server-middlewares/route-not-exist")
const fileUploader = require("express-fileupload")
const cloudinary = require("cloudinary").v2
const cors = require("cors")
const connection = require("./db/dbConnect")

const authenticationRouter = require("./routes/authenticationRoutes")
const userRouter = require("./routes/userRoutes")
const productRouter = require("./routes/productRoutes")
const orderRoutes = require("./routes/orderRoutes")
const paymentRoute = require("./routes/paymentRoute")

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key : process.env.API_KEY,
	api_secret : process.env.API_SECRET
}) 

app.use(cors())
app.use(express.json())
// app.options("/*", function(req, res, next){
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Origin, Content, Accept, Content-Type, Authorization, Content-Length, X-Requested-With');
//     res.sendStatus(200);
//   });
//   app.all('*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     next();
// });
app.use(express.static("./public"))

app.use(fileUploader({useTempFiles : true}))


app.use("/auth", authenticationRouter)
app.use("/user", userRouter)
app.use("/products", productRouter)
app.use("/orders", orderRoutes)
app.use("/payment",paymentRoute)

app.use(middlewareRouteNotfound)

const runServer = async()=>{
    try{
        await connection(process.env.DB_URL)
        app.listen(PORT, ()=>{
            console.log(`App running on port ${PORT}`)
        })
    }catch(error){
        console.log(error)
    }
}

runServer()