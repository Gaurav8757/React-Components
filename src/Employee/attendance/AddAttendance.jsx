import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';


const getCurrentDateAndTime = () => {
  const options = { weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(new Date());
  return formattedDate;
};

const formatDate = (dateTimeString) => {
  const date = new Date(dateTimeString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

const formatTime = (dateTimeString) => {
  const timePart = dateTimeString.split(' ')[2] + ' ' + dateTimeString.split(' ')[3];
  return timePart;
};

const formatWeekday = (dateTimeString) => {
  const weekdayPart = dateTimeString.split(',')[0];
  return weekdayPart;
};






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
      await axios.post(`https://eleedomimf.onrender.com/employee/mark/attendance/${empid}`, {
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
    }
  };
  const empnam = sessionStorage.getItem('name');
  return (
    <section className="container-fluid relative h-screen p-0 sm:ml-64 bg-slate-200">
      <div className="container-fluid flex justify-center p-2  border-dashed rounded-lg  bg-slate-200">
        <div className="inline-block min-w-full  w-full py-0 sm:px-5 lg:px-1">

          <h2 className="text-4xl tracking-wider font-medium">Mark Attendance</h2>
          
          <div className="overflow-x-auto   max-h-screen h-screen mt-6 bg-slate-200">
            <div className='flex justify-between'>
            <span className="text-start font-semibold text-2xl">
              Your Name: <span className="font-medium tracking-wide text-green-700">{empnam}</span>
            </span>
            <span className="text-start font-semibold text-2xl">Time: <span className='font-medium tracking-wide text-green-700 text-xl'> {ctime}</span> </span></div>



            
            <div className="mt-5 self-center ">
              <div className="flex flex-wrap">
                <div className="flex items-center me-10 ">
                  <h1 className='text-2xl tracking-wide font-medium text-blue-600 me-10'>Attendance Status:</h1>
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
                <div className="flex items-center me-10">
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
                    value="holiday"
                    name="colored-radio"
                    checked={attendanceStatus === 'holiday'}
                    onChange={() => setAttendanceStatus('holiday')}
                    className="w-5 h-5 cursor-pointer text-yellow-400 bg-yellow-200 border-yellow-700 focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-yellow-800 focus:ring-2"
                  />
                  <label
                    htmlFor="yellow-radio"
                    className="ms-2 text-xl cursor-pointer font-semibold text-yellow-600 "
                  >
                    Holiday
                  </label>
                </div>
              </div>
              <br />
              <div className='text-center'>
                <button className='text-white cursor-pointer  bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"' onClick={handleToggleAttendance}>Attendance</button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default AddAttendance;
