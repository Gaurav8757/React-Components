import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import VITE_DATA from "../../config/config.jsx"
function Careers() {
  const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [claim, setClaim] = useState("");
    const [name, setName] = useState("");
    const [policy, setPolicy] = useState("");
    const [dated, setDate] = useState();
    const [dates, setDates] = useState("");
    const [time, setTime] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${VITE_DATA}/users/clim`, {
                userclaim_name: name,
                userclaim_email: email,
                userclaim_mobile: mobile,
                userclaim_insurance_name: claim,
                userclaim_policyno: policy,
                userclaim_date: new Date(dates + 'T' + time),
                userclaim_time: time,
                userclaim_policyexp: new Date(dated),
            });
            //   console.log(response.data);
            if (response.data) {
                toast.success("Claim submitted Successfully");
                // Reset form fields if needed
            } else {
                toast.error("Claim submitted successfully");
                console.error('Failed to submit claim');
            }
        } catch (error) {
            console.error('Error:', error);
        }

        setEmail("");
        setMobile("");
        setClaim("");
        setName("");
        setPolicy("");
        setDates('');
        setDate("");
        setTime("");

    };

    return (
        <section className="container-fluid relative bg-orange-50">
            <div className="container-fluid flex flex-col justify-center ml-2 mr-2 bg-orange-50">
                <p className="text-3xl font-semibold my-3 text-orange-700 uppercase">Apply from Here</p>
                <div className="relative w-full mx-auto lg:w-1/2  p-6 rounded-xl shadow-xl text-2xl  items-center  bg-orange-200 mb-10">
                    <form className=" flex flex-wrap justify-between">

                        <div className="flex flex-col  p-2 text-start w-full lg:w-1/3">
                            <label className="text-base ">Full Name<span className="text-red-600">*</span></label>
                            <input
                                className="input-style p-1 rounded"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Your Name"
                                required
                            />
                        </div>
                        <div className="flex flex-col  p-2 text-start w-full lg:w-1/3">
                            <label className="text-base ">Email Address <span className="text-red-600">*</span></label>
                            <input
                                className="input-style p-1 rounded"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="abc@gmail.com"
                            />
                        </div>
                        <div className="flex flex-col  p-2 text-start w-full lg:w-1/3">
                            <label className="text-base ">Contact No. <span className="text-red-600">*</span></label>
                            <input
                                className="input-style p-1 rounded"
                                type="number"
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                                placeholder="+91"
                                required
                            />
                        </div>


                        <div className="flex flex-col  p-2 text-start w-full lg:w-1/3">
                            <label className="text-base  ">Your Address</label>
                            <textarea
                                className="input-style p-1 rounded"
                                type="text"
                                value={claim}
                                onChange={(e) => setClaim(e.target.value)}
                                placeholder="Address"
                            />
                        </div>
                        <div className="flex flex-col  p-2 text-start w-full lg:w-1/3">
                            <label className="text-base  whitespace-nowrap">What position are you applying for?</label>
                            <select
                                className="input-style p-1 rounded"
                                type="text"
                                value={policy}
                                onChange={(e) => setPolicy(e.target.value)}
                                placeholder="Policy No."
                            >
                               <option className = "">------- SELECT POSITION --------</option>
                        <option className = "OT_EXECUTIVE">OT EXECUTIVE</option>
                        <option className = "BRANCH_EXECUTIVE/ADMIN">BRANCH EXECUTIVE/ADMIN</option>
                        <option className = "FINANCE_EXECUTIVE">FINANCE EXECUTIVE</option>
                        <option className = "DATA_CALLER">DATA CALLER</option>
                              </select>
                        </div>

                        <div className="flex flex-col  p-2 text-start w-full lg:w-1/3 ">

                            <label className="text-base mx-1">Apply Date:</label>
                            <input
                                className="input-style p-1 rounded"
                                type="date"
                                value={dates}
                                onChange={(e) => setDates(e.target.value)}

                            />
                        </div>
                        <div className="flex flex-col  p-2 text-start w-full lg:w-1/3 ">
                            <label className="text-base mx-1">Recent Qualification:</label>
                            <input
                                className="input-style p-1 rounded"
                                type="text"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                placeholder = "Master's /Bachelor's /12th /10th"
                            />

                        </div>

                        <div className="flex flex-col  p-2 text-start w-full lg:w-1/3">
                            <label className="text-base mx-1">Level</label>
                            <select
                                className="input-style p-1 rounded"
                                type="text"
                                value={policy}
                                onChange={(e) => setPolicy(e.target.value)}
                                placeholder="Policy No."
                            >
                               <option className = "">---------- SELECT LEVEL ----------</option>
                        <option className = "FRESHER">FRESHER</option>
                        <option className = "1-2 YEARS">1-2 YEAR</option>
                        <option className = "3-5 YEARS">3-5 YEAR</option>
                        <option className = ">5 YEARS">MORE THAN 5 YEARS</option>
                              </select>
                        </div>
                        <div className="flex flex-col mt-8 mb-4c bg-orange-600 p-0 text-white rounded  text-start w-full ">
                          <p className = "ms-4">References </p>
                          
                        </div>
                        <div className="flex flex-col  p-2 text-start w-full lg:w-1/3"></div>
                    </form>
                    <div className="mt-10">
                            <button
                                className="text-white bg-gradient-to-r leading-4 from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded text-base px-3 py-2.5 text-center"
                                onClick={handleSubmit}
                                type="button"
                            >
                                Submit
                            </button>
                        </div>
                </div>
            </div>
        </section>
    );
}

export default Careers;