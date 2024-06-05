import { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from 'xlsx';
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { format, startOfMonth, endOfMonth, addDays } from 'date-fns';
import VITE_DATA from "../../config/config.jsx";

function CurrentAttendance() {
    const [APIData, setAPIData] = useState([]);
    const [holidayData, setHolidayData] = useState([]);
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth() + 1); // Month starts from 0
    const [date, setDate] = useState(new Date().getDate());
    const [attendanceStatus, setAttendanceStatus] = useState("");
    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            toast.error("Not Authorized yet.. Try again! ");
        } else {
            axios
                .get(`${VITE_DATA}/holidays/alllists`, {
                    headers: {
                        Authorization: `${token}`,
                    },
                })
                .then((response) => {
                    setHolidayData(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, []);

    useEffect(() => {
        axios
            .get(`${VITE_DATA}/api/employee-list`, {
                headers: {
                    Authorization: `${sessionStorage.getItem("token")}`,
                },
            })
            .then((response) => {
                setAPIData(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);



    const handleYearChange = (e) => {
        setYear(parseInt(e.target.value));
    };

    const handleMonthChange = (e) => {
        setMonth(parseInt(e.target.value));
    };

    const handleDateChange = (e) => {
        setDate(parseInt(e.target.value));
    };

    const handleAttendanceStatusChange = (e) => {
        setAttendanceStatus(e.target.value);
    };

    const renderYears = () => {
        const currentYear = new Date().getFullYear();
        const years = [];
        for (let y = currentYear; y >= 2000; y--) {
            years.push(<option key={y} value={y}>{y}</option>);
        }
        return years;
    };

    const renderMonths = () => {
        const months = [];
        for (let m = 1; m <= 12; m++) {
            const date = new Date(year, m - 1, 1);
            const monthName = format(date, 'MMMM');
            months.push(<option key={m} value={m}>{monthName}</option>);
        }
        return months;
    };

    const renderDates = () => {
        const startDate = startOfMonth(new Date(year, month - 1));
        const endDate = endOfMonth(new Date(year, month - 1));
        const dates = [];
        for (let date = startDate; date <= endDate; date = addDays(date, 1)) {
            const formattedDate = format(date, 'dd');
            dates.push(<option key={formattedDate} value={formattedDate}>{formattedDate}</option>);
        }
        return dates;
    };

    const renderTableHeaders = () => {
        const headers = [];
        const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        for (let i = 1; i <= 1; i++) { // Loop only once to generate one column
            const currentDate = new Date(year, month - 1, date); // Construct date for the selected date

            const formattedDate = date.toString().padStart(2, '0');
            const weekdayIndex = currentDate.getDay();
            const weekday = weekdays[weekdayIndex];
            const formattedDateStr = currentDate.toLocaleDateString('en-GB');
            const holiday = holidayData.find(holiday => holiday.hdate === formattedDateStr);
            const isHoliday = !!holiday;

            headers.push(
                <th className={`border z-100  border-orange-700 text-lg p-0 py-2 sticky ${isHoliday === true ? 'bg-cyan-400 ' : weekdayIndex === 0 ? 'bg-red-300 text-red-700' : 'bg-slate-100'}`}
                    key={i} >
                    <div >{formattedDate}</div>
                    <div>{weekday}</div>
                    <span className="text-red-700 ">{isHoliday ? holiday.hdays : ''}</span>

                </th>
            );
        }
        return headers;
    };

    const renderCalendar = () => {
        const sortedAPIData = APIData.slice().sort((a, b) => {
            const empidA = parseInt(a.empid.split('-')[1]);
            const empidB = parseInt(b.empid.split('-')[1]);
            return empidA - empidB;
        });
        const calendarRows = [];

        // Iterate through the first three employees
        for (let i = 0; i < sortedAPIData.length; i++) {
            const currentDate = new Date(year, month - 1, date);
            const formattedDateStr = currentDate.toLocaleDateString('en-GB');
            const employee = sortedAPIData[i];
            const attendance = employee.employeeDetails.find(emp => emp.date === formattedDateStr);
            const hasAttendance = !!attendance;
            const status = hasAttendance ? attendance.status : '';

            let text = '';
            switch (status) {
                case 'present':
                    text = 'P';
                    break;
                case 'absent':
                    text = 'A';
                    break;
                case 'halfday':
                    text = 'H';
                    break;
                default:
                    break;
            }
            let totalHours = '';
            if (hasAttendance && attendance.time && attendance.logouttime) {
                const startTime = new Date(`01/01/2000 ${attendance.time}`);
                const endTime = new Date(`01/01/2000 ${attendance.logouttime}`);
                const timeDifference = endTime.getTime() - startTime.getTime();
                const hours = Math.floor(timeDifference / (1000 * 60 * 60));
                const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
                totalHours = `Work: ${hours}hr : ${minutes}min`;
            }
            calendarRows.push(
                <tr key={employee.empid}>
                    <td className="whitespace-nowrap px-0 py-2 border sticky bg-orange-200  border-black text-lg font-semibold">
                        {employee.empid}
                    </td>
                    <td className="whitespace-nowrap px-0 py-2 border sticky bg-orange-200 border-black text-lg font-semibold">
                        {employee.empname}
                    </td>
                    <td className={`z-1 border border-black px-0  text-lg font-bold text-slate-200 ${status === 'present' ? 'bg-green-600 ' : status === 'absent' ? 'bg-red-600 ' : status === 'halfday' ? 'bg-yellow-600 ' : 'bg-orange-200'}`}>
                        {text}
                        <div className="text-xs whitespace-nowrap font-normal">{hasAttendance ? `Login Time: ${attendance.time}` : ''}</div>
                        <div className="text-xs whitespace-nowrap my-1">{`${totalHours}`}</div>
                        <div className="text-xs whitespace-nowrap font-normal">{hasAttendance ? `Logout Time: ${attendance.logouttime}` : ''}</div>
                    </td>
                </tr>
            );
        }
        return calendarRows;
    };

  const handleToggleAttendance = async () => {
        try {
            const empid = sessionStorage.getItem('employeeId');
            if (!attendanceStatus) {
                toast.error('Please select a valid attendance status.');
                return;
            }
            const currentDateAndTime = new Date(year, month - 1, date);
            const datePart = format(currentDateAndTime, 'dd/MM/yyyy');
            const timePart = format(currentDateAndTime, 'HH:mm:ss');
            const weekdayPart = format(currentDateAndTime, 'EEEE');

            await axios.put(`${VITE_DATA}/employee/mark/attendance/${empid}`, {
                status: attendanceStatus,
                date: datePart,
                time: timePart,
                weekday: weekdayPart,
            });

            toast.success('Today Attendance marked Successfully!');
        } catch (error) {
            console.error('Error marking attendance:', error.response ? error.response.data.message : error.message);
            toast.error(`${error.response ? error.response.data.message : error.message}`);
        }
    };


    const exportToExcel = () => {
        try {
            const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
            const fileExtension = ".xlsx";
            const fileName = "Attendance";

            const tableHeaders = document.querySelectorAll(".table th");
            const tableRows = document.querySelectorAll(".table tbody tr");

            const columnsToInclude = Array.from(tableHeaders).map(header => header.textContent);
            const rowsToInclude = Array.from(tableRows).map(row => {
                const cells = Array.from(row.querySelectorAll("td"));
                return cells.map(cell => cell.textContent);
            });

            const wsData = [columnsToInclude, ...rowsToInclude];
            const ws = XLSX.utils.aoa_to_sheet(wsData);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

            const excelBuffer = XLSX.write(wb, {
                bookType: "xlsx",
                type: "array",
            });

            const data = new Blob([excelBuffer], { type: fileType });

            const url = URL.createObjectURL(data);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", fileName + fileExtension);

            document.body.appendChild(link);
            link.click();

            setTimeout(() => {
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            }, 100);
        } catch (error) {
            console.error("Error exporting to Excel:", error);
            toast.error("Error exporting to Excel");
        }
    };

    const handleExportClick = () => {
        exportToExcel();
    };

    return (
        <section className={`container-fluid relative p-0 sm:ml-64 bg-orange-100`}>
            <div className={`container-fluid flex justify-center p-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 bg-orange-100`}>
                <div className="inline-block max-w-full w-full py-0">
                    <div className="flex justify-between">
                        <h1></h1>
                        <h1 className="flex justify-center text-3xl text-orange-700 w-full font-semibold">Day-wise Attendance </h1>
                        <div className="flex justify-center">
                            <button className="mx-3 my-0" onClick={handleExportClick}>
                                <img src="/excel.png" alt="download" className="w-14" />
                            </button>
                            <NavLink to="/hr/home" className="my-auto">
                                <button type="button" className="text-white  justify-end bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800 shadow-lg shadow-orange-500/50 dark:shadow-lg dark:shadow-orange-800/80 font-medium rounded text-sm px-3 py-1 whitespace-nowrap text-center  ">Go Back</button>
                            </NavLink>
                        </div>
                    </div>
                    <div className="flex justify-between items-center my-4 mt-5  text-orange-600">
                        <h1 className="font-bold text-md flex-wrap xl:flex-nowrap"> DD-MM-YY: <span className="text-green-600 text-lg ">{date}-{month}-{year}</span></h1>
                        <div className="flex">
                            <div className="mx-3">
                                <label htmlFor="date" className="font-bold text-lg">Date:</label>
                                <select id="date" value={date} onChange={handleDateChange} className="p-1 ml-2 rounded-lg text-lg text-red-900">
                                    {renderDates()}
                                </select>
                            </div>
                            <div className="mr-3">
                                <label htmlFor="month" className="font-bold text-lg">Month:</label>
                                <select id="month" value={month} onChange={handleMonthChange} className="p-1 ml-2 rounded-lg text-lg text-red-900">
                                    {renderMonths()}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="year" className="font-bold text-lg">Year:</label>
                                <select id="year" value={year} onChange={handleYearChange} className="p-1 ml-2 rounded-lg text-lg text-red-900">
                                    {renderYears()}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center my-4 mt-5  text-orange-600">
                        <div className="mx-3">
                            <label htmlFor="attendanceStatus" className="font-bold text-lg">Attendance Status:</label>
                            <select id="attendanceStatus" value={attendanceStatus} onChange={handleAttendanceStatusChange} className="p-1 ml-2 rounded-lg text-lg text-red-900">
                                <option value="">Select Status</option>
                                <option value="present">Present</option>
                                <option value="absent">Absent</option>
                                <option value="halfday">Halfday</option>
                            </select>
                        </div>
                        <button onClick={handleToggleAttendance} className="text-white bg-orange-600 p-2 rounded-lg">Mark Attendance</button>
                    </div>
                    <div className="relative">
                        <div className="flex min-w-full w-full bg-orange-100">
                            <table className="min-w-full text-center divide-y divide-gray-200 text-sm font-light table border border-black">
                                <thead className="sticky bg-orange-100 top-16 z-30">
                                    <tr className="border border-black text-lg sticky overflow-hidden z-30 text-orange-700 ">
                                        <th scope="col" className="bg-slate-100 sticky p-0 whitespace-nowrap border  border-orange-700">
                                            Employee ID
                                        </th>
                                        <th scope="col" className="bg-slate-100 sticky p-0 whitespace-nowrap border border-orange-700">
                                            Employee Name
                                        </th>
                                        {renderTableHeaders()}
                                        <th scope="col" className="bg-slate-100 sticky p-0 whitespace-nowrap border border-orange-700">
                                       Mark Droppped Attendance
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y px-0 py-0 overflow-hidden">
                                    {renderCalendar()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CurrentAttendance;
