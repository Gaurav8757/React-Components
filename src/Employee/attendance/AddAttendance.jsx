
import { useState } from 'react';
import axios from 'axios';
function AddAttendance() {
 
  const [identifier, setIdentifier] = useState('');

  const handleMarkAttendance = async () => {
    try {
      // Make a POST request to the backend API
      await axios.post('https://eleedomimf.onrender.com/employee/mark/attendance', { identifier });
      // Handle success (e.g., show a success message)
      console.log('Attendance marked successfully');
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error('Error marking attendance:', error.response.data.message);
    }
  };

  return (
    <div>
      <h1>Employee Attendance Tracking App</h1>
      <label>
        Employee Identifier:
        <input type="text" value={identifier} onChange={(e) => setIdentifier(e.target.value)} />
      </label>
      <br />
      <button onClick={handleMarkAttendance}>Mark Attendance</button>
    </div>
  );
}



export default AddAttendance;
