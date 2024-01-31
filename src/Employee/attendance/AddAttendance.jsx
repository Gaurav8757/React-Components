import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';


const getCurrentDateAndTime = () => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(new Date());
  return formattedDate;
};
const curentDateTime = getCurrentDateAndTime();

function AddAttendance() {
  
  const [attendanceStatus, setAttendanceStatus] = useState('');

  const handleToggleAttendance = async () => {
    try {
      const empid = sessionStorage.getItem('employeeId');

      // Check if a valid attendance status is selected
      if (!attendanceStatus) {
        toast.error('Please select a valid attendance status.');
        return;
      }
      // Make a POST request to mark attendance
      await axios.post(`https://eleedomimf.onrender.com/employee/mark/attendance/${empid}`, {
        status: attendanceStatus,
        date: curentDateTime,
      });
      // Handle success (e.g., show a success message)
      toast.success('Today Attendance marked Successfully!');
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error(
        'Error marking attendance:',
        error.response ? error.response.data.message : error.message
      );
    }
  };

  const empnam = sessionStorage.getItem('name');

  return (
    <section className="container-fluid relative h-screen p-0 sm:ml-64 bg-slate-200">
      <div className="container-fluid flex justify-center p-2  border-dashed rounded-lg  bg-slate-200">
        <div className="inline-block min-w-full  w-full py-0 sm:px-5 lg:px-1">
          <h2 className="text-4xl tracking-wider font-medium">Mark Attendance</h2>

          <div className="overflow-x-auto max-h-screen h-screen mt-10 bg-slate-200">
            <p className="text-start font-semibold text-2xl">
              Your Name: <span className="font-medium tracking-wide text-green-700">{empnam}</span>
            </p>
            <div className="mt-6 ">
              <div className="flex flex-wrap">
                <div className="flex items-center me-10">
                  <h1 className='text-2xl tracking-wide font-medium text-blue-600 me-10'>Attendance Status:</h1>
                  <input
                    id="red-radio"
                    type="radio"
                    value="absent"
                    name="colored-radio"
                    checked={attendanceStatus === 'absent'}
                    onChange={() => setAttendanceStatus('absent')}
                    className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="red-radio"
                    className="ms-2 text-sm font-medium text-gray-600 "
                  >
                    Absent
                  </label>
                </div>
                <div className="flex items-center me-10">
                  <input
                    id="green-radio"
                    type="radio"
                    value="present"
                    name="colored-radio"
                    checked={attendanceStatus === 'present'}
                    onChange={() => setAttendanceStatus('present')}
                    className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="green-radio"
                    className="ms-2 text-sm font-medium text-gray-600 "
                  >
                    Present
                  </label>
                </div>
                <div className="flex items-center me-4">
                  <input
                    id="yellow-radio"
                    type="radio"
                    value="holiday"
                    name="colored-radio"
                    checked={attendanceStatus === 'holiday'}
                    onChange={() => setAttendanceStatus('holiday')}
                    className="w-4 h-4 text-yellow-400 bg-gray-100 border-gray-300 focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="yellow-radio"
                    className="ms-2 text-sm font-medium text-gray-600 "
                  >
                    Holiday
                  </label>
                </div>
              </div>
              <br />
              <div className='text-center'>
              <button className='text-white  bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"' onClick={handleToggleAttendance}>Attendance</button>
            </div>
            </div>
          </div>
          
        </div>
        
      </div>
    </section>
  );
}

export default AddAttendance;
