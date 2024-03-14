import { useState } from "react";
function TrackRequest() {
  const [textInput, setTextInput] = useState("");
  const [textareaInput, setTextareaInput] = useState("");
  return (
    <section className="container-fluid relative p-0 flex justify-center my-10 bg-white">
    <div className="relative  flex-col  md:w-1/3 rounded-xl shadow-xl text-xl container-fluid bg-gradient-to-r from-gray-300 to-slate-300">
      <h1 className="text-blue-800 text-xl font-semibold my-4">Track Your Request</h1>
      <div className="space-y-2 p-4 text-start">
         {/* Other form fields */}
         <label className="text-sm mx-1 ">Topic</label>
        <textarea
          className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:border-blue-500 w-full p-2.5"
          type="text"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          placeholder="TEXT"
        />

      <label className="text-sm mx-1 "> Query</label>
        <textarea
          className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:border-blue-500 w-full p-2.5"
          rows="4"
          cols="25"
          maxLength="300"
          value={textareaInput}
          onChange={(e) => setTextareaInput(e.target.value)}
          placeholder="Max Allowed Characters: 200"
        ></textarea>

       
        <div className="flex justify-center ">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
            // onClick={handleSubmit}
            type="button"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
    </section>
  );
}

export default TrackRequest;
