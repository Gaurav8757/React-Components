import { useState } from "react";

const ContactUs = () => {
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [query, setQuery] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form data submitted:", { email, mobile, query });
        setEmail("");
        setMobile("");
        setQuery("");
    };

    return (
        <section className="container-fluid relative bg-gradient-to-r from-indigo-400 to-cyan-400">
            <div className="container-fluid mx-auto md:flex md:justify-around ml-2 mr-2 pt-20 pb-20 bg-gradient-to-r from-indigo-400 to-cyan-400">
          
                <div className="md:w-1/3 w-auto  rounded-md md:h-auto p-4  m-5 mx-5  bbg-gradient-to-r from-indigo-400 to-cyan-400 shadow-2xl mb-4 md:mb-0">
                    <h5 className="text-2xl font-bold bg-gradient-to-r from-teal-900 to-emerald-900 bg-clip-text text-transparent ">Reach Us At</h5>
                    <ul className="text-white ">
                        <li className="mt-2">
                            <i className="fa fa-phone mr-2"></i>+91-mob
                        </li>
                        <li className="mt-2">
                            <i className="fa fa-envelope mr-2"></i>email
                        </li>
                        <li className="mt-2 mb-2">
                            <i className="fa-solid fa-map-pin mr-2"></i>
                            FLAT NO - 203 LALJI TOWER APT, BASANT B PATNA
                            <span className="pl-1">
                                Patna, Bihar - 801503, India
                            </span>
                        </li>
                    </ul>
                </div>
                <div className="relative  md:w-1/3 bg-gradient-to-r mx-5 from-indigo-400 to-cyan-400 rounded-xl shadow-2xl text-xl ">
                    <form >
                    <p className="text-2xl font-bold bg-gradient-to-r pt-8 from-teal-900 to-emerald-900 bg-clip-text text-transparent">Contact Us</p>
                        <div className="space-y-2 text-start p-4">
                            <label className="text-sm mx-1 ">Email Address*</label>
                            <br></br>
                            <input className="bg-gray-50 border border-gray-300  
                                        text-sm rounded-lg focus:border-blue-500 
                                        w-full p-2.5"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="abc@geeksforgeeks.org" />
                            <br></br>
                            <label className="text-sm mx-1 ">Contact No.</label>
                            <br></br>
                            <input className="bg-gray-50 border border-gray-300 
                                        text-sm rounded-lg focus:border-blue-500  
                                        w-full p-2.5"
                                type="number"
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                                placeholder="+91" />
                            <br></br>
                            <label className="text-sm mx-1 ">
                                Drop Your Query
                            </label>
                            <br></br>
                            <textarea className="bg-gray-50 border border-gray-300  
                                            text-sm rounded-lg  
                                            focus:border-blue-500  
                                            w-full p-2.5"
                                rows="4"
                                cols="25"
                                maxLength="300"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Max Allowed Characters: 300">
                            </textarea>
                            <br></br>
                            <button className="bg-blue-500 hover:bg-blue-700  
                                        text-white font-bold  
                                        py-2 px-4 rounded"
                                onClick={handleSubmit}
                                type="button">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>


                <div className="md:w-1/3 rounded-md h-3/2 bg-slate-300 m-3 border-sky-200">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3597.7123598999196!2d85.04531387524924!3d25.614472677444645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed572733094417%3A0xb3b4bcea04b2a04!2sLalji%20Tower!5e0!3m2!1sen!2sin!4v1702376205500!5m2!1sen!2sin"
                        className="w-full h-full border-0 rounded-md"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;
