/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { CgCloseR } from "react-icons/cg";
import { toast } from "react-toastify";
import axios from "axios";
import { POLICY_TYPES } from "../../admin/admincomponents/MasterForm/master.jsx";
function AddPolicyDetail({ insurance, onUpdate }) {
    const [loading, setLoading] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [allDetails, setAllDetails] = useState({
        policyNo: '',
        engNo: '',
        chsNo: '',
        policyType: '',
        odPremium: '',
        liabilityPremium: '',
        netPremium: '',
        taxes: '',
        finalEntryFields: '',
        odDiscount: '',
        ncb: '',
        policyMadeBy: '',
    });

    // OPEN MODAL
    const openModal = () => {
        setIsModalOpen(true);
    };

    // CLOSE MODAL
    const closeModal = () => {
        setIsModalOpen(false);
    };


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
    
     
    
      // // VEHICLE AGE CALCULATED
      
    
      
    
      // // Calculate taxes with netPremium
      const calculateFinalAmount = () => {
        const netPremiumValue = parseFloat(allDetails.netPremium) || 0;
        const taxesValue = parseFloat(allDetails.taxes) || 0;
        const finalAmountValue = netPremiumValue + (netPremiumValue * taxesValue) / 100;
    
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
            [name]: value,
        }));
    };

    const updateInsuranceAPI = async () => {
        try {
            setLoading(true);
            // Use the selected category ID in the patch method
            const resp = await axios.put(`https://eleedomimf.onrender.com/alldetails/updatedata/${insurance._id}`, allDetails);
            toast.success(`${resp.data.status}`);
            // Close the modal after successful submission
            closeModal();
            onUpdate()
        } catch (error) {
            console.error("Error updating insurance details:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* <!-- Modal toggle --> */}
            <button onClick={openModal} type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2 ">
                Edit
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
                        <div className="relative bg-gradient-to-r from-blue-200 to-cyan-200 rounded-lg shadow dark:bg-slate-100">
                            {/* <!-- Modal header --> */}
                            <div className="flex items-center justify-between p-2 md:p-3 rounded-lg dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-gray-800 ">
                                    Fill Policy Details
                                </h3>
                                <button
                                    onClick={closeModal}
                                    type="button"
                                    className=" bg-transparent hover:text-red-500 text-slate-500  rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center  ">
                                    <CgCloseR size={25} />
                                </button>
                            </div>

                            {/* <!-- Modal body --> */}
                            <section className="p-4 md:p-3 scroll-smooth hs-scroll-inside-viewport-modal rounded-lg max-h-auto text-justify overflow-y-auto bg-gradient-to-r from-slate-100 to-white">
                                <div className="container-fluid flex justify-center p-1 border-gray-200 border-dashed rounded-lg dark:border-gray-700 bg-white">
                                    <div className="relative w-full lg:w-full p-4 lg:p-1 rounded-xl shadow-xl text-2xl items-center bg-slate-400">
                                        <div className="flex flex-wrap justify-between">

                                            {/* FIELD - 1 */}
                                            <div className="flex flex-col p-2  text-start w-full lg:w-1/4">
                                                <label className="text-base mx-1">Policy No:</label>
                                                <input
                                                    className="input-style rounded-lg"
                                                    type="text"
                                                    value={allDetails.policyNo}
                                                    onChange={handleInputChange}
                                                    name="policyNo"
                                                    placeholder="Enter Policy No"
                                                />
                                            </div>
                                            {/* FIELD - 2 */}
                                            <div className="flex flex-col p-2 text-start w-full lg:w-1/4">
                                                <label className="text-base mx-1">Engine No:</label>
                                                <input
                                                    className="input-style rounded-lg"
                                                    type="text"
                                                    value={allDetails.engNo}
                                                    onChange={handleInputChange}
                                                    name="engNo"
                                                    placeholder="Enter Engine No" />
                                            </div>
                                            {/* FIELD - 3 */}
                                            <div className="flex flex-col p-2 text-start w-full lg:w-1/4 ">
                                                <label className="text-base mx-1">Chassis No:</label>
                                                <input
                                                    className="input-style rounded-lg"
                                                    type="text"
                                                    value={allDetails.chsNo}
                                                    onChange={handleInputChange}
                                                    name="chsNo"
                                                    placeholder="Enter Chassis No"
                                                />
                                            </div>
                                            {/* FIELD - 4 */}
                                            <div className="flex flex-col  p-2 text-start w-full lg:w-1/4">
                                                <label className="text-base mx-1">Policy Type:</label>
                                                <select
                                                    className="input-style rounded-lg"
                                                    value={allDetails.policyType}
                                                    onChange={handleInputChange}
                                                    name="policyType">
                                                    <option className="w-1" value="" disabled>--- Select Policy Type ---</option>
                                                    {/* here check */}
                                                    {Object.keys(POLICY_TYPES).map(category => (
                                                        <option key={category} value={category}>{category}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            {/* FIELD - 5 */}
                                            {
                                                allDetails.policyType === "SATP" ? (<div className="flex flex-col p-2 my-5 text-start w-full lg:w-1/4">
                                                    <label className="text-base mx-1">OD Premium:</label>
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
                                                </div>) : (<div className="flex flex-col p-2 my-5 text-start w-full lg:w-1/4">
                                                    <label className="text-base mx-1">OD Premium:</label>
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
                                                allDetails.policyType === "SAOD" ? (<div className="flex flex-col p-2 my-5 text-start w-full lg:w-1/4">
                                                    <label className="text-base mx-1">Liability Premium:</label>
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
                                                    : (<div className="flex flex-col p-2 text-start my-5 w-full lg:w-1/4">
                                                        <label className="text-base mx-1">Liability Premium:</label>
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
                                            <div className="flex flex-col p-2 text-start my-5 w-full lg:w-1/4">
                                                <label className="text-base mx-1">Net Premium:</label>
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
                                            <div className="flex flex-col my-5 p-2 text-start w-full lg:w-1/4">
                                                <label className="text-base mx-1">GST% :</label>
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

                                            {/* FIELD - 9 */}
                                            <div className="flex flex-col p-2 text-start w-full lg:w-1/4">
                                                <label className="text-base mx-1">Final Amount:</label>
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
                                                <label className="text-base mx-1">OD Discount% :</label>
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
                                                <label className="text-base mx-1">NCB% :</label>
                                                <input
                                                    className="input-style rounded-lg"
                                                    type="text"
                                                    value={allDetails.ncb}
                                                    onChange={handleInputChange}
                                                    name="ncb"
                                                    placeholder="Enter NCB"
                                                />
                                            </div>


                                            {/* FIELD - 12 */}
                                            <div className="flex flex-col  p-2 text-start w-full lg:w-1/4">
                                                <label className="text-base mx-1">Policy Made By:</label>
                                                <select
                                                    className="input-style rounded-lg"
                                                    value={allDetails.policyMadeBy}
                                                    onChange={handleInputChange}
                                                    name="policyMadeBy">
                                                    <option className="w-1" value="" >--- Policy Made By ---</option>
                                                    <option value="RAHUL KUMAR">RAHUL KUMAR</option>
                                                    <option value="CHOTU KUMAR">CHOTU KUMAR</option>
                                                    <option value="HARSH KUMAR">HARSH KUMAR</option>
                                                    <option value="ABHISHEK KUMAR">ABHISHEK KUMAR</option>
                                                    <option value="SAMRIN NAZ">SAMRIN NAZ</option>
                                                    <option value="AMIT KUMAR SINGH">AMIT KUMAR SINGH</option>
                                                </select>
                                            </div>
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