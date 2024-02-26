/* eslint-disable react/prop-types */
import { Navigation, Pagination, Scrollbar, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Carousel = () => {
  const [APIData, setAPIData] = useState([]);
  useEffect(() => {
    // The user is authenticated, so you can make your API request here.
    axios
      .get(`https://eleedomimf.onrender.com/users/first/view`)
      .then((response) => {
        //  console.log(response.data);
        setAPIData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    [APIData];
  })

  return (
    <section className="container-fluid   max-w-sm">
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
        className='container-fluid   mb-5   w-1/2 mt-5 xs:w-1/3 sm:w-1/3 md:w-3/4 lg:w-3/4 xl:w-full'>
        {/* <div className="w-full max-w-md  border border-gray-200 rounded-lg shadow  dark:border-red-800"> */}
        {APIData.map((obj, idx) => (
          <SwiperSlide className='  rounded-2xl ' key={idx}>
            <NavLink to="#">
              <img src={obj.usercarousel_upload} className='w-full' alt={`slide-${idx}`} />
            </NavLink>
          </SwiperSlide>
        ))}
        {/* </div> */}
      </Swiper>
    </section>
  );
};

export default Carousel;
