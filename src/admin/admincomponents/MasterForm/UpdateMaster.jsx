import { CgCloseR } from "react-icons/cg";
import { useState, useEffect } from "react";
import { POLICY_TYPES } from "./master.jsx";
import { toast } from "react-toastify";
import axios from "axios";



function UpdateMaster() {
    const [entryDate, setEntryDate] = useState('');
    const [company, setCompany] = useState('');
    const [category, setCategory] = useState('');
    const [segment, setSegment] = useState('');
    const [sourcing, setSourcing] = useState('');
    const [policyNo, setPolicyNo] = useState('');
    const [insuredName, setInsuredName] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [vehRegNo, setVehRegNo] = useState('');
    const [policyStartDate, setPolicyStartDate] = useState('');
    const [policyEndDate, setPolicyEndDate] = useState('');
    const [odExpiry, setOdExpiry] = useState('');
    const [tpExpiry, setTpExpiry] = useState('');
    const [idv, setIdv] = useState('');
    const [bodyType, setBodyType] = useState('');
    const [makeModel, setMakeModel] = useState('');
    const [mfgYear, setMfgYear] = useState('');
    const [registrationDate, setRegistrationDate] = useState('');
    const [vehicleAge, setVehicleAge] = useState('');
    const [fuel, setFuel] = useState('');
    const [gvw, setGvw] = useState('');
    const [cc, setCc] = useState('');
    const [engNo, setEngNo] = useState('');
    const [chsNo, setChsNo] = useState('');
    const [policyType, setPolicyType] = useState('');
    const [productCode, setProductCode] = useState('');
    const [odPremium, setOdPremium] = useState('');
    const [liabilityPremium, setLiabilityPremium] = useState('');
    const [netPremium, setNetPremium] = useState('');
    const [finalEntryFields, setFinalEntryFields] = useState('');
    const [taxes, setTaxes] = useState('');
    const [odDiscount, setOdDiscount] = useState('');
    const [ncb, setNcb] = useState('');
    const [advisorName, setAdvisorName] = useState('');
    const [subAdvisor, setSubAdvisor] = useState('');
    const [policyMadeBy, setPolicyMadeBy] = useState('');
    const [branch, setBranch] = useState('');
    const [payoutOn, setPayoutOn] = useState('');
    const [calculationType, setCalculationType] = useState('');
    const [policyPaymentMode, setPolicyPaymentMode] = useState('');
    const [paymentDoneBy, setPaymentDoneBy] = useState('');
    const [chqNoRefNo, setChqNoRefNo] = useState('');
    const [bankName, setBankName] = useState('');
    const [chqPaymentDate, setChqPaymentDate] = useState('');
    const [chqStatus, setChqStatus] = useState('');
    const [advisorPayableAmount, setAdvisorPayableAmount] = useState('');
    const [branchPayout, setBranchPayout] = useState('');
    const [branchPayableAmount, setBranchPayableAmount] = useState('');
    const [companyPayout, setCompanyPayout] = useState('');
    const [profitLoss, setProfitLoss] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState("");
 
//   useEffect(() => {
    setId(localStorage.getItem("_id"));
    setEntryDate(localStorage.getItem("entryDate"));
    setCompany(localStorage.getItem("company"));
    setCategory(localStorage.getItem("category"));
    setSegment(localStorage.getItem("segment"));
    setSourcing(localStorage.getItem("sourcing"));
    setPolicyNo(localStorage.getItem("policyNo"));
    setInsuredName(localStorage.getItem("insuredName"));
    setContactNo(localStorage.getItem("contactNo"));
    setVehRegNo(localStorage.getItem("vehRegNo"));
    setPolicyStartDate(localStorage.getItem("policyStartDate"));
    setPolicyEndDate(localStorage.getItem("policyEndDate"));
    setOdExpiry(localStorage.getItem("odExpiry"));
    setTpExpiry(localStorage.getItem("tpExpiry"));
    setIdv(localStorage.getItem("idv"));
    setBodyType(localStorage.getItem("bodyType"));
    setMakeModel(localStorage.getItem("makeModel"));
    setMfgYear(localStorage.getItem("mfgYear"));
    setRegistrationDate(localStorage.getItem("registrationDate"));
    setVehicleAge(localStorage.getItem("vehicleAge"));
    setFuel(localStorage.getItem("fuel"));
    setGvw(localStorage.getItem("gvw"));
    setCc(localStorage.getItem("cc"));
    setEngNo(localStorage.getItem("engNo"));
    setChsNo(localStorage.getItem("chsNo"));
    setPolicyType(localStorage.getItem("policyType"));
    setProductCode(localStorage.getItem("productCode"));
    setOdPremium(localStorage.getItem("odPremium"));
    setLiabilityPremium(localStorage.getItem("liabilityPremium"));
    setNetPremium(localStorage.getItem("netPremium"));
    setFinalEntryFields(localStorage.getItem("finalEntryFields"));
    setTaxes(localStorage.getItem("taxes"));
    setOdDiscount(localStorage.getItem("odDiscount"));
    setNcb(localStorage.getItem("ncb"));
    setAdvisorName(localStorage.getItem("advisorName"));
    setSubAdvisor(localStorage.getItem("subAdvisor"));
    setPolicyMadeBy(localStorage.getItem("policyMadeBy"));
    setBranch(localStorage.getItem("branch"));
    setPayoutOn(localStorage.getItem("payoutOn"));
    setCalculationType(localStorage.getItem("calculationType"));
    setPolicyPaymentMode(localStorage.getItem("policyPaymentMode"));
    setPaymentDoneBy(localStorage.getItem("paymentDoneBy"));
    setChqNoRefNo(localStorage.getItem("chqNoRefNo"));
    setBankName(localStorage.getItem("bankName"));
    setChqPaymentDate(localStorage.getItem("chqPaymentDate"));
    setChqStatus(localStorage.getItem("chqStatus"));
    setAdvisorPayableAmount(localStorage.getItem("advisorPayableAmount"));
    setBranchPayout(localStorage.getItem("branchPayout"));
    setBranchPayableAmount(localStorage.getItem("branchPayableAmount"));
    setCompanyPayout(localStorage.getItem("companyPayout"));
    setProfitLoss(localStorage.getItem("profitLoss"));
// }, []);


  // OPEN MODAL
  const openModal = () => {
    setIsModalOpen(true);
 
  };

  // CLOSE MODAL
  const closeModal = () => {
    setIsModalOpen(false);
    // localStorage.clear();
  };

 









  
  
  

 // Function to update netPremium when odPremium or liabilityPremium changes
 const updateNetPremium = () => {
    const odPremiumValue = parseFloat(odPremium) || 0;
    const liabilityPremiumValue = parseFloat(liabilityPremium) || 0;
    // Calculate netPremium by adding odPremium and liabilityPremium
    const newNetPremium = odPremiumValue + liabilityPremiumValue;
    // Set the updated netPremium value directly
    setNetPremium(newNetPremium);
  };

  // Calculate the last day of the previous month
  const getLastDayOfPreviousMonth = () => {
    const today = new Date();
    // const lastDayOfPreviousMonth = new Date(today.getFullYear(), today.getMonth(6), 0);
    return today.toISOString().split('T')[0];
  };
  //  VEHICLE AGE CALCULATED
  const calculateAge = () => {
    const today = new Date();
    const birthdateDate = new Date(registrationDate);

    if (isNaN(birthdateDate.getTime())) {
      // Handle the case where the date is invalid
      console.error('Invalid date format for registrationDate:', registrationDate);
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
    setVehicleAge(`${ageYears} years ${ageMonths} months ${ageDays} days`);
  };

  useEffect(() => {
    calculateAge();
  },);

  // calculate taxes with netPremium
  const calculateFinalAmount = () => {
    const netPremiumValue = parseFloat(netPremium) || 0;
    const taxesValue = parseFloat(taxes) || 0;

    const finalAmountValue = netPremiumValue + (netPremiumValue * taxesValue) / 100;

    setFinalEntryFields(finalAmountValue.toFixed(2)); // Assuming you want to display the final amount with two decimal places
  };

  // calculate branch payable amount
  const calculateBranchPayableAmount = () => {
    const netPremiumValue = parseFloat(netPremium) || 0;
    const branchPayoutValue = parseFloat(branchPayout) || 0;

    const branchPayableAmountValue = netPremiumValue - branchPayoutValue;

    setBranchPayableAmount(branchPayableAmountValue.toFixed(2)); // Assuming you want to display the amount with two decimal places
  };


  //calculation  profit/loss 
  const calculateProfitLoss = () => {
    const companyPayoutValue = parseFloat(companyPayout) || 0;
    const branchPayoutValue = parseFloat(branchPayout) || 0;
    const profitLossValue = companyPayoutValue - branchPayoutValue;

    setProfitLoss(profitLossValue.toFixed(2)); // Assuming you want to display the result with two decimal places
  };


  // final amount set
  const handleNetPremiumBlur = () => {
    if (calculationType === 'finalAmount') {
      calculateFinalAmount();
    } else if (calculationType === 'branchPayableAmount') {
      calculateBranchPayableAmount();
    }
    // Reset the calculation type after performing the calculation
    setCalculationType('');
  };


  const handlePolicyStartDateChange = (e) => {
    const startDate = e.target.value;
    // Update odExpiry by adding 1 year to the selected policyStartDate
    const odExpiryDate = new Date(startDate);
    odExpiryDate.setFullYear(odExpiryDate.getFullYear() + 1);
    setOdExpiry(odExpiryDate.toISOString().split('T')[0]);

    // Update policyEndDate by adding 1 year to the selected policyStartDate
    const policyEndDateValue = new Date(startDate);
    policyEndDateValue.setFullYear(policyEndDateValue.getFullYear() + 1);
    setPolicyEndDate(policyEndDateValue.toISOString().split('T')[0]);

     // Update TP Expiry by adding 1 year to the selected policyStartDate
     const tpExpiryDate = new Date(startDate);
     tpExpiryDate.setFullYear(tpExpiryDate.getFullYear() + 3);
     setTpExpiry(tpExpiryDate.toISOString().split('T')[0]);
    // Set the selected policyStartDate
    setPolicyStartDate(startDate);
  };


  
  const handleSubmit = async () => {
    try {
      // Use the selected category ID in the patch method
      await axios.put(`https://eleedomimf.onrender.com/alldetails/updatedata/${id}`,).then((resp) => {
      
        const updatedMaster = resp.data;
       
       

            localStorage.setItem("entryDate", updatedMaster.entryDate);
            localStorage.setItem("company", updatedMaster.company);
            localStorage.setItem("category", updatedMaster.category);
            localStorage.setItem("segment", updatedMaster.segment);
            localStorage.setItem("sourcing", updatedMaster.sourcing);
            localStorage.setItem("policyNo", updatedMaster.policyNo);
            localStorage.setItem("insuredName", updatedMaster.insuredName);
            localStorage.setItem("contactNo", updatedMaster.contactNo);
            localStorage.setItem("vehRegNo", updatedMaster.vehRegNo);
            localStorage.setItem("policyStartDate", updatedMaster.policyStartDate);
            localStorage.setItem("policyEndDate", updatedMaster.policyEndDate);
            localStorage.setItem("odExpiry", updatedMaster.odExpiry);
            localStorage.setItem("tpExpiry", updatedMaster.tpExpiry);
            localStorage.setItem("idv", updatedMaster.idv);
            localStorage.setItem("bodyType", updatedMaster.bodyType);
            localStorage.setItem("makeModel", updatedMaster.makeModel);
            localStorage.setItem("mfgYear", updatedMaster.mfgYear);
            localStorage.setItem("registrationDate", updatedMaster.registrationDate);
            localStorage.setItem("vehicleAge", updatedMaster.vehicleAge);
            localStorage.setItem("fuel", updatedMaster.fuel);
            localStorage.setItem("gvw", updatedMaster.gvw);
            localStorage.setItem("cc", updatedMaster.cc);
            localStorage.setItem("engNo", updatedMaster.engNo);
            localStorage.setItem("chsNo", updatedMaster.chsNo);
            localStorage.setItem("policyType", updatedMaster.policyType);
            localStorage.setItem("productCode", updatedMaster.productCode);
            localStorage.setItem("odPremium", updatedMaster.odPremium);
            localStorage.setItem("liabilityPremium", updatedMaster.liabilityPremium);
            localStorage.setItem("netPremium", updatedMaster.netPremium);
            localStorage.setItem("finalEntryFields", updatedMaster.finalEntryFields);
            localStorage.setItem("taxes", updatedMaster.taxes);
            localStorage.setItem("odDiscount", updatedMaster.odDiscount);
            localStorage.setItem("ncb", updatedMaster.ncb);
            localStorage.setItem("advisorName", updatedMaster.advisorName);
            localStorage.setItem("subAdvisor", updatedMaster.subAdvisor);
            localStorage.setItem("policyMadeBy", updatedMaster.policyMadeBy);
            localStorage.setItem("branch", updatedMaster.branch);
            localStorage.setItem("payoutOn", updatedMaster.payoutOn);
            localStorage.setItem("calculationType", updatedMaster.calculationType);
            localStorage.setItem("policyPaymentMode", updatedMaster.policyPaymentMode);
            localStorage.setItem("paymentDoneBy", updatedMaster.paymentDoneBy);
            localStorage.setItem("chqNoRefNo", updatedMaster.chqNoRefNo);
            localStorage.setItem("bankName", updatedMaster.bankName);
            localStorage.setItem("chqPaymentDate", updatedMaster.chqPaymentDate);
            localStorage.setItem("chqStatus", updatedMaster.chqStatus);
            localStorage.setItem("advisorPayableAmount", updatedMaster.advisorPayableAmount);
            localStorage.setItem("branchPayout", updatedMaster.branchPayout);
            localStorage.setItem("branchPayableAmount", updatedMaster.branchPayableAmount);
            localStorage.setItem("companyPayout", updatedMaster.companyPayout);
            localStorage.setItem("profitLoss", updatedMaster.profitLoss);
            toast.success(`${resp.data.status}`);
            console.log(resp.data);
            console.log(updatedMaster);


      }).catch((error) => {
        console.error(error);
      });
      // Handle success, redirect, or show a success message
      closeModal(); // Close the modal after successful submission

    } catch (error) {
      
      console.error("Error updating insurance details:", error);
      // Handle error, show an error message, etc.
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
                  value={entryDate}
                  onChange={(e) => setEntryDate(e.target.value)}
                  placeholder="Select Entry Date"
                />
              </div>
              {/* FIELD - 4 */}
              <div className="flex flex-col my-5">
                <label className="text-base mx-1">Segment:</label>
                <select
                  className="input-style rounded-lg"
                  name="segment"
                  value={segment}
                  onChange={(e) => setSegment(e.target.value)}
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
                  value={insuredName}
                  onChange={(e) => setInsuredName(e.target.value)}
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
                  value={policyStartDate}
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
                  value={tpExpiry}
                  onChange={(e) => setTpExpiry(e.target.value)}
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
                  value={makeModel}
                  onChange={(e) => setMakeModel(e.target.value)}
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
                  value={vehicleAge}
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
                  value={cc}
                  onChange={(e) => setCc(e.target.value)}
                  placeholder="Enter CC"
                />
              </div>
              {/* FIELD - 25 */}
              <div className="flex flex-col my-5">
                <label className="text-base mx-1">Policy Type:</label>
                <select
                  className="input-style rounded-lg"
                  value={policyType}
                  name="policyType"
                  onChange={(e) => setPolicyType(e.target.value)}
                ><option className="w-1" value="" disabled>--- Select Policy Type ---</option>
                  {/* POLICY TYPES */}
                  {Object.keys(POLICY_TYPES).map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              {/* FIELD - 28 */}
              {
                policyType === "SAOD" ? (<div className="flex flex-col my-5">
                  <label className="text-base mx-1">Liability Premium:</label>
                  <input
                    className="input-style rounded-lg"
                    type="number"
                    name="liabilityPremium"
                    value={liabilityPremium}
                    onChange={(e) => setLiabilityPremium(e.target.value)}
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
                      value={liabilityPremium}
                      onChange={(e) => setLiabilityPremium(e.target.value)}
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
                  value={finalEntryFields}
                  name="finalEntryFields"
                  onChange={(e) => setFinalEntryFields(e.target.value)}
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
                  value={advisorName}
                  name="advisorName"
                  onChange={(e) => setAdvisorName(e.target.value)}
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
                  value={policyMadeBy}
                  onChange={(e) => setPolicyMadeBy(e.target.value)}
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

                  value={paymentDoneBy}
                  name="paymentDoneBy"
                  onChange={(e) => setPaymentDoneBy(e.target.value)}
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
                  value={chqPaymentDate}
                  onChange={(e) => setChqPaymentDate(e.target.value)}
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
                  value={branchPayout}
                  onChange={(e) => setBranchPayout(e.target.value)}
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
                  value={profitLoss}
                  onChange={(e) => setProfitLoss(e.target.value)}
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
                  value={company}

                  onChange={(e) => setCompany(e.target.value)}
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
                  value={sourcing}
                  name="sourcing"
                  onChange={(e) => setSourcing(e.target.value)}>
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
                  value={contactNo}
                  name="contactNo"
                  onChange={(e) => setContactNo(e.target.value)}
                  placeholder="Enter Contact No"/>
              </div>
              {/* FIELD - 11 */}
              <div className="flex flex-col my-5">
                <label className="text-base mx-1">Policy End Date:</label>
                <input
                  className="input-style rounded-lg"
                  type="date"
                  name="policyEndDate"
                  value={policyEndDate}
                  onChange={(e) => setPolicyEndDate(e.target.value)}
                  placeholder="Select Policy End Date"/>
              </div>
              {/* FIELD - 14 */}
              <div className="flex flex-col my-5">
                <label className="text-base mx-1">IDV:</label>
                <input
                  className="input-style rounded-lg"
                  type="text"
                  name="idv"
                  value={idv}
                  onChange={(e) => setIdv(e.target.value)}
                  placeholder="Enter IDV"/>
              </div>
              {/* FIELD - 17 */}
              <div className="flex flex-col my-5">
                <label className="text-base mx-1">Manufacturing Year:</label>
                <input
                  className="input-style rounded-lg"
                  type="text"
                  name="mfgYear"
                  value={mfgYear}
                  onChange={(e) => setMfgYear(e.target.value)}
                  placeholder="Enter Manufacturing Year"/>
              </div>
              {/* FIELD - 20 */}
              <div className="flex flex-col my-5">
                <label className="text-base mx-1">Fuel:</label>
                <select
                  className="input-style rounded-lg"
                  value={fuel}
                  name="fuel"
                  onChange={(e) => setFuel(e.target.value)}>
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
                  value={engNo}
                  onChange={(e) => setEngNo(e.target.value)}
                  placeholder="Enter Engine No"/>
              </div>
              {/* FIELD - 26 */}
              <div className="flex flex-col my-5">
                <label className="text-base mx-1">Product Code:</label>
                <select
                  id="productCode" name="productCode"
                  className="input-style rounded-lg"
                  value={productCode}
                  onChange={(e) => setProductCode(e.target.value)}>
                  <option className="w-1" value="" disabled>--- Select Product Code ---</option>
                  {policyType &&
                    POLICY_TYPES[policyType].transactions.map((transaction) => (
                      <option key={transaction} value={transaction}>
                        {transaction}
                      </option>
                    ))}
                </select>
              </div>
              {/* FIELD - 29 */}
              <div className="flex flex-col my-5">
                <label className="text-base mx-1">Net Premium:</label>
                <input
                  className="input-style rounded-lg"
                  type="number"
                  name="netPremium"
                  value={netPremium}
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
                  value={odDiscount}
                  onChange={(e) => setOdDiscount(e.target.value)}
                  placeholder="Enter OD Discount"/>
              </div>
              {/* FIELD - 35 */}
              <div className="flex flex-col my-5">
                <label className="text-base mx-1">Sub Advisor:</label>
                <input
                  className="input-style rounded-lg"
                  type="text"
                  name="subAdvisor"
                  value={subAdvisor}
                  onChange={(e) => setSubAdvisor(e.target.value)}
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
                  value={payoutOn}
                  onChange={(e) => setPayoutOn(e.target.value)}>
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
                  value={chqNoRefNo}
                  name="chqNoRefNo"
                  onChange={(e) => setChqNoRefNo(e.target.value)}
                  placeholder="Enter CHQ No / Ref No."
                />
              </div>
              {/* FIELD - 44 */}
              <div className="flex flex-col my-5">
                <label className="text-base mx-1">CHQ Status:</label>
                <select
                  className="input-style rounded-lg"
                  value={chqStatus}
                  name="chqStatus"
                  onChange={(e) => setChqStatus(e.target.value)}
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
                  value={branchPayableAmount}
                  name="branchPayableAmount"
                  onChange={(e) => setBranchPayableAmount(e.target.value)}
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
                  value={category}
                  name="category"
                  onChange={(e) => setCategory(e.target.value)}
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
                  value={policyNo}
                  name="policyNo"
                  onChange={(e) => setPolicyNo(e.target.value)}
                  placeholder="Enter Policy No"
                />
              </div>
              {/* FIELD - 9 */}
              <div className="flex flex-col my-5">
                <label className="text-base mx-1">Vehicle Reg No:</label>
                <input
                  className="input-style rounded-lg"
                  type="text"
                  value={vehRegNo}
                  name="vehRegNo"
                  onChange={(e) => setVehRegNo(e.target.value)}
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
                  value={odExpiry}
                  onChange={(e) => setOdExpiry(e.target.value)}
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
                  value={bodyType}
                  name="bodyType"
                  onChange={(e) => setBodyType(e.target.value)}
                  placeholder="Enter Body Type"
                />
              </div>
              {/* FIELD - 18 */}
              <div className="flex flex-col my-5">
                <label className="text-base mx-1">Registration Date:</label>
                <input
                  className="input-style rounded-lg"
                  type="date"
                  value={registrationDate}
                  name="registrationDate"
                  onChange={(e) => setRegistrationDate(e.target.value)}
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
                  value={gvw}
                  name="gvw"
                  onChange={(e) => setGvw(e.target.value)}
                  placeholder="Enter GVW"
                />
              </div>
              {/* FIELD - 24 */}
              <div className="flex flex-col my-5">
                <label className="text-base mx-1">Chassis No:</label>
                <input
                  className="input-style rounded-lg"
                  type="text"
                  value={chsNo}
                  name="chsNo"
                  onChange={(e) => setChsNo(e.target.value)}
                  placeholder="Enter Chassis No"
                />
              </div>
              {/* FIELD - 27 */}
              {
                policyType === "SATP" ? (<div className="flex flex-col my-5">
                  <label className="text-base mx-1">OD Premium:</label>
                  <input
                    className="input-style rounded-lg"
                    type="number"
                    value={odPremium}
                    name="odPremium"
                    onChange={(e) => setOdPremium(e.target.value)}
                    placeholder="Disabled"
                    onBlur={updateNetPremium}
                    disabled
                  />
                </div>) : (<div className="flex flex-col my-5">
                  <label className="text-base mx-1">OD Premium:</label>
                  <input
                    className="input-style rounded-lg"
                    type="number"
                    value={odPremium}
                    name="odPremium"
                    onChange={(e) => setOdPremium(e.target.value)}
                    placeholder="Enter OD Premium"
                    onBlur={updateNetPremium}/>
                </div>) }
              {/* FIELD - 30 */}
              <div className="flex flex-col my-5">
                <label className="text-base mx-1">GST% :</label>
                <input
                  className="input-style rounded-lg"
                  type="text"
                  value={taxes}
                  name="finalEntryFields"
                  onChange={(e) => setTaxes(e.target.value)}
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
                  value={ncb}
                  onChange={(e) => setNcb(e.target.value)}
                  placeholder="Enter NCB"
                />
              </div>
              {/* FIELD - 36 */}
              <div className="flex flex-col my-5">
                <label className="text-base mx-1">Branch:</label>
                <select
                  id="branch" name="branch"
                  className="input-style rounded-lg"
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
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
                  value={policyPaymentMode}
                  name="policyPaymentMode"
                  onChange={(e) => setPolicyPaymentMode(e.target.value)}>
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
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}>
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
                  value={advisorPayableAmount}
                  name="advisorPayableAmount"
                  onChange={(e) => setAdvisorPayableAmount(e.target.value)}
                  placeholder="Advisor Payable Amount"/>
              </div>
              {/* FIELD - 48 */}
              <div className="flex flex-col my-5">
                <label className="text-base mx-1">Company Payout:</label>
                <input
                  className="input-style rounded-lg"
                  type="number"
                  value={companyPayout}
                  name="companyPayout"
                  onChange={(e) => setCompanyPayout(e.target.value)}
                  onBlur={calculateProfitLoss}
                  placeholder="Enter Company Payout"/>
              </div>
            </div>
            {/* button */}
            <div className="col-span-4 p-2 flex justify-center">
              <button
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                onClick={handleSubmit} type="button" > Submit </button>
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