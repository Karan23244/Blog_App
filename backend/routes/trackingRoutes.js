const express = require("express");
const { trackPage } = require("../controller/trackingController");

const router = express.Router();

router.post("/", trackPage);

module.exports = router;
