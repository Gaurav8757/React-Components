import { useState } from "react";
import axios from "axios";
import {toast} from "react-toastify";
function StaffType() {
    const [type, setType] = useState("");


    const handleStaffType = async () => {
        try {  
          // Check if a valid attendance status is selected
          if (!type) {
            toast.error('Please select a valid attendance status.');
            return;
          }
          // Make a POST request to mark attendance
         await axios.post(`https://eleedomimf.onrender.com/add/staff`, {
            s_type: type,
          });
          // Handle success (e.g., show a success message)
          toast.success('Staff Type Added Successfully!');
        } catch (error) {
          // Handle error (e.g., show an error message)
          console.error(
            'Error marking Staff Type',
            error.response ? error.response.data.message : error.message
          );
          
        }
      }



  return (
    <section className="container-fluid relative h-screen p-0 sm:ml-64 bg-white">
    <div className="container-fluid flex justify-center p-2  border-gray-200 border-dashed rounded-lg dark:border-gray-700  bg-white">
      <div className="relative w-full lg:w-full  p-0 lg:p-4 rounded-xl shadow-xl text-2xl  items-center bg-gradient-to-r from-slate-400 to-slate-400">
      <div className="flex flex-col  p-2 text-start w-full lg:w-1/3">
                            <label className="text-base  my-2">Employee Type:</label>
                            <input
                                className="input-style rounded-lg "
                                value={type}
                                name="type"
                                onChange={(e) => setType(e.target.value.toUpperCase())}
                                placeholder="Enter Staff Type"
                            />
                        </div>

                        <div className="flex justify-center p-2 text-center w-full my-2 mt-10 gap-10">
                        <button
                            className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-6 py-2.5 text-center me-2 mb-2"
                             onClick={handleStaffType}
                            type="button"
                        >
                            Submit
                        </button>
                        
                    </div>
        </div>
        
        </div>
        </section>
  )
}

export default StaffType;