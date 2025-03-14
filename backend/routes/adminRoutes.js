const express = require("express");
const { enrollStudent, toggleBlockStudent, getLeaveRequests, manageLeaveRequest, getAllStudents } = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Admin Routes
router.post("/enroll-student", authMiddleware, enrollStudent);
router.get("/students", authMiddleware, getAllStudents);
router.put("/block-student/:studentId", authMiddleware, toggleBlockStudent);
router.get("/leave-requests", authMiddleware, getLeaveRequests);
router.put("/manage-leave", authMiddleware, manageLeaveRequest);

module.exports = router;
