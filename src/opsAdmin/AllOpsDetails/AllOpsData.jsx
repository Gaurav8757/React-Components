/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
// import Pagination from 'rc-pagination';
import axios from 'axios';
function AllOpsData({ data, policy }) {
    const [status, setStatus] = useState("");
    const [staffName, setStaffName] = useState("");
    const [employee_id, setEmployeeId] = useState("");
    const [staffId, setStaffId] = useState("");
    const [sendStaffId, setSendStaffId] = useState(null);
    const [currentTime, setCurrentTime] = useState(getFormattedTime());
   
   


    function getFormattedTime() {
        const date = new Date();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format
        const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
        return `${formattedHours}:${formattedMinutes} ${ampm}`;
      }

     

      useEffect(() => {
        const intervalId = setInterval(() => {
          setCurrentTime(getFormattedTime());
        }, 1000); // Update every second
    
        // Clean up interval on component unmount
        return () => clearInterval(intervalId);
      }, []); // Empty dependency array ensures effect runs only once on mount
    // popup
    const staffSend = (_id) => {
        setSendStaffId(_id);
        setStatus("Sent");
    };
    const allDetails = {
        staffName,
        employee_id,
        status,
        currentTime
    }
    const updateAPI = async () => {
        try {
            const resp = await axios.put(`https://eleedomimf.onrender.com/alldetails/updatedata/${staffId}`, allDetails);
            toast.success(`${resp.data.status}${staffName}`);    
        } catch (error) {
            toast.error(`${error.response.data.message}`)
            console.error("Error updating insurance details:", error);
        }finally{
            policy();
        }
    };
    return (
        <tr
            className="divide-y text-sm font-medium border border-black">
            <td className="whitespace-nowrap px-1  border border-black">
                {data._id}
            </td>
            <td className="whitespace-nowrap px-1 border border-black">
                {data.entryDate}
            </td>
            <td className="whitespace-nowrap px-1 border border-black">
                {data.branch}
            </td>
            <td className="whitespace-nowrap px-1 border border-black">
                {data.category}
            </td>
            <td className="whitespace-nowrap px-1 border border-black">
                {data.company}
            </td>
            <td className="whitespace-nowrap px-1 border border-black">
                {data.vehRegNo}
            </td>
            <td className="whitespace-nowrap px-1 border border-black">
                {data.segment}
            </td>
            <td className="whitespace-nowrap px-1 border border-black">
                {data.sourcing}
            </td>
            <td className="whitespace-nowrap px-1  border border-black">
                {data.hypo}
            </td>
            <td className="whitespace-nowrap px-1  border border-black">
                {data.contactNo}
            </td>
            <td className="whitespace-nowrap px-1  border border-black">
                {data.advisorName}
            </td>
            <td className="whitespace-nowrap px-1 border border-black">
                {data.subAdvisor}
            </td>
            <td className="whitespace-nowrap px-1  border border-black">
                {data.insuredName}
            </td>
            <td className="whitespace-nowrap px-1  border border-black">
                {data.policyType}
            </td>
            <td className="whitespace-nowrap px-1  border border-black">
                {data.policyNo}
            </td>
            <td className="whitespace-nowrap px-1  border border-black">
                {data.engNo}
            </td>
            <td className="whitespace-nowrap px-1  border border-black">
                {data.chsNo}
            </td>
            <td className="whitespace-nowrap px-1  border border-black">
                {data.odPremium}
            </td>
            <td className="whitespace-nowrap px-1  border border-black">
                {data.liabilityPremium}
            </td>
            <td className="whitespace-nowrap px-1  border border-black">
                {data.netPremium}
            </td>
            <td className="whitespace-nowrap px-1  border border-black">
                {data.finalEntryFields}
            </td>
            <td className="whitespace-nowrap px-1  border border-black">
                {data.odDiscount}
            </td>
            <td className="whitespace-nowrap px-1  border border-black">
                {data.ncb}
            </td>
            <td className="whitespace-nowrap px-1  border border-black">
                {data.policyMadeBy}
            </td>
            <td className={`whitespace-nowrap px-1  border border-black ${data.status === "Pending" ? "text-red-600 text-lg" : "text-green-600 text-lg font-bold"}`}>
                {data.status}
            </td>
            <td className="whitespace-nowrap px-1  border border-black">
            {data.currentTime}
            </td>
            <td className="whitespace-nowrap px-1  border border-black ">
                {data.staffName}
            </td>
            <td className="whitespace-wrap   border border-black ">
                <select
                    className="input-style rounded-lg cursor-pointer"
                    type="text"
                    name="staffName"
                    value={staffName}
                    onChange={(e) => {
                        setStaffName(e.target.value);
                        // set policy id for update
                        setStaffId(data._id);
                        // Find the selected employee by their name
                        const selectedEmployee = data.allpolicyemployee.find(emp => emp.empname === e.target.value);
                        // If the selected employee is found, set the staffId state to their _id
                        if (selectedEmployee) {
                            // set employee_id
                            setEmployeeId(selectedEmployee._id);
                        }
                    }}>
                    <option className="w-1" value="">--- Select ---</option>
                    {
                        data.allpolicyemployee
                            .filter(emp => emp.staffType === "OPS Executive" | emp.staffType === "OPS EXECUTIVE")
                            .map((emp) => (
                                <option key={emp._id} value={emp.empname}>
                                    {emp.empid} - {emp.empname}
                                </option>
                            ))
                    }

                </select>
            </td>
            <td className="whitespace-nowrap   border border-black">
                <button className='text-white mt-1 ml-1 bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2' onClick={staffSend}>Send</button>
            </td>  
           

            {/* <td className="whitespace-nowrap px-1  border border-black"> */}
                {sendStaffId && (
                    <div id="popup-modal" tabIndex="-1" className="fixed inset-0 flex items-center justify-center  bg-black bg-opacity-50">
                        <div className="bg-white rounded-lg  p-5">
                            <h2 className="text-lg font-semibold text-gray-800">{`Are you sure you want to send this policy to ${staffName} ?`}</h2>
                            <div className="flex justify-end mt-10">
                                <button onClick={() => { updateAPI(); setSendStaffId(null); }} className="text-white bg-green-600 hover:bg-green-800 focus:ring-1 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-base px-4 py-2 mr-2">
                                    Yes, I&apos;m sure
                                </button>
                                <button onClick={() => setSendStaffId(null)} className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-1 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-base font-medium px-4 py-2 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                                    No, cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
        </tr>
    )
}

export default AllOpsData;