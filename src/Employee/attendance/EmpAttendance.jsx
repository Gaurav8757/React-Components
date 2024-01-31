import { useState } from 'react';
import Calendar from 'react-calendar';
import '../../../public/EmpAttendance.css';

function EmpAttendance() {
  const [value, onChange] = useState(new Date());

  const tileClassName = ({ date }) => {
    const currentDate = new Date();
    const isPastDate = date < currentDate;
    const isCurrentDate =
      date.getDate() === currentDate.getDate() &&
      date.getMonth() === currentDate.getMonth() &&
      date.getFullYear() === currentDate.getFullYear();

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
    // If needed, add logic to determine tile content
    return null;
  };

  const getAttendanceStatusForDateSync = () => {
    // Implement synchronous logic to get attendance status for a given date
    return 'present', 'absent', 'halfday', 'holiday', null;
    // return null;
  };

  return (
    <section className="container-fluid emp-attendance-container relative h-screen p-0 sm:ml-64 bg-white">
      <div className="container-fluid flex justify-center p-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 bg-slate-50">
        <div className='w-full '>
          <h1 className='text-3xl tracking-wider font-medium p-4'>Attendance</h1>
          <Calendar
            onChange={onChange}
            value={value}
            tileClassName={tileClassName}
            tileContent={tileContent}
            prevLabel="Prev Month"
            nextLabel="Next Month"
            next2Label="Next Year"
            prev2Label="Prev Year"
            className="  max-w-screen"
            defaultView="month"
          />
        </div>
      </div>
    </section>
  );
}

export default EmpAttendance;
