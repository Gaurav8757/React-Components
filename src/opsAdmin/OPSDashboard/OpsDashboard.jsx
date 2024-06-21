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

                startTransition(() => {
                    setYearlyData(filteredYearlyData.length);
                    setMonthlyData(filteredMonthlyData.length);
                    setDailyData(filteredDailyData.length);
                });

            } catch (error) {
                console.error("Error fetching data:", error);
                toast.error("Failed to fetch data.");
            }
        };
        fetchData();
    }, []);

    return (
        <div className="grid grid-cols-3 gap-3 mb-4">
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
    );
}

export default OpsDashboard;
