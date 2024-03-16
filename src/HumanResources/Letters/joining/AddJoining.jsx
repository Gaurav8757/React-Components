import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function AddJoining() {
  const [APIData, setAPIData] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState("");
  const [selectedItemData, setSelectedItemData] = useState({
    ofdate: "",
    ofname: "",
    ofmobile: "",
    ofaddress: "",
    ofemail: "",
    ofdesignation: "",
    ofgrosalary: "",
    ofsalaryWords: "",
    ofvalidDate: "",
  });

  // AUTO SHOW DATA
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      toast.error("Not Authorized yet.. Try again! ");
    } else {
      axios
        .get(`https://eleedomimf.onrender.com/letters/view/offer`, {
          headers: {
            Authorization: `${token}`,
          },
        })
        .then((response) => {
          setAPIData(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  const handleDropdownChange = (e) => {
    const selectedItemId = e.target.selectedOptions[0].getAttribute("data-id");
    setSelectedItemId(selectedItemId);
    const selectedItem = APIData.find((item) => item._id === selectedItemId);
    if (selectedItem) {
      setSelectedItemData(selectedItem);
    } else {
      setSelectedItemData({
        ofdate: "",
        ofname: "",
        ofmobile: "",
        ofaddress: "",
        ofemail: "",
        ofdesignation: "",
        ofgrosalary: "",
        ofsalaryWords: "",
        ofvalidDate: "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formSubmitted) {
      return;
    }

    try {
      const response = await axios.post(
        `https://eleedomimf.onrender.com/update/letter/${selectedItemId}`,
        selectedItemData
      );

      if (response.data) {
        toast.success(`${response.data.status}`);
        setFormSubmitted(true);
        setSelectedItemId("");
        setSelectedItemData({
          ofdate: "",
          ofname: "",
          ofmobile: "",
          ofaddress: "",
          ofemail: "",
          ofdesignation: "",
          ofgrosalary: "",
          ofsalaryWords: "",
          ofvalidDate: "",
        });
      } else {
        toast.error("Error Occurred. Try again...! ");
      }
    } catch (error) {
      console.error("Error during Add User", error.response);
      toast.error("Error Occurred. Try again...!");
    } finally {
      setFormSubmitted(false);
    }
  };

  return (
    <section className="container-fluid relative h-screen p-0 sm:ml-64 bg-white">
      <div className="container-fluid flex justify-center p-2 border-gray-200 border-dashed rounded-lg bg-white">
        <div className="relative w-full lg:w-full p-0 lg:p-4 rounded-xl shadow-xl text-2xl items-center bg-slate-200">
          <h1 className="font-semibold text-3xl mb-10">Create Joining Letter</h1>
          <div className="flex flex-wrap justify-between">
            <div className="flex flex-col p-2 text-start w-full lg:w-1/4">
              <label className="text-base mx-1">Select Item</label>
              <select
                className="input-style p-1 rounded-lg"
                value={selectedItemId}
                onChange={handleDropdownChange}
              >
                <option value="">----------- Select User ------------</option>
                {APIData.map((item) => (
                  <option key={item._id} value={item._id} data-id={item._id}>
                    {item.ofname}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col p-2 text-start w-full lg:w-1/4">
              <label className="text-base mx-1">Email ID<sup className="text-red-600 font-bold">*</sup></label>
              <input
                className="input-style bg-slate-300  rounded-lg"
                type="text"
                value={selectedItemData.ofemail}
                name="ofemail"
                // readOnly
              />
            </div>

            <div className="flex flex-col p-2 text-start w-full lg:w-1/4">
              <label className="text-base mx-1">Contact No:<sup className="text-red-600 font-bold">*</sup></label>
              <input
                className="input-style bg-slate-300  rounded-lg"
                type="text"
                value={selectedItemData.ofmobile}
                name="ofmobile"
                // readOnly
              />
            </div>

            <div className="flex flex-col p-2 text-start w-full lg:w-1/4 ">
              <label className="text-base mx-1">Address:<sup className="text-red-600 font-bold">*</sup></label>
              <textarea
                className="input-style bg-slate-300  rounded-lg"
                type="text"
                cols={20}
                value={selectedItemData.ofaddress}
                name="ofaddress"
                // readOnly
              />
            </div>

            <div className="flex flex-col p-2 text-start w-full lg:w-1/4 mt-4">
              <label className="text-base mx-1">Employee Type(Designation):<sup className="text-red-600 font-bold">*</sup></label>
              <input
                className="input- bg-slate-300  rounded-lg"
                type="text"
                value={selectedItemData.ofdesignation}
                name="ofdesignation"
                readOnly
              />
            </div>

            <div className="flex flex-col p-2 text-start w-full lg:w-1/4 mt-4">
              <label className="text-base mx-1">Gross Salary<sup className="text-red-600 font-bold">*</sup></label>
              <input
                className="input-style bg-slate-300  rounded-lg"
                type="text"
                value={selectedItemData.ofgrosalary}
                name="ofgrosalary"
                readOnly
              />
            </div>

            <div className="flex flex-col p-2 text-start  w-full lg:w-1/4 mt-4">
              <label className="text-base mx-1">Salary in Words:<sup className="text-red-600 font-bold">*</sup></label>
              <input
                className="input-style bg-slate-300  rounded-lg"
                type="text"
                value={selectedItemData.ofsalaryWords}
                name="ofsalaryWords"
                readOnly
              />
            </div>

            {/* <div className="flex flex-col p-2 text-start w-full lg:w-1/4 mt-4">
              <label className="text-base mx-1">Valid upto:<sup className="text-red-600 font-bold">*</sup></label>
              <input
                className="input-style rounded-lg"
                type="date"
                value={selectedItemData.ofvalidDate}
                name="ofvalidDate"
                onChange={(e) => setSelectedItemData({...selectedItemData, ofvalidDate: e.target.value})}
              />
            </div> */}
          </div>

          <div className="flex justify-center p-2 text-center w-full my-2 mt-10 gap-10">
            <button
              className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-6 py-2.5 text-center me-2 mb-2"
              onClick={handleSubmit}
              type="button"
              disabled={formSubmitted}
            >
              {formSubmitted ? "Submitted" : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AddJoining;
