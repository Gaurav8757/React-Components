
import axios from "axios";
import { useEffect, useState } from "react";
import * as XLSX from 'xlsx';
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';

function ReportEmp() {
    const [APIData, setAPIData] = useState([]);
    const [sendStaffId, setSendStaffId] = useState(null);
 
    const [calendarData, setCalendarData] = useState([]);
    const name = sessionStorage.getItem("name");
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth() + 1); // Month starts from 0
   
    const handleYearChange = (e) => {
        setYear(parseInt(e.target.value));
    };

    const handleMonthChange = (e) => {
        setMonth(parseInt(e.target.value)); 
    };
    // DATE OF CALENDAR LIKE 01/01/2000 FORMAT
    useEffect(() => {
        // Generate calendar data for the selected month
        const startDate = startOfMonth(new Date(year, month - 1));
        const endDate = endOfMonth(new Date(year, month - 1));
        const daysOfMonth = eachDayOfInterval({ start: startDate, end: endDate });
        const formattedDays = daysOfMonth.map(day => format(day, 'dd/MM/yyyy'));
        setCalendarData(formattedDays);
    }, [year, month]);



    const renderCalendar = () => {
        return APIData.map((employee, employeeIndex) => {
            // Initialize present, absent, half-day, and holiday counts
            let presentCount = 0;
            let absentCount = 0;
            let halfDayCount = 0;
            let holiDayCount = 0;
    
            return (
                <tr key={employeeIndex}>
                    <td className="whitespace-nowrap px-4 py-4 border border-black text-lg font-semibold">
                        {employee.empid}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 border border-black text-lg font-semibold">
                        {employee.empname}
                    </td>
                    {calendarData.map((date, dateIndex) => {
                        const attendance = employee.employeeDetails.find(emp => emp.date === date);
                        const hasAttendance = !!attendance;
                        const status = hasAttendance ? attendance.status : ''; // Default to absent if no attendance record
    
                        // Update counts based on status
                        switch (status) {
                            case 'present':
                                presentCount++;
                                break;
                            case 'absent':
                                absentCount++;
                                break;
                            case 'halfday':
                                halfDayCount++;
                                break;
                            case 'holiday':
                                holiDayCount++;
                                break;
                            default:
                                break;
                        }
    
                        // Define the text to display based on status
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
                            case 'holiday':
                                text = 'HDAY';
                                break;
                            default:
                                break;
                        }
    
                        // Render the cell
                        return (
                            <td key={dateIndex} className={`relative border border-black px-16 py-8 text-lg font-bold text-slate-200 ${status === 'present' ? 'bg-green-600' : status === 'absent' ? 'bg-red-600' : status === 'halfday' ? 'bg-yellow-600' : status === 'holiday' ? 'bg-cyan-600' : 'none'}`}>
                                {text}
                                <div className="absolute -bottom-0.5 right-0.5">
                                    <span className="text-xs font-normal">{hasAttendance ? attendance.time : ''}</span>
                                </div>
                            </td>
                        );
                    })}
                    <td className="whitespace-nowrap px-4 py-4 text-lg font-bold border border-black">
                        {presentCount} {/* Display present count */}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-lg font-bold border border-black">
                        {absentCount} {/* Display absent count */}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-lg font-bold border border-black">
                        {halfDayCount} {/* Display half-day count */}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-lg font-bold border border-black">
                        {holiDayCount} {/* Display holiday count */}
                    </td>
                </tr>
            );
        });
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

    // const daysInMonth = new Date(year, month, 0).getDate();

    // const renderTableHeaders = () => {
    //     const headers = [];
    //     for (let i = 1; i <= daysInMonth; i++) {
    //         const formattedDate = i.toString().padStart(2, '0'); // Format date as '01', '02', ...
            
    //         headers.push(<th className="border border-blue-700 text-lg" key={i}>{formattedDate}</th>);
    //     }
    //     return headers;
    // };
   
    const renderTableHeaders = () => {
        const headers = [];
        const daysInMonth = new Date(year, month, 0).getDate();
        const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
        for (let i = 1; i <= daysInMonth; i++) {
            const currentDate = new Date(year, month - 1, i);
            const formattedDate = i.toString().padStart(2, '0'); // Format date as '01', '02', ...
            const weekdayIndex = currentDate.getDay(); // Get the index of the day of the week (0 for Sunday, 1 for Monday, etc.)
            const weekday = weekdays[weekdayIndex]; // Get the corresponding weekday from the array
    
            const thStyle = {
                background: weekday === 'Sun' ? '#fca9a9' : 'none', // Set background color to red for Sundays
                color: weekday === 'Sun' ? '#741b47' : 'none', // Set text color to red for Sundays
            };
    
            headers.push(
                <th className="border border-blue-700 text-lg" key={i} style={thStyle}>
                    <div>{formattedDate}</div>
                    <div>{weekday}</div>
                </th>
            );
        }
        return headers;
    };

