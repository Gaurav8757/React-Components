/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { CgCloseR } from "react-icons/cg";
function UpdateEmployee({ employee, onUpdate }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        empid: "",
        empname: "",
        empemail: "",
        empmobile: "",
        empgender: "",
        empdob: "",
        empjoiningdate: "",
        empbranch: "",
        permanentempaddress: "",
        currentempaddress: "",
        empaadharno: "",
        empdesignation: "",
        empaadharfile: ""
    });
    // OPEN MODAL
    const openModal = () => {
        setIsModalOpen(true);
    };

    // CLOSE MODAL
    const closeModal = () => {
        setIsModalOpen(false);
    };

    // show all data inside input tag
    useEffect(() => {
        setData(employee);
    }, [employee]);

    // handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const updateEmpAPI = async () => {
        try {
            setLoading(true);

            // Make an API call to update contact
            const response = await axios.put(
                `https://eleedomimf.onrender.com/api/emp/update/${employee._id}`, // Update the URL with the correct endpoint
                data
            );

            toast.success(`${response.data.status}`)
            // Close the modal after successful update
            closeModal();
            onUpdate();
        } catch (error) {
            toast.error(`${error}`)
            console.error("Error updating Employee:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <button
                onClick={openModal}
                type="button"
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2"
            >
                Edit
            </button>


            {isModalOpen && (
                <div
                    id="static-modal"
                    data-modal-backdrop="static"
                    tabIndex="-1"
                    aria-hidden="true"
                    className="fixed top-0 right-0 left-0 bottom-0 inset-0 z-50 overflow-y-auto overflow-x-hidden bg-black bg-opacity-50"
                >
                    <div className="relative p-4 w-full max-w-6xl max-h-5xl mx-auto my-20">
                        {/* <!-- Modal content --> */}
                        <div className="relative bg-gradient-to-r from-blue-200 to-cyan-200 rounded-lg shadow dark:bg-slate-100">
                            {/* <!-- Modal header --> */}
                            <div className="flex items-center justify-between p-2 md:p-3 rounded-lg dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-black">
                                    Update Employee
                                </h3>
                                <button
                                    onClick={closeModal}
                                    type="button"
                                    className=" bg-transparent hover:text-red-500 text-slate-500  rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                                >
                                    <CgCloseR size={25} />
                                </button>
                            </div>
                            <section className="p-4 md:p-3 scroll-smooth hs-scroll-inside-viewport-modal rounded-lg max-h-auto text-justify overflow-y-auto bg-gradient-to-r from-slate-100 to-white">
                                <form className="flex flex-wrap ">
                                    {/* ... other form elements ... */}
                                    <div className="w-full lg:w-1/2 p-2 text-start">
                                        <div className="flex flex-col">
                                            <label className="text-base mx-1 ">Employee Name:</label>
                                            <input
                                                className="input-style rounded-lg"
                                                type="text"
                                                value={data.empname}
                                                onChange={handleInputChange}
                                                name="empname"
                                                placeholder="Enter Name"
                                            />
                                        </div>

                                        <div className="flex flex-col my-5">
                                            <label className="text-base mx-1">DOB:</label>
                                            <input
                                                className="input-style rounded-lg"
                                                type="date"
                                                value={data.empdob}
                                                onChange={handleInputChange}
                                                name="empdob"
                                                placeholder="Enter Branch Code"
                                            />
                                        </div>

                                        <div className="flex flex-col my-5">
                                            <label className="text-base mx-1">Mobile No:</label>
                                            <input
                                                className="input-style rounded-lg"
                                                type="number"
                                                min="1"
                                                value={data.empmobile}
                                                onChange={handleInputChange}
                                                name="empmobile"
                                                placeholder="+91"
                                            />
                                        </div>

                                        <div className="flex flex-col my-5">
                                            <label className="text-base mx-1">Aadhar No.:</label>
                                            <input
                                                className="input-style rounded-lg"
                                                type="text"
                                                value={data.aadharno}
                                                onChange={handleInputChange}
                                                name="aadharno"
                                                placeholder=""
                                            />
                                        </div>

                                        <div className="flex flex-col my-5">
                                            <label className="text-base mx-1">Joining Date:</label>
                                            <input
                                                className="input-style rounded-lg"
                                                type="date"
                                                value={data.joining}
                                                onChange={handleInputChange}
                                                name="empjoiningdate"
                                                placeholder=""
                                            />
                                        </div>

                                        <div className="flex flex-col my-5">
                                            <label className="text-base mx-1">Current Address:</label>
                                            <textarea
                                                className="input-style rounded-lg"
                                                type="text"
                                                rows={2}
                                                name="currentempaddress"
                                                value={data.currentempaddress}
                                                onChange={handleInputChange}
                                                placeholder="Enter Your Address"
                                            />
                                        </div>

                                        <div className="flex flex-col my-5">
                                            <label className="text-base mx-1">Designation:</label>
                                            <input
                                                className="input-style rounded-lg"
                                                type="text"

                                                value={data.empdesignation}
                                                onChange={handleInputChange}
                                                name="empdesignation"
                                                placeholder=""
                                            />
                                        </div>


                                    </div>


                                    {/* part-2 */}
                                    <div className="w-full lg:w-1/2 p-2 text-start">
                                        <div className="flex flex-col ">
                                            <label className="text-base mx-1">Gender:</label>
                                            <select
                                                className="input-style rounded-lg"
                                                type="text"
                                                value={data.empgender}
                                                onChange={handleInputChange}
                                                name="empgender"
                                                placeholder="Enter Your District Name"
                                            >
                                                <option value="0">----- Select Gender -----</option>
                                                <option value="1">Male</option>
                                                <option value="2">Female</option>
                                                <option value="3">Others</option>
                                            </select>

                                        </div>

                                        <div className="flex flex-col my-5">
                                            <label className="text-base mx-1">Email ID:</label>
                                            <input
                                                className="input-style rounded-lg"
                                                type="email"
                                                name="empemail"
                                                value={data.empemail}
                                                onChange={handleInputChange}
                                                placeholder="abc@gmail.com"
                                            />
                                        </div>
                                        <div className="flex flex-col my-5">
                                            <label className="text-base mx-1">Employee Id:</label>
                                            <input
                                                className="input-style rounded-lg"
                                                type="text"
                                                name="empid"
                                                value={data.empid}
                                                onChange={handleInputChange}
                                                placeholder="s-12"
                                            />
                                        </div>

                                        <div className="flex flex-col my-5">
                                            <label className="text-base mx-1">Upload Aadhar Card:</label>
                                            <input
                                                className="input-style border w-full h-10 items-center rounded-lg"
                                                type="file"
                                                accept="/*" //accepting all type of images
                                                onChange={handleInputChange}
                                                name="empaadharfile"
                                            />
                                        </div>

                                        <div className="flex flex-col ">
                                            <label className="text-base mx-1">  Branch:</label>
                                            <select
                                                className="input-style rounded-lg"
                                                type="text"
                                                value={data.empbranch}
                                                onChange={handleInputChange}
                                                name="empbranch"
                                                placeholder="Enter Branch Name"
                                            >
                                                <option value="0">----- Select Branch -----</option>
                                                {/* {data.branchList.map((branchItem) => (
                                                    <option key={branchItem._id} value={branchItem.branchname}>
                                                        {branchItem.branchname}
                                                    </option>
                                                ))} */}
                                            </select>
                                        </div>

                                        <div className="flex flex-col my-5">
                                            <label className="text-base mx-1">Permanent Address:</label>
                                            <textarea
                                                className="input-style rounded-lg"
                                                type="text"
                                                rows={2}
                                                value={data.permanentempaddress}
                                                onChange={handleInputChange}
                                                name="permanentempaddress"
                                                placeholder="Enter Your Address"
                                            />
                                        </div>
                                    </div>


                                    <div className="w-full p-1 mt-2 justify-center flex">
                                        <button
                                            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                                            onClick={updateEmpAPI}
                                            type="button"
                                        >
                                            {loading ? "Submitting..." : "Submit"}
                                        </button>
                                    </div>
                                </form>
                            </section>
                        </div>
                    </div>
                </div>
            )}

        </>
    )
}

export default UpdateEmployee;