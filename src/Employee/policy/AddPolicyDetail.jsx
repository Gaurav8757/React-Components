/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { CgCloseR } from "react-icons/cg";
import { toast } from "react-toastify";
import axios from "axios";

function AddPolicyDetail({ insurance, onUpdates }) {
    const [pdata, setPdata] = useState([]);
    const [loading, setLoading] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [APIData, setAPIData] = useState([]);
    const [data, setData] = useState([]);

    const [fuelData, setFuelData] = useState([]);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const [catTypesForSelectedPolicy, setCatTypesForSelectedPolicy] = useState([]);
    const [empTime, setEmpTime] = useState(getFormattedTime());

    function getFormattedTime() {
        const date = new Date();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format
        const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
        return `${formattedHours}:${formattedMinutes} ${ampm}`;
    }

    const checkFormValidity = () => {
        const requiredFields = ["company", "category", "policyType", "policyNo", "engNo", "chsNo", "taxes", "rsa", "finalEntryFields", "odDiscount", "ncb", "policyPaymentMode"];
        const emptyFields = requiredFields.filter(field => !allDetails[field]);
        return emptyFields.length === 0;
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            setEmpTime(getFormattedTime());
        }, 1000); // Update every second
        // Clean up interval on component unmount
        return () => clearInterval(intervalId);
    }, []); // Empty dependency array ensures effect runs only once on mount

    const [allDetails, setAllDetails] = useState({
        company: "",
        category: "",
        policyType: '',
        policyNo: '',
        engNo: '',
        chsNo: '',
        odPremium: '',
        liabilityPremium: '',
        netPremium: '',
        taxes: '',
        rsa: '',
        fuel: '',
        vehRegNo: '',
        finalEntryFields: '',
        odDiscount: '',
        ncb: '',
        policyPaymentMode: "",
        empTime: empTime,
        advisorName: ""
    });

    // OPEN MODAL
    const openModal = () => {
        setIsModalOpen(true);
    };

    // CLOSE MODAL
    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            toast.error("Not Authorized yet.. Try again! ");
        } else {
            // The user is authenticated, so you can make your API request here.
            axios
                .get(`https://eleedomimf.onrender.com/view/fuel`, {
                    headers: {
                        Authorization: `${token}`, // Send the token in the Authorization header
                    },
                })
                .then((response) => {
                    setFuelData(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [formSubmitted]);
    // const isValidEngineChassis = (value) => {
    //     return /^[A-Za-z0-9]{6}$/.test(value);
    // };

    useEffect(() => {
        axios.get(`https://eleedomimf.onrender.com/view/company/lists`)
            .then((resp) => {
                const cType = resp.data;

                setPdata(cType);
            })
            .catch((error) => {
                console.error("Error fetching company names:", error);
            });
    }, [pdata]);

    useEffect(() => {
        axios.get(`https://eleedomimf.onrender.com/staff/policy/lists`)
            .then((resp) => {
                const PolicyType = resp.data;

                setData(PolicyType);
            })
            .catch((error) => {
                console.error("Error fetching policy types:", error);
            });
    }, [data]);



    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            toast.error("Not Authorized yet.. Try again! ");
        } else {
            // The user is authenticated, so you can make your API request here.
            axios
                .get(`https://eleedomimf.onrender.com/api/employee-list`, {
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

    const updateNetPremium = () => {
        const odPremiumValue = parseFloat(allDetails.odPremium) || 0;
        const liabilityPremiumValue = parseFloat(allDetails.liabilityPremium) || 0;
        // Calculate netPremium by adding odPremium and liabilityPremium
        const newNetPremium = odPremiumValue + liabilityPremiumValue;
        // Set the updated netPremium value directly
        setAllDetails(prevDetails => ({
            ...prevDetails,
            netPremium: newNetPremium.toFixed(2)
        }));
    };

    // // Calculate taxes with netPremium
    const calculateFinalAmount = () => {
        const netPremiumValue = parseFloat(allDetails.netPremium) || 0;
        const taxesValue = parseFloat(allDetails.taxes) || 0;
        const rsaValue = parseFloat(allDetails.rsa) || 0;
        const finalAmountValue = netPremiumValue + taxesValue + rsaValue;

        setAllDetails(prevDetails => ({
            ...prevDetails,
            finalEntryFields: finalAmountValue.toFixed(2)
        }));
    };

    // // Calculate branch payable amount
    const calculateBranchPayableAmount = () => {
        const netPremiumValue = parseFloat(allDetails.netPremium) || 0;
        const branchPayoutValue = parseFloat(allDetails.branchPayout) || 0;
        const branchPayableAmountValue = netPremiumValue - branchPayoutValue;

        setAllDetails(prevDetails => ({
            ...prevDetails,
            branchPayableAmount: branchPayableAmountValue.toFixed(2)
        }));
    };

    // // Final amount set
    const handleNetPremiumBlur = () => {
        if (allDetails.calculationType === 'finalAmount') {
            calculateFinalAmount();
        } else if (allDetails.calculationType === 'branchPayableAmount') {
            calculateBranchPayableAmount();
        }
        // Reset the calculation type after performing the calculation
        setAllDetails(prevDetails => ({
            ...prevDetails,
            calculationType: ''
        }));
    };

    // show all data inside input tag
    useEffect(() => {
        setAllDetails(insurance);
    }, [insurance]);

    // handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAllDetails((prevData) => ({
            ...prevData,
            empTime: empTime,
            [name]: value,
        }));
    };



    const updateInsuranceAPI = async () => {
        try {
            setLoading(true);
            setFormSubmitted(true);
            // Check form validity before submitting
            if (!checkFormValidity()) {
                toast.error("Please fill in all required fields before submitting.");
                return;
            }
            // Use the selected category ID in the patch method
            const resp = await axios.put(`https://eleedomimf.onrender.com/alldetails/updatedata/${insurance._id}`, allDetails);
            onUpdates();
            toast.success(`${resp.data.status}`);

            // Close the modal after successful submission
            closeModal();
        } catch (error) {
            console.error("Error updating insurance details:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* <!-- Modal toggle --> */}
            <button onClick={openModal} type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 my-1 ">
                Update
            </button>
            {/* <!-- Main modal --> */}
            {isModalOpen && (
                <div
                    id="static-modal"
                    data-modal-backdrop="static"
                    tabIndex="-1"
                    aria-hidden="true"
                    className="fixed top-0 right-0 left-0 bottom-0 inset-0 z-50 overflow-y-auto overflow-x-hidden bg-black bg-opacity-50">

                    <div className="relative p-1 w-full max-w-7xl max-h-7xl mx-auto my-20">
                        {/* <!-- Modal content --> */}
                        <div className="relative bg-gradient-to-r from-cyan-700 to-cyan-500 rounded-lg shadow ">
                            {/* <!-- Modal header --> */}
                            <div className="flex items-center justify-between p-2 md:p-3 rounded-lg dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-gray-100 ">
                                    Fill Policy Details
                                </h3>
                                <button
                                    onClick={closeModal}
                                    type="button"
                                    className=" bg-transparent hover:text-red-500 text-slate-50  rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center  ">
                                    <CgCloseR size={25} />
                                </button>
                            </div>
                            {/* <!-- Modal body --> */}
                            <section className="p-4 md:p-3 scroll-smooth hs-scroll-inside-viewport-modal rounded-lg max-h-auto text-justify overflow-y-auto bg-gradient-to-r from-cyan-700 to-cyan-400">
                                <div className="container-fluid flex justify-center p-1 border-gray-200 border-dashed rounded-lg dark:border-gray-700 bg-gradient-to-r from-white to-cyan-700">
                                    <div className="relative w-full lg:w-full p-4 lg:p-1 rounded-xl shadow-xl text-2xl items-center bg-slate-200">
                                        <div className="flex flex-wrap justify-between">
                                            <div className="flex flex-col p-2 text-start w-full lg:w-1/4">
                                                <label className="text-base mx-1">Company Name<span className="text-red-600 font-bold">*</span></label>
                                                <select
                                                    id="company" name="company"
                                                    className="input-style p-1 rounded-lg"
                                                    value={allDetails.company}
                                                    onChange={(e) => {
                                                        handleInputChange(e);
                                                        const selectedCatId = e.target.selectedOptions[0].getAttribute("data-id");
                                                        setCatTypesForSelectedPolicy(selectedCatId);
                                                    }}>
                                                    <option className="" value="" >--- Select Company ---</option>
                                                    {pdata.map((comp) => (
                                                        <option key={comp._id} value={comp.c_type} data-id={comp._id}>
                                                            {comp.c_type}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="flex flex-col p-2 text-start w-full lg:w-1/4">
                                                <label className="text-base mx-1">Category:<span className="text-red-600 font-bold">*</span></label>

                                                <select
                                                    className="input-style w-full p-1 rounded-lg"
                                                    value={allDetails.category}
                                                    name="category"
                                                    onChange={handleInputChange}
                                                >
                                                    <option value="">-- Select Product Type ---</option>
                                                    {pdata.map((cat) => (
                                                        cat._id === catTypesForSelectedPolicy &&
                                                        cat.category.map((product, idx) => (
                                                            <option key={idx} value={product}>{product}</option>
                                                        ))))
                                                    }
                                                </select>
                                            </div>
                                            {/* FIELD - 4 */}
                                            <div className="flex flex-col  p-2 text-start w-full lg:w-1/4">
                                                <label className="text-base mx-1">Policy Type:<span className="text-red-600 font-bold">*</span></label>
                                                <select
                                                    className="input-style p-1 rounded-lg"
                                                    value={allDetails.policyType}
                                                    onChange={handleInputChange}
                                                    name="policyType">

                                                    <option value="">--- Select Policy Type ---</option>
                                                    {data.map(category => (
                                                        <option key={category._id} value={category.p_type}>{category.p_type}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            {/* FIELD - 1 */}
                                            <div className="flex flex-col p-2  text-start w-full lg:w-1/4">
                                                <label className="text-base mx-1">Policy No:<span className="text-red-600 font-bold">*</span></label>
                                                <input
                                                    className="input-style rounded-lg"
                                                    type="text"
                                                    value={allDetails.policyNo}
                                                    onChange={handleInputChange}
                                                    name="policyNo"
                                                    placeholder="Enter Policy No"
                                                />
                                            </div>
                                            <div className="flex flex-col p-1 text-start w-full lg:w-1/4">
                                                <label className="text-base mx-1">Vehicle Reg No:</label>
                                                <input
                                                    className="input-style rounded-lg"
                                                    type="text"
                                                    value={allDetails.vehRegNo}
                                                    onChange={handleInputChange}
                                                    name="vehRegNo"
                                                    placeholder="Enter Vehicle Reg No"
                                                />
                                            </div>
                                            <div className="flex flex-col p-1 text-start w-full lg:w-1/4">
                                                <label className="text-base mx-1">Fuel:</label>
                                                <select
                                                    className="input-style p-1 rounded-lg"
                                                    value={allDetails.fuel}
                                                    onChange={handleInputChange} name="fuel">
                                                    <option className="w-1" value="" >--- Select Fuel Type ---</option>
                                                    {
                                                        fuelData.map((data) => (
                                                            <option key={data._id} className="w-1" value={data.fuels} >{data.fuels}</option>
                                                        ))
                                                    }

                                                </select>
                                            </div>
                                            {/* FIELD - 2 */}
                                            <div className="flex flex-col p-2 text-start w-full lg:w-1/4">
                                                <label className="text-base mx-1">Engine No:<span className="text-red-600 font-bold">*</span></label>
                                                <input
                                                    className="input-style rounded-lg"
                                                    type="text"
                                                    value={allDetails.engNo}
                                                    onChange={handleInputChange}
                                                    name="engNo"
                                                    placeholder="Enter Engine No" />
                                                {/* {!isValidEngineChassis(allDetails.engNo) && <span className="text-red-500 text-sm">must be 6 alphanumeric characters</span>} */}
                                            </div>
                                            {/* FIELD - 3 */}
                                            <div className="flex flex-col p-2 text-start w-full lg:w-1/4 ">
                                                <label className="text-base mx-1">Chassis No:<span className="text-red-600 font-bold">*</span></label>
                                                <input
                                                    className="input-style rounded-lg"
                                                    type="text"
                                                    value={allDetails.chsNo}
                                                    onChange={handleInputChange}
                                                    name="chsNo"
                                                    placeholder="Enter Chassis No"
                                                />
                                                {/* {!isValidEngineChassis(allDetails.chsNo) && <span className="text-red-500 text-sm">must be 6 alphanumeric characters</span>} */}
                                            </div>
                                            {/* FIELD - 5 */}
                                            {
                                                allDetails.policyType === "SATP" ? (<div className="flex flex-col p-2  text-start w-full lg:w-1/4">
                                                    <label className="text-base mx-1">OD Premium:<span className="text-red-600 font-bold">*</span></label>
                                                    <input
                                                        className="input-style rounded-lg"
                                                        type="number"
                                                        value={allDetails.odPremium}
                                                        onChange={handleInputChange}
                                                        placeholder="Disabled"
                                                        name="odPremium"
                                                        onBlur={updateNetPremium}
                                                        disabled
                                                    />
                                                </div>) : (<div className="flex flex-col p-2  text-start w-full lg:w-1/4">
                                                    <label className="text-base mx-1">OD Premium:<span className="text-red-600 font-bold">*</span></label>
                                                    <input
                                                        className="input-style rounded-lg"
                                                        type="number"
                                                        value={allDetails.odPremium}
                                                        onChange={handleInputChange}
                                                        name="odPremium"
                                                        placeholder="Enter OD Premium"
                                                        onBlur={updateNetPremium}
                                                    />
                                                </div>)}
                                            {/* FIELD - 6 */}
                                            {
                                                allDetails.policyType === "SAOD" ? (<div className="flex flex-col p-2  text-start w-full lg:w-1/4">
                                                    <label className="text-base mx-1">Liability Premium:<span className="text-red-600 font-bold">*</span></label>
                                                    <input
                                                        className="input-style rounded-lg"
                                                        type="number"
                                                        value={allDetails.liabilityPremium}
                                                        onChange={handleInputChange}
                                                        placeholder="Disabled"
                                                        onBlur={updateNetPremium}
                                                        name="liabilityPremium"

                                                        disabled
                                                    />
                                                </div>)
                                                    : (<div className="flex flex-col p-2 text-start  w-full lg:w-1/4">
                                                        <label className="text-base mx-1">Liability Premium:<span className="text-red-600 font-bold">*</span></label>
                                                        <input
                                                            className="input-style rounded-lg"
                                                            type="number"
                                                            value={allDetails.liabilityPremium}
                                                            onChange={handleInputChange}
                                                            onBlur={updateNetPremium}
                                                            name="liabilityPremium"
                                                            placeholder="Enter Liability Premium"
                                                        />
                                                    </div>)
                                            }
                                            {/* FIELD - 7 */}
                                            <div className="flex flex-col p-2 text-start  w-full lg:w-1/4">
                                                <label className="text-base mx-1">Net Premium:<span className="text-red-600 font-bold">*</span></label>
                                                <input
                                                    className="input-style rounded-lg"
                                                    type="number"
                                                    value={allDetails.netPremium}
                                                    onBlur={handleNetPremiumBlur}
                                                    name="netPremium"
                                                    placeholder="Net Premium"
                                                    readOnly />
                                                <span className="mx-1 text-xs text-green-600">(odPremium + liabilityPremium)</span>
                                            </div>
                                            {/* FIELD - 8 */}
                                            <div className="flex flex-col  p-2 text-start w-full lg:w-1/4">
                                                <label className="text-base mx-1">GST:<span className="text-red-600 font-bold">*</span></label>
                                                <input
                                                    className="input-style rounded-lg"
                                                    type="text"
                                                    value={allDetails.taxes}
                                                    onChange={handleInputChange}
                                                    onBlur={calculateFinalAmount}
                                                    name="taxes"
                                                    placeholder="GST"
                                                />
                                            </div>

                                            <div className="flex flex-col  p-2 text-start w-full lg:w-1/4">
                                                <label className="text-base mx-1">RSA:<span className="text-red-600 font-bold">*</span></label>
                                                <input
                                                    className="input-style rounded-lg"
                                                    type="text"
                                                    value={allDetails.rsa}
                                                    onChange={handleInputChange}
                                                    onBlur={calculateFinalAmount}
                                                    name="rsa"
                                                    placeholder="RSA"
                                                />
                                            </div>
                                            {/* FIELD - 9 */}
                                            <div className="flex flex-col p-2 text-start w-full lg:w-1/4">
                                                <label className="text-base mx-1">Final Amount:<span className="text-red-600 font-bold">*</span></label>
                                                <input
                                                    className="input-style rounded-lg"
                                                    type="text"
                                                    value={allDetails.finalEntryFields}
                                                    onChange={handleInputChange}
                                                    onBlur={calculateFinalAmount}
                                                    name="finalEntryFields"
                                                    placeholder=" Final Amount"
                                                    readOnly
                                                />
                                                <span className="mx-1 text-xs text-green-600">(netPremium + GST%)</span>
                                            </div>
                                            {/* FIELD - 10 */}
                                            <div className="flex flex-col  p-2 text-start w-full lg:w-1/4">
                                                <label className="text-base mx-1">OD Discount%:<span className="text-red-600 font-bold">*</span></label>
                                                <input
                                                    className="input-style rounded-lg"
                                                    type="text"
                                                    value={allDetails.odDiscount}
                                                    onChange={handleInputChange}
                                                    name="odDiscount"
                                                    placeholder="Enter OD Discount" />
                                            </div>
                                            {/* FIELD - 11 */}
                                            <div className="flex flex-col  p-2 text-start w-full lg:w-1/4">
                                                <label className="text-base mx-1">NCB%:<span className="text-red-600 font-bold">*</span></label>
                                                <input
                                                    className="input-style rounded-lg"
                                                    type="text"
                                                    value={allDetails.ncb}
                                                    onChange={handleInputChange}
                                                    name="ncb"
                                                    placeholder="Enter NCB"
                                                />
                                            </div>
                                            <div className="flex flex-col p-2 text-start w-full lg:w-1/4">
                                                <label className="text-base mx-1">Policy Payment Mode:<span className="text-red-600 font-bold">*</span></label>
                                                <select
                                                    id="policyPaymentMode"
                                                    className="input-style p-1 rounded-lg"
                                                    value={allDetails.policyPaymentMode}
                                                    name="policyPaymentMode"
                                                    onChange={handleInputChange}
                                                >
                                                    <option className="w-1" value="" >--- Select Policy Payment Mode ---</option>
                                                    <option className="w-1" value="insta payment" >Insta Payment</option>
                                                    <option className="w-1" value="customer link" >Customer Link</option>
                                                    <option className="w-1" value="customer cheque" >Customer Cheque</option>
                                                    <option className="w-1" value="eleedom single cheque" >Eleedom Single Cheque</option>
                                                </select>
                                            </div>
                                            <div className="flex flex-col p-2 text-start w-full lg:w-1/4">
                                                <label className="text-base mx-1">Advisor Name:</label>
                                                <input
                                                    className="input-style rounded-lg"
                                                    type="text"
                                                    value={allDetails.advisorName}
                                                    onChange={handleInputChange}
                                                    name="advisorName"
                                                    placeholder="Enter Advisor Name"
                                                />
                                            </div>
                                            <div className="flex flex-col p-2 text-start w-full lg:w-1/4"></div>
                                            <div className="flex flex-col p-2 text-start w-full lg:w-1/4"></div>
                                        </div>
                                        {/* button */}
                                        <div className="col-span-2 p-2 mt-10 flex justify-center">
                                            <button
                                                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                                                onClick={updateInsuranceAPI} type="button" > {loading ? "Submitting..." : "Submit"} </button>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
export default AddPolicyDetail;