import axios from 'axios';
import { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from 'date-fns';

function LeaveApplication() {
  const employeeId = sessionStorage.getItem('employeeId');
  const [status, setStatus] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: 'selection',
    },
  ]);

  const handleSelect = (ranges) => {
    setDateRange([ranges.selection]);
  };

  const handleSubmit = async () => {
    try {
      if (dateRange[0].startDate && dateRange[0].endDate) {
        const startDateFormatted = format(dateRange[0].startDate, 'dd/MM/yyyy');
        const endDateFormatted = format(dateRange[0].endDate, 'dd/MM/yyyy');
        const reason = document.getElementById('message').value;

        const leaveData = {
          leaveDetails: [
            {
              dateRange: {
                startDate: startDateFormatted,
                endDate: endDateFormatted
              },
              reasonForLeave: reason,
              status: status
            }
          ]
        };

        await axios.put(`https://eleedomimf.onrender.com/api/emp/update/${employeeId}`, leaveData);
        
        alert('Leave application submitted successfully.');
      } else {
        alert('Please select start and end dates.');
      }
    } catch (error) {
      console.error('Error submitting leave application:', error);
      alert('Error submitting leave application. Please try again.');
    }
  };

  return (
    <div className='flex flex-col mt-8'>
      <div className='p-2 text-2xl text-blue-600 font-semibold '>
        Apply for Leave
      </div>
      <DateRangePicker
        className='flex'
        editableDateInputs={true}
        ranges={dateRange}
        onChange={handleSelect}
        moveRangeOnFirstSelection={true}
      />

      <div className='mt-4'>
        <label htmlFor="message" className="block mb-2 text-base text-start font-medium text-gray-900 ">Reason for Leave:</label>
        <textarea id="message" rows="4" className="block p-2.5 w-full text-base text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
      </div>
      <button className="text-white cursor-pointer mt-4 bg-gradient-to-r from-blue-500 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-3 py-2 text-center"   onClick={() => { setStatus(!status); handleSubmit(); }}>{status ? "Leave submitted" : "Submit"}</button>
    </div>
  )
}

export default LeaveApplication;
