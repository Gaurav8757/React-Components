import  { useState } from "react";
import axios from "axios";
import {toast} from "react-toastify";
const Feedback = () => {
  const [feedbackuser_name, setFeedbackUserName] = useState("");
  const [feedbackuser_email, setFeedbackUserEmail] = useState("");
  const [feedbackuser_mobile, setFeedbackUserMobile] = useState("");
  const [feedbackuser_query, setFeedbackUserQuery] = useState("");
  const [feedbackuser_upload, setFeedbackUserUpload] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("feedbackuser_name", feedbackuser_name);
      formData.append("feedbackuser_email", feedbackuser_email);
      formData.append("feedbackuser_mobile", feedbackuser_mobile);
      formData.append("feedbackuser_query", feedbackuser_query);
      formData.append("feedbackuser_upload", feedbackuser_upload);

      await axios.post("https://eleedomimf.onrender.com/users/feedback", formData);

      // Clear form fields after successful submission
      setFeedbackUserName("");
      setFeedbackUserEmail("");
      setFeedbackUserMobile("");
      setFeedbackUserQuery("");
      setFeedbackUserUpload(null);
      toast.success("Feedback submitted successfully!");
    //   console.log("Feedback submitted successfully!");
    } catch (error) {
        toast.error("Error to submitting feedback");
        console.error(error);
    }
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setFeedbackUserUpload(selectedImage);
  };

  return (
    <section className="container-fluid relative bg-gradient-to-r from-indigo-400 to-cyan-400">
      <div className="container-fluid mx-auto md:flex md:justify-around ml-2 mr-2 p-10 bg-gradient-to-r from-indigo-400 to-cyan-400">
        <div className="relative md:w-1/3 rounded-xl shadow-xl text-xl">
          <form>
            <p className="text-2xl font-semibold">Your Opinion</p>
            <div className="space-y-2 p-4 text-start">
              {/* Other form fields */}
              <label className="text-sm mx-1 ">Name</label>
                                <input
                                    className="bg-gray-50 border border-gray-300  
                                    text-sm rounded-lg focus:border-blue-500 
                                    w-full p-2.5"
                                    type="text"
                                    value={feedbackuser_name}
                                    onChange={(e) => setFeedbackUserName(e.target.value)}
                                    placeholder="Your Name"
                                />
              
                            <label className="text-sm mx-1 ">Email Address*</label>
                           <input className="bg-gray-50 border border-gray-300  
                                       text-sm rounded-lg focus:border-blue-500 
                                       w-full p-2.5"
                               type="email"
                               value={feedbackuser_email}
                               onChange={(e) => setFeedbackUserEmail(e.target.value)}
                               placeholder="abc@gmail.com" />

<label className="text-sm mx-1 ">Contact No.</label>
                            <br></br>
                            <input className="bg-gray-50 border border-gray-300 
                                        text-sm rounded-lg focus:border-blue-500  
                                        w-full p-2.5"
                                type="number"
                                value={feedbackuser_mobile}
                                onChange={(e) => setFeedbackUserMobile(e.target.value)}
                                placeholder="+1324567890" />

<label className="text-sm mx-1 ">
                                Drop Your Feedback
                            </label>
                            <br></br>
                            <textarea className="bg-gray-50 border border-gray-300  
                                            text-sm rounded-lg  
                                            focus:border-blue-500  
                                            w-full p-2.5"
                                rows="4"
                                cols="25"
                                maxLength="200"
                                value={feedbackuser_query}
                                onChange={(e) => setFeedbackUserQuery(e.target.value)}
                                placeholder="Max Allowed Characters: 200">
                            </textarea>



              <label className="text-sm mx-1">Upload Image</label>
              <input
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:border-blue-500 w-full p-1"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              <br />
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
  );
};

export default Feedback;
