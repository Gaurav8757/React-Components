import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import * as XLSX from 'xlsx';
import AdvisorUpdates from "./AdvisorUpdates.jsx";
import { toast } from "react-toastify";
import VITE_DATA from "../../config/config.jsx";

function ListAdvisor() {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState();
    const [APIData, setAPIData] = useState([]);
    const [searchId, setSearchId] = useState("");
    const [advaddress, setAdvAddress] = useState("");
    const [searchAdv, setSearchAdv] = useState("");
    const [advemail, setAdvEmail] = useState("");
    const name = sessionStorage.getItem('name');
    useEffect(() => {
        setItemsPerPage(20);
    }, []);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            toast.error("Not Authorized yet.. Try again! ");
        } else {
            // The user is authenticated, so you can make your API request here.
            axios
                .get(`${VITE_DATA}/advisor/all/lists`, {
                    headers: {
                        Authorization: `${token}`, // Send the token in the Authorization header
                    }, params: { branch: name }
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
    const onUpdateAdvisor = async () => {
        try {
            const token = sessionStorage.getItem("token");

            if (!token) {
                toast.error("Not Authorized yet.. Try again!");
            } else {
                const response = await axios.get(
                    `${VITE_DATA}/advisor/all/lists`,
                    {
                        headers: {
                            Authorization: `${token}`,
                        }, params: { branch: name }
                    }
                );

                setAPIData(response.data);
            }
        } catch (error) {
            console.error("Error fetching updated Branch data:", error);
        }
    };

    // page number add
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };


    const filteredData = APIData.filter(data => {
        // Check if data is defined
        if (!data) return false;
        // Filter conditions
        const idLower = data.uniqueId?.toLowerCase() || "";
        const advNameLower = data.advisorname?.toLowerCase() || "";
        const advLower = data.advisoraddress?.toLowerCase() || "";
        const policyLower = data.advisoremail?.toLowerCase() || "";

        return (
            // Filter conditions using optional chaining and nullish coalescing
            (idLower.includes(searchId.toLowerCase()) || searchId === '') &&
            (advNameLower.includes(searchAdv.toLowerCase()) || searchAdv === '') &&
            (advLower.includes(advaddress?.toLowerCase()) || advaddress === '') &&
            (policyLower.includes(advemail.toLowerCase()) || advemail === '')

        );
    });

    const totalItems = APIData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage)
    // const startIndex = (currentPage - 1) * itemsPerPage;
    // const endIndex = Math.min(startIndex + itemsPerPage, totalItems);



    const exportToExcel = () => {
        try {
            const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
            const fileExtension = ".xlsx";
            const fileName = `${name}_Advisor_Lists`;

            // Map all data without filtering by current date
            const dataToExport = APIData.map(row => {
                return [
                    row.uniqueId,
                    row.advisorname,
                    row.advisoremail,
                    row.advisormobile,
                    row.advisoraddress,
                ];
            });

            // Get all table headers in the same order
            const tableHeaders = [
                "ID",
                "Advisor Name",
                "Email ID",
                "Mobile No.",
                "Address",
            ];
            // Create worksheet
            const ws = XLSX.utils.aoa_to_sheet([tableHeaders, ...dataToExport]);
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
    const onDeleteAdvisor = async (_id) => {
        try {
            await axios.delete(`${VITE_DATA}/advisor/lists/${_id}`);
            toast.warn("Advisor Deleted Successfully.....!", { theme: "dark", position: "top-right" });
            setAPIData((prevData) => prevData.filter((data) => data._id !== _id));
        } catch (error) {
            console.error('Error deleting policy:', error);
        }
    };

    return (
        <section className="container-fluid relative  h-screen p-0 sm:ml-64 bg-slate-200">
            <div className="container-fluid flex justify-center p-2  border-gray-200 border-dashed rounded-lg   bg-slate-200">
                <div className="inline-block min-w-full w-full py-0 ">
                    <div className=" mb-4 mt-2 flex flex-col justify-between text-blue-500 ">
                        <div className="flex justify-between">
                            <h1 className="mr-20"></h1>
                            <span className=" flex justify-center text-center text-3xl font-semibold">Advisor&apos;s List</span>
                            <div className="flex">
                                <button className="text-end    text-3xl font-semibold " onClick={handleExportClick}><img src="/excel.png" alt="download" className="w-10 " /></button>
                                <NavLink to="/branches/home/advisor/register" className="my-auto">
                                    <button type="button" className="text-white  justify-end bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-2 py-2 mx-2 text-center ">Go Back</button>
                                </NavLink>
                            </div>
                        </div>


                        <div className="flex-wrap flex my-5 justify-between  text-blue-500  ">
                            <div className=" p-0  my-auto text-center  lg:w-1/4">
                                <label className="my-0 text-lg font-medium text-gray-900">ID:</label>
                                <input
                                    type="search"
                                    onChange={(e) => setSearchId(e.target.value)}
                                    className="shadow input-style w-52 my-0 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0 ml-2"
                                    placeholder="ID"
                                />
                            </div>

                            <div className="p-0  my-auto text-center  lg:w-1/4">
                                <label className="my-0 text-lg font-medium text-gray-900">Advisor Name:</label>
                                <input
                                    type="search"
                                    onChange={(e) => setSearchAdv(e.target.value)}
                                    className="shadow input-style w-52 my-0 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0 ml-2"
                                    placeholder="By Name"
                                />
                            </div>

                            <div className=" p-0  my-auto text-center  lg:w-1/4">
                                <label className="my-0 text-lg font-medium text-gray-900">Location:</label>
                                <input
                                    type="search"
                                    onChange={(e) => setAdvAddress(e.target.value)}
                                    className="shadow input-style w-52 my-0 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0 ml-2"
                                    placeholder="Location"
                                />
                            </div>

                            <div className="fp-0  my-auto text-center  lg:w-1/4">
                                <label className="my-0 text-lg font-medium text-gray-900">Email:</label>
                                <input
                                    type="search"
                                    onChange={(e) => setAdvEmail(e.target.value)}
                                    className="shadow input-style w-52 my-0 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0 ml-2"
                                    placeholder="By Email"
                                />
                            </div>
                        </div>
                    </div>


                    <div className="inline-block min-w-full w-full py-0  relative">
                        <table className="min-w-full text-center text-sm font-light ">
                            <thead className="border-b font-medium  sticky top-16">
                                <tr className="text-blue-700 sticky top-16 bg-slate-200">
                                    <th scope="col" className="px-1 border border-black">
                                        ID
                                    </th>
                                    <th scope="col" className="px-1 border border-black">
                                        Advisor Name
                                    </th>
                                    <th scope="col" className="px-1 border border-black">
                                        Email ID
                                    </th>
                                    <th scope="col" className="px-1 border border-black">
                                        Mobile No.
                                    </th>
                                    <th scope="col" className="px-1 border border-black">
                                        Location
                                    </th>
                                    <th scope="col" className="px-1 border border-black">
                                        Update
                                    </th>
                                    <th scope="col" className="px-1 border border-black">
                                        Delete
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 overflow-y-hidden">
                                {filteredData.sort((a, b) => {
                                    // Extract the numeric part from uniqueId and convert it to a number for comparison
                                    const idA = parseInt(a.uniqueId.split("-")[1]);
                                    const idB = parseInt(b.uniqueId.split("-")[1]);
                                    // Compare the numeric parts
                                    return idA - idB;
                                }).map((data) => {
                                    return (
                                        <tr key={data._id}
                                            className="border-b  bg-slate-200 text-sm font-medium">
                                            <td className="whitespace-nowrap px-1 border border-black">
                                                {data.uniqueId}
                                            </td>
                                            <td className="whitespace-nowrap px-1 border border-black">
                                                {data.advisorname}
                                            </td>
                                            <td className="whitespace-nowrap px-1 border border-black">
                                                {data.advisoremail}
                                            </td>
                                            <td className="whitespace-nowrap px-1 border border-black">
                                                {data.advisormobile}
                                            </td>
                                            <td className="whitespace-nowrap px-1 border border-black">
                                                {data.advisoraddress}
                                            </td>
                                            {/* <td className="whitespace-nowrap px-1 border border-black">
                                                <button type="button" onClick={() => onDeleteAdvisor(data._id)} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm my-1 px-2 py-2 text-center 2">Delete</button>
                                            </td> */}
                                            <td className="whitespace-nowrap px-1 border border-black">
                                                <AdvisorUpdates advisors={data} onUpdates={onUpdateAdvisor} />
                                            </td>
                                            <td className="whitespace-nowrap px-1 border border-black">
                                                <button type="button" onClick={() => onDeleteAdvisor(data._id)} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-3 py-2 text-center ">Delete</button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/* Pagination */}
            <nav aria-label="Page navigation  flex example sticky   ">
                <ul className="flex space-x-2 mt-2 justify-end">
                    <li>
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-3 py-1 text-blue-600 border border-blue-600 bg rounded-l hover:bg-blue-400 hover:text-white"
                        >
                            Previous
                        </button>
                    </li>
                    {Array.from({ length: totalPages }, (_, i) => {
                        // Display buttons for currentPage and a few surrounding pages
                        const showPage = i + 1 === 1 || i + 1 === currentPage || i + 1 === totalPages || Math.abs(i + 1 - currentPage) <= 2;
                        if (showPage) {
                            return (
                                <li key={i}>
                                    <button
                                        onClick={() => handlePageChange(i + 1)}
                                        className={`px-3 py-1 ${i + 1 === currentPage
                                            ? 'bg-green-700 text-white font-bold'
                                            : 'text-blue-600 hover:bg-blue-400 hover:text-white'
                                            } border border-blue-600`}
                                    >
                                        {i + 1}
                                    </button>
                                </li>
                            );
                        }
                        return null;
                    })}
                    <li>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 text-blue-600 border border-blue-600 rounded-r hover:bg-blue-400 hover:text-white"
                        >
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        </section>
    );
}


export default ListAdvisor;