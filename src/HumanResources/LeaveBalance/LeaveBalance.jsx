import axios from "axios";
import { useState, useEffect } from "react";
import {toast} from "react-toastify";
import VITE_DATA from "../../config/config.jsx";

function LeaveBalance() {
        const [leavetype, setLeaveType] = useState('');
        const [APIData, setAPIData] = useState([]);
        const [formSubmitted, setFormSubmitted] = useState(false);
        const [catType, setCatType] = useState("");
        const [cType, setCType] = useState("");
        const [catTypesForSelectedPolicy, setCatTypesForSelectedPolicy] = useState([]);

        useEffect(() => {
            const token = sessionStorage.getItem("token");
            if (!token) {
                toast.error("Not Authorized yet.. Try again! ");
            } else {
                // The user is authenticated, so you can make your API request here.
                axios
                    .get(`${VITE_DATA}/leave/type/show`, {
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
                if (!leavetype) {
                  toast.error('Please Enter Leave Type....!');
                  return;
                }
                // Make a POST request to mark attendance
               await axios.post(`${VITE_DATA}/leave/type/add`, {
                  leavetype,
                });
                // Handle success (e.g., show a success message)
                toast.success('Leave Type Added Successfully....!');
                setLeaveType("");
              } catch (error) {
                // Handle error (e.g., show an error message)
                console.error(
                  'Error to Adding Leave Type',
                  error.response ? error.response.data.message : error.message
                );
              } finally {
                setFormSubmitted(false);
              }
        }

        const handleSubmit2 = async () => {
            setFormSubmitted(true);
            try {
              if (!cType) {
                toast.error('Please select a Category Type!');
                return;
              }
              await axios.put(`${VITE_DATA}/api/company/${catTypesForSelectedPolicy}/category`, {
                category: catType
              });
              toast.success('Category added successfully!');
              setCatType("");
            } catch (error) {
              console.error('Error adding category', error.response ? error.response.data.message : error.message);
            } finally {
              setFormSubmitted(false);
            }
          }
    
    // Delete Functions
    const deleteLeaveTypes = async (_id) => {
        try {
            await axios.delete(`${VITE_DATA}/leave/delete/${_id}`);
            toast.error("Leave Type Deleted Successfully.....!", { theme: "dark", position: "top-right" });
            setAPIData((prevData) => prevData.filter((data) => data._id !== _id));
        } catch (error) {
            console.error('Error to Deleting Leave Type', error);
        } 
    };
    
    
      return (
        <div className="flex justify-between">
        <section className="container-fluid relative  p-0 sm:ml-64 bg-white">
        <div className="container-fluid flex-col  flex justify-center p-2 border-gray-200 border-dashed rounded-lg  bg-white">
        <span className="text-3xl p-2 tracking-wider text-green-900 font-medium">Add Leave Type</span>
            <div className="relative w-full lg:w-full p-5 lg:p-4 rounded-xl shadow-xl text-2xl items-center bg-slate-300">
                {/* <h1 className="font-semibold text-3xl mb-3">Add Leave Type</h1> */}
                <div className="flex flex-col p-2 text-start w-full lg:w-1/4 ">
                    <label className="text-base mx-1 mb-2">Enter Leave Type<span className="text-red-600 font-bold">*</span></label>
                    <input
                        className="input-style p-1 rounded-lg"
                        type="text"
                        name="leavetype"
                        value={leavetype}
                        onChange={(e) => setLeaveType(e.target.value.toUpperCase())}
                        placeholder="Add Leave Type"
                    /> 
                </div>
    
                <div className="flex justify-center p-2 text-center w-full my-2 mt-10 gap-10">
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
                <h1 className="font-semibold text-3xl mb-3">Leave Type Lists</h1>
                <table className="min-w-full text-center text-base font-light table">
                    <thead className="border-b font-medium dark:border-neutral-200 ">
                        <tr className="text-blue-700">
                            {/* <th scope="col" className="px-5 py-4">
                                Sr No.
                            </th> */}
                            <th scope="col" className=" px-5 py-4">
                                Leave Type
                            </th>
                            {/* <th scope="col" className="px-5 py-4">
                                Update
                            </th> */}
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
                                        {data.leavetype}
                                    </td>
                                    {/* <td className="whitespace-nowrap px-4 py-4">
                                        Your Update button
                                    </td> */}
                                    <td className="whitespace-nowrap px-4 py-4">
                                        <button 
                                            type="button" 
                                            // _ID MADE TO DELETE
                                            onClick={() => deleteLeaveTypes(data._id)} 
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

<section className="container-fluid relative  p-0  bg-slate-200">
<div className="container-fluid  flex flex-col  justify-center p-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 bg-white">
  <span className="text-3xl p-2 tracking-wider text-green-900 font-medium">Add Total Leave</span>
  <div className="container-fluid flex flex-wrap justify-between p-2 border-dashed rounded-lg bg-slate-200">
    <div className="flex flex-col p-2 text-start w-full lg:w-1/3">
      <label className="text-base mx-1 my-1">Total Leave:</label>
      <select
        className="input-style p-2 w-full rounded-lg"
        name="c_type"
        value={cType}
        onChange={(e) => {
          setCType(e.target.value);
          const selectedCatId = e.target.selectedOptions[0].getAttribute("data-id");
          setCatTypesForSelectedPolicy(selectedCatId);
        }}
      >
        <option className="w-1" value="">
          ----------------------- Select Leave Type -----------------------------
        </option>
        {APIData.map((policy) => (
          <option key={policy._id} value={policy.leavetype} data-id={policy._id}>
            {policy.leavetype}
          </option>
        ))}
      </select>
    </div>

    <div className="flex flex-col   p-2 text-start w-full lg:w-1/3">
      <label className="text-base mx-1 my-1">Category Type:</label>
      <input
        className="input-style w-full p-2  rounded-lg"
        value={catType}
        onChange={(e) => setCatType(e.target.value.toUpperCase())}
        name="catType"
      />

    </div>
    <div className="flex flex-col  p-2 text-start w-full lg:w-1/3"></div>

    <div className="w-full p-1 mt-8 justify-center flex">
      <button
        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        onClick={handleSubmit2}
        type="button"
      >
        {formSubmitted ? "Submitted" : "Submit"}
      </button>
    </div>
    {/* </form> */}
  </div>
</div>
<div className="container-fluid  flex flex-col   justify-center p-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 bg-white">
  <span className="text-3xl p-2 mt-10 tracking-wider text-gray-900 font-medium">List of Leave Type with Total Leave</span>
  <div className="container-fluid flex justify-center p-2   border-gray-200 border-dashed rounded-lg   bg-slate-200">
    <table className="min-w-full text-center text-sm font-light ">
      <thead className="border-b font-medium dark:border-neutral-500">
        <tr className="text-blue-700">
          {/* <th scope="col" className="px-4 py-4">
                          S.No
                      </th> */}
          <th scope="col" className="px-4 py-4">
            Leave Type
          </th>
          <th scope="col" className="px-4 py-4">
            Total Leave
          </th>
          {/* <th scope="col" className="px-4 py-4">
            Delete
          </th> */}
        </tr>
      </thead>
      <tbody>
        {APIData.map((data) => {

          return (
            <tr
              className="border-b dark:border-neutral-200 text-sm font-medium"
              key={data._id}
            >


              <td className="whitespace-nowrap px-3 py-4">
                {data.leavetype}
              </td>

              {data.leavetype &&

                <td className="whitespace-nowrap px-3 py-4">
                  <select className="w-1/3 p-2  rounded-lg">
                    <option value="" defaultChecked >ADD Total Leave</option>
                    {data.restleave.map((product, index) => (
                      <option key={index} value={product}>
                        {product}
                      </option>
                    ))}
                  </select>
                </td>
              }

              {/* <td className="whitespace-nowrap px-3 py-4">
                <button type="button"
                  onClick={() => deleteCategoryTypes(data._id)}
                  className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2">Delete</button>
              </td> */}
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
</div>
</section>
</div>
      )
    }
    
    

export default LeaveBalance;