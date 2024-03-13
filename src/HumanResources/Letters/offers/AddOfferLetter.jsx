import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function AddOfferLetter() {
    const [ofdate, setOfdate] = useState('');
    const [ofname, setOfName] = useState('');
    const [ofmobile, setOfmobile] = useState('');
    const [ofaddress, setOfAddress] = useState('');
    const [ofsalaryWords, setOfsalaryWords] = useState("");
    const [ofemail, setOfemail] = useState('');
    const [ofdesignation, setOfdesignation] = useState('');
    const [ofgrosalary, setOfgrosalary] = useState('');
    const [ofvalidDate, setOfvalidDate] = useState('');
    const [errors, setErrors] = useState({});
    const [formSubmitted, setFormSubmitted] = useState(false);

    function getFormattedDate() {
        const date = new Date();
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    const date = getFormattedDate();
    useEffect( () => {setOfdate(date)}, [date] );
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formSubmitted) {
            return;
        }
        setErrors({});
        const errors = {};
        if (!ofdate) {
            errors.ofdate = "required*";
        }
        if (!ofname) {
            errors.ofname = "required*";
        }
        if (!ofmobile) {
            errors.ofmobile = "required*";
        }
        if (!ofemail) {
            errors.ofemail = "required*";
        }
        if (!ofgrosalary) {
            errors.ofgrosalary = "required*";
        }
        if (!ofvalidDate) {
            errors.ofvalidDate = "required*";
        }

        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        try {
            const response = await axios.post(`https://eleedomimf.onrender.com/letters/add/offer`, {
                ofdate,
                ofname,
                ofmobile,
                ofaddress,
                ofemail,
                ofdesignation,
                ofgrosalary,
                ofsalaryWords,
                ofvalidDate
            });

            if (response.data) {
                toast.success(`${response.data.status}`);
                setFormSubmitted(true);
                setOfdate("");
                setOfName("");
                setOfmobile("");
                setOfAddress("");
                setOfemail("");
                setOfdesignation("");
                setOfgrosalary("");
                setOfsalaryWords("");
                setOfvalidDate('');
            } else {
                toast.error("Error Occurred. Try again...! ");
            }
        } catch (error) {
            console.error("Error during Add User", error.response);
        } finally {
            setFormSubmitted(false);
        }
    };

    return (
        <section className="container-fluid relative h-screen p-0 sm:ml-64 bg-white">
            <div className="container-fluid flex justify-center p-2 border-gray-200 border-dashed rounded-lg  bg-white">
                <div className="relative w-full lg:w-full p-0 lg:p-4 rounded-xl shadow-xl text-2xl items-center bg-slate-300">
                    <h1 className="font-semibold text-3xl mb-10">Create Offer Letter</h1>
                    <div className="flex flex-wrap justify-between">
                        <div className="flex flex-col  p-2 text-start w-full lg:w-1/4">
                            <label className="text-base mx-1">Date<sup className="text-red-600 font-bold">*</sup></label>
                            <input
                                className="input-style rounded-lg"
                                type="text"
                                name="ofdate"
                                value={ofdate}
                                onChange={(e) => setOfdate(e.target.value)}
                                placeholder="Date"
                                readOnly
                            />
                            {errors.ofdate && <span className="text-red-600 text-sm ">{errors.ofdate}</span>}
                        </div>
                        <div className="flex flex-col p-2 text-start w-full lg:w-1/4">
                            <label className="text-base mx-1">Name<sup className="text-red-600 font-bold">*</sup></label>
                            <input
                                className="input-style rounded-lg"
                                type="text"
                                name="ofname"
                                value={ofname}
                                onChange={(e) => setOfName(e.target.value.toUpperCase())}
                                placeholder="Enter Name"
                            />
                            {errors.ofname && <span className="text-red-600 text-sm">{errors.ofname}</span>}
                        </div>
                        
                        <div className="flex flex-col p-2 text-start w-full lg:w-1/4">
                            <label className="text-base mx-1">Email ID<sup className="text-red-600 font-bold">*</sup></label>
                            <input
                                className="input-style rounded-lg"
                                type="text"
                                value={ofemail}
                                name="ofemail"
                                onChange={(e) => setOfemail(e.target.value)}
                                placeholder="Enter Email Address"
                            />
                             {errors.ofemail && <span className="text-red-600 text-sm">{errors.ofemail}</span>}
                        </div>

                        <div className="flex flex-col p-2 text-start w-full lg:w-1/4">
                            <label className="text-base mx-1">Contact No:<sup className="text-red-600 font-bold">*</sup></label>
                            <input
                                className="input-style rounded-lg"
                                type="text"
                                value={ofmobile}
                                name="ofmobile"
                                onChange={(e) => setOfmobile(e.target.value)}
                                placeholder="Enter Moblie No"
                            />
                        </div>
                        <div className="flex flex-col p-2 text-start w-full lg:w-1/4 mt-4">
                            <label className="text-base mx-1">Address:<sup className="text-red-600 font-bold">*</sup></label>
                            <textarea
                                className="input-style rounded-lg"
                                type="text"
                                cols={20}
                                value={ofaddress}
                                name="ofaddress"
                                onChange={(e) => setOfAddress(e.target.value.toUpperCase())}
                                placeholder="Enter Address"
                            />
                        </div>
                        <div className="flex flex-col p-2 text-start w-full lg:w-1/4 mt-4">
                            <label className="text-base mx-1">Employee Type(Designation):<sup className="text-red-600 font-bold">*</sup></label>
                            <input
                                className="input-style rounded-lg"
                                type="text"
                                value={ofdesignation}
                                name="ofdesignation"
                                onChange={(e) => setOfdesignation(e.target.value.toUpperCase())}
                                placeholder="Enter Emp Type"
                            />
                        </div>
                        <div className="flex flex-col p-2 text-start w-full lg:w-1/4 mt-4">
                            <label className="text-base mx-1">Gross Salary:<sup className="text-red-600 font-bold">*</sup></label>
                            <input
                                className="input-style rounded-lg"
                                type="text"
                                value={ofgrosalary}
                                name="ofgrosalary"
                                onChange={(e) => setOfgrosalary(e.target.value)}
                                placeholder="Enter Gross Salary"
                            />
                        </div>

                        <div className="flex flex-col p-2 text-start w-full lg:w-1/4 mt-4">
                            <label className="text-base mx-1">Salary in Words:<sup className="text-red-600 font-bold">*</sup></label>
                            <input
                                className="input-style rounded-lg"
                                type="text"
                                value={ofsalaryWords}
                                name="ofsalaryWords"
                                onChange={(e) => setOfsalaryWords(e.target.value.toUpperCase())}
                                placeholder="Salary in Words"
                            />
                        </div>
                        <div className="flex flex-col p-2 text-start w-full lg:w-1/4 mt-4">
                            <label className="text-base mx-1">Valid upto:<sup className="text-red-600 font-bold">*</sup></label>
                            <input
                                className="input-style rounded-lg"
                                type="date"
                                value={ofvalidDate}
                                name="ofvalidDate"
                                onChange={(e) => setOfvalidDate(e.target.value)}
                               
                            />
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
export default AddOfferLetter;
