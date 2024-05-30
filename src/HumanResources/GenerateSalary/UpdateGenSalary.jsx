/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { format } from 'date-fns';
import VITE_DATA from "../../config/config.jsx";

function UpdateGenSalary({ genSalaries, onUpdate, onClose }) {
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
        totalMonthDays: ""
    });

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
            onClose();
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
            <div
                id="static-modal"
                data-modal-backdrop="static"
                tabIndex="-1"
                aria-hidden="true"
                className="fixed top-0 right-0 left-0 bottom-0 inset-0 z-50 overflow-y-auto overflow-x-hidden bg-black bg-opacity-50"
            >
                <div className="relative p-4 w-full max-w-6xl max-h-5xl mx-auto mt-40">
                    {/* <!-- Modal content --> */}
                    <div className="relative bg-gradient-to-r from-orange-700 to-orange-700 rounded-lg shadow ">
                        {/* <!-- Modal header --> */}
                        <div className="flex items-center justify-between p-2 md:p-3 rounded-lg dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-50 ">
                                Update Generated Salary
                            </h3>
                            <button
                                onClick={onClose}
                                type="button"
                                className=" bg-transparent hover:bg-red-100 text-slate-100  rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center  ">
                                <img src="/close.png" height={5} width={25} alt="close" className="hover:bg-red-100 rounded-full" />
                            </button>
                        </div>
                        <section className="p-2 scroll-smooth hs-scroll-inside-viewport-modal rounded-lg max-h-auto text-justify overflow-y-auto bg-orange-700">
                            <div className="flex flex-wrap rounded justify-between bg-slate-200 font-semibold">
                                <div className="flex flex-col p-2 text-start w-full lg:w-1/5">
                                    <label className="text-base mx-1">Employee Name</label>
                                    <input
                                        type="text" className="input-style bg-red-100 rounded-lg text-base p-1" value={data.empName} name="empName" />

                                </div>
                                {/* <div className="flex flex-col p-2 text-start w-full lg:w-1/5">
                                    <label className="text-base mx-1">Monthly Salary:</label>
                                    <input
                                        className="input-style p-1 bg-red-100 rounded-lg"
                                        type="number"
                                        min="0"
                                        value={data.monthsalary}
                                        onChange={handleInputChange}
                                        name="monthsalary"
                                        placeholder=""
                                        readOnly
                                    />
                                </div>
                                <div className="flex flex-col p-2 text-start w-full lg:w-1/5">
                                    <label className="text-base  mx-1">Monthly Leave:</label>
                                    <input
                                        className="input-style p-1 bg-red-100 rounded-lg"
                                        type="number"
                                        min="0"
                                        max="12"
                                        value={data.monthleave}
                                        onChange={handleInputChange}
                                        name="monthleave"
                                        readOnly
                                    />
                                </div>

                                <div className="flex flex-col p-2 text-start w-full lg:w-1/5">
                                    <label className="text-base mx-1">Months:</label>
                                    <select
                                        className="input-style p-1 rounded-lg"
                                        type="text"
                                        value={data.genMonths}
                                        onChange={handleInputChange}
                                        name="genMonths"
                                    >
                                        <option key="0" value="" >----- Select Month -----</option>
                                        {renderMonths()}
                                    </select>
                                </div> */}
                                {/* <div className="flex flex-col p-2 text-start w-full lg:w-1/5">
                                    <label className="text-base mx-1">Total Days:</label>
                                    <input
                                        className="input-style bg-red-100 p-1 rounded-lg"
                                        type="number"
                                        min="0"
                                        value={data.totalMonthDays}
                                        onChange={handleInputChange}
                                        name="totalMonthDays"
                                        disabled
                                    />
                                </div> */}
                                <div className="flex flex-col p-2 text-start w-full lg:w-1/5">
                                    <label className="text-base mx-1">Working Days:</label>
                                    <input
                                        className="input-style bg-red-100 p-1 rounded-lg"
                                        type="number"
                                        min="0"
                                        value={data.totalDays}
                                        onChange={handleInputChange}
                                        name="totalDays"
                                        disabled
                                    />
                                </div>
                                
                                <div className="flex flex-col p-2 text-start w-full lg:w-1/5">
                                    <label className="text-base mx-1">Present Days:</label>
                                    <input
                                        className="input-style p-1 rounded-lg"
                                        type="number"
                                        min="0"
                                        value={data.presentDays}
                                        onChange={handleInputChange}
                                        name="presentDays"
                                    />
                                </div>

                                <div className="flex flex-col p-2 text-start w-full lg:w-1/5">
                                    <label className="text-base mx-1">Half Days:</label>
                                    <input
                                        className="input-style p-1 rounded-lg"
                                        type="number"
                                        min="0"
                                        value={data.totalHalfDays}
                                        onChange={handleInputChange}
                                        name="totalHalfDays"
                                    />
                                </div>

                                <div className="flex flex-col p-2 text-start w-full lg:w-1/5">
                                    <label className="text-base mx-1">Absent Days:</label>
                                    <input
                                        className="input-style p-1 rounded-lg"
                                        type="number"
                                        min="0"
                                        value={data.totalAbsent}
                                        onChange={handleInputChange}
                                        name="totalAbsent"
                                    />
                                </div>

                                <div className="flex flex-col p-2 text-start w-full lg:w-1/5">
                                    <label className="text-base mx-1">Salary:</label>
                                    <input
                                        className="input-style bg-red-100 p-1 rounded-lg"
                                        type="number"
                                        min="0"
                                        value={data.genSalary}
                                        onChange={handleInputChange}
                                        name="genSalary"
                                        disabled
                                    />
                                </div>
                                <div className="flex flex-col p-2 text-start w-full lg:w-1/5">
                                    <label className="text-base mx-1">Incentive:</label>
                                    <input
                                        className="input-style p-1 rounded-lg"
                                        type="number"
                                        min="0"
                                        value={data.incentive}
                                        onChange={handleInputChange}
                                        name="incentive"
                                        placeholder="₹"
                                    />
                                </div>
                                <div className="flex flex-col p-2 text-start w-full lg:w-1/5">
                                    <label className="text-base mx-1">Total Amount:</label>
                                    <input
                                        className="input-style p-1 bg-red-100 rounded-lg"
                                        type="number"
                                        min="0"
                                        value={data.totalAmount}
                                        onChange={handleInputChange}
                                        name="totalAmount"
                                        disabled
                                    />
                                </div>
                                <div className="flex flex-col p-1 text-start w-full lg:w-1/5"></div>
                                <div className="flex flex-col p-1 text-start w-full lg:w-1/5"></div>
                                <div className="flex flex-col p-1 text-start w-full lg:w-1/5"></div>
                                <div className="w-full p-1 mt-4 justify-center flex">
                                    <button
                                        className="text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded text-sm px-3 py-2 text-center mb-2"
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
        </>
    )
}

export default UpdateGenSalary;