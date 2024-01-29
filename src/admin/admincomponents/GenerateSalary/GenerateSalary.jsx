import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {toast } from "react-toastify";
import axios from "axios";

function GenerateSalary() {
  const [salaryList, setSalaryList] = useState([]);
  const [hrname, setHrName] = useState("");
  const [months, setMonths] = useState("");
  const [persentday, setPersentday] = useState("");
  const [halfday, setHalfday] = useState("");
  const [absent, setAbsent] = useState("");
  const [salaries, setSalaries] = useState("");
  const [monthsalary, setMonthsalary] = useState("");
  const [monthleave, setMonthleave] = useState("");
  const [totaldays, setTotaldays] = useState("");
  const [incentive, setIncentive] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
console.log(months);
  useEffect(() => {
    axios.get("https://eleedomimf.onrender.com/dashboard/hr/viewsalary").then((response) => {
      setSalaryList(response.data);
    });
  }, []);

  const handleEmployeeChange = (selectedEmployee) => {
    // Find the selected employee object from the salaryList
    const selectedEmp = salaryList.find((emp) => emp.hrname === selectedEmployee);
    // console.log(selectedEmp);
    // Update state values based on the selected employee
    setHrName(selectedEmployee);
    setMonthleave(selectedEmp ? selectedEmp.hrmonthlyLeave : "");
    setMonthsalary(selectedEmp ? selectedEmp.hrmonthlySalary : "");
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("https://eleedomimf.onrender.com/dashboard/hr/gensalary", {
        hrname: hrname.toString(),
        presenthrDays: persentday,
        totalhrHalfDays: halfday,
        totalhrAbsent: absent,
        genhrSalary: salaries,
        hrmonthlySalary: monthsalary,
        genhrMonths: months,
        hrmonthlyLeave: monthleave,
        totalhrDays: totaldays,
        hrincentive: incentive,
        totalhrAmount: amount,
      });

      if (response.data) {
        toast.success("Added Successfully!");
        // Reset the form and loading state on successful submission
        setHrName("");
        setMonths("");
        setPersentday("");
        setHalfday("");
        setAbsent("");
        setSalaries("");
        setMonthsalary("");
        setMonthleave("");
        setTotaldays("");
        setIncentive("");
        setAmount("");
        setLoading(false);

      } else {
        toast.error("Error Occurred. Try again...!");
      }
    } catch (error) {
      console.error("Error during salary generation:", error.response);
      toast.error("Error Occurred. Try again...!");
      setLoading(false);
    }
  };

  return (
    <section className="container-fluid h-screen relative p-0 sm:ml-64 bg-white">
      <div className="container-fluid flex justify-center p-2  border-gray-200 border-dashed rounded-lg bg-white">
        <div className="relative w-full lg:w-full  p-0 lg:p-4 rounded-xl shadow-xl text-2xl  items-center bg-slate-400">
          <h1 className="font-semibold text-3xl mb-8 text-white dark:text-black ">Generate HR Salary</h1>
          <form className="flex flex-wrap">
            <div className="w-full lg:w-1/2 p-2 text-start">
              <div className="flex flex-col ">
                <label className="text-base mx-1">Name</label>
                <select
                  className="input-style rounded-lg text-base h-10"
                  
                  value={hrname}
                  onChange={(e) => handleEmployeeChange(e.target.value)}
                  name="hrname"

                  >
                  <option value="" disabled className="text-base">
                    ----- Select HR -----
                  </option>
                  {salaryList.map((salary) => (
                    <option key={salary._id} value={salary.hrname} className="text-base">
                      {salary.hrname}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col my-5 ">
                <label className="text-base mx-1">Monthly Leave:</label>
                <input
                  className="input-style rounded-lg"
                  type="number"
                  min="0"
                  max="12"
                  value={monthleave}
                  onChange={(e) => setMonthleave(e.target.value)}
                  name="hrmonthlyLeave"
                  placeholder={monthleave}
                  readOnly
                />
              </div>

              <div className="flex flex-col my-5">
                <label className="text-base mx-1">Total Days:</label>
                <input
                  className="input-style rounded-lg"
                  type="number"
                  min="0"
                  value={totaldays}
                  onChange={(e) => setTotaldays(e.target.value)}
                  name="totalhrDays"
                  placeholder=""
                />
              </div>

              <div className="flex flex-col my-5">
                <label className="text-base mx-1">Total Half Days:</label>
                <input
                  className="input-style rounded-lg"
                  type="number"
                  min="0"
                  value={halfday}
                  onChange={(e) => setHalfday(e.target.value)}
                  name="totalhrHalfDays"
                />
              </div>

              <div className="flex flex-col my-5">
                <label className="text-base mx-1">Salary:</label>
                <input
                  className="input-style rounded-lg"
                  type="number"
                  min="0"
                  value={salaries}
                  onChange={(e) => setSalaries(e.target.value)}
                  name="genhrSalary"
                  placeholder="₹"
                />
              </div>

              <div className="flex flex-col my-5">
                <label className="text-base mx-1">Total Amount:</label>
                <input
                  className="input-style rounded-lg"
                  type="number"
                  min="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  name="totalhrAmount"
                  placeholder="₹"
                  
                />
              </div>
            </div>

            
            {/* part-2 */}
            <div className="w-full lg:w-1/2 p-2 text-start">
              <div className="flex flex-col">
                <label className="text-base mx-1">Monthly Salary:</label>
                <input
                  className="input-style rounded-lg"
                  type="number"
                  min="0"
                  value={monthsalary}
                  onChange={(e) => setMonthsalary(e.target.value)}
                  name="hrmonthlySalary"
                  placeholder=""
                  readOnly
                />
              </div>
              <div className="flex flex-col my-5 ">
                <label className="text-base mx-1">Months:</label>
                <select
                  className="input-style rounded-lg"
                  type="text"
                  value={months}
                  onChange={(e) => setMonths(e.target.value)}
                  name="genhrMonths"
                  >
                    
                  <option value="" disabled>----- Select Month&apos;s -----</option>
                  <option value={"January"}>January</option>
                  <option value={"Febuary"}>Febuary</option>
                  <option value={"March"}>March</option>
                  <option value={"April"}>April</option>
                  <option value={"May"}>May</option>
                  <option value={"June"}>June</option>
                  <option value={"July"}>July</option>
                  <option value={"August"}>August</option>
                  <option value={"September"}>September</option>
                  <option  value={"October"}>October</option>
                  <option  value={"November"}>November</option>
                  <option  value={"December"}>December</option>
                </select>
              </div>

              <div className="flex flex-col my-5">
                <label className="text-base mx-1">Present Days:</label>
                <input
                  className="input-style rounded-lg"
                  type="number"
                  min="0"
                  value={persentday}
                  onChange={(e) => setPersentday(e.target.value)}
                  name="presenthrDays"
                />
              </div>

              <div className="flex flex-col my-5">
                <label className="text-base mx-1">Total Absent:</label>
                <input
                  className="input-style rounded-lg"
                  type="number"
                  min="0"
                  value={absent}
                  onChange={(e) => setAbsent(e.target.value)}
                  name="totalhrAbsent"
                />
              </div>

              <div className="flex flex-col my-5">
                <label className="text-base mx-1">Incentive:</label>
                <input
                  className="input-style rounded-lg"
                  type="number"
                  min="0"
                  value={incentive}
                  onChange={(e) => setIncentive(e.target.value)}
                  name="hrincentive"
                  placeholder="₹"
                />
              </div>
            </div>

            <div className="w-full p-2">
              <button
                className="text-white bg-gradient-to-r leading-4 from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg shadow-lg shadow-blue-500/50  dark:shadow-lg dark:shadow-blue-800/80 text-sm px-5 py-2.5 text-center me-2 mb-2"
                onClick={handleSubmit}
                type="button"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
              
              <NavLink to="/dashboard/view/generatesalary" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-6 py-2 text-center me-2 mb-2">
                {/* <ViewBranch/> */}
                View
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default GenerateSalary;
