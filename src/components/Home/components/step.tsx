import Image from "next/image";
import { ActionButton } from "@/components/ActionButton";

export const StepOne = () => {
  return (
    <>
      <div className="hidden lg:block w-[1200px] relative h-[700px] bg-nana-stone p-[4rem] rounded-[20px]">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col h-full">
            <div>
              <h1 className="text-[70px] text-white">Download the app</h1>
            </div>
            <div className="flex mt-5 flex-col md:flex-row items-start md:items-center space-x-0 md:space-x-4">
              <ActionButton style="bg-black" type="ios" />
              <ActionButton style="bg-black" type="android" />
            </div>
            <div className="absolute left-2 bottom-2 rounded-full  w-20 h-20 flex o flex-row justify-center items-center bg-white text-nana-stone">
              <h1 className="font-bold text-5xl">1</h1>
            </div>
          </div>
          <div className="w-[250px] h-[500px]">
            <Image
              src="/slide-1.png"
              width="0"
              height="0"
              priority={true}
              className="object-contain w-[250px] h-[500px]"
              alt="Nana Food Delivery"
              sizes="100vw"
            />
          </div>
        </div>
      </div>
      <div className="block md:hidden w-full relative h-[500px] bg-nana-stone p-[1rem] rounded-[20px]">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between">
          <div className="flex flex-col">
            <div>
              <h1 className="text-5xl lg:text-[70px] text-white">
                Download the app
              </h1>
            </div>
            <div className="flex mt-5 flex-col  md:flex-row items-center space-y-4 lg:space-y-0 space-x-0 lg:space-x-4">
              <ActionButton style="bg-black" type="ios" />
              <ActionButton style="bg-black" type="android" />
            </div>
            <div className="absolute left-2 bottom-2 rounded-full w-10 h-10 lg:w-20 lg:h-20 flex flex-row justify-center items-center bg-white text-nana-stone">
              <h1 className="font-bold text-xl lg:text-5xl">1</h1>
            </div>
          </div>
          <div className="">
            <Image
              src="/slide-1.png"
              width="0"
              height="0"
              priority={true}
              className="object-contain w-full h-[200px]"
              alt="Nana Food Delivery"
              sizes="100vw"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export const StepTwo = () => {
  return (
    <>
      <div className="w-[1200px] hidden lg:block relative h-[700px] bg-nana-purple p-[4rem] rounded-[20px]">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col justify-center items-center w-1/2">
            <div>
              <h1 className="text-[70px] text-white text-center">
                Browse Vendors And Menus
              </h1>
            </div>
            <div className="flex mt-5 flex-col md:flex-row items-start md:items-center space-x-0 md:space-x-4">
              <ActionButton style="bg-black" type="ios" />
              <ActionButton style="bg-black" type="android" />
            </div>
            <div className="absolute left-2 bottom-2 rounded-full  w-20 h-20 flex o flex-row justify-center items-center bg-white text-nana-purple">
              <h1 className="font-bold text-5xl">2</h1>
            </div>
          </div>
          <div className="flex flex-row item-center w-1/2">
            <div className="absolute right-28  top-10 w-[250px] h-[500px]">
              <Image
                src="/slide-2-b.png"
                width="0"
                height="0"
                priority={true}
                className="object-contain w-[250px] h-[500px]"
                alt="Nana Food Delivery"
                sizes="100vw"
              />
            </div>
            <div className="absolute bottom-10 right-10 w-[250px] h-[500px]">
              <Image
                src="/slide-2-a.png"
                width="0"
                height="0"
                priority={true}
                className="object-contain w-[250px] h-[500px]"
                alt="Nana Food Delivery"
                sizes="100vw"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full block lg:hidden h-[500px] bg-nana-purple p-[1rem] rounded-[20px]">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between">
          <div className="flex flex-col">
            <div>
              <h1 className="text-4xl text-center text-white">
                Browse Vendors And Menus
              </h1>
            </div>
            <div className="flex mt-5 flex-col lg:flex-row items-center space-y-4 lg:space-y-0 space-x-0 lg:space-x-4">
              <ActionButton style="bg-black" type="ios" />
              <ActionButton style="bg-black" type="android" />
            </div>
            <div className="absolute left-2 bottom-2 rounded-full w-10 h-10 lg:w-20 lg:h-20 flex flex-row justify-center items-center bg-white text-nana-purple">
              <h1 className="font-bold text-xl lg:text-5xl">2</h1>
            </div>
          </div>
          <div className="">
            <Image
              src="/slide-2-b.png"
              width="0"
              height="0"
              priority={true}
              className="object-contain w-full h-[200px]"
              alt="Nana Food Delivery"
              sizes="100vw"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export const StepThree = () => {
  return (
    <>
      <div className="w-[1200px] hidden lg:block relative h-[700px] bg-nana-lime p-[4rem] rounded-[20px]">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col h-full">
            <div>
              <h1 className="text-[70px] text-white">
                Place Order And Make Payment
              </h1>
            </div>
            <div className="flex mt-5 flex-col md:flex-row items-start md:items-center space-x-0 md:space-x-4">
              <ActionButton style="bg-black" type="ios" />
              <ActionButton style="bg-black" type="android" />
            </div>
            <div className="absolute left-2 bottom-2 rounded-full w-10 h-10 lg:w-20 lg:h-20 flex flex-row justify-center items-center bg-white text-nana-lime">
              <h1 className="font-bold text-5xl">3</h1>
            </div>
          </div>
          <div className="w-[250px] h-[500px]">
            <Image
              src="/slide-3.png"
              width="0"
              height="0"
              priority={true}
              className="object-contain w-[250px] h-[500px]"
              alt="Nana Food Delivery"
              sizes="100vw"
            />
          </div>
        </div>
      </div>
      <div className="w-full block lg:hidden h-[500px] bg-nana-lime p-[1rem] rounded-[20px]">
        <div className="flex flex-col-reverse  items-center justify-between">
          <div className="flex flex-col">
            <div>
              <h1 className="text-4xl text-center text-white">
                Place Order And Make Payment
              </h1>
            </div>
            <div className="flex mt-5 flex-col lg:flex-row items-center space-y-4  space-x-0 md:space-x-4">
              <ActionButton style="bg-black" type="ios" />
              <ActionButton style="bg-black" type="android" />
            </div>
            <div className="absolute left-2 bottom-2 rounded-full w-10 h-10 flex flex-row justify-center items-center bg-white text-nana-lime">
              <h1 className="font-bold text-xl ">3</h1>
            </div>
          </div>
          <div className="">
            <Image
              src="/slide-3.png"
              width="0"
              height="0"
              priority={true}
              className="object-contain w-full h-[200px]"
              alt="Nana Food Delivery"
              sizes="100vw"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export const StepFour = () => {
  return (
    <>
      <div className="w-[1200px] hidden lg:block relative h-[700px] bg-nana-blue p-[4rem] rounded-[20px]">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col h-full">
            <div>
              <h1 className="text-[70px] text-white">Track Your Order Live!</h1>
            </div>
            <div className="flex mt-5 flex-col md:flex-row items-start md:items-center space-x-0 md:space-x-4">
              <ActionButton style="bg-black" type="ios" />
              <ActionButton style="bg-black" type="android" />
            </div>
            <div className="absolute left-2 bottom-2 rounded-full  w-20 h-20 flex o flex-row justify-center items-center bg-white text-nana-blue">
              <h1 className="font-bold text-5xl">4</h1>
            </div>
          </div>
          <div className="w-[250px] h-[500px]">
            <Image
              src="/slide-4.png"
              width="0"
              height="0"
              priority={true}
              className="object-contain w-[250px] h-[500px]"
              alt="Nana Food Delivery"
              sizes="100vw"
            />
          </div>
        </div>
      </div>
      <div className="w-full block lg:hidden h-[500px] bg-nana-blue p-[1rem] rounded-[20px]">
        <div className="flex flex-col-reverse items-center justify-between">
          <div className="flex flex-col h-full">
            <div>
              <h1 className="text-4xl text-center text-white">
                Track Your Order Live!
              </h1>
            </div>
            <div className="flex mt-5 flex-col items-center space-y-4 space-x-0 md:space-x-4">
              <ActionButton style="bg-black" type="ios" />
              <ActionButton style="bg-black" type="android" />
            </div>
            <div className="absolute left-2 bottom-2 rounded-full  w-10 h-10 flex o flex-row justify-center items-center bg-white text-nana-blue">
              <h1 className="font-bold text-xl">4</h1>
            </div>
          </div>
          <div className="">
            <Image
              src="/slide-4.png"
              width="0"
              height="0"
              priority={true}
              className="object-contain w-full h-[200px]"
              alt="Nana Food Delivery"
              sizes="100vw"
            />
          </div>
        </div>
      </div>
    </>
  );
};
