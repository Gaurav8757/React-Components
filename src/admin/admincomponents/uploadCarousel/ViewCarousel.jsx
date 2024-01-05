import axios from "axios";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";
import { toast } from "react-toastify";
function ViewCarousel() {
    const [APIData, setAPIData] = useState([]);
    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            toast.error("Not Authorized yet.. Try again! ");
        } else {
            // The user is authenticated, so you can make your API request here.
            axios
                .get(`https://eleedomimf.onrender.com/users/first/view`, {
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
    }, [APIData]);

    const setData = (data) => {
        let {
            insurance,
            category,
            establishment,
            cname,
            cfiles,
        } = data;
        sessionStorage.setItem("usercarousel_title", insurance);
        sessionStorage.setItem("usercarousel_desc", category);
        sessionStorage.setItem("comp_establishment", establishment);
        sessionStorage.setItem("usercarousel_link", cname);
        sessionStorage.setItem("usercarousel_upload", cfiles);
    };

    // ******************** Delete Functions *************************************/
    const onDeleteCarousel = async (_id) => {
        try {
            await axios.delete(`https://eleedomimf.onrender.com/users/first/deletecarousel/${_id}`);
            toast.warn("Carousel Removed.....!", { theme: "dark", position: "top-right" });
            setAPIData((prevData) => prevData.filter((data) => data._id !== _id));
        } catch (error) {
            toast.error(`Error in Removing Carousel ${error}`)
            console.error('Error deleting Carousel:', error);
        }
    };



    return (
        <section className="container-fluid relative  h-screen p-0 sm:ml-64 bg-gradient-to-r from-indigo-400 to-cyan-400">
            <div className="container-fluid flex justify-center p-2  border-gray-200 border-dashed rounded-lg dark:border-gray-700  bg-gradient-to-r from-indigo-400 to-cyan-400">

                {/* <div className="sm:-mx-6 lg:-mx-8"> */}
                <div className="inline-block min-w-full w-full py-0 sm:px-6 lg:px-8">
                    <div className="overflow-x-auto w-xl  text-white"
                    ><NavLink to="/dashboard/addcarousel" className="flex justify-end text-red-700 "><TiArrowBack size={30} /></NavLink>
                        <h1 className="flex justify-center text-4xl w-full mb-8">All Carousel&apos;s List</h1><hr></hr>
                    </div>
                    <div className="inline-block min-w-full w-full py-0 sm:px-6 lg:px-8 overflow-x-auto">
                        <table className="min-w-full text-center text-sm font-light ">
                            <thead className="border-b font-medium dark:border-neutral-500">
                                <tr className="text-white">

                                    <th scope="col" className="px-5 py-4">
                                        Title
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                        Description
                                    </th>
                                    <th scope="col" className="px-5 py-4">
                                        Links
                                    </th>
                                   
                                    <th scope="col" className="px-5 py-4">
                                        Images
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
                                        <tr
                                            className="border-b dark:border-neutral-200 text-sm font-medium"
                                            key={data._id}>
                                            <td className="whitespace-nowrap px-4 py-4 ">
                                                {data.usercarousel_title}
                                            </td>
                                            <td className="whitespace-wrap px-4 py-4 text-justify">
                                                {data.usercarousel_desc}
                                            </td>
                                            <td className="whitespace-wrap px-4 py-4 text-center">
                                                {data.usercarousel_link}
                                            </td>
                                           
                                            <td className="whitespace-nowrap px4 py-4">

                                                <NavLink to={`https://www.eleedomimf.onrender.com${data.usercarousel_upload}`}>
                                                    <img src={data.usercarousel_upload} alt="file" />
                                                </NavLink>

                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                <Link to="#">
                                                    <button type="button" onClick={() => setData(data)} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2 ">
                                                        {/* <UpdateForm/> */} Edit
                                                    </button>

                                                </Link>
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                <button type="button" onClick={() => onDeleteCarousel(data._id)} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2">Delete</button>
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
    )

}




export default ViewCarousel;