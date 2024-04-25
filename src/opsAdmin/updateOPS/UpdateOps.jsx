/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
const CgCloseR = React.lazy(() => import("react-icons/cg").then(module => ({ default: module.CgCloseR })));
import { toast } from "react-toastify";
import axios from "axios";
import VITE_DATA from "../../config/config.jsx";

function UpdateOps({ UpdateOps, update }) {
    const [loading, setLoading] = useState("");
    const [APIData, setAPIData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTime, setCurrentTime] = useState(getFormattedTime());
    const [allDetails, setAllDetails] = useState({
        entryDate: '',
        branch: '',
        insuredName: '',
        contactNo: '',
        staffName: '',
        currentTime: '',
        employee_id: ''
    });
    // OPEN MODAL
    const openModal = () => {
        setIsModalOpen(true);
    };

    // CLOSE MODAL
    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            toast.error("Not Authorized yet.. Try again! ");
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
    }, []);

    // show all data inside input tag
    useEffect(() => {
        setAllDetails(UpdateOps);
    }, [UpdateOps]);

    // handle input change
   // handle input change
const handleInputChange = (e) => {
    const { name, value } = e.target;
    const selectedEmployee = APIData.find(emp => emp.empname === value);

    // setDataId(selectedEmployee ? selectedEmployee._id : ''); // set dataId only if selectedEmployee is found
    setAllDetails((prevData) => ({
        ...prevData,
        employee_id: selectedEmployee ? selectedEmployee._id : '',
        currentTime: currentTime,
        [name]: value,
    }));
};

const updateInsuranceAPI = async () => {
    try {
        setLoading(true);
        const resp = await axios.put(`${VITE_DATA}/alldetails/updatedata/${UpdateOps._id}`, allDetails);
        update();
        toast.success(`${resp.data.status}`);
        closeModal();
    } catch (error) {
        console.error("Error updating insurance details:", error);
        toast.error("Failed to update insurance details");
    } finally {
        setLoading(false);
    }
};



    return (
        <>
            {/* <!-- Modal toggle --> */}
            <button onClick={ openModal} type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 m-1 ">
                Update
            </button>

            {/* <!-- Main modal --> */}
            {isModalOpen && (
                <div
                    id="static-modal"
                    data-modal-backdrop="static"
                    tabIndex="-1"
                    aria-hidden="true"
                    className="fixed top-0 right-0 left-0 bottom-0 inset-0 z-50 overflow-y-auto overflow-x-hidden bg-black bg-opacity-50">

                    <div className="relative p-1 w-full max-w-6xl max-h-7xl mx-auto mt-40">
                        {/* <!-- Modal content --> */}
                        <div className="relative bg-gradient-to-r from-cyan-700 to-cyan-600 rounded-lg shadow ">
                            {/* <!-- Modal header --> */}
                            <div className="flex items-center justify-between p-2 md:p-3 rounded-lg dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-gray-100 ">
                                    Update Policy Details
                                </h3>
                                <button
                                    onClick={closeModal}
                                    type="button"
                                    className=" bg-transparent hover:text-red-500 text-slate-50  rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center  ">
                                    <CgCloseR size={25} />
                                </button>
                            </div>

                            {/* <!-- Modal body --> */}
                            <section className="p-4 md:p-3 scroll-smooth hs-scroll-inside-viewport-modal rounded-lg max-h-auto text-justify overflow-y-auto bg-gradient-to-r from-cyan-700 to-cyan-600">
                                <div className="container-fluid flex justify-center p-1 border-gray-200 border-dashed rounded-lg  bg-white">
                                    <div className="relative w-full lg:w-full p-4 lg:p-1 rounded-xl shadow-xl text-2xl items-center bg-slate-200">
                                        <div className="flex flex-wrap justify-between">

                                            {/* FIELD - 1 */}
                                            <div className="flex flex-col p-2  text-start w-full lg:w-1/4">
                                                <label className="text-base mx-1">Entry Date:</label>
                                                <input
                                                    className="input-style rounded-lg "
                                                    type="date"
                                                    value={allDetails.entryDate}
                                                    onChange={handleInputChange}
                                                    name="entryDate"
                                                />
                                            </div>

                                            {/* field -2 */}
                                            <div className="flex flex-col p-2 text-start w-full lg:w-1/4 ">
                                                <label className="text-base mx-1">Branch:</label>
                                                <input
                                                    className="input-style rounded-lg "
                                                    type="text"
                                                    value={allDetails.branch}
                                                    onChange={handleInputChange} name="branch">
                                                </input>
                                            </div>

                                            {/* field -3 */}
                                            <div className="flex flex-col p-2 text-start w-full lg:w-1/4 ">
                                                <label className="text-base mx-1">Insured Name:</label>
                                                <input
                                                    className="input-style rounded-lg"
                                                    type="text"
                                                    value={allDetails.insuredName}
                                                    onChange={handleInputChange}
                                                    name="insuredName"
                                                />
                                            </div>

                                            {/* field -4 */}
                                            <div className="flex flex-col p-2 text-start w-full lg:w-1/4 ">
                                                <label className="text-base mx-1">Contact No:</label>
                                                <input
                                                    className="input-style rounded-lg"
                                                    type="text"
                                                    value={allDetails.contactNo}
                                                    onChange={handleInputChange}
                                                    name="contactNo"
                                                    placeholder="Enter Contact No" />
                                            </div>

                                            {/* FIELD -5 */}
                                            <div className="flex flex-col  p-2 text-start w-full lg:w-1/4">
                                                <label className="text-base mx-1">Policy Made By:</label>
                                                <select
                                                    className="input-style rounded-lg cursor-pointer"
                                                    type="text"
                                                    name="staffName"
                                                    value={allDetails.staffName}
                                                    onChange={handleInputChange}>
                                                    <option className="w-1" value="">--- Select ---</option>
                                                    {
                                                        APIData
                                                            .filter(emp => emp.staffType === "OPS Executive" | emp.staffType === "OPS EXECUTIVE")
                                                            .map((emp) => (
                                                                <option key={emp._id} value={emp.empname}>
                                                                    {emp.empid} - {emp.empname}
                                                                </option>
                                                            ))
                                                    }
                                                </select>
                                            </div>
                                        </div>

                                        {/* button */}
                                        <div className="col-span-2 p-2 mt-10 flex justify-center">
                                            <button
                                                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                                                onClick={updateInsuranceAPI} type="button" > {loading ? "Submitting..." : "Submit"} </button>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default UpdateOps;
