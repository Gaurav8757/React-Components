import axios from "axios";
import { useEffect, useState } from "react";
import UpdateFinance from "./UpdateFinance.jsx";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import * as XLSX from 'xlsx';
import VITE_DATA from "../../config/config.jsx";
import Pagination from "./Paignation.jsx";
function ViewFinance() {
  const [allDetailsData, setAllDetailsData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [searchBranch, setSearchBranch] = useState("");
  const [totalPages, setTotalPages] = useState();
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState();
  const [error, setError] = useState("");
  const [searchId, setSearchId] = useState("");
  const [searchCompany, setSearchCompany] = useState("");
  const [searchInsuredName, setSearchInsuredName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const name = sessionStorage.getItem('finname');
  //   console.log(currentPage);
  //   console.log(itemsPerPage);
  //  console.log(allDetailsData);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // setLoading(true);
        const token = sessionStorage.getItem("token");
        const response = await axios.get(`${VITE_DATA}/alldetails/viewdata`, {
          headers: {
            Authorization: `${token}`,
          },
          params: {
            page: currentPage,
            limit: itemsPerPage
          }
        });
        setAllDetailsData(response.data.allList);
        // console.log(response.data.totalPages);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        setError(error.message);
        // setLoading(false);
      }
    };
    fetchData();
  }, [currentPage, itemsPerPage]);// Include currentPage in the dependency array

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const page = parseInt(params.get('page')) || 1;
    const limit = parseInt(params.get('limit')) || 20;

    setCurrentPage(page);
    setItemsPerPage(limit);
  }, []);

  // refreshing page after updating data
  const onUpdateInsurance = async () => {
    try {
      const token = sessionStorage.getItem("token");

      if (!token) {
        toast.error("Not Authorized yet.. Try again!");
      } else {
        const response = await axios.get(
          `${VITE_DATA}/alldetails/viewdata`,
          {
            headers: {
              Authorization: `${token}`,
            },
            params: {
              page: currentPage, // Send current page as a parameter
              limit: itemsPerPage // Send items per page as a parameter
            }
          }
        );
        setAllDetailsData(response.data.allList);
        setTotalPages(response.data.totalPages);
      }
    } catch (error) {
      console.error("Error fetching updated insurance data:", error);
    }
  };

  const handleDateRangeChange = (event, type) => {
    if (type === "start") {
      setStartDate(event.target.value);
    } else if (type === "end") {
      setEndDate(event.target.value);
    }
  };

  const filteredData = allDetailsData.filter(data => {
    // Check if data is defined
    if (!data) return false;
    // Filter conditions
    const idLower = data.policyrefno?.toLowerCase() || "";
    const insuredNameLower = data.insuredName?.toLowerCase() || "";
    const companyLower = data.company?.toLowerCase() || "";
    const contacNoLower = data.contactNo?.toLowerCase() || "";
    const branchLower = data.branch?.toLowerCase() || "";
    return (
      // Filter conditions using optional chaining and nullish coalescing
      (idLower.includes(searchId.toLowerCase()) || searchId === '') &&
      (branchLower.includes(searchBranch.toLowerCase()) || searchBranch === '') &&
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

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const exportToExcel = () => {
    try {
      const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      const fileExtension = ".xlsx";
      const fileName = `${name}_executive`;
      // Map all data without filtering by current date
      const dataToExport = filteredData.map(row => {
        return [
          row.entryDate,
          row.policyrefno,
          row.branch,
          row.insuredName,
          row.contactNo,
          row.staffName,
          row.currentTime,
          row.empTime,
          row.company,
          row.category,
          row.policyType,
          row.policyNo,
          row.engNo,
          row.chsNo,
          row.odPremium,
          row.liabilityPremium,
          row.netPremium,
          row.rsa,
          row.taxes,
          row.finalEntryFields,
          row.odDiscount,
          row.ncb,
          row.policyPaymentMode,
          row.states,
          row.district,
          row.vehRegNo,
          row.segment,
          row.sourcing,
          row.policyStartDate,
          row.policyEndDate,
          row.odExpiry,
          row.tpExpiry,
          row.idv,
          row.bodyType,
          row.makeModel,
          row.mfgYear,
          row.registrationDate,
          row.vehicleAge,
          row.fuel,
          row.gvw,
          row.cc,
          row.productCode,
          row.advisorName,
          row.subAdvisor,
        ];
      });

      // Get all table headers in the same order
      const tableHeaders = [
        "Entry Date",
        "Reference ID",
        "Branch",
        "Insured Name",
        "Contact No",
        "Policy Made By",
        "Policy Received Time",
        "Policy Update Time",
        "Company",
        "Category",
        "Policy Type",
        "Policy No",
        "Engine No",
        "Chassis No",
        "OD Premium",
        "Liability Premium",
        "Net Premium",
        "RSA",
        "GST Amount",
        "Final Amount",
        "OD Discount(%)",
        "NCB",
        "Policy Payment Mode",
        "State",
        "District",
        "Vehicle Reg No",
        "Segment",
        "Sourcing",
        "Policy Start Date",
        "Policy End Date",
        "OD Expiry",
        "TP Expiry",
        "IDV",
        "Body Type",
        "Make & Model",
        "MFG Year",
        "Registration Date",
        "Vehicle Age",
        "Fuel",
        "GVW",
        "C.C",
        "Product Code",
        "Advisor Name",
        "Sub Advisor",
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
  };
  if (error) return <div>Error: {error}</div>;

  // delete function
  // const onDeleteAllData = async (_id) => {
  //   try {
  //     await axios.delete(`https://eleedomimf.onrender.com/alldetails/deletedata/${_id}`);
  //     toast.warn("Insurance Data Deleted.....!", {
  //       theme: "dark",
  //       position: "top-right",
  //     });
  //     setAllDetailsData((prevData) => prevData.filter((data) => data._id !== _id));
  //   } catch (error) {
  //     toast.error('Error deleting Insurance');
  //     console.error("Error deleting Insurance :", error);
  //   }
  // };

  return (
    <section className="container-fluid relative  p-0 sm:ml-64 bg-slate-200">
      <div className="container-fluid flex justify-center p-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 bg-slate-200">
        <div className="inline-block min-w-full  w-full py-0 ">
          {/* <div className=" flex relative text-blue-500 min-w-full w-full pt-5  justify-between"> */}
          <div className=" m-2 flex justify-between text-blue-500 max-w-auto mx-auto w-auto ">
            <h1></h1>
            <span className=" flex justify-center text-center  text-3xl font-semibold  ">View All Policies</span>
            <div className="flex ">
              <button className="text-end  mx-4 flex justify-end  text-3xl font-semibold " onClick={handleExportClick}><img src="/excel.png" alt="download" className="w-12" /></button>
              <NavLink to={{
                pathname: "/finance/home/new",
                search: `?page=${currentPage}&limit=${itemsPerPage}`
              }} className="flex justify-center">
                <button type="button" className="text-white  mt-2 justify-end bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-3 py-2 text-center me-2 mb-2 ">Go Back</button>
              </NavLink></div>
          </div>
          <div className="flex-wrap flex justify-between  text-blue-500  ">
            {/* date range filter */}
            <div className="flex   p-0 text-start  lg:w-1/4">
              <label className="my-0 text-lg whitespace-nowrap font-medium text-gray-900">Date:</label>
              <input type="date" value={startDate} onChange={(e) => handleDateRangeChange(e, "start")} className="shadow input-style w-52 my-0 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0 mb-2 ml-2" placeholder="From Date" />
              <span className='text-justify mx-1 my-1 '>to</span>
              <input type="date" value={endDate} onChange={(e) => handleDateRangeChange(e, "end")} className="shadow input-style w-52 my-0 py-0 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none  px-0 mb-2 " placeholder="To Date" />
            </div>

            <div className=" p-0   text-center  lg:w-1/4">
              <label className="my-0 text-lg font-medium text-gray-900">ID:</label>
              <input
                type="search"
                onChange={(e) => setSearchId(e.target.value)}
                className="shadow input-style w-52 my-0 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0 mb-2 ml-2"
                placeholder="ID"
              />
            </div>

            <div className="flex justify-start p-0 text-end  lg:w-1/4">
              <label className="my-0 text-lg font-medium text-gray-900">Company:</label>
              <input
                type="search"
                onChange={(e) => setSearchCompany(e.target.value)}
                className="shadow input-style w-52 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0 mb-2 ml-2"
                placeholder="Company Name"
              />
            </div>

            <div className="   text-start  lg:w-1/4">
              <label className="my-0 text-lg font-medium text-gray-900">Insured Name:</label>
              <input
                type="search"
                onChange={(e) => setSearchInsuredName(e.target.value)}
                className="shadow input-style w-52 my-0 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0 ml-2"
                placeholder="Insured Name"
              />
            </div>

            <div className="flex justify-start my-3  text-start lg:w-1/4">
              <label className="my-0 text-lg font-medium text-gray-900">Branch:</label>
              <input
                type="search"
                onChange={(e) => setSearchBranch(e.target.value)}
                className="shadow input-style w-52 my-0 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0 mb-2 ml-2"
                placeholder="Branch Name"
              />
            </div>

            <div className=" p-0 text-center mt-3 justify-start w-1/2 lg:w-1/4">
              <label className="my-0 text-lg font-medium text-gray-900">Contact No:</label>
              <input
                type="search"
                onChange={(e) => setContactNo(e.target.value)}
                className="shadow p-0 text-start w-52 lg:w-1/2 input-style  my-0 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0 mb-2 ml-2"
                placeholder="Contact Number"
              /></div>
          </div>


          <div className="inline-block min-w-full w-full py-0 relative bg-slate-300">
            <table className="min-w-full text-center bg-slate-300 text-sm font-light table border border-black">
              <thead className="border-b font-medium bg-slate-300 border border-black sticky top-16">
                <tr className="text-blue-700 sticky top-16 border border-black">
                  <th scope="col" className="px-1 pt-0 sticky border border-black">Update</th>
                  <th scope="col" className="px-1 pt-0 sticky border border-black">Reference ID</th>
                  <th scope="col" className="px-1 pt-0 sticky border border-black">Entry Date</th>
                  <th scope="col" className="px-1 pt-0 sticky border border-black">Branch</th>
                  <th scope="col" className="px-1 pt-0 sticky border border-black">Insured Name</th>
                  <th scope="col" className="px-1 pt-0 sticky border border-black">Contact No</th>
                  <th scope="col" className="px-1 pt-0 sticky border border-black">Policy Made By</th>
                  <th scope="col" className="px-1 pt-0 sticky border border-black">Policy Received Time</th>
                  <th scope="col" className="px-1 pt-0 sticky border border-black">Policy Update Time</th>
                  <th scope="col" className="px-1 pt-0 sticky border border-black">Company</th>
                  <th scope="col" className="px-1 pt-0 sticky border border-black">Category</th>
                  <th scope="col" className="px-1 pt-0 sticky border border-black">Policy Type</th>
                  <th scope="col" className="px-1 pt-0 sticky border border-black">Policy No</th>
                  <th scope="col" className="px-1 pt-0 sticky border border-black">Engine No</th>
                  <th scope="col" className="px-1 pt-0 sticky border border-black">Chassis No</th>
                  <th scope="col" className="px-1 pt-0 sticky border border-black">OD Premium</th>
                  <th scope="col" className="px-1 pt-0 sticky border border-black">Liability Premium</th>
                  <th scope="col" className="px-1 pt-0 sticky border border-black">Net Premium</th>
                  <th scope="col" className="px-1 pt-0 sticky border border-black">RSA</th>
                  <th scope="col" className="px-1 pt-0 sticky border border-black">GST Amount</th>
                  <th scope="col" className="px-1 pt-0 sticky border border-black">Final Amount</th>
                  <th scope="col" className="px-1 pt-0 sticky border border-black">OD Discount(%)</th>
                  <th scope="col" className="px-1 pt-0 sticky border border-black">NCB</th>
                  <th scope="col" className="px-1 pt-0 sticky border border-black">Policy Payment Mode</th>
                  <th scope="col" className="px-1 pt-0 sticky border border-black">States</th>
                  <th scope="col" className="px-1 pt-0 sticky border border-black">District</th>
                  <th scope="col" className="px-1 pt-0 sticky border border-black">Vehicle Reg No</th>
                  <th scope="col" className="px-1 pt-0 sticky border border-black">Segment</th>
                  <th scope="col" className="px-1 pt-0 sticky border border-black">Sourcing</th>
                  <th scope="col" className="px-1 pt-0 sticky border border-black">Policy Start Date</th>
                  <th scope="col" className="px-1 pt-0 sticky border border-black">Policy End Date</th>
                  <th scope="col" className="px-1 pt-0 sticky border border-black">OD Expiry</th>
                  <th scope="col" className="px-1 pt-0 sticky border border-black">TP Expiry</th>
                  <th scope="col" className="px-1 pt-0 sticky border border-black">IDV</th>
                  <th scope="col" className="px-1 pt-0 sticky border border-black">Body Type</th>
                  <th scope="col" className="px-1 pt-0 sticky border border-black">Make & Model</th>
                  <th scope="col" className="px-1 pt-0 sticky border border-black">MFG Year</th>
                  <th scope="col" className="px-1 pt-0 sticky border border-black">Registration Date</th>
                  <th scope="col" className="px-1 pt-0 sticky border border-black">Vehicle Age</th>
                  <th scope="col" className="px-1 pt-0 sticky border border-black">Fuel</th>
                  <th scope="col" className="px-1 pt-0 sticky border border-black">GVW</th>
                  <th scope="col" className="px-1 pt-0 sticky border border-black">C.C</th>
                  <th scope="col" className="px-1 pt-0 sticky border border-black">Product Code</th>
                  <th scope="col" className="px-1 pt-0 sticky border border-black">Advisor Name</th>
                  <th scope="col" className="px-1 pt-0 sticky border border-black">Sub Advisor</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 overflow-y-hidden bg-slate-200">
                {filteredData.map((data) => (
                  <tr
                    className="border-b dark:border-neutral-200 bg-slate-200 text-sm font-medium"
                    key={data._id}>
                    <td className="whitespace-nowrap px-1 py-1 border border-black">
                      <UpdateFinance insurance={data} onUpdate={onUpdateInsurance} />
                    </td>
                    <td className="whitespace-nowrap px-1 py-1 border border-black">{data.policyrefno}</td>
                    <td className="whitespace-nowrap px-1 py-1 border border-black">{data.entryDate}</td>
                    <td className="whitespace-nowrap px-1 py-1 border border-black">{data.branch}</td>
                    <td className="whitespace-nowrap px-1 py-1 border border-black">{data.insuredName}</td>
                    <td className="whitespace-nowrap px-1 py-1 border border-black">{data.contactNo}</td>
                    <td className="whitespace-nowrap px-1 py-1 border border-black">{data.staffName}</td>
                    <td className="whitespace-nowrap px-1 py-1 border border-black">{data.currentTime}</td>
                    <td className="whitespace-nowrap px-1 py-1 border border-black">{data.empTime}</td>
                    <td className="whitespace-nowrap px-1 py-1 border border-black">{data.company}</td>
                    <td className="whitespace-nowrap px-1 py-1 border border-black">{data.category}</td>
                    <td className="whitespace-nowrap px-1 py-1 border border-black">{data.policyType}</td>
                    <td className="whitespace-nowrap px-1 py-1 border border-black">{data.policyNo}</td>
                    <td className="whitespace-nowrap px-1 py-1 border border-black">{data.engNo}</td>
                    <td className="whitespace-nowrap px-1 py-1 border border-black">{data.chsNo}</td>
                    <td className="whitespace-nowrap px-1 py-1 border border-black">{data.odPremium}</td>
                    <td className="whitespace-nowrap px-1 py-1 border border-black">{data.liabilityPremium}</td>
                    <td className="whitespace-nowrap px-1 py-1 border border-black">{data.netPremium}</td>
                    <td className="whitespace-nowrap px-1 py-1 border border-black">{data.rsa}</td>
                    <td className="whitespace-nowrap px-1 py-1 border border-black">{data.taxes}</td>
                    <td className="whitespace-nowrap px-1 py-1 border border-black">{data.finalEntryFields}</td>
                    <td className="whitespace-nowrap px-1 py-1 border border-black">{data.odDiscount}</td>
                    <td className="whitespace-nowrap px-1 py-1 border border-black">{data.ncb}</td>
                    <td className="whitespace-nowrap px-1 py-1 border border-black">{data.policyPaymentMode}</td>
                    <td className="whitespace-nowrap px-1 py-0 border border-black">{data.states}</td>
                    <td className="whitespace-nowrap px-1 py-0 border border-black">{data.district}</td>
                    <td className="whitespace-nowrap px-1 py-1 border border-black">{data.vehRegNo}</td>
                    <td className="whitespace-nowrap px-1 py-1 border border-black">{data.segment}</td>
                    <td className="whitespace-nowrap px-1 py-1 border border-black">{data.sourcing}</td>
                    <td className="whitespace-nowrap px-1 py-1 border border-black">{data.policyStartDate}</td>
                    <td className="whitespace-nowrap px-1 py-1 border border-black">{data.policyEndDate}</td>
                    <td className="whitespace-nowrap px-1 py-1 border border-black">{data.odExpiry}</td>
                    <td className="whitespace-nowrap px-1 py-1 border border-black">{data.tpExpiry}</td>
                    <td className="whitespace-nowrap px-1 py-1 border border-black">{data.idv}</td>
                    <td className="whitespace-nowrap px-1 py-1 border border-black">{data.bodyType}</td>
                    <td className="whitespace-nowrap px-1 py-1 border border-black">{data.makeModel}</td>
                    <td className="whitespace-nowrap px-1 py-1 border border-black">{data.mfgYear}</td>
                    <td className="whitespace-nowrap px-1 py-1 border border-black">{data.registrationDate}</td>
                    <td className="whitespace-nowrap px-1 py-1 border border-black">{data.vehicleAge}</td>
                    <td className="whitespace-nowrap px-1 py-1 border border-black">{data.fuel}</td>
                    <td className="whitespace-nowrap px-1 py-1 border border-black">{data.gvw}</td>
                    <td className="whitespace-nowrap px-1 py-1 border border-black">{data.cc}</td>
                    <td className="whitespace-nowrap px-1 py-1 border border-black">{data.productCode}</td>
                    <td className="whitespace-nowrap px-1 py-1 border border-black">{data.advisorName}</td>
                    <td className="whitespace-nowrap px-1 py-1 border border-black">{data.subAdvisor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {totalItems === 0 && (
            <div className="mt-4 text-gray-500 dark:text-gray-400">No records found.</div>
          )}
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </section>
  );
}

export default ViewFinance;