// LISTS OF EMPLOYEE
    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            toast.error("Not Authorized yet.. Try again! ");
        } else {
            // The user is authenticated, so you can make your API request here.
            axios
                .get(`https://eleedomimf.onrender.com/api/employee-list`, {
                    headers: {
                        Authorization: `${token}`, // Send the token in the Authorization header
                    },
                })
                .then((response) => {

                    setAPIData(response.data);

                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, []);

    // refreshing page after updating data
    const exportToExcel = () => {
        try {
            const fileType =
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
            const fileExtension = ".xlsx";
            const fileName = name;

            // Get all table headers and rows
            const tableHeaders = document.querySelectorAll(".table th");
            const tableRows = document.querySelectorAll(".table tbody tr");

            // Include only the first 26 columns and all rows
            const columnsToInclude = Array.from(tableHeaders).slice(0, 18);
            const rowsToInclude = Array.from(tableRows).map(row => {
                const cells = Array.from(row.querySelectorAll("td")).slice(0, 18);
                return cells.map(cell => cell.textContent);
            });

            // Create worksheet
            const ws = XLSX.utils.aoa_to_sheet([Array.from(columnsToInclude).map(header => header.textContent), ...rowsToInclude]);

            // Create workbook and export
            const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
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
        } catch (error) {
            console.error("Error exporting to Excel:", error);
            toast.error("Error exporting to Excel");
        }
    };

    const handleExportClick = () => {
        exportToExcel();
        // exportToPDF();
    };

    // ******************** Delete Functions *************************************/
    const onDeleteEmployee = async (_id) => {
        try {
            await axios.delete(`https://eleedomimf.onrender.com/emp/api/${_id}`);
            toast.warn("Employee Deleted.....!", { theme: "dark", position: "top-right" });
            setAPIData((prevData) => prevData.filter((data) => data._id !== _id));
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    return (
        <section className={`container-fluid relative  p-0 sm:ml-64 bg-slate-200`}>
            <div className={`container-fluid flex justify-center p-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 bg-slate-200`}>
                <div className="inline-block min-w-full w-full py-6 sm:px-6 lg:px-8">
                    <h1 className="flex justify-center text-3xl w-full font-semibold">Employee&apos;s Attendance Report</h1>
                    <div className="overflow-x-none w-xl flex mt-2 text-blue-500">

                        <button className="absolute top-2 right-24" onClick={handleExportClick}>
                            <img src="/excel.png" alt="download" className="w-12" />
                            </button>
                            
                        <NavLink to="/hr/home/addemployee" >
                            <button type="button" className="text-white absolute top-3 right-2 justify-end bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-3 py-2 text-center me-2 mb-2 ">Go Back</button>
                        </NavLink>
                    </div>
                    
                    {/* year */}
                    <div className="flex justify-between items-center my-5 mt-10  text-blue-600  ">
                        <h1 className="font-bold text-lg flex-wrap xl:flex-nowrap">Selected MM-YY: <span className="text-green-600 ">{month} - {year}</span></h1>
                        <div className="flex">
                            <div>
                                <label htmlFor="year" className="font-bold text-lg">Year:</label>
                                <select id="year" value={year} onChange={handleYearChange} className="p-1 ml-2 rounded-lg text-lg text-red-900">
                                    {renderYears()}
                                </select>
                            </div>
                            {/* months */}
                            <div className="mx-4">
                                <label htmlFor="month" className="font-bold text-lg">Month:</label>
                                <select id="month" value={month} onChange={handleMonthChange} className="p-1 ml-2 rounded-lg text-lg text-red-900">
                                    {renderMonths()}
                                </select>
                            </div>
                        </div>
                    </div>



                    {/* part-3 */}
                    <div className="flex min-w-full w-full py-3 sm:px-4 lg:px-1   overflow-x-auto">
                        <table className="min-w-full text-center text-sm font-light table border  border-black">
                            <thead>
                                <tr className="border border-black text-lg text-blue-700">
                                    <th scope="col" className="px-5 py-4 border border-blue-700">
                                        Employee ID
                                    </th>
                                    <th scope="col" className="px-4 py-4 border border-blue-700">
                                        Employee Name
                                    </th>
                                    {renderTableHeaders()}
                                    {/* {renderTableRows()} */}
                                    <th scope="col" className="px-5 py-4 border border-blue-700">
                                        Present Days
                                    </th>
                                    <th scope="col" className="px-5 py-4 border border-blue-700">
                                        Absent Days
                                    </th>
                                    <th scope="col" className="px-5 py-4 border border-blue-700">
                                        Half Days
                                    </th>
                                    <th scope="col" className="px-5 py-4 border border-blue-700">
                                        HoliDays
                                    </th>
                                    {/* <th scope="col" className="px-5 py-4 border border-blue-700">
                                        Status
                                    </th> */}
                                </tr></thead>

                            {/* td data */}
                            <tbody className="bg-white divide ">
                                            {renderCalendar()}      
                            </tbody>


                        </table>
                    </div>
                    {sendStaffId && (
                        <div id="popup-modal" tabIndex="-1" className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white p-4 rounded-lg ">
                                <h2 className="text-lg font-semibold text-gray-800"> {`Are you sure you want to delete `}
                                    <span className="text-red-600">{APIData.find(data => data._id === sendStaffId)?.empname}</span>
                                    {`?`}</h2>
                                <div className="flex justify-end mt-10">
                                    <button onClick={() => { onDeleteEmployee(sendStaffId); setSendStaffId(null); }} className="text-white bg-red-600 hover:bg-red-800 focus:ring-1 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-base px-4 py-2 mr-2">
                                        Yes, I&apos;m sure
                                    </button>
                                    <button onClick={() => setSendStaffId(null)} className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-1 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-base font-medium px-4 py-2 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                                        No, cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {/* </div> */}
        </section >
    );
}
export default ReportEmp;