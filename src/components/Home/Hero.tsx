import { ActionButton } from '@/components/ActionButton';
import Image from 'next/image';

export const HomePageHero: React.FC<unknown> = () => {
  return (
    <>
      <section className="hidden md:block mt-32 bg-black flex flex-col items-center w-full mt-[3rem] h-[40rem] rounded-[20px]">
        <div className="container">
          <div className="flex flex-row items-center justify-center md:px-[6rem] lg:px-[10rem] pt-[4.3rem]">
            <h1 className="text-white md:text-[30px] lg:text-[50px] text-center">
              Order food from your favorite vendors and get it delivered in{' '}
              <span className="font-bold text-nana-blue">minutes!</span>
            </h1>
          </div>
          <div className="flex flex-col items-center w-full mt-5">
            <div className="flex flex-row items-center space-x-3">
              <ActionButton
                onPress={undefined}
                style="bg-nana-blue"
                type="ios"
              />
              <ActionButton
                onPress={undefined}
                style="bg-nana-blue"
                type="android"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center">
          <Image
            className="w-[1000px] object-contain overflow-hidden h-[400px]"
            width="0"
            height="0"
            priority={true}
            sizes="100vw"
            src="/hero-image.png"
            alt="Nana food delivery"
          />
        </div>
      </section>
      <section className="block  md:hidden bg-black w-full">
        <div className="container pt-[10rem]">
          <div className="flex flex-row items-center justify-center px-[1.5rem]">
            <h1 className="text-white text-3xl text-center">
              Order food from your favorite vendors and get it delivered in{' '}
              <span className="font-bold text-nana-blue">minutes!</span>
            </h1>
          </div>
          <div className="flex flex-col items-center w-full mt-10 md:mt-5">
            <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 space-x-0 md:space-x-3">
              <ActionButton
                onPress={undefined}
                style="bg-nana-blue"
                type="ios"
              />
              <ActionButton
                onPress={undefined}
                style="bg-nana-blue"
                type="android"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center">
          <Image
            className="w-full object-contain overflow-hidden "
            width="0"
            height="0"
            priority={true}
            sizes="100vw"
            src="/hero-image.png"
            alt="Nana food delivery"
          />
        </div>
      </section>
    </>
  );
};
