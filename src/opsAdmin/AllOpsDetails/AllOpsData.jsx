/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

function AllOpsData({ data, policy }) {
    const [status, setStatus] = useState("Pending");
    const [staffName, setStaffName] = useState("");
    const [employee_id, setEmployeeId] = useState("");
    const [staffId, setStaffId] = useState("");
    const [sendStaffId, setSendStaffId] = useState(null);
   
// popup
    const staffSend = (_id) => {
        setSendStaffId(_id);
    };
    const allDetails = {
        staffName,
        employee_id,
        status
    }

    const updateAPI = async () => {
        try {
            const resp = await axios.put(`https://eleedomimf.onrender.com/alldetails/updatedata/${staffId}`, allDetails);
            toast.success(`${resp.data.status}${staffName}`);
            if (resp.data.status) {
                setStatus("Sent");
                policy();
            }
        } catch (error) {
            toast.error(`${error.response.data.message}`)
            console.error("Error updating insurance details:", error);
        }
    };
    // SHOW STATUS
    useEffect(() => {
        if (data.staffName) {
            setStatus("Sent");
        }
    }, [data.staffName]);

    return (
        <tr
            className="border-b dark:border-neutral-200 text-sm font-medium">
                <td className="whitespace-nowrap px-3 py-4">
                {data._id}
            </td>
            <td className="whitespace-nowrap px-3 py-4">
                {data.entryDate}
            </td>
            <td className="whitespace-nowrap px-3 py-4">
                {data.branch}
            </td>
            <td className="whitespace-nowrap px-3 py-4">
                {data.category}
            </td>
            <td className="whitespace-nowrap px-3 py-4">
                {data.company}
            </td>
            <td className="whitespace-nowrap px-3 py-4">
                {data.vehRegNo}
            </td>
            <td className="whitespace-nowrap px-3 py-4">
                {data.segment}
            </td>
            <td className="whitespace-nowrap px-3 py-4">
                {data.sourcing}
            </td>
            <td className="whitespace-nowrap px-3 py-4">
                {data.hypo}
            </td>
            <td className="whitespace-nowrap px-3 py-4">
                {data.contactNo}
            </td>
            <td className="whitespace-nowrap px-3 py-4">
                {data.advisorName}
            </td>
            <td className="whitespace-nowrap px-3 py-4">
                {data.subAdvisor}
            </td>
            <td className="whitespace-nowrap px-3 py-4">
                {data.insuredName}
            </td>
            <td className="whitespace-nowrap px-3 py-4">
                {data.policyNo}
            </td>
            <td className="whitespace-nowrap px-3 py-4">
                {data.engNo}
            </td>
            <td className="whitespace-nowrap px-3 py-4">
                {data.chsNo}
            </td>
            <td className="whitespace-nowrap px-3 py-4">
                {data.policyType}
            </td>
            <td className="whitespace-nowrap px-3 py-4">
                {data.odPremium}
            </td>
            <td className="whitespace-nowrap px-3 py-4">
                {data.liabilityPremium}
            </td>
            <td className="whitespace-nowrap px-3 py-4">
                {data.netPremium}
            </td>
            <td className="whitespace-nowrap px-3 py-4">
                {data.finalEntryFields}
            </td>
            <td className="whitespace-nowrap px-3 py-4">
                {data.odDiscount}
            </td>
            <td className="whitespace-nowrap px-3 py-4">
                {data.ncb}
            </td>
            <td className="whitespace-nowrap px-3 py-4">
                {data.policyMadeBy}
            </td>
            <td className={`whitespace-nowrap px-3 py-4 ${data.status === "Pending" ? "text-red-600 text-lg" : "text-green-600 text-lg font-bold"}`}>
                    {data.status}
            </td>
            <td className="whitespace-nowrap px-3 py-4 ">
                {data.staffName}
            </td>
            <td className="whitespace-nowrap px-3 py-4 ">
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
        .filter(emp => emp.staffType === "OPS Executive")
        .map((emp) => (
            <option key={emp._id} value={emp.empname}>
                {emp.empid} - {emp.empname}
            </option>
        ))
}

                </select>
            </td>

            <td className="whitespace-nowrap px-3 py-4 ">
                <button className='text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2' onClick={staffSend}>Send</button>
            </td>
            <td>
                {sendStaffId && (
                    <div id="popup-modal" tabIndex="-1" className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-4 rounded-lg ">
                            <h2 className="text-lg font-semibold text-gray-800">{`Are you sure you want to send this policy to ${staffName} ?`}</h2>
                            <div className="flex justify-end mt-10">
                                <button onClick={() => { updateAPI(); setSendStaffId(null);  }} className="text-white bg-green-600 hover:bg-green-800 focus:ring-1 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-base px-4 py-2 mr-2">
                                    Yes, I&apos;m sure
                                </button>
                                <button onClick={() => setSendStaffId(null)} className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-1 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-base font-medium px-4 py-2 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                                    No, cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </td>
        </tr>
    )
}

export default AllOpsData;