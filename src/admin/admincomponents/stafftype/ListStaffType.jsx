import { useState, useEffect } from "react";
import {toast} from "react-toastify";
import axios from "axios";
function ListStaffType() {
    const [APIData, setAPIData] = useState([]);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            toast.error("Not Authorized yet.. Try again! ");
        } else {
            // The user is authenticated, so you can make your API request here.
            axios
                .get(`https://eleedomimf.onrender.com/staff/lists`, {
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
  // ******************** Delete Functions *************************************/
  const onDeleteStaff = async (_id) => {
    try {
      await axios.delete(`https://eleedomimf.onrender.com/staff/lists/${_id}`);
      toast.warn("Staff Type Deleted.....!", { theme: "dark", position: "top-right" });
      setAPIData((prevData) => prevData.filter((data) => data._id !== _id));
    } catch (error) {
      console.error('Error Deleting Staff', error);
    }
  };

  return (
    <section className="container-fluid relative  h-screen p-0 sm:ml-64 bg-slate-200">
    <div className="container-fluid flex justify-center p-2  border-gray-200 border-dashed rounded-lg   bg-slate-200">
    <table className="min-w-full text-center text-sm font-light ">
                            <thead className="border-b font-medium dark:border-neutral-500">
                                <tr className="text-blue-700">
                                    <th scope="col" className="px-4 py-4">
                                    S.No
                                    </th>
                                    <th scope="col" className="px-4 py-4">
                                    Staff Type
                                    </th>
                                    <th scope="col" className="px-4 py-4">
                                        Delete
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {APIData.map((data) => {
                                   console.log(data);
                                    return (
                                        <tr
                                            className="border-b dark:border-neutral-200 text-sm font-medium"
                                            key={data._id}
                                        >
                                          
                                           
                                            <td className="whitespace-nowrap px-3 py-4">
                                                {data.s_type}
                                            </td>
                                           
                                        
                                            <td className="whitespace-nowrap px-3 py-4">
                                                <button type="button" onClick={() => onDeleteStaff(data._id)} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2">Delete</button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
        </div>
        </section>
  )
}

export default ListStaffType;