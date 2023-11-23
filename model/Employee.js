const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
    password: { type: String },
    task: { type: Array },
  },
  {
    collection: "register",
  }
);

module.exports = mongoose.model("Employees", EmployeeSchema);
