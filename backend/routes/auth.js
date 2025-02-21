const express = require("express");
const { adminLogin,login,signup } = require("../controller/adminController");
const router = express.Router();
//route for admin loin
router.post("/", adminLogin);

module.exports = router;
