import { useState } from "react";

const ContactUs = () => {
const [email, setEmail] = useState("");
const [mobile, setMobile] = useState();
const [query, setQuery] = useState("");


const handleSubmit = (e)=>{
    e.preventDefault(); // Prevents the form from submitting in the default way
    // Perform your desired actions with the form data here
    console.log("Form data submitted:", { email, mobile, query });
    // You can add additional logic here, such as sending data to an API, etc.
    setEmail("");
    setMobile("");
    setQuery("");
}

    return (
        <section className="container-fluid relative bg-slate-500">
            <div className="container-fluid    ml-2 mr-2 pb-4   bg-slate-100  ">
                <div className="flex justify-around items-center">
                    <div className="border-2 w-80 h-52 items-center flex-col p-4 border-sky-100  bg-slate-200"> 
                    {/* here above to change screen width of all div  */}
                        <h5 className="text-xl font-semibold">
                            Reach Us At
                        </h5>
                        <ul>
                            <li className="mt-2">
                                <i className="fa fa-phone mr-2"></i>
                                +91-mob
                            </li>
                            <li className="mt-2">
                                <i className="fa fa-envelope mr-2"></i>
                                email
                            </li>
                            <li className="mt-2 mb-2">
                                <i className="fa-solid fa-map-pin mr-2"></i>
                                FLAT NO - 203 LALJI TOWER APT, BASANT B PATNA
                                <span className="pl-1">
                                    Patna,
                                    Bihar - 801503,
                                    India
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div className="relative  w-80  border-2 p-2 rounded-xl shadow-xl text-xl ">
                        <form >
                            <p className="text-2xl">Contact Us</p>
                            <div>
                                <label className="text-sm">Email Address*</label>
                                <br></br>
                                <input className="bg-gray-50 border border-gray-300  
                                        text-sm rounded-lg focus:border-blue-500 
                                        w-full p-2.5"
                                    type="email"
                                    value={email}
                                    onChange={(e)=> setEmail(e.target.value)}
                                    placeholder="abc@geeksforgeeks.org" />
                                <br></br>
                                <label className="text-sm">Contact No.</label>
                                <br></br>
                                <input className="bg-gray-50 border border-gray-300 
                                        text-sm rounded-lg focus:border-blue-500  
                                        w-full p-2.5"
                                    type="number"
                                    value={mobile}
                                    onChange={(e)=> setMobile(e.target.value)}
                                    placeholder="+1324567890" />
                                <br></br>
                                <label className="text-sm">
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
                                    onChange={(e)=> setQuery(e.target.value)}
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
                    <div className="border-2 w bg-slate-300 border-sky-300 ">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3597.7123598999196!2d85.04531387524924!3d25.614472677444645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed572733094417%3A0xb3b4bcea04b2a04!2sLalji%20Tower!5e0!3m2!1sen!2sin!4v1702376205500!5m2!1sen!2sin"
                            className="w-full h-full border-0"  loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;
