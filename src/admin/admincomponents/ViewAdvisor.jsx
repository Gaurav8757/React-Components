import axios from "axios";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { TiArrowBack } from "react-icons/ti";
 function ViewAdvisor() {
    const [APIData, setAPIData] = useState([]);
    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            toast.error("Not Authorized yet.. Try again! ");
        } else {
            // The user is authenticated, so you can make your API request here.
            axios
                .get(`https://eleedomimf.onrender.com/advisor/lists`, {
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
    }, [APIData]);

    const setData = (data) => {
        let {
            advisorname,
            advisoremail,
            addpolicycname,
            advisormobile,   
        } = data;
       
        sessionStorage.setItem("advisorname", advisorname);
        sessionStorage.setItem("advisoremail",  advisoremail);
        sessionStorage.setItem("addpolicycname", addpolicycname);
        sessionStorage.setItem("advisormobile", advisormobile);
    };

    // ******************** Delete Functions *************************************/
    const onDeleteAdvisor = async (_id) => {
        try {
          await axios.delete(`https://eleedomimf.onrender.com/advisor/lists/${_id}`);
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
                <div className="inline-block min-w-full w-full py-0 sm:px-6 lg:px-8">
                    <div className="overflow-x-auto w-xl  text-blue-500"
                    ><NavLink to = "/dashboard/addadvisor" className="flex justify-end text-red-700 "><TiArrowBack size={30}/></NavLink>
                        <h1 className="flex justify-center text-3xl font-semibold w-full mb-8">Advisor&apos;s List</h1><hr></hr>
                        </div>
                        <div className="inline-block min-w-full w-full py-0 sm:px-6 lg:px-8 overflow-x-auto">
                        <table className="min-w-full text-center text-sm font-light ">
                            <thead className="border-b font-medium dark:border-neutral-500">
                                <tr className="text-blue-700">
                                   
                                    <th scope="col" className="px-5 py-4">
                                    Advisor Name
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                    Email ID
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                    Mobile No.
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                    Password
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                        Edit
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                        Delete
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {APIData.map((data) => {
                                   
                                    return (
                                        <tr  key={data._id}
                                            className="border-b dark:border-neutral-200 text-sm font-medium">
                                          
                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.advisorname}
                                            </td>
                                            <td className="whitespace-nowrap px4 py-4">
                                                {data.advisoremail}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.advisormobile}
                                            </td>
                                            <td className="whitespace-nowrap px4 py-4">
                                                {data.advisorpassword}
                                            </td>
                                            
                                            <td className="whitespace-nowrap px-4 py-4">
                                                <Link to="#">
                                                    <button type="button" onClick={() => setData(data)} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2 ">
                                                        {/* <UpdateForm/> */} Edit
                                                    </button>

                                                </Link>
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                <button type="button" onClick={() => onDeleteAdvisor(data._id)} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2">Delete</button>
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