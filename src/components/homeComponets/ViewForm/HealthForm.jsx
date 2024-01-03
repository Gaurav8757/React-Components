/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
const HealthForm = () => {
    const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button
        className="bg-blue-200 text-black active:bg-blue-500 
      font-bold px-4 py-2 rounded shadow  outline-none focus:outline-none mr-1 mb-1 transition-transform transform hover:translate-y-[-2px] hover:shadow-2xl"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Fill Details
      </button>

      {showModal ? (
        <>
          <div className="flex justify-center  backdrop-blur-sm items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-1/3 my-6 mx-auto w-3xl ">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gradient-to-r from-teal-700 to-cyan-800 outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-3xl font=semibold text-slate-200">Fill the Form</h3>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="text-red-500 opacity-7 h-6 w-6 text-xl block  py-0 rounded-full transition duration-0 hover:duration-150">
                      <IoMdClose  size={30}/>
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto text-start bg-gradient-to-r from-teal-700 to-cyan-800">
                  <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full bg-gradient-to-t from-green-600  to-teal-400">
                    <label className="block text-black text-base font-bold mb-1">
                      First Name
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2  px-1 mb-4 text-black" />
                    <label className="block text-black text-base  font-bold mb-1">
                      Last Name
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-1 mb-4 text-black" />
                    <label className="block text-black text-base  font-bold mb-1">
                      Address
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-1  mb-4 text-black" />
                    <label className="block text-black text-base  font-bold mb-1">
                      City
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-1 mb-4 text-black" />
                  </form>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  {/* <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button> */}
                  <button
                    className="text-white bg-green-500  active:bg-green-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};
export default HealthForm;
