import { CgCloseR } from "react-icons/cg";
import  { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function UpdateCompanyModal() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { id } = useParams();
    const [companyData, setCompanyData] = useState({
      comp_cname: "",
      comp_insurance: "",
      comp_categories: "",
      comp_establishment: "",
      comp_cfiles: ""
    });
    // OPEN MODAL
    const openModal = () => {
        setIsModalOpen(true);
    };
    // CLOSE MODAL
    const closeModal = () => {
        setIsModalOpen(false);
    };
    useEffect(() => {
        axios
          .get(`https://eleedomimf.onrender.com/api/company/${id}`)
          .then((response) => {
            setCompanyData(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      }, [id]);
  
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCompanyData((prevData) => ({
          ...prevData,
          [name]: value
        }));
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await axios.patch(`https://eleedomimf.onrender.com/api/company/${id}`, companyData);
          // Handle success, redirect, or show a success message
        } catch (error) {
          console.error("Error updating company:", error);
          // Handle error, show an error message, etc.
        }
      };


    return (
        <>
            {/* <!-- Modal toggle --> */}
            <button onClick={openModal} type="button">
                Edit
            </button>

            {/* <!-- Main modal --> */}
            {isModalOpen && (
                <div
                    id="static-modal"
                    data-modal-backdrop="static"
                    tabIndex="-1"
                    aria-hidden="true"
                    className="fixed top-0 right-0 left-0 bottom-0 inset-0 z-50 overflow-y-auto overflow-x-hidden bg-black bg-opacity-50">
                    <div className="relative p-4 w-full max-w-6xl max-h-5xl mx-auto">
                        {/* <!-- Modal content --> */}
                        <div className="relative bg-gradient-to-r from-blue-200 to-cyan-200 rounded-lg shadow dark:bg-slate-100">
                            {/* <!-- Modal header --> */}
                            <div className="flex items-center justify-between p-2 md:p-3 rounded-t dark:border-gray-600">
                                <h3 className="text-2xl font-semibold text-gray-800 dark:text-black">
                                    Buy Insurance at ELLEDOM IMF PVT LTD
                                </h3>
                                <button
                                    onClick={closeModal}
                                    type="button"
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-300 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center  dark:hover:text-white">
                                    <CgCloseR size={25} color="red" />
                                </button>
                            </div>



                            {/* <!-- Modal body --> */}
                            <section className="p-4 md:p-3 scroll-smooth hs-scroll-inside-viewport-modal max-h-auto text-justify overflow-y-auto bg-gradient-to-r from-slate-100 to-white">
                               
                            <form onSubmit={handleSubmit}>
      <label>Company Name:</label>
      <input
        type="text"
        name="comp_cname"
        value={companyData.comp_cname}
        onChange={handleInputChange}
      />
      <br />

      <label>Insurance Type:</label>
      <input
        type="text"
        name="comp_insurance"
        value={companyData.comp_insurance}
        onChange={handleInputChange}
      />
      <br />

      <label>Category:</label>
      <input
        type="text"
        name="comp_categories"
        value={companyData.comp_categories}
        onChange={handleInputChange}
      />
      <br />

      <label>Date of Establishment:</label>
      <input
        type="text"
        name="comp_establishment"
        value={companyData.comp_establishment}
        onChange={handleInputChange}
      />
      <br />

      <label>Files:</label>
      <input
        type="text"
        name="comp_cfiles"
        value={companyData.comp_cfiles}
        onChange={handleInputChange}
      />
      <br />

      <button type="submit">Save Changes</button>
    </form>
  








                            </section>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default UpdateCompanyModal;
