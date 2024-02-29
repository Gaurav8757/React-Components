import axios from "axios";
import { useEffect, useState } from "react";
import UpdateMaster from "./UpdateMaster.jsx";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import * as XLSX from 'xlsx';


function ViewMasterForm() {
  const [allDetailsData, setAllDetailsData] = useState([]);
  const [search, setSearch] = useState("");
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

          setAllDetailsData(response.data);

        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  // refreshing page after updating data
  const onUpdateInsurance = async () => {
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
      const fileName = "policy_lists";

      // Get all table headers and rows
      const tableHeaders = document.querySelectorAll(".table th");
      const tableRows = document.querySelectorAll(".table tbody tr");

      // Include only the first 26 columns and all rows
      const columnsToInclude = Array.from(tableHeaders).slice(0, 48);
      const rowsToInclude = Array.from(tableRows).map(row => {
        const cells = Array.from(row.querySelectorAll("td")).slice(0, 48);
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





  // delete function
  const onDeleteAllData = async (_id) => {
    try {
      await axios.delete(`https://eleedomimf.onrender.com/alldetails/deletedata/${_id}`);
      toast.warn("Insurance Data Deleted.....!", {
        theme: "dark",
        position: "top-right",
      });
      setAllDetailsData((prevData) => prevData.filter((data) => data._id !== _id));
    } catch (error) {
      toast.error('Error deleting Insurance');
      console.error("Error deleting Insurance :", error);
    }
  };

  return (
    <section className="container-fluid relative h-screen p-0 sm:ml-64 bg-slate-200">
      <div className="container-fluid flex justify-center p-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 bg-slate-200">
        <div className="inline-block min-w-full  w-full py-0 ">


          <div className=" flex relative text-blue-500 min-w-full w-full pt-5  justify-between">
            <form className="flex justify-start ">
              <label className=" my-2  text-xl font-medium text-gray-900" > Filter:</label>
              <input type="search" onChange={(e) => setSearch(e.target.value)} className="shadow input-style w-52  ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-0 px-0 mb-2 ml-2" placeholder="ID Date Branch InsuredName" />
            </form>

            <h1 className="  font-semibold text-3xl w-auto mb-4 hidden sm:hidden md:block lg:block xl:block">
              View All Policy Details
            </h1>
            <div className="flex justify-start ">
              <button className="flex justify-center mx-4 " onClick={handleExportClick}><img src="/excel.png" alt="download" className="w-12" /></button>
              <NavLink to="/dashboard/masterform" className="flex justify-center">
                <button type="button" className="text-white  mt-2 justify-end bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-3 py-2 text-center me-2 mb-2 ">Go Back</button>
              </NavLink>

            </div>

          </div>




          <div className="inline-block min-w-full w-full py-0 relative">
            <table className="min-w-full text-center text-sm font-light table">
              <thead className="border-b font-medium bg-slate-300 sticky top-16">
                <tr className="text-blue-700 sticky top-16">
                  <th scope="col" className="px-5 py-4">Entry Date</th>
                  <th scope="col" className="px-5 py-4">Company</th>
                  <th scope="col" className="px-5 py-4">Category</th>
                  <th scope="col" className="px-5 py-4">Segment</th>
                  <th scope="col" className="px-5 py-4">Sourcing</th>
                  <th scope="col" className="px-5 py-4">Policy No</th>
                  <th scope="col" className="px-5 py-4">Insured Name</th>
                  <th scope="col" className="px-5 py-4">Contact No</th>
                  <th scope="col" className="px-5 py-4">Vehicle Reg No</th>
                  <th scope="col" className="px-5 py-4">Policy Start Date</th>
                  <th scope="col" className="px-5 py-4">Policy End Date</th>
                  <th scope="col" className="px-5 py-4">OD Expiry</th>
                  <th scope="col" className="px-5 py-4">TP Expiry</th>
                  <th scope="col" className="px-5 py-4">IDV</th>
                  <th scope="col" className="px-5 py-4">Body Type</th>
                  <th scope="col" className="px-5 py-4">Make & Model</th>
                  <th scope="col" className="px-5 py-4">MFG Year</th>
                  <th scope="col" className="px-5 py-4">Registration Date</th>
                  <th scope="col" className="px-5 py-4">Vehicle Age</th>
                  <th scope="col" className="px-5 py-4">Fuel</th>
                  <th scope="col" className="px-5 py-4">GVW</th>
                  <th scope="col" className="px-5 py-4">C.C</th>
                  <th scope="col" className="px-5 py-4">Engine No</th>
                  <th scope="col" className="px-5 py-4">Chassis No</th>
                  <th scope="col" className="px-5 py-4">Policy Type</th>
                  <th scope="col" className="px-5 py-4">Product Code</th>
                  <th scope="col" className="px-5 py-4">OD Premium</th>
                  <th scope="col" className="px-5 py-4">Liability Premium</th>
                  <th scope="col" className="px-5 py-4">Net Premium</th>
                  <th scope="col" className="px-5 py-4">Final Entry Fields</th>
                  <th scope="col" className="px-5 py-4">OD Discount</th>
                  <th scope="col" className="px-5 py-4">NCB</th>
                  <th scope="col" className="px-5 py-4">Advisor Name</th>
                  <th scope="col" className="px-5 py-4">Sub Advisor</th>
                  <th scope="col" className="px-5 py-4">Policy Made By</th>
                  <th scope="col" className="px-5 py-4">Branch</th>
                  <th scope="col" className="px-5 py-4">Payout On</th>
                  <th scope="col" className="px-5 py-4">Policy Payment Mode</th>
                  <th scope="col" className="px-5 py-4">Payment Done By</th>
                  <th scope="col" className="px-5 py-4">CHQ No / Ref No</th>
                  <th scope="col" className="px-5 py-4">Bank Name</th>
                  <th scope="col" className="px-5 py-4">CHQ / Payment Date</th>
                  <th scope="col" className="px-5 py-4">CHQ Status</th>
                  <th scope="col" className="px-5 py-4">Advisor Payable Amount</th>
                  <th scope="col" className="px-5 py-4">Branch Payout</th>
                  <th scope="col" className="px-5 py-4">Branch Payable Amount</th>
                  <th scope="col" className="px-5 py-4">Company Payout</th>
                  <th scope="col" className="px-5 py-4">Profit/Loss</th>
                  <th scope="col" className="px-5 py-4">Edit</th>
                  <th scope="col" className="px-5 py-4">Delete</th>
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
                  <tr
                    className="border-b dark:border-neutral-200 bg-slate-200 text-sm font-medium"
                    key={data._id}>
                    <td className="whitespace-nowrap px-4 py-4">{data.entryDate}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.company}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.category}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.segment}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.sourcing}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.policyNo}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.insuredName}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.contactNo}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.vehRegNo}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.policyStartDate}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.policyEndDate}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.odExpiry}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.tpExpiry}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.idv}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.bodyType}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.makeModel}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.mfgYear}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.registrationDate}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.vehicleAge}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.fuel}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.gvw}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.cc}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.engNo}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.chsNo}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.policyType}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.productCode}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.odPremium}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.liabilityPremium}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.netPremium}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.finalEntryFields}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.odDiscount}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.ncb}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.advisorName}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.subAdvisor}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.policyMadeBy}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.branch}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.payoutOn}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.policyPaymentMode}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.paymentDoneBy}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.chqNoRefNo}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.bankName}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.chqPaymentDate}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.chqStatus}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.advisorPayableAmount}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.branchPayout}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.branchPayableAmount}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.companyPayout}</td>
                    <td className="whitespace-nowrap px-4 py-4">{data.profitLoss}</td>
                    <td className="whitespace-nowrap px-4 py-4">
                      <UpdateMaster insurance={data} onUpdate={onUpdateInsurance} />
                    </td>
                    <td className="whitespace-nowrap px-4 py-4">
                      <button type="button" onClick={() => onDeleteAllData(data._id)} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2">Delete</button>
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
export default ViewMasterForm;
