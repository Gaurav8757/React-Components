import UpdateCompanyModal from "./updateCompany";
import axios from "axios";
import { useEffect, useState } from "react";
import {  NavLink } from "react-router-dom";
import * as XLSX from 'xlsx';
import { toast } from "react-toastify";


export default function ViewCompany() {
    const [APIData, setAPIData] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            toast.error("Not Authorized yet.. Try again! ");
        } else {
            // The user is authenticated, so you can make your API request here.
            axios
                .get(`https://eleedomimf.onrender.com/api/company/company-list`, {
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
 const onUpdateCompany = async () => {
    try {
      const token = sessionStorage.getItem("token");

      if (!token) {
        toast.error("Not Authorized yet.. Try again!");
      } else {
        const response = await axios.get(
          `https://eleedomimf.onrender.com/api/company/company-list`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        setAPIData(response.data);
      }
    } catch (error) {
      console.error("Error fetching updated company data:", error);
    }
  };
  const exportToExcel = () => {
    try {
        const fileType =
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        const fileExtension = ".xlsx";
        const fileName = "all_company_lists";
  
        // Get all table headers and rows
        const tableHeaders = document.querySelectorAll(".table th");
        const tableRows = document.querySelectorAll(".table tbody tr");
  
        // Include only the first 26 columns and all rows
        const columnsToInclude = Array.from(tableHeaders).slice(0, 3);
        const rowsToInclude = Array.from(tableRows).map(row => {
            const cells = Array.from(row.querySelectorAll("td")).slice(0, 3);
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
    const onDeleteCompany = async (_id) => {
        try {
            await axios.delete(`https://eleedomimf.onrender.com/company/api/${_id}`);
            toast.warn("Company Removed.....!", { theme: "dark", position: "top-right" });
            setAPIData((prevData) => prevData.filter((data) => data._id !== _id));
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    return (
        <section className="container-fluid relative  h-screen p-0 sm:ml-64 bg-slate-200">
            <div className="container-fluid flex justify-center p-2   rounded-lg   bg-slate-200">

                {/* <div className="sm:-mx-6 lg:-mx-8"> */}
                <div className="flex flex-col min-w-full w-full py-2 ">
                    <div className=" flex relative text-blue-500 min-w-full w-full pt-5  justify-between">

                    <form className="flex justify-start ">
                            <label className=" my-2  text-xl font-medium text-gray-900" > Filter:</label>
                            <input type="search" onChange={(e) => setSearch(e.target.value)} className="shadow input-style w-52  ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-0 px-0 mb-2 ml-2" placeholder="ID Date Branch InsuredName" />
                        </form>
                        <h1 className="flex justify-center text-3xl  font-semibold w-full mb-8">All Company Lists</h1>
                        <button className=" mt-2 " onClick={handleExportClick}><img src="/excel.png" alt="download" className="w-12" /></button>
                        <NavLink to="/dashboard/addcompanies" className="flex justify-end text-red-700 ">
                        <button type="button" className="text-white  justify-end bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-3 py-2 text-center me-2 mb-2 ">Go Back</button>
                        </NavLink>
                     
                    </div>
                   
                    <div className="inline-block min-w-full w-full py-0  ">
                        <table className="min-w-full text-center text-sm font-light table">
                            <thead className="border-b font-medium bg-slate-300 sticky top-2">
                                <tr className="text-blue-700 bg-slate-300 sticky top-2">

                                    <th scope="col" className="px-5 py-4">
                                        Company Name
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                        Insurance Type
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                        Category
                                    </th>
                                    {/* <th scope="col" className="px-5 py-4">
                                        Date of Establish
                                    </th> */}
                                    <th scope="col" className="px-5 py-4">
                                        Files
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                        Update
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                       Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {APIData.filter((data) => {
                                    const searchLower = search.toLowerCase();
                                    const cnameLower = data.comp_insurance.toLowerCase();
                                    return searchLower === '' ? true : cnameLower.includes(searchLower);
                                    // return search.toLowerCase() === '' ? data : data.h_cname.toLowerCase().includes(search)
                                }).map((data) => {

                                    return (
                                        <tr  key={data._id}
                                            className="border-b dark:border-neutral-200 text-sm font-medium">
                                                
                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.comp_cname}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.comp_insurance}
                                            </td>
                                            <td className="whitespace-nowrap px4 py-4">
                                                {data.comp_categories}
                                            </td>
                                            {/* <td className="whitespace-nowrap px-4 py-4">
                                                {data.comp_establishment}
                                            </td> */}
                                            <td className="whitespace-nowrap px4 py-4">
                                                
                                                <NavLink to={data.comp_cfiles} >
                                                    <img src={data.comp_cfiles} alt="file" /> 
                                                </NavLink>

                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                    <UpdateCompanyModal onUpdate = {onUpdateCompany} datas = {data} />
                                            </td>
                                        
                                            <td className="whitespace-nowrap px-4 py-4">
                                                <button type="button" onClick={() => onDeleteCompany(data.id)} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2">Active</button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
        </section>
    );
}