import Image from 'next/image';
import React from 'react';
import TestImage from '@/assets/delivery_guy.jpg';

export const CaroBanner = () => {
  return (
    <div className="h-52 w-full lg:max-w-56 rounded-lg">
      <Image
        src={TestImage}
        width={0}
        height={0}
        alt=""
        className="object-cover w-full h-full rounded-lg"
      />
    </div>
  );
};
