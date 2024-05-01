import axios from "axios";
import { useEffect, useState } from "react";
// import {  NavLink } from "react-router-dom";
import UpdateAdvisor from "./UpdateAdvisor.jsx";
import { toast } from "react-toastify";
// import { TiArrowBack } from "react-icons/ti";
import VITE_DATA from "../../../config/config.jsx";

 function ViewAdvisor() {
    const [APIData, setAPIData] = useState([]);
    useEffect(() => {
        const token = sessionStorage.getItem("token");
        // const branch = sessionStorage.getItem("name");
        if (!token) {
            toast.error("Not Authorized yet.. Try again! ");
        } else {
            // The user is authenticated, so you can make your API request here.
            axios
                .get(`${VITE_DATA}/advisor/lists`, {
                    headers: {
                        Authorization: `${token}`, // Send the token in the Authorization header
                    },      
                })
                .then((response) => {
                    setAPIData(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, []);

  // refreshing page after updating data
  const onUpdateAdvisor = async () => {
    try {
      const token = sessionStorage.getItem("token");

      if (!token) {
        toast.error("Not Authorized yet.. Try again!");
      } else {
        const response = await axios.get(
          `${VITE_DATA}/advisor/lists`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );

        setAPIData(response.data);
      }
    } catch (error) {
      console.error("Error fetching updated Branch data:", error);
    }
  };

    // ******************** Delete Functions *************************************/
    const onDeleteAdvisor = async (_id) => {
        try {
          await axios.delete(`${VITE_DATA}/advisor/lists/${_id}`);
          toast.warn("Policy Deleted.....!", { theme: "dark", position: "top-right" });
          setAPIData((prevData) => prevData.filter((data) => data._id !== _id));
        } catch (error) {
          console.error('Error deleting policy:', error);
        }
      };
      

    return (
        <section className="container-fluid relative  h-screen p-0 sm:ml-64 bg-slate-200">
        <div className="container-fluid flex justify-center p-2  border-gray-200 border-dashed rounded-lg   bg-slate-200">
            
            {/* <div className="sm:-mx-6 lg:-mx-8"> */}
                <div className="inline-block min-w-full w-full py-0 ">
                    <div className="overflow-x-auto w-xl  text-blue-500">
                        {/* <NavLink to = "/dashboard/addadvisor" className="flex justify-end text-red-700 "><TiArrowBack size={30}/></NavLink> */}
                        <h1 className="flex justify-center text-2xl font-semibold w-full ">Advisor&apos;s List</h1>
                        </div>
                        <div className="inline-block min-w-full w-full py-0 overflow-x-auto">
                        <table className="min-w-full text-center text-sm font-light ">
                            <thead className="border-b font-medium dark:border-neutral-500">
                                <tr className="text-blue-700">
                                <th scope="col" className="px-1 border border-black">
                                    ID
                                    </th>
                                    <th scope="col" className="px-1 border border-black">
                                    Advisor Name
                                    </th>
                                    <th scope="col" className="px-1 border border-black">
                                    Email ID
                                    </th>
                                    <th scope="col" className="px-1 border border-black">
                                    Mobile No.
                                    </th>
                                    <th scope="col" className="px-1 border border-black">
                                    Location
                                    </th>
                                    <th scope="col" className="px-1 border border-black">
                                    Update
                                    </th>
                                    <th scope="col" className="px-1 border border-black">
                                        Delete
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {APIData.map((data) => {  
                                    return (
                                        <tr  key={data._id}
                                            className="border-b dark:border-neutral-200 text-sm font-medium">
                                           <td className="whitespace-nowrap px-1 border border-black">
                                                {data.uniqueId}
                                            </td>
                                            <td className="whitespace-nowrap px-1 border border-black">
                                                {data.advisorname}
                                            </td>
                                            <td className="whitespace-nowrap px-1 border border-black">
                                                {data.advisoremail}
                                            </td>
                                            <td className="whitespace-nowrap px-1 border border-black">
                                                {data.advisormobile}
                                            </td>
                                            <td className="whitespace-nowrap px-1 border border-black">
                                                {data.advisoraddress}
                                            </td>
                                            
                                            <td className="whitespace-nowrap px-1 border border-black">
                                               <UpdateAdvisor advisor = {data} onUpdate = {onUpdateAdvisor} />
                                            </td>
                                            <td className="whitespace-nowrap px-1 border border-black">
                                                <button type="button" onClick={() => onDeleteAdvisor(data._id)} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-3 py-2 text-center ">Delete</button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        {/* </div> */}
        </section>
    );
}
export default ViewAdvisor;