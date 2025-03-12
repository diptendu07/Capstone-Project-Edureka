const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "student"], required: true },
  isBlocked: { type: Boolean, default: false },
  leaveRequests: [
    {
      reason: String,
      status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
      appliedAt: { type: Date, default: Date.now },
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
