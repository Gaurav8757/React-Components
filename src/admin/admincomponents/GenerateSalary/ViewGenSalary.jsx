import axios from "axios";
import UpdateGenSalary from "./UpdateGenSalary.jsx";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";
import { toast } from "react-toastify";
export default function ViewGenPolicy() {
    const [APIData, setAPIData] = useState([]);
    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            toast.error("Not Authorized yet.. Try again! ");
        } else {
            // The user is authenticated, so you can make your API request here.
            axios
                .get(`https://eleedomimf.onrender.com/api/salaries-list`, {
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

    // refreshing page after updating data
    const updateGenSalary = async () => {
        try {
            const token = sessionStorage.getItem("token");

            if (!token) {
                toast.error("Not Authorized yet.. Try again!");
            } else {
                const response = await axios.get(
                    `https://eleedomimf.onrender.com/api/salaries-list`,
                    {
                        headers: {
                            Authorization: `${token}`,
                        },
                    }
                );

                setAPIData(response.data);
            }
        } catch (error) {
            console.error("Error fetching Generated Salary data:", error);
        }
    };
    // ******************** Delete Functions *************************************/
    const onGenSalaryDelete = async (_id) => {
        try {
            await axios.delete(`https://eleedomimf.onrender.com/salaries/api/${_id}`);
            toast.warn("General Salary Deleted!", { theme: "dark", position: "top-right" });
            // Update state or perform any other necessary actions
        } catch (error) {
            console.error('Error deleting general salary:', error);
        }
    };


    return (
        <section className="container-fluid relative  h-screen p-0 sm:ml-64 bg-slate-200">
            <div className="container-fluid flex justify-center p-2  border-gray-200 border-dashed rounded-lg dark:border-gray-700  bg-slate-200">

                {/* <div className="sm:-mx-6 lg:-mx-8"> */}
                <div className="inline-block min-w-full w-full py-0 sm:px-6 lg:px-8">
                    <div className="overflow-x-auto w-xl  text-blue-500"
                    ><NavLink to="/dashboard/generatesalary" className="flex justify-end text-red-700"> <TiArrowBack size={30} /></NavLink>
                        <h1 className="flex justify-center text-4xl w-full mb-8"> Employee Generate Salary Lists</h1><hr></hr>
                    </div>
                    <div className="inline-block min-w-full w-full py-0 sm:px-6 lg:px-8 overflow-x-auto">
                        <table className="min-w-full text-center text-sm font-light ">
                            <thead className="border-b font-medium dark:border-neutral-500">
                                <tr className="text-blue-700">
                                    <th scope="col" className="px-5 py-4">
                                        Employee Name
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                        Monthly Salary
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                        Monthly Leave
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                        Months
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                        Total Days
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                        Present Days
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                        Total Half Days
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                        Absent
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                        Salary
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                        Incentive
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                        Total Amount
                                    </th>

                                    <th scope="col" className="px-5 py-4">
                                        Edit
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                        Delete
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {APIData.map((data) => {
                                    
                                    return (
                                        <tr
                                            className="border-b dark:border-neutral-200 text-sm font-medium"
                                            key={data._id}
                                        >
                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.empName}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.monthsalary}
                                            </td>
                                            <td className="whitespace-nowrap px4 py-4">
                                                {data.monthleave}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.genMonths}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.totalDays}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.presentDays}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.totalHalfDays}
                                            </td>

                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.totalAbsent}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.genSalary}
                                            </td>

                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.incentive}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.totalAmount}
                                            </td>

                                            <td className="whitespace-nowrap px-4 py-4">
                                                <UpdateGenSalary genSalaries = {data} onUpdate={updateGenSalary} />
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                <button type="button" onClick={() => onGenSalaryDelete(data._id)} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2">Delete</button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/* </div> */}
        </section>
    );
}