import axios from "axios";
import { toast } from "react-toastify";
import TextLoader from "../../loader/TextLoader.jsx";
import { useState, useEffect } from 'react';
import VITE_DATA from "../../config/config.jsx";
const LeaveApproval = () => {
    const [APIData, setAPIData] = useState([]);
    const [pendingApproval, setPendingApproval] = useState({});
    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            toast.error("You were not authorized to get data. Please check again.");
        } else {
            axios
                .get(`${VITE_DATA}/api/employee-list`, {
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

    const handleInputChange = (e, empId, leaveId) => {
        const { name, value } = e.target;
        const updatedAPIData = APIData.map(emp => ({
            ...emp,
            leaveDetails: emp.leaveDetails.map(leave => {
                if (leave._id === leaveId) {
                    return {
                        ...leave,
                        [name]: value
                    };
                }
                return leave;
            })
        }));
        setAPIData(updatedAPIData);

        // Update pending approval state
        setPendingApproval(prevState => ({
            ...prevState,
            [leaveId]: {
                ...prevState[leaveId],
                [name]: value,
                empId: empId
            }
        }));
        // Check if both status and remarks are set
        const pendingLeave = pendingApproval[leaveId] || {};
        if ((name === "status" ) || (name === "remarks" )) {
            handleApproval(empId, leaveId, name === "status" ? value : pendingLeave.status, name === "remarks" ? value : pendingLeave.remarks);
        }
    };

    const handleApproval = async (empId, leaveId, status, remarks) => {
        try {
            const token = sessionStorage.getItem("token");
            if (!token) {
                toast.error("You were not authorized to perform this action. Please check again.");
                return;
            }
           
            const response = await axios.put(`${VITE_DATA}/employee/${empId}/leave/${leaveId}`, {
                status: status,
                remarks: remarks
            }, {
                headers: {
                    Authorization: `${token}`,
                },
            });
            // Determine the toast message based on the status
            const message = status === 'approved' ?
                `${response.data.empname} (${response.data.leaveDetail.dateRange.startDate} - ${response.data.leaveDetail.dateRange.endDate}) ${response.data.message}` :
                `${response.data.empname} (${response.data.leaveDetail.dateRange.startDate} - ${response.data.leaveDetail.dateRange.endDate}) ${response.data.message}`;

            // Display appropriate toast message
            if (status === 'approved') {
                toast.success(message);
            } else if (status === 'rejected') {
                toast.error(message);
            }
        } catch (error) {
            toast.error(`${error}`)
            console.error('Error updating status:', error);
        }
    };



    return (
        <section className="container-fluid relative p-0 sm:ml-64 bg-orange-50">
            <div className="container-fluid items-center pt-2 px-2 border-gray-200 border-dashed rounded bg-orange-100">
                <h1 className='text-xl xl:text-2xl lg:text-2xl tracking-wide py-2 text-center uppercase font-medium text-orange-700'>Leave History</h1>
                {APIData.length === 0 ? (<TextLoader />):(<>   {APIData.map((data) =>
                    data.leaveDetails.map((leave) => (
                        <div key={leave._id} className="w-full max-w-auto px-4 py-4 mb-5 text-gray-900 bg-orange-500 rounded shadow-2xl shadow-yellow-700 bg-blend-saturation">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center whitespace-nowrap text-white bg-[#050708]/20 focus:ring-[#050708]/20 text-xs lg:text-sm sm:text-xs rounded px-2 py-1 text-center">
                                    <span className="font-semibold text-black me-1">EMP ID:</span>
                                    <span className="font-semibold text-gray-50">{data.empid}</span>
                                </div>
                                <div className="flex items-center whitespace-nowrap text-white bg-[#050708]/20 focus:ring-[#050708]/20 text-xs lg:text-sm sm:text-xs rounded px-2 py-1 text-center">
                                    <span className="font-semibold text-black me-1">Name:</span>
                                    <span className="font-semibold text-gray-50">{data.empname}</span>
                                </div>
                                <div className="hidden items-center whitespace-nowrap sm:hidden md:flex lg:flex xl:flex text-white bg-[#050708]/20 focus:ring-[#050708]/20 text-xs lg:text-sm sm:text-xs rounded px-2 py-1 text-center">
                                    <span className="font-semibold text-black me-1">Branch:</span>
                                    <span className="font-semibold text-gray-50">{data.empbranch}</span>
                                </div>
                                <div className="flex items-center whitespace-nowrap text-white bg-[#050708]/20 focus:ring-[#050708]/20 text-xs lg:text-sm sm:text-xs rounded px-2 py-1 text-center">
                                    <span className="font-semibold text-black me-1">Mobile No.:</span>
                                    <span className="font-semibold text-gray-50">{data.empmobile}</span>
                                </div>
                                <div className="hidden items-center whitespace-nowrap sm:hidden md:hidden lg:flex xl:flex text-white bg-[#050708]/20 focus:ring-[#050708]/20 text-xs lg:text-sm sm:text-xs rounded px-2 py-1 text-center">
                                    <span className="font-semibold text-black me-1">Email:</span>
                                    <span className="font-semibold text-gray-50">{data.empemail}</span>
                                </div>
                                <div className="hidden items-center whitespace-nowrap sm:hidden md:hidden lg:hidden xl:flex text-white bg-[#050708]/20 focus:ring-[#050708]/20 text-xs lg:text-sm sm:text-xs rounded px-2 py-1 text-center">
                                    <span className="font-semibold text-black me-1">Designation:</span>
                                    <span className="font-semibold text-gray-50">{data.staffType}</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                                <div className="flex items-center whitespace-nowrap  text-white bg-[#050708]/20 focus:ring-[#050708]/20 text-xs lg:text-sm sm:text-xs rounded px-2 py-1 text-center">
                                    <span className="font-semibold text-black me-1">Applied Date:</span>
                                    <span className="font-semibold text-gray-50">{leave.applyDate}</span>
                                </div>
                                <div className="flex items-center text-white bg-[#050708]/20 focus:ring-[#050708]/20 text-xs lg:text-sm sm:text-xs rounded px-2 py-1 text-center">
                                    <span className="font-semibold text-black me-1">Applied Time:</span>
                                    <span className="font-semibold text-gray-50">{leave.applytime}</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-7 gap-8 mt-4">
                                <div className="flex flex-col items-center">
                                    <span className="mb-2 text-xs xl:text-xl lg:text-sm sm:text-sm font-semibold text-gray-50">From</span>
                                    <span className="text-xs xl:text-xl lg:text-sm sm:text-xs font-semibold text-black">{leave.dateRange.startDate}</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="mb-2 text-xs xl:text-xl lg:text-sm sm:text-sm font-semibold text-gray-50">To</span>
                                    <span className="text-xs xl:text-xl lg:text-sm sm:text-xs font-semibold text-black">{leave.dateRange.endDate}</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="mb-2 text-xs xl:text-xl lg:text-sm sm:text-sm whitespace-nowrap font-semibold text-gray-50">Leave Type</span>
                                    <span className="text-xs xl:text-xl lg:text-sm sm:text-xs font-semibold text-black">{leave.leavetype}</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="mb-2 text-xs xl:text-xl lg:text-sm sm:text-sm whitespace-nowrap font-semibold text-gray-50">No. of Days</span>
                                    <span className="text-xs xl:text-xl lg:text-sm sm:text-xs font-semibold text-black">{leave.counts}</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="mb-2 text-xs xl:text-xl lg:text-sm sm:text-sm font-semibold text-gray-50">Reason</span>
                                    <span className="text-xs xl:text-base lg:text-sm sm:text-xs font-semibold text-black">{leave.reasonForLeave}</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span htmlFor="Rem" className="mb-2 text-xs xl:text-xl lg:text-sm sm:text-sm font-semibold text-gray-50">Remarks</span>
                                    <textarea type="text" rows="1" name="remarks" id="Rem" value={leave.remarks || ''} onChange={(e) => handleInputChange(e, data._id, leave._id, leave.status)} className="xl:w-36 lg:w-32 md:w-28 sm:w-20 w-16  text-start  text-xs xl:text-base lg:text-sm sm:text-xs  font-semibold text-black rounded overflow-hidden bg-orange-200 border-hidden " />
                                </div>
                                <div className="flex flex-col items-center">
                                    <span htmlFor="stat" className="mb-2 text-xs xl:text-xl lg:text-sm sm:text-sm font-semibold text-gray-50">Status</span>
                                    <select name="status" id="stat" value={leave.status || ''} onChange={(e) => handleInputChange(e, data._id, leave._id, leave.remarks)} className="p-1 xl:w-32 cursor-pointer lg:w-32 md:w-16 sm:w-14 w-12 text-start  text-xs xl:text-base lg:text-sm sm:text-xs  font-semibold text-black rounded overflow-hidden ps-1 bg-orange-200 border-hidden">
                                        <option value="" className="">Select Status</option>
                                        <option value="approved" className="font-bold text-green-700 hover:cursor-pointer">Approve</option>
                                        <option value="rejected" className="font-bold text-red-700 cursor-pointer">Reject</option>
                                    </select>
                                </div>
                                {/* <div className="flex flex-col items-center">
                                <span htmlFor="stat" className="mb-2 text-xs xl:text-xl lg:text-sm sm:text-sm font-semibold text-gray-50">Status</span>
                                <button onClick={() => handleApproval(data._id, leave._id, leave.status, leave.remarks)} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                                        Submit
                                    </button>
                                </div> */}
                            </div>
                        </div>
                    ))
                )} </> )}
            </div>

        </section>

    );
};

export default LeaveApproval;
