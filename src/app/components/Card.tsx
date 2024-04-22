import React from 'react';
import Image from 'next/image';
import TestCardImage from '@/assets/test-card-image.jpg';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';


interface CardProps {
  image: string | StaticImport;
  title: string;
}

const Card: React.FC<CardProps> = ({ image, title }) => {
  return (
    <div className="h-full w-full md:max-w-[640px] md:my-4 md:mx-auto shadow-lg bg-gray-100 dark:bg-gray-500">
      <div className="h-[300px] w-full">
        <Image
          src={image}
          alt={`${title} Image`}
          width={0}
          height={0}
          loading="lazy"
          className="size-full object-cover object-center"
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-4 px-[39px] py-[40px] text-center">
        <h6 className="text-2xl font-bold">{title}</h6>
        <a
          href="#"
          className="transition-border border-b-2 border-b-nana-blue pb-2 text-nana-blue duration-1000 hover:border-none"
        >
          Get Started
        </a>
      </div>
    </div>
  );
};



const CardSection: React.FC = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full lg:max-w-[90rem] px-4 lg:px-12 mb-[7.5rem] lg:mb-[10rem] mx-auto ">
      <Card image={TestCardImage} title="Get paid as a partner" />
      <Card image={TestCardImage} title="Another title" />
      <Card image={TestCardImage} title="Yet another title" />
    </section>
  );
};

export default CardSection;

