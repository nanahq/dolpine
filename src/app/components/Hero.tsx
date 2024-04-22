import clsx from 'clsx';
import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import Image from 'next/image';
import Input from '@/app/components/FormInput';
import FilledLocationIcon from '@/assets/filled-location.svg';
import LocationIcon from '@/assets/location.svg';
import '../../app/globals.css';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

const TextAnimation: React.FC = () => {
  const texts = [
    'Discover and get great food.',
    'You deserve this.',
    'Time for something new?',
    'Craving suya?',
  ];
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShow(false);
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % texts.length);
        setShow(true);
      }, 800);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <CSSTransition in={show} timeout={500} classNames="fade" unmountOnExit>
        <div className="fade text-4xl md:text-[56px] lg:text-6xl font-bold leading-none">
          {texts[index]}
        </div>
      </CSSTransition>
    </div>
  );
};

interface Props {
  color?: string;
  image?: string | StaticImport;
}

const HeroBanner: React.FC<Props> = ({ color, image }) => {
  const [val, setVal] = useState('');

  return (
    <section
      className={clsx(
        'flex justify-center items-end overflow-hidden',
        'h-[560px] lg:h-[40rem] w-full',
        'flex flex-col justify-center items-center w-full lg:max-w-[90rem] lg:px-12 mb-[7.5rem] lg:mb-[10rem] mx-auto min-w-full text-white relative',
        color,
      )}
    >
      <div className="relative flex justify-start items-end max-w-[75rem] w-full h-full">
        <Image
          src={image}
          loading="lazy"
          alt="banner-image"
          className="absolute top-0 left-0 w-full h-full object-cover object-left-top min-w-[62.5rem] start-0 end-[25rem] lg:object-center lg:start-[25rem] xl:end-[-25%]"
          layout="fill"
        />
        <div
          className={clsx(
            'relative flex flex-col justify-center h-full w-full z-0',
            'px-4 md:px-[30px]',
            'max-w-[465px] lg:max-w-[33.375rem] z-[2]',
          )}
        >
          <div className="flex h-[16.75rem] mb-5 items-end lg:text-black">
            <TextAnimation />
          </div>
          <div className="relative flex flex-col">
            <Input
              label="Choose a delivery address"
              type="text"
              value={val}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setVal(e.target.value)
              }
              start={{
                before: (
                  <Image
                    src={LocationIcon}
                    width={0}
                    height={0}
                    alt="icon"
                    className="size-5"
                  />
                ),
                after: (
                  <Image
                    src={FilledLocationIcon}
                    width={0}
                    height={0}
                    alt="icon"
                    className="size-5"
                  />
                ),
              }}
            />
          </div>
        </div>
        <div className="absolute top-0 left-0 [z-1] w-full h-full bg-black bg-opacity-50 lg:hidden"></div>
      </div>
    </section>
  );
};

export default HeroBanner;