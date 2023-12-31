import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

function GenerateSalary() {
  const [salaryList, setSalaryList] = useState([]);
  const [empname, setEmpname] = useState("");
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

  useEffect(() => {
    axios.get("https://eleedomimf.onrender.com/api/salary-lists").then((response) => {
      setSalaryList(response.data);
    });
  }, []);

  const handleEmployeeChange = (selectedEmployee) => {
    // Find the selected employee object from the salaryList
    const selectedEmp = salaryList.find((emp) => emp._id === selectedEmployee);
    console.log(selectedEmp);
    // Update state values based on the selected employee
    setEmpname(selectedEmployee);
    setMonthleave(selectedEmp ? selectedEmp.saleavemonth : "");
    setMonthsalary(selectedEmp ? selectedEmp.salmonth : "");
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Your form submission logic
  };

  return (
    <section className="container-fluid h-screen relative p-0 sm:ml-64 bg-gradient-to-r from-indigo-400 to-cyan-400">
      <div className="container-fluid flex justify-center p-2  border-gray-200 border-dashed rounded-lg dark:border-gray-700  bg-gradient-to-r from-indigo-400 to-cyan-400">
        <div className="relative w-full lg:w-full  p-0 lg:p-4 rounded-xl shadow-xl text-2xl  items-center bg-gradient-to-r from-indigo-300 to-cyan-400">
          <h1 className="font-semibold text-3xl mb-8 text-white dark:text-black ">Generate Salary</h1>
          <form className="flex flex-wrap">
            <div className="w-full lg:w-1/2 p-2 text-start">
              <div className="flex flex-col ">
                <label className="text-base mx-1">Employee Name</label>
                <select
                  className="input-style rounded-lg text-base h-10"
                  name="empadd"
                  value={empname}
                  onChange={(e) => handleEmployeeChange(e.target.value)}>
                  <option value="" disabled className="text-base">
                    ----- Select Employee -----
                  </option>
                  {salaryList.map((salary) => (
                    <option key={salary._id} value={salary._id} className="text-base">
                      {salary.empName}
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
                  placeholder=""
                  readOnly
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
                  placeholder="₹"
                  readOnly
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
                  value={monthsalary}
                  onChange={(e) => setMonthsalary(e.target.value)}
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
                  onChange={(e) => setMonths(e.target.value)}>
                  <option key="0" value="" disabled>----- Select Month&apos;s -----</option>
                  <option key="1" value={"January"}>January</option>
                  <option key="2" value={"Febuary"}>Febuary</option>
                  <option key="3" value={"March"}>March</option>
                  <option key="4" value={"April"}>April</option>
                  <option key="5" value={"May"}>May</option>
                  <option key="6" value={"June"}>June</option>
                  <option key="7" value={"July"}>July</option>
                  <option key="8" value={"August"}>August</option>
                  <option key="9" value={"September"}>September</option>
                  <option key="10" value={"October"}>October</option>
                  <option key="11" value={"November"}>November</option>
                  <option key="12" value={"December"}>December</option>
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
                  placeholder=""
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
                  placeholder="₹"
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
              
              <NavLink to="/dashboard/viewgeneratesalary" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-6 py-2 text-center me-2 mb-2">
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
