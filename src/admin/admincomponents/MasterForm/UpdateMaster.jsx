/* eslint-disable react/prop-types */
import { CgCloseR } from "react-icons/cg";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

function UpdateMaster({ insurance, onUpdate }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [fuelType, setFuelType] = useState([]);
  const [pmade, setPmade] = useState([]);
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
    profitLoss: ''
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
          setFuelType(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [fuelType]);

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

          setPmade(response.data);

        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [pmade]);

  // Function to update netPremium when odPremium or liabilityPremium changes
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
  // const calculateAge = () => {
  //   const today = new Date();
  //   const birthdateDate = new Date(allDetails.registrationDate);

    

  //   let ageYears = today.getFullYear() - birthdateDate.getFullYear();
  //   let ageMonths = today.getMonth() - birthdateDate.getMonth();
  //   let ageDays = today.getDate() - birthdateDate.getDate();

  //   if (ageDays < 0) {
  //     const lastDayOfPreviousMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  //     ageDays = lastDayOfPreviousMonth + ageDays;
  //     ageMonths--;
  //   }

  //   if (ageMonths < 0) {
  //     ageYears--;
  //     ageMonths = 12 + ageMonths;
  //   }

  //   setAllDetails(prevDetails => ({
  //     ...prevDetails,
  //     vehicleAge: `${ageYears} years ${ageMonths} months ${ageDays} days`
  //   }));
  // };

  // useEffect(() => {
  //   calculateAge();
  // },);

  const calculateAge = () => {
    if (!allDetails.registrationDate) {
        setAllDetails(prevDetails => ({
            ...prevDetails,
            vehicleAge: "0 years"
        }));
        return;
    }
    
    const today = new Date();
    const birthdateDate = new Date(allDetails.registrationDate);
    const ageYears = today.getFullYear() - birthdateDate.getFullYear();

    setAllDetails(prevDetails => ({
        ...prevDetails,
        vehicleAge: `${ageYears} years`
    }));
};

