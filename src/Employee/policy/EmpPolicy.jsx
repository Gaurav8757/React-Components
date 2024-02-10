import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import AddPolicyDetail from './AddPolicyDetail.jsx';
// update policy
function EmpPolicy() {
  const [APIData, setAPIData] = useState([]);
  const empid = sessionStorage.getItem("employeeId");

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      toast.error("Not Authorized yet.. Try again! ");
    } else {
      // The user is authenticated, so you can make your API request here.
      axios
        .get(`https://eleedomimf.onrender.com/alldetails/viewdata/${empid}`, {
          headers: {
            Authorization: `${token}`, // Send the token in the Authorization header
          },
        })
        .then((response) => {
          setAPIData(response.data);
        })
        .catch((error) => {
          toast.error(error);
          console.error(error);
        });
    }
  }, [empid]);



  // refreshing page after updating data
   const onUpdatePolicy = async () => {
    try {
      const token = sessionStorage.getItem("token");

      if (!token) {
        toast.error("Not Authorized yet.. Try again!");
      } else {
        const response = await axios.get(
          `https://eleedomimf.onrender.com/alldetails/viewdata/${empid}`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        setAPIData(response.data);
      }
    } catch (error) {
      console.error("Error fetching updated insurance data:", error);
    }
  };

  return (
    <section className="container-fluid relative  h-screen p-0 sm:ml-64 bg-slate-200">
    <div className="container-fluid flex justify-center p-2  border-gray-200 border-dashed rounded-lg   bg-slate-200">
            <div className="inline-block min-w-full w-full py-0 sm:px-6 lg:px-8">
                <div className="overflow-x-auto w-xl  text-blue-500">
                    <h1 className="flex justify-center text-3xl font-semibold w-full mb-8">Policy Lists</h1><hr></hr>
                    </div>
                    <div className="inline-block min-w-full w-full py-0 sm:px-6 lg:px-8 overflow-x-auto">
                    <table className="min-w-full text-center text-sm font-light ">
                        <thead className="border-b font-medium dark:border-neutral-500">
                            <tr className="text-blue-700">
                            <th scope="col" className="px-4 py-4">
                                Entry Date
                                </th>
                                <th scope="col" className="px-4 py-4">
                                Branch
                                </th>
                                <th scope="col" className="px-4 py-4">
                                Category
                                </th>
                                <th scope="col" className="px-4 py-4">
                                Company
                                </th>
                                <th scope="col" className="px-4 py-4">
                               Vehicle No.
                                </th>
                                <th scope="col" className="px-4 py-4">
                                Segment
                                </th>
                                <th scope="col" className="px-4 py-4">
                                Sourcing
                                </th>
                                <th scope="col" className="px-4 py-4">
                                Hypothinition
                                </th>
                                <th scope="col" className="px-4 py-4">
                                Contact No.
                                </th>
                                <th scope="col" className="px-4 py-4">
                                Advisor Name
                                </th>
                                <th scope="col" className="px-4 py-4">
                                Sub-Advisor Name
                                </th>
                                <th scope="col" className="px-4 py-4">
                                Insured By
                                </th>
                                <th scope="col" className="px-4 py-4 bg-green-100">
                               Policy No.
                                </th>
                                <th scope="col" className="px-4 py-4 bg-green-100">
                               Engine No.
                                </th>
                                <th scope="col" className="px-4 py-4 bg-green-100">
                                Chassis No
                                </th>
                                <th scope="col" className="px-4 py-4 bg-green-100">
                               Policy Type
                                </th>
                                <th scope="col" className="px-4 py-4 bg-green-100">
                               OD Premium
                                </th>
                                <th scope="col" className="px-4 py-4 bg-green-100">
                                Liability Premium
                                </th>
                                <th scope="col" className="px-4 py-4 bg-green-100">
                                Net Premium
                                </th>
                                <th scope="col" className="px-4 py-4 bg-green-100">
                               GST(%)
                                </th>
                                <th scope="col" className="px-4 py-4 bg-green-100">
                                Final Premium(GST%)
                                </th>
                                <th scope="col" className="px-4 py-4 bg-green-100">
                                OD Discount(%)
                                </th>
                                <th scope="col" className="px-4 py-4 bg-green-100">
                                NCB
                                </th>
                                <th scope="col" className="px-4 py-4 bg-green-100">
                                Policy Made By
                                </th>
                                <th scope="col" className="px-4 py-4 bg-green-100">
                                    Edit
                                </th>
                                {/* <th scope="col" className="px-4 py-4">
                                    Delete
                                </th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {APIData.map((data) => {  
                                return (
                                    <tr
                                        className="border-b dark:border-neutral-200 text-sm font-medium"
                                        key={data._id}
                                    >
                                       <td className="whitespace-nowrap px-3 py-4">
                                            {data.entryDate}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4">
                                            {data.branch}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4">
                                            {data.category}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4">
                                            {data.company}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4">
                                            {data.vehRegNo}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4">
                                            {data.segment}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4">
                                            {data.sourcing}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4">
                                            {data.hypo}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4">
                                            {data.contactNo}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4">
                                            {data.advisorName}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4">
                                            {data.subAdvisor}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4">
                                            {data.insuredName}
                                        </td>

                                        <td className="whitespace-nowrap px-3 py-4 bg-green-100">
                                            {data.policyNo}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 bg-green-100">
                                            {data.engNo}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 bg-green-100">
                                            {data.chsNo}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 bg-green-100">
                                            {data.policyType}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 bg-green-100">
                                            {data.odPremium}
                                        </td>

                                        <td className="whitespace-nowrap px-3 py-4 bg-green-100">
                                            {data.liabilityPremium}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 bg-green-100">
                                            {data.netPremium}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 bg-green-100">
                                            {data.taxes}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 bg-green-100">
                                            {data.finalEntryFields}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 bg-green-100">
                                            {data.odDiscount}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 bg-green-100">
                                            {data.ncb}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 bg-green-100">
                                            {data.policyMadeBy}
                                        </td>


                                        <td className="whitespace-nowrap px-3 py-4 bg-green-100">
                                         
                                           <AddPolicyDetail  insurance = {data}  onUpdate = {onUpdatePolicy}/>
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
  )
}

export default EmpPolicy;