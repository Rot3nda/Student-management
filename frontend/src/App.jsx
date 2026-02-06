import { useEffect, useState } from "react"; 
import API from "./api";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import "./App.css";

export default function App() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await API.get("/students");
      setStudents(res.data);
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to fetch students");
    } finally {
      setLoading(false);
    }
  };

  const deleteStudent = async (id) => {
    const ok = confirm("Delete this student?");
    if (!ok) return;

    try {
      await API.delete(`/students/${id}`);
      // Optimistic update (snappier UI)
      setStudents((prev) => prev.filter((s) => s._id !== id));
      if (selectedStudent?._id === id) setSelectedStudent(null);
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to delete student");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="outer">
    <div className="container">
      <header>
        <h1 className="app-title">Student Management System</h1>
      </header>

      <StudentForm
        fetchStudents={fetchStudents}
        selectedStudent={selectedStudent}
        setSelectedStudent={setSelectedStudent}
        students={students} 
      />

      {loading ? (
        <div className="card">Loading...</div>
      ) : (
        <StudentList
          students={students}
          onEdit={setSelectedStudent}
          onDelete={deleteStudent}
        />
      )}
    </div>
    </div>
  );
}
