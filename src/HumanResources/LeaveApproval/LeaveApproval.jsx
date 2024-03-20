/* eslint-disable react/prop-types */
// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { toast } from "react-toastify";

// // const LeaveApproval = () => {
// //     const [APIData, setAPIData] = useState([]);
// //     const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
// //     const [selectedLeaveRequestId, setSelectedLeaveRequestId] = useState(null);
// //     const [selectedAction, setSelectedAction] = useState('');

// //     useEffect(() => {
// //         const token = sessionStorage.getItem("token");
// //         if (!token) {
// //             toast.error("You were not authorized to get data. Please check again.");
// //         } else {
// //             axios
// //                 .get(`https://eleedomimf.onrender.com/api/employee-list`, {
// //                     headers: {
// //                         Authorization: `${token}`,
// //                     },
// //                 })
// //                 .then((response) => {
// //                     setAPIData(response.data);
// //                 })
// //                 .catch((error) => {
// //                     console.error(error);
// //                 });
// //         }
// //     }, []);

// //     const handleSelectChange = (e, empid, leaveRequestId) => {
// //         setSelectedAction(e.target.value);
// //         setSelectedEmployeeId(empid);
// //         setSelectedLeaveRequestId(leaveRequestId);
// //     };

// //     const handleStatusUpdate = () => {
// //         if (!selectedAction || !selectedLeaveRequestId || !selectedEmployeeId) {
// //             toast.error("Please select an action and a leave request to update.");
// //             return;
// //         }

// //         axios.put(`https://eleedomimf.onrender.com/api/emp/update/${selectedEmployeeId}`, {
// //             leaveRequestId: selectedLeaveRequestId,
// //             status: selectedAction
// //         })
// //         .then(() => {
// //             updateLocalData(selectedEmployeeId, selectedLeaveRequestId, selectedAction);
// //             toast.success(`Leave status updated successfully.`);
// //         })
// //         .catch((error) => {
// //             console.error(error);
// //             toast.error("Failed to update leave status. Please try again.");
// //         });
// //     };

// //     const updateLocalData = (empId, requestId, status) => {
// //         setAPIData(prevData => {
// //             return prevData.map(data => {
// //                 if (data._id === empId) {
// //                     const updatedLeaveDetails = data.leaveDetails.map(leave => {
// //                         if (leave._id === requestId) {
// //                             return {
// //                                 ...leave,
// //                                 status: status
// //                             };
// //                         }
// //                         return leave;
// //                     });
// //                     return {
// //                         ...data,
// //                         leaveDetails: updatedLeaveDetails
// //                     };
// //                 }
// //                 return data;
// //             });
// //         });
// //     };

// //     return (
// //         <section className="container-fluid relative h-screen p-0 sm:ml-64 bg-slate-200">
// //             <div className="container-fluid flex justify-center p-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 bg-slate-200">
// //                 <div className="inline-block min-w-full w-full py-0">
// //                     <div className="overflow-x-none w-xl flex mt-2 text-blue-500">
// //                         <h1 className="flex justify-center text-3xl w-full font-semibold">Leave Approval Of Employees</h1>
// //                         <button className="absolute top-2 right-1">
// //                             <img src="/excel.png" alt="download" className="w-12" />
// //                         </button>
// //                     </div>

