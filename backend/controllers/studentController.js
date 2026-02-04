
const Student = require("../models/Student");

// POST /api/students
exports.createStudent = async (req, res) => {
  try {
    const { fullName, email, course } = req.body;
    if (!fullName || !email || !course) {
      return res.status(400).json({ message: "fullName, email, and course are required" });
    }

    const student = await Student.create({ fullName, email, course });
    res.status(201).json(student);
  } catch (error) {
    // duplicate email
    if (error.code === 11000) {
      return res.status(409).json({ message: "Email already exists" });
    }
    res.status(400).json({ message: error.message });
  }
};

// GET /api/students
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/students/:id
exports.updateStudent = async (req, res) => {
  try {
    const { fullName, email, course } = req.body;

    const updated = await Student.findByIdAndUpdate(
      req.params.id,
      { fullName, email, course },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ message: "Student not found" });

    res.json(updated);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Email already exists" });
    }
    res.status(400).json({ message: error.message });
  }
};

// DELETE /api/students/:id
exports.deleteStudent = async (req, res) => {
  try {
    const deleted = await Student.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Student not found" });
    res.json({ message: "Student deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
