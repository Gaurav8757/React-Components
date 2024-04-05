import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function AddAdvisors() {
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState();
  const [fname, setFname] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
 const branchname =sessionStorage.getItem('name');

  const handleSubmit = async(e) => {
      e.preventDefault();
      setLoading(true);
      try {
        // Make sure to replace this URL with your actual API endpoint
        const response = await axios.post("https://eleedomimf.onrender.com/advisor/register", {
          advisorname: fname,
          advisoremail: email,
          advisormobile: mobile,
          advisorpassword: password,
          advisoraddress: address,
          branch: branchname
        });

  if(response.data.status){
    toast.success(`${response.data.status}`);
        // Reset the form and loading state on successful submission
        setEmail("");
        setMobile("");
        setPassword("");
        setFname("");
        setAddress("");
        setLoading(false);
      }
       else{
        toast.error("Error Occurred. Try again...! ");
       }
      } catch (error) {
        console.error("Error during advisor registration:", error.response);
        // setError("Error during branch registration. Please try again.");
        setLoading(false);
      }
    };
  
  


  return (
    <section className="container-fluid relative  h-screen p-0 sm:ml-64 bg-white">
    <div className="container-fluid flex justify-center p-2  border-gray-200 border-dashed rounded-lg   bg-white">
      <div className="relative w-full lg:w-full  p-0 lg:p-4 rounded-xl shadow-xl text-2xl  items-center mt-2 bg-slate-300">
      <h1 className="font-semibold text-3xl mb-8 text-white dark:text-black ">Add Advisor</h1>
        <div className="flex flex-wrap justify-between">
          {/* <div className="w-full lg:w-1/2 p-2 text-start"> */}
          <div className="flex flex-col p-2 text-start w-full lg:w-1/4">
              <label className="text-base mx-1">Name:</label>
              <input
                className="input-style rounded-lg"
                type="text"
                value={fname}
                onChange={(e) => setFname(e.target.value.toUpperCase())}
                placeholder="Enter Name"
              />
            </div>
            <div className="flex flex-col p-2 text-start w-full lg:w-1/4">
              <label className="text-base mx-1">Email ID:</label>
              <input
                className="input-style rounded-lg"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value.toLowerCase())}
                placeholder="abc@gmail.com"
              />
            </div>
            <div className="flex flex-col p-2 text-start w-full lg:w-1/4">
              <label className="text-base mx-1">Mobile No:</label>
              <input
                className="input-style rounded-lg"
                type="number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="+91"
              />
            </div>
       
            <div className="flex flex-col p-2 text-start w-full lg:w-1/4">
              <label className="text-base mx-1">Address</label>
              <input
                className="input-style rounded-lg"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value.toUpperCase())}
                placeholder="Enter  Address"
              />
            </div>

            <div className="flex flex-col p-2 mt-4 text-start w-full lg:w-1/4">
              <label className="text-base mx-1">Password</label>
              <input
                className="input-style rounded-lg"
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="***********"
              />
            </div>
            </div>
         
          <div className="w-full p-2">
            <button
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              onClick={handleSubmit}
              type="button"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
       
      </div>
    </div>
  </section>
  )
}
export default AddAdvisors;