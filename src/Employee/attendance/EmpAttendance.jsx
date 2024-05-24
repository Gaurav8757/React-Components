import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../../../public/EmpAttendance.css';
import VITE_DATA from '../../config/config.jsx';
function EmpAttendance() {
  const [value, onChange] = useState(new Date());
  const [APIData, setAPIData] = useState([]);
  const [presentDays, setPresentDays] = useState(0);
  const [absentDays, setAbsentDays] = useState(0);
  const [halfday, setHalfDay] = useState(0);
  const employeeId = sessionStorage.getItem('employeeId');
  const tileClassName = ({ date }) => {
    let classNames = '';
    const statusForDate = getAttendanceStatusForDateSync(date);
    
    if (statusForDate ) {
      
      if (statusForDate === 'present') {
        classNames += 'present-day';

      } else if (statusForDate === 'absent') {
        classNames += 'absent-day';
      } else if (statusForDate === 'halfday') {
        classNames += 'half-day';
      }else if (statusForDate === 'holiday') {
        classNames += 'holi-day';
      }
       else {
        classNames += 'default-class'; // Default class for other cases
      }
    }
    
    return classNames.trim();
  };

  const getAttendanceStatusForDateSync = (selectedDate) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const formattedSelectedDate = selectedDate.toLocaleDateString('en-GB', options);
    const attendanceData = APIData.find((data) => {
      const dataDate = data.date.split('T')[0]; // Extract the date part from the API date
      if (dataDate === formattedSelectedDate) {
        if (data.time && data.logouttime) {
          const startTime = new Date(`01/01/2000 ${data.time}`);
          const endTime = new Date(`01/01/2000 ${data.logouttime}`);
          const timeDifference = endTime.getTime() - startTime.getTime();
          const hours = Math.floor(timeDifference / (1000 * 60 * 60));
          const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
          return `Work: ${hours}hr : ${minutes}min`;
        } else {
          return data.status; // Return the status if time and logouttime are missing
        }
      }
      return null;
    });
  
    return attendanceData ? attendanceData.status  : null;
  };
  
  
  // const getTotalHoursForDate = (selectedDate) => {
  //   const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  //   const formattedSelectedDate = selectedDate.toLocaleDateString('en-GB', options);
  //   const attendanceData = APIData.find((data) => {
  //     const dataDate = data.date.split('T')[0];
  //     if (dataDate === formattedSelectedDate && data.time && data.logouttime) {
  //       const startTime = new Date(`01/01/2000 ${data.time}`);
  //       const endTime = new Date(`01/01/2000 ${data.logouttime}`);
  //       const timeDifference = endTime.getTime() - startTime.getTime();
  //       const hours = Math.floor(timeDifference / (1000 * 60 * 60));
  //       const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  //       return `Work: ${hours}hr : ${minutes}min`;
  //     }
  //     return null;
  //   });
  //   return attendanceData ? attendanceData.totalHours : null;
  // };

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    
    if (!token) {
      toast.error('Not Authorized yet.. Try again! ');
    } else {
      axios
        .get(`${VITE_DATA}/employee/emp/attendance/${employeeId}`, {
          headers: {
            Authorization: `${token}`,
          },
        })
        .then((response) => {
          setAPIData(response.data);
           // Calculate present and absent days
           let presentCount = 0;
           let absentCount = 0;
           let halfDayCount = 0;
           response.data.forEach((data) => {
           
            if (data.date) {
             if (data.status === 'present') {
               presentCount++;
             } else if (data.status === 'absent') {
               absentCount++;
             } else if(data.status === 'halfday'){
              halfDayCount++;
             }
        }});
           setPresentDays(presentCount);
           setAbsentDays(absentCount);
           setHalfDay(halfDayCount);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [employeeId]);

  return (
    <section className="container-fluid emp-attendance-container relative h-screen p-0 sm:ml-64 bg-white">
      <div className="container-fluid flex justify-center p-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 bg-slate-50">
        <div className="w-full ">
        <span className="text-3xl tracking-wider text-orange-700 font-medium p-4">Attendance</span>
        <div className='flex justify-start
        '>
        <div className='text-lg font-semibold text-orange-700'>
        Present Days: <span className='me-4 text-xl font-semibold text-green-600'> {presentDays}</span>
        Absent Days:   <span className='me-4 text-xl font-semibold text-red-600'>{absentDays} </span> 
        Half Day:     <span className='text-xl font-semibold text-yellow-600'>{halfday}</span>
            </div>
          </div>
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
