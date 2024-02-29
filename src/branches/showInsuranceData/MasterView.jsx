import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
// import { TiArrowBack } from "react-icons/ti";
import { toast } from 'react-toastify';

import * as XLSX from 'xlsx';
import UpdateAllBranch from "../branchUpdate/UpdateAllBranch.jsx";


function MasterView() {
  const [allDetailsData, setAllDetailsData] = useState([]);
  const [search, setSearch] = useState("");
  const branch = sessionStorage.getItem('name');
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Retrieve branch from sessionStorage
        

        if (!branch) {
          console.error('Branch information not found in sessionStorage');
          return;
        }

        const response = await axios.get(
          `https://eleedomimf.onrender.com/alldetails/viewdata/branch/hpur`,
          {
            params: {
              branch: branch
            }
          }
        );
        setAllDetailsData(response.data);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [branch]);

 // refreshing page after updating data
 const onUpdatePolicy = async () => {
  try {
    const token = sessionStorage.getItem("token");

    if (!token) {
      toast.error("Not Authorized yet.. Try again!");
    } else {
      const response = await axios.get(
        `https://eleedomimf.onrender.com/alldetails/viewdata/branch/hpur`,
        {
          headers: {
            Authorization: `${token}`,
          },
          params: {
            branch: branch
          }
        }
      );
      setAllDetailsData(response.data);
    }
  } catch (error) {
    console.error("Error fetching updated insurance data:", error);
  }
};
const handleUpdateClick = (selectedPolicyData) => {
  // Handle click event, e.g., pass data to another component
  console.log("Selected policy data:", selectedPolicyData);
  // Here, you can pass the selected policy data to another component or perform any other action you need.
};