// //                     <table className="min-w-full text-center text-sm font-light table bg-slate-200 mt-5 z-100">
// //                         <thead className="border-b font-medium bg-slate-200 border border-black sticky top-16">
// //                             <tr className="text-blue-700 sticky top-16 border border-black">
// //                                 <th scope="col" className="px-1 py-0 border border-black">
// //                                     Employee ID
// //                                 </th>
// //                                 <th scope="col" className="px-1 py-0 border border-black sticky">
// //                                     Employee Name
// //                                 </th>
// //                                 <th scope="col" className="px-1 py-0 border border-black sticky">
// //                                     Email ID
// //                                 </th>
// //                                 <th scope="col" className="px-1 py-0 border border-black sticky">
// //                                     Start Date
// //                                 </th>
// //                                 <th scope="col" className="px-1 py-0 border border-black sticky">
// //                                     End Date
// //                                 </th>
// //                                 <th scope="col" className="px-1 py-0 border border-black sticky">
// //                                     No. of Days
// //                                 </th>
// //                                 <th scope="col" className="px-1 py-0 border border-black sticky">
// //                                     Reason for Leave
// //                                 </th>
// //                                 <th scope="col" className="px-1 py-0 border border-black sticky">
// //                                     Status
// //                                 </th>
// //                                 <th scope="col" className="px-1 py-0 border border-black sticky">
// //                                     Actions
// //                                 </th>
// //                             </tr>
// //                         </thead>
// //                         <tbody className="divide-y divide-gray-200 overflow-y-hidden ">
// //                             {APIData.map((data) => (
// //                                 <tr className=":border-neutral-200 text-sm font-medium" key={data.id}>
// //                                     <td className="px-1 py-0 border border-black">{data.empid}</td>
// //                                     <td className="px-1 py-0 whitespace-nowrap border border-black">{data.empname}</td>
// //                                     <td className="px-1 py-0 border border-black">{data.empemail}</td>
// //                                     {data.leaveDetails &&
// //                                         data.leaveDetails.map((info) => (
// //                                             <React.Fragment key={info._id}>
// //                                                 {info.status && (
// //                                                     <>
// //                                                         <td className="px-1 py-0 whitespace-nowrap border border-black">
// //                                                             {info.dateRange.startDate}
// //                                                         </td>
// //                                                         <td className="px-1 py-0 border border-black">
// //                                                             {info.dateRange.endDate}
// //                                                         </td>
// //                                                         <td className="px-1 py-0 border border-black">{info.counts}</td>
// //                                                         <td className="px-1 py-0 border border-black">{info.reasonForLeave}</td>
// //                                                         <td className="px-1 py-0 border border-black">{info.status}</td>
// //                                                         <td className="px-1 py-0 border border-black">
// //                                                             <select
// //                                                                 value={selectedAction}
// //                                                                 onChange={(e) => handleSelectChange(e, data._id, info._id)}
// //                                                             >
// //                                                                 <option value="">Select Action</option>
// //                                                                 <option value="approved">Approve</option>
// //                                                                 <option value="rejected">Reject</option>
// //                                                             </select>
// //                                                         </td>
// //                                                     </>
// //                                                 )}
// //                                             </React.Fragment>
// //                                         ))}
// //                                 </tr>
// //                             ))}
// //                         </tbody>
// //                     </table>

// //                     {selectedEmployeeId && selectedLeaveRequestId && (
// //                         <div className="flex justify-center mt-4">
// //                             <button
// //                                 className="bg-blue-500 text-white px-4 py-2 rounded-md"
// //                                 onClick={handleStatusUpdate}
// //                             >
// //                                 Update Status
// //                             </button>
// //                         </div>
// //                     )}
// //                 </div>
// //             </div>
// //         </section>
// //     );
// // };

// // export default LeaveApproval;

// import  { useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast } from "react-toastify";

// const LeaveApproval = () => {
//     const [APIData, setAPIData] = useState([]);
//     const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
//     const [selectedLeaveRequestId, setSelectedLeaveRequestId] = useState(null);
//     const [selectedAction, setSelectedAction] = useState('');

//     useEffect(() => {
//         const token = sessionStorage.getItem("token");
//         if (!token) {
//             toast.error("You were not authorized to get data. Please check again.");
//         } else {
//             axios
//                 .get(`https://eleedomimf.onrender.com/api/employee-list`, {
//                     headers: {
//                         Authorization: `${token}`,
//                     },
//                 })
//                 .then((response) => {
//                     setAPIData(response.data);
//                 })
//                 .catch((error) => {
//                     console.error(error);
//                 });
//         }
//     }, []);

//     const handleSelectChange = (e, empid, leaveRequestId) => {
//         setSelectedAction(e.target.value);
//         setSelectedEmployeeId(empid);
//         setSelectedLeaveRequestId(leaveRequestId);
//     };

//     const handleStatusUpdate = () => {
//         if (!selectedAction || !selectedLeaveRequestId || !selectedEmployeeId) {
//             toast.error("Please select an action and a leave request to update.");
//             return;
//         }

//         axios.put(`https://eleedomimf.onrender.com/api/emp/update/${selectedEmployeeId}`, {
//             leaveRequestId: selectedLeaveRequestId,
//             status: selectedAction
//         })
//         .then(() => {
//             updateLocalData(selectedEmployeeId, selectedLeaveRequestId, selectedAction);
//             toast.success(`Leave status updated successfully.`);
//         })
//         .catch((error) => {
//             console.error(error);
//             toast.error("Failed to update leave status. Please try again.");
//         });
//     };

//     const updateLocalData = (empId, requestId, status) => {
//         setAPIData(prevData => {
//             return prevData.map(data => {
//                 if (data._id === empId) {
//                     const updatedLeaveDetails = data.leaveDetails.map(leave => {
//                         if (leave._id === requestId) {
//                             return {
//                                 ...leave,
//                                 status: status
//                             };
//                         }
//                         return leave;
//                     });
//                     return {
//                         ...data,
//                         leaveDetails: updatedLeaveDetails
//                     };
//                 }
//                 return data;
//             });
//         });
//     };

