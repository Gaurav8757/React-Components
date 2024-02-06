import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import { toast } from 'react-toastify';
function HrAttendance() {
  const [value, onChange] = useState(new Date());
  const [attendanceStatus, setAttendanceStatus] = useState("");
  console.log(attendanceStatus);


  const tileClassName = ({ date }) => {
    let classNames = '';
    const statusForDate = getAttendanceStatusForDateSync(date);
    if (statusForDate) {
      if (statusForDate === 'present') {
        classNames += 'present-day';
      } else if (statusForDate === 'absent') {
        classNames += 'absent-day ';
      } else if (statusForDate === 'halfday') {
        classNames += 'half-day';
      } else if (statusForDate === 'holiday') {
        classNames += 'holi-day';
      }
      else {
        classNames += 'white'; // Default class for other cases
      }
    }
    return classNames.trim();
  };

  const getAttendanceStatusForDateSync = (selectedDate) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const formattedSelectedDate = selectedDate.toLocaleDateString('en-GB', options);
    const attendanceData = attendanceStatus.find((data) => {
      const dataDate = data.date.split('T')[0]; // Extract the date part from the API date
      return dataDate === formattedSelectedDate;
    });
    return attendanceData ? attendanceData.status : null;
  };

// 
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const id = sessionStorage.getItem('hrId');
    if (!token) {
      toast.error('Not Authorized yet.. Try again! ');
    } else {
      axios
        .get(`https://eleedomimf.onrender.com/hr/attendance/${id}`, {
          headers: {
            Authorization: `${token}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          setAttendanceStatus(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);


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
            prevLabel="Prev Month"
            nextLabel="Next Month"
            next2Label="Next Year"
            prev2Label="Prev Year"
            className="  max-w-screen"
            defaultView="month"
          />

        </div>
      </div>
      {/* </div> */}
    </section>
  );
}

export default HrAttendance;