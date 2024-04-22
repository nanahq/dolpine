import clsx from 'clsx';
import Container from './Container';
import React from 'react';
import Image from 'next/image';
import TextImage from '@/assets/front-cells-mobile.jpg';
import TextImage2 from '@/assets/front-cells.png';
import TextImage3 from '@/assets/ios-discovery.jpg';
import { AppStoreButtons } from './AppStoreButtons';

const DownloadApp = () => {
  return (
    <div
      className={clsx(
        'flex flex-col w-full bg-gray-100 overflow-hidden',
        'h-auto md:h-[758px]',
        'mt-[100px] mb-[100px] pt-[56px] md:pt-0',
      )}
    >
      <div
        className={clsx(
          'relative items-center w-full h-full m-auto',
          'md:py-[30px]',
          'flex flex-col md:flex-row lg:max-w-[1200px]',
        )}
      >
        <div
          className={clsx(
            'absolute top-0 h-full w-full min-w-[1100px] overflow-hidden',
            'hidden md:flex',
            'right-[-50rem] lg:right-[-44rem] xl:right-[-32rem]',
          )}
        >
          <div className="absolute h-full w-auto z-1 origin-top-left rotate-[-29.5deg] scale-[.53] skew-x-[13.83deg] skew-y-0 translate-x-[-60px] translate-y-[14px] !important scroll-smooth">
            <Image
              src={TextImage3}
              alt="ok"
              width={0}
              height={0}
              className="z-[4]"
            />
          </div>
          <Image
            src={TextImage2}
            alt="ok"
            width={0}
            height={0}
            className="z-[5]"
          />
        </div>
        <div
          className={clsx(
            'flex flex-col z-20',
            'max-w-full md:max-w-[60%] lg:max-w-[45%]',
            'px-4 pt-4 pb-[21px] md:pl-16 xl:p-0',
          )}
        >
          <h2
            className={clsx(
              'font-bold  text-gray leading-normal mb-4 lg:mb-10',
              'text-2xl md:text-3xl lg:text-4xl dark:text-black',
            )}
          >
            Hubby, I can't cook today
          </h2>
          <p className="text-gray-500 leading-6 mb-10 text-sm lg:text-lg">
            Get the Nana app and choose from 400+ restaurants and hundreds of
            stores in the state. Discover and get what you want – our courier
            partners bring it to you.
          </p>
          <AppStoreButtons />
        </div>
        <div className="flex md:hidden">
          <Image src={TextImage} alt="ok" width={0} height={0} />
        </div>
      </div>
    </div>
  );
};
export default DownloadApp;
