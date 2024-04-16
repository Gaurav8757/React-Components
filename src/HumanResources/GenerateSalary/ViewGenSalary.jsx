import axios from "axios";
import UpdateGenSalary from "./UpdateGenSalary.jsx";
import SalaryViewPage from "./SalaryViewPage.jsx";
import { useState, useEffect } from "react";
import * as XLSX from 'xlsx';
import { NavLink } from "react-router-dom";
import { useMemo } from 'react';
import { format, addMonths } from 'date-fns';
import { toast } from "react-toastify";

export default function ViewGenPolicy() {
    const [APIData, setAPIData] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(new Date());
    const [initialMonth, setInitialMonth] = useState(new Date());
    const name = sessionStorage.getItem("name");


    useEffect(() => {
        setInitialMonth(new Date()); // Store the initial month when the component mounts
    }, []);

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
            const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
            const fileExtension = ".xlsx";
            const fileName = `${name}_salary`;
            const columnsToInclude = [
                "Employee Name",
                "Monthly Salary",
                "Monthly Leave",
                "Months",
                "Total Days",
                "Present Days",
                "Total Half Days",
                "Absent",
                "Salary",
                "Incentive",
                "Gross Salary",
                "Basic Salary",
                "HRA",
                "CA",
                "Medical Allowance",
                "Tiffin Allowance",
                "Company PF",
                "Employee PF",
                "ESI",
                "Loan EMI",
                "Total Amount"
                // Include other necessary columns here
            ];
            const rowsToInclude = APIData.map(data => [
                data.empName,
                data.monthsalary,
                data.monthleave,
                data.genMonths,
                data.totalDays,
                data.presentDays,
                data.totalHalfDays,
                data.totalAbsent,
                data.genSalary,
                data.incentive,
                data.empgrossSalary,
                data.empbasicSalary,
                data.emphra,
                data.empca,
                data.empmedical,
                data.emptiffin,
                data.empcompanyPf,
                data.emppf,
                data.empesi,
                data.emploanemi,
                data.totalAmount
                // Include other necessary data here
            ]);

            const ws = XLSX.utils.aoa_to_sheet([columnsToInclude, ...rowsToInclude]);
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

    };

    const handleMonthChange = (e) => {
        const [selectedMonthIndex, selectedYear] = e.target.value.split('/').map(Number);
        setSelectedMonth(new Date(selectedYear, selectedMonthIndex - 1, 1)); // Set day to 1 to avoid timezone issues
    };

    const filterDataByMonth = (data, selectedMonth) => {
        const selectedYear = selectedMonth.getFullYear();
        // console.log(selectedYear);
        const selectedMonthIndex = selectedMonth.getMonth() + 1; // January is 1, February is 2, etc.
        // console.log(selectedMonthIndex);
        const selectedMonthString = `${selectedMonthIndex < 10 ? '0' : ''}${selectedMonthIndex}/${selectedYear}`;
        return data.filter(item => item.genMonths === selectedMonthString);
    };
    const filteredData = useMemo(() => filterDataByMonth(APIData, selectedMonth), [APIData, selectedMonth]);

    // ******************** Delete Functions *************************************/
    // const onGenSalaryDelete = async (_id) => {
    //     try {
    //         await axios.delete(`https://eleedomimf.onrender.com/salaries/api/${_id}`);
    //         toast.warn("General Salary Deleted!", { theme: "dark", position: "top-right" });
    //         // Update state or perform any other necessary actions
    //     } catch (error) {
    //         console.error('Error deleting general salary:', error);
    //     }
    // };

    return (
        <section className="container-fluid relative  h-screen p-0 sm:ml-64 bg-slate-200">
            <div className="container-fluid flex justify-center p-2  border-gray-200 border-dashed rounded-lg dark:border-gray-700  bg-slate-200">
                <div className=" relative  min-w-full w-full py-4 ">
                    <div className="flex justify-between mb-4">
                        <div className="flex justify-center mx-2">
                            <select
                                className="input-style rounded-lg"
                                value={format(selectedMonth, 'MM/yyyy')} // Format date as 'MM/yyyy'
                                onChange={handleMonthChange}
                            >
                                {Array.from({ length: 10 }).map((_, index) => {
                const monthDate = addMonths(initialMonth, -index); // Subtract index to go back in time from the initial month
                const formattedMonth = format(monthDate, 'MM/yyyy'); // Format date as 'MM/yyyy'
                return (
                    <option key={index} value={formattedMonth}>{formattedMonth}</option>
                );
            })}
                            </select>

                        </div>
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
                            <thead className="border-b font-medium bg-slate-300 sticky top-0 ">
                                <tr className="text-blue-700 sticky top-0">
                                    <th scope="col" className="px-1 py-0 border border-black">
                                        Update
                                    </th>
                                    <th scope="col" className="px-1 py-0 border border-black">
                                        Employee Name
                                    </th>
                                    <th scope="col" className="px-1 py-0 border border-black">
                                        Monthly Salary
                                    </th>
                                    <th scope="col" className="px-1 py-0 border border-black">
                                        Monthly Leave
                                    </th>
                                    <th scope="col" className="px-1 py-0 border border-black">
                                        Months
                                    </th>
                                    <th scope="col" className="px-1 py-0 border border-black">
                                        Total Days
                                    </th>
                                    <th scope="col" className="px-1 py-0 border border-black">
                                        Present Days
                                    </th>
                                    <th scope="col" className="px-1 py-0 border border-black">
                                        Total Half Days
                                    </th>
                                    <th scope="col" className="px-1 py-0 border border-black">
                                        Absent
                                    </th>
                                    <th scope="col" className="px-1 py-0 border border-black">
                                        Salary
                                    </th>
                                    <th scope="col" className="px-1 py-0 border border-black">
                                        Incentive
                                    </th>
                                    <th scope="col" className="px-1 py-0 border border-black">
                                        Gross Salary
                                    </th>
                                    <th scope="col" className="px-1 py-0 border border-black">
                                        Basic Salary
                                    </th>
                                    <th scope="col" className="px-1 py-0 border border-black">
                                        HRA
                                    </th>
                                    <th scope="col" className="px-1 py-0 border border-black">
                                        CA
                                    </th>
                                    <th scope="col" className="px-1 py-0 border border-black">
                                        Medical Allowance
                                    </th>
                                    <th scope="col" className="px-1 py-0 border border-black">
                                        Tiffin Allowance
                                    </th>
                                    <th scope="col" className="px-1 py-0 border border-black">
                                        Company PF
                                    </th>
                                    <th scope="col" className="px-1 py-0 border border-black">
                                        Employee PF
                                    </th>
                                    <th scope="col" className="px-1 py-0 border border-black">
                                        ESI
                                    </th>
                                    <th scope="col" className="px-1 py-0 border border-black">
                                        Loan EMI
                                    </th>
                                    <th scope="col" className="px-1 py-0 border border-black">
                                        Total Amount
                                    </th>
                                    <th scope="col" className="px-1 py-0 border border-black">
                                        View
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 overflow-y-hidden">
                                {filteredData.map((data) => {
                                    if (data.genMonths) {
                                        return (
                                            <tr
                                                className="border-b dark:border-neutral-200 text-sm font-medium"
                                                key={data._id}>
                                                <td className="whitespace-nowrap px-1 py-0 border border-black">
                                                    <UpdateGenSalary genSalaries={data} onUpdate={updateGenSalary} />
                                                </td>
                                                <td className="whitespace-nowrap px-1 py-0 border border-black">
                                                    {data.empName}
                                                </td>
                                                <td className="whitespace-nowrap px-1 py-0 border border-black">
                                                    {data.monthsalary}
                                                </td>
                                                <td className="whitespace-nowrappx-1 py-0 border border-black">
                                                    {data.monthleave}
                                                </td>
                                                <td className="whitespace-nowrap px-1 py-0 border border-black">
                                                    {data.genMonths}
                                                </td>
                                                <td className="whitespace-nowrap px-1 py-0 border border-black">
                                                    {data.totalDays}
                                                </td>
                                                <td className="whitespace-nowrap px-1 py-0 border border-black">
                                                    {data.presentDays}
                                                </td>
                                                <td className="whitespace-nowrap px-1 py-0 border border-black">
                                                    {data.totalHalfDays}
                                                </td>
                                                <td className="whitespace-nowrap px-1 py-0 border border-black">
                                                    {data.totalAbsent}
                                                </td>
                                                <td className="whitespace-nowrap px-1 py-0 border border-black">
                                                    {data.genSalary}
                                                </td>
                                                <td className="whitespace-nowrap px-1 py-0 border border-black">
                                                    {data.incentive}
                                                </td>
                                                <td className="whitespace-nowrappx-1 py-0 border border-black">
                                                    {data.empgrossSalary}
                                                </td>
                                                <td className="whitespace-nowrap px-1 py-0 border border-black">
                                                    {data.empbasicSalary}
                                                </td>
                                                <td className="whitespace-nowrap px-1 py-0 border border-black">
                                                    {data.emphra}
                                                </td>
                                                <td className="whitespace-nowrap px-1 py-0 border border-black">
                                                    {data.empca}
                                                </td>
                                                <td className="whitespace-nowrap px-1 py-0 border border-black">
                                                    {data.empmedical}
                                                </td>
                                                <td className="whitespace-nowrap px-1 py-0 border border-black">
                                                    {data.emptiffin}
                                                </td>
                                                <td className="whitespace-nowrap px-1 py-0 border border-black">
                                                    {data.empcompanyPf}
                                                </td>
                                                <td className="whitespace-nowrap px-1 py-0 border border-black">
                                                    {data.emppf}
                                                </td>
                                                <td className="whitespace-nowrap px-1 py-0 border border-black">
                                                    {data.empesi}
                                                </td>
                                                <td className="whitespace-nowrap px-1 py-0 border border-black">
                                                    {data.emploanemi}
                                                </td>
                                                <td className="whitespace-nowrap px-1 py-0 border border-black">
                                                    {data.totalAmount}
                                                </td>
                                                <td className="whitespace-nowrap px-1 py-0 border border-black">
                                                    <SalaryViewPage data={data} />
                                                </td>
                                                {/* <td className="whitespace-nowrap px-1 py-0 border border-black">
                                                <button type="button" onClick={() => onGenSalaryDelete(data._id)} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2 text-center my-1">Delete</button>
                                            </td> */}
                                            </tr>
                                        );
                                    } else {
                                        return null;
                                    }
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
}