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
    <Link
      href={link ?? '#'}
      className="group h-full bg-white rounded-md overflow-hidden border-2 border-border-light hover:border-nana-blue/50 transition-all hover:shadow-lg"
    >
      <div className="h-[320px] w-full relative overflow-hidden">
        <Image
          src={image}
          alt={`${title} Image`}
          fill
          loading="lazy"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>
      <div className="flex flex-col items-center justify-center gap-4 p-8 text-center bg-white">
        <h6 className="text-2xl font-bold text-text-primary group-hover:text-nana-blue transition-colors">
          {title}
        </h6>
        <span className="text-nana-blue font-semibold text-base flex items-center gap-2 group-hover:gap-3 transition-all">
          Get Started
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  );
};



const CardSection: React.FC = () => {
  return (
    <section className="py-24 lg:py-32 bg-gradient-to-b from-white to-background-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-block bg-nana-blue/10 text-nana-blue px-4 py-2 rounded-md mb-4 text-sm font-semibold">
            Join Us
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight">
            Beyond Delivery
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Join the Nana ecosystem and grow your business with us
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card link="https://vendors.trynanaapp.com" image={VendorImage} title="Join Nana as A vendor" />
          <Card link="https://courier.trynanaapp.com" image={RiderImage} title="Become a delivery partner" />
          <Card image={BusinessImage} title="Nana for Business" />
        </div>
      </div>
    </section>
  );
};

export default CardSection;

