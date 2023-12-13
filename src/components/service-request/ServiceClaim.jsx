import { useState } from "react";

const ServiceClaim = () => {
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [claim, setClaim] = useState("");
    const [name, setName] = useState("");
    const [policy, setPolicy] = useState("");
    const [date, setDate] = useState();
    const [dates, setDates] = useState("");
    const [time, setTime] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();
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
        <section className="container-fluid relative bg-slate-500">
            <div className="container-fluid flex justify-center ml-2 mr-2 pb-4 bg-slate-100">
                <div className="relative w-full lg:w-1/2 border-2 p-6 lg:p-14 rounded-xl shadow-xl text-xl items-center mt-4 bg-sky-50">
                    <form>
                        <p className="text-3xl font-semibold mb-4">Claim Form</p>
                        <div className="text-start   space-y-4 ">

                            <div className="flex flex-col">
                                <label className="text-sm mx-1">Name</label>
                                <input
                                    className="input-style rounded-lg"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Your Name"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm mx-1">Email Address*</label>
                                <input
                                    className="input-style rounded-lg"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="abc@geeksforgeeks.org"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm mx-1">Contact No.</label>
                                <input
                                    className="input-style rounded-lg"
                                    type="number"
                                    value={mobile}
                                    onChange={(e) => setMobile(e.target.value)}
                                    placeholder="+1324567890"
                                />
                            </div>


                            <div className="flex flex-col ">
                                <label className="text-sm mx-1 ">Insurance Claim Name</label>
                                <input
                                    className="input-style rounded-lg"
                                    type="text"
                                    value={claim}
                                    onChange={(e) => setClaim(e.target.value)}
                                    placeholder="Insurance Name"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm mx-1">Policy Number</label>
                                <input
                                    className="input-style rounded-lg"
                                    type="text"
                                    value={policy}
                                    onChange={(e) => setPolicy(e.target.value)}
                                    placeholder="Policy No."
                                />
                            </div>

                            <div className="flex flex-col-10 ">
                                <div>
                                    <label className="text-sm mx-1">Claim Date & Time:</label>
                                    <input
                                        className="input-style rounded-lg  ms-10"
                                        type="date"
                                        value={dates}
                                        onChange={(e) => setDates(e.target.value)}

                                    />


                                    <input
                                        className="input-style rounded-lg ms-10"
                                        type="time"
                                        value={time}
                                        onChange={(e) => setTime(e.target.value)}

                                    />
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <label className="text-sm mx-1">Policy Expiry Date</label>
                                <input
                                    className="input-style rounded-lg"
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}

                                />
                            </div>
                            <button
                                className="text-white bg-gradient-to-r leading-4 from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                                onClick={handleSubmit}
                                type="button"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ServiceClaim;
