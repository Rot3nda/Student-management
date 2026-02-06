const Student = require("../models/Student"); 

const normalize = (s) => (s ?? "").trim().replace(/\s+/g, " ").toLowerCase();

function validateStudentInput({ fullName, email, course }) {
  const name = (fullName ?? "").trim();
  const mail = (email ?? "").trim();
  const crs = (course ?? "").trim();

  if (!name || !mail || !crs) {
    return "fullName, email, and course are required";
  }

  // 2) full name > 3 chars
  if (name.length <= 3) {
    return "Full name is too short, it should have more than 3 characters";
  }

  // 1) full name must have 2+ parts
  const parts = name.split(/\s+/).filter(Boolean);
  if (parts.length < 2) {
    return "Enter full name";
  }

  // 3) only letters and spaces between names
  const lettersAndSpacesOnly = /^[A-Za-z]+(?:\s+[A-Za-z]+)+$/;
  if (!lettersAndSpacesOnly.test(name)) {
    return "Full name should  only contain letters";
  }

  // 4) email structure
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(mail)) {
    return "Enter a valid email";
  }

  // 5) course length 3+
  if (crs.length < 3) {
    return "Course should contain more than 3 characters";
  }

  return "";
}

// POST /api/students
exports.createStudent = async (req, res) => {
  try {
    const msg = validateStudentInput(req.body);
    if (msg) return res.status(400).json({ message: msg });

    const { fullName, email, course } = req.body;

    // 6) Duplicate full row check (normalized)
    const exists = await Student.findOne({
      fullName: new RegExp(`^${normalize(fullName)}$`, "i"),
      email: normalize(email),
      course: new RegExp(`^${normalize(course)}$`, "i"),
    });

    if (exists) {
      return res.status(409).json({ message: "Duplicate data is not allowed" });
    }

    const student = await Student.create({
      fullName: fullName.trim(),
      email: normalize(email),
      course: course.trim(),
    });

    res.status(201).json(student);
  } catch (error) {
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
    const msg = validateStudentInput(req.body);
    if (msg) return res.status(400).json({ message: msg });

    const { fullName, email, course } = req.body;

    // 6) duplicate row check excluding current id
    const duplicate = await Student.findOne({
      _id: { $ne: req.params.id },
      fullName: new RegExp(`^${normalize(fullName)}$`, "i"),
      email: normalize(email),
      course: new RegExp(`^${normalize(course)}$`, "i"),
    });

    if (duplicate) {
      return res.status(409).json({ message: "Duplicate data is not allowed" });
    }

    const updated = await Student.findByIdAndUpdate(
      req.params.id,
      {
        fullName: fullName.trim(),
        email: normalize(email),
        course: course.trim(),
      },
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
