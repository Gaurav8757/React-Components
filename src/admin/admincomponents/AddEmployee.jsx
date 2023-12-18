import { useState } from "react";
function AddEmployee() {
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [aadharfile, setAadharfile] = useState([]);
  const [empid, setEmpid] = useState();
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState();
  const [designation, setDesignation] = useState("");
  const [calendar, setCalendar]  = useState("");
  const [empname, setEmpname] = useState("");
  const [aadhar, setAadhar] = useState();
  const [branch, setBranch] = useState("");
  const [joining ,setJoining] = useState("");
  const [permanentaddress, setPermanentaddress] = useState("");
  const handleSubmit = (e) => {
      e.preventDefault();
      setEmail("");
      setMobile();
      setBranch("");
      setCalendar();
      setAddress("");
      setGender("");
      setAadharfile("");
      setEmpname("");
      setEmpid();
      setDesignation("");
      setAadhar();
      setBranch("");
  };
  
  return (
     <section className="container-fluid relative p-0 sm:ml-64 bg-gradient-to-r from-indigo-400 to-cyan-400">
    <div className="container-fluid flex justify-center p-2  border-gray-200 border-dashed rounded-lg dark:border-gray-700  bg-gradient-to-r from-indigo-400 to-cyan-400">
      
      <div className="relative w-full lg:w-full  p-0 lg:p-4 rounded-xl shadow-xl text-2xl  items-center bg-gradient-to-r from-indigo-300 to-cyan-400">
      <h1 className="font-semibold text-3xl mb-8 text-white dark:text-black ">Add Employee</h1>
        <form className="flex flex-wrap">
          <div className="w-full lg:w-1/2 p-2 text-start">
          <div className="flex flex-col">
              <label className="text-base mx-1 ">Employee Name:</label>
              <input
                className="input-style rounded-lg"
                type="text"
                value={empname}
                onChange={(e) => setEmpname(e.target.value)}
                placeholder="Enter Name"
              />
            </div>

            <div className="flex flex-col my-5">
              <label className="text-base mx-1">DOB:</label>
              <input
                className="input-style rounded-lg"
                type="date"
                value={calendar}
                onChange={(e) => setCalendar(e.target.value)}
                placeholder="Enter Branch Code"
              />
            </div>
           
            <div className="flex flex-col my-5">
              <label className="text-base mx-1">Mobile No:</label>
              <input
                className="input-style rounded-lg"
                type="number"
                min="1"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="+91"
              />
            </div>

            <div className="flex flex-col my-5">
              <label className="text-base mx-1">Aadhar No.:</label>
              <input
                className="input-style rounded-lg"
                type="text"
                value={aadhar}
                onChange={(e) => setAadhar(e.target.value)}
                placeholder=""
              />
            </div>

            <div className="flex flex-col my-5">
              <label className="text-base mx-1">Joining Date:</label>
              <input
                className="input-style rounded-lg"
                type="date"
                value={joining}
                onChange={(e) => setJoining(e.target.value)}
                placeholder=""
              />
            </div>
          
            <div className="flex flex-col my-5">
              <label className="text-base mx-1">Current Address:</label>
              <textarea
                className="input-style rounded-lg"
                type="text"
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter Your Address"
              />
            </div>
           
            <div className="flex flex-col my-5">
              <label className="text-base mx-1">Designation:</label>
              <input
                className="input-style rounded-lg"
                type="text"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                placeholder=""
              />
            </div>

          </div>



          <div className="w-full lg:w-1/2 p-2 text-start">
          <div className="flex flex-col ">
              <label className="text-base mx-1">Gender:</label>
              <select
                className="input-style rounded-lg"
                type="text"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                placeholder="Enter Your District Name"
              >
                <option value="0" selected>----- Select Gender -----</option>
                <option value="1">Male</option>
                <option value="2">Female</option>
                <option value="3">Others</option>
              </select>
              
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
            <div className="flex flex-col my-5">
              <label className="text-base mx-1">Employee Id:</label>
              <input
                className="input-style rounded-lg"
                type="text"
                value={empid}
                onChange={(e) => setEmpid(e.target.value)}
                placeholder="789"
              />
            </div>
           
            <div className="flex flex-col my-5">
              <label className="text-base mx-1">Upload Aadhar Card:</label>
              <input
                className="input-style border w-full h-10 items-center rounded-lg"
                type="file"
                value={aadharfile}
                onChange={(e) => setAadharfile(e.target.value)}
                placeholder=""
              />
            </div>

            <div className="flex flex-col ">
              <label className="text-base mx-1">  Branch:</label>
              <select
                className="input-style rounded-lg"
                type="text"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                placeholder="Enter Branch Name"
              >
                <option value="0" selected>----- Select Branch -----</option>
                <option value="1">M</option>
                <option value="2">F</option>
                <option value="3">O</option>
              </select>
            </div>

            <div className="flex flex-col my-5">
              <label className="text-base mx-1">Permanent Address:</label>
              <textarea
                className="input-style rounded-lg"
                type="text"
                rows={2}
                value={permanentaddress}
                onChange={(e) => setPermanentaddress(e.target.value)}
                placeholder="Enter Your Address"
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
  )
}

export default AddEmployee;