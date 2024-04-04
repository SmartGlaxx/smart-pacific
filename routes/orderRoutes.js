const express = require("express")
const router  = express.Router()
const {createOrder, getUserOrders} = require("../controllers/orderController")

router.get("/:userId", getUserOrders)
router.post("/", createOrder)

module.exports = router

