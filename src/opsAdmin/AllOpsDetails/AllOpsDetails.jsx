import AllOpsData from './AllOpsData.jsx';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
// import "../../assets/css/allview.css"
import * as XLSX from 'xlsx';
function AllOpsDetails() {
    const [APIData, setAPIData] = useState([]);
    const name = sessionStorage.getItem("name");
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

    // refreshing page after updating data
    const onUpdatePolicy = async () => {
        try {
            const token = sessionStorage.getItem("token");

            if (!token) {
                toast.error("Not Authorized yet.. Try again!");
            } else {
                const response = await axios.get(
                    `https://eleedomimf.onrender.com/alldetails/viewdata`,
                    {
                        headers: {
                            Authorization: `${token}`,
                        },
                    }
                );
                setAPIData(response.data);
            }
        } catch (error) {
            console.error("Error fetching updated insurance data:", error);
        }
    };

    const exportToExcel = () => {
        try {
            const fileType =
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
            const fileExtension = ".xlsx";
            const fileName = `${name}_opsAdmin`;

            // Get all table headers and rows
            const tableHeaders = document.querySelectorAll(".table th");
            const tableRows = document.querySelectorAll(".table tbody tr");

            // Include only the first 26 columns and all rows
            const columnsToInclude = Array.from(tableHeaders).slice(0, 26);
            const rowsToInclude = Array.from(tableRows).map(row => {
                const cells = Array.from(row.querySelectorAll("td")).slice(0, 26);
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
    };

    return (
        <section className="container-fluid relative  h-screen p-0 sm:ml-64 bg-slate-200">
            <div className="container-fluid flex justify-center p-2  border-gray-200 border-dashed rounded-lg   bg-slate-200">
                <div className="inline-block min-w-full w-full py-0 sm:px-0 lg:px-0">
                    <div className=" w-xl  text-blue-500">
                        <h1 className="flex justify-center text-3xl font-semibold w-full mb-8">Policies Lists</h1><hr></hr>
                        <button className="absolute top-2 right-10" onClick={handleExportClick}><img src="/excel.png" alt="download" className="w-12" /></button>
                    </div>
                    <div className="inline-block min-w-full w-full py-0 sm:px-3 lg:px-3 overflow-x-scroll">
                        {/* <div className="pane-hScroll"> */}
                            <table className="min-w-full  text-center text-sm font-light table">
                                <thead className="border-b font-medium dark:border-neutral-500">
                                    <tr className="text-blue-700 ">
                                        <th scope="col" className="px-4 py-4">
                                            Reference ID
                                        </th>
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
                                        <th scope="col" className="px-4 py-4">
                                            Policy Type
                                        </th>
                                        <th scope="col" className="px-4 py-4">
                                            Policy No.
                                        </th>
                                        <th scope="col" className="px-4 py-4">
                                            Engine No.
                                        </th>
                                        <th scope="col" className="px-4 py-4">
                                            Chassis No
                                        </th>

                                        <th scope="col" className="px-4 py-4">
                                            OD Premium
                                        </th>
                                        <th scope="col" className="px-4 py-4">
                                            Liability Premium
                                        </th>
                                        <th scope="col" className="px-4 py-4">
                                            Net Premium
                                        </th>
                                        <th scope="col" className="px-4 py-4">
                                            Final Premium(GST%)
                                        </th>
                                        <th scope="col" className="px-4 py-4">
                                            OD Discount(%)
                                        </th>
                                        <th scope="col" className="px-4 py-4">
                                            NCB
                                        </th>
                                        <th scope="col" className="px-4 py-4">
                                            Policy Made By
                                        </th>
                                        <th scope="col" className="px-4 py-4">
                                            Status
                                        </th>
                                        <th scope="col" className="px-4 py-4">
                                            Sent to
                                        </th>
                                        <th scope="col" className="px-4 py-4">
                                            Select Employee
                                        </th>
                                        <th scope="col" className="px-4 py-4">
                                            Send to Made Policy
                                        </th>
                                    </tr>
                                </thead>
                            {/* </table> */}
                            {/* <div className="pane-vScroll"> */}
                                {/* <table className="min-w-full  text-center text-sm font-light table "> */}
                                    <tbody>
                                        {APIData.map((data) => (
                                            <AllOpsData key={data._id} data={data} policy={onUpdatePolicy} />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                {/* </div> */}
            {/* </div> */}
        </section>
    )
}
export default AllOpsDetails;