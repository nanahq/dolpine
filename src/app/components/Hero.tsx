import clsx from 'clsx';
import React from 'react';
import '../../app/globals.css';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import {ChevronRight, Search} from "lucide-react";
import { AppStoreButtons } from './AppStoreButtons';


interface Props {
  color?: string;
  image?: string | StaticImport;
}

const HeroBanner: React.FC<Props> = ({ color }) => {
  return (
    <section
      className={clsx(
        'flex items-center mt-10 lg:mt-0 justify-center overflow-hidden bg-nana-blue',
        'h-[560px] lg:h-[45rem] w-full',
        'lg:max-w-[90rem] lg:px-12 mb-[7.5rem] lg:mb-[10rem] mx-auto min-w-full text-auto relative',
        color,
      )}
    >
      <div className="relative flex justify-center items-center w-full h-full">
        <div className="relative flex flex-col items-center justify-center h-full w-full max-w-4xl px-4 z-0">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
              <span className="block">Get anything</span>
              <span className="block text-primary">delivered to your door</span>
            </h1>
            <p className="mt-3 text-base text-white sm:mt-5 sm:text-lg sm:max-w-xl mx-auto md:mt-5 md:text-xl">
              Order from your favorite local restaurants or groceries. Not just that, you can send or receive a package.
            </p>
          </div>
          <div className="mt-8 w-full max-w-lg mx-auto">
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400"/>
              </div>
              <input
                type="text"
                className="focus:ring-primary focus:border-primary block w-full pl-10 pr-32 py-3 sm:text-sm border-gray-300 rounded-md"
                placeholder="Enter your delivery address"
              />
              <div className="absolute inset-y-0 right-0 flex items-center">
                <button className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-primary/90 flex items-center">
                  Find Food
                  <ChevronRight className="ml-2 w-4 h-4"/>
                </button>
              </div>
            </div>
          </div>
          <AppStoreButtons className="!flex-row mt-10 items-baseline" />
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;