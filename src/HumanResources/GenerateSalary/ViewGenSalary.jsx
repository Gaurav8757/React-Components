import axios from "axios";
import UpdateGenSalary from "./UpdateGenSalary.jsx";
import { useState, useEffect } from "react";
import * as XLSX from 'xlsx';
import { NavLink } from "react-router-dom";
// import { TiArrowBack } from "react-icons/ti";
import { toast } from "react-toastify";
export default function ViewGenPolicy() {
    const [APIData, setAPIData] = useState([]);
    const name = sessionStorage.getItem("name");


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


    const exportToExcel = () => {
        try {
            const fileType =
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
            const fileExtension = ".xlsx";
            const fileName = `${name}_final_salary`;

            // Get all table headers and rows
            const tableHeaders = document.querySelectorAll(".table th");
            const tableRows = document.querySelectorAll(".table tbody tr");

            // Include only the first 26 columns and all rows
            const columnsToInclude = Array.from(tableHeaders).slice(0, 21);
            const rowsToInclude = Array.from(tableRows).map(row => {
                const cells = Array.from(row.querySelectorAll("td")).slice(0, 21);
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
                <div className=" relative text-blue-500 min-w-full w-full py-4 ">
                    <div className="flex justify-between mb-4">
                        <h1></h1>
                        <h1 className="  font-semibold text-3xl w-auto mb-0 hidden sm:hidden md:block lg:block xl:block">
                            Employee Generate Salary Lists
                        </h1>
                        <div className="flex">
                            <button className="flex justify-center mx-4" onClick={handleExportClick}><img src="/excel.png" alt="download" className="w-12" /></button>
                            <NavLink to="/hr/home/generate/salary" className="flex justify-center">
                                <button type="button" className="text-white justify-end bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-3 py-2 text-center me-2 mb-2 ">Go Back</button>
                            </NavLink>
                        </div>
                    </div>








                    <div className="inline-block min-w-full w-full py-0  ">
                        <table className="min-w-full text-center text-sm font-light table">
                            <thead className="border-b font-medium bg-slate-300 sticky top-20 ">
                                <tr className="text-blue-700 sticky top-20">
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
                                        Gross Salary
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                        Basic Salary
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                        HRA
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                        CA
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                        Medical Allowance
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                        Tiffin Allowance
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                        Company PF
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                        Employee PF
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                        ESI
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                        Loan EMI
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
                            <tbody className="divide-y divide-gray-200 overflow-y-hidden">
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
                                            <td className="whitespace-nowrap px4 py-4">
                                                {data.empgrossSalary}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.empbasicSalary}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.emphra}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.empca}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.empmedical}
                                            </td>

                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.emptiffin}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.empcompanyPf}
                                            </td>

                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.emppf}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.empesi}
                                            </td>

                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.emploanemi}
                                            </td>



                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.totalAmount}
                                            </td>

                                            <td className="whitespace-nowrap px-4 py-4">
                                                <UpdateGenSalary genSalaries={data} onUpdate={updateGenSalary} />
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