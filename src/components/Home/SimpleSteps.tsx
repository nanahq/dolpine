import { A11y, Autoplay, Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import { SwiperSlide, Swiper } from 'swiper/react';
import { SwiperOptions } from 'swiper/types';
import {
  StepFour,
  StepOne,
  StepThree,
  StepTwo,
} from '@/components/Home/components/step';
import { Feature } from '@/components/Home/components/Features';

SwiperCore.use([A11y, Autoplay, Navigation]);

const sliderOptions: SwiperOptions = {
  slidesPerView: 1.1,
  watchOverflow: true,
  spaceBetween: 12,
  grabCursor: true,
  autoplay: {
    delay: 2000,
  },
  loop: true,
  speed: 1000,
  modules: [A11y, Autoplay, Navigation],
  breakpoints: {
    1024: {
      slidesPerView: 'auto',
      autoplay: {
        delay: 5000,
      },
    },
  },
};

const sliderOptions2: SwiperOptions = {
  ...sliderOptions,
  speed: 2000,
  autoplay: {
    delay: 100,
    stopOnLastSlide: false,
    waitForTransition: false,
  },
  loop: true,
  slidesPerView: 2,
  breakpoints: {
    1024: {
      slidesPerView: 4,
    },
  },
};
export const SimpleSteps = () => {
  return (
    <section className="bg-black lg:relative md:rounded-[20px]">
      <Swiper
        centeredSlides={true}
        {...sliderOptions}
        className=" w-full swiper-slider-wrapper max-w-max"
      >
        <SwiperSlide className="swiper-item">
          <StepOne />
        </SwiperSlide>
        <SwiperSlide className="swiper-item">
          <StepTwo />
        </SwiperSlide>
        <SwiperSlide className="swiper-item">
          <StepThree />
        </SwiperSlide>
        <SwiperSlide className="swiper-item">
          <StepFour />
        </SwiperSlide>
      </Swiper>
      <div className="container lg:-mt-[8rem] pb-20">
        <div className="flex flex-col my-20 space-y-4 lg:space-y-0 lg:flex-row items-center justify-between text-white">
          <div className="w-full lg:w-1/2 font-bold">
            <h1 className="font-bold text-3xl lg:text-[50px]">
              Nana, handles all delivery and payment wahala!
            </h1>
          </div>
          <div className="w-full lg:w-1/3 after-line">
            <p className="text-2xl">
              Lazy to go out and get food? Have unexpected guest over? Late
              night snack?
            </p>
          </div>
        </div>
        <div className="bg-nana-blue py-5 lg:py-20 px-6 lg:px-20 mt-10 lg:mt-24 flex flex-col lg:flex-row lg:items-center justify-between rounded-[20px]">
          <div className="w-full lg:w-1/2">
            <h1 className="text-white font-bold text-xl lg:text-3xl">
              Get{' '}
              <span className="text-black  text-2xl lg:text-4xl">₦400 off</span>{' '}
              your first order when you using this promo code.
            </h1>
          </div>
          <div className="bg-white relative rounded-[20px] mt-2 px-4 lg:px-10 py-3 lg:py-5 ">
            <p className="font-bold text-3xl text-center">NEW400</p>
            <div className="bg-nana-purple rounded-full w-6 h-6 absolute top-2 left-2" />
          </div>
        </div>
        <div className="mt-40">
          <Swiper {...sliderOptions2} className="w-full max-w-max">
            <SwiperSlide className="feature-slide-item">
              <Feature feature="Order Tracking" />
            </SwiperSlide>
            <SwiperSlide className="feature-slide-item">
              <Feature feature="Delivery Schedule" />
            </SwiperSlide>
            <SwiperSlide className="feature-slide-item">
              <Feature feature="Order Tracking" />
            </SwiperSlide>
            <SwiperSlide className="feature-slide-item">
              <Feature feature="Delivery Schedule" />
            </SwiperSlide>
            <SwiperSlide className="feature-slide-item">
              <Feature feature="Order Tracking" />
            </SwiperSlide>
            <SwiperSlide className="feature-slide-item">
              <Feature feature="Delivery Schedule" />
            </SwiperSlide>
            <SwiperSlide className="feature-slide-item">
              <Feature feature="Easy Payment" />
            </SwiperSlide>
            <SwiperSlide className="feature-slide-item">
              <Feature feature="Fast Delivery" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>
  );
};
