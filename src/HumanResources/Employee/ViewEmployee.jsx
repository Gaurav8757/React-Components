import axios from "axios";
import { useEffect, useState } from "react";
import * as XLSX from 'xlsx';
import {  NavLink } from "react-router-dom";
import UpdateEmployee from "./UpdateEmployee.jsx";
import EmpAttendanceModal from "./EmpAttendanceModal.jsx";
import { toast } from "react-toastify";
// import { TiArrowBack } from "react-icons/ti";

export default function ViewEmployee() {
    const [APIData, setAPIData] = useState([]);
    const [sendStaffId, setSendStaffId] = useState(null);
    const name = sessionStorage.getItem("name");
// popup
const staffSend = (_id) => {
    setSendStaffId(_id);
};


    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            toast.error("Not Authorized yet.. Try again! ");
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

    
    // refreshing page after updating data
  const onUpdateBranch = async () => {
    try {
      const token = sessionStorage.getItem("token");

      if (!token) {
        toast.error("Not Authorized yet.. Try again!");
      } else {
        const response = await axios.get(
          `https://eleedomimf.onrender.com/api/employee-list`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );

        setAPIData(response.data);
      }
    } catch (error) {
      console.error("Error fetching updated Employee data:", error);
    }
  };
  
  const exportToExcel = () => {
    try {
        const fileType =
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        const fileExtension = ".xlsx";
        const fileName = name;
  
        // Get all table headers and rows
        const tableHeaders = document.querySelectorAll(".table th");
        const tableRows = document.querySelectorAll(".table tbody tr");
  
        // Include only the first 26 columns and all rows
        const columnsToInclude = Array.from(tableHeaders).slice(0, 18);
        const rowsToInclude = Array.from(tableRows).map(row => {
            const cells = Array.from(row.querySelectorAll("td")).slice(0, 18);
            return cells.map(cell => cell.textContent);
        });
  
        // Create worksheet
        const ws = XLSX.utils.aoa_to_sheet([Array.from(columnsToInclude).map(header => header.textContent), ...rowsToInclude]);
  
        // Create workbook and export
        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
        const excelBuffer = XLSX.write(wb, {
            bookType: "xlsx",
            type: "array",
        });
        const data = new Blob([excelBuffer], { type: fileType });
        const url = URL.createObjectURL(data);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName + fileExtension);
        document.body.appendChild(link);
        link.click();
    } catch (error) {
        console.error("Error exporting to Excel:", error);
        toast.error("Error exporting to Excel");
    }
  };

