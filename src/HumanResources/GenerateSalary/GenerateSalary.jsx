import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {toast } from "react-toastify";
import axios from "axios";

function GenerateSalary() {
  const [salaryList, setSalaryList] = useState([]);
  const [empName, setEmpname] = useState("");
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
  const [empgrossSalary, setGrossEmpSalary] = useState("");
  const [empbasicSalary, setBasicEmpSalary] = useState("");
  const [emphra, setEmpHra] = useState("");
  const [empca, setEmpCa] = useState("");
  const [empmedical, setEmpMedical] = useState("");
  const [emptiffin, setEmpTiffin] = useState("");
  const [empcompanyPf, setEmpCompanyPf] = useState("");
  const [emppf, setEmpPf] = useState("");
  const [empesi, setEmpESI] = useState("");
  const [emploanemi, setEmpLoanemi] = useState("");
  useEffect(() => {
    axios.get("https://eleedomimf.onrender.com/api/salary-list").then((response) => {
      setSalaryList(response.data);
      
    });
  }, []);

  const handleEmployeeChange = (selectedEmployee) => {
    // Find the selected employee object from the salaryList
    const selectedEmp = salaryList.find((emp) => emp.empName === selectedEmployee);
    // console.log(selectedEmp);
    // Update state values based on the selected employee
    setEmpname(selectedEmployee);
    setMonthleave(selectedEmp ? selectedEmp.saleavemonth : "");
    setMonthsalary(selectedEmp ? selectedEmp.salmonth : "");
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("https://eleedomimf.onrender.com/dashboard/gensalary", {
        empName: empName.toString(),
        presentDays: persentday,
        totalHalfDays: halfday,
        totalAbsent: absent,
        genSalary: salaries,
        monthsalary: monthsalary,
        genMonths: months,
        monthleave: monthleave,
        totalDays: totaldays,
        incentive: incentive,
        empgrossSalary: empgrossSalary,
      empbasicSalary: empbasicSalary,
      emphra: emphra,
      empca:empca,
      empmedical:empmedical,
      emptiffin:emptiffin,
      empcompanyPf:empcompanyPf,
      emppf: emppf,
      empesi: empesi,
      emploanemi:emploanemi,
        totalAmount: amount,
      });
      if (response.data) {
        toast.success("Added Successfully!");
        // Reset the form and loading state on successful submission
        setEmpname("");
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
        setGrossEmpSalary("");
        setBasicEmpSalary("");
        setEmpCa("");
        setEmpHra("");
        setEmpMedical("");
        setEmpTiffin("");
        setEmpCompanyPf("");
        setEmpPf("");
        setEmpESI("");
        setEmpLoanemi("");
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
          <h1 className="font-semibold text-3xl mb-8 text-white dark:text-black ">Generate Employee Salary</h1>
          <form className="flex flex-wrap">
            <div className="w-full lg:w-1/2 p-2 text-start">
              <div className="flex flex-col ">
                <label className="text-base mx-1">Employee Name</label>
                <select
                  className="input-style rounded-lg text-base h-10"
                  
                  value={empName}
                  onChange={(e) => handleEmployeeChange(e.target.value)}
                  name="empName"

                  >
                  <option value="" disabled className="text-base">
                    ----- Select Employee -----
                  </option>
                  {salaryList.map((salary) => (
                    <option key={salary._id} value={salary.empName} className="text-base">
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
                  name="monthleave"
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
                  name="totalDays"
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
                  name="totalHalfDays"
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
                  name="genSalary"
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
                  name="totalAmount"
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
                  name="monthsalary"
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
                  name="genMonths"
                  >
                    
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
                  name="presentDays"
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
                  name="totalAbsent"
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
                  name="incentive"
                  placeholder="₹"
                />
              </div>
            </div>
             {/* part- 3 */}
             <div className="w-full lg:w-1/2 p-2 text-start border-gray-500 border-t">
              <div className="flex flex-col ">
                <label className="text-base mx-1">Gross Salary:</label>
                <input
                  className="input-style rounded-lg"
                  type="text"
                  rows={2}
                  name="empgrossSalary"
                  value={empgrossSalary}
                  onChange={(e) => setGrossEmpSalary(e.target.value)}
                  placeholder="Enter Gross Salary"
                />
              </div>
              <div className="flex flex-col my-5">
                <label className="text-base mx-1">HRA:</label>
                <input
                  className="input-style rounded-lg"
                  type="text"
                  rows={2}
                  name="emphra"
                  value={emphra}
                  onChange={(e) => setEmpHra(e.target.value)}
                  placeholder="HRA"
                />
              </div>

              <div className="flex flex-col my-5">
                <label className="text-base mx-1">Medical Allowance:</label>
                <input
                  className="input-style rounded-lg"
                  type="text"
                  rows={2}
                  name="empmedical"
                  value={empmedical}
                  onChange={(e) => setEmpMedical(e.target.value)}
                  placeholder="Medical Allowance"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-base mx-1">Company PF:</label>
                <input
                  className="input-style rounded-lg"
                  type="text"
                  rows={2}
                  name="empcompanyPf"
                  value={empcompanyPf}
                  onChange={(e) => setEmpCompanyPf(e.target.value)}
                  placeholder="PF"
                />
              </div>

            </div>


            {/* part -5 */}
            <div className="w-full lg:w-1/2 p-2 text-start xs:border-hidden  border-gray-500 border-t">
              <div className="flex flex-col ">
                <label className="text-base mx-1">Basic Salary:</label>
                <input
                  className="input-style rounded-lg"
                  type="text"
                  rows={2}
                  name="empbasicSalary"
                  value={empbasicSalary}
                  onChange={(e) => setBasicEmpSalary(e.target.value)}
                  placeholder="Basic Salary"
                />
              </div>

              <div className="flex flex-col my-5">
                <label className="text-base mx-1">CA:</label>
                <input
                  className="input-style rounded-lg"
                  type="text"
                  rows={2}
                  name="empca"
                  value={empca}
                  onChange={(e) => setEmpCa(e.target.value)}
                  placeholder="Basic Salary"
                />
              </div>

              <div className="flex flex-col ">
                <label className="text-base mx-1">Tiffin/DAS Allowance:</label>
                <input
                  className="input-style rounded-lg"
                  type="text"
                  rows={2}
                  name="emptiffin"
                  value={emptiffin}
                  onChange={(e) => setEmpTiffin(e.target.value)}
                  placeholder="Tiffin Allowance"
                />
              </div>
            </div>
            <div className="w-full col-span-4 mt-10">Employee Contribution/Deduction</div>
            {/* part -6 */}
            <div className="w-full lg:w-1/2 p-2 text-start border-gray-500 border-t">
              <div className="flex flex-col ">
                <label className="text-base mx-1">PF:</label>
                <input
                  className="input-style rounded-lg"
                  type="text"
                  rows={2}
                  name="emppf"
                  value={emppf}
                  onChange={(e) => setEmpPf(e.target.value)}
                  placeholder="PF"
                />
              </div>
              <div className="flex flex-col my-5">
                <label className="text-base mx-1">Load EMI:</label>
                <input
                  className="input-style rounded-lg"
                  type="text"
                  rows={2}
                  name="emploanemi"
                  value={emploanemi}
                  onChange={(e) => setEmpLoanemi(e.target.value)}
                  placeholder="EMI"
                />
              </div>
            </div>

            {/* esi part -2 */}
            <div className="w-full lg:w-1/2 p-2 text-start xs:border-hidden  border-gray-500 border-t">
              <div className="flex flex-col">
                <label className="text-base mx-1">ESI:</label>
                <input
                  className="input-style rounded-lg"
                  type="text"
                  rows={2}
                  name="empesi"
                  value={empesi}
                  onChange={(e) => setEmpESI(e.target.value)}
                  placeholder="Basic ESI"
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

            <div className="w-full p-2">
              <button
                className="text-white bg-gradient-to-r leading-4 from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg shadow-lg shadow-blue-500/50  dark:shadow-lg dark:shadow-blue-800/80 text-sm px-5 py-2.5 text-center me-2 mb-2"
                onClick={handleSubmit}
                type="button"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
              
              <NavLink to="/hr/home/view/generate/salary" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-6 py-2 text-center me-2 mb-2">
              
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
