import axios from "axios";
import { useEffect, useState } from "react";
// import UpdateMaster from "./UpdateMaster.jsx";
import UpdateFinance from "./UpdateFinance.jsx";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import * as XLSX from 'xlsx';

function ViewFinance() {
  const [allDetailsData, setAllDetailsData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState();
  const [searchId, setSearchId] = useState("");
  const [searchCompany, setSearchCompany] = useState("");
  const [searchInsuredName, setSearchInsuredName] = useState("");
  const [contactNo, setContactNo] = useState("");


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
    <section className="container-fluid relative h-screen  p-0 sm:ml-64 bg-slate-200">
      <div className="container-fluid flex justify-center p-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 bg-slate-200">
        <div className="inline-block min-w-full  w-full py-0 ">
          {/* <div className=" flex relative text-blue-500 min-w-full w-full pt-5  justify-between"> */}
          <div className=" m-2 flex justify-between text-blue-500 max-w-auto mx-auto w-auto ">
            <h1></h1>
            <span className=" flex justify-center text-center  text-3xl font-semibold  ">View All Policies</span>
            <div className="flex ">
              <button className="text-end  mx-4 flex justify-end  text-3xl font-semibold " onClick={handleExportClick}><img src="/excel.png" alt="download" className="w-12" /></button>
              <NavLink to="/dashboard/masterform" className="flex justify-center">
                <button type="button" className="text-white  mt-2 justify-end bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-3 py-2 text-center me-2 mb-2 ">Go Back</button>
              </NavLink></div>
          </div>

          <div className="flex-wrap flex justify-between  text-blue-500 max-w-auto mx-auto w-auto ">
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
              <label className="my-0 text-lg font-medium text-gray-900">Filter by Company:</label>
              <input
                type="search"
                onChange={(e) => setSearchCompany(e.target.value)}
                className="shadow input-style w-52 my-0 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0 mb-2 ml-2"
                placeholder="Company Name"
              />
            </div>

            <div className="flex justify-start  text-start w-full lg:w-1/4">
              <label className="my-0 text-lg font-medium text-gray-900">Filter by Insured Name:</label>
              <input
                type="search"
                onChange={(e) => setSearchInsuredName(e.target.value)}
                className="shadow input-style w-52 my-0 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0 mb-2 ml-2"
                placeholder="Insured Name"
              />
            </div>

            <div className="flex p-0 text-center justify-center w-1/2 lg:w-1/4">
              <label className="my-0 text-lg font-medium text-gray-900">Filter by Contact No:</label>
              <input
                type="search"
                onChange={(e) => setContactNo(e.target.value)}
                className="shadow p-0 text-start w-1/2 lg:w-1/2 input-style  my-0 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0 mb-2 ml-2"
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

              <tbody className="divide-y divide-gray-200 overflow-y-hidden ">
                {filteredData.reverse().slice(startIndex, endIndex).map((data) => (
                  <tr
                    className="border-b dark:border-neutral-200 bg-slate-200 text-sm font-medium"
                    key={data._id}>
                       <td className="whitespace-nowrap px-1 py-1 border border-black">
                      <UpdateFinance insurance={data} onUpdate={onUpdateInsurance} />
                     
                    </td>
                    <td className="whitespace-nowrap px-1 py-1 border border-black">{data._id}</td>
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
                    {/* <td className="whitespace-nowrap px-1 py-1 border border-black">{data.empTime}</td> */}
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
  );
}


export default ViewFinance;