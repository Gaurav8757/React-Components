import { useState } from "react";

function AddSalary() {
  const [selectemployee, setSelectemployee] = useState();
  const [monthsalary, setMonthsalary] = useState();
  const [monthleave, setMonthleave] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    setSelectemployee("");
    setMonthsalary();
    setMonthleave();
  }
  return (
    <section className="container-fluid relative h-screen p-0 sm:ml-64 bg-gradient-to-r from-indigo-400 to-cyan-400">
      <div className="container-fluid flex justify-center p-2  border-gray-200 border-dashed rounded-lg dark:border-gray-700  bg-gradient-to-r from-indigo-400 to-cyan-400">

        <div className="relative w-full lg:w-full  p-0 lg:p-4 rounded-xl shadow-xl text-2xl  items-center bg-gradient-to-r from-indigo-300 to-cyan-400">
          <h1 className="font-semibold text-3xl mb-8 text-white dark:text-black ">Add Employee</h1>
          <form className="flex flex-wrap">
            <div className="w-full lg:w-1/2 p-2 text-start">
              <div className="flex flex-col ">
                <label className="text-base mx-1">  Employee:</label>
                <select
                  className="input-style rounded-lg"
                  type="text"
                  value={selectemployee}
                  onChange={(e) => setSelectemployee(e.target.value)}
                  placeholder="Enter Employee Name"
                >
                  <option defaultValue="" selected>----- Select Employee -----</option>
                  <option value="id">emp-name , id</option>
                  <option value="id">emp-name , id</option>
                  <option value="id">emp-name , id</option>
                </select>
              </div>
              <div className="flex flex-col py-5">
                <label className="text-base mx-1">Leave Monthly:</label>
                <input
                  className="input-style rounded-lg"
                  type="number"
                  min="0"
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
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default AddSalary;