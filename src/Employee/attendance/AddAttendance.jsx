import { useState } from 'react';
import axios from 'axios';
import {toast} from "react-toastify";
function AddAttendance() {
  const [attendanceStatus, setAttendanceStatus] = useState('');

  const handleToggleAttendance = async () => {
    try {
      const empid = sessionStorage.getItem('employeeId');

      // Check if a valid attendance status is selected
      if (!attendanceStatus) {
        toast.error("Please select a valid attendance status.");
        return;
      }
      // Make a POST request to mark attendance
      await axios.post(`https://eleedomimf.onrender.com/employee/mark/attendance/${empid}`, { status: attendanceStatus });
      // Handle success (e.g., show a success message)
      toast.success(`Today Attendance marked Successfully!`);
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error('Error marking attendance:', error.response ? error.response.data.message : error.message);
    }
  };

  const empnam = sessionStorage.getItem('name');

  return (
    <section className="container-fluid relative h-screen p-0 sm:ml-64 bg-slate-200">
    <div className="container-fluid flex justify-center p-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 bg-slate-200">
      <div className="inline-block min-w-full  w-full py-0 sm:px-5 lg:px-1">
      <h2 className='text-4xl tracking-wider font-medium'>Mark Attendance</h2>

      <div className="overflow-x-auto text-start mt-10 bg-slate-100">
      <p className='text-start font-semibold text-2xl'>
        Your Name: <span className='font-medium tracking-wide text-blue-600'>{empnam}</span>
      </p>
      <div className='mt-10 '>
      <label className='text-start '>
        Attendance Status:
        <select value={attendanceStatus} onChange={(e) => setAttendanceStatus(e.target.value)}>
          <option value="">--- select ---</option>
          <option value="present">Present</option>
          <option value="absent">Absent</option>
          <option value="halfday">Halfday</option>
        </select>
      </label>
      <br />
      <button onClick={handleToggleAttendance}> Attendance</button>
      </div>
    </div>
    </div></div>
    </section>
  );
}

export default AddAttendance;
