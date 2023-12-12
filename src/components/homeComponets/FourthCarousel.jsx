import { Navigation, Pagination, Scrollbar, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// import { NavLink } from 'react-router-dom';

const FourthCarousel = () => {
    return (
        <section className="container-fluid  bg-gray-500">
            <div className=" ml-2 mr-2 pt-10 p-2 pb-5 text-start bg-slate-100">
                <div className="col">
                    <div className="text-3xl mx-10 font-medium">What Our Customers
                        Are Saying
                        <svg width="70" height="70" xmlns="http://www.w3.org/2000/svg" className="-mt-12 -ml-2">
                            <line x1="10" y1="50" x2="90" y2="50" stroke="blue" strokeWidth="4" />
                        </svg>
                    </div>
                    <Swiper
                        modules={[Navigation, Pagination, Scrollbar, Autoplay]}
                        spaceBetween={50}
                        slidesPerView={3} // Adjust the number of slides per view based on screen size
                        // navigation
                        pagination={{ clickable: true }}
                        autoplay={{
                            delay: 4000, // Set the delay in milliseconds between slides
                            disableOnInteraction: false, // Continue autoplay even when the user interacts with the slider
                        }}
                        className='flex justify-center m-auto w-full  sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-3/4'>
                        <SwiperSlide>
                            <div className="w-full max-w-sm  border border-gray-200 rounded-lg shadow  dark:border-gray-500">
                                <div className=" text-center px-4 p-2">
                                    <h1 className=' text-2xl font-medium text-blue-600'>
                                        Customer Name2
                                    </h1>
                                    {/* <span className='text-green-700'>(Director)</span> */}
                                    {/* <p className='mt-4 text-justify  text-gray-600'>
                                        Amit Kumar is registered with the Ministry of Corporate Affairs as a Director in Indian Companies. The DIN (Director Identification Number) 
                                        of Amit Kumar is 07174182.</p> */}

                                    <p className='mt-1 text-justify  text-gray-600'> Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        Dignissimos placeat fugit cumque deleniti temporibus commodi quasi sunt, veritatis architecto ipsum?
                                    </p>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="w-full max-w-sm  border border-gray-200 rounded-lg shadow  dark:border-gray-500">
                                <div className=" text-center px-4 p-2">
                                    <h1 className=' text-2xl font-medium text-blue-600'>
                                        Customer Name2
                                    </h1>
                                    {/* <span className='text-green-700'>(Director)</span> */}
                                    {/* <p className='mt-4 text-justify  text-gray-600'>
                                        Adarsh Kumar is registered with the Ministry of Corporate Affairs as a Director in Indian Companies. The DIN (Director Identification Number) of Adarsh Kumar is 08315397.
                                    </p> */}
                                    <p className='mt-1 text-justify  text-gray-600'>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        Quibusdam corporis perferendis nam eveniet nihil numquam corrupti enim ex laboriosam voluptates.
                                    </p>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide >
                            <div className="w-full max-w-sm  border border-gray-200 rounded-lg shadow  dark:border-gray-500">
                                <div className=" text-center px-4 p-2">
                                    <h1 className='mb-4 text-2xl font-medium'>
                                        Customer Name3
                                    </h1>
                                    <p className=' text-justify font-medium text-gray-500'>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, voluptas.
                                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Natus, dolor.
                                    </p>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide >
                            <div className="w-full max-w-sm  border border-gray-200 rounded-lg shadow  dark:border-gray-500">
                                <div className=" text-center px-4 p-2">
                                    <h1 className='mb-4 text-2xl font-medium'>
                                        Customer Name4
                                    </h1>
                                    <p className=' text-justify font-medium text-gray-500'>
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
