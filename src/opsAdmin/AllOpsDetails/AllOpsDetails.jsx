import AllOpsData from './AllOpsData.jsx';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import * as XLSX from 'xlsx';

function AllOpsDetails() {
    const [APIData, setAPIData] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState();
    const [searchId, setSearchId] = useState("");
    const [searchBranch, setSearchBranch] = useState("");
    const [searchInsuredName, setSearchInsuredName] = useState("");
    const [searchPolicyMadeBy, setSearchPolicyMadeBy] = useState("");
    const name = sessionStorage.getItem("name");

    useEffect(() => {
        setItemsPerPage(12);
    }, [])

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

    // Handle date range filter change
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
        const branchLower = data.branch?.toLowerCase() || "";
        const policyMadeByLower = data.policyMadeBy?.toLowerCase() || "";
        return (
            // Filter conditions using optional chaining and nullish coalescing
            (idLower.includes(searchId.toLowerCase()) || searchId === '') &&
            (insuredNameLower.includes(searchInsuredName.toLowerCase()) || searchInsuredName === '') &&
            (branchLower.includes(searchBranch.toLowerCase()) || searchBranch === '') &&
            (policyMadeByLower.includes(searchPolicyMadeBy.toLowerCase()) || searchPolicyMadeBy === '') &&
            (startDate === "" || new Date(data.entryDate) >= new Date(startDate)) &&
            (endDate === "" || new Date(data.entryDate) <= new Date(endDate))
        );
    });

    const handlePolicyMadeByChange = (event) => {
        setSearchPolicyMadeBy(event.target.value);
    };

    // Calculate total number of pages
    const totalItems = filteredData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Calculate starting and ending indexes of items to be displayed on the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

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
        <section className="container-fluid relative  p-0 sm:ml-64 bg-slate-200">
            <div className="container-fluid flex justify-center p-2  border-gray-200 border-dashed rounded-lg   bg-slate-200">
                <div className="inline-block min-w-full w-full py-0 ">
                    <div className=" mb-4 flex justify-between text-blue-500 max-w-auto mx-auto w-auto ">
                        <h1></h1>
                        <span className=" flex justify-center text-center  text-3xl font-semibold  ">Policies Lists</span>
                        <button className="text-end  flex justify-end  text-3xl font-semibold " onClick={handleExportClick}><img src="/excel.png" alt="download" className="w-12" /></button>
                    </div>
                    {/* filter with table */}
                    <div className="inline min-w-full w-full pt-2 ">
                        <div className="flex-wrap  flex justify-between  text-blue-500 max-w-auto mx-auto w-auto ">
                            {/* date range filter */}
                            <div className="flex   p-0 text-start w-full lg:w-1/4">
                                <label className="my-0 text-lg whitespace-nowrap font-medium text-gray-900">Filter by Date:</label>
                                <input type="date" value={startDate} onChange={(e) => handleDateRangeChange(e, "start")} className="shadow input-style w-52 my-0 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0 mb-2 ml-2" placeholder="From Date" />
                                <span className='text-justify mx-1 my-1 '>to</span>
                                <input type="date" value={endDate} onChange={(e) => handleDateRangeChange(e, "end")} className="shadow input-style w-52 my-0 py-0 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none  px-0 mb-2 " placeholder="To Date" />
                            </div>
                            <div className="flex p-0 ml-10 justify-center text-center w-full lg:w-1/4">
                                <label className="my-0 text-lg font-medium text-gray-900">Filter by ID:</label>
                                <input
                                    type="search"
                                    onChange={(e) => setSearchId(e.target.value)}
                                    className="shadow input-style w-52 my-0 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0 mb-2 ml-2"
                                    placeholder="ID"
                                />
                            </div>
                            <div className="flex justify-end p-0 text-end w-full lg:w-1/4">
                                <label className="my-0 text-lg font-medium text-gray-900">Filter by Branch:</label>
                                <input
                                    type="search"
                                    onChange={(e) => setSearchBranch(e.target.value)}
                                    className="shadow input-style w-52 my-0 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0 mb-2 ml-2"
                                    placeholder="Branch"
                                />
                            </div>
                            <div className="flex justify-start p-0 text-start w-full lg:w-1/4">
                                <label className="my-0 text-lg font-medium text-gray-900">Filter by Insured Name:</label>
                                <input
                                    type="search"
                                    onChange={(e) => setSearchInsuredName(e.target.value)}
                                    className="shadow input-style w-52 my-0 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0 mb-2 ml-2"
                                    placeholder="Insured Name"
                                />
                            </div>
                            <div className="flex p-0 text-center justify-center w-1/2 lg:w-1/4">
                                <label className="my-0 text-lg font-medium text-gray-900">Filter by Policy MadeBy:</label>
                                <input
                                    type="search"
                                    onChange={handlePolicyMadeByChange}
                                    className="shadow p-0 text-start w-1/2 lg:w-1/2 input-style  my-0 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0 mb-2 ml-2"
                                    placeholder="Policy Made By"
                                /></div>
                        </div>

                        <table className="min-w-full  text-center text-sm font-light table bg-slate-200">
                            <thead className="border-b font-medium bg-slate-300  sticky top-16">
                                <tr className="text-blue-700 sticky  border border-black">
                                    <th scope="col" className="  border border-black sticky">
                                        Update
                                    </th>
                                    <th scope="col" className="px-3 border border-black">
                                        Reference ID
                                    </th>
                                    <th scope="col" className="px-3 border border-black">
                                        Entry Date
                                    </th>
                                    <th scope="col" className="px-3 border border-black">
                                        Branch
                                    </th>
                                    <th scope="col" className="px-3 border border-black sticky">
                                        Insured By
                                    </th>
                                    <th scope="col" className="px-3 border border-black sticky">
                                        Contact No.
                                    </th>
                                    <th scope="col" className="px-3 border border-black sticky">
                                        Policy Made By
                                    </th>
                                    <th scope="col" className="px-3 border border-black sticky">
                                        Sent Time
                                    </th>
                                   
                                    <th scope="col" className="px-3 border border-black">
                                        Company
                                    </th>
                                    <th scope="col" className="px-3 border border-black">
                                        Category
                                    </th>
                                    <th scope="col" className="px-3 border border-black sticky">
                                        Policy Type
                                    </th>
                                    <th scope="col" className="px-3 border border-black sticky">
                                        Policy No.
                                    </th>
                                    <th scope="col" className="px-3 border border-black sticky">
                                        Engine No.
                                    </th>
                                    <th scope="col" className="px-3 border border-black sticky">
                                        Chassis No
                                    </th>
                                    <th scope="col" className="px-3 border border-black sticky">
                                        OD Premium
                                    </th>
                                    <th scope="col" className="px-3 border border-black sticky">
                                        Liability Premium
                                    </th>
                                    <th scope="col" className="px-3 border border-black sticky">
                                        Net Premium
                                    </th>
                                    <th scope="col" className="px-3 border border-black sticky">
                                        GST(in rupees)
                                    </th>
                                    <th scope="col" className="px-3 border border-black sticky">
                                        RSA
                                    </th>
                                    <th scope="col" className="px-3 border border-black sticky">
                                        Final Amount
                                    </th>
                                    <th scope="col" className="px-3 border border-black sticky">
                                        OD Discount(%)
                                    </th>
                                    <th scope="col" className="px-3 border border-black sticky">
                                        NCB
                                    </th>
                                    <th scope="col" className="px-3 border border-black sticky">
                                        Policy Pay Mode
                                    </th>
                                    {/* <th scope="col" className="px-3 border border-black sticky">
                                        Segment
                                    </th>
                                    <th scope="col" className="px-3 border border-black sticky">
                                        Sourcing
                                    </th>
                                    <th scope="col" className="px-3 border border-black sticky">
                                        Hypothinition
                                    </th>
                                    <th scope="col" className="px-3 border border-black sticky">
                                        Advisor Name
                                    </th>
                                    <th scope="col" className="px-3 border border-black sticky">
                                        Sub-Advisor Name
                                    </th>
                                    
                                  
                                    <th scope="col" className="px-3 border border-black sticky">
                                        Final Premium(GST%)
                                    </th> */}
                                   
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 border border-black overflow-y-hidden">
                                {filteredData.reverse().slice(startIndex, endIndex).map((data) => (
                                    <AllOpsData key={data._id} data={data} policy={onUpdatePolicy} />
                                ))}
                            </tbody>
                        </table>
                    </div>
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
export default AllOpsDetails;