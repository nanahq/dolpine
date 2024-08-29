import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import React from 'react';

interface AboutCardProps {
  title?: string;
  image: string | StaticImport;
  description: string | any;
}

const AboutCard: React.FC<AboutCardProps> = ({
  title,
  image,
  description,
}) => {
  return (
    <div className="flex flex-col items-center justify-center mb-24 px-4 max-w-[90rem]">
      <h2 className="mx-auto my-12 max-w-4xl text-center text-3xl font-bold lg:text-5xl">
        {title}
      </h2>
      <div className="flex flex-col lg:items-center items-center gap-12 md:gap-10 lg:gap-12 md:items-start md:flex-row-reverse">
        <div className="w-full h-full flex-1 flex items-center lg:max-w-[630px] lg:h-[730px]">
          <Image
            src={image as any}
            alt={title || "Image"}
            className="rounded-3xl h-[400px] w-[400px]  object-cover object-center"
            width={400}
            height={400}
          />
        </div>
        <div className="flex-1 lg:max-w-[540px] md:py-4 md:pl-6 pr-0">
          <p className="max-w-4xl text-sm text-[#202125a3] leading-[22px] lg:text-lg  dark:text-[#8d8d8d]">
            {description as any}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutCard;
