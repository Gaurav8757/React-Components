/* eslint-disable react/prop-types */
import { useState,  } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { CgCloseR } from "react-icons/cg";
import VITE_DATA from "../../../config/config.jsx";

function UpdateSeat({updateData, data}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [datas, setData] = useState({
        sitcapacity: "",
    });
     // OPEN MODAL
  const openModal = () => {
    setIsModalOpen(true);
  };

  // CLOSE MODAL
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
        ...prevData,
        [name]: value.toUpperCase(),
    }));
};

const updateSeatapi= async () => {
    try {
      setLoading(true);
      const resp = await axios.put(`${VITE_DATA}/sit/update/${data._id}`, datas); // Corrected
      console.log(resp);
      toast.success(`${resp.data.sitcapacity}`);
      closeModal(); 
      updateData();
    } catch (error) {
      console.error("Error updating seating capacity:", error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <>
    {/* <!-- Modal toggle --> */}
    <button onClick={openModal} type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-3 py-1 my-1 text-center ">
      Update
    </button>
    {/* <!-- Main modal --> */}
    {isModalOpen && (
      <div
        id="static-modal"
        data-modal-backdrop="static"
        tabIndex="-1"
        aria-hidden="true"
        className="fixed top-0 right-0 left-0 bottom-0 inset-0 z-50 overflow-y-auto overflow-x-hidden bg-black bg-opacity-50">
        <div className="relative p-1 w-1/3  mx-auto my-40">
          {/* <!-- Modal content --> */}
          <div className="relative bg-gradient-to-r from-cyan-700 to-cyan-700 rounded-lg shadow dark:bg-slate-100">
            {/* <!-- Modal header --> */}
            <div className="flex items-center justify-between p-2 md:p-3 rounded-lg dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-100">
                Update Seating Capacity
              </h3>
              <button
                onClick={closeModal}
                type="button"
                className=" bg-transparent hover:text-red-500 text-slate-100  rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center  ">
                <CgCloseR size={25} />
              </button>
            </div>

            {/* <!-- Modal body --> */}
            <section className="p-4 md:p-3  rounded-lg max-h-auto text-justify overflow-y-auto bg-gradient-to-r from-cyan-600 to-cyan-700">
              <div className="container-fluid flex justify-center p-1 border-gray-200 border-dashed rounded-lg dark:border-gray-700 bg-white">
                <div className="relative w-full lg:w-full p-4 lg:p-1 rounded-xl shadow-xl text-2xl items-center bg-slate-200">
                  <div className="flex flex-wrap">
                   
                    <div className="flex p-1  text-start w-full lg:w-1/4">
                      <label className="text-base mx-1 my-auto ">Sitting Capacity:</label>
                      <input
                        className="input-style p-1 text-lg rounded-lg"
                        type="text"
                        value={datas.sitcapacity}
                        onChange={handleInputChange}
                        name="sitcapacity"
                        placeholder="Enter Sitting Capacity"
                      />
                    </div>
                  </div>
                  {/* button */}
                  <div className="col-span-4 p-2 mt-4 flex justify-center">
                    <button
                      className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                      onClick={updateSeatapi} type="button" > {loading ? "Submitting..." : "Submit"} </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    )}
  </>

  )
}

export default UpdateSeat;