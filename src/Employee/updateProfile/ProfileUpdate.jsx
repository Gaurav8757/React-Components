/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function ProfileUpdate() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        // empid: "",
        empname: "",
        empemail: "",
        empmobile: "",
        empgender: "",
        empdob: "",
       
        permanentempaddress: "",
        currentempaddress: "",
        empaadharno: "",
        // empdesignation: "",
        empaadharfile: "",
        // staffType: "",
        panno: "",
        pan: "",
        accNumber: "",
        ifsc: "",
        bankName: ""
    });


const Id = sessionStorage.getItem("employeeId");

useEffect(() => {
    axios.get(`https://eleedomimf.onrender.com/api/employee/${Id}`)
        .then((resp) => {
            const employeeData = resp.data;
            // Update the state with employee data
            setData({
                empid: employeeData.empid,
                empname: employeeData.empname,
                empemail: employeeData.empemail,
                empmobile: employeeData.empmobile,
                empgender: employeeData.empgender,
                empdob: employeeData.empdob,
                permanentempaddress: employeeData.permanentempaddress,
                currentempaddress: employeeData.currentempaddress,
                empaadharno: employeeData.empaadharno,
                panno: employeeData.panno,
                pan: employeeData.pan,
                accNumber: employeeData.accNumber,
                ifsc: employeeData.ifsc,
                bankName: employeeData.bankName,
                empjoiningdate: employeeData.empjoiningdate,
                staffType: employeeData.staffType,
                empbranch: employeeData.empbranch

            });
        })
        .catch((error) => {
            console.error("Error fetching employee data:", error);
        });
}, [Id]);

const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "empaadharfile" || name === "panno") {
        setData((prevData) => ({
            ...prevData,
            [name]: files[0] // assuming single file upload
        }));
    } else {
        setData((prevData) => ({
            ...prevData,
            [name]: value.toUpperCase(),
        }));
    }
};

