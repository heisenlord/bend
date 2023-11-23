const express = require("express");
const studentSchema = require("../model/Employee");
const studentRoute = express.Router();

studentRoute.post("/create-student", async (req, res) => {
  try {
    const data = await studentSchema.create(req.body);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

studentRoute.get("/", async (req, res) => {
  try {
    const data = await studentSchema.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

studentRoute.get("/update-student/:id", async (req, res) => {
  try {
    const data = await studentSchema.findById(req.params.id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

studentRoute.put("/update-student/:id", async (req, res) => {
  try {
    const data = await studentSchema.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Updated route to delete a task within a student document
studentRoute.delete("/delete-task/:studentId/:taskId", async (req, res) => {
  try {
    const student = await studentSchema.findById(req.params.studentId);

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    const taskId = req.params.taskId;

    // Find the index of the task in the array
    const taskIndex = student.task.findIndex(
      (task) => task.taskId.toString() === taskId
    );

    if (taskIndex === -1) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Remove the task from the array
    student.task.splice(taskIndex, 1);

    // Save the updated student document
    const updatedStudent = await student.save();

    res.json(updatedStudent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = studentRoute;
