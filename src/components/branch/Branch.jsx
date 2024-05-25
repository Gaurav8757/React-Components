import { useEffect, useState } from "react";
import axios from "axios";
import VITE_DATA from "../../config/config.jsx";
const Branch = () => {
    const [APIData, setAPIData] = useState([]);
    useEffect(() => {
        // Fetch data directly without checking for the token
        axios
            .get(`${VITE_DATA}/api/branch-list`)
            .then((response) => {
                setAPIData(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [APIData]);

    return (
        <section className="container-fluid relative   bg-orange-50">
            <div className="container-fluid  p-2 border-orange-200 border-dashed rounded-lg  bg-orange-100">
                <h1 className="text-5xl font-bold pt-4 pb-10">Our Branches</h1>
                <div className="max-w-full bg-slate-800">
                    {APIData.map((data, index) => (
                        <div className="card horizontal flex my-0.5" key={data._id}>
                            {/* numbers div */}
                            <div className="w-96 h-40 bg-orange-100 hidden sm:flex  md:flex xl:flex  justify-center items-center">
                                <div className="text-3xl sm:text-4xl md:text-4xl lg:text-4xl xl:text-5xl font-bold text-orange-800">{index + 1}</div>
                                <div className="w-2 h-2 mt-5 sm:mt-5 md:mt-6 lg:mt-10 xl:mt-10 bg-blue-500 ml-0.5"></div>
                            </div>
                            {/* branch name */}
                            <div className=" w-1/3 h-40  bg-orange-100  flex justify-center items-center">
                                <h5 className="text-base sm:text-xl md:text-xl lg:text-xl xl:text-3xl font-bold  text-orange-900 ">
                                    {data.branchname}
                                </h5>
                            </div>
                            {/* company name and details */}
                            <div className="w-1/3 h-40  pr-10  text-center  bg-orange-100  ">
                                <p className="mt-4 my-2 text-blue-500 font-bold text-base sm:text-md md:text-lg lg:text-lg xl:text-lg">  Address</p>
                                <p className=" text-center text-orange-900 font-bold my-auto text-base sm:text-md md:text-lg lg:text-md xl:text-lg ">
                                    {data.branchaddress} <br />
                                </p>
                            </div>
                            <div className=" w-1/3 h-40 flex justify-center bg-orange-100  text-center items-center">
                                <h5 className="text-base sm:text-lg md:text-lg lg:text-lg xl:text-lg font-bold flex-wrap text-orange-900 text-center">
                                    {data.branchemail}
                                </h5>
                            </div>
                            {/* contacts */}
                            <div className=" w-1/3 h-40 flex justify-center bg-orange-100  text-center items-center">
                                <h5 className="text-base sm:text-xl md:text-xl lg:text-lg xl:text-xl font-bold flex-wrap text-orange-900 text-center">
                                    {data.branchmobile}
                                    <br />
                                    {data.branchphone}
                                </h5>
                            </div>
                            {/* pincode */}
                            <div className=" w-1/5 h-40 hidden sm:flex  md:flex xl:flex bg-orange-100   justify-center items-center">
                                <h5 className=" font-bold  text-orange-900 text-base sm:text-lg md:text-xl lg:text-lg xl:text-xl ">
                                    {data.branchpincode}
                                </h5>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
export default Branch;