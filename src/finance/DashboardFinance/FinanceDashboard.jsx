import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState, startTransition } from "react";
import VITE_DATA from "../../config/config.jsx";

function FinanceDashboard() {
    const [allDetailsData, setAllDetailsData] = useState([]);
    const [monthlyData, setMonthlyData] = useState([]);
    const [dailyData, setDailyData] = useState([]);
    const [staffData, setStaffData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const token = sessionStorage.getItem("token");
            if (!token) {
                toast.error("Not Authorized yet.. Try again!");
                return;
            }
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
                
                // Calculate NOP for today and month-to-date by staff
                const staffNameSet = new Set(allData.map(item => item.staffName));
                const uniqueStaffNames = Array.from(staffNameSet);

                const staffData = uniqueStaffNames.map(staffName => {
                    const dailyNOP = filteredDailyData.filter(item => item.staffName === staffName ).length;
                    
                    const monthlyNOP = filteredMonthlyData.filter(item => item.staffName === staffName).length;
                    console.log(monthlyNOP);
                    return { staffName, dailyNOP, monthlyNOP };
                });

                startTransition(() => {
                    setAllDetailsData(allData);
                    setMonthlyData(filteredMonthlyData);
                    setDailyData(filteredDailyData);
                    setStaffData(staffData);
                });
            } catch (error) {
                console.error("Policy calculation by ID caught an error", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">Finance Dashboard</h1>
            <div className="grid grid-cols-4 gap-2 p-2 bg-orange-700 text-white font-semibold shadow-2xl">
                <span className="whitespace-nowrap px-2 py-0.5 rounded text-xs uppercase">EMP NAME</span>
                <span className="whitespace-nowrap px-2 py-0.5 rounded text-xs uppercase">TODAY NOP</span>
                <span className="whitespace-nowrap px-2 py-0.5 rounded text-xs uppercase">MTD NOP</span>
            </div>
            {staffData.map(({ staffName, dailyNOP, monthlyNOP }) => (
                <div key={staffName} className="grid grid-cols-4 gap-2 p-2 bg-gray-100 text-black font-medium shadow-md">
                    <span className="whitespace-nowrap px-2 py-0.5 rounded text-xs uppercase">{staffName}</span>
                    <span className="whitespace-nowrap px-2 py-0.5 rounded text-xs uppercase">{dailyNOP}</span>
                    <span className="whitespace-nowrap px-2 py-0.5 rounded text-xs uppercase">{monthlyNOP}</span>
                </div>
            ))}
        </div>
    );
}

export default FinanceDashboard;
