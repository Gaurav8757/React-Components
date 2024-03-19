import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
const LeaveApproval = () => {
    //   const [approvalStatus, setApprovalStatus] = useState(null);
    const [APIData, setAPIData] = useState([]);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            toast.error("You Were not Authorization to get Data. Check again..! ");
        } else {
            // The user is authenticated, so you can make your API request here.
            axios
                .get(`https://eleedomimf.onrender.com/api/employee-list`, {
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
    // console.log(APIData);
    //   const handleApproval = (isApproved) => {
    //     setApprovalStatus(isApproved);
    //   };

    return (
        <section className="container-fluid relative  h-screen p-0 sm:ml-64 bg-slate-200">
            <div className="container-fluid flex justify-center p-2  border-gray-200 border-dashed rounded-lg dark:border-gray-700  bg-slate-200">
                {/* <div className="sm:-mx-6 lg:-mx-8"> */}
                <div className="inline-block min-w-full w-full py-0 ">
                    <div className="overflow-x-none w-xl flex mt-2 text-blue-500">
                        <h1 className="flex justify-center text-3xl w-full font-semibold">Leave Approval Of Employees</h1>
                        <button className="absolute top-2 right-1" ><img src="/excel.png" alt="download" className="w-12" /></button>
                    </div>

                    <table className="min-w-full text-center text-sm font-light table bg-slate-200 mt-5 z-100">
                        <thead className="border-b  font-medium bg-slate-200 border border-black sticky top-16">
                            <tr className="text-blue-700 sticky top-16 border border-black">

                                <th scope="col" className="px-1 py-0 border border-black">
                                    Employee ID
                                </th>
                                <th scope="col" className="px-1 py-0 border border-black sticky">
                                    Employee Name
                                </th>
                                <th scope="col" className="px-1 py-0 border border-black sticky">
                                    Email ID
                                </th>
                                <th scope="col" className="px-1 py-0 border border-black sticky">
                                    Mobile No.
                                </th>
                                <th scope="col" className="px-1 py-0 border border-black sticky">
                                    Start Date
                                </th>
                                <th scope="col" className="px-1 py-0 border border-black sticky">
                                    End Date
                                </th>
                                <th scope="col" className="px-1 py-0 border border-black sticky">
                                    Reason for Leave
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 overflow-y-hidden">
                            {APIData.reverse().map((data) => {
                                return (
                                    <tr
                                        className=":border-neutral-200 text-sm font-medium"
                                        key={data.empid}>

                                        <td className="px-1 py-0 border border-black">
                                            {data.empid}
                                        </td>
                                        <td className="px-1 py-0 whitespace-nowrap border border-black">
                                            {data.empname}
                                        </td>
                                        <td className="px-1 py-0 border border-black">
                                            {data.empemail}
                                        </td>
                                        <td className="px-1 py-0 border border-black">
                                            {data.empmobile}
                                        </td>
                                        {data.leaveDetails && data.leaveDetails.map((info, index) => (
                                            <tr key={index}> {/* Assuming each leave detail is in a table row */}
                                            <td className="px-1 py-0 border border-black">
                                                    {info.dateRange.startDate}
                                                </td>
                                                <td className="px-1 py-0 border border-black">
                                                    {info.dateRange.endDate}
                                                </td>
                                                <td className="px-1 py-0 border border-black">
                                                    {info.reasonForLeave}
                                                </td>
                                            </tr>
                                        ))}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>


    );
};



export default LeaveApproval;