const updateEmpAPI = async () => {
    try {
        setLoading(true);
        
        const formData = new FormData();
        formData.append("empaadharfile", data.empaadharfile);
        formData.append("panno", data.panno);
        formData.append("pan", data.pan);
        formData.append("accNumber", data.accNumber);
        formData.append("ifsc", data.ifsc);
        formData.append("empid", data.empid);
        formData.append("bankName", data.bankName);
        formData.append("empname", data.empname);
        formData.append("empemail", data.empemail);
        formData.append("empmobile", data.empmobile);
        formData.append("empgender", data.empgender);
        formData.append("empdob", data.empdob);
        formData.append("permanentempaddress", data.permanentempaddress);
        formData.append("currentempaddress", data.currentempaddress);
        formData.append("empaadharno", data.empaadharno);
       

        const response = await axios.put(
            `https://eleedomimf.onrender.com/api/emp/update/${Id}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        );
        toast.success(`${response.data.status}`);
    } catch (error) {
        toast.error(`${error}`);
        console.error("Error updating Employee:", error);
    } finally {
        setLoading(false);
    }
};

    return (
        <>

            <section className="container-fluid relative h-screen p-0 sm:ml-64 bg-slate-200">
                <div className="container-fluid  flex flex-col  justify-center p-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 bg-white">
                    <span className="text-4xl p-8 tracking-wider text-green-700 font-medium">Update Your Profile</span>
                   
                    <div className="container-fluid flex justify-center p-2  border-dashed rounded-lg  bg-slate-200">

                        <form className="flex flex-wrap justify-between">
                        <div className="flex flex-col mt-4 p-2 text-start w-full lg:w-1/3">
                                <label className="text-base  mx-1 ">Employee ID:</label>
                                <input
                                    className="input-style bg-red-50 rounded-lg"
                                    type="text"
                                    value={data.empid}
                                    onChange={handleInputChange}
                                    name="empid"
                                    disabled

                                />
                                  <span className="text-xs mx-2 text-red-500"> Not Editable</span>
                            </div>

                            <div className="flex flex-col mt-4 p-2 text-start w-full lg:w-1/3">
                                <label className="text-base  mx-1 ">Employee Name:</label>
                                <input
                                    className="input-style bg-red-50 rounded-lg"
                                    type="text"
                                    value={data.empname}
                                    onChange={handleInputChange}
                                    name="empname"
                                    disabled

                                />
                                  <span className="text-xs mx-2 text-red-500"> Not Editable</span>
                            </div>
                            <div className="flex flex-col mt-4 p-2 text-start w-full lg:w-1/3">
                                <label className="text-base  mx-1">Email ID:</label>
                                <input
                                    className="input-style bg-red-50 rounded-lg"
                                    type="email"
                                    name="empemail"
                                    value={data.empemail}
                                    onChange={handleInputChange}
                                    placeholder="abc@gmail.com"
                                    disabled
                                />
                                <span className="text-xs mx-2 text-red-500"> Not Editable</span>
                            </div>

                            <div className="flex flex-col mt-4 p-2 text-start w-full lg:w-1/3">
                                <label className="text-base  mx-1">  Branch:</label>
                                <input
                                    className="input-style bg-red-50 rounded-lg"
                                    type="text"
                                    value={data.empbranch}
                                    onChange={handleInputChange}
                                    name="empbranch"
                                    disabled
                                />
                                <span className="text-xs mx-2 text-red-500"> Not Editable</span>
                            </div>
                            <div className="flex flex-col p-2 mt-4 text-start w-full lg:w-1/3">
                                <label className="text-base mx-1">Joining Date:</label>
                                <input
                                    className="input-style bg-red-50 rounded-lg"
                                    type="date"
                                    value={data.empjoiningdate}
                                    onChange={handleInputChange}
                                    name="empjoiningdate"
                                    disabled
                                />
                                <span className="text-xs mx-2 text-red-500"> Not Editable</span>
                            </div>
                            <div className="flex flex-col p-2 mt-4 text-start w-full lg:w-1/3">
                                <label className="text-base mx-1">Designation:</label>
                                <input
                                    className="input-style bg-red-50 rounded-lg"
                                    type="text"
                                    value={data.staffType}
                                    name="staffType"
                                    onChange={handleInputChange}
                                    disabled
                                />
                                <span className="text-xs mx-2 text-red-500"> Not Editable</span>
                            </div>

                            <div className="flex flex-col mt-3 p-2 text-start w-full lg:w-1/3">
                                <label className="text-base mx-1">DOB:</label>
                                <input
                                    className="input-style rounded-lg"
                                    type="date"
                                    value={data.empdob}
                                    onChange={handleInputChange}
                                    name="empdob"
                                    placeholder="Branch Code"
                                />

                            </div>
                            <div className="flex flex-col mt-3 p-2 text-start w-full lg:w-1/3">
                                <label className="text-base mx-1">Gender:</label>
                                <select
                                    className="input-style rounded-lg"
                                    type="text"
                                    value={data.empgender}
                                    onChange={handleInputChange}
                                    name="empgender"
                                >
                                    {/* {data.empgender && (
            <option value={data.empgender}>{data.empgender}</option>
        )} */}
                                    <option value="MALE">MALE</option>
                                    <option value="FEMALE">FEMALE</option>
                                    <option value="OTHERS">OTHERS</option>
                                </select>
                            </div>

                            
                            <div className="flex flex-col mt-3 p-2 text-start w-full lg:w-1/3">
                                <label className="text-base mx-1">Mobile No:</label>
                                <input
                                    className="input-style rounded-lg"
                                    type="number"
                                    min="1"
                                    value={data.empmobile}
                                    onChange={handleInputChange}
                                    name="empmobile"
                                    placeholder="+91"
                                />
                            </div>
                            <div className="flex flex-col mt-4 p-2 text-start w-full lg:w-1/3">
                                <label className="text-base mx-1">Account No.:</label>
                                <input
                                    className="input-style rounded-lg"
                                    type="number"
                                    name="accNumber"
                                    value={data.accNumber}
                                    onChange={handleInputChange}
                                    placeholder="Account Number"
                                />
                            </div>
                            <div className="flex flex-col mt-4 p-2 text-start w-full lg:w-1/3">
                                <label className="text-base mx-1">IFSC Code:</label>
                                <input
                                    className="input-style rounded-lg"
                                    type="text"
                                    name="ifsc"
                                    value={data.ifsc}
                                    onChange={handleInputChange}
                                    placeholder="IFSC Code"
                                />
                            </div>

                            <div className="flex flex-col mt-4 p-2 text-start w-full lg:w-1/3">
                                <label className="text-base mx-1">Bank Name:</label>
                                <input
                                    className="input-style rounded-lg"
                                    type="text"
                                    name="bankName"
                                    value={data.bankName}
                                    onChange={handleInputChange}
                                    placeholder="Bank Name"
                                />
                            </div>
                            <div className="flex flex-col mt-4 p-2 text-start w-full lg:w-1/3">
                                <label className="text-base mx-1">Pan No.:</label>
                                <input
                                    className="input-style rounded-lg"
                                    type="text"
                                    name="pan"
                                    value={data.pan}
                                    onChange={handleInputChange}
                                    placeholder="AKRPD1222Q"
                                    min="10"
                                />
                            </div>

                            <div className="flex flex-col p-2 mt-4 text-start w-full lg:w-1/3">
                                <label className="text-base mx-1">Upload Pan Card:</label>
                                <input
                                    className="input-style border border-zinc-500 w-full h-10 items-center rounded-lg"
                                    type="file"
                                    name="panno"
                                    accept="/*" //accepting all type of images
                                    onChange={handleInputChange}
                                    autoComplete="off"
                                />
                            </div>
                            <div className="flex flex-col p-2 mt-4 text-start w-full lg:w-1/3">
                                <label className="text-base mx-1">Permanent Address:</label>
                                <textarea
                                    className="input-style rounded-lg"
                                    type="text"
                                    rows={2}
                                    value={data.permanentempaddress}
                                    onChange={handleInputChange}
                                    name="permanentempaddress"
                                    placeholder="Your Address"
                                />
                            </div>
                           
                            <div className="flex flex-col p-2 mt-4 text-start w-full lg:w-1/3">
                                <label className="text-base mx-1">Aadhar No:</label>
                                <input
                                    className="input-style rounded-lg"
                                    type="number"
                                    value={data.empaadharno}
                                    onChange={handleInputChange}
                                    name="aadharno"
                                    
                                />
                            </div>
                            <div className="flex flex-col p-2 mt-4 text-start w-full lg:w-1/3">
                                <label className="text-base mx-1">Upload Aadhar Card:</label>
                                <input
                                    className="input-style border border-zinc-500 w-full h-10 items-center rounded-lg"
                                    type="file"
                                    accept="/*" //accepting all type of images
                                    onChange={handleInputChange}
                                    name="empaadharfile"
                                />
                            </div>

                           


                            

                            <div className="flex flex-col p-2 mt-4 text-start w-full lg:w-1/3">
                                <label className="text-base mx-1">Current Address:</label>
                                <textarea
                                    className="input-style rounded-lg"
                                    type="text"
                                    rows={2}
                                    name="currentempaddress"
                                    value={data.currentempaddress}
                                    onChange={handleInputChange}
                                    placeholder="Your Address"
                                />
                            </div>
                            <div className="flex flex-col p-2 text-start w-full lg:w-1/3">

                            </div>

                            <div className="w-full p-1  mt-8 justify-center flex">
                                <button
                                    className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                                    onClick={updateEmpAPI}
                                    type="button"
                                >
                                    {loading ? "Submitting..." : "Submit"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>



        </>
    )
}


export default ProfileUpdate;