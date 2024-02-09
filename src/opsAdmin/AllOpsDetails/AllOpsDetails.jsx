
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

function AllOpsDetails() {
    const [APIData, setAPIData] = useState([]);
    const [staffName, setStaffName] = useState("");
    const [staffId, setStaffId] = useState("");
    const [status, setStatus] = useState("");
    const [sendStaffId, setSendStaffId] = useState(null);
    const [allDetails, setAllDetails] = useState({
        staffName: "",
        employee_id: "",
        status: ""
    });
    const staffSend = (_id) => {
        // Show modal confirmation dialog
        setSendStaffId(_id);
    };


  

    // POLICY DATA LISTS
    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            toast.error("Not Authorized yet.. Try again! ");
        } else {
            // The user is authenticated, so you can make your API request here.
            axios
                .get(`https://eleedomimf.onrender.com/alldetails/viewdata`, {
                    headers: {
                        Authorization: `${token}`, // Send the token in the Authorization header
                    },
                })
                .then((response) => {
                    setAPIData(response.data);
                })
                .catch((error) => {
                    toast.error(error);
                    console.error(error);
                });
        }
    }, []);



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAllDetails((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    //   update id
    const updateAPI = async () => {
        try {
            // Use the selected category ID in the patch method
            const resp = await axios.put(`https://eleedomimf.onrender.com/alldetails/updatedata/${staffId}`, allDetails);
            toast.success(`${resp.data.status}`);

        } catch (error) {
            console.error("Error updating insurance details:", error);
        }
    };




    // refreshing page after updating data
    //  const onUpdatePolicy = async () => {
    //   try {
    //     const token = sessionStorage.getItem("token");

    //     if (!token) {
    //       toast.error("Not Authorized yet.. Try again!");
    //     } else {
    //       const response = await axios.get(
    //         `https://eleedomimf.onrender.com/alldetails/viewdata/${empid}`,
    //         {
    //           headers: {
    //             Authorization: `${token}`,
    //           },
    //         }
    //       );
    //       setAPIData(response.data);
    //     }
    //   } catch (error) {
    //     console.error("Error fetching updated insurance data:", error);
    //   }
    // };

    return (
        <section className="container-fluid relative  h-screen p-0 sm:ml-64 bg-slate-200">
            <div className="container-fluid flex justify-center p-2  border-gray-200 border-dashed rounded-lg   bg-slate-200">
                <div className="inline-block min-w-full w-full py-0 sm:px-6 lg:px-8">
                    <div className="overflow-x-auto w-xl  text-blue-500">
                        <h1 className="flex justify-center text-3xl font-semibold w-full mb-8">Policies Lists</h1><hr></hr>
                    </div>
                    <div className="inline-block min-w-full w-full py-0 sm:px-6 lg:px-8 overflow-x-auto">
                        <table className="min-w-full text-center text-sm font-light ">
                            <thead className="border-b font-medium dark:border-neutral-500">
                                <tr className="text-blue-700">
                                    <th scope="col" className="px-4 py-4">
                                        Entry Date
                                    </th>
                                    <th scope="col" className="px-4 py-4">
                                        Branch
                                    </th>
                                    <th scope="col" className="px-4 py-4">
                                        Category
                                    </th>
                                    <th scope="col" className="px-4 py-4">
                                        Company
                                    </th>
                                    <th scope="col" className="px-4 py-4">
                                        Vehicle No.
                                    </th>
                                    <th scope="col" className="px-4 py-4">
                                        Segment
                                    </th>
                                    <th scope="col" className="px-4 py-4">
                                        Sourcing
                                    </th>
                                    <th scope="col" className="px-4 py-4">
                                        Hypothinition
                                    </th>
                                    <th scope="col" className="px-4 py-4">
                                        Contact No.
                                    </th>
                                    <th scope="col" className="px-4 py-4">
                                        Advisor Name
                                    </th>
                                    <th scope="col" className="px-4 py-4">
                                        Sub-Advisor Name
                                    </th>
                                    <th scope="col" className="px-4 py-4">
                                        Insured By
                                    </th>
                                    <th scope="col" className="px-4 py-4 bg-red-100">
                                        Policy No.
                                    </th>
                                    <th scope="col" className="px-4 py-4 bg-red-100">
                                        Engine No.
                                    </th>
                                    <th scope="col" className="px-4 py-4 bg-red-100">
                                        Chassis No
                                    </th>
                                    <th scope="col" className="px-4 py-4 bg-red-100">
                                        Policy Type
                                    </th>
                                    <th scope="col" className="px-4 py-4 bg-red-100">
                                        OD Premium
                                    </th>
                                    <th scope="col" className="px-4 py-4 bg-red-100">
                                        Liability Premium
                                    </th>
                                    <th scope="col" className="px-4 py-4 bg-red-100">
                                        Net Premium
                                    </th>
                                    <th scope="col" className="px-4 py-4 bg-red-100">
                                        Final Premium(GST%)
                                    </th>
                                    <th scope="col" className="px-4 py-4 bg-red-100">
                                        OD Discount(%)
                                    </th>
                                    <th scope="col" className="px-4 py-4 bg-red-100">
                                        NCB
                                    </th>
                                    <th scope="col" className="px-4 py-4 bg-red-100">
                                        Policy Made By
                                    </th>
                                    <th scope="col" className="px-4 py-4 bg-red-100">
                                        Status
                                    </th>
                                    <th scope="col" className="px-4 py-4 bg-red-100">
                                        Select Employee
                                    </th>
                                    <th scope="col" className="px-4 py-4 bg-red-100">
                                        Send to Made Policy
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

                                            <td className="whitespace-nowrap px-3 py-4 bg-red-100">
                                                {data.policyNo}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 bg-red-100">
                                                {data.engNo}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 bg-red-100">
                                                {data.chsNo}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 bg-red-100">
                                                {data.policyType}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 bg-red-100">
                                                {data.odPremium}
                                            </td>

                                            <td className="whitespace-nowrap px-3 py-4 bg-red-100">
                                                {data.liabilityPremium}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 bg-red-100">
                                                {data.netPremium}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 bg-red-100">
                                                {data.finalEntryFields}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 bg-red-100">
                                                {data.odDiscount}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 bg-red-100">
                                                {data.ncb}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 bg-red-100">
                                                {data.policyMadeBy}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 bg-red-100">
                                                <select
                                                    className="input-style rounded-lg"
                                                    type="text"
                                                    name="status"
                                                    value={status}
                                                    onChange={handleInputChange}
                                                >
                                                    <option className="w-1" value="">--- Select ---</option>
                                                    <option className="w-1" value="Pending">Pending</option>
                                                    <option className="w-1" value="Sent">Sent</option>
                                                </select>
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 bg-red-100">
                                                <select
                                                    className="input-style rounded-lg"
                                                    type="text"
                                                    name="staffName"
                                                    value={staffName}
                                                    // onChange={(e) => setEmpName(e.target.value)}
                                                    onChange={(e) => {
                                                        setStaffName(e.target.value);
                                                        // Find the selected employee by their name
                                                        // const selectedEmployee = staff.find(emp => emp.empname === e.target.value);
                                                        // If the selected employee is found, set the staffId state to their _id
                                                        // if (selectedEmployee) {
                                                        //     setStaffId(selectedEmployee._id);
                                                        // }
                                                    }}
                                                >
                                                    <option className="w-1" value="">--- Select ---</option>
                                                    {/* {
                                                        staff.map((data) => (
                                                            <option key={data._id} value={data.empname}>{data.empid} - {data.empname}</option>
                                                        ))
                                                    } */}
                                                </select>
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 bg-red-100">
                                                <button className='text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2' onClick={staffSend}>Send</button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    {sendStaffId && (
                        <div id="popup-modal" tabIndex="-1" className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white p-4 rounded-lg ">
                                <h2 className="text-lg font-semibold text-gray-800">{`Are you sure you want to send this policy to ${staffName} ?`}</h2>
                                <div className="flex justify-end mt-10">
                                    <button onClick={() => { updateAPI(); setSendStaffId(null); }} className="text-white bg-green-600 hover:bg-green-800 focus:ring-1 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-base px-4 py-2 mr-2">
                                        Yes, I&apos;m sure
                                    </button>
                                    <button onClick={() => setSendStaffId(null)} className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-1 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-base font-medium px-4 py-2 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                                        No, cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
export default AllOpsDetails;