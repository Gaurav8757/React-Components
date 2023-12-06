
import { NavLink } from 'react-router-dom';

const Carousel = () => {
  return (
    <div id="default-carousel" className="relative w-full md:w-2/5 mr-5 sm:p-2" data-carousel="slide">
      {/* Carousel wrapper */}
      <div className="relative  h-60 overflow-hidden rounded-lg md:h-96">
        {/* Item 1 */}
        <NavLink to="#" className="hidden duration-1000 ease-in-out" data-carousel-item>
          <img
            src="/src/assets/navbarimg/term_crore_desktop.avif"
            alt="First Slide"
            className="absolute block w-full rounded-sm -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
          />
        </NavLink>
        {/* Item 2 */}
        <NavLink to="#" className="hidden duration-1000 ease-in-out" data-carousel-item>
          <img
            src="/src/assets/navbarimg/tata-aia-fund_desktop.avif"
            alt="Second Slide"
            className="absolute block w-full rounded-sm -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
          />
        </NavLink>
        {/* Item 3 */}
        <NavLink to="#" className="hidden duration-1000 ease-in-out lazy" data-carousel-item>
          <img
            src="/src/assets/navbarimg/health_cb_hp_emi.avif"
            alt="Third Slide"
            className="absolute block w-full rounded-sm -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
          />
        </NavLink>
        {/* Item 4 (You can add more items here) */}
      </div>
      {/* Slider indicators */}
      <div className="absolute z-30 flex -translate-x-1/2 sm:bottom-10 bottom-4  md:bottom-14 left-1/2 space-x-3 rtl:space-x-reverse">
        <button type="button" className="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
        <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
        <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
        {/* Add more buttons for additional slides */}
      </div>
      {/* Slider controls */}
      <button
        type="button"
        className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-prev
      >
        {/* Add your Previous button content here */}
      </button>
      <button
        type="button"
        className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-next
      >
        {/* Add your Next button content here */}
      </button>
    </div>
  );
};

export default Carousel;
