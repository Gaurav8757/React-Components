import axios from "axios";
import UpdateBranch from "./UpdateBranch.jsx";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import * as XLSX from 'xlsx';
// import { TiArrowBack } from "react-icons/ti";
import { toast } from "react-toastify";
export default function ViewBranch() {
    const [APIData, setAPIData] = useState([]);
    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            toast.error("Not Authorized yet.. Try again! ");
        } else {
            // The user is authenticated, so you can make your API request here.
            axios
                .get(`https://eleedomimf.onrender.com/api/branch-list`, {
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
                    `https://eleedomimf.onrender.com/api/branch-list`,
                    {
                        headers: {
                            Authorization: `${token}`,
                        },
                    }
                );

                setAPIData(response.data);
            }
        } catch (error) {
            console.error("Error fetching updated Branch data:", error);
        }
    };

    const exportToExcel = () => {
        try {
            const fileType =
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
            const fileExtension = ".xlsx";
            const fileName = "all_branch_list";
      
            // Get all table headers and rows
            const tableHeaders = document.querySelectorAll(".table th");
            const tableRows = document.querySelectorAll(".table tbody tr");
      
            // Include only the first 26 columns and all rows
            const columnsToInclude = Array.from(tableHeaders).slice(0, 10);
            const rowsToInclude = Array.from(tableRows).map(row => {
                const cells = Array.from(row.querySelectorAll("td")).slice(0, 10);
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
    const onDeleteBranch = async (_id) => {
        try {
            await axios.delete(`https://eleedomimf.onrender.com/dashboard/api/${_id}`);
            setAPIData((prevData) => prevData.filter((data) => data._id !== _id));
            toast.warn(`${APIData.map((data) => data.branchname)} Branch Deleted...!`, { theme: "dark", position: "top-right" });
        } catch (error) {
            console.error('Error deleting branch:', error);
        }
    };


    return (
        <section className="container-fluid relative  h-screen p-0 sm:ml-64 bg-slate-200">
            <div className="container-fluid flex justify-center p-2  border-gray-200 border-dashed rounded-lg dark:border-gray-700  bg-slate-200">
                {/* <div className="sm:-mx-6 lg:-mx-8"> */}
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-x-auto text-blue-500"
                    ><NavLink to="/dashboard/addbranch" className="flex justify-end text-red-700">
                        <button type="button" className="text-white absolute top-3 mt-2 right-2 justify-end bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-3 py-2 text-center me-2 mb-2 ">Go Back</button>
                        </NavLink>
                        <h1 className="flex justify-center text-3xl font-semibold mb-8">All Branch Lists</h1>
                        <button className="absolute top-2 mt-2 right-24" onClick={handleExportClick}><img src="/excel.png" alt="download" className="w-12" /></button>
                    </div>
                    <div className="inline-block min-w-full w-full py-0 sm:px-6 lg:px-8 overflow-x-auto">
                        <table className="min-w-full text-center text-sm font-light table">
                            <thead className="border-b font-medium dark:border-neutral-500">
                                <tr className="text-blue-700">
                                    <th scope="col" className="px-5 py-4">
                                        Branch Code
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                        Branch Name
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                        Email ID
                                    </th>
                                    {/* <th scope="col" className="px-5 py-4">
                                        Password
                                    </th> */}
                                    <th scope="col" className="px-5 py-4">
                                        Mobile No.
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                        Phone No.
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                        Branch Manager
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                        Address
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                        Branch District
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                        State
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                        Pincode
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                        Update
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
                                            key={data._id}>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.branchcode}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.branchname}
                                            </td>
                                            <td className="whitespace-nowrap px4 py-4">
                                                {data.branchemail}
                                            </td>
                                            {/* <td className="whitespace-wrap px-4 py-4">
                                                {data.password}
                                            </td> */}
                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.branchmobile}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.branchphone}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.concernperson}
                                            </td>
                                            <td className="whitespace-nowrap px4 py-4">
                                                {data.branchaddress}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.branchdistrict}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.branchstate}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.branchpincode}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                <UpdateBranch branch={data} onUpdate={onUpdateBranch} />
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                <button type="button" onClick={() => onDeleteBranch(data.id)} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2">Delete</button>
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