const User = require("../models/User");

// 1️⃣ Apply for Leave (Student submits a leave request)
exports.applyForLeave = async (req, res) => {
  try {
    const { reason } = req.body;
    const student = await User.findById(req.user.id);

    if (!student) return res.status(404).json({ msg: "Student not found" });

    const newLeaveRequest = { reason, status: "pending", appliedAt: new Date() };

    student.leaveRequests.push(newLeaveRequest);
    await student.save();

    res.status(201).json({ msg: "Leave request submitted", leaveRequests: student.leaveRequests });
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error });
  }
};

// 2️⃣ View Leave Requests (Student checks leave request status)
exports.viewLeaveRequests = async (req, res) => {
  try {
    const student = await User.findById(req.user.id);

    if (!student) return res.status(404).json({ msg: "Student not found" });

    res.json({ leaveRequests: student.leaveRequests });
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error });
  }
};
