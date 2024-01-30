import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import './EmpAttendance.css';
import axios from 'axios';

function EmpAttendance() {
  const [value, onChange] = useState(new Date());
  const [attendanceStatus, setAttendanceStatus] = useState(null);
  const apiEndpoint = 'https://eleedomimf.onrender.com/employee/attendance';

  useEffect(() => {
    getAttendanceStatusForDate();
  }, );

  const tileClassName = ({ date }) => {
    const currentDate = new Date();
    const isPastDate = date < currentDate;
    const isCurrentDate = date.getDate() === currentDate.getDate() && date.getMonth() === currentDate.getMonth() && date.getFullYear() === currentDate.getFullYear();

    let classNames = '';

    if (isCurrentDate) {
      classNames += 'present-day';
    } else if (isPastDate) {
      const status = getAttendanceStatusForDateSync(date);
      if (status) {
        classNames += ` ${status.toLowerCase()}-day`;
      }
    }

    return classNames.trim();
  };

  const tileContent = () => {
    if (attendanceStatus !== null) {
      return attendanceStatus;
    }

    return null;
  };

  const getAttendanceStatusForDate = async () => {
    try {
      const response = await axios.get(apiEndpoint, {
        params: {
          date: value.toISOString(),
        },
      });

      const fetchedAttendanceStatus = response.data.status;

      setAttendanceStatus(() => {
        switch (fetchedAttendanceStatus) {
          case 'present':
            return ' P';
          case 'absent':
            return ' A';
          case 'halfday':
            return ' H';
          case 'holiday':
            return ' Holiday';
          default:
            return null;
        }
      });
    } catch (error) {
      console.error('Error fetching attendance data:', error);
      setAttendanceStatus(null);
    }
  };

  // Synchronous version for tileClassName
  const getAttendanceStatusForDateSync = () => {
    // Implement synchronous logic to get attendance status for a given date
    return 'present', 'absent', 'halfday', 'holiday', null
    // return null;
  };

  const markAttendance = async (status) => {
    try {
      const response = await axios.post(apiEndpoint, {
        date: value,
        status,
      });

      console.log(`Attendance marked as ${status} successfully:`, response.data);

      getAttendanceStatusForDate();
    } catch (error) {
      console.error('Error marking attendance:', error);
    }
  };

  return (
    <section className="container-fluid relative h-screen p-0 sm:ml-64 bg-white">
      <div
        className="container-fluid flex justify-center p-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 bg-slate-50"
       
      >
        {/* <div className="inline-block min-w-full w-full py-0 sm:px-6 lg:px-8"> */}
        <div className='w-full '>
          <h1 className='text-3xl tracking-wider font-medium p-4'>Attendance</h1>
          <Calendar
            onChange={onChange}
            value={value}
            tileClassName={tileClassName}
            tileContent={tileContent}
            prevLabel = "Prev Month"
            nextLabel = "Next Month"
            next2Label = "Next Year"
            prev2Label = "Prev Year"
            className="  max-w-screen"
            defaultView	= "month"
            
          />
          <div>
            <button onClick={() => markAttendance('present')}>Mark Present</button>
            <button onClick={() => markAttendance('absent')}>Mark Absent</button>
            <button onClick={() => markAttendance('halfday')}>Mark Half Day</button>
            <button onClick={() => markAttendance('holiday')}>Mark Holiday</button>
          </div>
        </div>
      </div>
      {/* </div> */}
    </section>
  );
}

export default EmpAttendance;