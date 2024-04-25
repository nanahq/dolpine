import React from 'react';
import Image from 'next/image';
import VendorImage from '@/assets/hero_updated_1.jpg'
import BusinessImage from '@/assets/Why-1.png'
import RiderImage from '@/assets/delivery_guy.jpg'
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Link from "next/link";

interface CardProps {
  image: string | StaticImport;
  title: string;

  link?: string
}

const Card: React.FC<CardProps> = ({ image, title, link }) => {
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
        <Link
          href={link ?? '#'}
          className="transition-border border-b-2 border-b-nana-blue pb-2 text-nana-blue duration-1000 hover:border-none"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};



const CardSection: React.FC = () => {
  return (
    <section className="w-full lg:max-w-[90rem] px-4 lg:px-12 mb-[7.5rem] lg:mb-[10rem] mx-auto ">
      <h2 className="font-bold text-3xl lg:text-5xl text-center mb-8 dark:text-white">
        Beyond Delivery
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card link="https://vendors.trynanaapp.com" image={VendorImage} title="Join Nana as A vendor" />
        <Card link="https://courier.trynanaaapp.com" image={RiderImage} title="Become a delivery partner" />
        <Card image={BusinessImage} title="Nana for Business" />
      </div>
    </section>
  );
};

export default CardSection;

