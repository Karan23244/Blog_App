const express = require("express");
const router = express.Router();
const { subscribeUser } = require("../controller/subscriberController");

router.post("/", subscribeUser);

module.exports = router;
