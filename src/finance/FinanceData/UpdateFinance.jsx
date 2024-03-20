/* eslint-disable react/prop-types */
import { CgCloseR } from "react-icons/cg";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

function UpdateFinance({ insurance, onUpdate }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [pdata, setPdata] = useState([]);
  // const [catTypesForSelectedPolicy, setCatTypesForSelectedPolicy] = useState([]);
  // const [payMode, setPayMode] = useState([]);
  // const [fuel, setFuel] = useState([]);
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

  useEffect(() => {
    const intervalId = setInterval(() => {
      setEmpTime(getFormattedTime());
    }, 1000); // Update every second
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const [allDetails, setAllDetails] = useState({
    entryDate: '',
    company: '',
    category: '',
    segment: '',
    sourcing: '',
    policyNo: '',
    insuredName: '',
    contactNo: '',
    vehRegNo: '',
    policyStartDate: '',
    policyEndDate: '',
    odExpiry: '',
    tpExpiry: '',
    idv: '',
    bodyType: '',
    makeModel: '',
    mfgYear: '',
    registrationDate: '',
    vehicleAge: '',
    fuel: '',
    gvw: '',
    rsa: '',
    cc: '',
    engNo: '',
    chsNo: '',
    policyType: '',
    productCode: '',
    odPremium: '',
    liabilityPremium: '',
    netPremium: '',
    finalEntryFields: '',
    taxes: '',
    odDiscount: '',
    ncb: '',
    advisorName: '',
    subAdvisor: '',
    policyMadeBy: '',
    branch: '',
    payoutOn: '',
    calculationType: '',
    policyPaymentMode: '',
    paymentDoneBy: '',
    chqNoRefNo: '',
    bankName: '',
    chqPaymentDate: '',
    chqStatus: '',
    advisorPayableAmount: '',
    branchPayout: '',
    branchPayableAmount: '',
    companyPayout: '',
    profitLoss: '',
    empTime: ''
  })

  // OPEN MODAL
  const openModal = () => {
    setIsModalOpen(true);
  };

  // CLOSE MODAL
  const closeModal = () => {
    setIsModalOpen(false);
  };

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

  // useEffect(() => {
  //   const token = sessionStorage.getItem("token");
  //   if (!token) {
  //     toast.error("Not Authorized yet.. Try again! ");
  //   } else {
  //     // The user is authenticated, so you can make your API request here.
  //     axios
  //       .get(`https://eleedomimf.onrender.com/view/payment/mode`, {
  //         headers: {
  //           Authorization: `${token}`, // Send the token in the Authorization header
  //         },
  //       })
  //       .then((response) => {
  //         setPayMode(response.data);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   }
  // }, []);

  // Function to update netPremium when odPremium or liabilityPremium changes
  // const updateNetPremium = () => {
  //   const odPremiumValue = parseFloat(allDetails.odPremium) || 0;
  //   const liabilityPremiumValue = parseFloat(allDetails.liabilityPremium) || 0;
  //   // Calculate netPremium by adding odPremium and liabilityPremium
  //   const newNetPremium = odPremiumValue + liabilityPremiumValue;
  //   // Set the updated netPremium value directly
  //   setAllDetails(prevDetails => ({
  //     ...prevDetails,
  //     netPremium: newNetPremium.toFixed(2)
  //   }));
  // };

  useEffect(() => {
    calculateAge();
  }, [allDetails.registrationDate]); // Add dependency

  const calculateAge = () => {
    const today = new Date();
    const birthdateDate = new Date(allDetails.registrationDate);

    if (isNaN(birthdateDate.getTime())) {
      console.error('Invalid date format for registrationDate');
      return;
    }

    let ageYears = today.getFullYear() - birthdateDate.getFullYear();
    let ageMonths = today.getMonth() - birthdateDate.getMonth();
    let ageDays = today.getDate() - birthdateDate.getDate();

    if (ageDays < 0) {
      const lastDayOfPreviousMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
      ageDays = lastDayOfPreviousMonth + ageDays;
      ageMonths--;
    }

    if (ageMonths < 0) {
      ageYears--;
      ageMonths = 12 + ageMonths;
    }

    setAllDetails(prevDetails => ({
      ...prevDetails,
      vehicleAge: `${ageYears} years ${ageMonths} months ${ageDays} days`
    }));
  };



  // // Calculate taxes with netPremium
  // const calculateFinalAmount = () => {
  //   const netPremiumValue = parseFloat(allDetails.netPremium) || 0;

  //   const taxesValue = parseFloat(allDetails.taxes) || 0;

  //   const rsaValue = parseFloat(allDetails.rsa) || 0;

  //   const finalAmountValue = netPremiumValue + taxesValue + rsaValue;

  //   setAllDetails(prevDetails => ({
  //     ...prevDetails,
  //     finalEntryFields: finalAmountValue.toFixed(2)
  //   }));
  // };

  // // Calculate branch payable amount
  // const calculateBranchPayableAmount = () => {
  //   const netPremiumValue = parseFloat(allDetails.netPremium) || 0;
  //   const branchPayoutValue = parseFloat(allDetails.branchPayout) || 0;
  //   const branchPayableAmountValue = netPremiumValue - branchPayoutValue;

  //   setAllDetails(prevDetails => ({
  //     ...prevDetails,
  //     branchPayableAmount: branchPayableAmountValue.toFixed(2)
  //   }));
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

  // useEffect(() => {
  //   const token = sessionStorage.getItem("token");
  //   if (!token) {
  //     toast.error("Not Authorized yet.. Try again! ");
  //   } else {
  //     // The user is authenticated, so you can make your API request here.
  //     axios
  //       .get(`https://eleedomimf.onrender.com/view/fuel`, {
  //         headers: {
  //           Authorization: `${token}`, // Send the token in the Authorization header
  //         },
  //       })
  //       .then((response) => {
  //         setFuel(response.data);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   }
  // }, [fuel]);

  // // Final amount set
  // const handleNetPremiumBlur = () => {
  //   if (allDetails.calculationType === 'finalAmount') {
  //     calculateFinalAmount();
  //   } else if (allDetails.calculationType === 'branchPayableAmount') {
  //     calculateBranchPayableAmount();
  //   }
  //   // Reset the calculation type after performing the calculation
  //   setAllDetails(prevDetails => ({
  //     ...prevDetails,
  //     calculationType: ''
  //   }));
  // };



  const handlePolicyStartDateChange = (e) => {
    const startDate = e.target.value;
    const policyStartDate = new Date(startDate);
    const policyEndDate = new Date(startDate);

    // Set OD Expiry to one day before the policy start date
    const odExpiryDate = new Date(policyStartDate);
    odExpiryDate.setMonth(odExpiryDate.getMonth() + 12);
    odExpiryDate.setDate(policyStartDate.getDate() - 1);
    const odExpiry = odExpiryDate.toISOString().split('T')[0];

    // Set TP Expiry to one day before the policy start date
    const tpExpiryDate = new Date(policyStartDate);
    tpExpiryDate.setMonth(tpExpiryDate.getMonth() + 36);
    tpExpiryDate.setDate(policyStartDate.getDate() - 1);
    const tpExpiry = tpExpiryDate.toISOString().split('T')[0];

    // Set Policy End Date to one day before the policy start date
    policyEndDate.setMonth(policyEndDate.getMonth() + 12);
    policyEndDate.setDate(policyStartDate.getDate() - 1);
    const policyEnd = policyEndDate.toISOString().split('T')[0];

    setAllDetails(prevDetails => ({
      ...prevDetails,
      odExpiry,
      tpExpiry,
      policyEndDate: policyEnd,
      policyStartDate: startDate,
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
      [name]: value.toUpperCase(),
      empTime: empTime,
    }));
  };





  const updateInsuranceAPI = async () => {
    try {
      setLoading(true);
      // Use the selected category ID in the patch method
      const resp = await axios.put(`https://eleedomimf.onrender.com/alldetails/updatedata/${insurance._id}`, allDetails);
      toast.success(`${resp.data.status}`);
      closeModal(); // Close the modal after successful submission
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
      <button onClick={openModal} type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2 text-center ">
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
            <div className="relative bg-gradient-to-r from-cyan-700 to-cyan-700 rounded-lg shadow dark:bg-slate-100">
              {/* <!-- Modal header --> */}
              <div className="flex items-center justify-between p-2 md:p-3 rounded-lg dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-100">
                  Update Policy Details
                </h3>
                <button
                  onClick={closeModal}
                  type="button"
                  className=" bg-transparent hover:text-red-500 text-slate-100  rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center  ">
                  <CgCloseR size={25} />
                </button>
              </div>



              {/* <!-- Modal body --> */}
              <section className="p-4 md:p-3  rounded-lg max-h-auto text-justify overflow-y-auto bg-gradient-to-r from-cyan-600 to-cyan-700">
                <div className="container-fluid flex justify-center p-1 border-gray-200 border-dashed rounded-lg dark:border-gray-700 bg-white">
                  <div className="relative w-full lg:w-full p-4 lg:p-1 rounded-xl shadow-xl text-2xl items-center bg-slate-200">
                    <div className="flex flex-wrap justify-between">

                      {/* FIELD - 1 */}
                      {/* <div className="flex flex-col p-1 text-start w-full lg:w-1/6 ">
                        <label className="text-base mx-1">Entry Date:</label>
                        <input
                          className="input-style rounded-lg"
                          type="date"
                          value={allDetails.entryDate}
                          onChange={handleInputChange}
                          name="entryDate"
                        />
                      </div> */}

                      {/* FIELD - 2 */}
                      {/* <div className="flex flex-col p-1 text-start w-full lg:w-1/6">
                        <label className="text-base mx-1">Branch:</label>
                        <select
                          id="branch"
                          className="input-style p-1 rounded-lg"
                          value={allDetails.branch}
                          onChange={handleInputChange}
                          name="branch"
                        >
                          <option className="w-1" value="">--- Select Branch ---</option>
                          <option value="PATNA">PATNA</option>
                          <option value="HAJIPUR">HAJIPUR</option>
                          <option value="SAMASTIPUR">SAMASTIPUR</option>
                        </select>
                      </div> */}

                      {/* FIELD - 3 */}
                      <div className="flex flex-col p-1 text-start w-full lg:w-1/5">
                        <label className="text-base mx-1">Insured Name:</label>
                        <input
                          className="input-style rounded-lg"
                          type="text"
                          value={allDetails.insuredName}
                          onChange={handleInputChange}
                          name="insuredName"
                        />
                      </div>

                      {/* FIELD - 4 */}
                      {/* <div className="flex flex-col p-1 text-start w-full lg:w-1/6">
                        <label className="text-base mx-1">Contact No:</label>
                        <input
                          className="input-style rounded-lg"
                          type="text"
                          value={allDetails.contactNo}
                          onChange={handleInputChange}
                          name="contactNo"
                          placeholder="Enter Contact No" />
                      </div> */}


                      {/* FIELD - 5 */}
                      <div className="flex flex-col p-1 text-start w-full lg:w-1/5">
                        <label className="text-base mx-1">Company Name:</label>
                        <select
                          id="company" name="company"
                          className="input-style p-1 rounded-lg"
                          value={allDetails.company}
                          onChange={(e) => {
                            handleInputChange(e);
                            // const selectedCatId = e.target.selectedOptions[0].getAttribute("data-id");
                            // setCatTypesForSelectedPolicy(selectedCatId);
                          }}>
                          <option className="" value="" >--- Select Company ---</option>
                          {pdata.map((comp) => (
                            <option key={comp._id} value={comp.c_type} data-id={comp._id}>
                              {comp.c_type}
                            </option>
                          ))}
                        </select>
                      </div>


                      {/* FIELD - 6 */}
                      {/* <div className="flex flex-col p-1 text-start w-full lg:w-1/6">
                        <label className="text-base mx-1">Category:</label>
                        <select
                          className="input-style p-1 rounded-lg"
                          value={allDetails.category}
                          onChange={handleInputChange}
                          name="category"
                        >
                          <option className="w-1" value=""  >--- Select Category ---</option>
                          {pdata.map((cat) => (
                            cat._id === catTypesForSelectedPolicy &&
                            cat.category.map((product, idx) => (
                              <option key={idx} value={product} >{product}</option>
                            ))))
                          }
                        </select>
                      </div> */}

                      {/* FIELD - 7 */}
                      {/* <div className="flex flex-col p-1 text-start w-full lg:w-1/6">
                        <label className="text-base mx-1">Policy Type:</label>
                        <select
                          className="input-style p-1 rounded-lg"
                          value={allDetails.policyType}
                          name="policyType"
                          // onChange={(e) => setPolicyType(e.target.value)}
                          onChange={handleInputChange}
                        > <option value="">--- Select Policy Type ---</option>
                          {data.map(prod => (
                            <option key={prod._id} value={prod.p_type}>{prod.p_type}</option>
                          ))}
                        </select>
                      </div> */}

                      {/* FIELD - 26 */}
                      <div className="flex flex-col p-1 text-start w-full lg:w-1/6">
                        <label className="text-base mx-1">Product Code:</label>
                        <select
                          id="productCode"
                          className="input-style p-1 rounded-lg"
                          value={allDetails.productCode}
                          onChange={handleInputChange}
                          name="productCode"
                        >
                          <option value="">--- Select Product Code ---</option>
                          {allDetails.policyType && data
                            .filter(policy => policy.p_type === allDetails.policyType)
                            .map(policy => policy.products.map((product, idx) => (
                              <option key={idx} value={product}>{product}</option>
                            )))}
                        </select>
                      </div>

                      {/* FIELD - 8 */}
                      <div className="flex flex-col p-1 text-start w-full lg:w-1/5">
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

                      {/* FIELD - 9 */}
                      {/* <div className="flex flex-col p-1 text-start w-full lg:w-1/6">
                        <label className="text-base mx-1">Engine No:</label>
                        <input
                          className="input-style rounded-lg"
                          type="text"
                          value={allDetails.engNo}
                          onChange={handleInputChange}
                          name="engNo"
                          placeholder="Enter Engine No" />
                      </div> */}

                      {/* FIELD - 10 */}
                      {/* <div className="flex flex-col p-1 text-start w-full lg:w-1/6">
                        <label className="text-base mx-1">Chassis No:</label>
                        <input
                          className="input-style rounded-lg"
                          type="text"
                          value={allDetails.chsNo}
                          onChange={handleInputChange}
                          name="chsNo"
                          placeholder="Enter Chassis No"
                        />
                      </div> */}

                      {/* FIELD - 11 */}
                      {/* {
                        allDetails.policyType === "SATP" ? (<div className="flex flex-col p-1 text-start w-full lg:w-1/6">
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
                        </div>) : (<div className="flex flex-col p-1 text-start w-full lg:w-1/6">
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
                        </div>)} */}

                      {/* FIELD - 12 */}
                      {/* {
                        allDetails.policyType === "SAOD" ? (<div className="flex flex-col p-1 text-start w-full lg:w-1/6">
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
                          : (<div className="flex flex-col p-1 text-start w-full lg:w-1/6">
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
                      } */}

                      {/* FIELD - 13 */}
                      {/* <div className="flex flex-col p-1 text-start w-full lg:w-1/6">
                        <label className="text-base mx-1">Net Premium:</label>
                        <input
                          className="input-style rounded-lg"
                          type="number"
                          value={allDetails.netPremium}
                          onBlur={handleNetPremiumBlur}
                          name="netPremium"
                          placeholder="Net Premium"
                          disabled />
                        <span className="mx-1 text-xs text-green-600">(odPremium + liabilityPremium)</span>
                      </div> */}
                      {/* FIELD - 14 */}
                      {/* <div className="flex flex-col p-1 text-start w-full lg:w-1/6">
                        <label className="text-base mx-1">RSA:</label>
                        <input
                          className="input-style rounded-lg"
                          type="text"
                          value={allDetails.rsa}
                          onChange={handleInputChange}
                          onBlur={calculateFinalAmount}
                          name="rsa"
                        />
                      </div> */}


                      {/* FIELD - 15 */}
                      {/* <div className="flex flex-col p-1 text-start w-full lg:w-1/6">
                        <label className="text-base mx-1">GST(Amount):</label>
                        <input
                          className="input-style rounded-lg"
                          type="text"
                          value={allDetails.taxes}
                          onChange={handleInputChange}
                          onBlur={calculateFinalAmount}
                          name="taxes"
                          placeholder="GST"
                        />
                      </div> */}

                      {/* FIELD - 16 */}
                      {/* <div className="flex flex-col p-1 text-start w-full lg:w-1/6">
                        <label className="text-base mx-1">Final Amount:</label>
                        <input
                          className="input-style rounded-lg"
                          type="text"
                          value={allDetails.finalEntryFields}
                          onChange={handleInputChange}
                          name="finalEntryFields"
                          placeholder=" Final Amount"
                          readOnly
                        />
                      </div> */}
                      {/* FIELD - 17 */}
                      {/* <div className="flex flex-col p-1 text-start w-full lg:w-1/6">
                        <label className="text-base mx-1">OD Discount% :</label>
                        <input
                          className="input-style rounded-lg"
                          type="text"
                          value={allDetails.odDiscount}
                          onChange={handleInputChange}
                          name="odDiscount"
                          placeholder="Enter OD Discount" />
                      </div> */}
                      {/* FIELD - 33 */}
                      {/* <div className="flex flex-col p-1 text-start w-full lg:w-1/6">
                        <label className="text-base mx-1">NCB% :</label>
                        <input
                          className="input-style rounded-lg"
                          type="text"
                          value={allDetails.ncb}
                          onChange={handleInputChange}
                          name="ncb"
                          placeholder="Enter NCB"
                        />
                      </div> */}


                      {/* FIELD - 39 */}
                      {/* <div className="flex flex-col p-1 text-start w-full lg:w-1/6">
                        <label className="text-base mx-1">Policy Payment Mode:</label>
                        <select
                          id="policyPaymentMode"
                          className="input-style p-1 rounded-lg"
                          value={allDetails.policyPaymentMode}
                          onChange={handleInputChange} name="policyPaymentMode">

                          <option className="w-1" value="" >Select Policy Payment Mode</option>
                          {payMode.map((data) => (
                            <option key={data._id} className="w-1" value={data.paymentmode} >{data.paymentmode}</option>
                          ))}
                        </select>
                      </div> */}

                      {/* FIELD - 9 */}
                      <div className="flex flex-col p-1 text-start w-full lg:w-1/5">
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

                      {/* FIELD - 8 */}
                      <div className="flex flex-col p-1 text-start w-full lg:w-1/5">
                        <label className="text-base mx-1">Segment:</label>
                        <select
                          className="input-style p-1 rounded-lg"
                          value={allDetails.segment}
                          onChange={handleInputChange}
                          name="segment"
                        >
                          <option className="w-1" value="">--- Select Segment ---</option>
                          <option value="C V">C V</option>
                          <option value="PVT-CAR">PVT-CAR</option>
                          <option value="TW">TW</option>
                          <option value="HEALTH">HEALTH</option>
                          <option value="NON-MOTOR">NON-MOTOR</option>
                          <option value="LIFE">LIFE</option>
                        </select>
                      </div>

                      {/* FIELD - 5 */}
                      <div className="flex flex-col p-1 text-start w-full lg:w-1/5">
                        <label className="text-base mx-1">Sourcing:</label>
                        <select
                          className="input-style p-1 rounded-lg"
                          value={allDetails.sourcing}
                          onChange={handleInputChange} name="sourcing">

                          <option className="w-1" value="">--- Select Sourcing Type ---</option>
                          <option value="NEW">NEW</option>
                          <option value="RENEWAL">RENEWAL</option>
                          <option value="ROLL OVER">ROLL OVER</option>
                        </select>
                      </div>



                      {/* FIELD - 10 */}
                      <div className="flex flex-col p-1 text-start w-full lg:w-1/5">
                        <label className="text-base mx-1">Policy Start Date:</label>
                        <input
                          className="input-style rounded-lg"
                          type="date"
                          name="policyStartDate"
                          value={allDetails.policyStartDate}
                          onChange={
                            handlePolicyStartDateChange
                          }
                        />
                      </div>

                      {/* FIELD - 11 */}
                      <div className="flex flex-col p-1 text-start w-full lg:w-1/5">
                        <label className="text-base mx-1">Policy End Date:</label>
                        <input
                          className="input-style rounded-lg"
                          type="date"
                          value={allDetails.policyEndDate}
                          onChange={handleInputChange}
                          name="policyEndDate"
                          placeholder="Select Policy End Date" />
                      </div>

                      {/* FIELD - 12 */}
                      <div className="flex flex-col p-1 text-start w-full lg:w-1/5">
                        <label className="text-base mx-1">OD Expiry:</label>
                        <input
                          className="input-style rounded-lg"
                          type="date"
                          value={allDetails.odExpiry}
                          onChange={handleInputChange}
                          name="odExpiry"
                          placeholder="Select OD Expiry"
                          min="2025-01-01"
                        />
                      </div>

                      {/* FIELD - 13 */}
                      <div className="flex flex-col p-1 text-start w-full lg:w-1/5">
                        <label className="text-base mx-1">TP Expiry:</label>
                        <input
                          className="input-style rounded-lg"
                          type="date"
                          value={allDetails.tpExpiry}
                          onChange={handleInputChange}
                          name="tpExpiry"
                          min="2025-01-01"
                        />
                      </div>
                      {/* FIELD - 14 */}
                      <div className="flex flex-col p-1 text-start w-full lg:w-1/5">
                        <label className="text-base mx-1">IDV:</label>
                        <input
                          className="input-style rounded-lg"
                          type="text"
                          value={allDetails.idv}
                          onChange={handleInputChange}
                          name="idv"
                          placeholder="Enter IDV" />
                      </div>

                      {/* FIELD - 15 */}
                      <div className="flex flex-col p-1 text-start w-full lg:w-1/5">
                        <label className="text-base mx-1">Body Type:</label>
                        <input
                          className="input-style rounded-lg"
                          type="text"
                          value={allDetails.bodyType}
                          onChange={handleInputChange}
                          name="bodyType"
                          placeholder="Enter Body Type"
                        />
                      </div>



                      {/* FIELD - 16 */}
                      <div className="flex flex-col p-1 text-start w-full lg:w-1/5">
                        <label className="text-base mx-1">Make & Model:</label>
                        <input
                          className="input-style rounded-lg"
                          type="text"
                          value={allDetails.makeModel}
                          onChange={handleInputChange}
                          name="makeModel"
                        />
                      </div>

                      {/* FIELD - 17 */}
                      <div className="flex flex-col p-1 text-start w-full lg:w-1/5">
                        <label className="text-base mx-1">Manufacturing Year:</label>
                        <input
                          className="input-style rounded-lg"
                          type="text"
                          value={allDetails.mfgYear}
                          onChange={handleInputChange}
                          name="mfgYear"
                          placeholder="Enter Manufacturing Year" />
                      </div>

                      {/* FIELD - 18 */}
                      <div className="flex flex-col p-1 text-start w-full lg:w-1/5">
                        <label className="text-base mx-1">Registration Date:</label>
                        <input
                          className="input-style rounded-lg"
                          type="date"
                          value={allDetails.registrationDate}
                          onChange={handleInputChange}
                          name="registrationDate"
                          placeholder="Select Registration Date"
                          min="1950-01-01"
                        // max={getLastDayOfPreviousMonth()}
                        />
                      </div>

                      {/* FIELD - 19 */}
                      <div className="flex flex-col p-1 text-start w-full lg:w-1/5">
                        <label className="text-base mx-1">Vehicle Age:</label>
                        <input
                          className="input-style rounded-lg"
                          type="text"
                          value={allDetails.vehicleAge}
                          name="vehicleAge"
                          readOnly
                        />
                      </div>
                      {/* FIELD - 20 */}
                      {/* <div className="flex flex-col p-1 text-start w-full lg:w-1/6">
                        <label className="text-base mx-1">Fuel:</label>
                        <select
                          className="input-style p-1 rounded-lg"
                          value={allDetails.fuel}
                          onChange={handleInputChange} name="fuel">
                          <option className="w-1" value="" >--- Select Fuel Type ---</option>
                          {
                            fuel.map((data) => (
                              <option className="w-1" key={data._id} value={data.fuels}>{data.fuels}</option>
                            ))
                          }
                        </select>
                      </div> */}
                      {/* FIELD - 21 */}
                      <div className="flex flex-col p-1 text-start w-full lg:w-1/5">
                        <label className="text-base mx-1">GVW (kg):</label>
                        <input
                          className="input-style rounded-lg"
                          type="text"
                          value={allDetails.gvw}
                          onChange={handleInputChange}
                          name="gvw"
                          placeholder="Enter GVW"
                        />
                      </div>


                      {/* FIELD - 22 */}
                      <div className="flex flex-col p-1 text-start w-full lg:w-1/5">
                        <label className="text-base mx-1">CC:</label>
                        <input
                          className="input-style rounded-lg"
                          type="text"
                          value={allDetails.cc}
                          onChange={handleInputChange}
                          name="cc"
                        />
                      </div>



                      {/* FIELD - 34*/}
                      {/* <div className="flex flex-col p-1 text-start w-full lg:w-1/6">
                        <label className="text-base mx-1">Advisor Name:</label>
                        <input
                          className="input-style rounded-lg"
                          type="text"
                          value={allDetails.advisorName}
                          onChange={handleInputChange}
                          name="advisorName"
                          placeholder="Enter Advisor Name"
                        />
                      </div> */}

                      {/* FIELD - 35 */}
                      <div className="flex flex-col p-1 text-start w-full lg:w-1/5">
                        <label className="text-base mx-1">Sub Advisor:</label>
                        <input
                          className="input-style rounded-lg"
                          type="text"
                          value={allDetails.subAdvisor}
                          onChange={handleInputChange}
                          name="subAdvisor"
                          placeholder="Enter Sub Advisor"
                        />
                      </div>



                      <div className="flex flex-col p-1 text-start w-full lg:w-1/5"></div>
                      <div className="flex flex-col p-1 text-start w-full lg:w-1/5"></div>
                      <div className="flex flex-col p-1 text-start w-full lg:w-1/5"></div>
                      <div className="flex flex-col p-1 text-start w-full lg:w-1/5"></div>
                    </div>
                    {/* button */}
                    <div className="col-span-4 p-2 flex justify-center">
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


export default UpdateFinance;