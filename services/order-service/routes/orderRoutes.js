const express = require("express");

const router = express.Router();

const controller = require("../controllers/orderController");
const auth = require("../middleware/authMiddleware");

router.post("/orders", auth.verifyToken, controller.createOrder);
router.get("/orders", auth.verifyToken, controller.getOrders);

module.exports = router;