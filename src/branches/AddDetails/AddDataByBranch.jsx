import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
function AddDataByBranch() {
    const [entryDate, setEntryDate] = useState('');
    const [company, setCompany] = useState('');
    const [category, setCategory] = useState('');
    const [segment, setSegment] = useState('');
    const [sourcing, setSourcing] = useState('');
    const [insuredName, setInsuredName] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [vehRegNo, setVehRegNo] = useState('');
    const [hypo, setHypo] = useState("");
    const [advisorName, setAdvisorName] = useState('');
    const [subAdvisor, setSubAdvisor] = useState('');
    const [errors, setErrors] = useState({});
    const [formSubmitted, setFormSubmitted] = useState(false);
    const name = sessionStorage.getItem("name");

    const handleSubmit = async (e) => {
        e.preventDefault();

 // Prevent multiple submissions
 if (formSubmitted) {
    return;
}

        setErrors({}); // Clear previous errors

        const errors = {};
        if (!entryDate) {
            errors.entryDate = "required*";
        }
        if (!company) {
            errors.company = "required*";
        }
        if (!category) {
            errors.category = "required*";
        }
        if (!segment) {
            errors.segment = "required*";
        }
        if (!insuredName) {
            errors.insuredName = "required*";
        }
        if (!contactNo) {
            errors.contactNo = "required*";
        }
        if (!advisorName) {
            errors.advisorName = "required*";
        }
        if (!subAdvisor) {
            errors.subAdvisor = "required*";
        }
        if (!vehRegNo) {
            errors.vehRegNo = "required*";
        }
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        try {
            // Make sure to replace this URL with your actual API endpoint
            const response = await axios.post(`https://eleedomimf.onrender.com/alldetails/adddata`, {
                entryDate,
                company,
                category,
                segment,
                sourcing,
                insuredName,
                contactNo,
                vehRegNo,
                hypo,
                advisorName,
                subAdvisor,
                branch: name,
            });

            if (response.data) {
                toast.success("Data Added Successfully !");
                setFormSubmitted(true);
            }
            else {
                toast.error("Error Occurred. Try again...! ");
            }
        } catch (error) {
            console.error("Error during branch registration:", error.response);
        }
    };




    return (
        <section className="container-fluid relative h-screen p-0 sm:ml-64 bg-white">
            <div className="container-fluid flex justify-center p-2 border-gray-200 border-dashed rounded-lg  bg-white">

                <div className="relative w-full lg:w-full p-0 lg:p-4 rounded-xl shadow-xl text-2xl items-center bg-slate-300">
                    <h1 className="font-semibold text-3xl mb-10">Policy</h1>
                    <div className="flex flex-wrap justify-between">
                        {/* FIELD - 1 */}
                        <div className="flex flex-col  p-2 text-start w-full lg:w-1/3">
                            <label className="text-base mx-1">Entry Date<span className="text-red-600 font-bold">*</span></label>
                            <input
                                className="input-style rounded-lg"
                                type="date"
                                name="entryDate"
                                value={entryDate}
                                onChange={(e) => setEntryDate(e.target.value)}
                                placeholder="Select Entry Date"
                            />
                            {errors.entryDate && <span className="text-red-600 text-sm ">{errors.entryDate}</span>}
                        </div>

                        {/* FIELD - 2 */}
                        <div className="flex flex-col p-2 text-start w-full lg:w-1/3">
                            <label className="text-base mx-1">Company Name<span className="text-red-600 font-bold">*</span></label>
                            <select
                                id="company" name="company"
                                className="input-style rounded-lg"
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                            >
                                <option className="" value="" disabled>--- Select Company ---</option>
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
                            {errors.company && <span className="text-red-600 text-sm">{errors.company}</span>}
                        </div>

                        {/* field - 3 */}
                        <div className="flex flex-col  p-2 text-start w-full lg:w-1/3">
                            <label className="text-base mx-1">Category<span className="text-red-600 font-bold">*</span></label>
                            <select
                                className="input-style rounded-lg"
                                value={category}
                                name="category"
                                onChange={(e) => setCategory(e.target.value)}>
                                <option className="w-1" value="" disabled>--- Select Category ---</option>
                                <option value="GIC">GIC</option>
                                <option value="LIFE">LIFE</option>
                            </select>
                            {errors.category && <span className="text-red-600 text-sm">{errors.category}</span>}
                        </div>

                        {/* FIELD - 4 */}
                        <div className="flex flex-col  p-2 text-start w-full lg:w-1/3">
                            <label className="text-base mx-1">Segment<span className="text-red-600 font-bold">*</span></label>
                            <select
                                className="rounded-lg"
                                name="segment"
                                value={segment}
                                onChange={(e) => setSegment(e.target.value)}>
                                <option value="" disabled>--- Select Segment ---</option>
                                <option value="C V">C V</option>
                                <option value="PVT-CAR">PVT-CAR</option>
                                <option value="TW">TW</option>
                                <option value="HEALTH">HEALTH</option>
                                <option value="NON-MOTOR">NON-MOTOR</option>
                                <option value="LIFE">LIFE</option>
                            </select>
                            {errors.segment && <span className="text-red-600 text-sm">{errors.segment}</span>}
                        </div>

                        {/* FIELD - 5 */}
                        <div className="flex flex-col p-2 text-start w-full lg:w-1/3">
                            <label className="text-base mx-1">Sourcing</label>
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
                        {/* FIELD - 7 */}
                        <div className="flex flex-col p-2 text-start w-full lg:w-1/3">
                            <label className="text-base mx-1">Insured Name<span className="text-red-600 font-bold">*</span></label>
                            <input
                                className="input-style rounded-lg"
                                type="text"
                                name="insuredName"
                                value={insuredName}
                                onChange={(e) => setInsuredName(e.target.value)}
                                placeholder="Enter Insured Name"
                            />
                            {errors.insuredName && <span className="text-red-600 text-sm">{errors.insuredName}</span>}
                        </div>
                        {/* FIELD - 8 */}
                        <div className="flex flex-col p-2 text-start w-full lg:w-1/3">
                            <label className="text-base mx-1">Contact No<span className="text-red-600 font-bold">*</span></label>
                            <input
                                className="input-style rounded-lg"
                                type="text"
                                value={contactNo}
                                name="contactNo"
                                onChange={(e) => setContactNo(e.target.value)}
                                placeholder="Enter Contact No"
                            />
                            {errors.contactNo && <span className="text-red-600 text-sm">{errors.contactNo}</span>}
                        </div>
                        {/* FIELD - 9 */}
                        <div className="flex flex-col p-2 text-start w-full lg:w-1/3">
                            <label className="text-base mx-1">Vehicle Reg No<span className="text-red-600 font-bold">*</span></label>
                            <input
                                className="input-style rounded-lg"
                                type="text"
                                value={vehRegNo}
                                name="vehRegNo"
                                onChange={(e) => setVehRegNo(e.target.value)}
                                placeholder="Enter Vehicle Reg No"
                            />
                            {errors.vehRegNo && <span className="text-red-600 text-sm">{errors.vehRegNo}</span>}
                        </div>


                        {/* FIELD - 10 */}
                        <div className="flex flex-col p-2 text-start w-full lg:w-1/3">
                            <label className="text-base mx-1">Hypothication</label>
                            <input
                                className="input-style rounded-lg"
                                type="text"
                                value={hypo}
                                name="hypo"
                                onChange={(e) => setHypo(e.target.value)}
                                placeholder="Enter Hypothication"
                            />
                        </div>

                        {/* FIELD - 36 */}
                        <div className="flex flex-col p-2 text-start w-full lg:w-1/3">
                            <label className="text-base mx-1">Branch</label>
                            <input
                                id="branch" name="branch"
                                className="input-style rounded-lg"
                                value={name}
                                // onChange={(e) => setBranch(e.target.value)}
                                disabled
                            >

                            </input>
                        </div>

                        {/* FIELD - 34*/}
                        <div className="flex flex-col p-2 text-start w-full lg:w-1/3">
                            <label className="text-base mx-1">Advisor Name<span className="text-red-600 font-bold">*</span></label>
                            <input
                                className="input-style rounded-lg"
                                type="text"
                                value={advisorName}
                                name="advisorName"
                                onChange={(e) => setAdvisorName(e.target.value)}
                                placeholder="Enter Advisor Name"
                            />
                            {errors.advisorName && <span className="text-red-600 text-sm">{errors.advisorName}</span>}
                        </div>

                        {/* FIELD - 35 */}
                        <div className="flex flex-col p-2 text-start w-full lg:w-1/3">
                            <label className="text-base mx-1">Sub Advisor<span className="text-red-600 font-bold">*</span></label>
                            <input
                                className="input-style rounded-lg"
                                type="text"
                                name="subAdvisor"
                                value={subAdvisor}
                                onChange={(e) => setSubAdvisor(e.target.value)}
                                placeholder="Enter Sub Advisor"
                            />
                            {errors.subAdvisor && <span className="text-red-600 text-sm">{errors.subAdvisor}</span>}
                        </div>
                    </div>


                    <div className="flex justify-center p-2 text-center w-full my-2 mt-10 gap-10">
                        <button
                            className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-6 py-2.5 text-center me-2 mb-2"
                            onClick={handleSubmit}
                            type="button"
                            disabled={formSubmitted}
                        >
                            {formSubmitted ? "Submitted" : "Submit"}
                        </button>

                        
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AddDataByBranch;
