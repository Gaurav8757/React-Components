/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { Navigation, Pagination, Scrollbar, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const MiddleCarousel = ({ buy }) => {
  return (
    <section className="container-fluid bg-gray-500">
      <div className='pt-10 ml-2 mr-2 bg-slate-100'>
        <Swiper
          // install Swiper modules
          modules={[Navigation, Pagination, Scrollbar, Autoplay]}
          spaceBetween={70}
          slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 1000, // Set the delay in milliseconds between slides
            disableOnInteraction: false, // Continue autoplay even when user interacts with the slider
          }}
          // scrollbar={{ draggable: true }}
          onSwiper={() => console.log("")}
          onSlideChange={() => console.log('')}
          
        >
          {
            buy.map((obj, idx) => (
              
              <SwiperSlide>
              <img src={obj.images} key={idx}/></SwiperSlide>
            ))
          }

        </Swiper>
      </div>
    </section>
  );
};


export default MiddleCarousel;