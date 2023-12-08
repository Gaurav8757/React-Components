/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { Navigation, Pagination, Scrollbar, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { NavLink } from 'react-router-dom';

const MiddleCarousel = ({ homethirdslider }) => {
  return (
    <section className="container-fluid bg-gray-500">
      <div className='pt-10 ml-2 mr-2 pb-10 items-center bg-slate-200'>
        <Swiper
          // install Swiper modules
          modules={[Navigation, Pagination, Scrollbar, Autoplay]}
          spaceBetween={15}
          slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 5000, // Set the delay in milliseconds between slides
            disableOnInteraction: false, // Continue autoplay even when user interacts with the slider
          }}
          className='flex justify-center m-auto w-4/5 sm:w-3/4 md:w-3/4 lg:w-4/5  xl:w-4/5 bg-slate-100 p-0 '
        >
          {
            homethirdslider.map((obj, idx) => (

              <SwiperSlide className='border bg-slate-400 rounded-2xl ' key={idx}>
                <NavLink to="#">
                <img src={obj.img} className='w-full' /></NavLink></SwiperSlide>
            ))
          }

        </Swiper>
      </div>
    </section>
  );
};


export default MiddleCarousel;