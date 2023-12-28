/* eslint-disable react/prop-types */
import { Navigation, Pagination, Scrollbar, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { NavLink } from 'react-router-dom';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
const OurPartners = ({Ourpartners}) => {
  return (
    <>
    <main className='flex'>
    <section className="container w-1/2 bg-gradient-to-r from-teal-500 to-teal-500">
        <div className="text-start text-black bg-gradient-to-r from-teal-500 ">
        <div className="text-3xl mx-14 py-5 font-medium">Health
          <svg width="70" height="70" xmlns="http://www.w3.org/2000/svg" className="-mt-12 -ml-2">
            <line x1="10" y1="50" x2="90" y2="50" stroke="red" strokeWidth="4" />
          </svg>
        </div>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, Autoplay]}
        spaceBetween={0}
        slidesPerView={2} // Adjust the number of slides per view based on screen size
        // navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 4000, // Set the delay in milliseconds between slides
          disableOnInteraction: false, // Continue autoplay even when the user interacts with the slider
        }}
        className='container-fluid'>
        
          {/* <div className="w-full max-w-md  border border-gray-200 rounded-lg shadow  dark:border-red-800"> */}
          {Ourpartners.map((obj, idx) => (
                        <SwiperSlide className='rounded-2xl xl:pl-20 xl:pr-20 pb-10' key={idx}>
                            <NavLink to="#">
                                <img src={obj.img} className='w-full' alt={`slide-${idx}`} />
                            </NavLink>
                        </SwiperSlide>
                    ))}
      </Swiper></div>
     </section>

<section className="container w-1/2 bg-gradient-to-r from-teal-500 to-indigo-400">
<div className="text-start text-black bg-gradient-to-r from-teal-500 to-indigo-400">
<div className="text-3xl mx-14 py-5 font-medium">General Insurance
  <svg width="70" height="70" xmlns="http://www.w3.org/2000/svg" className="-mt-12 -ml-2">
    <line x1="10" y1="50" x2="90" y2="50" stroke="red" strokeWidth="4" />
  </svg>
</div>
<Swiper
modules={[Navigation, Pagination, Scrollbar, Autoplay]}
spaceBetween={0}
slidesPerView={2} // Adjust the number of slides per view based on screen size
// navigation
pagination={{ clickable: true }}
autoplay={{
  delay: 4000, // Set the delay in milliseconds between slides
  disableOnInteraction: false, // Continue autoplay even when the user interacts with the slider
}}
className='container-fluid'>

  {/* <div className="w-full max-w-md  border border-gray-200 rounded-lg shadow  dark:border-red-800"> */}
  {Ourpartners.map((obj, idx) => (
                <SwiperSlide className='rounded-2xl xl:pl-20 xl:pr-20 pb-10' key={idx}>
                    <NavLink to="#">
                        <img src={obj.img} className='w-full' alt={`slide-${idx}`} />
                    </NavLink>
                </SwiperSlide>
            ))}
</Swiper></div>
</section>
</main>
</>
  );
};
export default OurPartners;

