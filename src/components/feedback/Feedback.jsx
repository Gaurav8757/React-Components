import { useState } from "react";
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
             
              pagination={{ clickable: true  }}
              direction="vertical"
              autoplay={{
                delay: 4000, // Set the delay in milliseconds between slides
                disableOnInteraction: false, // Continue autoplay even when the user interacts with the slider
              }}
              className='flex  max-h-screen justify-center  w-auto mt-5 sm:w-3/4 md:w-3/4 lg:w-3/4 xl:w-3/4 sm:text-lg md:text-lg xl:2xl text-md'>
              <SwiperSlide>
                <div className="w-full  max-w-md  border border-gray-200 rounded-lg shadow  dark:border-red-800">
                  <div className=" text-center px-4 p-2">
                    <h1 className=' text-xl font-medium text-blue-700'>
                      Customer Name1
                    </h1>
                    <p className='mt-1 text-justify  text-gray-900'> Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Dignissimos placeat fugit cumque deleniti temporibus commodi quasi sunt, veritatis architecto ipsum?
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="w-full max-w-md  border border-gray-200 rounded-lg shadow  dark:border-red-800">
                  <div className=" text-center px-4 p-2">
                    <h1 className=' text-xl font-medium text-blue-700'>
                      Customer Name2
                    </h1>
                    <p className='mt-1 text-justify  text-gray-900'>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quibusdam corporis perferendis nam eveniet nihil numquam corrupti enim ex laboriosam voluptates.
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide >
                <div className="w-full max-w-md  border border-gray-200 rounded-lg shadow  dark:border-red-800">
                  <div className=" text-center px-4 p-2">
                    <h1 className='mb-4 text-xl font-medium'>
                      Customer Name3
                    </h1>
                    <p className=' text-justify  text-gray-900'>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, voluptas.
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Natus, dolor.
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide >
                <div className="w-full max-w-md  border border-gray-200 rounded-lg shadow  dark:border-red-800">
                  <div className=" text-center px-4 p-2">
                    <h1 className='mb-4 text-xl font-medium'>
                      Customer Name4
                    </h1>
                    <p className=' text-justify  text-gray-900'>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, voluptas.
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Natus, dolor.
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        {/* </div> */}

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
