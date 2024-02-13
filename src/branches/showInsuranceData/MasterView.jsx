import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";
import { toast } from 'react-toastify';

import * as XLSX from 'xlsx';
import UpdateAllBranch from "../branchUpdate/UpdateAllBranch.jsx";


function MasterView() {
  const [allDetailsData, setAllDetailsData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Retrieve branch from sessionStorage
        const branch = sessionStorage.getItem('name');

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
  }, []);

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
        }
      );
      setAllDetailsData(response.data);
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
      const fileName = "all_branch_data";

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
    <section className="container-fluid relative h-screen p-0 sm:ml-64 bg-slate-200">
      <div className="container-fluid flex justify-center p-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 bg-slate-200">
        <div className="inline-block min-w-full  w-full py-0 sm:px-6 lg:px-8">
          <div className="overflow-x-auto text-blue-500">
            <NavLink to="/branches/home" className="absolute top-30 right-10">
              <TiArrowBack size={30} color="red" />
            </NavLink>
            <button className="absolute top-30 right-20" onClick={handleExportClick}><img src="/excel.png" alt="download"  className="w-16" /></button>
            <h1 className="flex justify-center font-semibold text-3xl w-full mb-4">
              View All Details
            </h1>
            <hr />
          </div>
          <div className="inline-block min-w-full w-full py-0 sm:px-6 lg:px-6  overflow-x-auto">
            <table className="min-w-full text-center text-sm font-light table ">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr className="text-blue-700">
                <th scope="col" className="px-5 py-4">Reference ID</th>
                  <th scope="col" className="px-5 py-4">Entry Date</th>
                  <th scope="col" className="px-5 py-4">Company</th>
                  <th scope="col" className="px-5 py-4">Category</th>
                  <th scope="col" className="px-5 py-4">Segment</th>
                  <th scope="col" className="px-5 py-4">Sourcing</th>
                  <th scope="col" className="px-5 py-4">Insured Name</th>
                  <th scope="col" className="px-5 py-4">Contact No</th>
                  <th scope="col" className="px-5 py-4">Vehicle Reg No</th>
                  <th scope="col" className="px-5 py-4">Hypothiniton</th>
                  <th scope="col" className="px-5 py-4">Branch</th>
                  <th scope="col" className="px-5 py-4">Advisor</th>
                  <th scope="col" className="px-5 py-4">Sub Advisor</th>
                  <th scope="col" className="px-5 py-4">Policy No</th>
                  <th scope="col" className="px-5 py-4">Engine No.</th>
                  <th scope="col" className="px-5 py-4">Chassis No</th>
                  <th scope="col" className="px-5 py-4">Policy Type</th>
                  <th scope="col" className="px-5 py-4">OD Premium</th>
                  <th scope="col" className="px-5 py-4">Liability Premium</th>
                  <th scope="col" className="px-5 py-4">Net Premium</th>
                  <th scope="col" className="px-5 py-4">GST%</th>
                  <th scope="col" className="px-5 py-4">Final Premium(GST%)</th>
                  <th scope="col" className="px-5 py-4">OD Discount(%)</th>
                  <th scope="col" className="px-5 py-4">NCB(%)</th>
                  <th scope="col" className="px-5 py-4">Policy Made By</th>
                  <th scope="col" className="px-5 py-4">Policy Start Date</th>
                  <th scope="col" className="px-5 py-4">Policy End Date</th>
                  <th scope="col" className="px-5 py-4">OD Expiry</th>
                  <th scope="col" className="px-5 py-4">TP Expiry</th>
                  <th scope="col" className="px-5 py-4">IDV</th>
                  <th scope="col" className="px-5 py-4">Body Type</th>
                  <th scope="col" className="px-5 py-4">Make & Model</th>
                  <th scope="col" className="px-5 py-4">Registration Date</th>
                  <th scope="col" className="px-5 py-4">Vehicle Age</th>
                  <th scope="col" className="px-5 py-4">MFG Year</th>
                  <th scope="col" className="px-5 py-4">Fuel Type</th>
                  <th scope="col" className="px-5 py-4">GVW</th>
                  <th scope="col" className="px-5 py-4">C.C.</th>
                  <th scope="col" className="px-5 py-4">Product Code</th>
                  <th scope="col" className="px-5 py-4">Edit</th>
                  {/* <th scope="col" className="px-5 py-4">Delete</th> */}
                </tr>
              </thead>

              <tbody>
                {allDetailsData.map((data) => (
                  <tr key={data._id} className="border-b dark:border-neutral-200 text-sm font-medium">
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
                    <td className="whitespace-nowrap px-4 py-4">{data.policyNo}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.engNo}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.chsNo}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.policyType}</td>
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
                    <td className="whitespace-nowrap px-4 py-4">{data.productCode}</td>
                    <td className="whitespace-nowrap px-4 py-4">
                      <UpdateAllBranch updateBranch = {data} onUpdate = {onUpdatePolicy}/>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}


export default MasterView;