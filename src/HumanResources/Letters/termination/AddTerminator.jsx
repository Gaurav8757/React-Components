import axios from "axios";
import { useEffect, useState } from "react";
// import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import VITE_DATA from "../../../config/config.jsx";

function AddTerminator() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [terminatedate, setTerminateDate] = useState("");
const [currDate, setCurrDate ]= useState("");


  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      toast.error("Not Authorized yet.. Try again! ");
    } else {
      // The user is authenticated, so you can make your API request here.
      axios
        .get(`${VITE_DATA}/api/employee-list`, {
          headers: {
            Authorization: `${token}`, // Send the token in the Authorization header
          },
        })
        .then((response) => {

          setEmployees(response.data);

        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  function getFormattedDate() {
    const date = new Date();
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

const date = getFormattedDate();
useEffect( () => {setCurrDate(date)}, [date] );

const handleEmployeeChange = (e) => {
  setSelectedEmployeeId(e.target.value);
};

const handleSubmit = async (e) => {
  e.preventDefault();
  if (formSubmitted) {
    return;
  }

  try {
    const response = await axios.put(
      `${VITE_DATA}/api/salary/update/${selectedEmployeeId}`,
      { 
        terminatedate, currDate}
    );

    if (response.data) {
      toast.success(`Termination of ${response.data.message.updatedSalary.empname} Created....!`);
      setFormSubmitted(true);
      setSelectedEmployeeId("");
      setTerminateDate("");
    } else {
      toast.error("Error Occurred. Try again...! ");
    }
  } catch (error) {
    console.error("Error during Terminate Enployee...!", error.response);
  } finally {
    setFormSubmitted(false);
  }
};

  return (
    <section className="container-fluid relative p-0 sm:ml-64 bg-white">
    <h1 className="font-semibold text-3xl mt-20 ">Create Termination Letter</h1>
    <div className="container-fluid flex justify-center p-2 border-gray-200 border-dashed rounded-lg  bg-white">

      <div className="relative w-full lg:w-full p-0 lg:p-4 rounded-xl shadow-xl text-2xl items-center bg-slate-200">

        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap justify-between">
          <div className="flex flex-col p-2 text-start w-full lg:w-1/4">
              <label className="text-base mx-1">Current Date</label>
              <input
                className="input-style rounded-lg"
                type="text"
                value={currDate}
                onChange={(e) => setCurrDate(e.target.value)}
                placeholder="Current Date"
                readOnly
              />
            </div>
            <div className="flex flex-col p-2 text-start w-full lg:w-1/4">
              <label className="text-base mx-1">Select Employee</label>
              <select
                className="input-style p-1 text-lg rounded-lg"
                value={selectedEmployeeId}
                onChange={handleEmployeeChange}
              >
                <option value="">------------- Select Employee -----------</option>
                {employees.map((employee) => (
                  <option key={employee._id} value={employee._id} >
                    {employee.empid} - {employee.empname}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col p-2 text-start w-full lg:w-1/4">
              <label className="text-base mx-1">Termination Date</label>
              <input
                className="input-style rounded-lg"
                type="date"
                value={terminatedate}
                onChange={(e) => setTerminateDate(e.target.value)}
               
              />
            </div>
            <div className="flex flex-col p-2 text-start w-full lg:w-1/4"></div>
          </div>
          <div className="flex justify-center p-2 text-center w-full my-2 mt-10 gap-10">
            <button
              className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-6 py-2.5 text-center me-2 mb-2"
              type="submit"
              disabled={formSubmitted}
            >
              {formSubmitted ? "Submitted" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
  )
}

export default AddTerminator;