import { useState } from "react";
function AddBranch() {
  const [branch, setBranch] = useState("");
  const [code, setCode] = useState();
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState();
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState();
  const [phone, setPhone] = useState();
  const [person, setPerson] = useState("");

  const handleSubmit = (e) => {
      e.preventDefault();
      setEmail("");
      setMobile();
      setBranch("");
      setCode();
      setAddress("");
      setDistrict("");
      setState("");
      setPincode();
      setPhone();
      setPerson("");
  };


  return (
    // <div className="p-0 sm:ml-64">
    // <dibase className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
    <section className="container-fluid relative  h-screen p-0 sm:ml-64 bg-gradient-to-r from-indigo-400 to-cyan-400">
    <div className="container-fluid flex justify-center p-2  border-gray-200 border-dashed rounded-lg dark:border-gray-700  bg-gradient-to-r from-indigo-400 to-cyan-400">
      
      <div className="relative w-full lg:w-full  p-0 lg:p-4 rounded-xl shadow-xl text-2xl  items-center bg-gradient-to-r from-indigo-300 to-cyan-400">
      <h1 className="font-semibold text-3xl mb-8 text-white dark:text-black ">Add Branch</h1>
        <form className="flex flex-wrap ">
         
          <div className="w-full lg:w-1/2 p-2 text-start">
          <div className="flex flex-col ">
              <label className="text-base mx-1">Branch Name:</label>
              <input
                className="input-style rounded-lg"
                type="text"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                placeholder="Enter Branch Name"
              />
            </div>
            <div className="flex flex-col my-5">
              <label className="text-base mx-1">Address:</label>
              <textarea
                className="input-style rounded-lg"
                type="text"
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter Your Address"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-base mx-1">State:</label>
              <input
                className="input-style rounded-lg"
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="Enter Your State Name"
              />
            </div>
            <div className="flex flex-col my-5">
              <label className="text-base mx-1">Phone No:</label>
              <input
                className="input-style rounded-lg"
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder=""
              />
            </div>
            <div className="flex flex-col my-5">
              <label className="text-base mx-1">Email ID:</label>
              <input
                className="input-style rounded-lg"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="abc@gmail.com"
              />
            </div>

          </div>
          <div className="w-full lg:w-1/2 p-2 text-start">
            <div className="flex flex-col">
              <label className="text-base mx-1">Branch Code:</label>
              <input
                className="input-style rounded-lg"
                type="number"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter Branch Code"
              />
            </div>

            <div className="flex flex-col my-5">
              <label className="text-base mx-1">District:</label>
              <input
                className="input-style rounded-lg"
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                placeholder="Enter Your District Name"
              />
            </div>

            <div className="flex flex-col my-5">
              <label className="text-base mx-1">Pincode:</label>
              <input
                className="input-style rounded-lg"
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="805110"
              />
            </div>
            <div className="flex flex-col my-5">
              <label className="text-base mx-1">Mobile No:</label>
              <input
                className="input-style rounded-lg"
                type="number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="+91"
              />
            </div>
            <div className="flex flex-col my-5">
              <label className="text-base mx-1">Concern Person</label>
              <input
                className="input-style rounded-lg"
                type="text"
                value={person}
                onChange={(e) => setPerson(e.target.value)}
                placeholder="Enter Name"
              />
            </div>
          </div>
          <div className="w-full p-2">
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




      // </dibase
      // </div>
  )
}

export default AddBranch