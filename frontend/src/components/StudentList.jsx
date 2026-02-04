export default function StudentList({ students, onEdit, onDelete }) {
    return (
      <div id="card" className="card">
        <h2>Students</h2>
  
        <div className="tableWrap">
          <table>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Course</th>
                <th style={{ width: 160 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center" }}>
                    No students yet
                  </td>
                </tr>
              ) : (
                students.map((s) => (
                  <tr className="st_list" key={s._id}>
                    <td>{s.fullName}</td>
                    <td>{s.email}</td>
                    <td>{s.course}</td>
                    <td className="rowActions">
                      <button className="secondary" onClick={() => onEdit(s)}>
                        Edit
                      </button>
                      <button className="danger" onClick={() => onDelete(s._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  