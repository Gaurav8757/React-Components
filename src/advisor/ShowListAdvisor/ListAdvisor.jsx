import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
// import UpdateAdvisor from "./UpdateAdvisor.jsx";
import { toast } from "react-toastify";


function ListAdvisor() {
    const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState();
    const [APIData, setAPIData] = useState([]);

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
    }, []);

    // page number add
    const handlePageChange = (page) => {
        setCurrentPage(page);
      };
    
      const totalItems = APIData.length;
      const totalPages = Math.ceil(totalItems / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

    // refreshing page after updating data
    //   const onUpdateAdvisor = async () => {
    //     try {
    //       const token = sessionStorage.getItem("token");

    //       if (!token) {
    //         toast.error("Not Authorized yet.. Try again!");
    //       } else {
    //         const response = await axios.get(
    //           `https://eleedomimf.onrender.com/advisor/lists`,
    //           {
    //             headers: {
    //               Authorization: `${token}`,
    //             },
    //           }
    //         );

    //         setAPIData(response.data);
    //       }
    //     } catch (error) {
    //       console.error("Error fetching updated Branch data:", error);
    //     }
    //   };

    // ******************** Delete Functions *************************************/
    // const onDeleteAdvisor = async (_id) => {
    //     try {
    //       await axios.delete(`https://eleedomimf.onrender.com/advisor/lists/${_id}`);
    //       toast.warn("Policy Deleted.....!", { theme: "dark", position: "top-right" });
    //       setAPIData((prevData) => prevData.filter((data) => data._id !== _id));
    //     } catch (error) {
    //       console.error('Error deleting policy:', error);
    //     }
    //   };


    return (
        <section className="container-fluid relative  h-screen p-0 sm:ml-64 bg-slate-200">
            <div className="container-fluid flex justify-center p-2  border-gray-200 border-dashed rounded-lg   bg-slate-200">
                <div className="inline-block min-w-full w-full py-0 ">
                    <div className=" mb-4 mt-2 flex justify-between text-blue-500 ">
                        <h1 className="mr-20"></h1>
                        <span className=" flex justify-center text-center text-3xl font-semibold">Advisor&apos;s List</span>
                        <div className="flex">
                            {/* <button className="text-end mx-4 flex justify-end  text-3xl font-semibold" ><img src="/excel.png" alt="download" className="w-12" /></button> */}
                            <NavLink to="/branches/home/advisor/register" className="flex justify-center">
                                <button type="button" className="text-white  mt-2 justify-end bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-3 py-2 text-center me-2 mb-2 ">Go Back</button>
                            </NavLink>
                        </div>
                    </div>
                    <div className="inline-block min-w-full w-full py-0  relative">
                        <table className="min-w-full text-center text-sm font-light ">
                            <thead className="border-b font-medium  sticky top-16">
                                <tr className="text-blue-700 sticky top-16 bg-slate-200">
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
                                        Address
                                    </th>

                                    {/* <th scope="col" className="px-5 py-4">
                                            Update
                                        </th> */}
                                    {/* <th scope="col" className="px-5 py-4">
                                            Delete
                                        </th> */}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 overflow-y-hidden">
                                {APIData.slice(startIndex, endIndex).map((data) => {
                                    return (
                                        <tr key={data._id}
                                        className="border-b  bg-slate-200 text-sm font-medium">
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

                                            {/* <td className="whitespace-nowrap px-4 py-4">
                                                   <UpdateAdvisor advisor = {data} onUpdate = {onUpdateAdvisor} />
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-4">
                                                    <button type="button" onClick={() => onDeleteAdvisor(data._id)} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2">Delete</button>
                                                </td> */}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
           {/* Pagination */}
      <nav aria-label="Page navigation  flex example sticky   ">
      <ul className="flex space-x-2 mt-2 justify-end">
                    <li>
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-3 py-1 text-blue-600 border border-blue-600 bg rounded-l hover:bg-blue-400 hover:text-white"
                        >
                            Previous
                        </button>
                    </li>
                    {Array.from({ length: totalPages }, (_, i) => {
                        // Display buttons for currentPage and a few surrounding pages
                        const showPage = i + 1 === 1 || i + 1 === currentPage || i + 1 === totalPages || Math.abs(i + 1 - currentPage) <= 2;
                        if (showPage) {
                            return (
                                <li key={i}>
                                    <button
                                        onClick={() => handlePageChange(i + 1)}
                                        className={`px-3 py-1 ${i + 1 === currentPage
                                                ? 'bg-green-700 text-white font-bold'
                                                : 'text-blue-600 hover:bg-blue-400 hover:text-white'
                                            } border border-blue-600`}
                                    >
                                        {i + 1}
                                    </button>
                                </li>
                            );
                        }
                        return null;
                    })}
                    <li>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 text-blue-600 border border-blue-600 rounded-r hover:bg-blue-400 hover:text-white"
                        >
                            Next
                        </button>
                    </li>
                </ul>
      </nav>
        </section>
    );
}


export default ListAdvisor;