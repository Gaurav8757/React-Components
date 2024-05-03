import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import UpdateSeat from "./updateSeat.jsx";
import VITE_DATA from "../../../config/config.jsx";
function SitCapacity() {
    const [sitcapacity, setSit] = useState("");
    const [APIData, setAPIData] = useState([]);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleSitAdd = async () => {
        setFormSubmitted(true);
      try {
        // Check if a valid attendance status is selected
        if (!sitcapacity) {
          toast.error('Please select a valid Sitting Capacity....!');
          return;
        }
        // Make a POST request to mark attendance
        await axios.post(`${VITE_DATA}/sit/set`, {
            sitcapacity
        });
        // Handle success (e.g., show a success message)
        toast.success('Sitting Capacity Added Successfully.....!');
        setSit("");
      } catch (error) {
        // Handle error (e.g., show an error message)
        console.error(
          'Error Marking Sitting Capacity',
          error.response ? error.response.data.message : error.message
        );
      }finally {
        setFormSubmitted(false);
      }
    }
    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            toast.error("Not Authorized yet.. Try again! ");
        } else {
            // The user is authenticated, so you can make your API request here.
            axios
                .get(`${VITE_DATA}/sit/show`, {
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

const updateSeat = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        toast.error("Not Authorized yet.. Try again!");
      } else {
        const response = await axios.get(
          `${VITE_DATA}/sit/show`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        setAPIData(response.data);
      }
    } catch (error) {
      console.error("Error fetching updated Sitting Capacity:", error);
    }
  };



    const deleteSitCapacity = async (_id) => {
        try {
            await axios.delete(`${VITE_DATA}/sit/capacity/${_id}`);
            toast.warn("Sitting Capacity Deleted.....!", { theme: "dark", position: "top-right" });
            setAPIData((prevData) => prevData.filter((data) => data._id !== _id));
        } catch (error) {
            console.error('Error Deleting Sitting Capacity', error);
        } 
      };

  return (
    <section className="container-fluid relative h-screen p-0 sm:ml-64 bg-white">
      <div className="container-fluid flex justify-center p-2  border-gray-200 border-dashed rounded-lg dark:border-gray-700  bg-white">
        <div className="relative w-full lg:w-full  p-0 lg:p-4 mt-4 rounded-xl shadow-xl text-2xl  items-center bg-gradient-to-r from-slate-200 to-slate-200">
        <h1 className="font-semibold text-3xl mb-3">Seating Capacity</h1>
          <div className="flex flex-col  p-2 text-start w-full lg:w-1/3">
            <label className="text-base font-semibold my-1">Seating Capacity: <span className="text-red-600 font-bold">*</span></label>
            <input
              className="input-style rounded-lg "
              type="text"
              value={sitcapacity}
              name="type"
              onChange={(e) => setSit(e.target.value.toUpperCase())}
              placeholder="Enter No of Sitting Capacity"
            />
          </div>
          <div className="flex justify-center p-2 text-center w-full my-2 mt-10 gap-10">
            <button
              className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-6 py-2.5 text-center me-2 mb-2"
              onClick={handleSitAdd}
              type="button">
              Submit
            </button>
          </div>
        </div>
      </div>
      <div className="inline-block my-6 min-w-full w-full py-0 sm:px-6 lg:px-8 overflow-x-auto">
            <h1 className="font-semibold text-3xl mb-3">Seating Capacity List&apos;s</h1>
            <table className="min-w-full text-center text-base font-light table">
                <thead className="border-b font-medium dark:border-neutral-200 ">
                    <tr className="text-blue-700">
                        <th scope="col" className=" px-2 py-2">
                            Seating Capacity
                        </th>
                        <th scope="col" className=" px-2 py-2">
                            Update
                        </th>
                        <th scope="col" className="px-2 py-2">
                            Delete
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {APIData.map((data) => {
                        return (
                            <tr
                                className="border-b dark:border-neutral-200 text-sm font-medium"
                                key={data._id}>
                                <td className="whitespace-nowrap my-1">
                                    {data.sitcapacity}
                                </td>
                                <td className="whitespace-nowrap my-1">
                                <UpdateSeat data = {data}  updateData= {updateSeat}/> 
                                </td>
                                <td className="whitespace-nowrap my-1">
                                    <button 
                                        type="button" 
                                        // _ID MADE TO DELETE
                                        onClick={() => deleteSitCapacity(data._id)} 
                                        className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-3 py-1 text-center ">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        );
                     })} 
                </tbody>
            </table>
        </div>
    </section>
  )
}

export default SitCapacity;