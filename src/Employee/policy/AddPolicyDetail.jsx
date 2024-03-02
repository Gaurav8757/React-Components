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
    const [allDetails, setAllDetails] = useState({
        policyNo: '',
        engNo: '',
        chsNo: '',
        policyType: '',
        odPremium: '',
        company: "",
        liabilityPremium: '',
        netPremium: '',
        taxes: '',
        finalEntryFields: '',
        odDiscount: '',
        ncb: '',
        policyMadeBy: '',
        policyPaymentMode: ""

    });

   
    // OPEN MODAL
    const openModal = () => {
        setIsModalOpen(true);
    };

    // CLOSE MODAL
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const isValidEngineChassis = (value) => {
        return /^[A-Za-z0-9]{6}$/.test(value);
    };

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
    
     
    
      // // VEHICLE AGE CALCULATED
      
    
      
    
      // // Calculate taxes with netPremium
      const calculateFinalAmount = () => {
        const netPremiumValue = parseFloat(allDetails.netPremium) || 0;
        const taxesValue = parseFloat(allDetails.taxes) || 0;
        const finalAmountValue = netPremiumValue +  taxesValue;
    
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
            <button onClick={openModal} type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2 ">
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
                        <div className="flex flex-col p-2 text-start w-full lg:w-1/4">
                            <label className="text-base mx-1">Company Name<span className="text-red-600 font-bold">*</span></label>
                            <select
                                id="company" name="company"
                                className="input-style p-1 rounded-lg"
                                value={allDetails.company}
                                onChange={() => {
                                    handleInputChange;
                                    // const selectedCatId = e.target.selectedOptions[0].getAttribute("data-id");
                                    // setCatTypesForSelectedPolicy(selectedCatId);
                                  }}
                            >
                                <option className="" value="" >--- Select Company ---</option>
                                            {pdata.map((comp) => (
                            <option key={comp._id} value={comp.c_type} data-id={comp._id}>
                                {comp.c_type}
                            </option>
                            ))}
                            </select>
                            {/* {errors.company && <span className="text-red-600 text-sm">{errors.company}</span>} */}
                        </div>

                          {/* FIELD - 4 */}
                          <div className="flex flex-col  p-2 text-start w-full lg:w-1/4">
                                                <label className="text-base mx-1">Policy Type:</label>
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
                                                     {!isValidEngineChassis(allDetails.engNo) && <span className="text-red-500 text-sm">must be 6 alphanumeric characters</span>}
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
                                                 {!isValidEngineChassis(allDetails.chsNo) && <span className="text-red-500 text-sm">must be 6 alphanumeric characters</span>}
                                            </div>
                                          

                                            {/* FIELD - 5 */}
                                            {
                                                allDetails.policyType === "SATP" ? (<div className="flex flex-col p-2  text-start w-full lg:w-1/4">
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
                                                </div>) : (<div className="flex flex-col p-2  text-start w-full lg:w-1/4">
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
                                                allDetails.policyType === "SAOD" ? (<div className="flex flex-col p-2  text-start w-full lg:w-1/4">
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
                                                    : (<div className="flex flex-col p-2 text-start  w-full lg:w-1/4">
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
                                            <div className="flex flex-col p-2 text-start  w-full lg:w-1/4">
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
                                            <div className="flex flex-col  p-2 text-start w-full lg:w-1/4">
                                                <label className="text-base mx-1">GST:</label>
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
                                                    className="input-style p-1 rounded-lg"
                                                    value={allDetails.policyMadeBy}
                                                    onChange={handleInputChange}
                                                    name="policyMadeBy">
                                                    <option className="w-1" value="" >--- Policy Made By ---</option>
                                                    {
                                                        APIData.filter(emp => emp.staffType === "OPS Executive" | emp.staffType === "OPS EXECUTIVE")
                                                        .map((emp) => (
                                                            <option key={emp._id} value={emp.empname}>
                                                                {emp.empid} - {emp.empname}
                                                            </option>
                                                        ))
                                                    }
                                                   
                                                </select>
                                            </div>


                                            <div className="flex flex-col p-2 text-start w-full lg:w-1/4">
                <label className="text-base mx-1">Policy Payment Mode:</label>
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
                  {/* {
                    payMode.map((mode)=>(
                      <option key={mode._id}  value= {mode.paymentmode} >{mode.paymentmode}</option>
                    ))
                  } */}
                </select>
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