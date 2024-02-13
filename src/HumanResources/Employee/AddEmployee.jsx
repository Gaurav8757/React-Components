import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import axios from "axios";

function AddEmployee() {
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [empid, setEmpid] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [designation, setDesignation] = useState("");
  const [calendar, setCalendar] = useState("");
  const [empname, setEmpname] = useState("");
  const [aadharno, setAadharno] = useState("");
  const [panno, setPanno] = useState("");
  const [branch, setBranch] = useState("");
  const [joining, setJoining] = useState("");
  const [accNumber, setAccNumber] = useState("");
  const [ifsc, setIfsce] = useState("");
  const [bankName, setBankName] = useState("");
  const [permanentaddress, setPermanentaddress] = useState("");
  const [branchList, setBranchList] = useState([]);
  const [staffType, setStaffType] = useState("");
  const [type, setType] = useState([]);
  const [view, setView] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [pan, setPan] = useState("");
  const [isChecked, setIsChecked] = useState(false);


  
  useEffect(() => {
    // Fetch the list of branches when the component mounts
    axios.get("https://eleedomimf.onrender.com/api/branch-list").then((resp) => {
      setBranchList(resp.data);
    });

  }, []);
  useEffect(() => {
    // Fetch the list of branches when the component mounts
    axios.get("https://eleedomimf.onrender.com/staff/lists").then((resp) => {
      setType(resp.data);

    });
  }, []);

  const handleCheckboxChange = () => {
    if (!isChecked) {
      setAddress(permanentaddress);
    } else {
      setAddress("");
    }
    setIsChecked(!isChecked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent multiple submissions
    if (formSubmitted) {
      return;
    }
    setErrors({}); // Clear previous errors

    const errors = {};
    if (!aadhar) {
      errors.aadhar = "required*";
    }
    if (panno) {
      errors.panno = "required*";
    }

    if (!empid) {
      errors.empid = "required*";
    }
    if (!empname) {
      errors.empname = "required*";
    }

    if (!calendar) {
      errors.calendar = "required*";
    }
    if (!gender) {
      errors.gender = "required*";
    }
    if (!mobile) {
      errors.mobile = "required*";
    }
    if (!email) {
      errors.email = "required*";
    }
    if (!aadharno) {
      errors.aadharno = "required*";
    }else if(!/^[0-9]{12}$/.test(aadharno) ){
      errors.aadharno = "should be only 12 numbers*";
    }
    if (!branch) {
      errors.branch = "required*";
    }
    if (!joining) {
      errors.joining = "required*";
    }
    if (!accNumber) {
      errors.accNumber = "required*";
    }
    if (!ifsc) {
      errors.ifsc = "required*";
    }
    if (!bankName) {
      errors.bankName = "required*";
    }
    if (!staffType) {
    errors.staffType = "required*";
    }
    if (!permanentaddress) {
      errors.permanentaddress = "required*";
      }
    if (!pan ) {
    errors.pan = "required*";
    }else if(!/^[A-Za-z0-9]{10}$/.test(pan) ){
      errors.pan = "should be only 10 characters*";
    }




    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }


    try {
      const formData = new FormData();

      formData.append("empaadharfile", aadhar);
      formData.append("empid", empid);
      formData.append("empname", empname);
      formData.append("empdob", calendar);
      formData.append("empgender", gender);
      formData.append("empemail", email.toLowerCase());
      formData.append("empmobile", mobile);
      formData.append("empjoiningdate", joining);
      formData.append("empbranch", branch);
      formData.append("currentempaddress", address);
      formData.append("permanentempaddress", permanentaddress);
      formData.append("empaadharno", aadharno);
      formData.append("empdesignation", designation);
      formData.append("staffType", staffType);
      formData.append("accNumber", accNumber);
      formData.append("bankName", bankName);
      formData.append("ifsc", ifsc);
      formData.append("pan", pan);
      formData.append("panno", panno);

      // Make sure to replace this URL with your actual API endpoint
      const response = await axios.post(
        "https://eleedomimf.onrender.com/dashboard/addemployee",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setView(response.data);
      if (response.data) {
        toast.success("Employee added successfully!");
        setFormSubmitted(true);
        // Reset the form on successful submission
        setAccNumber("");
        setIfsce("");
        setBankName("");
        setAddress("");
        setGender("");
        setAadhar("");
        setEmpid("");
        setEmail("");
        setMobile("");
        setDesignation("");
        setCalendar("");
        setEmpname("");
        setAadharno("");
        setBranch("");
        setJoining("");
        setStaffType("");
        setPermanentaddress("");
        setPanno("");
        setPan("");
      } else {
        toast.error("Error Occurred. Try again!");
      }
    } catch (error) {
      toast.error("Error during employee registration. Please try again.");
    }
  };

  return (
    <section className="container-fluid relative p-0 sm:ml-64 bg-white">
      <div className="container-fluid flex justify-center p-2   rounded-lg   bg-white">
        <div className="relative w-full lg:w-full  p-0 lg:p-4 rounded-xl shadow-xl text-2xl  items-center bg-gradient-to-r from-slate-400 to-slate-400">
          <h1 className="font-semibold text-3xl mb-8 text-white dark:text-black ">Add Employee</h1>
          <form className="flex flex-wrap justify-between" method="POST" encType="multipart/form-data">
           
              <div className="flex flex-col  p-2 text-start w-full lg:w-1/3">
                <label className="text-base mx-1 ">Employee Name:</label>
                <input
                  className="input-style rounded-lg"
                  type="text"
                  name="empname"
                  value={empname.toUpperCase()}
                  onChange={(e) => setEmpname(e.target.value)}
                  placeholder="Enter Name"
                />
                {errors.empname && <span className="text-red-600 text-sm ">{errors.empname}</span>}
              </div>

              <div className="flex flex-col p-2 text-start w-full lg:w-1/3">
                <label className="text-base mx-1">DOB:</label>
                <input
                  className="input-style rounded-lg"
                  type="date"
                  name="empdob"
                  value={calendar}
                  onChange={(e) => setCalendar(e.target.value)}
                  placeholder="Enter Branch Code"
                />
                {errors.calendar && <span className="text-red-600 text-sm ">{errors.calendar}</span>}
              </div>
              <div className="flex flex-col p-2 text-start w-full lg:w-1/3 ">
                <label className="text-base mx-1">Designation:</label>
                <select
                  className="input-style rounded-lg"
                  type="text"
                  value={staffType.toUpperCase()}
                  name="staffType"
                  onChange={(e) => setStaffType(e.target.value)}>
                  <option value="">----- Select -----</option>
                  {
                    type.map((data) => (
                      <option key={data._id} value={data.s_type}>{data.s_type}</option>
                    ))
                  }
                </select>
                {errors.staffType && <span className="text-red-600 text-sm ">{errors.staffType}</span>}
              </div>
              <div className="flex flex-col p-2 text-start w-full lg:w-1/3">
                <label className="text-base mx-1">Gender:</label>
                <select
                  className="input-style rounded-lg"
                  type="text"
                  value={gender.toUpperCase()}
                  name="empgender"
                  onChange={(e) => setGender(e.target.value)}
                  placeholder="Enter Your District Name"
                >
                  <option value="">----- Select Gender -----</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="others">Others</option>
                </select>
                {errors.gender && <span className="text-red-600 text-sm ">{errors.gender}</span>}
              </div>

              <div className="flex flex-col p-2 text-start w-full lg:w-1/3">
                <label className="text-base mx-1">Email ID:</label>
                <input
                  className="input-style rounded-lg"
                  type="email"
                  name="empemail"
                  value={email.toUpperCase()}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="abc@gmail.com"
                />
                {errors.email && <span className="text-red-600 text-sm ">{errors.email}</span>}
              </div>
             

              <div className="flex flex-col p-2 text-start w-full lg:w-1/3">
                <label className="text-base mx-1">Employee Id:</label>
                <input
                  className="input-style rounded-lg"
                  type="text"
                  name="empid"
                  value={empid.toUpperCase()}
                  onChange={(e) => setEmpid(e.target.value)}
                  placeholder="EIPL-000"
                />
                {errors.empid && <span className="text-red-600 text-sm ">{errors.empid}</span>}
              </div>
              <div className="flex flex-col p-2 text-start w-full lg:w-1/3">
                <label className="text-base mx-1">Mobile No:</label>
                <input
                  className="input-style rounded-lg"
                  type="number"
                  min="1"
                  name="empmobile"
                  value={mobile.toUpperCase()}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="+91"
                />
                {errors.mobile && <span className="text-red-600 text-sm ">{errors.mobile}</span>}
              </div>

              <div className="flex flex-col p-2 text-start w-full lg:w-1/3">
                <label className="text-base mx-1">Aadhar No.:</label>
                <input
                  className="input-style rounded-lg"
                  type="number"
                  name="aadharno"
                  value={aadharno}
                  onChange={(e) => setAadharno(e.target.value)}
                  placeholder=""
                  max="12"
                />
                {errors.aadharno && <span className="text-red-600 text-sm ">{errors.aadharno}</span>}
              </div>
              <div className="flex flex-col p-2 text-start w-full lg:w-1/3">
                <label className="text-base mx-1">Upload Aadhar Card:</label>
                <input
                  className="input-style border w-full h-10 items-center rounded-lg"
                  type="file"
                  name="empaadharfile"
                  accept="/*" //accepting all type of images
                  onChange={(e) => setAadhar(e.target.files[0])}
                  autoComplete="off"
                />
                {errors.aadhar && <span className="text-red-600 text-sm ">{errors.aadhar}</span>}
              </div>
              <div className="flex flex-col p-2 text-start w-full lg:w-1/3">
                <label className="text-base mx-1">Account No.:</label>
                <input
                  className="input-style rounded-lg"
                  type="number"
                  name="accNumber"
                  value={accNumber}
                  onChange={(e) => setAccNumber(e.target.value)}
                  placeholder="Enter Account Number"
                />
                {errors.accNumber && <span className="text-red-600 text-sm ">{errors.accNumber}</span>}
              </div>
              <div className="flex flex-col p-2 text-start w-full lg:w-1/3">
                <label className="text-base mx-1">IFSC Code:</label>
                <input
                  className="input-style rounded-lg"
                  type="text"
                  name="ifsc"
                  value={ifsc.toUpperCase()}
                  onChange={(e) => setIfsce(e.target.value)}
                  placeholder="Enter IFSC Code"
                />
                {errors.ifsc && <span className="text-red-600 text-sm ">{errors.ifsc}</span>}
              </div>
              <div className="flex flex-col p-2 text-start w-full lg:w-1/3">
                <label className="text-base mx-1">Bank Name:</label>
                <input
                  className="input-style rounded-lg"
                  type="text"
                  name="bankName"
                  value={bankName.toUpperCase()}
                  onChange={(e) => setBankName(e.target.value)}
                  placeholder="Enter Bank Name"
                />
                {errors.bankName && <span className="text-red-600 text-sm ">{errors.bankName}</span>}
              </div>


              <div className="flex flex-col p-2 text-start w-full lg:w-1/3">
                <label className="text-base mx-1">Pan No.:</label>
                <input
                  className="input-style rounded-lg"
                  type="text"
                  name="pan"
                  value={pan.toUpperCase()}
                  onChange={(e) => setPan(e.target.value)}
                  placeholder="AKRPD1222Q"
                  min="10"
                />
                {errors.pan && <span className="text-red-600 text-sm ">{errors.pan}</span>}
              </div>

             
              <div className="flex flex-col p-2 text-start w-full lg:w-1/3">
                <label className="text-base mx-1">Upload Pan Card:</label>
                <input
                  className="input-style border w-full h-10 items-center rounded-lg"
                  type="file"
                  name="panno"
                  accept="/*" //accepting all type of images
                  onChange={(e) => setPanno(e.target.files[0])}
                  autoComplete="off"
                />
                {errors.panno && <span className="text-red-600 text-sm ">{errors.panno}</span>}
              </div>
              

              <div className="flex flex-col p-2 text-start w-full lg:w-1/3">
                <label className="text-base mx-1">Joining Date:</label>
                <input
                  className="input-style rounded-lg"
                  type="date"
                  value={joining}
                  name="empjoiningdate"
                  onChange={(e) => setJoining(e.target.value)}
                  placeholder=""
                />
                {errors.joining && <span className="text-red-600 text-sm ">{errors.joining}</span>}
              </div>
              <div className="flex flex-col p-2 text-start w-full lg:w-1/3 ">
                <label className="text-base mx-1">  Branch:</label>
                <select
                  className="input-style rounded-lg"
                  type="text"
                  name="empbranch"
                  value={branch.toUpperCase()}
                  onChange={(e) => setBranch(e.target.value)}
                  placeholder="Enter Branch Name"
                >
                  <option value="0">----- Select Branch -----</option>
                  {branchList.map((branchItem) => (
                    <option key={branchItem._id} value={branchItem.branchname}>
                      {branchItem.branchname}
                    </option>
                  ))}
                </select>
                {errors.branch && <span className="text-red-600 text-sm ">{errors.branch}</span>}
              </div>
              <div className="flex flex-col p-2 text-start w-full lg:w-1/3">
                <label className="text-base mx-1">Permanent Address:</label>
                <textarea
                  className="input-style rounded-lg"
                  type="text"
                  rows={2}
                  name="permanentempaddress"
                  value={permanentaddress.toUpperCase()}
                  onChange={(e) => setPermanentaddress(e.target.value)}
                  placeholder="Enter Your Address"
                />
                {errors.permanentaddress && <span className="text-red-600 text-sm ">{errors.permanentaddress}</span>}
              </div>
              <div className="flex flex-col p-2 text-start w-full lg:w-1/3">
              <label htmlFor="green-checkbox" className="text-base mx-1 text-blue-700 font-bold">Use Permanent Address as Current Address:
                <input type="checkbox" name="usePermanentAddress" className="w-4 h-4 mx-2 text-green-600 bg-gray-300 border-gray-300 rounded focus:ring-green-500   focus:ring-1"
                  checked={isChecked}
                 id="green-checkbox"
                  onChange={handleCheckboxChange}/>
                    </label>
                  {/* </input> */}

                <label className="text-base mx-1">Current Address:</label>
                <textarea
                  className="input-style rounded-lg"
                  type="text"
                  rows={2}
                  name="currentempaddress"
                  value={address.toUpperCase()}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter Your Address"
                />
              </div>

           
            <div className="w-full p-2 mt-10">
              <button
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2"
                onClick={handleSubmit}
                type="button"
                disabled={formSubmitted}
              >
                {formSubmitted ? "Submitted" : "Submit"}
              </button>

              {view &&
                <NavLink to="/hr/home/viewemployee" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-6 py-2 text-center me-2 mb-2">
                  {/* <ViewBranch/> */}
                  View
                </NavLink>}
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default AddEmployee;