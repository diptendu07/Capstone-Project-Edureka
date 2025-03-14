const User = require("../models/User");
const bcrypt = require("bcryptjs");

// 1️⃣ Enroll Student (Admin creates student account)
exports.enrollStudent = async (req, res) => {
  try {
    console.log("Incoming Request Body:", req.body);

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    let student = await User.findOne({ email });
    if (student) return res.status(400).json({ msg: "Student already exists" });

    // ✅ Hash Password Before Saving
    const hashedPassword = await bcrypt.hash(password, 10);

    student = new User({ name, email, password: hashedPassword, role: "student" });

    await student.save();

    res.status(201).json({ msg: "Student enrolled successfully" });
  } catch (error) {
    console.error("❌ Error enrolling student:", error);
    res.status(500).json({ msg: "Server Error", error });
  }
};

// 5️⃣ Get All Students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "student" }).select("-password");
    res.json(students);
  } catch (error) {
    console.error("❌ Error fetching students:", error);
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
    console.error("❌ Error blocking/unblocking student:", error);
    res.status(500).json({ msg: "Server Error", error });
  }
};

// 3️⃣ Get All Leave Requests
exports.getLeaveRequests = async (req, res) => {
  try {
    const studentsWithLeaves = await User.find({
      role: "student",
      leaveRequests: { $exists: true, $not: { $size: 0 } }
    });

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
    ).flat(); 

    res.json(leaveRequests);
  } catch (error) {
    console.error("❌ Error fetching leave requests:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

// 4️⃣ Approve/Reject Leave Requests
exports.manageLeaveRequest = async (req, res) => {
  try {
    const { studentId, leaveId, status } = req.body;

    const student = await User.findOne({ _id: studentId, role: "student" });
    if (!student) return res.status(404).json({ msg: "Student not found" });

    const leaveRequest = student.leaveRequests.id(leaveId);
    if (!leaveRequest) return res.status(404).json({ msg: "Leave request not found" });

    leaveRequest.status = status;
    await student.save();

    res.json({ msg: "Leave status updated successfully" });
  } catch (error) {
    console.error("❌ Error updating leave request:", error);
    res.status(500).json({ msg: "Server error" });
  }
};
