/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { CgCloseR } from "react-icons/cg";
import axios from "axios";
import { toast } from "react-toastify";
// eslint-disable-next-line react/prop-types
function UpdateBranch({ branch, onUpdate }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [allDetails, setAllDetails] = useState({
        _id: "",
        branchid: "",
        concernperson: "",
        branchname: "",
        branchcode: "",
        branchemail: "",
        branchmobile: "",
        branchphone: "",
        branchaddress: "",
        branchdistrict: "",
        branchstate: "",
        branchpincode: "",
        password: ""
    });

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
        setAllDetails(branch);
    }, [branch]);

    // handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAllDetails((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const updateBranchAPI = async () => {
        try {
            setLoading(true);

            // Make an API call to update contact
            const response = await axios.put(
                `https://eleedomimf.onrender.com/api/branch/update/${branch._id}`, // Update the URL with the correct endpoint
                allDetails
            );

            toast.success(`${response.data.status}`)
            // Close the modal after successful update
            closeModal();
            onUpdate();
        } catch (error) {
            toast.error(`${error}`)
            console.error("Error updating contact:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <button
                onClick={openModal}
                type="button"
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2"
            >
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
                        <div className="relative bg-gradient-to-r from-blue-200 to-cyan-200 rounded-lg shadow dark:bg-slate-100">
                            {/* <!-- Modal header --> */}
                            <div className="flex items-center justify-between p-2 md:p-3 rounded-lg dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-black">
                                    Update Branch
                                </h3>
                                <button
                                    onClick={closeModal}
                                    type="button"
                                    className=" bg-transparent hover:text-red-500 text-slate-500  rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                                >
                                    <CgCloseR size={25} />
                                </button>
                            </div>
                            <section className="p-4 md:p-3 scroll-smooth hs-scroll-inside-viewport-modal rounded-lg max-h-auto text-justify overflow-y-auto bg-gradient-to-r from-slate-100 to-white">
                                <form className="flex flex-wrap ">
                                    {/* ... other form elements ... */}
                                    <div className="w-full lg:w-1/2 p-2 text-start">
                                        <div className="flex flex-col">
                                            <label className="text-base mx-1">Branch Code:</label>
                                            <input
                                                className="input-style rounded-lg"
                                                type="text"
                                                value={allDetails.branchcode.toUpperCase()}
                                                onChange={handleInputChange}
                                                name="branchcode"
                                                placeholder="Enter Branch Code"
                                            />
                                        </div>
                                        <div className="flex flex-col my-5">
                                            <label className="text-base mx-1">Email ID:</label>
                                            <input
                                                className="input-style rounded-lg"
                                                type="email"
                                                value={allDetails.branchemail}
                                                onChange={handleInputChange}
                                                name="branchemail"
                                                placeholder="abc@gmail.com"
                                            />
                                        </div>
                                        <div className="flex flex-col my-5">
                                            <label className="text-base mx-1">Phone No:</label>
                                            <input
                                                className="input-style rounded-lg"
                                                type="number"
                                                value={allDetails.branchphone}
                                                onChange={handleInputChange}
                                                name="branchphone"
                                                placeholder=""
                                            />
                                        </div>
                                        <div className="flex flex-col my-5">
                                            <label className="text-base mx-1">District:</label>
                                            <input
                                                className="input-style rounded-lg"
                                                type="text"
                                                value={allDetails.branchdistrict}
                                                onChange={handleInputChange}
                                                name="branchdistrict"
                                                placeholder="Enter Your District Name"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="text-base mx-1">State:</label>
                                            <input
                                                className="input-style rounded-lg"
                                                type="text"
                                                value={allDetails.branchstate}
                                                onChange={handleInputChange}
                                                name="branchstate"
                                                placeholder="Enter Your State Name"
                                            />
                                        </div>
                                    </div>


                                    {/* part-2 */}
                                    <div className="w-full lg:w-1/2 p-2 text-start">
                                        <div className="flex flex-col">
                                            <label className="text-base mx-1">Branch Name:</label>
                                            <input
                                                className="input-style rounded-lg"
                                                type="text"
                                                value={allDetails.branchname}
                                                onChange={handleInputChange}
                                                name="branchname"
                                                placeholder="Enter Branch Name"
                                            />
                                        </div>
                                        <div className="flex flex-col my-5">
                                            <label className="text-base mx-1">Mobile No:</label>
                                            <input
                                                className="input-style rounded-lg"
                                                type="number"
                                                value={allDetails.branchmobile}
                                                onChange={handleInputChange}
                                                name="branchmobile"
                                                placeholder="+91"
                                            />
                                        </div>
                                        <div className="flex flex-col my-5">
                                            <label className="text-base mx-1">Address:</label>
                                            <textarea
                                                className="input-style rounded-lg"
                                                type="text"
                                                rows={2}
                                                value={allDetails.branchaddress}
                                                onChange={handleInputChange}
                                                name="branchaddress"
                                                placeholder="Enter Your Address"
                                            />
                                        </div>
                                        <div className="flex flex-col my-5">
                                            <label className="text-base mx-1">Pincode:</label>
                                            <input
                                                className="input-style rounded-lg"
                                                type="text"
                                                value={allDetails.branchpincode}
                                                onChange={handleInputChange}
                                                name="branchpincode"
                                                placeholder="805110"
                                            />
                                        </div>
                                        <div className="flex flex-col my-5">
                                            <label className="text-base mx-1">Concern Person</label>
                                            <input
                                                className="input-style rounded-lg"
                                                type="text"
                                                value={allDetails.concernperson}
                                                onChange={handleInputChange}
                                                name="concernperson"
                                                placeholder="Enter Name"
                                            />
                                        </div>

                                    </div>


                                    <div className="w-full p-1 mt-2 justify-center flex">
                                        <button
                                            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                                            onClick={updateBranchAPI}
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
    );
}

export default UpdateBranch;
