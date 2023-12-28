/* eslint-disable react/prop-types */
import { Navigation, Pagination, Scrollbar, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { NavLink } from 'react-router-dom';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const OurPartners = ({ Ourpartners }) => {
  return (
    <>
      <main className='block xs:block sm:flex md:flex lg:flex xl:flex xl:w-1/2'>
        <section className="container w-full xs:max-w-xl sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-full bg-gradient-to-r from-teal-500 to-teal-500">
          <div className="text-start text-black bg-gradient-to-r from-teal-500 ">
            <div className="text-3xl mx-14 py-5 font-medium">Health
              <svg width="70" height="70" xmlns="http://www.w3.org/2000/svg" className="-mt-12 -ml-2">
                <line x1="10" y1="50" x2="90" y2="50" stroke="red" strokeWidth="4" />
              </svg>
            </div>
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, Autoplay]}
              spaceBetween={0}
              slidesPerView={2}
              pagination={{ clickable: true }}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              className='container '>
              {Ourpartners.map((obj, idx) => (
                <SwiperSlide className='rounded-2xl xl:pl-10 xl:pr-10 pb-10' key={idx}>
                  <NavLink to="#">
                    <img src={obj.img} className='w-full' alt={`slide-${idx}`} />
                  </NavLink>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>

        <section className="container-fluid w-full xs:max-w-xl sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-full bg-gradient-to-r from-teal-500 to-indigo-400">
          <div className="text-start text-black bg-gradient-to-r from-teal-500 to-indigo-400">
            <div className="text-3xl mx-14 py-5 font-medium">General Insurance
              <svg width="70" height="70" xmlns="http://www.w3.org/2000/svg" className="-mt-12 -ml-2">
                <line x1="10" y1="50" x2="90" y2="50" stroke="red" strokeWidth="4" />
              </svg>
            </div>
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, Autoplay]}
              spaceBetween={0}
              slidesPerView={2}
              pagination={{ clickable: true }}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              className='container-fluid'>
              {Ourpartners.map((obj, idx) => (
                <SwiperSlide className='rounded-2xl xl:pl-10 xl:pr-10 pb-10' key={idx}>
                  <NavLink to="#">
                    <img src={obj.img} className='w-full' alt={`slide-${idx}`} />
                  </NavLink>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      </main>
    </>
  );
};

export default OurPartners;
