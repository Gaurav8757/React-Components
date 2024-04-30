import axios from "axios";
import { useEffect, useState } from "react";
import UpdateMaster from "./UpdateMaster.jsx";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import VITE_DATA from "../../../config/config.jsx";
import PaginationAdmin from "./PaginationAdmin.jsx";
function ViewMasterForm() {
  const [allDetailsData, setAllDetailsData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [totalPages, setTotalPages] = useState();
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState();
  const [searchId, setSearchId] = useState("");
  const [searchBranch, setSearchBranch] = useState("");
  const [searchCompany, setSearchCompany] = useState("");
  const [searchInsuredName, setSearchInsuredName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [productcodes, setPcodes] = useState("");
  const [policyMade, setPolicyMade] = useState("");
  const [payon ,setPayon] = useState("");
  const [payoutSlab, setPayoutSlab] = useState([]);
  const name = sessionStorage.getItem("email");

  //  console.log(currentPage);
  //   console.log(itemsPerPage);
  //  console.log(allDetailsData);

  // payout slab list api
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      toast.error("Not Authorized yet.. Try again! ");
    } else {
      // The user is authenticated, so you can make your API request here.
      axios
        .get(`${VITE_DATA}/commission/slab/view`, {
          headers: {
            Authorization: `${token}`, // Send the token in the Authorization header
          },
        })
        .then((response) => {
          setPayoutSlab(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);
  // console.log(payoutSlab)

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      toast.error("Not Authorized yet.. Try again! ");
    } else {
      // The user is authenticated, so you can make your API request here.
      axios
        .get(`${VITE_DATA}/alldetails/viewdata`, {
          headers: {
            Authorization: `${token}`, // Send the token in the Authorization header
          },
          params: {
            page: currentPage,
            limit: itemsPerPage,
          },
        })
        .then((response) => {
          setAllDetailsData(response.data.allList);
          // console.log(response.data.totalPages);
          setTotalPages(response.data.totalPages);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const page = parseInt(params.get("page")) || 1;
    const limit = parseInt(params.get("limit")) || 20;

    setCurrentPage(page);
    setItemsPerPage(limit);
  }, []);

  const onUpdateInsurance = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        toast.error("Not Authorized yet.. Try again!");
      } else {
        const response = await axios.get(`${VITE_DATA}/alldetails/viewdata`, {
          headers: {
            Authorization: `${token}`,
          },
          params: {
            page: currentPage,
            limit: itemsPerPage,
          },
        });
        setAllDetailsData(response.data.allList);
        // console.log(response.data.totalPages);
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
  const filteredData = allDetailsData.filter((data) => {
    // Check if data is defined
    if (!data) return false;
    // Filter conditions
    const idLower = data.policyrefno?.toLowerCase() || "";
    const insuredNameLower = data.insuredName?.toLowerCase() || "";
    const companyLower = data.company?.toLowerCase() || "";
    const contacNoLower = data.policyNo?.toLowerCase() || "";
    const policyLower = data.staffName?.toLowerCase() || "";
    const branchLower = data.branch?.toLowerCase() || "";
    const product = data.productCode?.toLowerCase() || "";
    const payouts = data.payoutOn?.toLowerCase() || "";

    return (
      // Filter conditions using optional chaining and nullish coalescing
      (idLower.includes(searchId.toLowerCase()) || searchId === "") &&
      (branchLower.includes(searchBranch.toLowerCase()) ||
        searchBranch === "") &&
      (insuredNameLower.includes(searchInsuredName.toLowerCase()) ||
        searchInsuredName === "") &&
      (policyLower.includes(policyMade.toLowerCase()) || policyMade === "") &&
      (companyLower.includes(searchCompany.toLowerCase()) ||
        searchCompany === "") &&
      // Update the state variable for company correctly
      (contacNoLower.includes(contactNo.toLowerCase()) || contactNo === "") &&
      (product.includes(productcodes.toLowerCase())  || productcodes === "") &&
      (payouts.includes(payon.toLowerCase())  || payon === "") &&
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

  // calculate payout
  const calculateAdvisorPayableAmount = (finalEntryFields, advisorPayout) => {
    const deduction = finalEntryFields - advisorPayout;
    return deduction;
  };
  const calculateAdvisorPayoutAmount = (finalEntryFields, percentage) => {
    const deduction = finalEntryFields * (percentage / 100);
    return deduction;
  };
  const calculateBranchPayableAmount = (finalEntryFields, branchPayout) => {
    const deduction = finalEntryFields - branchPayout;
    return deduction;
  };
  const calculateBranchPayoutAmount = (finalEntryFields, branchpayoutper) => {
    const deduction = finalEntryFields * (branchpayoutper / 100);
    return deduction;
  };
  const calculateCompanyPayoutAmount = (finalEntryFields, companypayoutper) => {
    const deduction = finalEntryFields * (companypayoutper / 100);
    return deduction;
  };

  
  useEffect(() => {
    // Check if there are matching CSLabs and allDetailsData is not empty
    if (payoutSlab.length > 0 && allDetailsData.length > 0) {
        payoutSlab.forEach((matchingCSLab) => {
            const percentage = matchingCSLab.cvpercentage || 0;
            const branchpercent = matchingCSLab.branchpayoutper || 0;
            const companypercent = matchingCSLab.companypayoutper || 0;
            allDetailsData.forEach((data) => {
                if (
                    matchingCSLab.pcodes === data.productCode &&
                    matchingCSLab.cnames === data.company &&
                    matchingCSLab.catnames === data.category &&
                    matchingCSLab.policytypes === data.policyType &&
                    matchingCSLab.vfuels === data.fuel &&
                    matchingCSLab.payoutons === data.payoutOn
                ) {
                    const netPremium = parseFloat(data.netPremium);
                    const finalEntryFields = parseFloat(data.finalEntryFields);
                    const odPremium = parseFloat(data.odPremium);

                    let advisorPayout, branchPayout, companyPayout;
                    let advisorPayable, branchPayable, profitLoss;

                    if (
                        // Conditions for using specific calculation functions
                        data.policyType === "COMP" &&
                        data.productCode === "PVT-CAR" &&
                        data.payoutOn === "OD"
                    ) {
                        advisorPayout = calculateAdvisorPayoutAmount(odPremium, percentage);
                        advisorPayable = calculateAdvisorPayableAmount(finalEntryFields, advisorPayout);
                        branchPayout = calculateBranchPayoutAmount(odPremium, branchpercent);
                        branchPayable = calculateBranchPayableAmount(finalEntryFields, branchPayout);
                        companyPayout = calculateCompanyPayoutAmount(odPremium, companypercent);
                        profitLoss = companyPayout - branchPayout;
                    } else {
                        // Default calculation functions
                        advisorPayout = calculateAdvisorPayoutAmount(netPremium, percentage);
                        advisorPayable = calculateAdvisorPayableAmount(finalEntryFields, advisorPayout);
                        branchPayout = calculateBranchPayoutAmount(netPremium, branchpercent);
                        branchPayable = calculateBranchPayableAmount(finalEntryFields, branchPayout);
                        companyPayout = calculateCompanyPayoutAmount(netPremium, companypercent);
                        profitLoss = companyPayout - branchPayout;
                    }
                    // Prepare data for API request
                    const postData = {
                        advisorPayoutAmount: parseFloat(advisorPayout.toFixed(2)),
                        advisorPayableAmount: parseFloat(advisorPayable.toFixed(2)),
                        branchPayableAmount: parseFloat(branchPayable.toFixed(2)),
                        branchPayout: parseFloat(branchPayout.toFixed(2)),
                        companyPayout: parseFloat(companyPayout.toFixed(2)),
                        profitLoss: parseFloat(profitLoss.toFixed(2)),
                    };

                    try {
                        // Send data to API
                        const response = axios.put(
                            `${VITE_DATA}/alldetails/updatedata/${data._id}`,
                            postData,
                            {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                            }
                        );
                        // Handle response status
                        if (response.status !== 200) {
                            console.error(`Error updating data for policy ID ${data._id}`);
                        }
                    } catch (error) {
                        console.error(
                            `Error updating data for policy ID ${data._id}:`,
                            error
                        );
                    }
                }
            });
        });
    } else {
        console.log("No matching CSLabs found or allDetailsData is empty.");
    }
}, [allDetailsData, payoutSlab]);


useEffect(() => {
  allDetailsData.forEach(async (data) => {
    let paydata;
    if (data.policyType === "COMP" && data.productCode === "PVT-CAR") {
      paydata = {
        payoutOn: "OD"
      };
    } else {
      paydata = {
        payoutOn: "NET"
      };
    }

    try {
      // Send data to API
      const response = await axios.put(
        `${VITE_DATA}/alldetails/updatedata/${data._id}`,
        paydata,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // Handle response status
      if (response.status !== 200) {
        console.error(`Error updating data for policy ID ${data._id}`);
      }
    } catch (error) {
      console.error(
        `Error updating data for policy ID ${data._id}:`,
        error
      );
    }
  });
}, [allDetailsData]);


  const exportToExcel = () => {
    try {
      const fileType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      const fileExtension = ".xlsx";
      const fileName = `${name}`;
      // Map all data without filtering by current date
      const dataToExport = filteredData.map((row) => {
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
          row.payoutOn,
          row.advisorPayableAmount,
          row.branchPayout,
          row.branchPayableAmount,
          row.companyPayout,
          row.profitLoss,
          row.paymentDoneBy,
          row.chqNoRefNo,
          row.bankName,
          row.chqPaymentDate,
          row.chqStatus,
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
        "Payout On",
        "Advisor Payout",
        "Advisor Payable Amount",
        "Branch Payout",
        "Branch Payable Amount",
        "Company Payout",
        "Profit/Loss",
        "Payment Done By",
        "CHQ No / Ref No",
        "Bank Name",
        "CHQ / Payment Date",
        "CHQ Status",
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

  // delete function
  const onDeleteAllData = async (_id) => {
    try {
      await axios.delete(`${VITE_DATA}/alldetails/deletedata/${_id}`);
      toast.warn("Insurance Data Deleted.....!", {
        theme: "dark",
        position: "top-right",
      });
      setAllDetailsData((prevData) =>
        prevData.filter((data) => data._id !== _id)
      );
    } catch (error) {
      toast.error("Error deleting Insurance");
      console.error("Error deleting Insurance :", error);
    }
  };
  return (
    <section className="container-fluid relative h-screen p-0 sm:ml-64 bg-slate-200">
      <div className="container-fluid flex justify-center p-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 bg-slate-200">
        <div className="inline-block min-w-full  w-full py-0">
          <div className=" mb-4 mt-2 flex justify-between text-blue-500 max-w-auto mx-auto w-auto">
            <h1></h1>
            <span className=" flex justify-center text-center text-3xl font-semibold">
              All Policy Lists
            </span>
            <div className="flex">
              <button
                className="text-end mx-4 flex justify-end  text-3xl font-semibold"
                onClick={handleExportClick}
              >
                <img src="/excel.png" alt="download" className="w-12" />
              </button>
              <NavLink
                to="/dashboard/masterform"
                className="flex justify-center"
              >
                <button
                  type="button"
                  className="text-white  mt-2 justify-end bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-3 py-2 text-center me-2 mb-2 "
                >
                  Go Back
                </button>
              </NavLink>
            </div>
          </div>
          <div className="flex-wrap mb-4 flex justify-between  text-blue-500 max-w-auto mx-auto w-auto ">
            {/* date range filter */}
            <div className="flex   p-0 text-start w-full lg:w-1/5">
              <label className="my-0 text-lg whitespace-nowrap font-medium text-gray-900">
                Date:
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => handleDateRangeChange(e, "start")}
                className="shadow input-style w-52 my-0 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0 mb-2 ml-2"
                placeholder="From Date"
              />
              <span className="text-justify mx-1 my-1 ">to</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => handleDateRangeChange(e, "end")}
                className="shadow input-style w-52 my-0 py-0 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none  px-0 mb-2 "
                placeholder="To Date"
              />
            </div>

            <div className="flex p-0 justify-center  text-end w-full lg:w-1/5">
              <label className="my-0 text-lg whitespace-nowrap font-medium text-gray-900">
                ID:
              </label>
              <input
                type="search"
                onChange={(e) => setSearchId(e.target.value)}
                className="shadow input-style w-52 my-0 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0 mb-2 ml-2"
                placeholder="ID"
              />
            </div>

            <div className="flex justify-start p-0 text-end w-full lg:w-1/4">
              <label className="my-0 text-lg font-medium text-gray-900">
                Company:
              </label>
              <input
                type="search"
                onChange={(e) => setSearchCompany(e.target.value)}
                className="shadow input-style w-52 my-0 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0 mb-2 ml-2"
                placeholder="Company Name"
              />
            </div>
            <div className="flex justify-start  text-start w-full lg:w-1/4">
              <label className="my-0 text-lg font-medium text-gray-900">
                Insured Name:
              </label>
              <input
                type="search"
                onChange={(e) => setSearchInsuredName(e.target.value)}
                className="shadow input-style w-52 my-0 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0 mb-2 ml-2"
                placeholder="Insured Name"
              />
            </div>
            <div className="flex justify-start mt-4  text-start w-full lg:w-1/4">
              <label className="my-0 text-lg font-medium text-gray-900">
                Branch:
              </label>
              <input
                type="search"
                onChange={(e) => setSearchBranch(e.target.value)}
                className="shadow input-style w-52 my-0 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0 mb-2 ml-2"
                placeholder="Branch Name"
              />
            </div>
            <div className="flex text-center justify-start mt-4  lg:w-1/4">
              <label className="my-0 text-lg whitespace-nowrap font-medium text-gray-900">
                Policy No:
              </label>
              <input
                type="search"
                onChange={(e) => setContactNo(e.target.value)}
                className="shadow p-0 text-start  lg:w-1/2 input-style  my-0 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0 mb-2 ml-2"
                placeholder="Policy Number"
              />
            </div>
            <div className="flex text-center justify-start mt-4  lg:w-1/4">
              <label className="my-0 text-lg whitespace-nowrap font-medium text-gray-900">
                Policy Made By:
              </label>
              <input
                type="search"
                onChange={(e) => setPolicyMade(e.target.value)}
                className="shadow p-0 text-start  lg:w-1/2 input-style  my-0 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0 mb-2 ml-2"
                placeholder="Policy Made By"
              />
            </div>
            <div className="flex text-center justify-start mt-4  lg:w-1/4">
              <label className="my-0 text-lg whitespace-nowrap font-medium text-gray-900">
                Product Code:
              </label>
              <input
                type="search"
                onChange={(e) => setPcodes(e.target.value)}
                className="shadow p-0 text-start  lg:w-1/2 input-style  my-0 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0 mb-2 ml-2"
                placeholder="Search by Product Code"
              />
            </div>
            <div className="flex text-center justify-start mt-4  lg:w-1/4">
              <label className="my-0 text-lg whitespace-nowrap font-medium text-gray-900">
                PayoutOn:
              </label>
              <input
                type="search"
                onChange={(e) => setPayon(e.target.value)}
                className="shadow p-0 text-start  lg:w-1/2 input-style  my-0 ps-5 text-base text-blue-700 border border-gray-300 rounded-md bg-gray-100 focus:ring-gray-100 focus:border-gray-500 appearance-none py-1 px-0 mb-2 ml-2"
                placeholder="Search by PayoutOn"
              />
            </div>
          </div>
          <div className="inline-block min-w-full w-full py-0 relative">
            <table className="min-w-full text-center text-sm font-light table border border-black">
              <thead className="border-b font-medium bg-slate-300 sticky top-16 ">
                <tr className="text-blue-700 sticky top-16 ">
                  <th scope="col" className="px-1 border border-black">
                    Update
                  </th>
                  <th scope="col" className="px-1 border border-black">
                    Reference ID
                  </th>
                  <th scope="col" className="px-1 border border-black">
                    Entry Date
                  </th>
                  <th scope="col" className="px-1 border border-black">
                    Branch
                  </th>
                  <th scope="col" className="px-1 border border-black">
                    Insured Name
                  </th>
                  <th scope="col" className="px-1 border border-black">
                    Contact No
                  </th>
                  <th scope="col" className="px-1 border border-black">
                    Policy Made By
                  </th>
                  <th scope="col" className="px-1 border border-black">
                    Policy Received Time
                  </th>
                  <th scope="col" className="px-1 border border-black">
                    Policy Updated Time
                  </th>
                  <th scope="col" className="px-1 border border-black">
                    Company
                  </th>
                  <th scope="col" className="px-1 border border-black">
                    Category
                  </th>
                  <th scope="col" className="px-1 border border-black">
                    Policy Type
                  </th>
                  <th scope="col" className="px-1 border border-black">
                    Policy No
                  </th>
                  <th scope="col" className="px-1 border border-black">
                    Engine No
                  </th>
                  <th scope="col" className="px-1 border border-black">
                    Chassis No
                  </th>
                  <th scope="col" className="px-1 border border-black">
                    OD Premium
                  </th>
                  <th scope="col" className="px-1 border border-black">
                    Liability Premium
                  </th>
                  <th scope="col" className="px-1 border border-black">
                    Net Premium
                  </th>
                  <th scope="col" className="px-1 border border-black">
                    RSA
                  </th>
                  <th scope="col" className="px-1 border border-black">
                    GST(in rupees)
                  </th>
                  <th scope="col" className="px-1 border border-black">
                    Final Amount
                  </th>
                  <th scope="col" className="px-1 border border-black">
                    OD Discount(%)
                  </th>
                  <th scope="col" className="px-1 border border-black">
                    NCB
                  </th>
                  <th scope="col" className="px-1 border border-black">
                    Policy Payment Mode
                  </th>
                  <th
                    scope="col"
                    className="px-1 pt-2 sticky border border-black"
                  >
                    State
                  </th>
                  <th
                    scope="col"
                    className="px-1 pt-2 sticky border border-black"
                  >
                    District
                  </th>
                  <th scope="col" className="px-1 border border-black">
                    Vehicle Reg No
                  </th>
                  <th scope="col" className="px-1 border border-black">
                    Segment
                  </th>
                  <th scope="col" className="px-1 border border-black">
                    Sourcing
                  </th>
                  <th scope="col" className="px-1 border border-black">
                    Policy Start Date
                  </th>
                  <th scope="col" className="px-1 border border-black">
                    Policy End Date
                  </th>
                  <th scope="col" className="px-1 border border-black">
                    OD Expiry
                  </th>
                  <th scope="col" className="px-1 border border-black">
                    TP Expiry
                  </th>
                  <th scope="col" className="px-1 border border-black">
                    IDV
                  </th>
                  <th scope="col" className="px-1 border border-black">
                    Body Type
                  </th>
                  <th scope="col" className="px-1 border border-black">
                    Make & Model
                  </th>
                  <th scope="col" className="px-1 border border-black">
                    MFG Year
                  </th>
                  <th scope="col" className="px-1 border border-black">
                    Registration Date
                  </th>
                  <th scope="col" className="px-1 border border-black">
                    Vehicle Age
                  </th>
                  <th scope="col" className="px-1 border border-black">
                    Fuel
                  </th>
                  <th scope="col" className="px-1 border border-black">
                    GVW
                  </th>
                  <th scope="col" className="px-1 border border-black">
                    C.C
                  </th>
                  <th scope="col" className="px-1 border border-black">
                    Product Code
                  </th>
                  <th scope="col" className="px-1 border border-black">
                    Advisor Name
                  </th>
                  <th scope="col" className="px-1 border border-black">
                    Sub Advisor
                  </th>
                  <th scope="col" className="px-1 border border-black">
                    Payout On
                  </th>
                  <th scope="col" className="px-1 border border-black">
                    Advisor Payout
                  </th>
                  <th scope="col" className="px-1 border border-black">
                    Advisor Payable Amount
                  </th>
                  <th scope="col" className="px-1 border border-black">
                    Branch Payout
                  </th>
                  <th scope="col" className="px-1 border border-black">
                    Branch Payable Amount
                  </th>
                  <th scope="col" className="px-1 border border-black">
                    Company Payout
                  </th>
                  <th scope="col" className="px-1 border border-black">
                    Profit/Loss
                  </th>
                  <th scope="col" className="px-1 border border-black">
                    Payment Done By
                  </th>
                  <th
                    scope="col"
                    className="px-1 border whitespace-nowrap border-black"
                  >
                    CHQ No / Ref No
                  </th>
                  <th scope="col" className="px-1 border border-black">
                    Bank Name
                  </th>
                  <th scope="col" className="px-1 border border-black">
                    CHQ / Payment Date
                  </th>
                  <th scope="col" className="px-1 border border-black">
                    CHQ Status
                  </th>
                  <th scope="col" className="px-1 border border-black">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 overflow-y-hidden">
                {filteredData.map((data) => (
                  <tr
                    className="border-b dark:border-neutral-200 bg-slate-200 text-sm font-medium"
                    key={data._id}
                  >
                    <td className="whitespace-nowrap px-1 border border-black">
                      <UpdateMaster
                        insurance={data}
                        onUpdate={onUpdateInsurance}
                      />
                    </td>
                    <td className="whitespace-nowrap px-1 border border-black">
                      {data.policyrefno}
                    </td>
                    <td className="whitespace-nowrap px-1 border border-black">
                      {data.entryDate}
                    </td>
                    <td className="whitespace-nowrap px-1 border border-black">
                      {data.branch}
                    </td>
                    <td className="whitespace-nowrap px-1 border border-black">
                      {data.insuredName}
                    </td>
                    <td className="whitespace-nowrap px-1 border border-black">
                      {data.contactNo}
                    </td>
                    <td className="whitespace-nowrap px-1 border border-black">
                      {data.staffName}
                    </td>
                    <td className="whitespace-nowrap px-1 border border-black">
                      {data.currentTime}
                    </td>
                    <td className="whitespace-nowrap px-1 border border-black">
                      {data.empTime}
                    </td>
                    <td className="whitespace-nowrap px-1 border border-black">
                      {data.company}
                    </td>
                    <td className="whitespace-nowrap px-1 border border-black">
                      {data.category}
                    </td>
                    <td className="whitespace-nowrap px-1 border border-black">
                      {data.policyType}
                    </td>
                    <td className="whitespace-nowrap px-1 border border-black">
                      {data.policyNo}
                    </td>
                    <td className="whitespace-nowrap px-1 border border-black">
                      {data.engNo}
                    </td>
                    <td className="whitespace-nowrap px-1 border border-black">
                      {data.chsNo}
                    </td>
                    <td className="whitespace-nowrap px-1 border border-black">
                      {data.odPremium}
                    </td>
                    <td className="whitespace-nowrap px-1 border border-black">
                      {data.liabilityPremium}
                    </td>
                    <td className="whitespace-nowrap px-1 border border-black">
                      {data.netPremium}
                    </td>
                    <td className="whitespace-nowrap px-1 border border-black">
                      {data.rsa}
                    </td>
                    <td className="whitespace-nowrap px-1 border border-black">
                      {data.taxes}
                    </td>
                    <td className="whitespace-nowrap px-1 border border-black">
                      {data.finalEntryFields}
                    </td>
                    <td className="whitespace-nowrap px-1 border border-black">
                      {data.odDiscount}
                    </td>
                    <td className="whitespace-nowrap px-1 border border-black">
                      {data.ncb}
                    </td>
                    <td className="whitespace-nowrap px-1 border border-black">
                      {data.policyPaymentMode}
                    </td>
                    <td className="whitespace-nowrap px-1 py-0 border border-black">
                      {data.states}
                    </td>
                    <td className="whitespace-nowrap px-1 py-0 border border-black">
                      {data.district}
                    </td>
                    <td className="whitespace-nowrap px-1 border border-black">
                      {data.vehRegNo}
                    </td>
                    <td className="whitespace-nowrap px-1 border border-black">
                      {data.segment}
                    </td>
                    <td className="whitespace-nowrap px-1 border border-black">
                      {data.sourcing}
                    </td>
                    <td className="whitespace-nowrap px-1 border border-black">
                      {data.policyStartDate}
                    </td>
                    <td className="whitespace-nowrap px-1 border border-black">
                      {data.policyEndDate}
                    </td>
                    <td className="whitespace-nowrap px-1 border border-black">
                      {data.odExpiry}
                    </td>
                    <td className="whitespace-nowrap px-1 border border-black">
                      {data.tpExpiry}
                    </td>
                    <td className="whitespace-nowrap px-1 border border-black">
                      {data.idv}
                    </td>
                    <td className="whitespace-nowrap px-1 border border-black">
                      {data.bodyType}
                    </td>
                    <td className="whitespace-nowrap px-1 border border-black">
                      {data.makeModel}
                    </td>
                    <td className="whitespace-nowrap px-1 border border-black">
                      {data.mfgYear}
                    </td>
                    <td className="whitespace-nowrap px-1 border border-black">
                      {data.registrationDate}
                    </td>
                    <td className="whitespace-nowrap px-1 border border-black">
                      {data.vehicleAge}
                    </td>
                    <td className="whitespace-nowrap px-1 border border-black">
                      {data.fuel}
                    </td>
                    <td className="whitespace-nowrap px-1 border border-black">
                      {data.gvw}
                    </td>
                    <td className="whitespace-nowrap px-1 border border-black">
                      {data.cc}
                    </td>
                    <td className="whitespace-nowrap px-1 border border-black">
                      {data.productCode}
                    </td>
                    <td className="whitespace-nowrap px-1 border border-black">
                      {data.advisorName}
                    </td>
                    <td className="whitespace-nowrap px-1 border border-black">
                      {data.subAdvisor}
                    </td>
                    <td className="whitespace-nowrap px-1 border border-black">
                      {data.payoutOn}
                    </td>
                    <td className="whitespace-nowrap px-1 border border-black">{`₹${data.advisorPayoutAmount}`}</td>
                    <td className="whitespace-nowrap px-1 border border-black">{`₹${data.advisorPayableAmount}`}</td>
                    <td className="whitespace-nowrap px-1 border border-black">{`₹${data.branchPayout}`}</td>
                    <td className="whitespace-nowrap px-1 border border-black">{`₹${data.branchPayableAmount}`}</td>
                    <td className="whitespace-nowrap px-1 border border-black">{`₹${data.companyPayout}`}</td>
                    <td className="whitespace-nowrap px-1 border border-black">{`₹${data.profitLoss}`}</td>
                    <td className="whitespace-nowrap px-1 border border-black">
                      {data.paymentDoneBy}
                    </td>
                    <td className="whitespace-nowrap px-1 border border-black">
                      {data.chqNoRefNo}
                    </td>
                    <td className="whitespace-nowrap px-1 border border-black">
                      {data.bankName}
                    </td>
                    <td className="whitespace-nowrap px-1 border border-black">
                      {data.chqPaymentDate}
                    </td>
                    <td className="whitespace-nowrap px-1 border border-black">
                      {data.chqStatus}
                    </td>
                    <td className="whitespace-nowrap px-1 border border-black">
                      <button
                        type="button"
                        onClick={() => onDeleteAllData(data._id)}
                        className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2 text-center my-1"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {totalItems === 0 && (
            <div className="mt-4 text-gray-500 dark:text-gray-400">
              No records found.
            </div>
          )}
        </div>
      </div>
      {/* Pagination */}
      <PaginationAdmin
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </section>
  );
}
export default ViewMasterForm;
