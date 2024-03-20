/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { CgCloseR } from "react-icons/cg";
import axios from 'axios';

const LeaveDetailsPopup = ({ leaveDetails, onUpdate }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLeave, setSelectedLeave] = useState(null);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleStatusChange = (event) => {
        const newStatus = event.target.value;
        setSelectedLeave({  status: newStatus });
    };
    // console.log(selectedLeave);
    const handleSubmit = async () => {
        try {
            if (selectedLeave) {
                const { _id, status } = selectedLeave;
                await axios.put(`https://eleedomimf.onrender.com/api/emp/update/${_id}`, { status });
                closeModal();
                onUpdate(); // Update leave details after submission
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    useEffect(() => {
        onUpdate();
    }, [onUpdate]);

    return (
        <>
            <button
                onClick={openModal}
                type="button"
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-base px-3 py-2 text-center"
            >
                All Leave Requests
            </button>

            {isModalOpen && (
                <div
                    id="static-modal"
                    data-modal-backdrop="static"
                    tabIndex="-1"
                    aria-hidden="true"
                    className="fixed top-0 right-0 left-0 bottom-0 inset-0 z-50 overflow-y-auto overflow-x-hidden bg-black bg-opacity-50"
                >
                    <div className="relative p-4 w-full max-w-7xl max-h-5xl mx-auto my-20">
                        <div className="relative bg-gradient-to-r from-cyan-600 to-cyan-700 rounded-lg shadow ">
                            <div className="flex items-center justify-between p-2 md:p-3 rounded-lg dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-gray-100">
                                    Update Leave Status
                                </h3>
                                <button
                                    onClick={closeModal}
                                    type="button"
                                    className="bg-transparent hover:text-red-500 text-slate-50 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                                >
                                    <CgCloseR size={25} />
                                </button>
                            </div>

                            <div className="p-2 rounded-lg">
                                {leaveDetails.length === 0 ? (
                                    <p className="text-center text-gray-500">No leave details available</p>
                                ) : (
                                    <>
                                        <div className="flex justify-between px-8 my-1">
                                            <p><strong>Start Date</strong></p>
                                            <p><strong>End Date</strong></p>
                                            <p><strong>Reason for Leave</strong></p>
                                            <p><strong>Status</strong></p>
                                            <p><strong>Actions</strong></p>
                                        </div>
                                        {leaveDetails.slice().reverse().map((leave) => (
                                            <div key={leave._id} className="flex bg-slate-100 text-black justify-between shadow-2xl rounded-md p-4 my-4">
                                                <span className="text-start">{leave.dateRange.startDate}</span>
                                                <span className="text-start">{leave.dateRange.endDate}</span>
                                                <span className="text-start">{leave.reasonForLeave}</span>
                                                <span className={`status mr-12 text-start ${leave.status === 'pending' ? 'bg-slate-300 rounded-xl px-2' : leave.status === 'approved' ? 'bg-green-200 text-green-700 rounded-xl px-2' : 'bg-red-200 text-red-900 rounded-xl px-2'}`}>{leave.status}</span>
                                                <select name="status" className="w-32" value={leave.status} onChange={(event) => handleStatusChange(event, leave)}>
                                                    <option value="">---- Select Status -----</option>
                                                    <option value="approved">Approved</option>
                                                    <option value="rejected">Rejected</option>
                                                </select>
                                            </div>
                                        ))}
                                        <button className="fixed bottom-8 right-8 bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleSubmit}>Submit</button>
                                    </>
                                    
                                )}
                                
                            </div>
                            
                        </div>
                    </div>
                    
                </div>
            )}
        </>
    );
};

export default LeaveDetailsPopup;
