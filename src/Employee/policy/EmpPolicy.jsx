import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import AddPolicyDetail from './AddPolicyDetail.jsx';
import * as XLSX from 'xlsx';
// update policy
function EmpPolicy() {
    const [APIData, setAPIData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const empid = sessionStorage.getItem("employeeId");
    const name = sessionStorage.getItem("name");
    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            toast.error("Not Authorized yet.. Try again! ");
        } else {
            // The user is authenticated, so you can make your API request here.
            axios
                .get(`https://eleedomimf.onrender.com/alldetails/viewdata/${empid}`, {
                    headers: {
                        Authorization: `${token}`, // Send the token in the Authorization header
                    },
                })
                .then((response) => {
                    //   console.log(response.data);
                    setAPIData(response.data);
                    setIsLoading(false);
                })
                .catch((error) => {
                    toast.error(error);
                    console.error(error);
                });
        }
    }, [empid]);



    // refreshing page after updating data
    const onUpdatePolicy = async () => {
        try {
            const token = sessionStorage.getItem("token");

            if (!token) {
                toast.error("Not Authorized yet.. Try again!");
            } else {
                const response = await axios.get(
                    `https://eleedomimf.onrender.com/alldetails/viewdata/${empid}`,
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
            const fileName = name;

            // Get all table headers and rows
            const tableHeaders = document.querySelectorAll(".table th");
            const tableRows = document.querySelectorAll(".table tbody tr");

            // Include only the first 26 columns and all rows
            const columnsToInclude = Array.from(tableHeaders).slice(0, 25);
            const rowsToInclude = Array.from(tableRows).map(row => {
                const cells = Array.from(row.querySelectorAll("td")).slice(0, 25);
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
    return (
        <section className="container-fluid relative   p-0 sm:ml-64 bg-slate-200">
            <div className="container-fluid flex justify-center p-2  border-gray-200 border-dashed rounded-lg   bg-slate-200">
                <div className="inline-block min-w-full w-full py-0 bg-slate-200">
                    <div className="flex  text-blue-500 bg-slate-200">
                        <h1 className="flex justify-center text-3xl font-semibold w-full mb-8">Policy Lists</h1>
                        <button className="" onClick={handleExportClick}><img src="/excel.png" alt="download" className="w-12" /></button>
                    </div>
                    {isLoading ? ( // Conditional rendering for loading state
                        <p className='mt-20 text-2xl font-bold'>Loading policies...</p>
                    ) : (
                        <div className="inline-block min-w-full w-full py-0 ">
                            {APIData.length === 0 ? ( // Conditional rendering when there are no policies
                                <p className='mt-20 text-2xl font-bold flex  justify-center text-center'>No policies found.</p>
                            ) : (
                                <table className="min-w-full  border text-center bg-slate-200 text-sm font-light table ">
                                    <thead className="   font-medium sticky bg-slate-200 top-16">
                                        <tr className="text-blue-700 font-bold bg-slate-200 sticky top-16">
                                            <th scope="col" className="px-4 py-4">
                                                Update
                                            </th>
                                            <th scope="col" className="px-4 py-4 ">
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
                                                Policy No.
                                            </th>
                                            <th scope="col" className="px-4 py-4">
                                                Engine No.
                                            </th>
                                            <th scope="col" className="px-4 py-4">
                                                Chassis No
                                            </th>
                                            <th scope="col" className="px-4 py-4">
                                                Policy Type
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
                                                GST(%)
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
                                                Policy Payment Mode
                                            </th>
                                            <th scope="col" className="px-4 py-4">
                                                Policy Made By
                                            </th>
                                            

                                            {/* <th scope="col" className="px-4 py-4">
                                    Delete
                                </th> */}
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-gray-200 overflow-y-hidden">

                                        {APIData.map((data) => {
                                            return (
                                                <tr
                                                    className="border-b border-gray-200 dark:border-neutral-200 text-sm font-medium"
                                                    key={data._id}
                                                >
                                                    <td className="whitespace-nowrap px-3 py-4">

                                                        <AddPolicyDetail insurance={data} onUpdates={onUpdatePolicy} />
                                                    </td>
                                                    <td className="whitespace-nowrap  px-3 py-4">
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
                                                        {data.taxes}
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
                                                        {data.policyPaymentMode}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4">
                                                        {data.policyMadeBy}
                                                    </td>



                                                </tr>
                                            );
                                        })}
                                    </tbody>

                                </table>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default EmpPolicy;