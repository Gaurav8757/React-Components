import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import AddPolicyDetail from './AddPolicyDetail.jsx';
import * as XLSX from 'xlsx';
// update policy
function EmpPolicy() {
    const [APIData, setAPIData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState();
    const [searchId, setSearchId] = useState("");
    const [searchCompany, setSearchCompany] = useState("");
    const [searchInsuredName, setSearchInsuredName] = useState("");
    const [contactNo, setContactNo] = useState("");
    const empid = sessionStorage.getItem("employeeId");
    const name = sessionStorage.getItem("name");

    useEffect(() => {
        setItemsPerPage(13);
    }, []);


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

    const handleDateRangeChange = (event, type) => {
        if (type === "start") {
            setStartDate(event.target.value);
        } else if (type === "end") {
            setEndDate(event.target.value);
        }
    };

    const filteredData = APIData.filter(data => {
        // Check if data is defined
        if (!data) return false;
        // Filter conditions
        const idLower = data._id?.toLowerCase() || "";
        const insuredNameLower = data.insuredName?.toLowerCase() || "";
        const companyLower = data.company?.toLowerCase() || "";
        const contacNoLower = data.contactNo?.toLowerCase() || "";
        return (
            // Filter conditions using optional chaining and nullish coalescing
            (idLower.includes(searchId.toLowerCase()) || searchId === '') &&
            (insuredNameLower.includes(searchInsuredName.toLowerCase()) || searchInsuredName === '') &&
            (companyLower.includes(searchCompany.toLowerCase()) || searchCompany === '') &&
            // Update the state variable for company correctly
            (contacNoLower.includes(contactNo.toLowerCase()) || contactNo === '') &&
            // Ensure correct date filtering logic
            (startDate === "" || new Date(data.entryDate) >= new Date(startDate)) &&
            (endDate === "" || new Date(data.entryDate) <= new Date(endDate))
        );
    });

    // Calculate total number of pages
    const totalItems = filteredData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);


    // Calculate starting and ending indexes of items to be displayed on the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

    // Handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };


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
                <div className="inline-block min-w-full w-full py-0">
                    <div className=" m-4 flex justify-between text-blue-500 max-w-auto mx-auto w-auto ">
                        <h1></h1>
                        <span className=" flex justify-center text-center  text-3xl font-semibold  ">View All Policies</span>
                        <button className="text-end  flex justify-end  text-3xl font-semibold " onClick={handleExportClick}><img src="/excel.png" alt="download" className="w-12" /></button>
                    </div>

                    {isLoading ? ( // Conditional rendering for loading state
                        <p className='mt-20 text-2xl font-bold'>Loading policies...</p>
                    ) : (
                        <div className="inline-block min-w-full w-full py-0 ">
                            {APIData.length === 0 ? ( // Conditional rendering when there are no policies
                                <p className='mt-20 text-2xl font-bold flex  justify-center text-center'>No policies found.</p>
                            ) : (
                                <div className="min-w-full w-full py-0  block z-50">
                                    <div className="flex-wrap mb-4 flex justify-between  text-blue-500 max-w-auto mx-auto w-auto ">
                                        {/* date range filter */}
                                        <div className="flex p-0 text-start w-full lg:w-1/4">
                                            <label className="my-1 text-base whitespace-nowrap font-medium text-gray-900">Filter by Date:</label>
                                            <input type="date" value={startDate} onChange={(e) => handleDateRangeChange(e, "start")} className="shadow input-style w-52 my-0 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0 mb-2 ml-2" placeholder="From Date" />
                                            <span className='text-justify mx-1 my-1 '>to</span>
                                            <input type="date" value={endDate} onChange={(e) => handleDateRangeChange(e, "end")} className="shadow input-style w-52 my-0 py-0 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none  px-0 mb-2 " placeholder="To Date" />
                                        </div>

                                        <div className="flex p-0 justify-start text-center w-full lg:w-1/5">
                                            <label className="my-1 text-base font-medium text-gray-900">Filter by ID:</label>
                                            <input
                                                type="search"
                                                onChange={(e) => setSearchId(e.target.value)}
                                                className="shadow input-style w-52 my-0 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0 mb-2 ml-2"
                                                placeholder="ID"
                                            />
                                        </div>

                                        <div className="flex justify-start p-0 text-end w-full  lg:w-1/4">
                                            <label className="my-1 text-base font-medium text-gray-900">Filter by Company:</label>
                                            <input
                                                type="search"
                                                onChange={(e) => setSearchCompany(e.target.value)}
                                                className="shadow input-style w-52 my-0 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0 mb-2 ml-2"
                                                placeholder="Company Name"
                                            />
                                        </div>

                                        <div className="flex justify-start  text-start w-full  lg:w-1/4">
                                            <label className="my-1 text-base font-medium text-gray-900">Filter by Insured Name:</label>
                                            <input
                                                type="search"
                                                onChange={(e) => setSearchInsuredName(e.target.value)}
                                                className="shadow input-style w-52 my-0 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0 mb-2 ml-2"
                                                placeholder="Insured Name"
                                            />
                                        </div>

                                        <div className="flex p-0 mt-4 text-center justify-start lg:w-1/5">
                                            <label className="my-1 text-base font-medium whitespace-nowrap text-gray-900">Filter by Contact No:</label>
                                            <input
                                                type="search"
                                                onChange={(e) => setContactNo(e.target.value)}
                                                className="shadow p-0 text-start   input-style  my-0 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0 mb-2 ml-2"
                                                placeholder="Contact Number"
                                            /></div>
                                    </div>

                                    <table className="min-w-full  border text-center bg-slate-200 text-sm font-light table">
                                        <thead className="   font-medium sticky bg-slate-200">
                                            <tr className="text-blue-700 font-bold border border-black bg-slate-200 sticky">
                                                <th scope="col" className="px-1 pt-2 sticky border border-black">
                                                    Update
                                                </th>
                                                <th scope="col" className="px-1 pt-2 sticky border border-black">
                                                    Entry Date
                                                </th>
                                                <th scope="col" className="px-1 pt-2 sticky border border-black">
                                                    Received Time
                                                </th>
                                                <th scope="col" className="px-1 pt-2 sticky border border-black">
                                                    Updated Time
                                                </th>
                                                <th scope="col" className="px-1 pt-2 sticky border border-black">
                                                    Reference ID
                                                </th>
                                              
                                                <th scope="col" className="px-1 pt-2 sticky border border-black">
                                                    Branch
                                                </th>
                                                <th scope="col" className="px-1 pt-2 sticky border border-black">
                                                    Insured By
                                                </th>
                                                <th scope="col" className="px-1 pt-2 sticky border border-black">
                                                    Contact No.
                                                </th>
                                                <th scope="col" className="px-1 pt-2 sticky border border-black">
                                                    Policy Made Through
                                                </th>
                                                <th scope="col" className="px-1 pt-2 sticky border border-black">
                                                    Company
                                                </th>
                                                <th scope="col" className="px-1 pt-2 sticky border border-black">
                                                    Category
                                                </th>
                                                <th scope="col" className="px-1 pt-2 sticky border border-black">
                                                    Policy Type
                                                </th>
                                                <th scope="col" className="px-1 pt-2 sticky border border-black">
                                                    Policy No.
                                                </th>
                                                <th scope="col" className="px-1 pt-2 sticky border border-black">
                                                    Engine No.
                                                </th>
                                                <th scope="col" className="px-1 pt-2 sticky border border-black">
                                                    Chassis No
                                                </th>
                                                <th scope="col" className="px-1 pt-2 sticky border border-black">
                                                    OD Premium
                                                </th>
                                                <th scope="col" className="px-1 pt-2 sticky border border-black">
                                                    Liability Premium
                                                </th>
                                                <th scope="col" className="px-1 pt-2 sticky border border-black">
                                                    Net Premium
                                                </th>
                                                <th scope="col" className="px-1 pt-2 sticky border border-black">
                                                    GST in rupees
                                                </th>
                                                <th scope="col" className="px-1 pt-2 sticky border border-black">
                                                    RSA
                                                </th>
                                                <th scope="col" className="px-1 pt-2 sticky border border-black">
                                                    Final Amount
                                                </th>
                                                <th scope="col" className="px-1 pt-2 sticky border border-black">
                                                    OD Discount(%)
                                                </th>
                                                <th scope="col" className="px-1 pt-2 sticky border border-black">
                                                    NCB
                                                </th>
                                                <th scope="col" className="px-1 pt-2 sticky border border-black">
                                                    Policy Payment Mode
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody className="divide-y divide-gray-200 overflow-y-hidden">
                                            {filteredData.reverse().slice(startIndex, endIndex).map((data) => {
                                                return (
                                                    <tr
                                                        className="border-b border-gray-200 dark:border-neutral-200 text-sm font-medium"
                                                        key={data._id}>
                                                        <td className="whitespace-nowrap px-1 py-0 border border-black">
                                                            <AddPolicyDetail insurance={data} onUpdates={onUpdatePolicy} />
                                                        </td>
                                                        <td className="whitespace-nowrap px-1 py-0 border border-black">
                                                            {data.entryDate}
                                                        </td>
                                                        <td className="whitespace-nowrap px-1 py-0 border border-black">
                                                            {data.currentTime}
                                                        </td>
                                                        <td className="whitespace-nowrap px-1 py-0 border border-black">
                                                            {data.empTime}
                                                        </td>
                                                        <td className="whitespace-nowrap px-1 py-0 border border-black">
                                                            {data._id}
                                                        </td>
                                                       
                                                        <td className="whitespace-nowrap px-1 py-0 border border-black">
                                                            {data.branch}
                                                        </td>
                                                        <td className="whitespace-nowrap px-1 py-0 border border-black">
                                                            {data.insuredName}
                                                        </td>
                                                        <td className="whitespace-nowrap px-1 py-0 border border-black">
                                                            {data.contactNo}
                                                        </td>
                                                        <td className="whitespace-nowrap px-1 py-0 border border-black">
                                                            {data.staffName}
                                                        </td>
                                                        <td className="whitespace-nowrap px-1 py-0 border border-black">
                                                            {data.company}
                                                        </td>
                                                        <td className="whitespace-nowrap px-1 py-0 border border-black">
                                                            {data.category}
                                                        </td>
                                                        <td className="whitespace-nowrap px-1 py-0 border border-black">
                                                            {data.policyType}
                                                        </td>
                                                        <td className="whitespace-nowrap px-1 py-0 border border-black">
                                                            {data.policyNo}
                                                        </td>

                                                        <td className="whitespace-nowrap px-1 py-0 border border-black">
                                                            {data.engNo}
                                                        </td>
                                                        <td className="whitespace-nowrap px-1 py-0 border border-black">
                                                            {data.chsNo}
                                                        </td>
                                                        <td className="whitespace-nowrap px-1 py-0 border border-black">
                                                            {data.odPremium}
                                                        </td>

                                                        <td className="whitespace-nowrap px-1 py-0 border border-black">
                                                            {data.liabilityPremium}
                                                        </td>
                                                        <td className="whitespace-nowrap px-1 py-0 border border-black">
                                                            {data.netPremium}
                                                        </td>
                                                        <td className="whitespace-nowrap px-1 py-0 border border-black">
                                                            {data.taxes}
                                                        </td>
                                                        <td className="whitespace-nowrap px-1 py-0 border border-black">
                                                            {data.rsa}
                                                        </td>
                                                        <td className="whitespace-nowrap px-1 py-0 border border-black">
                                                            {data.finalEntryFields}
                                                        </td>
                                                        <td className="whitespace-nowrap px-1 py-0 border border-black">
                                                            {data.odDiscount}
                                                        </td>
                                                        <td className="whitespace-nowrap px-1 py-0 border border-black">
                                                            {data.ncb}
                                                        </td>
                                                        <td className="whitespace-nowrap px-1 py-0 border border-black">
                                                            {data.policyPaymentMode}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            {/* Pagination */}

            <nav aria-label="Page navigation flex example sticky   ">
                <ul className="flex justify-end my-0  -space-x-px text-xl">
                    <li className=''>
                        <button onClick={() => handlePageChange(currentPage - 1)} className={`flex items-center justify-end px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 ${currentPage === 1 && 'opacity-50 cursor-not-allowed'}`}>Previous</button>
                    </li>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <li key={i} className='bg-slate-500'>
                            <button onClick={() => handlePageChange(i + 1)} className={`flex items-center justify-end px-3 h-8 leading-tight ${currentPage === i + 1 ? 'text-blue-600 font-bold border bg-blue-100' : 'text-gray-500 bg-white border'} border-gray-300 hover:bg-gray-100 hover:text-gray-700`}>{i + 1}</button>
                        </li>
                    ))}
                    <li className=''>
                        <button onClick={() => handlePageChange(currentPage + 1)} className={`flex items-center justify-end px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 ${currentPage === totalPages && 'opacity-50 cursor-not-allowed'}`}>Next</button>
                    </li>
                </ul>
            </nav>
        </section>
    )
}

export default EmpPolicy;