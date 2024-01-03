import Form from "./ViewForm/Form.jsx";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function HealthPage() {
    const [APIData, setAPIData] = useState([]);
    // const [modalVisibility, setModalVisibility] = useState({});
    useEffect(() => {
        axios
            .get(`https://eleedomimf.onrender.com/api/company/health-list`)
            .then((response) => {
                setAPIData(response.data);

            })
            .catch((error) => {
                toast.error(`No Data Found!`, { theme: "dark" })
                console.error(error);
            });
        // }
    }, []);


    return (
        <>
            <section className="container-fluid relative  h-screen p-0  bg-gradient-to-r from-indigo-400 to-cyan-400">
                <div className="container-fluid flex justify-center p-2  border-gray-200 border-dashed rounded-lg dark:border-gray-700  bg-gradient-to-r from-indigo-400 to-cyan-400">

                    {/* <div className="sm:-mx-6 lg:-mx-8"> */}
                    <div className="inline-block min-w-full w-full py-0 sm:px-6 lg:px-8">
                        <div className="overflow-x-auto w-xl  text-white">
                            <h1 className="flex justify-center text-4xl w-full mb-8">Health Insurance</h1><hr></hr>
                        </div>
                        <div className="inline-block min-w-full w-full py-0 sm:px-6 lg:px-8 overflow-x-auto">
                            <table className="min-w-full text-center text-sm font-light ">
                                <thead className="border-b font-medium dark:border-neutral-500">
                                    <tr className="text-white">
                                        <th scope="col" className="px-5 py-4">
                                            Company Name
                                        </th>

                                        <th scope="col" className="px-5 py-4">
                                            Files
                                        </th>
                                        <th scope="col" className="px-5 py-4">

                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {APIData.map((data) => {

                                        return (
                                            <tr
                                                className="border-b dark:border-neutral-200 text-sm font-medium"
                                                key={data._id}>
                                                <td className="whitespace-nowrap px-4 py-4">
                                                    {data.comp_cname}
                                                </td>

                                                <td className="whitespace-nowrap px4 py-4">
                                                    <NavLink to={`https://eleedomimf.com${data.comp_cfiles}`}>
                                                        <img src={data.comp_cfiles} alt="files" />
                                                    </NavLink>

                                                </td>
                                                <td className="whitespace-nowrap px-4 py-4">

                                                    <Form className="whitespace-nowrap px-4 py-4" />
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
        </>
    );

}

export default HealthPage;