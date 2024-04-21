import clsx from 'clsx';
import React, { useState, useEffect } from 'react';
import Input from '@/app/components/input';
import FilledLocationIcon from '@/assets/filled-location.svg';
import LocationIcon from '@/assets/location.svg';
import { CSSTransition } from 'react-transition-group';
import Image from 'next/image';
import TextImage from '@/assets/test-card-image.jpg'; // Update with your image path
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

export const TextAnimation: React.FC = () => {
  const texts = [
    'Discover and get great food.',
    'You deserve this.',
    'Time for something new?',
    'Craving suya?',
  ];
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(true);
  const [letters, setLetters] = useState<string[]>([]);


  useEffect(() => {
    if (texts[index]) {
      const words = texts[index].split(' ');
      const newLetters = words.reduce((acc: string[], word: string) => {
        const letters = word.split('');
        acc.push(...letters);
        acc.push(' '); // Add space between words
        return acc;
      }, []);
      setLetters(newLetters);
    }
  }, [index, texts]);
  return (
    <div>
      <CSSTransition in={show} timeout={500} classNames="fade" unmountOnExit>
        <div className="fade text-3xl lg:text-6xl font-bold">
          {letters.map((letter, index) => (
            <span key={index} style={{ transitionDelay: `${index * 0.01}s` }}>
              {letter}
            </span>
          ))}
        </div>
      </CSSTransition>
    </div>
  );
};

interface Props {
  color?: string;
  image?: string | StaticImport;
}

const HomeBanner = ({ color, image }: Props) => {
  const [val, setVal] = useState('');

  return (
    <section
      className={clsx(
        'flex justify-center items-end overflow-hidden',
        'h-[560px] lg:h-[40rem] w-full',
        'flex flex-col justify-center items-center w-full lg:max-w-[90rem] px-4 lg:px-12 mb-[7.5rem] lg:mb-[10rem] mx-auto min-w-full text-white relative',
        color,
      )}
    >
      <div className="relative flex justify-start items-end max-w-[75rem] w-full h-full">
        <Image
          src={image}
          loading="lazy"
          alt="banner-image"
          className="absolute top-0 left-0 w-full h-full object-cover object-left-top min-w-[62.5rem] start-0 end-[25rem]  lg:object-center lg:start-[25rem] xl:end-[-25%]"
          layout="fill"
        />
        <div
          className={clsx(
            'relative flex flex-col justify-center h-full w-full z-0',
            'px-4 md:px-[30px]',
            'max-w-[465px] lg:max-w-[33.375rem] z-[2]',
          )}
        >
          <div className="flex h-[16.75rem] mb-5 items-end">
            <TextAnimation />
          </div>

          <div className="relative flex flex-col">
            <Input
              label="Choose a delivery address"
              type="text"
              value={val}
              onChange={(e: any) => setVal(e.target.value)}
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

export default HomeBanner;
