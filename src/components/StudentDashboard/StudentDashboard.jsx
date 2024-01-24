import { Link, Route, Routes } from "react-router-dom";
import AllStudentsData from "./AllStudentsData.jsx";
import StudentDetail from "./Student";
import "./StudentDashboard.css";
import data from "./studentsData.js";

function StudentDashboard() {
  // Group the data by student
  const dataByStudent = data.reduce((acc, task) => {
    const exercise = task["Wie ben je?"];
    acc[exercise] = acc[exercise] || [];
    acc[exercise].push(task);
    return acc;
  }, {});

  // Turn object into array
  const dataByStudentArray = Object.entries(dataByStudent).map(
    ([name, tasks]) => ({
      name,
      tasks,
    })
  );

  return (
    <div className="student-dashboard">
      <div className="title">
        <h2>React(& Victory) Student Dashboard</h2>
      </div>
      <div className="subHeader">
        <h6>*Zoom in for more detail & drag for navigation</h6>
      </div>
      <nav>
        <div>
          <ul className="student-links">
            <div className="allStudents">
              <h3>Averages of all students:</h3>
              <li>
                <Link className="link" to="/project3">
                  All Students
                </Link>
              </li>
            </div>
            <div className="student">
              <h3>Individual students:</h3>
              {dataByStudentArray.map((student) => (
                <li key={student.name}>
                  <Link
                    className="link"
                    to={`/project3/student/${student.name}`}
                  >
                    {" "}
                    {student.name}
                  </Link>
                </li>
              ))}
            </div>
          </ul>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<AllStudentsData />} />
        <Route path="/student/:name" element={<StudentDetail />} />
      </Routes>
    </div>
  );
}

export default StudentDashboard;
