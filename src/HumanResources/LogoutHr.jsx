import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import VITE_DATA from "../config/config.jsx";

export default function LogoutOps() {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);
  // const isLoggedIn = sessionStorage.getItem("token");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const response = await axios.get(`${VITE_DATA}/employees/data`, {
          headers: {
            Authorization: token,
          },
        });
        setData(response.data); // Assuming the response contains the data you want to set
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []); // Empty de
  const filteredIds = data
  .filter(datas => datas.empname === 'KAMLESH THAKUR' || datas.empname === 'Kamlesh Thakur')
  .map(filteredData => filteredData._id);

 
  function getCurrentTime() {
    const currentDate = new Date();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
    const amOrPm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    const currentTime = `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${amOrPm}`;
    return currentTime;
  }
  const log = getCurrentTime();
 

  const handleLogout = () => {
    try {
      axios.put(`${VITE_DATA}/employee/update/attendance/${filteredIds}`, {
        logouttime: log,
      });
      // Clear session storage and navigate to login page

      navigate("/login");
      sessionStorage.clear();
      toast.success("Logout Successfully !");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Failed to logout. Please try again.");
    }
  };

  return filteredIds && location.pathname !== "" ? (
    <button
      className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded text-xs px-2 py-2 text-center"
      onClick={handleLogout}
    >
      LOGOUT
    </button>
  ) : null;
}
