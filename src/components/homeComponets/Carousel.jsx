/* eslint-disable react/prop-types */
import { Navigation, Pagination, Scrollbar, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { NavLink } from 'react-router-dom';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// import { NavLink } from 'react-router-dom';

const Carousel = ({carousel}) => {
  console.log(carousel);
  return (
    <section className="container-fluid  max-w-2xl">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, Autoplay]}
        spaceBetween={5}
        slidesPerView={1} // Adjust the number of slides per view based on screen size
        // navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 4000, // Set the delay in milliseconds between slides
          disableOnInteraction: false, // Continue autoplay even when the user interacts with the slider
        }}
        className='container-fluid   items-center mb-5   w-2/3 mt-5 xs:w-1/3 sm:w-3/4 md:w-3/4 lg:w-3/4 xl:w-full'>
        
          {/* <div className="w-full max-w-md  border border-gray-200 rounded-lg shadow  dark:border-red-800"> */}
          {carousel.map((obj, idx) => (
                        <SwiperSlide className='  rounded-2xl ' key={idx}>
                            <NavLink to="#">
                                <img src={obj.img} className='w-full' alt={`slide-${idx}`} />
                            </NavLink>
                        </SwiperSlide>
                    ))}
          {/* </div> */}
      
        
         
      </Swiper>
     </section>
  );
};

export default Carousel;
