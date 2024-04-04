require('dotenv').config()
const express = require("express")
const router  = express.Router()
const {makePayment} = require("../controllers/paymentController")

router.post("/checkout", makePayment)


module.exports = router