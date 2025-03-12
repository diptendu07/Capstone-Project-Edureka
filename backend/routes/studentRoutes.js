const express = require("express");
const { applyForLeave, viewLeaveRequests } = require("../controllers/studentController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/apply-leave", authMiddleware, applyForLeave);
router.get("/view-leaves", authMiddleware, viewLeaveRequests);

module.exports = router;
