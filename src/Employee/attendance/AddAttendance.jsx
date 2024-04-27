import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import LeaveApplication from '../LeaveApplication/LeaveApplication.jsx';
import VITE_DATA from '../../config/config.jsx';
// get times
const getCurrentDateAndTime = () => {
  const options = { weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(new Date());
  return formattedDate;
};
// dates
const formatDate = (dateTimeString) => {
  const date = new Date(dateTimeString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};
// time
const formatTime = (dateTimeString) => {
  const timePart = dateTimeString.split(' ')[2] + ' ' + dateTimeString.split(' ')[3];
  return timePart;
};
// weekday
const formatWeekday = (dateTimeString) => {
  const weekdayPart = dateTimeString.split(',')[0];
  return weekdayPart;
};
// show date on screen
let dates = formatDate(getCurrentDateAndTime());
// api call to post attendancee

function AddAttendance() {
  let digitalTime = new Date().toLocaleTimeString();
  const [ctime, setTime] = useState(digitalTime);
  const [attendanceStatus, setAttendanceStatus] = useState('');

  // digital clock
  const updateTime = () => {
    digitalTime = new Date().toLocaleTimeString();
    setTime(digitalTime);
  }
  setInterval(updateTime, 1000);

  // toggle handle present, absent api
  const handleToggleAttendance = async () => {
    try {
      const empid = sessionStorage.getItem('employeeId');
      // Check if a valid attendance status is selected
      if (!attendanceStatus) {
        toast.error('Please select a valid attendance status.');
        return;
      }
      const currentDateAndTime = getCurrentDateAndTime();
      const datePart = formatDate(currentDateAndTime); // Get date in the format 01-01-2000
      const timePart = formatTime(currentDateAndTime); // Get time in the format 00:00:00 AM/PM
      const weekdayPart = formatWeekday(currentDateAndTime);  // Get weekday like 'Monday'
      // Make a POST request to mark attendance
      await axios.post(`${VITE_DATA}/employee/mark/attendance/${empid}`, {
        status: attendanceStatus,
        date: datePart,
        time: timePart,
        weekday: weekdayPart,
      });
      // Handle success (e.g., show a success message)
      toast.success('Today Attendance marked Successfully!');
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error(
        'Error marking attendance:',
        error.response ? error.response.data.message : error.message
      );
      toast.error(`${
        error.response ? error.response.data.message : error.message
      }`)
    }
  }
  const empnam = sessionStorage.getItem('name');
  return (
    <section className="container-fluid relative flex flex-wrap p-0 sm:ml-64 bg-slate-200">
      <div className="container-fluid flex justify-center p-2 w-full sm:w-full md:w-full lg:w-full xl:w-full border-dashed rounded-lg  bg-slate-200">
        <div className="inline-block min-w-full   w-full py-0 sm:px-5 lg:px-1">
          <h2 className="text-4xl tracking-wider font-medium">Attendance</h2>
          <div className="overflow-x-auto mt-10 bg-slate-200">
            {/* name, date, time */}
            <div className='flex justify-between text-xl sm:text-md md:text-xl lg:text-xl xl:text-xl'>
              <span className="text-start font-semibold ">
                Your Name: <span className="font-base tracking-wide text-green-700">{empnam}</span>
              </span>
              <span className="text-start font-semibold ">Time: <span className='font-medium tracking-wide text-green-500   md:text-lg xl:text-xl  text-lg sm:text-md'> {ctime}</span> </span>
              <span className="text-start font-semibold ">Date: <span className='font-medium tracking-wide text-blue-600 md:text-lg xl:text-xl text-lg sm:text-md'> {dates}</span> </span>
            </div>
            {/* part-2 */}
            <div className='flex flex-wrap '>
            <div className="mt-12   w-full sm:w-full md:w-full lg:w-full xl:w-1/2">
            <h1 className='text-2xl tracking-wide text-start font-medium text-blue-600 me-10'>Mark Attendance</h1>
              <div className=" mx-2 text-center justify-center mt-4">
             
                <div className="flex items-center me-10 ">
                  <input
                    id="red-radio"
                    type="radio"
                    value="absent"
                    name="colored-radio"
                    checked={attendanceStatus === 'absent'}
                    onChange={() => setAttendanceStatus('absent')}
                    className="w-5 h-5 cursor-pointer text-red-600 bg-red-200 border-red-700 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 "
                  />
                  <label
                    htmlFor="red-radio"
                    className="ms-2 text-xl cursor-pointer font-semibold text-red-600 "
                  >
                    Absent
                  </label>
                </div>
                <div className="flex items-center me-10 my-2">
                  <input
                    id="green-radio"
                    type="radio"
                    value="present"
                    name="colored-radio"
                    checked={attendanceStatus === 'present'}
                    onChange={() => setAttendanceStatus('present')}
                    className="w-5 h-5 cursor-pointer text-green-600 bg-green-200 border-green-700 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2"
                  />
                  <label
                    htmlFor="green-radio"
                    className="ms-2 text-xl cursor-pointer font-semibold text-green-600 "
                  >
                    Present
                  </label>
                </div>
                <div className="flex items-center me-4">
                  <input
                    id="yellow-radio"
                    type="radio"
                    value="halfday"
                    name="colored-radio"
                    checked={attendanceStatus === 'halfday'}
                    onChange={() => setAttendanceStatus('halfday')}
                    className="w-5 h-5 cursor-pointer text-yellow-400 bg-yellow-200 border-yellow-700 focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-yellow-800 focus:ring-2"
                  />
                  <label
                    htmlFor="yellow-radio"
                    className="ms-2 text-xl cursor-pointer font-semibold text-yellow-600">
                    HalfDay
                  </label>
                </div>

                <div className="flex items-center my-2">
                  <input
                    id="yellow-radio"
                    type="radio"
                    value="holiday"
                    name="colored-radio"
                    checked={attendanceStatus === 'holiday'}
                    onChange={() => setAttendanceStatus('holiday')}
                    className="w-5 h-5 cursor-pointer text-teal-400 bg-teal-200 border-teal-700 focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-teal-800 focus:ring-2"
                  />
                  <label
                    htmlFor="yellow-radio"
                    className="ms-2 text-xl cursor-pointer font-semibold text-teal-600 ">
                    Holiday
                  </label>
                </div>
              </div>
              
              <div className='text-center my-8 mx-4 flex justify-start'>
                <button className='text-white cursor-pointer  bg-gradient-to-r from-green-600 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-base px-3 py-0.5 text-center me-2 mb-2"' onClick={handleToggleAttendance}>Submit</button>
              </div>
            </div>
            <LeaveApplication/>
            </div>
          </div>
          
        </div>
        {/* <div className="container-fluid flex justify-center p-2  border-dashed rounded-lg  bg-slate-200">
          Balance:
        </div> */}
      </div>
      <div>
      </div>
    </section>
  );
}

export default AddAttendance;
