/* eslint-disable react/prop-types */
import { CgCloseR } from "react-icons/cg";
import { useState, useEffect } from "react";
import { POLICY_TYPES } from "./master.jsx";
import { toast } from "react-toastify";
import axios from "axios";



function UpdateMaster({ insurance, onUpdate }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
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

  // Calculate the last day of the previous month
  const getLastDayOfPreviousMonth = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // VEHICLE AGE CALCULATED
  const calculateAge = () => {
    const today = new Date();
    const birthdateDate = new Date(allDetails.registrationDate);

    if ((birthdateDate.getTime())) {
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

  useEffect(() => {
    calculateAge();
  },);

  // Calculate taxes with netPremium
  const calculateFinalAmount = () => {
    const netPremiumValue = parseFloat(allDetails.netPremium) || 0;
    const taxesValue = parseFloat(allDetails.taxes) || 0;
    const finalAmountValue = netPremiumValue + (netPremiumValue * taxesValue) / 100;

    setAllDetails(prevDetails => ({
      ...prevDetails,
      finalEntryFields: finalAmountValue.toFixed(2)
    }));
  };

  // Calculate branch payable amount
  const calculateBranchPayableAmount = () => {
    const netPremiumValue = parseFloat(allDetails.netPremium) || 0;
    const branchPayoutValue = parseFloat(allDetails.branchPayout) || 0;
    const branchPayableAmountValue = netPremiumValue - branchPayoutValue;

    setAllDetails(prevDetails => ({
      ...prevDetails,
      branchPayableAmount: branchPayableAmountValue.toFixed(2)
    }));
  };

  // Calculation of profit/loss
  const calculateProfitLoss = () => {
    const companyPayoutValue = parseFloat(allDetails.companyPayout) || 0;
    const branchPayoutValue = parseFloat(allDetails.branchPayout) || 0;
    const profitLossValue = companyPayoutValue - branchPayoutValue;

    setAllDetails(prevDetails => ({
      ...prevDetails,
      profitLoss: profitLossValue.toFixed(2)
    }));
  };


  // Final amount set
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
      await axios.patch(`https://eleedomimf.onrender.com/alldetails/updatedata/${insurance._id}`, allDetails, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then((resp) => {
        toast.success(`${resp.data.status}`);
        closeModal(); // Close the modal after successful submission
        onUpdate();
      }).catch((error) => {
        // toast.error(`${error.data.status}`);
        console.error(error);
      });
    } catch (error) {
      console.error("Error updating insurance details:", error);

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
          <div className="relative p-4 w-full max-w-6xl max-h-5xl mx-auto my-20">
            {/* <!-- Modal content --> */}
            <div className="relative bg-gradient-to-r from-blue-200 to-cyan-200 rounded-lg shadow dark:bg-slate-100">
              {/* <!-- Modal header --> */}
              <div className="flex items-center justify-between p-2 md:p-3 rounded-lg dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-black">
                  Update Details
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
                <form className="grid grid-cols-3 xs:grid-cols-3 sm:grid-cols-3  md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3  gap-3">
                  {/* PART-1 */}
                  <div className="p-2 text-start">
                    {/* FIELD - 1 */}
                    <div className="flex flex-col my-5">
                      <label className="text-base mx-1">Entry Date:</label>
                      <input
                        className="input-style rounded-lg"
                        type="date"
                        name="entryDate"
                        value={insurance.entryDate}
                        onChange={handleInputChange}
                        placeholder="Select Entry Date"
                      />
                    </div>
                    {/* FIELD - 4 */}
                    <div className="flex flex-col my-5">
                      <label className="text-base mx-1">Segment:</label>
                      <select
                        className="input-style rounded-lg"
                        name="segment"
                        value={insurance.segment}
                        onChange={handleInputChange}
                      >
                        <option className="w-1" value="" disabled>--- Select Segment ---</option>
                        <option value="C V">C V</option>
                        <option value="PVT-CAR">PVT-CAR</option>
                        <option value="TW">TW</option>
                        <option value="HEALTH">HEALTH</option>
                        <option value="NON-MOTOR">NON-MOTOR</option>
                        <option value="LIFE">LIFE</option>
                      </select>
                    </div>
                    {/* FIELD - 7 */}
                    <div className="flex flex-col my-5">
                      <label className="text-base mx-1">Insured Name:</label>
                      <input
                        className="input-style rounded-lg"
                        type="text"
                        name="insuredName"
                        value={insurance.insuredName}
                        onChange={handleInputChange}
                        placeholder="Enter Insured Name"
                      />
                    </div>
                    {/* FIELD - 10 */}
                    <div className="flex flex-col my-5">
                      <label className="text-base mx-1">Policy Start Date:</label>
                      <input
                        className="input-style rounded-lg"
                        type="date"
                        name="policyStartDate"
                        value={insurance.policyStartDate}
                        onChange={handlePolicyStartDateChange}
                        placeholder="Select Policy Start Date"
                      />
                    </div>
                    {/* FIELD - 13 */}
                    <div className="flex flex-col my-5">
                      <label className="text-base mx-1">TP Expiry:</label>
                      <input
                        className="input-style rounded-lg"
                        type="date"
                        name="tpExpiry"
                        value={insurance.tpExpiry}
                        onChange={handleInputChange}
                        placeholder="TP Expiry"
                        min="2025-01-01"
                      />
                    </div>
                    {/* FIELD - 16 */}
                    <div className="flex flex-col my-5">
                      <label className="text-base mx-1">Make & Model:</label>
                      <input
                        className="input-style rounded-lg"
                        type="text"
                        name="makeModel"
                        value={insurance.makeModel}
                        onChange={handleInputChange}
                        placeholder="Enter Make & Model"
                      />
                    </div>
                    {/* FIELD - 19 */}
                    <div className="flex flex-col my-5">
                      <label className="text-base mx-1">Vehicle Age:</label>
                      <input
                        className="input-style rounded-lg"
                        type="text"
                        name="vehicleAge"
                        value={insurance.vehicleAge}
                        placeholder="Vehicle Age "
                        readOnly
                      />
                    </div>
                    {/* FIELD - 22 */}
                    <div className="flex flex-col my-5">
                      <label className="text-base mx-1">CC:</label>
                      <input
                        className="input-style rounded-lg"
                        type="text"
                        name="cc"
                        value={insurance.cc}
                        onChange={handleInputChange}
                        placeholder="Enter CC"
                      />
                    </div>
                    {/* FIELD - 25 */}
                    <div className="flex flex-col my-5">
                      <label className="text-base mx-1">Policy Type:</label>
                      <select
                        className="input-style rounded-lg"
                        value={insurance.policyType}
                        name="policyType"
                        onChange={handleInputChange}
                      ><option className="w-1" value="" disabled>--- Select Policy Type ---</option>
                        {/* POLICY TYPES */}
                        {Object.keys(POLICY_TYPES).map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                    {/* FIELD - 28 */}
                    {
                      allDetails.policyType === "SAOD" ? (<div className="flex flex-col my-5">
                        <label className="text-base mx-1">Liability Premium:</label>
                        <input
                          className="input-style rounded-lg"
                          type="number"
                          name="liabilityPremium"
                          value={insurance.liabilityPremium}
                          onChange={handleInputChange}
                          placeholder="Disabled"
                          onBlur={updateNetPremium}
                          disabled
                        />
                      </div>)
                        : (<div className="flex flex-col my-5">
                          <label className="text-base mx-1">Liability Premium:</label>
                          <input
                            className="input-style rounded-lg"
                            type="number"
                            name="liabilityPremium"
                            value={insurance.liabilityPremium}
                            onChange={handleInputChange}
                            placeholder="Enter Liability Premium"
                            onBlur={updateNetPremium}
                          />
                        </div>)
                    }


                    {/* FIELD - 31 */}
                    <div className="flex flex-col my-5">
                      <label className="text-base mx-1">Final Amount:</label>
                      <input
                        className="input-style rounded-lg"
                        type="text"
                        value={insurance.finalEntryFields}
                        name="finalEntryFields"
                        onChange={handleInputChange}
                        placeholder=" Final Amount"
                        readOnly
                      />
                    </div>


                    {/* FIELD - 34*/}
                    <div className="flex flex-col my-5">
                      <label className="text-base mx-1">Advisor Name:</label>
                      <input
                        className="input-style rounded-lg"
                        type="text"
                        value={insurance.advisorName}
                        name="advisorName"
                        onChange={handleInputChange}
                        placeholder="Enter Advisor Name"
                      />
                    </div>


                    {/* FIELD - 37 */}
                    <div className="flex flex-col my-5">
                      <label className="text-base mx-1">Policy Made By:</label>
                      <select
                        id="policyMadeBy"
                        name="policyMadeBy"
                        className="input-style rounded-lg"
                        value={insurance.policyMadeBy}
                        onChange={handleInputChange}
                      >
                        <option className="w-1" value="" disabled>--- Policy Made By ---</option>
                        <option value="RAHUL KUMAR">RAHUL KUMAR</option>
                        <option value="CHOTU KUMAR">CHOTU KUMAR</option>
                        <option value="HARSH KUMAR">HARSH KUMAR</option>
                        <option value="ABHISHEK KUMAR">ABHISHEK KUMAR</option>
                        <option value="SAMRIN NAZ">SAMRIN NAZ</option>
                        <option value="AMIT KUMAR SINGH">AMIT KUMAR SINGH</option>
                      </select>
                    </div>

                    {/* FIELD - 40 */}
                    <div className="flex flex-col my-5">
                      <label className="text-base mx-1">Payment Done By:</label>
                      <select
                        className="input-style rounded-lg"

                        value={insurance.paymentDoneBy}
                        name="paymentDoneBy"
                        onChange={handleInputChange}
                      >
                        <option className="w-1" value="" disabled>--- Select Payment Done By ---</option>
                        <option value="ELEEDOM IMF PVT LTD">ELEEDOM IMF PVT LTD</option>
                        <option value="HAJIPUR BRANCH">HAJIPUR BRANCH</option>
                        <option value="SAMASTIPUR BRANCH">SAMASTIPUR BRANCH</option>
                        <option value="PATNA BRANCH">PATNA BRANCH</option>
                        <option value="CUSTOMER">CUSTOMER</option>
                      </select>
                    </div>
                    {/* FIELD - 43 */}
                    <div className="flex flex-col my-5">
                      <label className="text-base mx-1">CHQ / Payment Date:</label>
                      <input
                        className="input-style rounded-lg"
                        type="date"
                        name="chqPaymentDate"
                        value={insurance.chqPaymentDate}
                        onChange={handleInputChange}
                        placeholder="Select CHQ / Payment Date"
                      />
                    </div>
                    {/* FIELD - 46 */}
                    <div className="flex flex-col my-5">
                      <label className="text-base mx-1">Branch Payout:</label>
                      <input
                        className="input-style rounded-lg"
                        type="number"
                        name="branchPayout"
                        value={insurance.branchPayout}
                        onChange={handleInputChange}
                        onBlur={() => {

                          calculateBranchPayableAmount();
                          calculateProfitLoss();
                        }}
                        placeholder="Enter Branch Payout"
                      />
                    </div>
                    {/* FIELD - 49 */}
                    <div className="flex flex-col my-5">
                      <label className="text-base mx-1">Profit/Loss Amount:</label>
                      <input
                        className="input-style rounded-lg"
                        type="text"
                        name="profitLoss"
                        value={insurance.profitLoss}
                        onChange={handleInputChange}
                        placeholder="Profit/Loss Amount"
                        readOnly
                      />
                    </div>
                  </div>




                  {/* PART-2 */}
                  <div className="p-2 text-start">
                    {/* FIELD - 2 */}
                    <div className="flex flex-col my-5">
                      <label className="text-base mx-1">Company Name:</label>
                      <select
                        id="company" name="company"
                        className="input-style  rounded-lg"
                        value={insurance.company}

                        onChange={handleInputChange}
                      >
                        <option className="w-1" value="" disabled>--- Select Company ---</option>
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
                    <div className="flex flex-col my-5">
                      <label className="text-base mx-1">Sourcing:</label>
                      <select
                        className="input-style rounded-lg"
                        value={insurance.sourcing}
                        name="sourcing"
                        onChange={handleInputChange}>
                        <option className="w-1" value="" disabled>--- Select Sourcing Type ---</option>
                        <option value="NEW">NEW</option>
                        <option value="RENEWAL">RENEWAL</option>
                        <option value="ROLL OVER">ROLL OVER</option>
                      </select>
                    </div>
                    {/* FIELD - 8 */}
                    <div className="flex flex-col my-5">
                      <label className="text-base mx-1">Contact No:</label>
                      <input
                        className="input-style rounded-lg"
                        type="text"
                        value={insurance.contactNo}
                        name="contactNo"
                        onChange={handleInputChange}
                        placeholder="Enter Contact No" />
                    </div>
                    {/* FIELD - 11 */}
                    <div className="flex flex-col my-5">
                      <label className="text-base mx-1">Policy End Date:</label>
                      <input
                        className="input-style rounded-lg"
                        type="date"
                        name="policyEndDate"
                        value={insurance.policyEndDate}
                        onChange={handleInputChange}
                        placeholder="Select Policy End Date" />
                    </div>
                    {/* FIELD - 14 */}
                    <div className="flex flex-col my-5">
                      <label className="text-base mx-1">IDV:</label>
                      <input
                        className="input-style rounded-lg"
                        type="text"
                        name="idv"
                        value={insurance.idv}
                        onChange={handleInputChange}
                        placeholder="Enter IDV" />
                    </div>
                    {/* FIELD - 17 */}
                    <div className="flex flex-col my-5">
                      <label className="text-base mx-1">Manufacturing Year:</label>
                      <input
                        className="input-style rounded-lg"
                        type="text"
                        name="mfgYear"
                        value={insurance.mfgYear}
                        onChange={handleInputChange}
                        placeholder="Enter Manufacturing Year" />
                    </div>
                    {/* FIELD - 20 */}
                    <div className="flex flex-col my-5">
                      <label className="text-base mx-1">Fuel:</label>
                      <select
                        className="input-style rounded-lg"
                        value={insurance.fuel}
                        name="fuel"
                        onChange={handleInputChange}>
                        <option className="w-1" value="" disabled>--- Select Fuel Type ---</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Petrol">Petrol</option>
                        <option value="Electric">Electric</option>
                        {/* Add more fuel options */}
                      </select>
                    </div>
                    {/* FIELD - 23 */}
                    <div className="flex flex-col my-5">
                      <label className="text-base mx-1">Engine No:</label>
                      <input
                        className="input-style rounded-lg"
                        type="text"
                        name="engNo"
                        value={insurance.engNo}
                        onChange={handleInputChange}
                        placeholder="Enter Engine No" />
                    </div>
                    {/* FIELD - 26 */}
                    <div className="flex flex-col my-5">
                      <label className="text-base mx-1">Product Code:</label>
                      <select
                        id="productCode" name="productCode"
                        className="input-style rounded-lg"
                        value={insurance.productCode}
                        onChange={handleInputChange}>
                        <option className="w-1" value="" disabled>--- Select Product Code ---</option>
                        {/* {policyType &&
                    POLICY_TYPES[policyType].transactions.map((transaction) => (
                       console.log(policyType),
                      <option key={transaction} value={transaction}>
                        {transaction}

                      </option>
                     
                    ))} */}
                        {
                          console.log(POLICY_TYPES)
                        }

                      </select>
                    </div>
                    {/* FIELD - 29 */}
                    <div className="flex flex-col my-5">
                      <label className="text-base mx-1">Net Premium:</label>
                      <input
                        className="input-style rounded-lg"
                        type="number"
                        name="netPremium"
                        value={insurance.netPremium}
                        onBlur={handleNetPremiumBlur}
                        placeholder="Net Premium"
                        readOnly />
                    </div>
                    {/* FIELD - 32 */}
                    <div className="flex flex-col my-5">
                      <label className="text-base mx-1">OD Discount% :</label>
                      <input
                        className="input-style rounded-lg"
                        type="text"
                        name="odDiscount"
                        value={insurance.odDiscount}
                        onChange={handleInputChange}
                        placeholder="Enter OD Discount" />
                    </div>
                    {/* FIELD - 35 */}
                    <div className="flex flex-col my-5">
                      <label className="text-base mx-1">Sub Advisor:</label>
                      <input
                        className="input-style rounded-lg"
                        type="text"
                        name="subAdvisor"
                        value={insurance.subAdvisor}
                        onChange={handleInputChange}
                        placeholder="Enter Sub Advisor"
                      />
                    </div>
                    {/* FIELD - 38 */}
                    <div className="flex flex-col my-5">
                      <label className="text-base mx-1">Payout On:</label>
                      <select
                        id="payoutOn"
                        name="payoutOn"
                        className="input-style rounded-lg"
                        value={insurance.payoutOn}
                        onChange={handleInputChange}>
                        <option className="w-1" value="" disabled>--- Select Payout on ---</option>
                        <option value="NET">NET</option>
                        <option value="OD">OD</option>
                        <option value="LIABILITY">LIABILITY</option>
                      </select>
                    </div>
                    {/* FIELD - 41 */}
                    <div className="flex flex-col my-5">
                      <label className="text-base mx-1">CHQ No / Ref No.:</label>
                      <input
                        className="input-style rounded-lg"
                        type="text"
                        value={insurance.chqNoRefNo}
                        name="chqNoRefNo"
                        onChange={handleInputChange}
                        placeholder="Enter CHQ No / Ref No."
                      />
                    </div>
                    {/* FIELD - 44 */}
                    <div className="flex flex-col my-5">
                      <label className="text-base mx-1">CHQ Status:</label>
                      <select
                        className="input-style rounded-lg"
                        value={insurance.chqStatus}
                        name="chqStatus"
                        onChange={handleInputChange}
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
                    <div className="flex flex-col my-5">
                      <label className="text-base mx-1">Branch Payable Amount:</label>
                      <input
                        className="input-style rounded-lg"
                        type="text"
                        value={insurance.branchPayableAmount}
                        name="branchPayableAmount"
                        onChange={handleInputChange}
                        placeholder="Branch Payable Amount"
                        readOnly
                      />
                    </div>
                  </div>



                  {/* PART-3 */}
                  <div className="p-2 text-start">
                    {/* FIELD - 3 */}
                    <div className="flex flex-col my-5">
                      <label className="text-base mx-1">Category:</label>
                      <select
                        className="input-style rounded-lg"
                        value={insurance.category}
                        name="category"
                        onChange={handleInputChange}
                      > <option className="w-1" value="" disabled>--- Select Category ---</option>
                        <option value="GIC">GIC</option>
                        <option value="LIFE">LIFE</option>
                      </select>
                    </div>
                    {/* FIELD - 6 */}
                    <div className="flex flex-col my-5">
                      <label className="text-base mx-1">Policy No:</label>
                      <input
                        className="input-style rounded-lg"
                        type="text"
                        value={insurance.policyNo}
                        name="policyNo"
                        onChange={handleInputChange}
                        placeholder="Enter Policy No"
                      />
                    </div>
                    {/* FIELD - 9 */}
                    <div className="flex flex-col my-5">
                      <label className="text-base mx-1">Vehicle Reg No:</label>
                      <input
                        className="input-style rounded-lg"
                        type="text"
                        value={insurance.vehRegNo}
                        name="vehRegNo"
                        onChange={handleInputChange}
                        placeholder="Enter Vehicle Reg No"
                      />
                    </div>
                    {/* FIELD - 12 */}
                    <div className="flex flex-col my-5">
                      <label className="text-base mx-1">OD Expiry:</label>
                      <input
                        className="input-style rounded-lg"
                        type="date"
                        name="odExpiry"
                        value={insurance.odExpiry}
                        onChange={handleInputChange}
                        placeholder="Select OD Expiry"
                        min="2025-01-01"
                      />
                    </div>
                    {/* FIELD - 15 */}
                    <div className="flex flex-col my-5">
                      <label className="text-base mx-1">Body Type:</label>
                      <input
                        className="input-style rounded-lg"
                        type="text"
                        value={insurance.bodyType}
                        name="bodyType"
                        onChange={handleInputChange}
                        placeholder="Enter Body Type"
                      />
                    </div>
                    {/* FIELD - 18 */}
                    <div className="flex flex-col my-5">
                      <label className="text-base mx-1">Registration Date:</label>
                      <input
                        className="input-style rounded-lg"
                        type="date"
                        value={insurance.registrationDate}
                        name="registrationDate"
                        onChange={handleInputChange}
                        placeholder="Select Registration Date"
                        min="1950-01-01"
                        max={getLastDayOfPreviousMonth()}
                      />
                    </div>
                    {/* FIELD - 21 */}
                    <div className="flex flex-col my-5">
                      <label className="text-base mx-1">GVW (kg):</label>
                      <input
                        className="input-style rounded-lg"
                        type="text"
                        value={insurance.gvw}
                        name="gvw"
                        onChange={handleInputChange}
                        placeholder="Enter GVW"
                      />
                    </div>
                    {/* FIELD - 24 */}
                    <div className="flex flex-col my-5">
                      <label className="text-base mx-1">Chassis No:</label>
                      <input
                        className="input-style rounded-lg"
                        type="text"
                        value={insurance.chsNo}
                        name="chsNo"
                        onChange={handleInputChange}
                        placeholder="Enter Chassis No"
                      />
                    </div>
                    {/* FIELD - 27 */}
                    {
                      insurance.policyType === "SATP" ? (<div className="flex flex-col my-5">
                        <label className="text-base mx-1">OD Premium:</label>
                        <input
                          className="input-style rounded-lg"
                          type="number"
                          value={insurance.odPremium}
                          name="odPremium"
                          onChange={handleInputChange}
                          placeholder="Disabled"
                          onBlur={updateNetPremium}
                          disabled
                        />
                      </div>) : (<div className="flex flex-col my-5">
                        <label className="text-base mx-1">OD Premium:</label>
                        <input
                          className="input-style rounded-lg"
                          type="number"
                          value={insurance.odPremium}
                          name="odPremium"
                          onChange={handleInputChange}
                          placeholder="Enter OD Premium"
                          onBlur={updateNetPremium} />
                      </div>)}
                    {/* FIELD - 30 */}
                    <div className="flex flex-col my-5">
                      <label className="text-base mx-1">GST% :</label>
                      <input
                        className="input-style rounded-lg"
                        type="text"
                        value={insurance.taxes}
                        name="finalEntryFields"
                        onChange={handleInputChange}
                        onBlur={calculateFinalAmount}
                        placeholder="GST"
                      />
                    </div>
                    {/* FIELD - 33 */}
                    <div className="flex flex-col my-5">
                      <label className="text-base mx-1">NCB% :</label>
                      <input
                        className="input-style rounded-lg"
                        type="text"
                        name="ncb"
                        value={insurance.ncb}
                        onChange={handleInputChange}
                        placeholder="Enter NCB"
                      />
                    </div>
                    {/* FIELD - 36 */}
                    <div className="flex flex-col my-5">
                      <label className="text-base mx-1">Branch:</label>
                      <select
                        id="branch" name="branch"
                        className="input-style rounded-lg"
                        value={insurance.branch}
                        onChange={handleInputChange}
                      >
                        <option className="w-1" value="" disabled>--- Select Branch ---</option>
                        <option value="PATNA">PATNA</option>
                        <option value="HAJIPUR">HAJIPUR</option>
                        <option value="SAMASTIPUR">SAMASTIPUR</option>
                      </select>
                    </div>
                    {/* FIELD - 39 */}
                    <div className="flex flex-col my-5">
                      <label className="text-base mx-1">Policy Payment Mode:</label>
                      <select
                        id="policyPaymentMode"

                        className="input-style rounded-lg"
                        value={insurance.policyPaymentMode}
                        name="policyPaymentMode"
                        onChange={handleInputChange}>
                        <option className="w-1" value="" disabled>--- Select Policy Payment Mode ---</option>
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
                    <div className="flex flex-col my-5">
                      <label className="text-base mx-1">Bank Name:</label>
                      <select
                        id="bankName"
                        name="bankName"
                        className="input-style rounded-lg"
                        value={insurance.bankName}
                        onChange={handleInputChange}>
                        <option className="w-1" value="" disabled>--- Select Bank ---</option>
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
                    <div className="flex flex-col my-5">
                      <label className="text-base mx-1">Advisor Payable Amount:</label>
                      <input
                        className="input-style rounded-lg"
                        type="number"
                        value={insurance.advisorPayableAmount}
                        name="advisorPayableAmount"
                        onChange={handleInputChange}
                        placeholder="Advisor Payable Amount" />
                    </div>
                    {/* FIELD - 48 */}
                    <div className="flex flex-col my-5">
                      <label className="text-base mx-1">Company Payout:</label>
                      <input
                        className="input-style rounded-lg"
                        type="number"
                        value={insurance.companyPayout}
                        name="companyPayout"
                        onChange={handleInputChange}
                        onBlur={calculateProfitLoss}
                        placeholder="Enter Company Payout" />
                    </div>
                  </div>
                  {/* button */}
                  <div className="col-span-4 p-2 flex justify-center">
                    <button
                      className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                      onClick={updateInsuranceAPI} type="button" > {loading ? "Submitting..." : "Submit"} </button>
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
export default UpdateMaster;