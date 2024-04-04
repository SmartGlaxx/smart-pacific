const express = require("express")
const router  = express.Router()
const {createUser, signInUser} = require("../controllers/authenticationController")

router.post("/create-user", createUser )
router.post("/sign-in", signInUser )

module.exports = router

