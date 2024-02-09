import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";

function MasterView() {
      const [allDetailsData, setAllDetailsData] = useState([]);
      // console.log(allDetailsData);
      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(
              `https://eleedomimf.onrender.com/alldetails/viewdata/branch/hpur`
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
                <NavLink to="/branches/home" className="absolute top-30 right-10">
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
                      <th scope="col" className="px-5 py-4">Insured Name</th>
                      <th scope="col" className="px-5 py-4">Contact No</th>
                      <th scope="col" className="px-5 py-4">Vehicle Reg No</th>
                      <th scope="col" className="px-5 py-4">Hypothiniton</th>
                      <th scope="col" className="px-5 py-4">Branch</th>
                      <th scope="col" className="px-5 py-4">Advisor</th>
                      <th scope="col" className="px-5 py-4">Sub Advisor</th>  
                      <th scope="col" className="px-5 py-4">Edit</th>
                      <th scope="col" className="px-5 py-4">Delete</th>  
                    </tr>
                  </thead>

                  <tbody>
                    {allDetailsData.map((data) => (
                      <tr key={data._id} className="border-b dark:border-neutral-200 text-sm font-medium">
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