import { useState, useEffect } from 'react';
import axios from 'axios';
import { format, differenceInDays } from 'date-fns';
import { toast } from "react-toastify";
import VITE_DATA from '../../config/config.jsx';

function LeaveApplication() {
  const employeeId = sessionStorage.getItem('employeeId');
  const [statusSubmitted, setStatusSubmitted] = useState(false);
  const [dayCounts, setDayCounts] = useState(0); // Initialize with 0
  const [leaveType, setLeaveType] = useState('');
  const [loading, setLoading] = useState(false);
  const [APIData, setAPIData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [restLeave, setRestLeave] = useState(0); // Initialize with 0
  const [reason, setReason] = useState('');

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      toast.error("Not Authorized yet.. Try again! ");
    } else {
      // Fetch leave types
      axios
        .get(`${VITE_DATA}/leave/type/show`, {
          headers: {
            Authorization: `${token}`, // Send the token in the Authorization header
          },
        })
        .then((response) => {
          setAPIData(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  const currentDate = new Date().toISOString().split('T')[0]; // Get current date in yyyy-MM-dd format

  // Function to handle changes in leave type selection
  const handleInputChanges = (e) => {
    const selectedType = e.target.value;
    setLeaveType(selectedType);

    // Find the selected leave type in the APIData array
    const selectedData = APIData.find(data => data.leavetype === selectedType);
    if (selectedData) {
      setRestLeave(selectedData.restleave);
    } else {
      setRestLeave(0); // Reset leave balance if leave type not found
    }
  };

  // Function to handle leave submission
  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (startDate && endDate && leaveType && reason) {
        const startDateFormatted = format(new Date(startDate), 'dd/MM/yyyy');
        const endDateFormatted = format(new Date(endDate), 'dd/MM/yyyy');

        const daysCount = differenceInDays(new Date(endDate), new Date(startDate)) + 1;
        setDayCounts(daysCount);

        // Check if rest leave for the selected leave type is zero
        if (restLeave === 0 || restLeave - daysCount < 0) {
          toast.warn('Your leave limit for this type has been reached.');
          setLoading(false);
          return;
        }
        const restleaveValue = restLeave - daysCount;
        // Set status to pending
        const status = "pending";

        // Fetch current leave details
        const response = await axios.get(`${VITE_DATA}/api/employee/${employeeId}`);
        const currentLeaveDetails = response.data.leaveDetails || [];

        // Append new leave application to current leave details
        const updatedLeaveDetails = [
          ...currentLeaveDetails,
          {
            dateRange: {
              startDate: startDateFormatted,
              endDate: endDateFormatted
            },
            leavetype: leaveType,
            restleave: restleaveValue, // Update rest leave
            reasonForLeave: reason,
            status: status,
            counts: daysCount,
          }
        ];
        // Send updated leave details to backend
        await axios.put(`${VITE_DATA}/api/emp/update/${employeeId}`, { leaveDetails: updatedLeaveDetails });
        toast.success('Leave application submitted successfully.');
        setStartDate('');
        setEndDate('');
        setLeaveType('');
        setReason('');
        setLoading(false);
        setStatusSubmitted(true);
      } else {
        toast.warn('Please fill in all fields.');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error submitting leave application', error);
      toast.error('Error submitting leave application. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col w-full flex-wrap sm:w-full lg:w-full xl:w-1/2 px-2'>
      <div className='flex justify-center text-center'>
        <h1 className='text-xl xl:text-2xl lg:text-2xl tracking-wide mb-4 text-start font-medium text-orange-700'>Leave Application</h1>
      </div>
      <div className='flex flex-nowrap flex-auto justify-between'>
        <div>
          <label className="text-base mx-1">From:</label>
          <input type="date" className="input-style p-1 rounded-lg" value={startDate} onChange={(e) => setStartDate(e.target.value)} min={currentDate} />
        </div>
        <div>
          <label className="text-base mx-1">To:</label>
          <input type="date" className="input-style p-1 rounded-lg" value={endDate} onChange={(e) => setEndDate(e.target.value)} min={currentDate}/>
        </div>
      </div>
      <div className='block w-auto '>
        <div className='flex justify-start text-start mt-5 mb-2'>
          <h1 className='text-base xl:text-base lg:text-base  tracking-wide  text-start font-medium text-orange-700'>Leave Balance:</h1>
        </div>

        <div className='flex justify-between'>
          <select className="input-style p-1 rounded-lg w-1/4" name='leavetype' value={leaveType} onChange={handleInputChanges}>
            <option value="">Select Leave Type</option>
            {APIData.map((data) => (
              <option key={data._id} value={data.leavetype}>{data.leavetype}</option>
            ))}
          </select>

          <div className='flex justify-end'>
            <label className="text-base mx-1 my-1">Leave Balance:</label>
            <input className="input-style w-1/2 p-1 rounded-lg" type="" value={restLeave} readOnly />
          </div>
        </div>

      </div>
      <div className='mt-4'>
        <label htmlFor="message" className="block mb-1 text-base text-start font-medium text-orange-700 ">Reason for Leave:</label>
        <textarea id="message" rows="4" className="block p-2.5 w-full text-base text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write your thoughts here..." value={reason} onChange={(e) => setReason(e.target.value)}></textarea>
      </div>
      <button className="text-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-10 duration-300 cursor-pointer mt-4 bg-orange-700 hover:bg-orange-600  focus:ring-1 focus:outline-none focus:ring-orange-300 font-medium rounded text-base px-3 py-2 text-center" onClick={handleSubmit}>{loading ? "Submitting..." : statusSubmitted ? "Leave submitted" : "Submit"}</button>
    </div>
  )
}

export default LeaveApplication;
