import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
function HolidayAdd() {
  const [hType, setHType] = useState('');
  const [date, setDate] = useState();
  const [APIData, setAPIData] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);



  const handleDateChange = (e) => {
    // Get the selected date from the input
    const selectedDate = e.target.value;
    // Split the date string by "-"
    const parts = selectedDate.split("-");
    // Rearrange the parts to form the "DD/MM/YYYY" format
    const formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
    // Update the state with the formatted date
    setDate(formattedDate);
};

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      toast.error("Not Authorized yet.. Try again! ");
    } else {
      // The user is authenticated, so you can make your API request here.
      axios
        .get(`https://eleedomimf.onrender.com/holidays/alllists`, {
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

  const handleSubmit = async () => {
    setFormSubmitted(true);
    try {
      // Check if a valid attendance status is selected
      if (!hType) {
        toast.error('Please Enter Holiday Name...!');
        return;
      }
      // Make a POST request to mark attendance
      await axios.post(`https://eleedomimf.onrender.com/holidays/add`, {
        hdate: date,
        hdays: hType
      });
      // Handle success (e.g., show a success message)
      toast.success('Holiday Added Successfully....!');
      setHType("");
      setDate("");
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error(
        'Errorto Adding Holiday...!',
        error.response ? error.response.data.message : error.message
      );
    } finally {
      setFormSubmitted(false);
    }
  }

  // Delete Functions
  const deleteFuelTypes = async (_id) => {
    try {
      await axios.delete(`https://eleedomimf.onrender.com/holidays/${_id}/delete`);
      toast.warn("Fuel Name Deleted.....!", { theme: "dark", position: "top-right" });
      setAPIData((prevData) => prevData.filter((data) => data._id !== _id));
    } catch (error) {
      console.error('Error Deleting Fuel Name', error);
    }
  };


  return (
    <section className="container-fluid relative h-screen p-0 sm:ml-64 bg-white">
      <div className="container-fluid flex-col  flex justify-center p-2 border-gray-200 border-dashed rounded-lg  bg-white">
       
        <div className="relative w-full lg:w-full p-5 lg:p-4 rounded-xl shadow-xl text-2xl items-center bg-slate-300">
        <h1 className="font-semibold text-3xl mb-3">Add Holiday </h1>
        <div className="flex mt-10">
          <div className="flex flex-col p-2 text-start w-full lg:w-1/3 ">
            <label className="text-base mx-1 mb-2">Choose Holiday Date<span className="text-red-600 font-bold">*</span></label>
            <input
              className="input-style rounded-lg"
              type="date"
              name="date"
              value={date}
              onChange={handleDateChange} />
          </div>

          <div className="flex flex-col p-2 text-start w-full lg:w-1/3 ">
            <label className="text-base mx-1 mb-2">Enter Holiday Name<span className="text-red-600 font-bold">*</span></label>
            <input
              className="input-style rounded-lg"
              type="text"
              name="hType"
              value={hType}
              onChange={(e) => setHType(e.target.value.toUpperCase())}
              placeholder="Add Holiday"
            />

          </div>
          </div>
          <div className="block justify-center p-2 text-center w-full my-2 mt-10 gap-10">
            <button
              className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-6 py-2.5 text-center me-2 mb-2"
              onClick={handleSubmit}
              type="button"
              disabled={formSubmitted}>
              {formSubmitted ? "Submitted" : "Submit"}
            </button>
          </div>

        </div>

        <div className="inline-block my-6 min-w-full w-full py-0 sm:px-6 lg:px-8 overflow-x-auto">
          <h1 className="font-semibold text-3xl mb-3">Holiday List&apos;s</h1>
          <table className="min-w-full text-center text-base font-light table">
            <thead className="border-b font-medium dark:border-neutral-200 ">
              <tr className="text-blue-700">
              <th scope="col" className="px-5 py-4">
                           Holiday Date
                        </th>

                <th scope="col" className=" px-5 py-4">
                  Holiday Name
                </th>
               
                <th scope="col" className="px-5 py-4">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {APIData.map((data) => {
                return (
                  <tr
                    className="border-b dark:border-neutral-200 text-sm font-medium"
                    key={data._id}
                  >
                    <td className="whitespace-nowrap px-4 py-4">
                      {data.hdate}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4">
                    {data.hdays}
                                </td>
                    <td className="whitespace-nowrap px-4 py-4">
                      <button
                        type="button"
                        // _ID MADE TO DELETE
                        onClick={() => deleteFuelTypes(data._id)}
                        className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2">
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}



export default HolidayAdd;