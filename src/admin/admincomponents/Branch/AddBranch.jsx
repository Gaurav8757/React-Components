import { useState } from "react";
// import ViewBranch from "./ViewBranch";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
function AddBranch() {
  const [branch, setBranch] = useState("");
  const [code, setCode] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState();
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState();
  const [phone, setPhone] = useState();
  const [person, setPerson] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const handleSubmit = async(e) => {
      e.preventDefault();
      setLoading(true);
      try {
        // Make sure to replace this URL with your actual API endpoint
        const response = await axios.post("https://eleedomimf.onrender.com/dashboard/addbranch", {
          concernperson: person,
          branchname: branch,
          branchcode: code,
          branchemail: email,
          branchmobile: mobile,
          branchphone: phone,
          password: password,
          branchaddress: address,
          branchdistrict: district,
          branchstate: state,
          branchpincode: pincode,
        });
  if(response.data){
    toast.success("Added Successfully !");
   
        // Reset the form and loading state on successful submission
        setBranch("");
        setCode("");
        setAddress("");
        setDistrict("");
        setState("");
        setPincode("");
        setEmail("");
        setPassword("");
        setMobile("");
        setPhone("");
        setPerson("");
        setLoading(false);
      }
       else{
        toast.error("Error Occurred. Try again...! ");
       }
      } catch (error) {
        console.error("Error during branch registration:", error.response);
        // setError("Error during branch registration. Please try again.");
        setLoading(false);
      }
    };
  
  


  return (
    <section className="container-fluid relative  h-screen p-0 sm:ml-64 bg-white">
    <div className="container-fluid flex justify-center p-2  border-gray-200 border-dashed rounded-lg dark:border-gray-700  bg-white">
      <div className="relative w-full lg:w-full  p-0 lg:p-4 rounded-xl shadow-xl text-2xl  items-center bg-slate-400">
      <h1 className="font-semibold text-3xl mb-8 text-white dark:text-black ">Add Branch</h1>
        <form className="flex flex-wrap justify-between">
          
          <div className="flex flex-col p-2 text-start w-full lg:w-1/3">
              <label className="text-base mx-1">Branch Name:</label>
              <input
                className="input-style rounded-lg"
                type="text"
                value={branch.toUpperCase()}
                onChange={(e) => setBranch(e.target.value)}
                placeholder="Enter Branch Name"
              />
            </div>
            <div className="flex flex-col p-2 text-start w-full lg:w-1/3">
              <label className="text-base mx-1">Email ID:</label>
              <input
                className="input-style rounded-lg"
                type="email"
                value={email.toUpperCase()}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="abc@gmail.com"
              />
            </div>
            <div className="flex flex-col p-2 text-start w-full lg:w-1/3">
              <label className="text-base mx-1">Mobile No:</label>
              <input
                className="input-style rounded-lg"
                type="number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="+91"
              />
            </div>
          
            <div className="flex flex-col p-2 text-start w-full lg:w-1/3">
              <label className="text-base mx-1">Phone No:</label>
              <input
                className="input-style rounded-lg"
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder=""
              />
            </div>
            <div className="flex flex-col p-2 text-start w-full lg:w-1/3">
              <label className="text-base mx-1">Branch Code:</label>
              <input
                className="input-style rounded-lg"
                type="text"
                value={code.toUpperCase()}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter Branch Code"
              />
            </div>
            <div className="flex flex-col p-2 text-start w-full lg:w-1/3">
              <label className="text-base mx-1">New Password</label>
              <input
                className="input-style rounded-lg"
                type="password"
                value={password.toUpperCase()}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="**************"
              />
            </div>
            <div className="flex flex-col p-2 text-start w-full lg:w-1/3">
              <label className="text-base mx-1">Branch Manager</label>
              <input
                className="input-style rounded-lg"
                type="text"
                value={person.toUpperCase()}
                onChange={(e) => setPerson(e.target.value)}
                placeholder="Enter Name"
              />
            </div>
            <div className="flex flex-col p-2 text-start w-full lg:w-1/3">
              <label className="text-base mx-1">Address:</label>
              <textarea
                className="input-style rounded-lg"
                type="text"
                rows={2}
                value={address.toUpperCase()}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter Your Address"
              />
            </div>
            
            <div className="flex flex-col p-2 text-start w-full lg:w-1/3">
              <label className="text-base mx-1">District:</label>
              <input
                className="input-style rounded-lg"
                type="text"
                value={district.toUpperCase()}
                onChange={(e) => setDistrict(e.target.value)}
                placeholder="Enter Your District Name"
              />
            </div>
            <div className="flex flex-col p-2 text-start w-full lg:w-1/3">
              <label className="text-base mx-1">State:</label>
              <input
                className="input-style rounded-lg"
                type="text"
                value={state.toUpperCase()}
                onChange={(e) => setState(e.target.value)}
                placeholder="Enter Your State Name"
              />
            </div>
           

            <div className="flex flex-col p-2 text-start w-full lg:w-1/3">
              <label className="text-base mx-1">Pincode:</label>
              <input
                className="input-style rounded-lg"
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="805110"
              />
            </div>
           
            
         
          <div className="w-full p-2">
            <button
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              onClick={handleSubmit}
              type="button"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>

            <NavLink to="/dashboard/viewbranch" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-6 py-2.5 text-center me-2 mb-2">
              {/* <ViewBranch/> */}
              View
              </NavLink>
          </div>
        </form>
      </div>
    </div>
  </section>
  )
}

export default AddBranch;