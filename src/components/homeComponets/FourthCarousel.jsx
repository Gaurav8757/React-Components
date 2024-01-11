import { Navigation, Pagination, Scrollbar, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// import { NavLink } from 'react-router-dom';
const FourthCarousel = () => {
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

    return (
        <section className="container-fluid  bg-gradient-to-r from-white to-slate-100">
            <div className="pt-10 p-2 pb-5 text-start  bg-gradient-to-r from-white to-slate-100">
                <div className="col">
                    <div className="text-3xl mx-8 font-medium">What Our Customers
                        Are Saying
                        <svg width="70" height="70" xmlns="http://www.w3.org/2000/svg" className="-mt-10 -ml-3">
                            <line x1="10" y1="50" x2="90" y2="50" stroke="red" strokeWidth="4" />
                        </svg>
                    </div>
                    <Swiper
                        modules={[Navigation, Pagination, Scrollbar, Autoplay]}
                        spaceBetween={5}
                        slidesPerView={3} // Adjust the number of slides per view based on screen size
                        // navigation
                        pagination={{ clickable: true }}
                        autoplay={{
                            delay: 4000, // Set the delay in milliseconds between slides
                            disableOnInteraction: false, // Continue autoplay even when the user interacts with the slider
                        }}
                        className='flex justify-center items-center m-auto max-w-full  w-full mt-5 ml-10 sm:w-4/6 md:w-3/4 lg:w-2/3 xl:w-full sm:text-lg md:text-lg xl:2xl text-md'>
                        {APIData.length > 0 ? (
                            APIData.map((obj) => (
                                <SwiperSlide key={obj._id}>
                                    <div className="w-full max-w-md  border rounded-md shadow  border-teal-800">
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
                            ))) : (
                            <div role="status">
                                <svg aria-hidden="true" className=" w-32 h-16 flex justify-start mx-96  text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                        )}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default FourthCarousel;
