import { Navigation, Pagination, Scrollbar, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// import { NavLink } from 'react-router-dom';

const FourthCarousel = () => {
    return (
        <section className="container-fluid  bg-gradient-to-r from-cyan-400 to-indigo-400">
            <div className=" ml-2 mr-2 pt-10 p-2 pb-5 text-start  bg-gradient-to-r from-cyan-400 to-indigo-400">
                <div className="col">
                    <div className="text-3xl mx-10 font-medium">What Our Customers
                        Are Saying
                        <svg width="70" height="70" xmlns="http://www.w3.org/2000/svg" className="-mt-10 -ml-2">
                            <line x1="10" y1="50" x2="90" y2="50" stroke="red" strokeWidth="4" />
                        </svg>
                    </div>
                    <Swiper
                        modules={[Navigation, Pagination, Scrollbar, Autoplay]}
                        spaceBetween={5}
                        slidesPerView={2} // Adjust the number of slides per view based on screen size
                        // navigation
                        pagination={{ clickable: true }}
                        autoplay={{
                            delay: 4000, // Set the delay in milliseconds between slides
                            disableOnInteraction: false, // Continue autoplay even when the user interacts with the slider
                        }}
                        className='flex justify-center m-auto max-w-5xl  w-full mt-5 sm:w-4/6 md:w-3/4 lg:w-2/3 xl:w-3/2 sm:text-lg md:text-lg xl:2xl text-md'>
                        <SwiperSlide>
                            <div className="w-full max-w-md  border border-gray-200 rounded-lg shadow  dark:border-red-800">
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
            </div>
        </section>
    );
};

export default FourthCarousel;
