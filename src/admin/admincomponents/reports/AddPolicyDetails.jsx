import { useState } from "react"


function AddPolicyDetails() {
  const [policytype, setPolicytype] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [cname, setCname] = useState("");
  const [logos, setLogos] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setPolicytype("");
    setCname("");
    setTitle("");
    setImages("");

  }
  return (
    <section className="container-fluid relative h-screen p-0 sm:ml-64 bg-gradient-to-r from-indigo-400 to-cyan-400">
      <div className="container-fluid flex justify-center p-2  border-gray-200 border-dashed rounded-lg dark:border-gray-700  bg-gradient-to-r from-indigo-400 to-cyan-400">
        <div className="relative w-full lg:w-full  p-0 lg:p-4 rounded-xl shadow-xl text-2xl  items-center bg-gradient-to-r from-indigo-300 to-cyan-400">
          <h1 className="font-semibold text-3xl mb-8 text-white dark:text-black ">Add Policy Details</h1>
          <form className="flex flex-wrap">
            <div className="w-full lg:w-1/2 p-2 text-start">

              <div className="flex flex-col ">
                <label className="text-base mx-1">Gender:</label>
                <select
                  className="input-style rounded-lg"
                  type="text"
                  value={policytype}
                  onChange={(e) => setPolicytype(e.target.value)}

                >
                  <option value="0" selected>----- Select Policy -----</option>
                  <option value="1">M</option>
                  <option value="2">F</option>
                  <option value="3">O</option>
                </select>

              </div>

              <div className="flex flex-col my-5">
                <label className="text-base mx-1">Description:</label>
                <textarea
                  className="input-style rounded-lg"
                  type="text"
                  rows="2"
                  cols="4"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter Description"
                />
              </div>

              <div className="flex flex-col my-5">
                <label className="text-base mx-1">Company Name:</label>
                <input
                  className="input-style rounded-lg"
                  type="text"
                  value={cname}
                  onChange={(e) => setCname(e.target.value)}
                  placeholder="Enter Name"
                />
              </div>




            </div>



            <div className="w-full lg:w-1/2 p-2 text-start">
              <div className="flex flex-col">
                <label className="text-base mx-1 ">Title:</label>
                <input
                  className="input-style rounded-lg"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter Title"
                />
              </div>

              <div className="flex flex-col my-6">
                <label className="text-base mx-1">Upload Image:</label>
                <input
                  className="input-style border w-full h-12 items-center rounded-lg"
                  type="file"
                  value={images}
                  onChange={(e) => setImages(e.target.value)}

                />
              </div>



              <div className="flex flex-col my-6">
                <label className="text-base mx-1">Company Logo:</label>
                <input
                  className="input-style border w-full h-12 items-center rounded-lg"
                  type="file"
                  value={logos}
                  onChange={(e) => setLogos(e.target.value)}

                />
              </div>



            </div>
            <div className="w-full p-2">
              <button
                className="text-white bg-gradient-to-r leading-4 from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                onClick={handleSubmit}
                type="button"
              >
                Submit
              </button>
            </div>
          </form>


        </div>
      </div>
    </section>
  )
}

export default AddPolicyDetails;