//     return (
//         <section className="container-fluid relative h-screen p-0 sm:ml-64 bg-white">
//             <div className="container-fluid flex justify-center p-2 border-gray-200 border-dashed rounded-lg  bg-white">
//                 <div className="inline-block min-w-full w-full py-0">
//                     <div className="overflow-x-none w-xl flex mt-2 text-blue-500">
//                         <h1 className="flex justify-center text-3xl w-full font-semibold">Leave Approval Of Employees</h1>
//                         <button className="absolute top-2 right-1">
//                             <img src="/excel.png" alt="download" className="w-12" />
//                         </button>
//                     </div>

//                     {APIData.map((employee) => (
//                         <div key={employee._id} className="shadow-2xl bg-cyan-700 text-white rounded-md leading-loose p-4 my-4">
//                              <p className="text-lg text-start leading-loose "><span className='font-semibold'>Employee ID:</span> {employee.empid}</p>
//                             <p className="text-lg text-start leading-loose "><span className='font-semibold'>Employee Name: </span>{ employee.empname}</p>
//                             <p className="text-lg text-start leading-loose "><span className='font-semibold'>Email ID:</span> {employee.empemail}</p>
//                             {employee.leaveDetails.map((leave) => (
//                                 <div key={leave._id} className="border border-gray-300 rounded-md p-4 my-4">
//                                     <p><strong>Start Date:</strong> {leave.dateRange.startDate}</p>
//                                     <p><strong>End Date:</strong> {leave.dateRange.endDate}</p>
//                                     <p><strong>Reason for Leave:</strong> {leave.reasonForLeave}</p>
//                                     <p><strong>Status:</strong> {leave.status}</p>
//                                     <div>
//                                         <select
//                                             value={selectedAction}
//                                             onChange={(e) => handleSelectChange(e, employee._id, leave._id)}
//                                         >
//                                             <option value="">Select Action</option>
//                                             <option value="approved">Approve</option>
//                                             <option value="rejected">Reject</option>
//                                         </select>
//                                         <button
//                                             className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2"
//                                             onClick={handleStatusUpdate}
//                                         >
//                                             Update Status
//                                         </button>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     ))}

//                 </div>
//             </div>
//         </section>
//     );
// };

// export default LeaveApproval;



import axios from "axios";
import { toast } from "react-toastify";
import LeaveDetailsPopup from "./LeaveDetailsPopup.jsx";
import { useState, useEffect } from 'react';
const LeaveApproval = () => {
    const [APIData, setAPIData] = useState([]);
    

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            toast.error("You were not authorized to get data. Please check again.");
        } else {
            axios
                .get(`https://eleedomimf.onrender.com/api/employee-list`, {
                    headers: {
                        Authorization: `${token}`,
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

     // refreshing page after updating data
     const onUpdateLeave = async () => {
        try {
            const token = sessionStorage.getItem("token");

            if (!token) {
                toast.error("Not Authorized Data yet.. Try again!");
            } else {
                const response = await axios.get(
                    `https://eleedomimf.onrender.com/api/employee-list`,
                    {
                        headers: {
                            Authorization: `${token}`,
                        },
                    }
                );
                setAPIData(response.data);
            }
        } catch (error) {
            console.error("Error fetching updated Leave data:", error);
        }
    };

    return (
        <section className="container-fluid relative h-screen p-0 sm:ml-64 bg-white">
            <div className="container-fluid  justify-center p-2 border-gray-200 border-dashed rounded-lg bg-white">
                <div className="overflow-x-none w-xl flex mt-2 text-blue-500">
                    <h1 className="flex justify-center text-3xl w-full font-semibold">Leave Approval Of Employees</h1>
                    <button className="absolute top-2 right-1">
                        <img src="/excel.png" alt="download" className="w-12" />                    
                    </button>
                </div>
                <div className="inline-block min-w-full w-full py-0">
                    {APIData.map((employee) => (
                        <div key={employee._id} className="shadow-2xl flex  justify-between  bg-cyan-700 text-white rounded-md leading-loose p-4 my-4">
                            <div>
                                <p className="text-lg text-start leading-loose "><span className='font-semibold'>Employee ID:</span> {employee.empid}</p>
                                <p className="text-lg text-start leading-loose "><span className='font-semibold'>Employee Name: </span>{employee.empname}</p>
                                <p className="text-lg text-start leading-loose "><span className='font-semibold'>Email ID:</span> {employee.empemail}</p>
                            </div>
                            <div className="text-center my-auto"> 
                                <LeaveDetailsPopup leaveDetails={employee.leaveDetails} onUpdate={onUpdateLeave}/>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LeaveApproval;
