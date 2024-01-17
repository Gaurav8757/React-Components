import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";

function InsuranceLists() {
  const [allDetailsData, setAllDetailsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://eleedomimf.onrender.com/alldetails/viewdata"
        );
        setAllDetailsData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  return (
    <section className="container-fluid relative h-screen p-0 sm:ml-64 bg-slate-200">
      <div className="container-fluid flex justify-center p-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 bg-slate-200">
        <div className="inline-block min-w-full  w-full py-0 sm:px-6 lg:px-8">
          <div className="overflow-x-auto text-blue-500">
            <NavLink to="/advisor/home" className="absolute top-30 right-10">
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































export default InsuranceLists