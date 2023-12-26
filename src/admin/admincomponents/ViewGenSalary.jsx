import axios from "axios";
import {  useState,useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
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
                .get(`http://localhost:7000/api/employee-list`, {
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
    }, [APIData]);

    const setData = (data) => {
        let {
            empid,
            // uniqueid,
            empname,
            empdob,
            empgender,
            empemail,
            empmobile,
            empjoiningdate,
            empbranch,
            empaadharno,
            empaadharfile,
            currentempaddress,
            permanentempaddress,
            empdesignation,

        } = data;
        sessionStorage.setItem("empid", empid);
        sessionStorage.setItem("empname", empname);
        sessionStorage.setItem("empdob", empdob);
        sessionStorage.setItem("empgender", empgender);
        sessionStorage.setItem("empemail", empemail);
        sessionStorage.setItem("empmobile", empmobile);
        sessionStorage.setItem("empjoiningdate", empjoiningdate);
        sessionStorage.setItem("empbranch", empbranch);
        sessionStorage.setItem("empaadharno ", empaadharno);
        sessionStorage.setItem("empaadharfile", empaadharfile);
        sessionStorage.setItem("currentempaddress", currentempaddress);
        sessionStorage.setItem("permanentempaddress", permanentempaddress);
        sessionStorage.setItem("empdesignation", empdesignation);
    };

    // ******************** Delete Functions *************************************/
    const onGenSalaryDelete = async (_id) => {
        try {
          await axios.delete(`https://eleedomimf.com/dashboard/${_id}`);
          toast.warn("General Salary Deleted!", { theme: "dark", position: "top-right" });
          // Update state or perform any other necessary actions
        } catch (error) {
          console.error('Error deleting general salary:', error);
        }
      };
      

    return (
        <section className="container-fluid relative  h-screen p-0 sm:ml-64 bg-gradient-to-r from-indigo-400 to-cyan-400">
        <div className="container-fluid flex justify-center p-2  border-gray-200 border-dashed rounded-lg dark:border-gray-700  bg-gradient-to-r from-indigo-400 to-cyan-400">
            
            {/* <div className="sm:-mx-6 lg:-mx-8"> */}
                <div className="inline-block min-w-full w-full py-0 sm:px-6 lg:px-8">
                    <div className="overflow-x-auto w-xl  text-white"
                    ><NavLink to = "/dashboard/generatesalary" className="flex justify-end">Back</NavLink>
                        <h1 className="flex justify-center text-4xl w-full mb-8"> Employee Generate Salary Lists</h1><hr></hr>
                        </div>
                        <div className="inline-block min-w-full w-full py-0 sm:px-6 lg:px-8 overflow-x-auto">
                        <table className="min-w-full text-center text-sm font-light ">
                            <thead className="border-b font-medium dark:border-neutral-500">
                                <tr className="text-white">
                                    <th scope="col" className="px-5 py-4">
                                   Employee ID
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                    Employee Name
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                    Email ID
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                    Mobile No.
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                    DOB.
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                    Gender
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                    Aadhar No.
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                        Aadhar
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                        Joining Date
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                        Branch 
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                        Current Address
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                    Permanent Address
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                    Designation
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
                                    // console.log(data);
                                    return (
                                        <tr
                                            className="border-b dark:border-neutral-200 text-sm font-medium"
                                            key={data.uniqueid}
                                        >
                                             <td className="whitespace-nowrap px-4 py-4">
                                                {data. empid}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.empname}
                                            </td>
                                            <td className="whitespace-nowrap px4 py-4">
                                                {data.empemail}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.empmobile}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.empdob}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.empgender}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.empaadharno}
                                            </td>
                                            <td className="whitespace-nowrap px4 py-4">
                                                <NavLink to= {data.empaadharfile}>
                                                    <img src={data.empaadharfile} alt="aadhar"/>
                                                      </NavLink>
                                                
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.empjoiningdate}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.empbranch}
                                            </td>
                                           
                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.currentempaddress}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.permanentempaddress}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.empdesignation}
                                            </td>


                                            <td className="whitespace-nowrap px-4 py-4">
                                                <Link to="#">
                                                    <button type="button" onClick={() => setData(data)} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2 ">
                                                        {/* <UpdateForm/> */} Edit
                                                    </button>

                                                </Link>
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