import { useState, useEffect } from "react";
import { Navigation, Pagination, Scrollbar, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/zoom';
import 'swiper/css/mousewheel'
import axios from "axios";
import { toast } from "react-toastify";
const Feedback = () => {
  const [feedbackuser_name, setFeedbackUserName] = useState("");
  const [feedbackuser_email, setFeedbackUserEmail] = useState("");
  const [feedbackuser_mobile, setFeedbackUserMobile] = useState("");
  const [feedbackuser_query, setFeedbackUserQuery] = useState("");
  const [feedbackuser_upload, setFeedbackUserUpload] = useState(null);
  // const [feedbackuser_status, setFeedbackUserStatus] = useState(true);
  const [APIData, setAPIData] = useState([]);

  useEffect(() => {
    axios
      .get(`https://eleedomimf.onrender.com/users/activeusers`)
      .then((response) => {
        // console.log(response.data);
        setAPIData(response.data);

      })
      .catch((error) => {
        console.error(error);
      });

  }, [APIData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("feedbackuser_name", feedbackuser_name);
      formData.append("feedbackuser_email", feedbackuser_email);
      formData.append("feedbackuser_mobile", feedbackuser_mobile);
      formData.append("feedbackuser_query", feedbackuser_query);
      formData.append("feedbackuser_upload", feedbackuser_upload);
      // formData.append("feedbackuser_status", feedbackuser_status);

      await axios.post("https://eleedomimf.onrender.com/users/feedback", formData);

      // Clear form fields after successful submission
      setFeedbackUserName("");
      // setFeedbackUserStatus("")
      setFeedbackUserEmail("");
      setFeedbackUserMobile("");
      setFeedbackUserQuery("");
      setFeedbackUserUpload(null);
      // setFeedbackUserStatus("")
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
      <div className="container-fluid  mx-auto md:flex md:justify-around ml-2 mr-2 p-10 bg-gradient-to-r from-indigo-400 to-cyan-400">

        {/* <div className=""> */}
        <div className="container-fluid w-auto sm:w-auto md:w-1/2 lg:w-1/2 xl:w-1/3">
          <div className="text-3xl font-medium text-start">What Our Customers
            Are Saying
            <svg width="70" height="70" xmlns="http://www.w3.org/2000/svg" className="-mt-12 -ml-2">
              <line x1="10" y1="50" x2="90" y2="50" stroke="red" strokeWidth="4" />
            </svg>
          </div>
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, Autoplay]}
            spaceBetween={5}
            slidesPerView={3} // Adjust the number of slides per view based on screen size
            // navigation

            // pagination={{ clickable: false }}
            direction="vertical"
            autoplay={{
              delay: 4000, // Set the delay in milliseconds between slides
              disableOnInteraction: false, // Continue autoplay even when the user interacts with the slider
            }}
            className='flex  max-h-screen justify-center  w-auto mt-5 sm:w-3/4 md:w-3/4 lg:w-3/4 xl:w-3/4 sm:text-lg md:text-lg xl:2xl text-md'>
            
            
            {APIData.length > 0 ?(
            
            APIData.map((obj) => (
            
            <SwiperSlide key={obj._id}>
              <div className="w-full  max-w-md  border border-gray-200 rounded-lg shadow  dark:border-red-800">
                <div className=" text-center px-4 p-2">
                  <h1 className=' text-xl font-medium text-blue-700'>
                   {obj.feedbackuser_name}
                  </h1>
                  <p className='mt-1 text-justify  text-gray-900'> 
                  {obj.feedbackuser_query}
                  </p>
                </div>
              </div>
            </SwiperSlide>
            ))):(
              <div role="status" className="me-20">
    <svg aria-hidden="true" className="inline w-32 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span className="sr-only">Loading...</span>
</div>
            )}
          </Swiper>
        </div>
        {/* part-2 */}

        <div className="relative md:w-1/3 rounded-xl shadow-xl text-xl container-fluid">
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
                placeholder="+91" />

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
                maxLength="300"
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
              <div className="flex justify-end ">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
                  onClick={handleSubmit}
                  type="button"
                >
                  Submit
                </button></div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Feedback;
