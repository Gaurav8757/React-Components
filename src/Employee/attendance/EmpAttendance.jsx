import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../../../public/EmpAttendance.css';

function EmpAttendance() {
  const [value, onChange] = useState(new Date());
  const [APIData, setAPIData] = useState([]);

  const tileClassName = ({ date }) => {
    const currentDate = new Date();
    const isCurrentDate =
      date.getDate() === currentDate.getDate() &&
      date.getMonth() === currentDate.getMonth() &&
      date.getFullYear() === currentDate.getFullYear();

    let classNames = '';

    if (isCurrentDate) {
      classNames += 'current-day ';
    }

    const statusForDate = getAttendanceStatusForDateSync(date);

    if (statusForDate) {
      if (statusForDate === 'present') {
        classNames += 'present-day ';
      } else if (statusForDate === 'absent') {
        classNames += 'absent-day ';
      } else if (statusForDate === 'holiday') {
        classNames += 'holiday-day ';
      } else {
        classNames += 'white'; // Default class for other cases
      }
    }
    return classNames.trim();
  };

  const getAttendanceStatusForDateSync = (selectedDate) => {
    const formattedSelectedDate = getCurrentDateAndTime(selectedDate);
     // Format selectedDate to match API data
    
    const attendanceData = APIData.find((data) => {
      //const dataDate = new Date(data.date).toDateString(); // Format API date for comparison
      // console.log(data.date);
      // console.log(formattedSelectedDate);
      return data.date === formattedSelectedDate;
    
    });
    console.log(attendanceData);
    return attendanceData ? attendanceData.status : null;
  };
  const getCurrentDateAndTime = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(new Date());
    return formattedDate;
  };


  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const id = sessionStorage.getItem('employeeId');
    if (!token) {
      toast.error('Not Authorized yet.. Try again! ');
    } else {
      axios
        .get(`https://eleedomimf.onrender.com/employee/emp/attendance/${id}`, {
          headers: {
            Authorization: `${token}`,
          },
        })
        .then((response) => {
          setAPIData(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  return (
    <section className="container-fluid emp-attendance-container relative h-screen p-0 sm:ml-64 bg-white">
      <div className="container-fluid flex justify-center p-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 bg-slate-50">
        <div className="w-full ">
          <h1 className="text-3xl tracking-wider font-medium p-4">Attendance</h1>
          <Calendar
            onChange={onChange}
            value={value}
            tileClassName={tileClassName}
            prevLabel="Prev Month"
            nextLabel="Next Month"
            next2Label="Next Year"
            prev2Label="Prev Year"
            className="max-w-screen"
            defaultView="month"
          />
        </div>
      </div>
    </section>
  );
}

export default EmpAttendance;
