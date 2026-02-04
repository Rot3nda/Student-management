import { useEffect, useState } from "react";
import API from "../api";

export default function StudentForm({ fetchStudents, selectedStudent, setSelectedStudent }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    course: ""
  });

  useEffect(() => {
    if (selectedStudent) {
      setFormData({
        fullName: selectedStudent.fullName || "",
        email: selectedStudent.email || "",
        course: selectedStudent.course || ""
      });
    }
  }, [selectedStudent]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const clearForm = () => {
    setFormData({ fullName: "", email: "", course: "" });
    setSelectedStudent(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (selectedStudent?._id) {
        await API.put(`/students/${selectedStudent._id}`, formData);
      } else {
        await API.post("/students", formData);
      }

      clearForm();
      fetchStudents();
    } catch (err) {
      alert(err?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>{selectedStudent ? "Edit Student" : "Add Student"}</h2>

      <div className="grid">
        <input
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          name="course"
          placeholder="Course"
          value={formData.course}
          onChange={handleChange}
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
