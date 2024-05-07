import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import React from 'react';

interface OrderPreviewCardProps {
  title: string;
  description: string;
  price: string; 
  imageUrl: string | StaticImport;
}

export const OrderPreviewCard: React.FC<OrderPreviewCardProps> = ({
  title,
  description,
  price,
  imageUrl,
}) => {
  return (
    <div className="relative z-0 lg:min-h-[140px] min-w-[320px]  max-w-[480px] my-2 scale-100 duration-300 ease-in-out md:rounded-lg md:hover:scale-[1.03] sm:overflow-x-auto shadow-lg">
      <button className=" min-[8.75rem] before:md:opacity-1 relative flex h-full w-full cursor-pointer items-stretch justify-between p-3 text-base before:pointer-events-none before:absolute before:inset-0 before:rounded-lg before:transition-opacity before:duration-150 before:ease-in-out before:content-[''] after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:transition-opacity after:duration-150 after:ease-in-out after:content-[''] md:rounded-lg before:md:opacity-100 before:md:shadow-lg md:after:opacity-0 md:after:shadow-lg">
        <div className="flex w-full flex-col justify-between gap-4 overflow-hidden px-[0.75rem]">
          <div className="flex flex-1 flex-col gap-2 text-left ">
            <h4 className="overflow-hidden whitespace-nowrap font-sans lg:text-xl mb-2 leading-5 text-gray-800 font-bold truncate">
              {title}
            </h4>
            <p className="line-clamp-3 font-sans text-sm font-normal leading-5 text-gray-400">
              {description}
            </p>
          </div>
          <div className="gap-y-0.25 flex flex-wrap items-center gap-x-0.5">
            <div className="gap-y-0.25 flex w-auto max-w-full flex-wrap items-center gap-x-0.5">
              <p className="flex max-w-full items-center gap-x-0.5 whitespace-nowrap">
                <span className="font-sans text-sm font-normal leading-tight text-nana-blue antialiased">
                  ₦{price}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="m-0 p-0 flex flex-col items-center justify-center">
          <div className="max-h-[7.25rem]">
            <span className="relative z-10 block h-28 w-44 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 [border-start-end:0.625rem]">
              <Image
                loading="lazy"
                src={imageUrl}
                alt={title}
                width={0}
                height={0}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </span>
          </div>
        </div>
      </button>
    </div>
  );
};

interface OrderPreviewSectionProps {
  orderPreview: {
    title: string;
    description: string;
    price: string;
    imageUrl: string | StaticImport;
  }[];
}

const OrderPreviewSection: React.FC<OrderPreviewSectionProps> = ({
  orderPreview,
}) => {
  return (
    <section className="flex flex-col items-start justify-start gap-4 lg:gap-6 md:flex-row lg:justify-center md:items-center px-4 md:px-12 mb-[7.5rem] lg:mb-[10rem]">
      {orderPreview.map((card, index) => (
        <OrderPreviewCard
          key={index}
          imageUrl={card.imageUrl}
          title={card.title}
          price={card.price}
          description={card.description}
        />
      ))}
    </section>
  );
};
