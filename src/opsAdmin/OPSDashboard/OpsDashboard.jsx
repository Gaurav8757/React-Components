import { useState, useEffect, startTransition } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import VITE_DATA from '../../config/config.jsx';
import { useSpring, animated } from "@react-spring/web";

function OpsDashboard() {
    // const [empData, setEmpData] = useState([]);
    const [yearlyData, setYearlyData] = useState(0);
    const [monthlyData, setMonthlyData] = useState(0);
    const [dailyData, setDailyData] = useState(0);
    const [employees, setEmployees] = useState([]);
    const [employeePolicyCounts, setEmployeePolicyCounts] = useState({});
    

    const allDetailsProps = useSpring({ number: yearlyData, from: { number: 0 } });
    const monthlyProps = useSpring({ number: monthlyData, from: { number: 0 } });
    const dailyProps = useSpring({ number: dailyData, from: { number: 0 } });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = sessionStorage.getItem("token");
                if (!token) {
                    toast.error("Not Authorized yet.. Try again!");
                    return;
                }

                const response = await axios.get(`${VITE_DATA}/alldetails/show/view`, {
                    headers: {
                        Authorization: `${token}`,
                    },
                });
                const allData = response.data;

                const currentDate = new Date();
                const currentYear = currentDate.getFullYear();
                const currentMonth = currentDate.getMonth() + 1;
                const currentDay = currentDate.getDate();

                const filteredYearlyData = allData.filter(item => {
                    const itemYear = new Date(item.entryDate).getFullYear();
                    return itemYear === currentYear;
                });

                const filteredMonthlyData = allData.filter(item => {
                    const itemDate = new Date(item.entryDate);
                    const itemYear = itemDate.getFullYear();
                    const itemMonth = itemDate.getMonth() + 1;
                    return itemYear === currentYear && itemMonth === currentMonth;
                });

                const filteredDailyData = allData.filter(item => {
                    const itemDate = new Date(item.entryDate);
                    const itemYear = itemDate.getFullYear();
                    const itemMonth = itemDate.getMonth() + 1;
                    const itemDay = itemDate.getDate();
                    return itemYear === currentYear && itemMonth === currentMonth && itemDay === currentDay;
                });



                
                    // Extract unique employees (case insensitive), excluding empty staffName
        const uniqueEmployees = [...new Set(allData
            .filter(item => item.staffName.trim() !== '')
            .map(item => item.staffName.toLowerCase()))];
          setEmployees(uniqueEmployees);
          const newEmployeePolicyCounts = uniqueEmployees.reduce((acc, employee) => {
            const employeeData = allData.filter(item => item.staffName.toLowerCase() === employee && item.empTime);
  
            acc[employee] = {
              ytd: employeeData.filter(item => new Date(item.entryDate).getFullYear() === currentYear).length,
              mtd: employeeData.filter(item => {
                const itemDate = new Date(item.entryDate);
                return itemDate.getMonth() + 1 === currentMonth && itemDate.getFullYear() === currentYear;
              }).length,
              daily: employeeData.filter(item => {
                const itemDate = new Date(item.entryDate);
                return itemDate.getDate() === currentDay && itemDate.getMonth() + 1 === currentMonth && itemDate.getFullYear() === currentYear;
              }).length,
            };
            return acc;
          }, {});

                startTransition(() => {
                    setYearlyData(filteredYearlyData.length);
                    setMonthlyData(filteredMonthlyData.length);
                    setDailyData(filteredDailyData.length);
                    setEmployeePolicyCounts(newEmployeePolicyCounts);
                });

            } catch (error) {
                console.error("Error fetching data:", error);
                toast.error("Failed to fetch data.");
            }
        };
        fetchData();
    }, []);

    return (
        <>
        <div className="grid grid-cols-3 gap-3 mb-8">
            <div className="grid xl:flex lg:flex md:grid sm:grid items-center xl:justify-between h-16 rounded bg-orange-700 shadow-2xl drop-shadow-2xl shadow-orange-950">
                <span className="sm:block mx-1 sm:mx-2 lg:mx-3 xl:mx-6 px-2 py-1 rounded text-xs sm:text-sm md:text-base lg:text-base xl:text-lg font-semibold text-black-500 bg-[white]/50 focus:ring-[#050708]/50">
                    YTD NOP
                </span>
                <animated.span className="mx-1 sm:mx-2 lg:mx-3 xl:mx-6 text-base sm:text-base md:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-200">
                    {allDetailsProps.number.to(n => n.toFixed(0))}
                </animated.span>
            </div>

            <div className="grid xl:flex lg:flex md:grid sm:grid items-center xl:justify-between h-16 rounded bg-orange-700 shadow-2xl drop-shadow-2xl shadow-orange-950">
                <span className="sm:block mx-1 sm:mx-2 lg:mx-3 xl:mx-6 px-2 py-1 rounded text-xs sm:text-sm md:text-base lg:text-base xl:text-lg font-semibold text-black-500 bg-[white]/50 focus:ring-[#050708]/50 xl:whitespace-nowrap">
                    MTD NOP
                </span>
                <animated.span className="mx-1 sm:mx-2 lg:mx-3 xl:mx-6 text-base sm:text-base md:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-200">
                    {monthlyProps.number.to(n => n.toFixed(0))}
                </animated.span>
            </div>

            <div className="grid xl:flex lg:flex md:grid sm:grid items-center xl:justify-between h-16 rounded bg-orange-700 shadow-2xl drop-shadow-2xl shadow-orange-950">
                <span className="sm:block mx-1 sm:mx-2 lg:mx-3 xl:mx-6 px-2 py-1 rounded text-xs sm:text-sm md:text-base lg:text-base xl:text-lg font-semibold text-black-500 bg-[white]/50 focus:ring-[#050708]/50">
                    TODAY NOP
                </span>
                <animated.span className="mx-1 sm:mx-2 lg:mx-3 xl:mx-6 text-base sm:text-base md:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-200">
                    {dailyProps.number.to(n => n.toFixed(0))}
                </animated.span>
            </div>
        </div>

          {/* part 2 employee wise data policy */}
          
          <div className="block">
          <div className="grid grid-cols-6 items-center ">
              <span className="col-span-3 sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2  text-sm sm:text-base lg:text-xl xl:text-2xl uppercase font-serif">
                  EMP NAME
              </span>
              <span className="col-span-1 text-xs sm:text-base lg:text-xl xl:text-2xl uppercase font-serif">
                  YTD
              </span>
              <span className="col-span-1 text-xs sm:text-base lg:text-xl xl:text-2xl uppercase font-serif">
                  MTD
              </span>
              <span className="col-span-1 text-xs sm:text-base lg:text-xl xl:text-2xl uppercase font-serif">
                  TODAY
              </span>
          </div>
          {employees.map((employee, index) => (
              <div
                  key={index}
                  className={`mb-0 xl:mb-0 lg:mb-0 md:mb-0 sm:mb-0 grid grid-cols-6 items-center h-8 lg:p-1 md:h-10 lg:h-10 xl:h-10 bg-orange-700 shadow-2xl drop-shadow-2xl shadow-orange-950 ${index === 0 ? 'rounded-t' : ''
                      } ${index === employees.length - 1 ? 'rounded-b' : ''}`}
              >
                  <span className="col-span-3 sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2 py-0.5 rounded text-xs sm:text-sm md:text-sm lg:text-base xl:text-base font-semibold text-black-500 bg-[white]/50 focus:ring-[#050708]/50 uppercase">
                      {employee.toUpperCase()}
                  </span>
                  {["ytd", "mtd", "daily"].map(period => (
                      <span key={period} className="col-span-1 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-bold text-gray-200">
                          {employeePolicyCounts[employee] ? employeePolicyCounts[employee][period] : '0'}
                      </span>
                  ))}
              </div>
          ))}
      </div>

      </>
    );
}

export default OpsDashboard;
