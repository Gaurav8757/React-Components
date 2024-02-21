import axios from "axios";
import { useState, useEffect } from "react";
import {toast} from "react-toastify";
function CompanyType() {
    const [cType, setCType] = useState('');
    const [APIData, setAPIData] = useState([]);
    const [formSubmitted, setFormSubmitted] = useState(false);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            toast.error("Not Authorized yet.. Try again! ");
        } else {
            // The user is authenticated, so you can make your API request here.
            axios
                .get(`http://localhost:7000/view/company/lists`, {
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
    }, [formSubmitted]);

    const handleSubmit = async() => {
        setFormSubmitted(true);
        try {  
            // Check if a valid attendance status is selected
            if (!cType) {
              toast.error('Please Enter Category Type...!');
              return;
            }
            // Make a POST request to mark attendance
           await axios.post(`http://localhost:7000/add/comapny/type`, {
              c_type: cType,
            });
            // Handle success (e.g., show a success message)
            toast.success('Category Type Added Successfully....!');
            setCType("");
          } catch (error) {
            // Handle error (e.g., show an error message)
            console.error(
              'Error marking Category Type',
              error.response ? error.response.data.message : error.message
            );
          } finally {
            setFormSubmitted(false);
          }
    }



  return (
    <div>CompanyType</div>
  )
}

export default CompanyType;