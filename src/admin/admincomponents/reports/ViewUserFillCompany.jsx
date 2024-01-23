import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { TiArrowBack } from "react-icons/ti";
function ViewUserFillCompany() {
    const [APIData, setAPIData] = useState([]);
    const [search, setSearch] = useState("");
    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            toast.error("Not Authorized yet.. Try again! ");
        } else {
            // The user is authenticated, so you can make your API request here.
            axios
                .get(`https://eleedomimf.onrender.com/users/view/userdetails`, {
                    headers: {
                        Authorization: `${token}`, // Send the token in the Authorization header
                    },
                })
                .then((response) => {
                    // console.log(response.data);
                    setAPIData(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, []);

   

    // ******************** Delete Functions *************************************/
    const onDeleteCustomerDetails = async (_id) => {
        try {
            await axios.delete(`https://eleedomimf.onrender.com/users/delete/userdetails/${_id}`);
            toast.success("Customer Details Removed Successfully..!", { theme: "dark", position: "top-right" });
            setAPIData((prevData) => prevData.filter((data) => data._id !== _id));
        } catch (error) {
            console.error('Error removing employee salary:', error);
        }
    };

    return (
        <section className="container-fluid relative  h-screen p-0 sm:ml-64 bg-slate-200">
            <div className="container-fluid flex justify-center p-2  border-gray-200 border-dashed rounded-lg   bg-slate-200">
                {/* <div className="sm:-mx-6 lg:-mx-8"> */}
                <div className="inline-block min-w-full w-full py-0 sm:px-6 lg:px-8">
                    <div className="overflow-x-auto w-xl  text-blue-500"
                    ><NavLink to="/dashboard" className="flex justify-end  text-red-700 "><TiArrowBack size={30}/></NavLink>
                        <h1 className="flex justify-center text-3xl font-semibold w-full mb-8">View Form Filled by Customer&apos;s</h1>
                        {/* search */}
                        <form className="flex justify-end">
                            <label className=" my-0  mb-2 text-2xl font-medium text-gray-900" > Filter:</label>
                            <input type="search" onChange={(e) => setSearch(e.target.value)} className="shadow input-style w-40 p-3 ps-5 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-blue-100 dark:border-gray-600 dark:placeholder-blue-700  dark:focus:ring-blue-500 dark:focus:border-blue-500  appearance-none py-2 px-1 mb-4 ml-4" placeholder="Search Customer's" />
                        </form>
                        <hr></hr>
                    </div>

                    <div className="inline-block min-w-full w-full py-0 sm:px-6 lg:px-8 overflow-x-auto">
                        <table className="min-w-full text-center text-sm font-light ">
                            <thead className="border-b font-medium dark:border-neutral-500">
                                <tr className="text-blue-700">
                                    <th scope="col" className="px-5 py-4">
                                        Company Name
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                        Customer Name
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                        Mobile No.
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                        Email ID
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                        Address
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
                                {APIData.filter((data) => {
                                    const searchLower = search.toLowerCase();
                                    const cnameLower = data.h_cname.toLowerCase();
                                    return searchLower === '' ? true : cnameLower.includes(searchLower);
                                    // return search.toLowerCase() === '' ? data : data.h_cname.toLowerCase().includes(search)
                                }).map((data) => {
                                    return (
                                        <tr
                                            className="border-b dark:border-neutral-200 text-sm font-medium"
                                            key={data._id}>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.h_cname}
                                            </td>
                                            <td className="whitespace-nowrap px4 py-4">
                                                {data.h_name}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                {data.h_mobile}
                                            </td>
                                            <td className="whitespace-nowrap px4 py-4">
                                                {data.h_email}
                                            </td>
                                            <td className="whitespace-wrap px-4 py-4 text-center">
                                                {data.h_address}
                                            </td>
                                           
                                            <td className="whitespace-nowrap px-4 py-4">
                                                <button type="button" onClick={() => onDeleteCustomerDetails(data._id)} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2">Delete</button>
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
export default ViewUserFillCompany;