/* eslint-disable react/prop-types */
// Form.jsx

import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Form = ({ companyName, setShowModal }) => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
 

  // useEffect(() => {
  //   axios
  //     .get(`https://eleedomimf.onrender.com/api/company/health-list`)
  //     .then((response) => {
  //       // console.log(response.data);
  //       // setAPIData(response.data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, [companyName]);

  const handleSubmit = async (e) => {
    e.preventDefault();
   

    try {
      // Make sure to replace this URL with your actual API endpoint
      const response = await axios.post("https://eleedomimf.onrender.com/users/userdetails", {
        h_cname: companyName,
        h_name: name,
        h_email: email,
        h_mobile: mobile,
        h_address: address,
      });

      if (response.data) {
        toast.success("Added Successfully!");

        // Reset the form and loading state on successful submission
        setName("");
        setAddress("");
        setEmail("");
        setMobile("");
       

        // Close the modal
        setShowModal(false);
      } else {
        toast.error("Error Occurred. Try again...!");
      }
    } catch (error) {
      console.error("Error during registration:", error.response);
     
    }
  };

  return (
    <>
      <div className="flex justify-center backdrop-blur-sm items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-1/3 my-6 mx-auto w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gradient-to-r from-teal-700 to-cyan-800 outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
              <h3 className="text-3xl font-semibold text-slate-200">Fill the Form</h3>
              <button
                className="bg-transparent border-0 text-black float-right"
                onClick={() => setShowModal(false)}
              >
                <span className="text-red-500 opacity-7 h-6 w-6 text-xl block py-0 rounded-full transition duration-0 hover:duration-150">
                  <IoMdClose size={30} />
                </span>
              </button>
            </div>
            <div className="relative p-6 flex-auto text-start bg-gradient-to-r from-teal-700 to-cyan-800">
              <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full bg-gradient-to-t from-green-600  to-teal-400">
                <div className="flex justify-between">
                  <label className="inline text-black text-base font-bold mb-1">Name:</label>
                  <label className="inline mx-24 text-black text-base font-bold mb-1">
                    Company Name:
                  </label>
                </div>
                <div className="flex">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-1 mb-4 text-black"
                  />
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setName(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-1 mb-4 ml-4 text-black"
                    readOnly
                  />
                </div>
                <label className="block text-black text-base font-bold mb-1">Mobile:</label>
                <input
                  type="number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-1 mb-4 text-black"
                />
                <label className="block text-black text-base font-bold mb-1">Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-1 mb-4 text-black"
                />
                <label className="block text-black text-base font-bold mb-1">
                  Address<span className="font-thin text-white"> (Optional)</span>
                </label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-1 mb-4 text-black"
                />
              </form>
            </div>
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="text-white bg-green-500  active:bg-green-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                type="button"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
