import { useState } from 'react';
import axios from 'axios';

function AddAttendance() {
  const [attendanceStatus, setAttendanceStatus] = useState('');

  const handleToggleAttendance = async () => {
    try {
      const empid = sessionStorage.getItem('employeeId');

      // Check if a valid attendance status is selected
      if (!attendanceStatus) {
        console.error('Please select a valid attendance status.');
        return;
      }

      // Make a POST request to mark attendance
      await axios.post(`/api/employee/mark/attendance/${empid}`, { status: attendanceStatus });

      // Handle success (e.g., show a success message)
      console.log('Attendance marked successfully');
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error('Error marking attendance:', error.response ? error.response.data.message : error.message);
    }
  };

  const empnam = sessionStorage.getItem('name');

  return (
    <div>
      <h2>Mark Attendance</h2>
      <p>
        Employee Name: <span className='font-medium tracking-wide text-blue-600'>{empnam}</span>
      </p>
      <label>
        Attendance Status:
        <select value={attendanceStatus} onChange={(e) => setAttendanceStatus(e.target.value)}>
          <option value="">--- select ---</option>
          <option value="present">Present</option>
          <option value="absent">Absent</option>
          <option value="halfday">Halfday</option>
          <option value="holiday">Holiday</option>
        </select>
      </label>
      <br />
      <button onClick={handleToggleAttendance}> Attendance</button>
    </div>
  );
}

export default AddAttendance;
