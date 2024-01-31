
import { useState } from 'react';
import axios from 'axios';
function AddAttendance() {
  const [attendanceStatus, setAttendanceStatus] = useState('');

  const handleToggleAttendance = async () => {
   
    try {
      const empid = sessionStorage.getItem("employeeId");
      
      // Make a POST request to mark attendance
      await axios.post(`/api/employee/mark/attendance/${empid}`, { status: attendanceStatus });
      // Handle success (e.g., show a success message)
      console.log('Attendance marked successfully');
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error('Error marking attendance:', error.response.data.message);
    }
  };
  const empnam = sessionStorage.getItem("empname");
  return (
    <div>
    <h2>Mark Attendance</h2>
    <p>Employee ID: {empnam}</p>
    <label>
      Attendance Status:
      <select value={attendanceStatus} onChange={(e) => setAttendanceStatus(e.target.value)}>
        <option value="present">Present</option>
        <option value="absent">Absent</option>
        <option value="halfday">Halfday</option>
        <option value="holiday">Holiday</option>
      </select>
    </label>
    <br />
    <button onClick={handleToggleAttendance}>Toggle Attendance</button>
  </div>
  );
}



export default AddAttendance;
