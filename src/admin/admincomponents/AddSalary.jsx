import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
function AddSalary() {
  const [employeeList, setEmployeeList] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [monthsalary, setMonthsalary] = useState("");
  const [monthleave, setMonthleave] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch the list of employees when the component mounts
    axios.get("https://eleedomimf.onrender.com/api/employee-list").then((response) => {
      setEmployeeList(response.data);
      
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.post("https://eleedomimf.onrender.com/dashboard/addsalary", {
        empName: selectedEmployee,
        salmonth: monthsalary,
        saleavemonth: monthleave,
      });

      if (response.data) {
        toast.success("Salary Added Successfully!");
        // Reset the form and loading state on successful submission
        setSelectedEmployee("");
        setMonthsalary("");
        setMonthleave("");
        setLoading(false);
      } else {
        toast.error("Error Occurred. Try again!");
      }
    } catch (error) {
      console.error("Error during salary submission:", error.response);
      toast.error("Error Occurred. Try again!");
      setLoading(false);
    }
  };


  return (
    <section className="container-fluid relative h-screen p-0 sm:ml-64 bg-gradient-to-r from-indigo-400 to-cyan-400">
      <div className="container-fluid flex justify-center p-2  border-gray-200 border-dashed rounded-lg dark:border-gray-700  bg-gradient-to-r from-indigo-400 to-cyan-400">
        <div className="relative w-full lg:w-full  p-0 lg:p-4 rounded-xl shadow-xl text-2xl  items-center bg-gradient-to-r from-indigo-300 to-cyan-400">
          <h1 className="font-semibold text-3xl mb-8 text-white dark:text-black ">Add Salary</h1>
          <form className="flex flex-wrap">
            <div className="w-full lg:w-1/2 p-2 text-start">
              <div className="flex flex-col ">
                <label className="text-base mx-1">  Employee:</label>
                {/* // Render the dropdown in your form */}
                <select
              className="input-style rounded-lg text-base h-10"
              name="empadd"
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
            >
              <option value="" disabled className="text-base">
                ----- Select Employee -----
              </option>
              {employeeList.map((employee) => (
                <option key={employee.empid} value={employee.empname} className="text-base">
                  {employee.empid} - {employee.empname}
                </option>
              ))}
            </select>
              </div>
              <div className="flex flex-col py-5">
                <label className="text-base mx-1">Monthly Leave:</label>
                <input
                  className="input-style rounded-lg"
                  type="number"
                  min="0"
                  name="monthleave"
                  value={monthleave}
                  onChange={(e) => setMonthleave(e.target.value)}
                  placeholder=""
                />
              </div>
            </div>
            <div className="w-full lg:w-1/2 p-2 text-start">

              <div className="flex flex-col">
                <label className="text-base mx-1">Monthly Salary:</label>
                <input
                  className="input-style rounded-lg"
                  type="number"
                  min="0"
                  name="monthsalary"
                  value={monthsalary}
                  onChange={(e) => setMonthsalary(e.target.value)}
                  placeholder=""
                />
              </div>
            </div>
            <div className="w-full p-2">
              <button
                className="text-white bg-gradient-to-r leading-4 from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                onClick={handleSubmit}
                type="button"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default AddSalary;