const handleExportClick = () => {
    exportToExcel();
    // exportToPDF();
};

  

    // ******************** Delete Functions *************************************/
    const onDeleteEmployee = async (_id) => {
        try {
          await axios.delete(`https://eleedomimf.onrender.com/emp/api/${_id}`);
          toast.warn("Employee Deleted.....!", { theme: "dark", position: "top-right" });
          setAPIData((prevData) => prevData.filter((data) => data._id !== _id));
        } catch (error) {
          console.error('Error deleting employee:', error);
        }
      };
      
    return (
        <section className="container-fluid relative  h-screen p-0 sm:ml-64 bg-slate-200">
        <div className="container-fluid flex justify-center p-2  border-gray-200 border-dashed rounded-lg dark:border-gray-700  bg-slate-200">
            
            {/* <div className="sm:-mx-6 lg:-mx-8"> */}
                <div className="inline-block min-w-full w-full py-0 ">
                    <div className="overflow-x-none w-xl flex mt-2 text-blue-500">
                        <h1 className="flex justify-center text-3xl w-full font-semibold">All Employee Lists</h1>
                        <button className="absolute top-2 right-24" onClick={handleExportClick}><img src="/excel.png" alt="download" className="w-12" /></button>
                       
                        <NavLink to = "/hr/home/addemployee" >
                        <button type="button" className="text-white absolute top-3 right-2 justify-end bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-3 py-2 text-center me-2 mb-2 ">Go Back</button>
                        </NavLink>
                        </div>
                        <div className=" relative mt-2">
                        <div className="inline-block min-w-full w-full py-3  ">
                        <table className="min-w-full text-center text-sm font-light table ">
                            <thead className="border-b  font-medium bg-slate-300  sticky top-16">
                                <tr className="text-blue-700 sticky top-16">
                                    <th scope="col" className="px-5 py-4">
                                    Employee ID
                                    </th>
                                    <th scope="col" className="px-5 py-4 sticky">
                                    Employee Name
                                    </th>
                                    <th scope="col" className="px-5 py-4 sticky">
                                    Email ID
                                    </th>
                                    <th scope="col" className="px-5 py-4 sticky">
                                    Mobile No.
                                    </th>
                                    <th scope="col" className="px-5 py-4 sticky">
                                    DOB.
                                    </th>
                                    <th scope="col" className="px-5 py-4 sticky">
                                    Gender
                                    </th>
                                    <th scope="col" className="px-5 py-4 sticky">
                                    Aadhar No.
                                    </th>
                                    <th scope="col" className="px-5 py-4 sticky">
                                        Aadhar Card
                                    </th>
                                    <th scope="col" className="px-5 py-4 sticky">
                                    PAN No.
                                    </th>
                                    <th scope="col" className="px-5 py-4 sticky">
                                    PAN Card
                                    </th>
                                    <th scope="col" className="px-5 py-4 sticky">
                                   Account Number
                                    </th>
                                    <th scope="col" className="px-5 py-4 sticky">
                                   IFSC Code
                                    </th>
                                    <th scope="col" className="px-5 py-4 sticky">
                                   Bank Name
                                    </th>
                                    
                                    <th scope="col" className="px-5 py-4 sticky">
                                        Joining Date
                                    </th>
                                    <th scope="col" className="px-5 py-4 sticky">
                                        Branch 
                                    </th>
                                    <th scope="col" className="px-5 py-4 sticky">
                                        Current Address
                                    </th>
                                    <th scope="col" className="px-5 py-4 sticky">
                                    Permanent Address
                                    </th>
                                    <th scope="col" className="px-5 py-4 sticky">
                                    Designation
                                    </th>
                                   
                                    <th scope="col" className="px-5 py-4 sticky">
                                        Update
                                    </th>
                                    <th scope="col" className="px-5 py-4 sticky">
                                        Attendance
                                    </th>
                                    <th scope="col" className="px-5 py-4 sticky">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 overflow-y-hidden">
                                {APIData.map((data) => {
                                    
                                    return (
                                        <tr
                                            className=":border-neutral-200 text-sm font-medium"
                                            key={data.empid}
                                        >
                                             <td className="whitespace-nowrap px-4 py-4">
                                                {data.empid}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.empname}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.empemail}
                                            </td>
                                            {/* <td className="whitespace-wrap px-4 py-4">
                                                {data.emppassword}
                                            </td> */}
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
                                            <td className="whitespace-nowrap px-4 py-4">
                                                <NavLink to= {data.empaadharfile}>
                                                    <img src={data.empaadharfile} alt="aadhar"/>
                                                      </NavLink>
                                                
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.pan}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                <NavLink to= {data.panno}>
                                                    <img src={data.panno} alt="pan"/>
                                                      </NavLink>
                                                
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.accNumber}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.ifsc}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.bankName}
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
                                                {data.staffType}
                                            </td>
                                           
                                            <td className="whitespace-nowrap px-4 py-4">
                                               <UpdateEmployee employee = {data}  onUpdate = {onUpdateBranch}/>
                                            </td>

                                            <td className="whitespace-nowrap px-4 py-4" >
                                               
                                               <EmpAttendanceModal  emp = {data.employeeDetails}  />
                                            </td>

                                            <td className="whitespace-nowrap px-4 py-4">
                                                {/* to enable delete from here */}
                                                <button type="button" onClick={() => staffSend(data._ids)} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2">Active</button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    </div>
                    {sendStaffId && (
                    <div id="popup-modal" tabIndex="-1" className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-4 rounded-lg ">
                            <h2 className="text-lg font-semibold text-gray-800"> {`Are you sure you want to delete `}
                <span className="text-red-600">{APIData.find(data => data._id === sendStaffId)?.empname}</span>
                {`?`}</h2>
                            <div className="flex justify-end mt-10">
                                <button onClick={() => { onDeleteEmployee(sendStaffId); setSendStaffId(null);  }} className="text-white bg-red-600 hover:bg-red-800 focus:ring-1 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-base px-4 py-2 mr-2">
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
        {/* </div> */}
        </section>
    );
}