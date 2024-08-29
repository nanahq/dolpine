import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import React from 'react';
interface ImageBannerProps {
  src: string | StaticImport;
  alt: string;
}
const ImageBanner = ({ src, alt }: ImageBannerProps) => {
  return (
    <div className="w-full px-4 h-[30vw] min-h-72 lg:h-[37.5rem] lg:max-w-[90rem] lg:px-12 mb-24 xl:max-w-[calc((var(90rem) + 18.75rem) * 0.3)]">
      <Image
        src={src}
        alt={alt}
        className="rounded-2xl mt-8 h-full w-full object-cover"
        width={0}
        height={0}
      />
    </div>
  );
};

export default ImageBanner;
