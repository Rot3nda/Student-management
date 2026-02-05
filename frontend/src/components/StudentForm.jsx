import { useEffect, useMemo, useRef, useState } from "react";
import API from "../api";

export default function StudentForm({
  fetchStudents,
  selectedStudent,
  setSelectedStudent,
  students = [],
}) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    course: "",
  });

  // Refs so we can setCustomValidity() and reportValidity()
  const fullNameRef = useRef(null);
  const emailRef = useRef(null);
  const courseRef = useRef(null);

  useEffect(() => {
    if (selectedStudent) {
      setFormData({
        fullName: selectedStudent.fullName || "",
        email: selectedStudent.email || "",
        course: selectedStudent.course || "",
      });
    }
  }, [selectedStudent]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const clearForm = () => {
    setFormData({ fullName: "", email: "", course: "" });
    setSelectedStudent(null);

    // Clear any lingering custom validity messages
    fullNameRef.current?.setCustomValidity("");
    emailRef.current?.setCustomValidity("");
    courseRef.current?.setCustomValidity("");
  };

  // ---------- Validation helpers ----------
  const normalize = (s) => (s ?? "").trim().replace(/\s+/g, " ").toLowerCase();

  const validateFullName = (value) => {
    const v = (value ?? "").trim();

    // 2) length > 3
    if (v.length <= 3) {
      return "Full name is too short, it should have more than 3 characters";
    }

    // 1) must contain 2+ strings separated by a space
    // Using split on whitespace to avoid “double spaces” issues
    const parts = v.split(/\s+/).filter(Boolean);
    if (parts.length < 2) {
      return "Enter full name";
    }

    // 3) only letters (and spaces between names)
    // (No numbers, no special chars)
    const lettersAndSpacesOnly = /^[A-Za-z]+(?:\s+[A-Za-z]+)+$/;
    if (!lettersAndSpacesOnly.test(v)) {
      return "Full name should  only contain letters";
    }

    return "";
  };

  const validateEmail = (value) => {
    const v = (value ?? "").trim();

    // 4) email structure
    // (simple but solid check; backend will also validate)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(v)) {
      return "Enter a valid email";
    }

    return "";
  };

  const validateCourse = (value) => {
    const v = (value ?? "").trim();
    // 5) length 3+
    if (v.length < 3) {
      return "Course should contain more than 3 characters";
    }
    return "";
  };

  const isDuplicateRow = useMemo(() => {
    const currentId = selectedStudent?._id;
    const key = {
      fullName: normalize(formData.fullName),
      email: normalize(formData.email),
      course: normalize(formData.course),
    };

    return students.some((s) => {
      if (currentId && s._id === currentId) return false; // allow editing same record
      return (
        normalize(s.fullName) === key.fullName &&
        normalize(s.email) === key.email &&
        normalize(s.course) === key.course
      );
    });
  }, [students, formData.fullName, formData.email, formData.course, selectedStudent]);

  const applyValidity = (inputEl, message) => {
    if (!inputEl) return;
    inputEl.setCustomValidity(message);
  };

  const validateAllAndReport = () => {
    const fullNameMsg = validateFullName(formData.fullName);
    const emailMsg = validateEmail(formData.email);
    const courseMsg = validateCourse(formData.course);

    applyValidity(fullNameRef.current, fullNameMsg);
    applyValidity(emailRef.current, emailMsg);
    applyValidity(courseRef.current, courseMsg);

    // 6) duplicate row check (block BEFORE API call)
    if (!selectedStudent?._id && isDuplicateRow) {
      applyValidity(fullNameRef.current, "Duplicate data is not allowed");
    }

    // Trigger browser tooltip on first invalid field
    if (!fullNameRef.current?.checkValidity()) {
      fullNameRef.current?.reportValidity();
      return false;
    }
    if (!emailRef.current?.checkValidity()) {
      emailRef.current?.reportValidity();
      return false;
    }
    if (!courseRef.current?.checkValidity()) {
      courseRef.current?.reportValidity();
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate client-side first (shows tooltip like your screenshot)
    if (!validateAllAndReport()) return;

    try {
      if (selectedStudent?._id) {
        await API.put(`/students/${selectedStudent._id}`, formData);
      } else {
        await API.post("/students", formData);
      }

      clearForm();
      fetchStudents();
    } catch (err) {
      // If backend rejects (still possible), show message nicely
      const msg = err?.response?.data?.message || "Something went wrong";

      // Try to attach backend message to a relevant field
      // (keeps the same tooltip experience)
      if (msg.toLowerCase().includes("email")) {
        applyValidity(emailRef.current, msg);
        emailRef.current?.reportValidity();
      } else {
        applyValidity(fullNameRef.current, msg);
        fullNameRef.current?.reportValidity();
      }
    }
  };

  // Live validation as user types (optional but feels “tight”)
  const onFullNameInput = (e) => {
    const msg = validateFullName(e.target.value);
    e.target.setCustomValidity(msg);
  };

  const onEmailInput = (e) => {
    const msg = validateEmail(e.target.value);
    e.target.setCustomValidity(msg);
  };

  const onCourseInput = (e) => {
    const msg = validateCourse(e.target.value);
    e.target.setCustomValidity(msg);
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>{selectedStudent ? "Edit Student" : "Add Student"}</h2>

      <div className="grid">
        <input
          ref={fullNameRef}
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          onInput={onFullNameInput}
          required
        />

        <input
          ref={emailRef}
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          onInput={onEmailInput}
          required
        />

        <input
          ref={courseRef}
          name="course"
          placeholder="Course"
          value={formData.course}
          onChange={handleChange}
          onInput={onCourseInput}
          required
        />
      </div>

      <div className="actions">
        <button type="submit">{selectedStudent ? "Update" : "Add"}</button>

        {selectedStudent && (
          <button type="button" className="secondary" onClick={clearForm}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
