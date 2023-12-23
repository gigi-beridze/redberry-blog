// // Slider.tsx
// import React from 'react';
// import 'swiper/swiper-bundle.min.css';
// import SwiperCore from 'swiper';
// import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules';
// import { Swiper, SwiperSlide } from 'swiper/react';


// SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

// interface SliderProps {
//   items: React.ReactNode[];
// }

// const Slider: React.FC<SliderProps> = ({ items }) => {
//   return (
 
//   );
// };

// export default


// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import React from 'react';
interface SliderProps {
  items: React.ReactNode[];
}

export default ( items:any) => {
    console.log(items)
  return (
    <div>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
      >
          <SwiperSlide key={items.id}>fa</SwiperSlide>
      </Swiper>
      <div className="swiper-button-next"></div>
      <div className="swiper-button-prev"></div>
    </div>
  );
};