const express = require("express")
const router  = express.Router()
const {getUsers, getAUser, updateUser} = require("../controllers/userController")

router.get("/get-users", getUsers )
router.patch("/update-user", updateUser )
router.get("/get-user/:id", getAUser )


module.exports = router