const exportToExcel = () => {
  try {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const fileName = branch;

    // Get all table headers and rows
    const tableHeaders = document.querySelectorAll(".table th");
    const tableRows = document.querySelectorAll(".table tbody tr");

    // Include only the first 26 columns and all rows
    const columnsToInclude = Array.from(tableHeaders).slice(0, 39);
    const rowsToInclude = Array.from(tableRows).map(row => {
      const cells = Array.from(row.querySelectorAll("td")).slice(0, 39);
      return cells.map(cell => cell.textContent);
    });

    // Create worksheet
    const wsData = [Array.from(columnsToInclude).map(header => header.textContent), ...rowsToInclude];
    
    // Add border style
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const borderStyle = {
      top: { style: "bold", color: { rgb: "000000" } },
      bottom: { style: "medium", color: { rgb: "000000" } },
      left: { style: "medium", color: { rgb: "000000" } },
      right: { style: "medium", color: { rgb: "000000" } }
    };
    alert(borderStyle)
    const range = XLSX.utils.decode_range(ws["!ref"]);
    for (let R = range.s.r; R <= range.e.r; ++R) {
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cell = XLSX.utils.encode_cell({ r: R, c: C });
        if (!ws[cell]) continue;
        if (!ws[cell].s) ws[cell].s = {};
        Object.assign(ws[cell].s, borderStyle);
      }
    }

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
    <section className="container-fluid  p-0 sm:ml-64 bg-slate-200">
      {/* <div className="container-fluid relative flex justify-center p-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 bg-slate-200"> */}
        <div className=" ">
          <div className="flex relative text-blue-500 min-w-full w-full pt-5  justify-between">
          <form className="flex justify-start ">
                            <label className=" my-2  text-xl font-medium text-gray-900" > Filter:</label>
                            <input type="search" onChange={(e) => setSearch(e.target.value)} className="shadow input-style w-52  ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-0 px-0 mb-2 ml-2" placeholder="ID Date Branch InsuredName" />
                        </form>
          <h1 className="  font-semibold text-3xl w-auto mb-4 hidden sm:hidden md:block lg:block xl:block">
              View All Policies
            </h1>
           <div className="flex justify-start ">
            <button className="flex justify-center mx-4" onClick={handleExportClick}><img src="/excel.png" alt="download"  className="w-12" /></button>
            <NavLink to="/branches/home" className="flex justify-center">
            <button type="button" className="text-white justify-end bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-3 py-2 text-center me-2 mb-2 ">Go Back</button>
            </NavLink>    
            <hr />
            </div>
          </div>


          
          <div className=" relative mt-2">
          <div className="min-w-full w-full py-0  block z-50">
            <table className="min-w-full text-center text-sm font-light table  bg-white border border-gray-200 divide-y divide-gray-200  ">
              <thead className=" font-medium  bg-slate-300 sticky top-16 ">
                <tr className="text-blue-700 sticky top-16 ">
                  <th scope="col" className="px-5 py-4 sticky">Reference ID</th>
                  <th scope="col" className="px-5 py-4 sticky">Entry Date</th>
                  <th scope="col" className="px-5 py-4 sticky">Company</th>
                  <th scope="col" className="px-5 py-4 sticky">Category</th>
                  <th scope="col" className="px-5 py-4 sticky">Segment</th>
                  <th scope="col" className="px-5 py-4 sticky">Sourcing</th>
                  <th scope="col" className="px-5 py-4 sticky">Insured Name</th>
                  <th scope="col" className="px-5 py-4 sticky">Contact No</th>
                  <th scope="col" className="px-5 py-4 sticky">Vehicle Reg No</th>
                  <th scope="col" className="px-5 py-4 sticky">Hypothiniton</th>
                  <th scope="col" className="px-5 py-4 sticky">Branch</th>
                  <th scope="col" className="px-5 py-4 sticky">Advisor</th>
                  <th scope="col" className="px-5 py-4 sticky">Sub Advisor</th>
                  <th scope="col" className="px-5 py-4 sticky">Policy Type</th>
                  <th scope="col" className="px-5 py-4 sticky">Product Code</th>
                  <th scope="col" className="px-5 py-4 sticky">Policy No</th>
                  <th scope="col" className="px-5 py-4 sticky">Engine No.</th>
                  <th scope="col" className="px-5 py-4 sticky">Chassis No</th>
                  <th scope="col" className="px-5 py-4 sticky">OD Premium</th>
                  <th scope="col" className="px-5 py-4 sticky">Liability Premium</th>
                  <th scope="col" className="px-5 py-4 sticky">Net Premium</th>
                  <th scope="col" className="px-5 py-4 sticky">GST%</th>
                  <th scope="col" className="px-5 py-4 sticky">Final Premium(GST%)</th>
                  <th scope="col" className="px-5 py-4 sticky">OD Discount(%)</th>
                  <th scope="col" className="px-5 py-4 sticky">NCB(%)</th>
                  <th scope="col" className="px-5 py-4 sticky">Policy Made By</th>
                  <th scope="col" className="px-5 py-4 sticky">Policy Start Date</th>
                  <th scope="col" className="px-5 py-4 sticky">Policy End Date</th>
                  <th scope="col" className="px-5 py-4 sticky">OD Expiry</th>
                  <th scope="col" className="px-5 py-4 sticky">TP Expiry</th>
                  <th scope="col" className="px-5 py-4 sticky">IDV</th>
                  <th scope="col" className="px-5 py-4 sticky">Body Type</th>
                  <th scope="col" className="px-5 py-4 sticky">Make & Model</th>
                  <th scope="col" className="px-5 py-4 sticky">Registration Date</th>
                  <th scope="col" className="px-5 py-4 sticky">Vehicle Age</th>
                  <th scope="col" className="px-5 py-4 sticky">MFG Year</th>
                  <th scope="col" className="px-5 py-4 sticky">Fuel Type</th>
                  <th scope="col" className="px-5 py-4 sticky">GVW</th>
                  <th scope="col" className="px-5 py-4 sticky">C.C.</th>
                  
                  <th scope="col" className="px-5 py-4">Update</th>
                  {/* <th scope="col" className="px-5 py-4">Delete</th> */}
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 overflow-y-hidden ">
                {allDetailsData.filter((data) => {
                  const searchLower = search.toLowerCase();
                  const entryDateLower = data.entryDate.toLowerCase();
                  const idLower = data._id.toLowerCase();
                  const insuredNameLower = data.insuredName.toLowerCase();
                  const branchLower = data.branch.toLowerCase();
                  return (
                    entryDateLower.includes(searchLower) ||
                    idLower.includes(searchLower) ||
                    insuredNameLower.includes(searchLower) ||
                    branchLower.includes(searchLower) ||
                    searchLower === ''
                );

                 
                  }).map((data) => (
                  <tr key={data._id} className="border-b dark:border-neutral-200 text-sm font-medium ">
                    <td className="whitespace-nowrap px-4 py-4">{data._id}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.entryDate}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.company}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.category}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.segment}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.sourcing}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.insuredName}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.contactNo}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.vehRegNo}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.hypo}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.branch}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.advisorName}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.subAdvisor}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.policyType}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.productCode}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.policyNo}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.engNo}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.chsNo}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.odPremium}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.liabilityPremium}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.netPremium}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.taxes}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.finalEntryFields}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.odDiscount}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.ncb}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.policyMadeBy}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.policyStartDate}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.policyEndDate}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.odExpiry}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.tpExpiry}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.idv}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.bodyType}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.makeModel}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.registrationDate}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.vehicleAge}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.mfgYear}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.fuel}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.gvw}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.cc}</td>
                    <td className="whitespace-nowrap px-4 py-4">
                      <UpdateAllBranch updateBranch = {data} onUpdate = {onUpdatePolicy} onUpdateClick={handleUpdateClick}/>
                    </td>
                  </tr>
))}
              </tbody>
            </table>
          </div>
          </div>
        {/* </div> */}
      </div>
    </section>
  );
}


export default MasterView;