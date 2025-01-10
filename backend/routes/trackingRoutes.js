const express = require("express");
const cookieMiddleware = require("../middlewares/cookieMiddleware");
const { trackPage } = require("../controller/trackingController");

const router = express.Router();

// Apply the cookieMiddleware only to this route
router.post("/", cookieMiddleware, trackPage);

module.exports = router;
