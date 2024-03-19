import axios from 'axios';
import { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format, differenceInDays } from 'date-fns';
import { toast } from "react-toastify";
function LeaveApplication() {
  const employeeId = sessionStorage.getItem('employeeId');
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(false);
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
      setLoading(true); // Set loading to true when submitting

      if (dateRange[0].startDate && dateRange[0].endDate) {
        const startDateFormatted = format(dateRange[0].startDate, 'dd/MM/yyyy');
        const endDateFormatted = format(dateRange[0].endDate, 'dd/MM/yyyy');
        const reason = document.getElementById('message').value;
  
        const daysCount = differenceInDays(dateRange[0].endDate, dateRange[0].startDate) + 1;
        console.log(daysCount);
        // Fetch current leave details
        const response = await axios.get(`https://eleedomimf.onrender.com/api/employee/${employeeId}`);
        const currentLeaveDetails = response.data.leaveDetails;
  
        // Append new leave application to current leave details
        const updatedLeaveDetails = [
          ...currentLeaveDetails,
          {
            dateRange: {
              startDate: startDateFormatted,
              endDate: endDateFormatted
            },
            reasonForLeave: reason,
            status: status,
            counts: daysCount,
          }
        ];
  
        // Send updated leave details to backend
        await axios.put(`https://eleedomimf.onrender.com/api/emp/update/${employeeId}`, { leaveDetails: updatedLeaveDetails });
  
        toast.success('Leave application Submitted Successfully.');
        document.getElementById('message').value = '';
        // setDateRange("");
        setLoading(false);
        
      } else {
        toast.warn('Please Select Start and End Dates.');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error submitting leave application', error);
      toast.error('Error Submitting Leave Application. Please Try Again.....!');
      setLoading(false);
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
      <button className="text-white cursor-pointer mt-4 bg-gradient-to-r from-blue-500 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-3 py-2 text-center"   onClick={() => { setStatus(status); handleSubmit(); }}>{loading ? "Submitting..." : status ? "Leave submitted" : "Submit"}</button>
    </div>
  )
}

export default LeaveApplication;
