import React from 'react';
import Image from 'next/image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

interface CategoriesCardProps {
  title: string;
  description?: string;
  imageUrl: string | StaticImport;
}

export const CategoriesCard: React.FC<CategoriesCardProps> = ({
  title,
  description,
  imageUrl, 
}) => {
  return (
    <div className="flex flex-col shadow-lg md:min-w-[180px] lg:min-w-[220px] max-w-[220px]  max-h-[280px] min-w-[100px] min-h-[160px]  rounded-lg overflow-hidden dark:bg-gray-500 z-[3] transition duration-300 ease-in-out hover:lg:shadow-lg cursor-pointer hover:scale-[.98] [scroll-snap-align: start] ">
      <div className="w-full h-full">
        <Image
          src={imageUrl}
          alt={title}
          width={0}
          height={0}
          loading="lazy"
          className="object-cover size-full"
        />
      </div>
      <div className="flex flex-col px-3 py-2  md:p-4 items-start">
        <h3 className="text-sm lg:text-base font-bold truncate md:pb-1">
          {title}
        </h3>
        {description && (
          <p className="text-gray-500 text-xs truncate md:py-1">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

interface CategoriesSectionProps {
  categories: {
    title: string;
    description?: string;
    imageUrl: string;
  }[];
}

const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  categories,
}) => {
  return (
    <section className="flex flex-col items-start justify-start gap-4 lg:gap-6 md:flex-row lg:justify-center md:items-center px-4 md:px-12 mb-[7.5rem] lg:mb-[10rem]">
      {categories.map((card, index) => (
        <CategoriesCard
          key={index}
          title={card.title}
          description={card.description}
          imageUrl={card.imageUrl}
        />
      ))}
    </section>
  );
};
