/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { CgCloseR } from "react-icons/cg";
import { format } from 'date-fns';
import VITE_DATA from "../../config/config.jsx";

function UpdateGenSalary({ genSalaries, onUpdate }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        empName: "",
        presentDays: "",
        totalHalfDays: "",
        totalAbsent: "",
        genSalary: "",
        monthsalary: "",
        genMonths: "",
        monthleave: "",
        totalDays: "",
        incentive: "",
        totalAmount: "",
    });

    // OPEN MODAL
    const openModal = () => {
        setIsModalOpen(true);
    };

    // CLOSE MODAL
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const renderMonths = () => {
        const currentYear = new Date().getFullYear(); // Get the current year
        const months = [];
        for (let m = 0; m < 12; m++) {
          const monthValue = `${String(m + 1).padStart(2, '0')}/${currentYear}`; // Month value format: MM/YYYY
          const date = new Date(currentYear, m, 1);
          const monthName = format(date, 'MMMM');
          months.push(<option key={monthValue} value={monthValue}>{monthName}</option>);
        }
        return months;
      };
    // show all data inside input tag
    useEffect(() => {
        setData(genSalaries);
    }, [genSalaries]);

    // handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const updateGenSalaryAPI = async () => {
        try {
            setLoading(true);

            // Make an API call to update contact
            const response = await axios.put(
                `${VITE_DATA}/api/salaries/${genSalaries._id}`, // Update the URL with the correct endpoint
                data
            );
            toast.success(`${response.data.status}`)
            // Close the modal after successful update
            closeModal();
            onUpdate();
        } catch (error) {
            toast.error(`${error}`)
            console.error("Error updating Generated Salary:", error);
        } finally {
            setLoading(false);
        }
    };




    return (
        <>
            <button
                onClick={openModal}
                type="button"
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-2 py-1.5 my-1 text-center">
                Update
            </button>

            {isModalOpen && (
                <div
                    id="static-modal"
                    data-modal-backdrop="static"
                    tabIndex="-1"
                    aria-hidden="true"
                    className="fixed top-0 right-0 left-0 bottom-0 inset-0 z-50 overflow-y-auto overflow-x-hidden bg-black bg-opacity-50"
                >
                    <div className="relative p-4 w-full max-w-6xl max-h-5xl mx-auto mt-40">
                        {/* <!-- Modal content --> */}
                        <div className="relative bg-gradient-to-r from-cyan-600 to-cyan-700 rounded-lg shadow ">
                            {/* <!-- Modal header --> */}
                            <div className="flex items-center justify-between p-2 md:p-3 rounded-lg dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-gray-50 ">
                                    Update Generated Salary
                                </h3>
                                <button
                                    onClick={closeModal}
                                    type="button"
                                    className=" bg-transparent hover:text-red-500 text-slate-50  rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                                >
                                    <CgCloseR size={25} />
                                </button>
                            </div>
                            <section className="p-4 md:p-3 scroll-smooth hs-scroll-inside-viewport-modal rounded-lg max-h-auto text-justify overflow-y-auto bg-gradient-to-r from-slate-100 to-white">
                                <div className="flex flex-wrap justify-between">
                                    <div className="flex flex-col p-2 text-start w-full lg:w-1/4">
                                        <label className="text-base mx-1">Employee Name</label>
                                        <select
                                            className="input-style bg-red-100 rounded-lg text-base h-10" value={data.empName} onChange={handleInputChange} name="empName">
                                            <option value={data.empName} className="text-base">
                                                {data.empName}
                                            </option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col p-2 text-start w-full lg:w-1/4">
                                        <label className="text-base mx-1">Monthly Salary:</label>
                                        <input
                                            className="input-style bg-red-100 rounded-lg"
                                            type="number"
                                            min="0"
                                            value={data.monthsalary}
                                            onChange={handleInputChange}
                                            name="monthsalary"
                                            placeholder=""
                                            readOnly
                                        />
                                    </div>
                                    <div className="flex flex-col p-2 text-start w-full lg:w-1/4 ">
                                        <label className="text-base  mx-1">Monthly Leave:</label>
                                        <input
                                            className="input-style bg-red-100 rounded-lg"
                                            type="number"
                                            min="0"
                                            max="12"
                                            value={data.monthleave}
                                            onChange={handleInputChange}
                                            name="monthleave"
                                            readOnly
                                        />
                                    </div>

                                    <div className="flex flex-col p-2 text-start w-full lg:w-1/4 ">
                                        <label className="text-base mx-1">Months:</label>
                                        <select
                                            className="input-style rounded-lg"
                                            type="text"
                                            value={data.genMonths}
                                            onChange={handleInputChange}
                                            name="genMonths"
                                        >
                                            <option key="0" value="" >----- Select Month&apos;s -----</option>
                                            {renderMonths()}
                                        </select>
                                    </div>

                                    <div className="flex flex-col p-2 text-start w-full lg:w-1/4">
                                        <label className="text-base mx-1">Total Days:</label>
                                        <input
                                            className="input-style rounded-lg"
                                            type="number"
                                            min="0"
                                            value={data.totalDays}
                                            onChange={handleInputChange}
                                            name="totalDays"
                                        />
                                    </div>
                                    <div className="flex flex-col p-2 text-start w-full lg:w-1/4">
                                        <label className="text-base mx-1">Present Days:</label>
                                        <input
                                            className="input-style rounded-lg"
                                            type="number"
                                            min="0"
                                            value={data.presentDays}
                                            onChange={handleInputChange}
                                            name="presentDays"
                                        />
                                    </div>

                                    <div className="flex flex-col p-2 text-start w-full lg:w-1/4">
                                        <label className="text-base mx-1">Half Days:</label>
                                        <input
                                            className="input-style rounded-lg"
                                            type="number"
                                            min="0"
                                            value={data.totalHalfDays}
                                            onChange={handleInputChange}
                                            name="totalHalfDays"
                                        />
                                    </div>

                                    <div className="flex flex-col p-2 text-start w-full lg:w-1/4">
                                        <label className="text-base mx-1">Absent Days:</label>
                                        <input
                                            className="input-style rounded-lg"
                                            type="number"
                                            min="0"
                                            value={data.totalAbsent}
                                            onChange={handleInputChange}
                                            name="totalAbsent"
                                        />
                                    </div>

                                    <div className="flex flex-col p-2 text-start w-full lg:w-1/4">
                                        <label className="text-base mx-1">Salary:</label>
                                        <input
                                            className="input-style rounded-lg"
                                            type="number"
                                            min="0"
                                            value={data.genSalary}
                                            onChange={handleInputChange}
                                            name="genSalary"
                                        />
                                    </div>
                                    <div className="flex flex-col p-2 text-start w-full lg:w-1/4">
                                        <label className="text-base mx-1">Incentive:</label>
                                        <input
                                            className="input-style rounded-lg"
                                            type="number"
                                            min="0"
                                            value={data.incentive}
                                            onChange={handleInputChange}
                                            name="incentive"
                                            placeholder="₹"
                                        />
                                    </div>
                                    <div className="flex flex-col p-2 text-start w-full lg:w-1/4">
                                        <label className="text-base mx-1">Total Amount:</label>
                                        <input
                                            className="input-style rounded-lg"
                                            type="number"
                                            min="0"
                                            value={data.totalAmount}
                                            onChange={handleInputChange}
                                            name="totalAmount"
                                        />
                                    </div>
                                    <div className="flex flex-col p-2 text-start w-full lg:w-1/4"></div>

                                    <div className="w-full p-1 mt-10 justify-center flex">
                                        <button
                                            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                                            onClick={updateGenSalaryAPI}
                                            type="button"
                                        >
                                            {loading ? "Submitting..." : "Submit"}
                                        </button>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            )}

        </>
    )
}

export default UpdateGenSalary;