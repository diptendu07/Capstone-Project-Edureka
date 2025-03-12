const User = require("../models/User");

// 1️⃣ Enroll Student (Admin creates student account)
exports.enrollStudent = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let student = await User.findOne({ email });
    if (student) return res.status(400).json({ msg: "Student already exists" });

    student = new User({ name, email, password, role: "student" });
    await student.save();

    res.status(201).json({ msg: "Student enrolled successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error });
  }
};

// 2️⃣ Block/Unblock Student
exports.toggleBlockStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await User.findById(studentId);

    if (!student) return res.status(404).json({ msg: "Student not found" });

    student.isBlocked = !student.isBlocked;
    await student.save();

    res.json({ msg: `Student ${student.isBlocked ? "blocked" : "unblocked"} successfully` });
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error });
  }
};

// Get All Leave Requests
exports.getLeaveRequests = async (req, res) => {
  try {
    // Fetch only students who have leave requests
    const studentsWithLeaves = await User.find({ role: "student", leaveRequests: { $exists: true, $not: { $size: 0 } } });

    // Extract leave requests along with student details
    const leaveRequests = studentsWithLeaves.map(student => 
      student.leaveRequests.map(leave => ({
        studentId: student._id,
        name: student.name,
        email: student.email,
        leaveId: leave._id,
        reason: leave.reason,
        status: leave.status,
        appliedAt: leave.appliedAt
      }))
    ).flat(); // Flatten the array

    res.json(leaveRequests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

// 3️⃣ Approve/Reject Leave Requests
exports.manageLeaveRequest = async (req, res) => {
  try {
    const { studentId, leaveId, status } = req.body;

    const student = await User.findOne({ _id: studentId, role: "student" });
    if (!student) return res.status(404).json({ msg: "Student not found" });

    // Find the leave request inside the student's leaveRequests array
    const leaveRequest = student.leaveRequests.id(leaveId);
    if (!leaveRequest) return res.status(404).json({ msg: "Leave request not found" });

    // Update status
    leaveRequest.status = status;
    await student.save();

    res.json({ msg: "Leave status updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

