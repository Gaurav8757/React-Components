import { useState } from "react";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
function MasterForm() {
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
  const [odDiscount, setOdDiscount] = useState('');
  const [ncb, setNcb] = useState('');
  const [advisorName, setAdvisorName] = useState('');
  const [subAdvisor, setSubAdvisor] = useState('');
  const [policyMadeBy, setPolicyMadeBy] = useState('');
  const [branch, setBranch] = useState('');
  const [payoutOn, setPayoutOn] = useState('');
  const [advisorPayout, setAdvisorPayout] = useState('');
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

  const handleSubmit = () => {
    // Handle form submission logic here
  };


  return (
    <section className="container-fluid relative h-screen p-0 sm:ml-64 bg-gradient-to-r from-indigo-400 to-cyan-400">
      <div className="container-fluid flex justify-center p-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 bg-gradient-to-r from-indigo-400 to-cyan-400">
        <div className="relative w-full lg:w-full p-0 lg:p-4 rounded-xl shadow-xl text-2xl items-center bg-gradient-to-r from-indigo-300 to-cyan-400">
          <h1 className="font-semibold text-3xl mb-8 text-white dark:text-black">Add All Detail&apos;s </h1>
          <form className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3  md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3  gap-3">
            {/* PART-1 */}
            <div className="p-2 text-start">
              {/* FIELD - 1 */}
              <div className="flex flex-col my-5">
                <label className="text-base mx-1">Entry Date:</label>
                <input
                  className="input-style rounded-lg"
                  type="date"
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
                  value={segment}
                  onChange={(e) => setSegment(e.target.value)}
                >
                  <option value="segment1">Segment 1</option>
                  <option value="segment2">Segment 2</option>
                </select>
              </div>
              {/* FIELD - 7 */}
              <div className="flex flex-col my-5">
                <label className="text-base mx-1">Insured Name:</label>
                <input
                  className="input-style rounded-lg"
                  type="text"
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
                  value={policyStartDate}
                  onChange={(e) => setPolicyStartDate(e.target.value)}
                  placeholder="Select Policy Start Date"
                />
              </div>
              {/* FIELD - 13 */}
              <div className="flex flex-col my-5">
                <label className="text-base mx-1">TP Expiry:</label>
                <input
                  className="input-style rounded-lg"
                  type="date"
                  value={tpExpiry}
                  onChange={(e) => setTpExpiry(e.target.value)}
                  placeholder="Select TP Expiry"
                />
              </div>
              {/* FIELD - 16 */}
              <div className="flex flex-col my-5">
                <label className="text-base mx-1">Make & Model:</label>
                <input
                  className="input-style rounded-lg"
                  type="text"
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
                  value={vehicleAge}
                  onChange={(e) => setVehicleAge(e.target.value)}
                  placeholder="Enter Vehicle Age"
                />
              </div>
              {/* FIELD - 22 */}
              <div className="flex flex-col my-5">
                <label className="text-base mx-1">CC:</label>
                <input
                  className="input-style rounded-lg"
                  type="text"
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
                  onChange={(e) => setPolicyType(e.target.value)}
                ><option className="w-1" value="" disabled>--- Select Policy Type ---</option>
                  <option value="COMP">COMP</option>
                  <option value="SAOD">SAOD</option>
                  <option value="SATP">SATP</option>
                  <option value="LIABILITY">LIABILITY</option>
                  {/* Add more policy type options */}
                </select>
              </div>
              {/* FIELD - 28 */}
              <div className="flex flex-col my-5">
                <label className="text-base mx-1">Liability Premium:</label>
                <input
                  className="input-style rounded-lg"
                  type="text"
                  value={liabilityPremium}
                  onChange={(e) => setLiabilityPremium(e.target.value)}
                  placeholder="Enter Liability Premium"
                />
              </div>
              {/* FIELD - 31 */}
              <div className="flex flex-col my-5">
                <label className="text-base mx-1">OD Discount:</label>
                <input
                  className="input-style rounded-lg"
                  type="text"
                  value={odDiscount}
                  onChange={(e) => setOdDiscount(e.target.value)}
                  placeholder="Enter OD Discount"
                />
              </div>
              {/* FIELD - 34*/}
              <div className="flex flex-col my-5">
                <label className="text-base mx-1">Sub Advisor:</label>
                <input
                  className="input-style rounded-lg"
                  type="text"
                  value={subAdvisor}
                  onChange={(e) => setSubAdvisor(e.target.value)}
                  placeholder="Enter Sub Advisor"
                />
              </div>
              {/* FIELD - 37 */}
              <div className="flex flex-col my-5">
                <label className="text-base mx-1">Payout On:</label>
                <select
                  id="payoutOn"
                  name="payoutOn"
                  className="input-style rounded-lg"
                  value={payoutOn}
                  onChange={(e) => setPayoutOn(e.target.value)}
                >
                  <option className="w-1" value="" disabled>--- Select Payout on ---</option>
                  <option value="NET">NET</option>
                  <option value="OD">OD</option>
                  <option value="LIABILITY">LIABILITY</option>
                </select>
              </div>
              {/* FIELD - 40 */}
              <div className="flex flex-col my-5">
                <label className="text-base mx-1">Payment Done By:</label>
                <select
                  className="input-style rounded-lg"
                  value={paymentDoneBy}
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
                  type="text"
                  value={branchPayout}
                  onChange={(e) => setBranchPayout(e.target.value)}
                  placeholder="Enter Branch Payout"
                />
              </div>
              {/* FIELD - 49 */}
              <div className="flex flex-col my-5">
                <label className="text-base mx-1">Profit/Loss:</label>
                <input
                  className="input-style rounded-lg"
                  type="text"
                  value={profitLoss}
                  onChange={(e) => setProfitLoss(e.target.value)}
                  placeholder="Enter Profit/Loss"
                />
              </div>
            </div>



















            {/* PART-2 */}
            <div className="p-2 my-1 text-start">
              {/* FIELD - 2 */}
              <div className="flex flex-col my-5">
                <label className="text-base mx-1">Company Name:</label>
                <select
                  id="insuranceCompanies" name="insuranceCompanies"
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
                  {/* Add more company options */}
                </select>

              </div>

              {/* FIELD - 5 */}
              <div className="flex flex-col my-5">
                <label className="text-base mx-1">Sourcing:</label>
                <select
                  className="input-style rounded-lg"
                  value={sourcing}
                  onChange={(e) => setSourcing(e.target.value)}
                >
                  {/* Add sourcing options */}
                </select>
              </div>
              {/* FIELD - 8 */}
              <div className="flex flex-col my-5">
                <label className="text-base mx-1">Contact No:</label>
                <input
                  className="input-style rounded-lg"
                  type="text"
                  value={contactNo}
                  onChange={(e) => setContactNo(e.target.value)}
                  placeholder="Enter Contact No"
                />
              </div>
              {/* FIELD - 11 */}
              <div className="flex flex-col my-5">
                <label className="text-base mx-1">Policy End Date:</label>
                <input
                  className="input-style rounded-lg"
                  type="date"
                  value={policyEndDate}
                  onChange={(e) => setPolicyEndDate(e.target.value)}
                  placeholder="Select Policy End Date"
                />
              </div>
              {/* FIELD - 14 */}
              <div className="flex flex-col my-5">
                <label className="text-base mx-1">IDV:</label>
                <input
                  className="input-style rounded-lg"
                  type="text"
                  value={idv}
                  onChange={(e) => setIdv(e.target.value)}
                  placeholder="Enter IDV"
                />
              </div>
              {/* FIELD - 17 */}
              <div className="flex flex-col my-5">
                <label className="text-base mx-1">Manufacturing Year:</label>
                <input
                  className="input-style rounded-lg"
                  type="text"
                  value={mfgYear}
                  onChange={(e) => setMfgYear(e.target.value)}
                  placeholder="Enter Manufacturing Year"
                />
              </div>
              {/* FIELD - 20 */}
              <div className="flex flex-col my-5">
                <label className="text-base mx-1">Fuel:</label>
                <select
                  className="input-style rounded-lg"
                  value={fuel}
                  onChange={(e) => setFuel(e.target.value)}
                >
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
                  value={engNo}
                  onChange={(e) => setEngNo(e.target.value)}
                  placeholder="Enter Engine No"
                />
              </div>
              {/* FIELD - 26 */}
              <div className="flex flex-col my-5">
                <label className="text-base mx-1">Product Code:</label>
                <select
                  id="productCode" name="productCode"
                  className="input-style rounded-lg"
                  value={productCode}
                  onChange={(e) => setProductCode(e.target.value)}
                >
                  <option className="w-1" value="" disabled>--- Select Product Code ---</option>
                  <option value="GCCV<2.5">{`GCCV < 2.5`}</option>
                  <option value="GCCV2.5><3.5">{`GCCV 2.5 >< 3.5`}</option>
                  <option value="GCCV 3.5><7.5">{`GCCV 3.5 >< 7.5`}</option>
                  <option value="GCCV 7.5><12">{`GCCV 7.5 >< 12`}</option>
                  <option value="GCCV 12><20">{`GCCV 12 >< 20`}</option>
                  <option value="GCCV 20><45">{`GCCV 20 >< 45`}</option>
                  <option value="GCCV 20><43">{`GCCV 20 >< 43`}</option>
                  <option value="GCCV >43">{`GCCV > 43`}</option>
                  <option value="GCCV >45">{`GCCV > 45`}</option>
                  <option value="MISS-D">{`MISS-D`}</option>
                  <option value="SCHOOL BUS">{`SCHOOL BUS`}</option>
                  <option value="ROUTE BUS">{`ROUTE BUS`}</option>
                  <option value="TRACTOR">{`TRACTOR`}</option>
                  <option value="TRAILER">{`TRAILER`}</option>
                  <option value="TAXI">{`TAXI`}</option>
                  <option value="PCV-3">{`PCV-3`}</option>
                  <option value="GCV-3">{`GCV-3`}</option>
                  <option value="PVT-CAR">{`PVT-CAR`}</option>
                  <option value="TW">{`TW`}</option>
                  <option value="SCOOTER">{`SCOOTER`}</option>
                  <option value="HEALTH">{`HEALTH`}</option>
                  <option value="NAME TRANSFER">{`NAME TRANSFER`}</option>
                  <option value="INDORSEMENT">{`INDORSEMENT`}</option>
                  <option value="SME">{`SME`}</option>
                  <option value="W C">{`W C`}</option>
                  <option value="TRANSIT">{`TRANSIT`}</option>
                  <option value="CAR">{`CAR`}</option>
                  <option value="CPM">{`CPM`}</option>
                  <option value="CPA">{`CPA`}</option>
                </select>
              </div>
              {/* FIELD - 29 */}
              <div className="flex flex-col my-5">
                <label className="text-base mx-1">Net Premium:</label>
                <input
                  className="input-style rounded-lg"
                  type="text"
                  value={netPremium}
                  onChange={(e) => setNetPremium(e.target.value)}
                  placeholder="Enter Net Premium"
                />
              </div>
              {/* FIELD - 32 */}
              <div className="flex flex-col my-5">
                <label className="text-base mx-1">NCB:</label>
                <input
                  className="input-style rounded-lg"
                  type="text"
                  value={ncb}
                  onChange={(e) => setNcb(e.target.value)}
                  placeholder="Enter NCB"
                />
              </div>
              {/* FIELD - 35 */}
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
              {/* FIELD - 38 */}
              <div className="flex flex-col my-5">
                <label className="text-base mx-1">Advisor Payout:</label>
                <input
                  className="input-style rounded-lg"
                  type="text"
                  value={advisorPayout}
                  onChange={(e) => setAdvisorPayout(e.target.value)}
                  placeholder="Enter Advisor Payout"
                />
              </div>
              {/* FIELD - 41 */}
              <div className="flex flex-col my-5">
                <label className="text-base mx-1">CHQ No / Ref No.:</label>
                <input
                  className="input-style rounded-lg"
                  type="text"
                  value={chqNoRefNo}
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
                  onChange={(e) => setBranchPayableAmount(e.target.value)}
                  placeholder="Enter Branch Payable Amount"
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
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="category1">Category 1</option>
                  <option value="category2">Category 2</option>
                  {/* Add more category options */}
                </select>
              </div>
              {/* FIELD - 6 */}
              <div className="flex flex-col my-5">
                <label className="text-base mx-1">Policy No:</label>
                <input
                  className="input-style rounded-lg"
                  type="text"
                  value={policyNo}
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
                  value={odExpiry}
                  onChange={(e) => setOdExpiry(e.target.value)}
                  placeholder="Select OD Expiry"
                />
              </div>
              {/* FIELD - 15 */}
              <div className="flex flex-col my-5">
                <label className="text-base mx-1">Body Type:</label>
                <input
                  className="input-style rounded-lg"
                  type="text"
                  value={bodyType}
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
                  onChange={(e) => setRegistrationDate(e.target.value)}
                  placeholder="Select Registration Date"
                />
              </div>
              {/* FIELD - 21 */}
              <div className="flex flex-col my-5">
                <label className="text-base mx-1">GVW:</label>
                <input
                  className="input-style rounded-lg"
                  type="text"
                  value={gvw}
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
                  onChange={(e) => setChsNo(e.target.value)}
                  placeholder="Enter Chassis No"
                />
              </div>
              {/* FIELD - 27 */}
              <div className="flex flex-col my-5">
                <label className="text-base mx-1">OD Premium:</label>
                <input
                  className="input-style rounded-lg"
                  type="text"
                  value={odPremium}
                  onChange={(e) => setOdPremium(e.target.value)}
                  placeholder="Enter OD Premium"
                />
              </div>
              {/* FIELD - 30 */}
              <div className="flex flex-col my-5">
                <label className="text-base mx-1">Final Entry Fields:</label>
                <input
                  className="input-style rounded-lg"
                  type="text"
                  value={finalEntryFields}
                  onChange={(e) => setFinalEntryFields(e.target.value)}
                  placeholder="Enter Final Entry Fields"
                />
              </div>
              {/* FIELD - 33 */}
              <div className="flex flex-col my-5">
                <label className="text-base mx-1">Advisor Name:</label>
                <input
                  className="input-style rounded-lg"
                  type="text"
                  value={advisorName}
                  onChange={(e) => setAdvisorName(e.target.value)}
                  placeholder="Enter Advisor Name"
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
                  name="policyPaymentMode"
                  className="input-style rounded-lg"
                  value={policyPaymentMode}
                  onChange={(e) => setPolicyPaymentMode(e.target.value)}
                >
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
                  onChange={(e) => setBankName(e.target.value)}
                >
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
                  type="text"
                  value={advisorPayableAmount}
                  onChange={(e) => setAdvisorPayableAmount(e.target.value)}
                  placeholder="Enter Advisor Payable Amount"
                />
              </div>
              {/* FIELD - 48 */}
              <div className="flex flex-col my-5">
                <label className="text-base mx-1">Company Payout:</label>
                <input
                  className="input-style rounded-lg"
                  type="text"
                  value={companyPayout}
                  onChange={(e) => setCompanyPayout(e.target.value)}
                  placeholder="Enter Company Payout"
                />
              </div>
            </div>

            {/* button */}
            <div className="col-span-4 p-2">
              <button
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                onClick={handleSubmit}
                type="button"
              >
                Submit
              </button>

              <NavLink to="/dashboard/viewmasterform"
                className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-6 py-2.5 text-center me-2 mb-2"
                onClick={handleSubmit}
                type="button"
              >
                View
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default MasterForm;