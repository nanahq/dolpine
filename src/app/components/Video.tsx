import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import React from 'react';

interface Props {
  image: string | StaticImport;
  title: string;
  subtitle: string;
  content: string;
}

const VideoBanner: React.FC<Props> = ({ image, title, subtitle, content }) => {
  return (
    <section className="relative mx-auto flex-col bg-blend-multiply shadow-lg md:max-w-[80rem] lg:flex lg:max-w-[80rem] lg:flex-row-reverse mb-[7.5rem]">
      <div
        className="flex h-[20rem] w-full flex-col justify-between bg-cover bg-center p-4 px-6 py-8 md:h-[34.375rem] lg:h-[38.75rem] xl:h-[45.625rem]"
        style={{ backgroundImage: `url(${image})` }}
      >
        <h5 className="z-[2] flex-1 text-2xl font-bold leading-relaxed tracking-normal text-white  antialiased md:text-3xl lg:hidden">
          {title}
        </h5>
        <h2 className="z-[2] mb-10 text-4xl font-bold leading-snug tracking-normal text-white md:text-5xl lg:hidden font-sans">
          {subtitle}
        </h2>
        <div className="absolute top-0 left-0 w-full h-full z-[1] bg-black opacity-50 lg:hidden"></div>
      </div>

      <div className="aspect-w-[16] aspect-h-[9] absolute hidden h-[20rem] w-full max-w-[800px] flex-col justify-center p-14 md:h-[34.375rem] lg:relative lg:flex lg:h-[38.75rem] xl:h-[45.625rem] xl:pb-[2.25rem] xl:pl-[7.375rem] xl:pr-[6rem] xl:pt-[4.5rem]">
        <h5 className="flex-1 text-3xl font-bold  leading-relaxed tracking-normal  antialiased xl:mb-[4.5rem] xl:flex-grow-0">
          {title}
        </h5>
        <h2 className="mb-10 text-6xl font-bold leading-snug tracking-normal">
          {subtitle}
        </h2>
        <p className="mb-[2.5rem]">{content}</p>
        <svg
          fill="#000000"
          height="12.5rem"
          width="12.5rem"
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          className="size-16"
          viewBox="0 0 459 459"
          xmlSpace="preserve"
        >
          <g strokeWidth="0"></g>
          <g strokeLinecap="round" strokeLinejoin="round"></g>
          <g>
            <g>
              <g>
                <path d="M229.5,0C102.751,0,0,102.751,0,229.5S102.751,459,229.5,459S459,356.249,459,229.5S356.249,0,229.5,0z M310.292,239.651 l-111.764,76.084c-3.761,2.56-8.63,2.831-12.652,0.704c-4.022-2.128-6.538-6.305-6.538-10.855V153.416 c0-4.55,2.516-8.727,6.538-10.855c4.022-2.127,8.891-1.857,12.652,0.704l111.764,76.084c3.359,2.287,5.37,6.087,5.37,10.151 C315.662,233.564,313.652,237.364,310.292,239.651z"></path>
              </g>
            </g>
          </g>
        </svg>
      </div>
    </section>
  );
};

export default VideoBanner;
