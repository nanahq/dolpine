import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import React from 'react';

interface HeroProps {
  image: string | StaticImport;
  altText: string;
  description: string;
}

const Hero: React.FC<HeroProps> = ({
  image,
  altText,
  description,
}) => {
  return (
    <section className="mb-24 w-full">
      <h1 className="mt-24 mb-12 text-center text-4xl font-bold leading-none md:text-[56px] lg:text-6xl">
        About
      </h1>
      <div className="relative mb-24 h-[30vw] min-h-[280px]">
        <Image
          src={image as any}
          alt={altText}
          className="aspect-[25:16] mt-8 h-full w-full object-cover"
          width={0}
          height={0}
          
        />
      </div>
      <p className="mx-auto max-w-4xl px-4 text-center text-sm text-[#202125a3] lg:text-base lg:leading-6 dark:text-[#8d8d8d]">
        {description}
      </p>
    </section>
  );
};

export default Hero;
