
import{ useState } from 'react';
import LeaveApplication from '../../employee/LeaveApplication/LeaveApplication.jsx';
import { format } from 'date-fns';

const LeaveApproval = ()=> {
      const [selectedRange, setSelectedRange] = useState(null);
      const [approvalStatus, setApprovalStatus] = useState(null);
    
      const handleDateSelect = (range) => {
        setSelectedRange(range);
        setApprovalStatus(null); // Reset approval status when a new range is selected
      };
    
      const handleApproval = (isApproved) => {
        setApprovalStatus(isApproved);
      };
    
      return (
        <div className='sm:ml-64'>
          <h1>Leave Management System</h1>
          <h2>Employee</h2>
          <LeaveApplication handleDateSelect={handleDateSelect} />
          {selectedRange && (
            <div>
              <h3>HR Manager Approval</h3>
              <p>
                Selected Range: {format(selectedRange.startDate, 'dd/MM/yyyy')} -{' '}
                {format(selectedRange.endDate, 'dd/MM/yyyy')}
              </p>
              <button onClick={() => handleApproval(true)}>Approve</button>
              <button onClick={() => handleApproval(false)}>Reject</button>
            </div>
          )}
          {approvalStatus !== null && (
            <p>{approvalStatus ? 'Leave Approved' : 'Leave Rejected'}</p>
          )}
        </div>
      );
    };
    
    
    
export default LeaveApproval;