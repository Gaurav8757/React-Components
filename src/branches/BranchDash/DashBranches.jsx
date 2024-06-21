import axios from "axios";
import { useEffect, useState, startTransition } from "react";
import { toast } from "react-toastify";
import { useSpring, animated } from "@react-spring/web";
import VITE_DATA from "../../config/config.jsx";

function DashBranches() {
    // eslint-disable-next-line no-unused-vars
    const [allDetailsData, setAllDetailsData] = useState([]);
    const [APIData, setAPIData] = useState([]);
    const [yearlyData, setYearlyData] = useState(0);
    const [monthlyData, setMonthlyData] = useState(0);
    const [dailyData, setDailyData] = useState(0);
    const [totalNsell, setTotalNsell] = useState(0);
    const [monthlyNsell, setMonthlyNsell] = useState(0);
    const [dailyNsell, setDailyNsell] = useState(0);
    const [totalFsell, setTotalFsell] = useState(0);
    const [monthlyFsell, setMonthlyFsell] = useState(0);
    const [dailyFsell, setDailyFsell] = useState(0);
    const [totalCvPayout, setTotalCvPayout] = useState(0);
    const [monthlyCvPayout, setMonthlyCvPayout] = useState(0);
    const [dailyCvPayout, setDailyCvPayout] = useState(0);
    const [totalCvCount, setTotalCvCount] = useState(0);
    const [monthlyCvCount, setMonthlyCvCount] = useState(0);
    const [dailyCvCount, setDailyCvCount] = useState(0);
    const [totalLeavesCounts, setTotalLeavesCounts] = useState(0);
    const [acptLeaveCounts, setAcptLeaveCounts] = useState(0);
    const [rejLeaveCounts, setRejLeaveCounts] = useState(0);
    const [empCount, setEmpCount] = useState(0);
    const [activeempCount, setActiveEmpCount] = useState(0);
    const [currAttendance, setCurrAttendance] = useState(0);

    const [totalPvtCarPayout, setTotalPvtCarPayout] = useState(0);
    const [monthlyPvtCarPayout, setMonthlyPvtCarPayout] = useState(0);
    const [dailyPvtCarPayout, setDailyPvtCarPayout] = useState(0);
    const [totalPvtCarCount, setTotalPvtCarCount] = useState(0);
    const [monthlyPvtCarCount, setMonthlyPvtCarCount] = useState(0);
    const [dailyPvtCarCount, setDailyPvtCarCount] = useState(0);

    const [totalTwPayout, setTotalTwPayout] = useState(0);
    const [monthlyTwPayout, setMonthlyTwPayout] = useState(0);
    const [dailyTwPayout, setDailyTwPayout] = useState(0);
    const [totalTwCount, setTotalTwCount] = useState(0);
    const [monthlyTwCount, setMonthlyTwCount] = useState(0);
    const [dailyTwCount, setDailyTwCount] = useState(0);

    const [totalHealthPayout, setTotalHealthPayout] = useState(0);
    const [monthlyHealthPayout, setMonthlyHealthPayout] = useState(0);
    const [dailyHealthPayout, setDailyHealthPayout] = useState(0);
    const [totalHealthCount, setTotalHealthCount] = useState(0);
    const [monthlyHealthCount, setMonthlyHealthCount] = useState(0);
    const [dailyHealthCount, setDailyHealthCount] = useState(0);

    const [totalNonMotorPayout, setTotalNonMotorPayout] = useState(0);
    const [monthlyNonMotorPayout, setMonthlyNonMotorPayout] = useState(0);
    const [dailyNonMotorPayout, setDailyNonMotorPayout] = useState(0);
    const [totalNonMotorCount, setTotalNonMotorCount] = useState(0);
    const [monthlyNonMotorCount, setMonthlyNonMotorCount] = useState(0);
    const [dailyNonMotorCount, setDailyNonMotorCount] = useState(0);
    const name = sessionStorage.getItem("name");

    const allDetailsProps = useSpring({ number: yearlyData, from: { number: 0 } });
    const monthlyProps = useSpring({ number: monthlyData, from: { number: 0 } });
    const dailyProps = useSpring({ number: dailyData, from: { number: 0 } });
    const totalNsellProps = useSpring({ number: totalNsell, from: { number: 0 } });
    const monthlyNsellProps = useSpring({ number: monthlyNsell, from: { number: 0 } });
    const dailyNsellProps = useSpring({ number: dailyNsell, from: { number: 0 } });
    const totalFsellProps = useSpring({ number: totalFsell, from: { number: 0 } });
    const monthlyFsellProps = useSpring({ number: monthlyFsell, from: { number: 0 } });
    const dailyFsellProps = useSpring({ number: dailyFsell, from: { number: 0 } });
    const advisorDataProps = useSpring({ number: APIData.length, from: { number: 0 } });

    const totalCvPayoutProps = useSpring({ number: totalCvPayout, from: { number: 0 } });
    const monthlyCvPayoutProps = useSpring({ number: monthlyCvPayout, from: { number: 0 } });
    const dailyCvPayoutProps = useSpring({ number: dailyCvPayout, from: { number: 0 } });
    const totalCvCountProps = useSpring({ number: totalCvCount, from: { number: 0 } });
    const monthlyCvCountProps = useSpring({ number: monthlyCvCount, from: { number: 0 } });
    const dailyCvCountProps = useSpring({ number: dailyCvCount, from: { number: 0 } });

    const totalPvtCarPayoutProps = useSpring({ number: totalPvtCarPayout, from: { number: 0 } });
    const monthlyPvtCarPayoutProps = useSpring({ number: monthlyPvtCarPayout, from: { number: 0 } });
    const dailyPvtCarPayoutProps = useSpring({ number: dailyPvtCarPayout, from: { number: 0 } });
    const totalPvtCarCountProps = useSpring({ number: totalPvtCarCount, from: { number: 0 } });
    const monthlyPvtCarCountProps = useSpring({ number: monthlyPvtCarCount, from: { number: 0 } });
    const dailyPvtCarCountProps = useSpring({ number: dailyPvtCarCount, from: { number: 0 } });

    const totalTwPayoutProps = useSpring({ number: totalTwPayout, from: { number: 0 } });
    const monthlyTwPayoutProps = useSpring({ number: monthlyTwPayout, from: { number: 0 } });
    const dailyTwPayoutProps = useSpring({ number: dailyTwPayout, from: { number: 0 } });
    const totalTwCountProps = useSpring({ number: totalTwCount, from: { number: 0 } });
    const monthlyTwCountProps = useSpring({ number: monthlyTwCount, from: { number: 0 } });
    const dailyTwCountProps = useSpring({ number: dailyTwCount, from: { number: 0 } });

    const totalHealthPayoutProps = useSpring({ number: totalHealthPayout, from: { number: 0 } });
    const monthlyHealthPayoutProps = useSpring({ number: monthlyHealthPayout, from: { number: 0 } });
    const dailyHealthPayoutProps = useSpring({ number: dailyHealthPayout, from: { number: 0 } });
    const totalHealthCountProps = useSpring({ number: totalHealthCount, from: { number: 0 } });
    const monthlyHealthCountProps = useSpring({ number: monthlyHealthCount, from: { number: 0 } });
    const dailyHealthCountProps = useSpring({ number: dailyHealthCount, from: { number: 0 } });

    const totalNonMotorPayoutProps = useSpring({ number: totalNonMotorPayout, from: { number: 0 } });
    const monthlyNonMotorPayoutProps = useSpring({ number: monthlyNonMotorPayout, from: { number: 0 } });
    const dailyNonMotorPayoutProps = useSpring({ number: dailyNonMotorPayout, from: { number: 0 } });
    const totalNonMotorCountProps = useSpring({ number: totalNonMotorCount, from: { number: 0 } });
    const monthlyNonMotorCountProps = useSpring({ number: monthlyNonMotorCount, from: { number: 0 } });
    const dailyNonMotorCountProps = useSpring({ number: dailyNonMotorCount, from: { number: 0 } });

    const currAttendanceProps = useSpring({ number: currAttendance, from: { number: 0 } });
    const activeempCountProps = useSpring({ number: activeempCount, from: { number: 0 } });
    const empCountProps = useSpring({ number: empCount, from: { number: 0 } });

    const totalLeavesCountsProps = useSpring({ number: totalLeavesCounts, from: { number: 0 } });
    const acptLeaveCountsProps = useSpring({ number: acptLeaveCounts, from: { number: 0 } });
    const trejLeaveCountsProps = useSpring({ number: rejLeaveCounts, from: { number: 0 } });
    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            toast.error("Not Authorized yet.. Try again! ");
        } else {
            // The user is authenticated, so you can make your API request here.
            axios
                .get(`${VITE_DATA}/advisor/all/lists`, {
                    headers: {
                        Authorization: `${token}`, // Send the token in the Authorization header
                    }, params: { branch: name }
                })
                .then((response) => {
                    setAPIData(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [name]);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            toast.error("Not Authorized yet.. Try again!");
        } else {
            // The user is authenticated, so you can make your API request here.
            axios
                .get(`${VITE_DATA}/api/employee-list`, {
                    headers: {
                        Authorization: `${token}`, // Send the token in the Authorization header
                    },
                })
                .then((response) => {
                    const empLists = response.data;
                    const currentMonth = new Date().getMonth() + 1; // getMonth() is zero-based
                    const currentDay = new Date().getDate();
                    const currentYear = new Date().getFullYear();
                    const currentDateString = `${currentDay.toString().padStart(2, '0')}/${currentMonth.toString().padStart(2, '0')}/${currentYear}`;
                    
                    const activeEmp = empLists.filter(emp => emp.flags === true && emp.empbranch === name);
                    setActiveEmpCount(activeEmp.length);
                    setEmpCount(activeEmp.length);
                    let totalPresentCount = 0;
                    // Count the current day present employees for each active employee   
                    activeEmp.forEach(emp => {
                        const todayEntries = emp.employeeDetails.filter(item => {
                            return item.status === "present" && item.date === currentDateString;
                        });
                        // Increment totalPresentCount by the number of today's present entries
                        totalPresentCount += todayEntries.length;
                    });
                    setCurrAttendance(totalPresentCount);


                    // Calculate total leaves across all employees
                    let totalLeaveCount = 0;
                    let acptCounts = 0;
                    let rejCounts = 0;
                    activeEmp.forEach(emp => {
                        if (emp.leaveDetails && Array.isArray(emp.leaveDetails)) {
                            emp.leaveDetails.forEach(leave => {
                                // Increment totalLeaveCount for each leave record
                                totalLeaveCount++;
                                if (leave.status === "approved") { // Adjust condition as per your leave status logic
                                    acptCounts += leave.counts || 0; // Ensure counts is a number and add to totalLeaveCount
                                } else if (leave.status === "rejected") {
                                    rejCounts += leave.counts || 0;
                                }
                            });
                        }
                    });

                    setTotalLeavesCounts(totalLeaveCount);
                    setAcptLeaveCounts(acptCounts);
                    setRejLeaveCounts(rejCounts);

                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [name]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!name) {
                    console.error("Branch information not found in sessionStorage");
                    return;
                }
                const response = await axios.get(`${VITE_DATA}/alldetails/viewdata/branch/hpur`, {
                    params: { branch: name },
                });
                const fetchedData = response.data;
                setAllDetailsData(fetchedData);

                const currentMonth = new Date().getMonth() + 1;
                const currentDay = new Date().getDate();
                const currentYear = new Date().getFullYear();

                const filteredYearlyData = fetchedData.filter(item => {
                    const itemDate = new Date(item.entryDate);
                    return itemDate.getFullYear() === currentYear;
                });

                const filteredMonthlyData = fetchedData.filter(item => {
                    const itemDate = new Date(item.entryDate);
                    return itemDate.getMonth() + 1 === currentMonth && itemDate.getFullYear() === currentYear;
                });

                const filteredDailyData = fetchedData.filter(item => {
                    const itemDate = new Date(item.entryDate);
                    return itemDate.getDate() === currentDay && itemDate.getMonth() + 1 === currentMonth && itemDate.getFullYear() === currentYear;
                });

                const calculateTotals = (filteredData, segment) => {
                    const filteredSegmentData = filteredData.filter(item => item.segment === segment);
                    const totalPayout = filteredSegmentData.reduce((sum, item) => parseFloat(sum + item.netPremium), 0);
                    const totalCount = filteredSegmentData.length;
                    return { totalPayout, totalCount };
                };

                const cvYearlyTotals = calculateTotals(filteredYearlyData, 'C V');
                const cvMonthlyTotals = calculateTotals(filteredMonthlyData, 'C V');
                const cvDailyTotals = calculateTotals(filteredDailyData, 'C V');

                const pvtCarYearlyTotals = calculateTotals(filteredYearlyData, 'PVT-CAR');
                const pvtCarMonthlyTotals = calculateTotals(filteredMonthlyData, 'PVT-CAR');
                const pvtCarDailyTotals = calculateTotals(filteredDailyData, 'PVT-CAR');

                const twYearlyTotals = calculateTotals(filteredYearlyData, 'TW');
                const twMonthlyTotals = calculateTotals(filteredMonthlyData, 'TW');
                const twDailyTotals = calculateTotals(filteredDailyData, 'TW');

                const healthYearlyTotals = calculateTotals(filteredYearlyData, 'HEALTH');
                const healthMonthlyTotals = calculateTotals(filteredMonthlyData, 'HEALTH');
                const healthDailyTotals = calculateTotals(filteredDailyData, 'HEALTH');

                const nonMotorYearlyTotals = calculateTotals(filteredYearlyData, 'NON-MOTOR');
                const nonMotorMonthlyTotals = calculateTotals(filteredMonthlyData, 'NON-MOTOR');
                const nonMotorDailyTotals = calculateTotals(filteredDailyData, 'NON-MOTOR');


                const totalnetPremium = filteredYearlyData.reduce((sum, item) => sum + parseFloat(item.netPremium || 0), 0);
                const monthlynetPremium = filteredMonthlyData.reduce((sum, item) => sum + parseFloat(item.netPremium || 0), 0);
                const dailynetPremium = filteredDailyData.reduce((sum, item) => sum + parseFloat(item.netPremium || 0), 0);

                const totalfinalEntryFields = filteredYearlyData.reduce((sum, item) => sum + item.finalEntryFields, 0);
                const monthlyfinalEntryFields = filteredMonthlyData.reduce((sum, item) => sum + item.finalEntryFields, 0);
                const dailyfinalEntryFields = filteredDailyData.reduce((sum, item) => sum + item.finalEntryFields, 0);

                startTransition(() => {
                    setYearlyData(filteredYearlyData.length);
                    setMonthlyData(filteredMonthlyData.length);
                    setDailyData(filteredDailyData.length);
                    setTotalNsell(totalnetPremium);
                    setMonthlyNsell(monthlynetPremium);
                    setDailyNsell(dailynetPremium);
                    setTotalFsell(totalfinalEntryFields);
                    setMonthlyFsell(monthlyfinalEntryFields);
                    setDailyFsell(dailyfinalEntryFields);

                    setTotalCvPayout(totalCvPayout);
                    setMonthlyCvPayout(monthlyCvPayout);
                    setDailyCvPayout(dailyCvPayout);
                    setTotalCvPayout(cvYearlyTotals.totalPayout);
                    setMonthlyCvPayout(cvMonthlyTotals.totalPayout);
                    setDailyCvPayout(cvDailyTotals.totalPayout);
                    setTotalCvCount(cvYearlyTotals.totalCount);
                    setMonthlyCvCount(cvMonthlyTotals.totalCount);
                    setDailyCvCount(cvDailyTotals.totalCount);

                    setTotalPvtCarPayout(pvtCarYearlyTotals.totalPayout);
                    setMonthlyPvtCarPayout(pvtCarMonthlyTotals.totalPayout);
                    setDailyPvtCarPayout(pvtCarDailyTotals.totalPayout);
                    setTotalPvtCarCount(pvtCarYearlyTotals.totalCount);
                    setMonthlyPvtCarCount(pvtCarMonthlyTotals.totalCount);
                    setDailyPvtCarCount(pvtCarDailyTotals.totalCount);

                    setTotalTwPayout(twYearlyTotals.totalPayout);
                    setMonthlyTwPayout(twMonthlyTotals.totalPayout);
                    setDailyTwPayout(twDailyTotals.totalPayout);
                    setTotalTwCount(twYearlyTotals.totalCount);
                    setMonthlyTwCount(twMonthlyTotals.totalCount);
                    setDailyTwCount(twDailyTotals.totalCount);

                    setTotalHealthPayout(healthYearlyTotals.totalPayout);
                    setMonthlyHealthPayout(healthMonthlyTotals.totalPayout);
                    setDailyHealthPayout(healthDailyTotals.totalPayout);
                    setTotalHealthCount(healthYearlyTotals.totalCount);
                    setMonthlyHealthCount(healthMonthlyTotals.totalCount);
                    setDailyHealthCount(healthDailyTotals.totalCount);

                    setTotalNonMotorPayout(nonMotorYearlyTotals.totalPayout);
                    setMonthlyNonMotorPayout(nonMotorMonthlyTotals.totalPayout);
                    setDailyNonMotorPayout(nonMotorDailyTotals.totalPayout);
                    setTotalNonMotorCount(nonMotorYearlyTotals.totalCount);
                    setMonthlyNonMotorCount(nonMotorMonthlyTotals.totalCount);
                    setDailyNonMotorCount(nonMotorDailyTotals.totalCount);

                });

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [name, dailyCvPayout, totalCvPayout, monthlyCvPayout]);

    return (
        <>
            <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="grid xl:flex lg:flex md:grid sm:grid items-center xl:justify-between h-16 rounded bg-orange-700 shadow-2xl drop-shadow-2xl shadow-orange-950">
                    <span className="sm:block mx-1 sm:mx-2 lg:mx-3 xl:mx-6 px-2 py-1 rounded text-xs sm:text-sm md:text-base lg:text-base xl:text-lg font-semibold text-black-500 bg-[white]/50 focus:ring-[#050708]/50">YTD NOP</span>
                    <animated.span className="mx-1 sm:mx-2 lg:mx-3 xl:mx-6 text-base sm:text-base md:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-200">
                        {allDetailsProps.number.to(n => n.toFixed(0))}
                    </animated.span>
                </div>

                <div className="grid xl:flex lg:flex md:grid sm:grid items-center xl:justify-between h-16 rounded bg-orange-700 shadow-2xl drop-shadow-2xl shadow-orange-950">
                    <span className="sm:block mx-1 sm:mx-2 lg:mx-3 xl:mx-6 px-2 py-1 rounded text-xs sm:text-sm md:text-base lg:text-base xl:text-lg font-semibold text-black-500 bg-[white]/50 focus:ring-[#050708]/50 xl:whitespace-nowrap">MTD NOP</span>
                    <animated.span className="mx-1 sm:mx-2 lg:mx-3 xl:mx-6 text-base sm:text-base md:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-200">
                        {monthlyProps.number.to(n => n.toFixed(0))}
                    </animated.span>
                </div>

                <div className="grid xl:flex lg:flex md:grid sm:grid items-center xl:justify-between h-16 rounded bg-orange-700 shadow-2xl drop-shadow-2xl shadow-orange-950">
                    <span className="sm:block mx-1 sm:mx-2 lg:mx-3 xl:mx-6 px-2 py-1 rounded text-xs sm:text-sm md:text-base lg:text-base xl:text-lg font-semibold text-black-500 bg-[white]/50 focus:ring-[#050708]/50">TODAY NOP</span>
                    <animated.span className="mx-1 sm:mx-2 lg:mx-3 xl:mx-6 text-base sm:text-base md:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-200">
                        {dailyProps.number.to(n => n.toFixed(0))}
                    </animated.span>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-3 mb-1">
                <div className="block">
                    <h1 className="uppercase font-serif text-sm sm:text-base lg:text-xl xl:text-2xl text-center">NET SALES</h1>
                    <div className="mb-3 grid xl:flex lg:grid md:grid sm:grid items-center xl:justify-between h-16 lg:p-1 lg:h-16 xl:h-16 rounded bg-orange-700 shadow-2xl drop-shadow-2xl shadow-orange-950">
                        <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2 py-0.5 rounded text-xs sm:text-xs md:text-sm lg:text-base xl:text-base font-semibold text-black-500 bg-[white]/50 focus:ring-[#050708]/50 uppercase">YTD NOP PREM.</span>
                        <animated.span className="mx-1 sm:mx-2 lg:mx-1 xl:mx-2 text-xs sm:text-xs md:text-base lg:text-lg xl:text-xl font-bold text-gray-200">
                            {totalNsellProps.number.to(n => `₹ ${n.toFixed(0)}`)}
                        </animated.span>
                    </div>

                    <div className="mb-3 grid xl:flex lg:grid md:grid sm:grid items-center xl:justify-between h-16 lg:p-1 lg:h-16 xl:h-16 rounded bg-orange-700 shadow-2xl drop-shadow-2xl shadow-orange-950">
                        <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2 py-0.5 rounded text-xs sm:text-xs md:text-sm lg:text-base xl:text-base font-semibold text-black-500 bg-[white]/50 focus:ring-[#050708]/50 uppercase">MTD NOP PREM.</span>
                        <animated.span className="mx-1 sm:mx-2 lg:mx-1 xl:mx-2 text-xs sm:text-xs md:text-base lg:text-lg xl:text-xl font-bold text-gray-200">
                            {monthlyNsellProps.number.to(n => `₹ ${n.toFixed(0)}`)}
                        </animated.span>
                    </div>

                    <div className="mb-3 grid xl:flex lg:grid md:grid sm:grid items-center xl:justify-between h-16 lg:p-1 lg:h-16 xl:h-16 rounded bg-orange-700 shadow-2xl drop-shadow-2xl shadow-orange-950">
                        <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2 py-0.5 rounded text-xs sm:text-xs md:text-sm lg:text-base xl:text-base font-semibold text-black-500 bg-[white]/50 focus:ring-[#050708]/50 uppercase">TODAY NOP PREM.</span>
                        <animated.span className="mx-1 sm:mx-2 lg:mx-1 xl:mx-2 text-xs sm:text-xs md:text-base lg:text-lg xl:text-xl font-bold text-gray-200">
                            {dailyNsellProps.number.to(n => `₹ ${n.toFixed(0)}`)}
                        </animated.span>
                    </div>
                </div>

                <div className="block">
                    <h1 className="uppercase font-serif text-sm sm:text-base lg:text-xl xl:text-2xl text-center">FINAL SALES</h1>
                    <div className="mb-3 grid xl:flex lg:grid md:grid sm:grid items-center xl:justify-between h-16 lg:p-1 lg:h-16 xl:h-16 rounded bg-orange-700 shadow-2xl drop-shadow-2xl shadow-orange-950">
                        <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2 py-0.5 rounded text-xs sm:text-xs md:text-sm lg:text-base xl:text-base font-semibold text-black-500 bg-[white]/50 focus:ring-[#050708]/50 uppercase">YTD NOP PREM.</span>
                        <animated.span className="mx-1 sm:mx-2 lg:mx-1 xl:mx-2 text-xs sm:text-xs md:text-base lg:text-lg xl:text-xl font-bold text-gray-200">
                            {totalFsellProps.number.to(n => `₹ ${n.toFixed(0)}`)}
                        </animated.span>
                    </div>

                    <div className="mb-3 grid xl:flex lg:grid md:grid sm:grid items-center xl:justify-between h-16 lg:p-1 lg:h-16 xl:h-16 rounded bg-orange-700 shadow-2xl drop-shadow-2xl shadow-orange-950">
                        <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2 py-0.5 rounded text-xs sm:text-xs md:text-sm lg:text-base xl:text-base font-semibold text-black-500 bg-[white]/50 focus:ring-[#050708]/50 uppercase">MTD NOP PREM.</span>
                        <animated.span className="mx-1 sm:mx-2 lg:mx-1 xl:mx-2 text-xs sm:text-xs md:text-base lg:text-lg xl:text-xl font-bold text-gray-200">
                            {monthlyFsellProps.number.to(n => `₹ ${n.toFixed(0)}`)}
                        </animated.span>
                    </div>

                    <div className="mb-3 grid xl:flex lg:grid md:grid sm:grid items-center xl:justify-between h-16 lg:p-1 lg:h-16 xl:h-16 rounded bg-orange-700 shadow-2xl drop-shadow-2xl shadow-orange-950">
                        <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2 py-0.5 rounded text-xs sm:text-xs md:text-sm lg:text-base xl:text-base font-semibold text-black-500 bg-[white]/50 focus:ring-[#050708]/50 uppercase">TODAY NOP PREM.</span>
                        <animated.span className="mx-1 sm:mx-2 lg:mx-1 xl:mx-2 text-xs sm:text-xs md:text-base lg:text-lg xl:text-xl font-bold text-gray-200">
                            {dailyFsellProps.number.to(n => `₹ ${n.toFixed(0)}`)}
                        </animated.span>
                    </div>
                </div>

                {/* cv */}
                <div className="block">
                    <h1 className="uppercase font-serif text-sm sm:text-base lg:text-xl xl:text-2xl">CV </h1>
                    <div className="mb-3 grid xl:flex lg:grid md:grid sm:grid items-center xl:justify-between h-20 lg:p-1 lg:h-24 xl:h-16  rounded bg-orange-700 shadow-2xl drop-shadow-2xl shadow-orange-950">
                        <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2 0.5 rounded text-xs sm:text-xs md:text-sm lg:text-base xl:text-base font-semibold text-black-500 bg-[white]/50 focus:ring-[#050708]/50 uppercase">
                            YTD NOP
                        </span>
                        <animated.span className="mx-1 text-xs sm:text-xs md:text-base lg:text-base xl:text-lg font-bold text-gray-200">
                            {totalCvCountProps.number.to((n) => n.toFixed(0))}
                        </animated.span>
                        <animated.span className="mx-1 sm:mx-2 lg:mx-1 xl:mx-2 text-xs sm:text-xs md:text-base lg:text-base xl:text-lg font-bold text-gray-200">
                            {totalCvPayoutProps.number.to((n) => `₹ ${n.toFixed(0)}`)}
                        </animated.span>
                    </div>

                    <div className="mb-3 grid xl:flex lg:grid md:grid sm:grid items-center xl:justify-between h-20 lg:p-1 lg:h-24 xl:h-16 rounded bg-orange-700 shadow-2xl drop-shadow-2xl shadow-orange-950">
                        <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2 py-0.5 rounded text-xs sm:text-xs md:text-sm lg:text-base xl:text-base  font-semibold text-black-500 bg-[white]/50 focus:ring-[#050708]/50 uppercase">
                            MTD NOP
                        </span>
                        <animated.span className="mx-1 text-xs sm:text-xs md:text-base lg:text-base xl:text-lg font-bold text-gray-200">
                            {monthlyCvCountProps.number.to((n) => n.toFixed(0))}
                        </animated.span>
                        <animated.span className="mx-1 sm:mx-2 lg:mx-1 xl:mx-2 text-xs sm:text-xs md:text-base lg:text-base xl:text-lg font-bold text-gray-200">
                            {monthlyCvPayoutProps.number.to((n) => `₹ ${n.toFixed(0)}`)}
                        </animated.span>
                    </div>

                    <div className="mb-3 grid xl:flex lg:grid md:grid sm:grid items-center xl:justify-between h-20 lg:p-1 lg:h-24 xl:h-16 rounded bg-orange-700 shadow-2xl drop-shadow-2xl shadow-orange-950">
                        <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2 py-0.5 rounded text-xs sm:text-xs md:text-sm lg:text-base xl:text-base  font-semibold text-black-500 bg-[white]/50 focus:ring-[#050708]/50 uppercase">
                            TODAY NOP
                        </span>
                        <animated.span className="mx-1 text-xs sm:text-xs md:text-base lg:text-base xl:text-lg font-bold text-gray-200">
                            {dailyCvCountProps.number.to((n) => n.toFixed(0))}
                        </animated.span>
                        <animated.span className="mx-1 sm:mx-2 lg:mx-1 xl:mx-2 text-xs sm:text-xs md:text-base lg:text-base xl:text-lg font-bold text-gray-200">
                            {dailyCvPayoutProps.number.to((n) => `₹ ${n.toFixed(0)}`)}
                        </animated.span>
                    </div>
                </div>

                {/* pvt-car */}
                <div className="block">
                    <h1 className="uppercase font-serif text-sm sm:text-base lg:text-xl xl:text-2xl">pvt-car </h1>
                    <div className="mb-3 grid xl:flex lg:grid md:grid sm:grid items-center xl:justify-between h-20 lg:p-1 lg:h-24 xl:h-16 rounded bg-orange-700 shadow-2xl drop-shadow-2xl shadow-orange-950">
                        <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2 py-0.5 rounded text-xs sm:text-xs md:text-sm lg:text-base xl:text-base font-semibold text-black-500 bg-[white]/50 focus:ring-[#050708]/50 uppercase">
                            YTD NOP
                        </span>
                        <animated.span className="mx-1 text-xs sm:text-xs md:text-base lg:text-base xl:text-lg font-bold text-gray-200">
                            {totalPvtCarCountProps.number.to((n) => n.toFixed(0))}
                        </animated.span>
                        <animated.span className="mx-1 sm:mx-2 lg:mx-1 xl:mx-2 text-xs sm:text-xs md:text-base lg:text-base xl:text-lg font-bold text-gray-200">
                            {totalPvtCarPayoutProps.number.to((n) => `₹ ${n.toFixed(0)}`)}
                        </animated.span>
                    </div>

                    <div className="mb-3 grid xl:flex lg:grid md:grid sm:grid items-center xl:justify-between h-20 lg:p-1 lg:h-24 xl:h-16 rounded bg-orange-700 shadow-2xl drop-shadow-2xl shadow-orange-950">
                        <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2 py-0.5 rounded text-xs sm:text-xs md:text-sm lg:text-base xl:text-base font-semibold text-black-500 bg-[white]/50 focus:ring-[#050708]/50 uppercase">
                            MTD NOP
                        </span>
                        <animated.span className="mx-1  text-xs sm:text-xs md:text-base lg:text-base xl:text-lg font-bold text-gray-200">
                            {monthlyPvtCarCountProps.number.to((n) => n.toFixed(0))}
                        </animated.span>
                        <animated.span className="mx-1 sm:mx-2 lg:mx-1 xl:mx-2 text-xs sm:text-xs md:text-base lg:text-base xl:text-lg font-bold text-gray-200">
                            {monthlyPvtCarPayoutProps.number.to((n) => `₹ ${n.toFixed(0)}`)}
                        </animated.span>
                    </div>

                    <div className="mb-3 grid xl:flex lg:grid md:grid sm:grid items-center xl:justify-between h-20 lg:p-1 lg:h-24 xl:h-16 rounded bg-orange-700 shadow-2xl drop-shadow-2xl shadow-orange-950">
                        <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2 py-0.5 rounded text-xs sm:text-xs md:text-sm lg:text-base xl:text-base font-semibold text-black-500 bg-[white]/50 focus:ring-[#050708]/50 uppercase">
                            TODAY NOP
                        </span>
                        <animated.span className="mx-1 text-xs sm:text-xs md:text-base lg:text-base xl:text-lg font-bold text-gray-200">
                            {dailyPvtCarCountProps.number.to((n) => n.toFixed(0))}
                        </animated.span>
                        <animated.span className="mx-1 sm:mx-2 lg:mx-1 xl:mx-2 text-xs sm:text-xs md:text-base lg:text-base xl:text-lg font-bold text-gray-200">
                            {dailyPvtCarPayoutProps.number.to((n) => `₹ ${n.toFixed(0)}`)}
                        </animated.span>
                    </div>
                </div>


                {/* TW */}
                <div className="block">
                    <h1 className="uppercase font-serif text-sm sm:text-base lg:text-xl xl:text-2xl">tw </h1>
                    <div className="mb-3 grid xl:flex lg:grid md:grid sm:grid items-center xl:justify-between h-20 lg:p-1 lg:h-24 xl:h-16 rounded bg-orange-700 shadow-2xl drop-shadow-2xl shadow-orange-950">
                        <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2 py-0.5 rounded text-xs sm:text-xs md:text-sm lg:text-base xl:text-base font-semibold text-black-500 bg-[white]/50 focus:ring-[#050708]/50 uppercase">
                            YTD NOP
                        </span>
                        <animated.span className="mx-1 text-xs sm:text-xs md:text-base lg:text-base xl:text-lg font-bold text-gray-200">
                            {totalTwCountProps.number.to((n) => n.toFixed(0))}
                        </animated.span>
                        <animated.span className="mx-1 sm:mx-2 lg:mx-1 xl:mx-2 text-xs sm:text-xs md:text-base lg:text-base xl:text-lg font-bold text-gray-200">
                            {totalTwPayoutProps.number.to((n) => `₹ ${n.toFixed(0)}`)}
                        </animated.span>
                    </div>

                    <div className="mb-3 grid xl:flex lg:grid md:grid sm:grid items-center xl:justify-between h-20 lg:p-1 lg:h-24 xl:h-16 rounded bg-orange-700 shadow-2xl drop-shadow-2xl shadow-orange-950">
                        <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2 py-0.5 rounded text-xs sm:text-xs md:text-sm lg:text-base xl:text-base font-semibold text-black-500 bg-[white]/50 focus:ring-[#050708]/50 uppercase">
                            MTD NOP
                        </span>
                        <animated.span className="mx-1  text-xs sm:text-xs md:text-base lg:text-base xl:text-lg font-bold text-gray-200">
                            {monthlyTwCountProps.number.to((n) => n.toFixed(0))}
                        </animated.span>
                        <animated.span className="mx-1 sm:mx-2 lg:mx-1 xl:mx-2 text-xs sm:text-xs md:text-base lg:text-base xl:text-lg font-bold text-gray-200">
                            {monthlyTwPayoutProps.number.to((n) => `₹ ${n.toFixed(0)}`)}
                        </animated.span>
                    </div>

                    <div className="mb-3 grid xl:flex lg:grid md:grid sm:grid items-center xl:justify-between h-20 lg:p-1 lg:h-24 xl:h-16 rounded bg-orange-700 shadow-2xl drop-shadow-2xl shadow-orange-950">
                        <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2 py-0.5 rounded text-xs sm:text-xs md:text-sm lg:text-base xl:text-base font-semibold text-black-500 bg-[white]/50 focus:ring-[#050708]/50 uppercase">
                            TODAY NOP
                        </span>
                        <animated.span className="mx-1 text-xs sm:text-xs md:text-base lg:text-base xl:text-lg font-bold text-gray-200">
                            {dailyTwCountProps.number.to((n) => n.toFixed(0))}
                        </animated.span>
                        <animated.span className="mx-1 sm:mx-2 lg:mx-1 xl:mx-2 text-xs sm:text-xs md:text-base lg:text-base xl:text-lg font-bold text-gray-200">
                            {dailyTwPayoutProps.number.to((n) => `₹ ${n.toFixed(0)}`)}
                        </animated.span>
                    </div>
                </div>


                {/* HEALTH */}
                <div className="block">
                    <h1 className="uppercase font-serif text-sm sm:text-base lg:text-xl xl:text-2xl">health </h1>
                    <div className="mb-3 grid xl:flex lg:grid md:grid sm:grid items-center xl:justify-between h-20 lg:p-1 lg:h-24 xl:h-16 rounded bg-orange-700 shadow-2xl drop-shadow-2xl shadow-orange-950">
                        <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2 py-0.5 rounded text-xs sm:text-xs md:text-sm lg:text-base xl:text-base font-semibold text-black-500 bg-[white]/50 focus:ring-[#050708]/50 uppercase">
                            YTD NOP
                        </span>
                        <animated.span className="mx-1 text-xs sm:text-xs md:text-base lg:text-base xl:text-lg font-bold text-gray-200">
                            {totalHealthCountProps.number.to((n) => n.toFixed(0))}
                        </animated.span>
                        <animated.span className="mx-1 sm:mx-2 lg:mx-1 xl:mx-2 text-xs sm:text-xs md:text-base lg:text-base xl:text-lg font-bold text-gray-200">
                            {totalHealthPayoutProps.number.to((n) => `₹ ${n.toFixed(0)}`)}
                        </animated.span>
                    </div>

                    <div className="mb-3 grid xl:flex lg:grid md:grid sm:grid items-center xl:justify-between h-20 lg:p-1 lg:h-24 xl:h-16 rounded bg-orange-700 shadow-2xl drop-shadow-2xl shadow-orange-950">
                        <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2 py-0.5 rounded text-xs sm:text-xs md:text-sm lg:text-base xl:text-base font-semibold text-black-500 bg-[white]/50 focus:ring-[#050708]/50 uppercase">
                            MTD NOP
                        </span>
                        <animated.span className="mx-1 text-xs sm:text-xs md:text-base lg:text-base xl:text-lg font-bold text-gray-200">
                            {monthlyHealthCountProps.number.to((n) => n.toFixed(0))}
                        </animated.span>
                        <animated.span className="mx-1 sm:mx-2 lg:mx-1 xl:mx-2 text-xs sm:text-xs md:text-base lg:text-base xl:text-lg font-bold text-gray-200">
                            {monthlyHealthPayoutProps.number.to((n) => `₹ ${n.toFixed(0)}`)}
                        </animated.span>
                    </div>

                    <div className="mb-3 grid xl:flex lg:grid md:grid sm:grid items-center xl:justify-between h-20 lg:p-1 lg:h-24 xl:h-16 rounded bg-orange-700 shadow-2xl drop-shadow-2xl shadow-orange-950">
                        <span className="sm:block lg:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2 py-0.5 rounded text-xs sm:text-xs md:text-sm lg:text-base xl:text-base font-semibold text-black-500 bg-[white]/50 focus:ring-[#050708]/50 uppercase">
                            TODAY NOP
                        </span>
                        <animated.span className="mx-1 text-xs sm:text-xs md:text-base lg:text-base xl:text-lg font-bold text-gray-200">
                            {dailyHealthCountProps.number.to((n) => n.toFixed(0))}
                        </animated.span>
                        <animated.span className="mx-1 sm:mx-2 lg:mx-1 xl:mx-2 text-xs sm:text-xs md:text-base lg:text-base xl:text-lg font-bold text-gray-200">
                            {dailyHealthPayoutProps.number.to((n) => `₹ ${n.toFixed(0)}`)}
                        </animated.span>
                    </div>
                </div>

                {/* NON-MOTOR */}
                <div className="block">
                    <h1 className="uppercase font-serif text-sm sm:text-base lg:text-xl xl:text-2xl">NON-MOTOR </h1>
                    <div className="mb-3 grid xl:flex lg:grid md:grid sm:grid items-center xl:justify-between h-20 lg:p-1 lg:h-24 xl:h-16 rounded bg-orange-700 shadow-2xl drop-shadow-2xl shadow-orange-950">
                        <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2 py-0.5 rounded text-xs sm:text-xs md:text-sm lg:text-base xl:text-base font-semibold text-black-500 bg-[white]/50 focus:ring-[#050708]/50 uppercase">
                            YTD NOP
                        </span>
                        <animated.span className="mx-1 text-xs sm:text-xs md:text-base lg:text-base xl:text-lg font-bold text-gray-200">
                            {totalNonMotorCountProps.number.to((n) => n.toFixed(0))}
                        </animated.span>
                        <animated.span className="mx-1 sm:mx-2 lg:mx-1 xl:mx-2 text-xs sm:text-xs md:text-base lg:text-base xl:text-lg font-bold text-gray-200">
                            {totalNonMotorPayoutProps.number.to((n) => `₹ ${n.toFixed(0)}`)}
                        </animated.span>
                    </div>

                    <div className="mb-3 grid xl:flex lg:grid md:grid sm:grid items-center xl:justify-between h-20 lg:p-1 lg:h-24 xl:h-16 rounded bg-orange-700 shadow-2xl drop-shadow-2xl shadow-orange-950">
                        <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2 py-0.5 rounded text-xs sm:text-xs md:text-sm lg:text-base xl:text-base font-semibold text-black-500 bg-[white]/50 focus:ring-[#050708]/50 uppercase">
                            MTD NOP
                        </span>
                        <animated.span className="mx-1 text-xs sm:text-xs md:text-base lg:text-base xl:text-lg font-bold text-gray-200">
                            {monthlyNonMotorCountProps.number.to((n) => n.toFixed(0))}
                        </animated.span>
                        <animated.span className="mx-1 sm:mx-2 lg:mx-1 xl:mx-2 text-xs sm:text-xs md:text-base lg:text-base xl:text-lg font-bold text-gray-200">
                            {monthlyNonMotorPayoutProps.number.to((n) => `₹ ${n.toFixed(0)}`)}
                        </animated.span>
                    </div>

                    <div className="mb-3 grid xl:flex lg:grid md:grid sm:grid items-center xl:justify-between h-20 lg:p-1 lg:h-24 xl:h-16 rounded bg-orange-700 shadow-2xl drop-shadow-2xl shadow-orange-950">
                        <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2 py-0.5 rounded text-xs sm:text-xs md:text-sm lg:text-base xl:text-base font-semibold text-black-500 bg-[white]/50 focus:ring-[#050708]/50 uppercase">
                            TODAY NOP
                        </span>
                        <animated.span className="mx-1 text-xs sm:text-xs md:text-base lg:text-base xl:text-lg font-bold text-gray-200">
                            {dailyNonMotorCountProps.number.to((n) => n.toFixed(0))}
                        </animated.span>
                        <animated.span className="mx-1 sm:mx-2 lg:mx-1 xl:mx-2 text-xs sm:text-xs md:text-base lg:text-base xl:text-lg font-bold text-gray-200">
                            {dailyNonMotorPayoutProps.number.to((n) => `₹ ${n.toFixed(0)}`)}
                        </animated.span>
                    </div>
                </div>

            </div>

            {/* one liners 5  */}
            <div className="grid grid-cols-5 gap-3 my-4">
                <div className="block">
                    <div className="mb-3 xl:mb-0 grid xl:flex lg:grid md:grid sm:grid items-center xl:justify-between h-16 text-white lg:p-1 lg:h-16 xl:h-16 rounded bg-blue-500 shadow-2xl drop-shadow-2xl shadow-orange-950">
                        <span className="sm:block mx-1 sm:mx-1 lg:mx-1 xl:mx-2 px-2 py-0.5 rounded text-xs sm:text-xs md:text-sm lg:text-base xl:text-base font-semibold text-black-500 bg-[black]/50 focus:ring-[#050708]/50 uppercase">
                            Total ADVISORS
                        </span>
                        <animated.span className="mx-1 text-xs sm:text-xs md:text-base lg:text-lg xl:text-xl font-bold text-gray-200">
                            {advisorDataProps.number.to((n) => n.toFixed(0))}
                        </animated.span>
                    </div>
                </div>

                <div className="block">
                    <div className="mb-3 xl:mb-0 grid xl:flex lg:grid md:grid sm:grid items-center xl:justify-between h-16 lg:p-1 lg:h-16 xl:h-16 rounded bg-green-700 shadow-2xl drop-shadow-2xl shadow-orange-950">
                        <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2 py-0.5 rounded text-xs sm:text-xs md:text-sm lg:text-base xl:text-base font-semibold text-black-500 bg-[white]/50 focus:ring-[#050708]/50 uppercase">
                            Active / total
                        </span>
                        <span>
                            <animated.span className="mx-0.5 text-xs sm:text-xs md:text-base lg:text-lg xl:text-xl font-bold text-gray-200">
                                {activeempCountProps.number.to(n => n.toFixed(0))}
                            </animated.span>
                            <span className="mx-0.5 text-xs sm:text-xs md:text-base lg:text-lg xl:text-xl font-bold text-gray-200">/</span>
                            <animated.span className="mx-0.5 text-xs sm:text-xs md:text-base lg:text-lg xl:text-xl font-bold text-gray-200">
                                {empCountProps.number.to(n => n.toFixed(0))}
                            </animated.span>
                        </span>
                    </div>
                </div>

                <div className="block">
                    <div className="mb-3 xl:mb-0 grid xl:flex lg:grid md:grid sm:grid items-center xl:justify-between h-16 lg:p-1 lg:h-16 xl:h-16 rounded bg-green-700 shadow-2xl drop-shadow-2xl shadow-orange-950">
                        <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2 py-0.5 rounded text-xs sm:text-xs md:text-sm lg:text-base xl:text-base font-semibold text-black-500 bg-[white]/50 focus:ring-[#050708]/50 uppercase">
                            Att. / Active
                        </span>
                        <span>
                            <animated.span className="mx-0.5 text-xs sm:text-xs md:text-base lg:text-lg xl:text-xl font-bold text-gray-200">
                                {currAttendanceProps.number.to(n => n.toFixed(0))}
                            </animated.span>
                            <span className="mx-0.5 text-xs sm:text-xs md:text-base lg:text-lg xl:text-xl font-bold text-gray-200">/</span>
                            <animated.span className="mx-0.5 text-xs sm:text-xs md:text-base lg:text-lg xl:text-xl font-bold text-gray-200">
                                {activeempCountProps.number.to(n => n.toFixed(0))}
                            </animated.span>
                        </span>
                    </div>
                </div>

                <div className="block">
                    <div className="mb-3 xl:mb-0 grid xl:flex lg:grid md:grid sm:grid items-center xl:justify-between h-16 lg:p-1 lg:h-16 xl:h-16 rounded bg-red-800 shadow-2xl drop-shadow-2xl shadow-orange-950">
                        <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2 py-0.5 rounded text-xs sm:text-xs md:text-sm lg:text-base xl:text-base font-semibold text-black-500 bg-[white]/60 focus:ring-[#050708]/50 uppercase">
                            APPROVED / TOTAL
                        </span>
                        <span>
                            <animated.span className="mx-0.5 text-xs sm:text-xs md:text-base lg:text-lg xl:text-xl font-bold text-gray-200">
                                {acptLeaveCountsProps.number.to(n => n.toFixed(0))}
                            </animated.span>
                            <span className="mx-0.5 text-xs sm:text-xs md:text-base lg:text-lg xl:text-xl font-bold text-gray-200">/</span>
                            <animated.span className="mx-0.5 text-xs sm:text-xs md:text-base lg:text-lg xl:text-xl font-bold text-gray-200">
                                {totalLeavesCountsProps.number.to(n => n.toFixed(0))}
                            </animated.span>
                        </span>
                    </div>
                </div>

                <div className="block">
                    <div className="mb-3 xl:mb-0 grid xl:flex lg:grid md:grid sm:grid items-center xl:justify-between h-16 lg:p-1 lg:h-16 xl:h-16 rounded bg-red-800 shadow-2xl drop-shadow-2xl shadow-orange-950">
                        <span className="sm:block mx-1 sm:mx-2 lg:mx-1 xl:mx-2 px-2 py-0.5 rounded text-xs sm:text-xs md:text-sm lg:text-base xl:text-base font-semibold text-black-500 bg-[white]/60 focus:ring-[#050708]/50 uppercase">
                            REJECTED / TOTAL
                        </span>
                        <span>
                            <animated.span className="mx-0.5 text-xs sm:text-xs md:text-base lg:text-lg xl:text-xl font-bold text-gray-200">
                                {trejLeaveCountsProps.number.to(n => n.toFixed(0))}
                            </animated.span>
                            <span className="mx-0.5 text-xs sm:text-xs md:text-base lg:text-lg xl:text-xl font-bold text-gray-200">/</span>
                            <animated.span className="mx-0.5 text-xs sm:text-xs md:text-base lg:text-lg xl:text-xl font-bold text-gray-200">
                                {totalLeavesCountsProps.number.to(n => n.toFixed(0))}
                            </animated.span>
                        </span>
                    </div>
                </div>
            </div>

            {/* tw cv car pvt car */}

        </>
    );
}

export default DashBranches;