useEffect(() => {
    calculateAge();
}, [allDetails.registrationDate]); // Add appropriate dependency here

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

  // // Calculation of profit/loss
  const calculateProfitLoss = () => {
    const companyPayoutValue = parseFloat(allDetails.companyPayout) || 0;
    const branchPayoutValue = parseFloat(allDetails.branchPayout) || 0;
    const profitLossValue = companyPayoutValue - branchPayoutValue;

    setAllDetails(prevDetails => ({
      ...prevDetails,
      profitLoss: profitLossValue.toFixed(2)
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

  const handlePolicyStartDateChange = (e) => {
    const startDate = e.target.value;
    const odExpiryDate = new Date(startDate);
    odExpiryDate.setFullYear(odExpiryDate.getFullYear() + 1);
    setAllDetails(prevDetails => ({
      ...prevDetails,
      odExpiry: odExpiryDate.toISOString().split('T')[0]
    }));

    const policyEndDateValue = new Date(startDate);
    policyEndDateValue.setFullYear(policyEndDateValue.getFullYear() + 1);
    setAllDetails(prevDetails => ({
      ...prevDetails,
      policyEndDate: policyEndDateValue.toISOString().split('T')[0]
    }));

    const tpExpiryDate = new Date(startDate);
    tpExpiryDate.setFullYear(tpExpiryDate.getFullYear() + 3);
    setAllDetails(prevDetails => ({
      ...prevDetails,
      tpExpiry: tpExpiryDate.toISOString().split('T')[0]
    }));

    setAllDetails(prevDetails => ({
      ...prevDetails,
      policyStartDate: startDate
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
      <button onClick={openModal} type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2 text-center">
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

          <div className="relative p-1 w-full max-w-9xl max-h-7xl mx-auto my-20">
            {/* <!-- Modal content --> */}
            <div className="relative bg-gradient-to-r from-cyan-600 to-cyan-600 rounded-lg shadow dark:bg-slate-100">
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
              <section className="p-4 md:p-3  rounded-lg max-h-auto text-justify overflow-y-auto bg-gradient-to-r from-slate-100 to-white">
                <div className="container-fluid flex justify-center p-1 border-gray-200 border-dashed rounded-lg dark:border-gray-700 bg-white">
                  <div className="relative w-full lg:w-full p-4 lg:p-1 rounded-xl shadow-xl text-2xl items-center bg-slate-400">
                    <div className="flex flex-wrap justify-between">



                      {/* <form className=""> */}
                      {/* PART-1 */}

                      {/* FIELD - 1 */}
                      <div className="flex flex-col p-1 text-start w-full lg:w-1/4 ">
                        <label className="text-base mx-1">Entry Date:</label>
                        <input
                          className="input-style rounded-lg"
                          type="date"
                          value={allDetails.entryDate}
                          onChange={handleInputChange}
                          name="entryDate"
                        />
                      </div>
                      {/* FIELD - 4 */}
                      <div className="flex flex-col p-1 text-start w-full lg:w-1/4">
                        <label className="text-base mx-1">Segment:</label>
                        <select
                          className="input-style p-1 rounded-lg"
                          value={allDetails.segment}
                          onChange={handleInputChange}
                          name="segment"
                        >
                          <option className="w-1" value="" >--- Select Segment ---</option>
                          <option value="C V">C V</option>
                          <option value="PVT-CAR">PVT-CAR</option>
                          <option value="TW">TW</option>
                          <option value="HEALTH">HEALTH</option>
                          <option value="NON-MOTOR">NON-MOTOR</option>
                          <option value="LIFE">LIFE</option>
                        </select>
                      </div>
                      {/* FIELD - 7 */}
                      <div className="flex flex-col p-1 text-start w-full lg:w-1/4">
                        <label className="text-base mx-1">Insured Name:</label>
                        <input
                          className="input-style rounded-lg"
                          type="text"
                          value={allDetails.insuredName}
                          onChange={handleInputChange}
                          name="insuredName"
                        />
                      </div>
                      {/* FIELD - 10 */}
                      <div className="flex flex-col p-1 text-start w-full lg:w-1/4">
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
                      {/* FIELD - 13 */}
                      <div className="flex flex-col p-1 text-start w-full lg:w-1/4">
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
                      {/* FIELD - 16 */}
                      <div className="flex flex-col p-1 text-start w-full lg:w-1/4">
                        <label className="text-base mx-1">Make & Model:</label>
                        <input
                          className="input-style rounded-lg"
                          type="text"
                          value={allDetails.makeModel}
                          onChange={handleInputChange}
                          name="makeModel"
                        />
                      </div>
                      {/* FIELD - 19 */}
                      <div className="flex flex-col p-1 text-start w-full lg:w-1/4">
                        <label className="text-base mx-1">Vehicle Age:</label>
                        <input
                          className="input-style rounded-lg"
                          type="text"
                          value={allDetails.vehicleAge}
                          name="vehicleAge"
                          readOnly
                        />
                      </div>
                      {/* FIELD - 22 */}
                      <div className="flex flex-col p-1 text-start w-full lg:w-1/4">
                        <label className="text-base mx-1">CC:</label>
                        <input
                          className="input-style rounded-lg"
                          type="text"
                          value={allDetails.cc}
                          onChange={handleInputChange}
                          name="cc"
                        />
                      </div>
                      {/* FIELD - 25 */}
                      <div className="flex flex-col p-1 text-start w-full lg:w-1/4">
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
                      </div>


                      {/* FIELD - 28 */}
                      {
                        allDetails.policyType === "SAOD" ? (<div className="flex flex-col p-1 text-start w-full lg:w-1/4">
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
                          : (<div className="flex flex-col p-1 text-start w-full lg:w-1/4">
                            <label className="text-base mx-1">Liability Premium:</label>
                            <input
                              className="input-style rounded-lg"
                              type="number"
                              value={allDetails.liabilityPremium}
                              onChange={handleInputChange}
                              onBlur={updateNetPremium}
                              name="liabilityPremium"
                            />
                          </div>)
                      }


                      {/* FIELD - 31 */}
                      <div className="flex flex-col p-1 text-start w-full lg:w-1/4">
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
                      </div>


                      {/* FIELD - 34*/}
                      <div className="flex flex-col p-1 text-start w-full lg:w-1/4">
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


                      {/* FIELD - 37 */}
                      <div className="flex flex-col p-1 text-start w-full lg:w-1/4">
                        <label className="text-base mx-1">Policy Made By:</label>
                        <select
                          className="input-style p-1 rounded-lg"
                          value={allDetails.staffName}
                          onChange={handleInputChange}
                          name="staffName"
                        >
                          <option className="w-1" value="" >--- Policy Made By ---</option>
                          {
                    pmade.filter(emp => emp.staffType === "OPS Executive" | emp.staffType === "OPS EXECUTIVE")
                      .map((emp) => (
                        <option key={emp._id} value={emp.empname}>
                          {emp.empid} - {emp.empname}
                        </option>
                      ))
                  }
                        </select>
                      </div>

                      {/* FIELD - 40 */}
                      <div className="flex flex-col p-1 text-start w-full lg:w-1/4">
                        <label className="text-base  mx-1">Payment Done By:</label>
                        <select
                          className="input-style p-1 rounded-lg"
                          value={allDetails.paymentDoneBy}
                          onChange={handleInputChange}
                          name="paymentDoneBy"
                        >
                          <option className="w-1" value="" >--- Select Payment Done By ---</option>
                          <option value="ELEEDOM IMF PVT LTD">ELEEDOM IMF PVT LTD</option>
                          <option value="HAJIPUR BRANCH">HAJIPUR BRANCH</option>
                          <option value="SAMASTIPUR BRANCH">SAMASTIPUR BRANCH</option>
                          <option value="PATNA BRANCH">PATNA BRANCH</option>
                          <option value="CUSTOMER">CUSTOMER</option>
                        </select>
                      </div>
                      {/* FIELD - 43 */}
                      <div className="flex flex-col p-1 text-start w-full lg:w-1/4">
                        <label className="text-base mx-1">CHQ / Payment Date:</label>
                        <input
                          className="input-style rounded-lg"
                          type="date"
                          value={allDetails.chqPaymentDate}
                          onChange={handleInputChange}
                          name="chqPaymentDate"
                          placeholder="Select CHQ / Payment Date"
                        />
                      </div>

                      {/* FIELD - 46 */}
                      <div className="flex flex-col p-1 text-start w-full lg:w-1/4">
                        <label className="text-base mx-1">Branch Payout:</label>
                        <input
                          className="input-style rounded-lg"
                          type="number"
                          value={allDetails.branchPayout}
                          onChange={handleInputChange}
                          name="branchPayout"
                          onBlur={() => {

                            calculateBranchPayableAmount();
                            calculateProfitLoss();
                          }}
                          placeholder="Enter Branch Payout"
                        />
                      </div>
                      {/* FIELD - 49 */}
                      <div className="flex flex-col p-1 text-start w-full lg:w-1/4">
                        <label className="text-base mx-1">Profit/Loss Amount:</label>
                        <input
                          className="input-style rounded-lg"
                          type="text"
                          value={allDetails.profitLoss}
                          onChange={handleInputChange}
                          name="profitLoss"
                          placeholder="Profit/Loss Amount"
                          readOnly
                        />
                        <span className="text-xs mx-1 text-red-600">(companypayout - branchpayout)</span>
                      </div>



                      {/* FIELD - 2 */}
                      <div className="flex flex-col p-1 text-start w-full lg:w-1/4">
                        <label className="text-base mx-1">Company Name:</label>
                        <select
                          className="input-style p-1 rounded-lg"
                          value={allDetails.company}
                          onChange={handleInputChange}
                          name="company"
                        >
                          <option className="w-1" value="" >--- Select Company ---</option>
                          <option value="TATA AIG">TATA AIG</option>
                          <option value="MAGMA-HDI">MAGMA HDI</option>
                          <option value="BAJAJ ALLIANZ">BAJAJ ALLIANZ</option>
                          <option value="GO-DIGIT">GO-DIGIT</option>
                          <option value="HDFC ERGO">HDFC ERGO</option>
                          <option value="ICICI LOMBARD">ICICI LOMBARD</option>
                          <option value="FUTURE-GENERALI">FUTURE-GENERALI</option>
                          <option value="RELIANCE">RELIANCE</option>
                          <option value="IFFCO-TOKIO">IFFCO-TOKIO</option>
                          <option value="KOTAK-MAHINDRA">KOTAK-MAHINDRA</option>
                          <option value="PNB MET LIFE">PNB MET LIFE</option>
                          <option value="LIC">LIC</option>
                        </select>
                      </div>

                      {/* FIELD - 5 */}
                      <div className="flex flex-col p-1 text-start w-full lg:w-1/4">
                        <label className="text-base mx-1">Sourcing:</label>
                        <select
                          className="input-style p-1 rounded-lg"
                          value={allDetails.sourcing}
                          onChange={handleInputChange} name="sourcing">

                          <option className="w-1" value="" >--- Select Sourcing Type ---</option>
                          <option value="NEW">NEW</option>
                          <option value="RENEWAL">RENEWAL</option>
                          <option value="ROLL OVER">ROLL OVER</option>
                        </select>
                      </div>
                      {/* FIELD - 8 */}
                      <div className="flex flex-col p-1 text-start w-full lg:w-1/4">
                        <label className="text-base mx-1">Contact No:</label>
                        <input
                          className="input-style rounded-lg"
                          type="text"
                          value={allDetails.contactNo}
                          onChange={handleInputChange}
                          name="contactNo"
                          placeholder="Enter Contact No" />
                      </div>
                      {/* FIELD - 11 */}
                      <div className="flex flex-col p-1 text-start w-full lg:w-1/4">
                        <label className="text-base mx-1">Policy End Date:</label>
                        <input
                          className="input-style rounded-lg"
                          type="date"
                          value={allDetails.policyEndDate}
                          onChange={handleInputChange}
                          name="policyEndDate"
                          placeholder="Select Policy End Date" />
                      </div>
                      {/* FIELD - 14 */}
                      <div className="flex flex-col p-1 text-start w-full lg:w-1/4">
                        <label className="text-base mx-1">IDV:</label>
                        <input
                          className="input-style rounded-lg"
                          type="text"
                          value={allDetails.idv}
                          onChange={handleInputChange}
                          name="idv"
                          placeholder="Enter IDV" />
                      </div>
                      {/* FIELD - 17 */}
                      <div className="flex flex-col p-1 text-start w-full lg:w-1/4">
                        <label className="text-base mx-1">Manufacturing Year:</label>
                        <input
                          className="input-style rounded-lg"
                          type="text"
                          value={allDetails.mfgYear}
                          onChange={handleInputChange}
                          name="mfgYear"
                          placeholder="Enter Manufacturing Year" />
                      </div>

                      {/* FIELD - 20 */}
                      <div className="flex flex-col p-1 text-start w-full lg:w-1/4">
                        <label className="text-base mx-1">Fuel:</label>
                        <select
                          className="input-style p-1 rounded-lg"
                          value={allDetails.fuel}
                          onChange={handleInputChange} name="fuel">
                          <option className="w-1" value="" >--- Select Fuel Type ---</option>
                          {
                    fuelType.map((fuel) => (
                      <option key={fuel._id} value={fuel.fuels} >{fuel.fuels}</option>
                    ))
                  }

                          {/* Add more fuel options */}
                        </select>
                      </div>
                      {/* FIELD - 23 */}
                      <div className="flex flex-col p-1 text-start w-full lg:w-1/4">
                        <label className="text-base mx-1">Engine No:</label>
                        <input
                          className="input-style rounded-lg"
                          type="text"
                          value={allDetails.engNo}
                          onChange={handleInputChange}
                          name="engNo"
                          placeholder="Enter Engine No" />
                      </div>
                      {/* FIELD - 26 */}
                      <div className="flex flex-col p-1 text-start w-full lg:w-1/4">
                        <label className="text-base mx-1">Product Code:</label>
                        <select
                          id="productCode"
                          className="input-style p-1 rounded-lg"
                          value={allDetails.productCode}
                          onChange={handleInputChange} name="productCode">

                          <option className="w-1" value="" >--- Select Product Code ---</option>
                         
                          {data.map((policy) => {
        if (policy.p_type === allDetails.policyType) {
            return policy.products.map((product, idx) => (
                <option key={idx} value={product}>{product}</option>
            ));
        }
        return null;
    })}
                        </select>
                      </div>
                      {/* FIELD - 29 */}
                      <div className="flex flex-col p-1 text-start w-full lg:w-1/4">
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
                      {/* FIELD - 32 */}
                      <div className="flex flex-col p-1 text-start w-full lg:w-1/4">
                        <label className="text-base mx-1">OD Discount% :</label>
                        <input
                          className="input-style rounded-lg"
                          type="text"
                          value={allDetails.odDiscount}
                          onChange={handleInputChange}
                          name="odDiscount"
                          placeholder="Enter OD Discount" />
                      </div>
                      {/* FIELD - 35 */}
                      <div className="flex flex-col p-1 text-start w-full lg:w-1/4">
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
                      {/* FIELD - 38 */}
                      <div className="flex flex-col p-1 text-start w-full lg:w-1/4">
                        <label className="text-base mx-1">Payout On:</label>
                        <select
                          id="payoutOn"
                          className="input-style p-1 rounded-lg"
                          value={allDetails.payoutOn}
                          onChange={handleInputChange} name="payoutOn">
                          <option className="w-1" value="" >--- Select Payout on ---</option>
                          <option value="NET">NET</option>
                          <option value="OD">OD</option>
                          <option value="LIABILITY">LIABILITY</option>
                        </select>
                      </div>
                      {/* FIELD - 41 */}
                      <div className="flex flex-col p-1 text-start w-full lg:w-1/4">
                        <label className="text-base mx-1">CHQ No / Ref No.:</label>
                        <input
                          className="input-style rounded-lg"
                          type="text"
                          value={allDetails.chqNoRefNo}
                          onChange={handleInputChange}
                          name="chqNoRefNo"
                          placeholder="Enter CHQ No / Ref No."
                        />
                      </div>
                      {/* FIELD - 44 */}
                      <div className="flex flex-col p-1 text-start w-full lg:w-1/4">
                        <label className="text-base mx-1">CHQ Status:</label>
                        <select
                          className="input-style p-1 rounded-lg"
                          value={allDetails.chqStatus}
                          onChange={handleInputChange}
                          name="chqStatus"
                        >
                          <option className="w-1" value="" disabled>--- Select CHQ Status ---</option>
                          <option value="PENDING">PENDING</option>
                          <option value="SUBMITTED TO BRANCH">SUBMITTED TO BRANCH</option>
                          <option value="CLEAR FROM BANK">CLEAR FROM BANK</option>
                          <option value="BCQ">BCQ</option>
                          <option value="SUBMITTED TO BANK">SUBMITTED TO BANK</option>
                        </select>
                      </div>
                      {/* FIELD - 47 */}
                      <div className="flex flex-col p-1 text-start w-full lg:w-1/4">
                        <label className="text-base mx-1">Branch Payable Amount: </label>

                        <input
                          className="input-style rounded-lg"
                          type="text"
                          value={allDetails.branchPayableAmount}
                          onChange={handleInputChange}
                          name="branchPayableAmount"
                          placeholder="Branch Payable Amount"
                          readOnly
                        />
                        <span className="text-xs mx-1 text-red-600" >(netpremium - branchpayout)</span>
                      </div>





                      {/* FIELD - 3 */}
                      <div className="flex flex-col p-1 text-start w-full lg:w-1/4">
                        <label className="text-base mx-1">Category:</label>
                        <select
                          className="input-style p-1 rounded-lg"
                          value={allDetails.category}
                          onChange={handleInputChange}
                          name="category"
                        > <option className="w-1" value="" disabled>--- Select Category ---</option>
                          <option value="GIC">GIC</option>
                          <option value="LIFE">LIFE</option>
                        </select>
                      </div>
                      {/* FIELD - 6 */}
                      <div className="flex flex-col p-1 text-start w-full lg:w-1/4">
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
                      {/* FIELD - 12 */}
                      <div className="flex flex-col p-1 text-start w-full lg:w-1/4">
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
                      {/* FIELD - 15 */}
                      <div className="flex flex-col p-1 text-start w-full lg:w-1/4">
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
                      {/* FIELD - 18 */}
                      <div className="flex flex-col p-1 text-start w-full lg:w-1/4">
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
                      {/* FIELD - 21 */}
                      <div className="flex flex-col p-1 text-start w-full lg:w-1/4">
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
                      {/* FIELD - 24 */}
                      <div className="flex flex-col p-1 text-start w-full lg:w-1/4">
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
                      {/* FIELD - 27 */}
                      {
                        insurance.policyType === "SATP" ? (<div className="flex flex-col p-1 text-start w-full lg:w-1/4">
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
                        </div>) : (<div className="flex flex-col p-1 text-start w-full lg:w-1/4">
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
                      {/* FIELD - 30 */}
                      <div className="flex flex-col p-1 text-start w-full lg:w-1/4">
                        <label className="text-base mx-1">GST% :</label>
                        <input
                          className="input-style rounded-lg"
                          type="text"
                          value={allDetails.taxes}
                          onChange={handleInputChange}
                          onBlur={calculateFinalAmount}
                          name="finalEntryFields"
                          placeholder="GST"
                        />
                      </div>
                      {/* FIELD - 33 */}
                      <div className="flex flex-col p-1 text-start w-full lg:w-1/4">
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
                      {/* FIELD - 36 */}
                      <div className="flex flex-col p-1 text-start w-full lg:w-1/4">
                        <label className="text-base mx-1">Branch:</label>
                        <select
                          id="branch"
                          className="input-style p-1 rounded-lg"
                          value={allDetails.branch}
                          onChange={handleInputChange}
                          name="branch"
                        >
                          <option className="w-1" value="" >--- Select Branch ---</option>
                          <option value="PATNA">PATNA</option>
                          <option value="HAJIPUR">HAJIPUR</option>
                          <option value="SAMASTIPUR">SAMASTIPUR</option>
                        </select>
                      </div>
                      {/* FIELD - 39 */}
                      <div className="flex flex-col p-1 text-start w-full lg:w-1/4">
                        <label className="text-base mx-1">Policy Payment Mode:</label>
                        <select
                          id="policyPaymentMode"
                          className="input-style p-1 rounded-lg"
                          value={allDetails.policyPaymentMode}
                          onChange={handleInputChange} name="policyPaymentMode">

                          <option className="w-1" value="" >--- Select Policy Payment Mode ---</option>
                          <option value="LINK">LINK</option>
                          <option value="ONLINE">ONLINE</option>
                          <option value="CREDIT CARD">CREDIT CARD</option>
                          <option value="NET BANKING">NET BANKING</option>
                          <option value="CHQ">CHQ</option>
                          <option value="CUSTOMER LINK">CUSTOMER LINK</option>
                          <option value="FLOAT PAYMENT">FLOAT PAYMENT</option>
                          <option value="UPI">UPI</option>
                          <option value="QR SCAN">QR SCAN</option>
                          <option value="DD">DD</option>
                          <option value="NEFT">NEFT</option>
                          <option value="RTGS">RTGS</option>
                        </select>
                      </div>
                      {/* FIELD - 42 */}
                      <div className="flex flex-col p-1 text-start w-full lg:w-1/4">
                        <label className="text-base mx-1">Bank Name:</label>
                        <select
                          id="bankName"
                          className="input-style p-1 rounded-lg"
                          value={allDetails.bankName}
                          onChange={handleInputChange} name="bankName">
                          <option className="w-1" value="" >--- Select Bank ---</option>
                          <option value="HDFC BANK">HDFC BANK</option>
                          <option value="ICICI BANK">ICICI BANK</option>
                          <option value="SBI">SBI</option>
                          <option value="PNB">PNB</option>
                          <option value="CANARA">CANARA</option>
                          <option value="AXIS BANK">AXIS BANK</option>
                          <option value="BOB">BOB</option>
                          <option value="BOI">BOI</option>
                          <option value="IDBI">IDBI</option>
                        </select>
                      </div>
                      {/* FIELD - 45 */}
                      <div className="flex flex-col p-1 text-start w-full lg:w-1/4">
                        <label className="text-base mx-1">Advisor Payable Amount:</label>
                        <input
                          className="input-style rounded-lg"
                          type="number"
                          value={allDetails.advisorPayableAmount}
                          onChange={handleInputChange}
                          name="advisorPayableAmount"
                          placeholder="Advisor Payable Amount" />
                      </div>
                      {/* FIELD - 48 */}
                      <div className="flex flex-col p-1 text-start w-full lg:w-1/4">
                        <label className="text-base mx-1">Company Payout:</label>
                        <input
                          className="input-style rounded-lg"
                          type="number"
                          value={allDetails.companyPayout}
                          onChange={handleInputChange}
                          name="companyPayout"
                          onBlur={calculateProfitLoss}
                          placeholder="Enter Company Payout" />
                      </div>
                      <div className="flex flex-col p-1 text-start w-full lg:w-1/4"></div>
                      <div className="flex flex-col p-1 text-start w-full lg:w-1/4"></div>
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
export default UpdateMaster;