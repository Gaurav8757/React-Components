import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { format, getDaysInMonth } from 'date-fns';
function GenerateSalary() {
  const [empList, setEmployeeList] = useState([]);
  const [empName, setEmpname] = useState("");
  const [months, setMonths] = useState("");
  const [persentday, setPersentday] = useState("");
  const [halfday, setHalfday] = useState("");
  const [salaries, setSalaries] = useState("");
  const [monthsalary, setMonthsalary] = useState("");
  const [monthleave, setMonthleave] = useState("");
  const [totaldays, setTotaldays] = useState();
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
    // Fetch the list of employees when the component mounts
    axios.get("https://eleedomimf.onrender.com/api/employee-list").then((response) => {
      setEmployeeList(response.data);
    });
  }, []);

  // console.log(empList);
  const handleEmployeeChange = (selectedEmployee) => {
    const selectedEmp = empList.find((emp) => emp.empname === selectedEmployee);
    setEmpname(selectedEmployee);
    setMonthleave(selectedEmp ? selectedEmp.leavemonth : "");
    setMonthsalary(selectedEmp ? selectedEmp.salary : "");
  };

  // current year of months of total days
  const handleMonthChange = (selectedMonth) => {
    // Calculate total days in the selected month
    const year = new Date().getFullYear(); // Get current year
    const daysInMonth = getDaysInMonth(new Date(year, selectedMonth)); // Calculate total days
    setTotaldays(daysInMonth); // Update total days state
  };

  // months retuen  array with number of days for each month
  const renderMonths = () => {
    const currentMonth = new Date().getMonth();
    const months = [];
    for (let m = 0; m < 12; m++) {
      const monthValue = String(m).padStart(2, '0'); // Ensure month value has two digits
      const date = new Date(currentMonth, m, 1); // Create a date object for each month
      const monthName = format(date, 'MMMM'); // Format the date to get the month name
      // console.log(monthValue);
      months.push(<option key={monthValue} value={monthValue}>{monthName}</option>);
    }
    return months;
  };

  // handle basic salary
  useEffect(() => {
    const handleBasic = () => {
      const basic = parseFloat(empgrossSalary) || 0;
      const final_basic = basic / 2;
      // console.log(final_basic);
      setBasicEmpSalary(final_basic);
    }
    handleBasic();
  }, [empgrossSalary]);


  // HANDLE HRA
  useEffect(() => {
    const handleHra = () => {
      const calculateHra = parseFloat(empgrossSalary) || 0;
      const finalHra = (calculateHra * 30) / 100;
      // console.log(finalHra);
      setEmpHra(finalHra);
    }
    handleHra();
  }, [empgrossSalary]);

  // HANDLE CA
  useEffect(() => {
    const handleCa = () => {
      const calculateCa = parseFloat(empgrossSalary) || 0;
      const finalCa = (calculateCa * 10) / 100;
      setEmpCa(finalCa);
    }
    handleCa();
  }, [empgrossSalary]);

  // Handle MEDICAL
  useEffect(() => {
    const handleMedical = () => {
      const calculateMedical = parseFloat(empgrossSalary) || 0;
      const finalMedical = (calculateMedical * 5) / 100;
      setEmpMedical(finalMedical);
    }
    handleMedical();
  }, [empgrossSalary]);

  // HANDLE TIFFIN
  useEffect(() => {
    const handleTiffin = () => {
      const calculateTiffin = parseFloat(empgrossSalary) || 0;
      const finalTiffin = (calculateTiffin * 5) / 100;
      setEmpTiffin(finalTiffin);
    }
    handleTiffin();
  }, [empgrossSalary]);

  // HANDLE COMPANY
  useEffect(() => {
    const handleCompanyPf = () => {
      const calculatePf = parseFloat(empbasicSalary) || 0;
      const finalPf = (calculatePf * 125) / 1000;
      setEmpCompanyPf(finalPf);
    }
    handleCompanyPf();
  }, [empbasicSalary]);

  useEffect(() => {
    const handleEmpPf = () => {
      setEmpPf(empcompanyPf);
    }
    handleEmpPf();
  }, [empcompanyPf])


  // sorting lists
  const sortedAPIData = empList.slice().sort((a, b) => {
    const empidA = parseInt(a.empid.split('-')[1]);
    const empidB = parseInt(b.empid.split('-')[1]);
    return empidA - empidB;
  });
  // sortedAPIData.map((emp)=>emp.employeeDetails.find(emp => console.log(emp.date )))
  let totalAbsentDays = 0;
  const selectedEmployee = empList.find((emp) => emp.empname === empName);
  if (selectedEmployee) {
    selectedEmployee.employeeDetails.forEach((detail) => {
      if (detail.status === 'absent') {
        totalAbsentDays++;
      }
    });
  }

  //  total present days
  useEffect(() => {
    const handlePresent = () => {
      const presentDays = totaldays - parseInt(totalAbsentDays, 10); // Subtract total absent days from total days
      setPersentday(presentDays);
    };
    handlePresent(); // Call the function when the component mounts or when 'absent' state changes
  }, [totaldays, totalAbsentDays]); // Run the effect whenever 'totaldays' or 'absent' state changes

  // absent/present
  useEffect(() => {
    const handleSalaries = () => {
      const salaries = totaldays - parseInt(totalAbsentDays, 10); // Subtract total absent days from total days
      setPersentday(salaries);
    };
    handleSalaries(); // Call the function when the component mounts or when 'absent' state changes
  }, [totaldays, totalAbsentDays]); // Run the effect whenever 'totaldays' or 'absent' state changes

  // salary handle
  useEffect(() => {
    // salary 
    const handleSalary = () => {
      let salary = (monthsalary / 30.5) * persentday;
      salary = parseFloat(salary.toFixed(2)); // Round the salary to two decimal places
      setSalaries(salary);
    };
    handleSalary(); // Call the function when the component mounts or when 'absent' state changes
  }, [monthsalary, persentday]);


  // HANDLE Gross-Salary
  useEffect(() => {
    // salary 
    const handleGrossSalary = () => {
      // Round the salary to two decimal places
      setGrossEmpSalary(monthsalary);
    };
    handleGrossSalary(); // Call the function when the component mounts or when 'absent' state changes
  }, [monthsalary, persentday]);

  // post data
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Proceed with the rest of the submission logic
      const response = await axios.post("https://eleedomimf.onrender.com/dashboard/gensalary", {
        empName: empName.toString(),
        presentDays: persentday, // Send the total present days to the backend
        totalHalfDays: halfday,
        totalAbsent: totalAbsentDays,
        genSalary: salaries,
        monthsalary: monthsalary,
        genMonths: months,
        monthleave: monthleave,
        totalDays: totaldays,
        incentive: incentive,
        empgrossSalary: empgrossSalary,
        empbasicSalary: empbasicSalary,
        emphra: emphra,
        empca: empca,
        empmedical: empmedical,
        emptiffin: emptiffin,
        empcompanyPf: empcompanyPf,
        emppf: emppf,
        empesi: empesi,
        emploanemi: emploanemi,
        totalAmount: amount,
      });
      if (response.data) {
        toast.success("Added Successfully!");
        // Reset the form and loading state on successful submission
        setEmpname("");
        setMonths("");
        setPersentday("");
        setHalfday("");
        // setAbsent("");
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
  // incentive
  useEffect(() => {
    const handleIncentive = () => {
      const salariesValue = parseFloat(salaries) || 0;
      const incentiveValue = parseFloat(incentive) || 0;
      const incent = salariesValue + incentiveValue;
      setAmount(incent);
    };
    handleIncentive(); // Call the function when the component mounts or when 'absent' state changes
  }, [salaries, incentive]);

  return (
    <section className="container-fluid h-screen relative p-0 sm:ml-64 bg-white">
      <div className="container-fluid flex justify-center p-2  border-gray-200 border-dashed rounded-lg bg-white">
        <div className="relative w-full lg:w-full  p-0 lg:p-4 rounded-xl shadow-xl text-2xl  items-center bg-slate-200">
          <h1 className="font-semibold text-3xl mb-8 text-white dark:text-black ">Generate Employee Salary</h1>
          <div className="flex flex-wrap justify-between">
            <div className="flex flex-col   p-2 text-start w-full lg:w-1/4 ">
              <label className="text-base mx-1">Employee Name</label>
              <select
                className="input-style rounded-lg text-base h-10"
                value={empName}
                onChange={(e) => handleEmployeeChange(e.target.value)}
                name="empName">
                <option value="" disabled className="text-base">
                  ----- Select Employee -----
                </option>
                {sortedAPIData.map((emp) => (
                  <option key={emp._id} value={emp.empname} className="text-base">
                    {emp.empid} {emp.empname}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col p-2 text-start w-full lg:w-1/4">
              <label className="text-base mx-1">Monthly Salary:</label>
              <input
                className="input-style rounded-lg"
                type="number"
                min="0"
                value={monthsalary}
                name="monthsalary"
                placeholder=""
                readOnly
              />
            </div>

            <div className="flex flex-col p-2 text-start w-full lg:w-1/4">
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

            <div className="flex flex-col p-2 text-start w-full lg:w-1/4">
              <label className="text-base mx-1">Months:</label>
              <select
                className="input-style rounded-lg"
                type="text"
                value={months}
                onChange={(e) => {
                  setMonths(e.target.value);
                  handleMonthChange(parseInt(e.target.value)); // Call handleMonthChange on month selection change
                }}
                name="genMonths">
                <option value="" >----- Select Month&apos;s -----</option>
                {renderMonths()}
              </select>
            </div>

            <div className="flex flex-col p-2 text-start w-full lg:w-1/4">
              <label className="text-base mx-1">Total Days:</label>
              <input
                className="input-style rounded-lg"
                type="number"
                min="0"
                value={totaldays}
                name="totalDays"
                readOnly
              />
            </div>
            <div className="flex flex-col p-2 text-start w-full lg:w-1/4">
              <label className="text-base mx-1">Present Days:</label>
              <input
                className="input-style rounded-lg"
                type="number"
                min="0"
                value={persentday}
                name="presentDays"
              />
            </div>

            <div className="flex flex-col p-2 text-start w-full lg:w-1/4">
              <label className="text-base mx-1">Total Absent:</label>
              <input
                className="input-style rounded-lg"
                type="number"
                min="0"
                value={totalAbsentDays}
                name="totalAbsent"
              />
            </div>

            <div className="flex flex-col p-2 text-start w-full lg:w-1/4">
              <label className="text-base mx-1">Total Half Days:</label>
              <input
                className="input-style rounded-lg"
                type="number"
                min="0"
                value={halfday}
                onChange={(e) => setHalfday(e.target.value)}
                name="totalHalfDays"
                readOnly
              />
            </div>

            <div className="flex flex-col p-2 text-start w-full lg:w-1/4">
              <label className="text-base mx-1">Salary:</label>
              <input
                className="input-style rounded-lg"
                type="number"
                min="0"
                value={salaries}
                name="genSalary"
                placeholder="₹"
              />
            </div>
            <div className="flex flex-col p-2 text-start w-full lg:w-1/4">
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

            <div className="flex flex-col p-2 text-start w-full lg:w-1/4">
              <label className="text-base mx-1">Total Amount:</label>
              <input
                className="input-style rounded-lg"
                type="number"
                min="0"
                value={amount}
                name="totalAmount"
                placeholder="₹"
              />
            </div>
            <div className="flex flex-col p-2 my-8 lg:my-16 text-start w-full lg:w-1/4"></div>

            {/* next part starts here */}
            <div className="flex flex-col p-2 text-start w-full lg:w-1/4">
              <label className="text-base mx-1">Gross Salary:</label>
              <input
                className="input-style rounded-lg"
                type="text"
                rows={2}
                name="empgrossSalary"
                value={empgrossSalary}
                placeholder="Gross Salary"
              />
            </div>
            <div className="flex flex-col p-2 text-start w-full lg:w-1/4">
              <label className="text-base mx-1">Basic Salary:</label>
              <input
                className="input-style rounded-lg"
                type="text"
                rows={2}
                name="empbasicSalary"
                value={empbasicSalary}
                onChange={(e) => setBasicEmpSalary(e.target.value)}
                placeholder="Basic Salary"
                readOnly
              />
            </div>
            <div className="flex flex-col p-2 text-start w-full lg:w-1/4">
              <label className="text-base mx-1">HRA:</label>
              <input
                className="input-style rounded-lg"
                type="text"
                rows={2}
                name="emphra"
                value={emphra}
                onChange={(e) => setEmpHra(e.target.value)}
                placeholder="HRA"
                readOnly
              />
            </div>
            <div className="flex flex-col p-2 text-start w-full lg:w-1/4">
              <label className="text-base mx-1">CA:</label>
              <input
                className="input-style rounded-lg"
                type="text"
                rows={2}
                name="empca"
                value={empca}
                onChange={(e) => setEmpCa(e.target.value)}
                placeholder="CA"
                readOnly
              />
            </div>
            <div className="flex flex-col p-2 text-start w-full lg:w-1/4">
              <label className="text-base mx-1">Medical Allowance:</label>
              <input
                className="input-style rounded-lg"
                type="text"
                rows={2}
                name="empmedical"
                value={empmedical}
                onChange={(e) => setEmpMedical(e.target.value)}
                placeholder="Medical Allowance"
                readOnly
              />
            </div>
            <div className="flex flex-col p-2 text-start w-full lg:w-1/4">
              <label className="text-base mx-1">Tiffin/DAS Allowance:</label>
              <input
                className="input-style rounded-lg"
                type="text"
                rows={2}
                name="emptiffin"
                value={emptiffin}
                onChange={(e) => setEmpTiffin(e.target.value)}
                placeholder="Tiffin Allowance"
                readOnly
              />
            </div>
            <div className="flex flex-col p-2 text-start w-full lg:w-1/4">
              <label className="text-base mx-1">Company PF:</label>
              <input
                className="input-style rounded-lg"
                type="text"
                rows={2}
                name="empcompanyPf"
                value={empcompanyPf}
                onChange={(e) => setEmpCompanyPf(e.target.value)}
                placeholder="PF"
                readOnly
              />
            </div>
            <div className="flex flex-col p-2 my-8 lg:my-16 text-start w-full lg:w-1/4"></div>

            {/* part-3 */}
            <div className="w-full col-span-4 my-4 text-white border-b border border-slate-500 bg-slate-600">Employee Contribution/Deduction</div>
            <div className="flex flex-col p-2 text-start w-full lg:w-1/4">
              <label className="text-base mx-1">PF:</label>
              <input
                className="input-style rounded-lg"
                type="text"
                rows={2}
                name="emppf"
                value={emppf}
                onChange={(e) => setEmpPf(e.target.value)}
                placeholder="PF"
                readOnly
              />
            </div>
            <div className="flex flex-col p-2 text-start w-full lg:w-1/4">
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

            <div className="flex flex-col p-2 text-start w-full lg:w-1/4 border-t">
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
            <div className="flex flex-col p-2 text-start w-full lg:w-1/4 "></div>

            <div className="w-full mt-5 p-2">
              <button
                className="text-white bg-gradient-to-r leading-4 from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg shadow-lg shadow-blue-500/50  dark:shadow-lg dark:shadow-blue-800/80 text-sm px-5 py-2.5 text-center me-2 mb-2"
                onClick={handleSubmit}
                type="button"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default GenerateSalary;
