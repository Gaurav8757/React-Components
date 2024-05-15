/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { CgCloseR } from "react-icons/cg";
import axios from "axios";
import { toast } from "react-toastify";
import VITE_DATA from "../../config/config.jsx";

function AdvisorUpdates({ advisors, onUpdates }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [advInfo, setAdvInfo] = useState({
        advisorname: "",
        advisoremail: "",
        advisormobile: "",
        advisorpassword: "",
        advisortype:""
    })
    // OPEN MODAL
    const openModal = () => {
        setIsModalOpen(true);
    };

    // CLOSE MODAL
    const closeModal = () => {
        setIsModalOpen(false);
    };

    // show all data inside input tag
    useEffect(() => {
        setAdvInfo(advisors);
    }, [advisors]);

    // handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAdvInfo((prevData) => ({
            ...prevData,
            [name]: value.toUpperCase(),
        }));
    };

    const updateAdvisorAPI = async () => {
        try {
            setLoading(true);

            // Make an API call to update contact
            const response = await axios.put(
                `${VITE_DATA}/advisor/update/${advisors._id}`, // Update the URL with the correct endpoint
                advInfo
            );

            toast.success(`${response.data.status}`)
            // Close the modal after successful update
            closeModal();
            onUpdates();
        } catch (error) {
            toast.error(`${error}`)
            console.error("Error updating Advisor:", error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <button
                onClick={openModal}
                type="button"
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-2 py-1 my-0.5 text-center">
                Update
            </button>


            {isModalOpen && (
                <div
                    id="static-modal"
                    data-modal-backdrop="static"
                    tabIndex="-1"
                    aria-hidden="true"
                    className="fixed top-0 right-0 left-0 bottom-0 inset-0 z-50 overflow-y-auto overflow-x-hidden bg-black bg-opacity-50"
                >
                    <div className="relative p-4 w-full max-w-6xl max-h-5xl mx-auto my-20">
                        {/* <!-- Modal content --> */}
                        <div className="relative bg-gradient-to-r from-orange-800 to-orange-700 rounded-lg shadow px-4 pb-4">
                            {/* <!-- Modal header --> */}
                            <div className="flex items-center justify-between p-2 md:p-3 rounded-lg ">
                                <h3 className="text-xl font-semibold text-gray-100 ">
                                    Update Advisor Details
                                </h3>
                                <button
                                    onClick={closeModal}
                                    type="button"
                                    className=" bg-transparent hover:text-red-900 text-slate-100  rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                                >
                                    <CgCloseR size={25} />
                                </button>
                            </div>
                            <section className="p-4 md:p-3 scroll-smooth hs-scroll-inside-viewport-modal rounded-lg max-h-auto text-justify overflow-y-auto bg-gradient-to-r from-slate-100 to-white">
                                <form className="flex flex-wrap ">
                                    {/* ... other form elements ... */}
                                    {/* <div className="w-full lg:w-1/2 p-2 text-start"> */}
                                        <div  className="flex flex-col p-2 text-start w-full lg:w-1/4">
                                            <label className="text-base mx-1">Name:</label>
                                            <input
                                                className="input-style p-1 rounded-lg"
                                                type="text"
                                                value={advInfo.advisorname}
                                                onChange={handleInputChange}
                                                name="advisorname"
                                                placeholder="Enter Name"
                                            />
                                        </div>
                                        <div className="flex flex-col  p-2 text-start w-full lg:w-1/4">
                                            <label className="text-base mx-1">Mobile No:</label>
                                            <input
                                                className="input-style p-1 rounded-lg"
                                                type="number"
                                                value={advInfo.advisormobile}
                                                onChange={handleInputChange}
                                                name="advisormobile"
                                                placeholder="+91"
                                            />
                                        </div>
                                    {/* </div> */}


                                    {/* part-2 */}
                                    {/* <div className="w-full lg:w-1/2 p-2 text-start"> */}
                                        <div className="flex flex-col  p-2 text-start w-full lg:w-1/4">
                                            <label className="text-base mx-1">Email ID:</label>
                                            <input
                                                className="input-style p-1 rounded-lg"
                                                type="email"
                                                value={advInfo.advisoremail}
                                                onChange={handleInputChange}
                                                name="advisoremail"
                                                placeholder="abc@gmail.com"
                                            />
                                        </div>
                                        <div className="flex flex-col  p-2 text-start w-full lg:w-1/4">
                                            <label className="text-base mx-1">Address:</label>
                                            <input
                                                className="input-style p-1 rounded-lg"
                                                type="text"
                                                value={advInfo.advisoraddress}
                                                onChange={handleInputChange}
                                                name="advisoraddress"
                                                placeholder=""
                                            />
                                        </div>

                                        <div className="flex flex-col p-2 text-start w-full lg:w-1/4">
              <label className="text-base mx-1">Advisor Payout Type:</label>
              <select
                className="input-style p-1 rounded-lg"
                type="text"
                value={advInfo.advisortype}
                name="advisortype"
                onChange={handleInputChange}>
                <option value="">------ Select Payout Type --------</option>
                <option value="DAILYPAYOUT">Daily Payout</option>
                <option value="MONTHPAYOUT">Monthly Payout</option>
              </select>
            </div>


                                    <div className="w-full p-1 mt-2 justify-center flex">
                                        <button
                                            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                                            onClick={updateAdvisorAPI}
                                            type="button"
                                        >
                                            {loading ? "Submitting..." : "Submit"}
                                        </button>
                                    </div>
                                </form>
                            </section>
                        </div>
                    </div>
                </div>
            )}

        </>


    )
}
export default AdvisorUpdates;