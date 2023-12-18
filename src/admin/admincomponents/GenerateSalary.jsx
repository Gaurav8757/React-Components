import { useState } from "react";
function GenerateSalary() {
  const [empname, setEmpname] = useState("");
  const [months, setMonths] = useState("");
  const [persentday, setPersentday] = useState();
  const [halfday, setHalfday] = useState();
  const [absent, setAbsent] = useState();
  const [salaries, setSalaries] = useState()
  const [monthsalary, setMonthsalary] = useState("");
  const [monthleave, setMonthleave] = useState("");
  const [totaldays, setTotaldays] = useState();
  const [incentive, setIncentive] = useState("");
  const [amount, setAmount] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
  }
  return (
    <section className="container-fluid relative p-0 sm:ml-64 bg-gradient-to-r from-indigo-400 to-cyan-400">
      <div className="container-fluid flex justify-center p-2  border-gray-200 border-dashed rounded-lg dark:border-gray-700  bg-gradient-to-r from-indigo-400 to-cyan-400">

        <div className="relative w-full lg:w-full  p-0 lg:p-4 rounded-xl shadow-xl text-2xl  items-center bg-gradient-to-r from-indigo-300 to-cyan-400">
          <h1 className="font-semibold text-3xl mb-8 text-white dark:text-black ">Generate Salary</h1>
          <form className="flex flex-wrap">
            <div className="w-full lg:w-1/2 p-2 text-start">

              <div className="flex flex-col ">
                <label className="text-base mx-1">Employee Name</label>
                <select
                  className="input-style rounded-lg"
                  type="text"
                  value={empname}
                  onChange={(e) => setEmpname(e.target.value)}
                  placeholder="Enter Your District Name"
                >
                  <option value="0" selected>----- Select Gender -----</option>
                  <option value="1">Male</option>
                  <option value="2">Female</option>
                  <option value="3">Others</option>
                </select>
              </div>


              <div className="flex flex-col my-5 ">
                <label className="text-base mx-1">Monthly Leave:</label>
                <input
                  className="input-style rounded-lg"
                  type="number"
                  min="0"
                  value={monthleave}
                  onChange={(e) => setMonthleave(e.target.value)}
                  placeholder=""
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
                  onChange={(e) => setMonths(e.target.value)}
                >
                  <option value="0" selected>----- Select Month&apos;s -----</option>
                  <option value="1">M</option>
                  <option value="2">F</option>
                  <option value="3">O</option>
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
                  placeholder=""

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
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default GenerateSalary