import axios from "axios";
import { useEffect, useState } from "react";
import UpdateMaster from "./UpdateMaster.jsx";
import { NavLink } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";
import {toast} from "react-toastify";

function ViewMasterForm() {

  const [allDetailsData, setAllDetailsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (!token) {
          toast.error("Not Authorized yet.. Try again! ");
        } else {
          // The user is authenticated, so you can make your API request here.
        const response = await axios.get(
          "https://eleedomimf.onrender.com/alldetails/viewdata"
        );

        setAllDetailsData(response.data);
     } } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const setData = (data) => {
    // Loop through the properties of the data object and store each property in localStorage
    Object.keys(data).forEach((key) => {
      localStorage.setItem(key, data[key]);
    });
    // Optionally, you can log a message to the console
    console.log("Data stored in localStorage:", data);
    // Add any additional logic you need for handling the data
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
        <div className="inline-block min-w-full  w-full py-0 sm:px-6 lg:px-8">
          <div className="overflow-x-auto text-blue-500">
            <NavLink to="/dashboard/masterform" className="absolute top-30 right-10">
              <TiArrowBack size={30} color="red" />
            </NavLink>
            <h1 className="flex justify-center font-semibold text-3xl w-full mb-4">
              View All Details
            </h1>
            <hr />
          </div>
          <div className="inline-block min-w-full w-full py-0 sm:px-6 lg:px-6  overflow-x-auto">
            <table className="min-w-full text-center text-sm font-light ">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr className="text-blue-700">
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
                  <th scope="col" className="px-5 py-4">Advisor Payout</th>
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
              <tbody>
                {allDetailsData.map((data) => (
                  <tr
                    className="border-b dark:border-neutral-200 text-sm font-medium"
                    key={data._id}
                  >
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
                    <td className="whitespace-nowrap px-4 py-4">{data.advisorPayout}</td>
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
                      <NavLink to="#">
                       
                          <UpdateMaster onClick={() => setData(data)} />  
                         
                      </NavLink>
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
