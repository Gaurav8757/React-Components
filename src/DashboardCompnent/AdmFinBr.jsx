import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState, startTransition } from "react";
import { useSpring, animated } from '@react-spring/web';
import VITE_DATA from "../config/config.jsx";

function AdmFinBr() {
    const [allDetailsData, setAllDetailsData] = useState([]);
    const [monthlyData, setMonthlyData] = useState([]);
    const [dailyData, setDailyData] = useState([]);
    const [totalPayout, setTotalPayout] = useState(0);
    const [monthlyPayout, setMonthlyPayout] = useState(0);
    const [dailyPayout, setDailyPayout] = useState(0);
    const [totalBPayout, setTotalBPayout] = useState(0);
    const [monthlyBPayout, setMonthlyBPayout] = useState(0);
    const [dailyBPayout, setDailyBPayout] = useState(0);

    const [totalAPayout, setTotalAPayout] = useState(0);
    const [monthlyAPayout, setMonthlyAPayout] = useState(0);
    const [dailyAPayout, setDailyAPayout] = useState(0);

    const allDetailsProps = useSpring({ number: allDetailsData.length, from: { number: 0 } });
    const monthlyProps = useSpring({ number: monthlyData.length, from: { number: 0 } });
    const dailyProps = useSpring({ number: dailyData.length, from: { number: 0 } });

    const totalPayoutProps = useSpring({ number: totalPayout, from: { number: 0 } });
    const monthlyPayoutProps = useSpring({ number: monthlyPayout, from: { number: 0 } });
    const dailyPayoutProps = useSpring({ number: dailyPayout, from: { number: 0 } });

    const totalPayoutBProps = useSpring({ number: totalBPayout, from: { number: 0 } });
    const monthlyPayoutBProps = useSpring({ number: monthlyBPayout, from: { number: 0 } });
    const dailyPayoutBProps = useSpring({ number: dailyBPayout, from: { number: 0 } });

    const totalPayoutAProps = useSpring({ number: totalAPayout, from: { number: 0 } });
    const monthlyPayoutAProps = useSpring({ number: monthlyAPayout, from: { number: 0 } });
    const dailyPayoutAProps = useSpring({ number: dailyAPayout, from: { number: 0 } });

    useEffect(() => {
        const fetchData = async () => {
            const token = sessionStorage.getItem("token");
            if (!token) {
                toast.error("Not Authorized yet.. Try again!");
            } else {
                try {
                    const response = await axios.get(`${VITE_DATA}/alldetails/show/view`, {
                        headers: {
                            Authorization: `${token}`, // Send the token in the Authorization header
                        },
                    });

                    const allData = response.data;

                    const currentMonth = new Date().getMonth() + 1; // getMonth() is zero-based
                    const currentDay = new Date().getDate();
                    const currentYear = new Date().getFullYear();

                    const filteredMonthlyData = allData.filter(item => {
                        const itemDate = new Date(item.entryDate);
                        const itemMonth = itemDate.getMonth() + 1;
                        const itemYear = itemDate.getFullYear();
                        return itemMonth === currentMonth && itemYear === currentYear;
                    });

                    const filteredDailyData = allData.filter(item => {
                        const itemDate = new Date(item.entryDate);
                        const itemDay = itemDate.getDate();
                        const itemMonth = itemDate.getMonth() + 1;
                        const itemYear = itemDate.getFullYear();
                        return itemDay === currentDay && itemMonth === currentMonth && itemYear === currentYear;
                    });
                    // COMPANY CALCULATION 
                    const totalPayout = allData.reduce((sum, item) => sum + item.companyPayout, 0);
                    const monthlyPayout = filteredMonthlyData.reduce((sum, item) => sum + item.companyPayout, 0);
                    const dailyPayout = filteredDailyData.reduce((sum, item) => sum + item.companyPayout, 0);

                    // BRANCH CALCULATION
                    const totalBPayout = allData.reduce((sum, item) => sum + item.branchPayout, 0);
                    const monthlyBPayout = filteredMonthlyData.reduce((sum, item) => sum + item.branchPayout, 0);
                    const dailyBPayout = filteredDailyData.reduce((sum, item) => sum + item.branchPayout, 0);

                     // ADVISOR CALCULATION
                     const totalAPayout = allData.reduce((sum, item) => sum + item.advisorPayoutAmount, 0);
                     const monthlyAPayout = filteredMonthlyData.reduce((sum, item) => sum + item.advisorPayoutAmount, 0);
                     const dailyAPayout = filteredDailyData.reduce((sum, item) => sum + item.advisorPayoutAmount, 0);

                    startTransition(() => {
                        setAllDetailsData(allData);
                        setMonthlyData(filteredMonthlyData);
                        setDailyData(filteredDailyData);
                        setTotalPayout(totalPayout);
                        setMonthlyPayout(monthlyPayout);
                        setDailyPayout(dailyPayout);
                        setTotalBPayout(totalBPayout);
                        setMonthlyBPayout(monthlyBPayout);
                        setDailyBPayout(dailyBPayout);
                        setTotalAPayout(totalAPayout);
                        setMonthlyAPayout(monthlyAPayout);
                        setDailyAPayout(dailyAPayout);
                    });
                } catch (error) {
                    console.error("Policy calculation by ID caught an error", error);
                }
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="grid xl:flex lg:flex md:grid sm:grid items-center xl:justify-between h-24 rounded bg-orange-800 shadow-2xl shadow-orange-950">
                    <span className="sm:block mx-1 sm:mx-2 lg:mx-3 xl:mx-6  px-2 py-1 rounded text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-semibold text-black-500 bg-[white]/50 focus:ring-[#050708]/50">Total Policies</span>
                    <animated.span className="mx-1 sm:mx-2 lg:mx-3 xl:mx-6 text-base sm:text-base md:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-200">
                        {allDetailsProps.number.to((n) => n.toFixed(0))}
                    </animated.span>
                </div>

                <div className="grid xl:flex lg:flex md:grid sm:grid items-center xl:justify-between h-24 rounded bg-orange-800 shadow-2xl shadow-orange-950">
                    <span className="sm:block mx-1 sm:mx-2 lg:mx-3 xl:mx-6  px-2 py-1 rounded text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-semibold text-black-500 bg-[white]/50 focus:ring-[#050708]/50 xl:whitespace-nowrap">Monthly Policies</span>
                    <animated.span className="mx-1 sm:mx-2 lg:mx-3 xl:mx-6 text-base sm:text-base md:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-200">
                        {monthlyProps.number.to((n) => n.toFixed(0))}
                    </animated.span>
                </div>

                <div className="grid xl:flex lg:flex md:grid sm:grid items-center xl:justify-between h-24 rounded bg-orange-800 shadow-2xl shadow-orange-950">
                    <span className="sm:block mx-1 sm:mx-2 lg:mx-3 xl:mx-6  px-2 py-1 rounded text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-semibold text-black-500 bg-[white]/50 focus:ring-[#050708]/50">Daily Policies</span>
                    <animated.span className="mx-1 sm:mx-2 lg:mx-3 xl:mx-6 text-base sm:text-base md:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-200">
                        {dailyProps.number.to((n) => n.toFixed(0))}
                    </animated.span>

                </div>
            </div>

            <h1 className="uppercase font-serif text-base sm:text-xl lg:text-2xl xl:text-3xl">Payouts</h1>
            
            <div className="grid grid-cols-3 gap-4 mb-4">  
                {/* PART COMPANY PAYOUT */}
                <div className="block">
                    <div className="grid xl:flex lg:flex md:grid sm:grid items-center xl:justify-between h-20 rounded-t bg-orange-800 shadow-2xl shadow-orange-950">
                        <span className="sm:block mx-1 sm:mx-2 lg:mx-3 xl:mx-6 px-2 py-1 rounded text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-semibold text-black-500 bg-[white]/50 focus:ring-[#050708]/50">
                            Total Co. Payout
                        </span>
                        <animated.span className="mx-1 sm:mx-2 lg:mx-3 xl:mx-6 text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-200">
                            {totalPayoutProps.number.to((n) => `₹ ${n.toFixed(0)}`)}
                        </animated.span>
                    </div>

                    <div className="grid xl:flex lg:flex md:grid sm:grid items-center xl:justify-between h-20  bg-orange-800 shadow-2xl shadow-orange-950">
                        <span className="sm:block mx-1 sm:mx-2 lg:mx-3 xl:mx-6 px-2 py-1 rounded text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-semibold text-black-500 bg-[white]/50 focus:ring-[#050708]/50">
                            Monthly Co. Payout
                        </span>
                        <animated.span className="mx-1 sm:mx-2 lg:mx-3 xl:mx-6 text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-200">
                            {monthlyPayoutProps.number.to((n) => `₹ ${n.toFixed(0)}`)}
                        </animated.span>
                    </div>

                    <div className="grid xl:flex lg:flex md:grid sm:grid items-center xl:justify-between h-20 rounded-b bg-orange-800 shadow-2xl shadow-orange-950">
                        <span className="sm:block mx-1 sm:mx-2 lg:mx-3 xl:mx-6 px-2 py-1 rounded text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-semibold text-black-500 bg-[white]/50 focus:ring-[#050708]/50">
                            Daily Co. Payout
                        </span>
                        <animated.span className="mx-1 sm:mx-2 lg:mx-3 xl:mx-6 text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-200">
                            {dailyPayoutProps.number.to((n) => `₹ ${n.toFixed(0)}`)}
                        </animated.span>
                    </div>
                </div>

                {/* PART BRANCH PAYOUT */}
                <div className="block">
                    <div className="grid xl:flex lg:flex md:grid sm:grid items-center xl:justify-between h-20 rounded-t bg-orange-800 shadow-2xl shadow-orange-950">
                        <span className="sm:block mx-1 sm:mx-2 lg:mx-3 xl:mx-6 px-2 py-1 rounded text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-semibold text-black-500 bg-[white]/50 focus:ring-[#050708]/50">
                            Total Br. Payout
                        </span>
                        <animated.span className="mx-1 sm:mx-2 lg:mx-3 xl:mx-6 text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-200">
                            {totalPayoutBProps.number.to((n) => `₹ ${n.toFixed(0)}`)}
                        </animated.span>
                    </div>

                    <div className="grid xl:flex lg:flex md:grid sm:grid items-center xl:justify-between h-20  bg-orange-800 shadow-2xl shadow-orange-950">
                        <span className="sm:block mx-1 sm:mx-2 lg:mx-3 xl:mx-6 px-2 py-1 rounded text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-semibold text-black-500 bg-[white]/50 focus:ring-[#050708]/50">
                            Monthly Br.  Payout
                        </span>
                        <animated.span className="mx-1 sm:mx-2 lg:mx-3 xl:mx-6 text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-200">
                            {monthlyPayoutBProps.number.to((n) => `₹ ${n.toFixed(0)}`)}
                        </animated.span>
                    </div>

                    <div className="grid xl:flex lg:flex md:grid sm:grid items-center xl:justify-between h-20 rounded-b bg-orange-800 shadow-2xl shadow-orange-950">
                        <span className="sm:block mx-1 sm:mx-2 lg:mx-3 xl:mx-6 px-2 py-1 rounded text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-semibold text-black-500 bg-[white]/50 focus:ring-[#050708]/50">
                            Daily Br.  Payout
                        </span>
                        <animated.span className="mx-1 sm:mx-2 lg:mx-3 xl:mx-6 text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-200">
                            {dailyPayoutBProps.number.to((n) => `₹ ${n.toFixed(0)}`)}
                        </animated.span>
                    </div>
                </div>

 {/* PART ADVISOR PAYOUT */}
                <div className="block">
                    <div className="grid xl:flex lg:flex md:grid sm:grid items-center xl:justify-between h-20 rounded-t bg-orange-800 shadow-2xl shadow-orange-950">
                        <span className="sm:block mx-1 sm:mx-2 lg:mx-3 xl:mx-6 px-2 py-1 rounded text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-semibold text-black-500 bg-[white]/50 focus:ring-[#050708]/50">
                            Total Adv. Payout
                        </span>
                        <animated.span className="mx-1 sm:mx-2 lg:mx-3 xl:mx-6 text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-200">
                            {totalPayoutAProps.number.to((n) => `₹ ${n.toFixed(0)}`)}
                        </animated.span>
                    </div>

                    <div className="grid xl:flex lg:flex md:grid sm:grid items-center xl:justify-between h-20  bg-orange-800 shadow-2xl shadow-orange-950">
                        <span className="sm:block mx-1 sm:mx-2 lg:mx-3 xl:mx-6 px-2 py-1 rounded text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-semibold text-black-500 bg-[white]/50 focus:ring-[#050708]/50">
                            Monthly Adv. Payout
                        </span>
                        <animated.span className="mx-1 sm:mx-2 lg:mx-3 xl:mx-6 text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-200">
                            {monthlyPayoutAProps.number.to((n) => `₹ ${n.toFixed(0)}`)}
                        </animated.span>
                    </div>

                    <div className="grid xl:flex lg:flex md:grid sm:grid items-center xl:justify-between h-20 rounded-b bg-orange-800 shadow-2xl shadow-orange-950">
                        <span className="sm:block mx-1 sm:mx-2 lg:mx-3 xl:mx-6 px-2 py-1 rounded text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-semibold text-black-500 bg-[white]/50 focus:ring-[#050708]/50">
                            Daily Adv. Payout
                        </span>
                        <animated.span className="mx-1 sm:mx-2 lg:mx-3 xl:mx-6 text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-200">
                            {dailyPayoutAProps.number.to((n) => `₹ ${n.toFixed(0)}`)}
                        </animated.span>
                    </div>
                </div>

            </div>


            <div className="grid grid-cols-2 gap-4 mb-4">

            </div>

        </>
    );
}

export default AdmFinBr;
