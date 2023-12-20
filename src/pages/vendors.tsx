import { PageWrapper } from '@/components/Pagewrapper';
import { ActionButton } from '@/components/ActionButton';
import Image from 'next/image';
import { FaqComponent, VendorQA } from '@/components/Home/Faq';

const VendorsPage = () => {
  return (
    <PageWrapper defaultTitle="Nana For Vendors - Grow your Business with Nana">
      <div className="h-screen md:h-[40rem] w-full bg-black mt-- md:mt-28 rounded-none md:rounded-[20px] px-8 pt-24  md:p-16">
        <div>
          <h1 className="font-bold text-3xl md:text-6xl text-center text-white">
            Drive sales and boost your business
          </h1>
          <p className="text-lg md:text-2xl text-white text-center mt-4">
            We handle Marketing and customer acquisition, you handle making
            amazing dishes.
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center mt-10 justify-center space-y-4 md:space-y-0 space-x-0 md:space-x-4">
          <ActionButton style="bg-nana-blue" type="ios" />
          <ActionButton style="bg-nana-blue" type="android" />
        </div>
      </div>
      <div className="relative h-[500px]">
        <div className="absolute -mt-[12rem]">
          <div className="">
            <div className="marquee-content flex ">
              <div className="min-w-max mx-2 md:mx-6">
                <span className="relative block w-[420px] h-[700px] md:w-[495px] md:h-[700px]">
                  <Image
                    src="/menu-v-img.png"
                    alt="Nana Food Delivery Vendors App"
                    fill={true}
                    priority={true}
                  />
                </span>
              </div>
              <div className="min-w-max mx-2 md:mx-6">
                <span className="relative block w-[420px] h-[700px] md:w-[495px] md:h-[700px]">
                  <Image
                    src="/scheduled-v-img.png"
                    alt="Nana Food Delivery Vendors App"
                    priority={true}
                    fill={true}
                  />
                </span>
              </div>
              <div className="min-w-max mx-2 md:mx-6">
                <span className="relative block w-[420px] h-[700px] md:w-[495px] md:h-[700px]">
                  <Image
                    src="/orders-v-img.png"
                    alt="Nana Food Delivery Vendors App"
                    fill={true}
                    priority={true}
                  />
                </span>
              </div>
              <div className="min-w-max mx-2 md:mx-6">
                <span className="relative block w-[420px] h-[700px] md:w-[495px] md:h-[700px]">
                  <Image
                    src="/ratings-v-img.png"
                    alt="Nana Food Delivery Vendors App"
                    fill={true}
                    priority={true}
                  />
                </span>
              </div>
              <div className="min-w-max mx-2 md:mx-6">
                <span className="relative block w-[420px] h-[700px] md:w-[495px] md:h-[700px]">
                  <Image
                    src="/payments-v-img.png"
                    alt="Nana Food Delivery Vendors App"
                    fill={true}
                    priority={true}
                  />
                </span>
              </div>
              <div className="min-w-max mx-2 md:mx-6">
                <span className="relative block w-[420px] h-[700px] md:w-[495px] md:h-[700px]">
                  <Image
                    src="/menu-v-img.png"
                    alt="Nana Food Delivery Vendors App"
                    fill={true}
                    priority={true}
                  />
                </span>
              </div>
              <div className="min-w-max mx-2 md:mx-6">
                <span className="relative block w-[420px] h-[700px] md:w-[495px] md:h-[700px]">
                  <Image
                    src="/scheduled-v-img.png"
                    alt="Nana Food Delivery Vendors App"
                    priority={true}
                    fill={true}
                  />
                </span>
              </div>
              <div className="min-w-max mx-2 md:mx-6">
                <span className="relative block w-[420px] h-[700px] md:w-[495px] md:h-[700px]">
                  <Image
                    src="/orders-v-img.png"
                    alt="Nana Food Delivery Vendors App"
                    fill={true}
                    priority={true}
                  />
                </span>
              </div>
              <div className="min-w-max mx-2 md:mx-6">
                <span className="relative block w-[420px] h-[700px] md:w-[495px] md:h-[700px]">
                  <Image
                    src="/ratings-v-img.png"
                    alt="Nana Food Delivery Vendors App"
                    fill={true}
                    priority={true}
                  />
                </span>
              </div>
              <div className="min-w-max mx-2 md:mx-6">
                <span className="relative block w-[420px] h-[700px] md:w-[495px] md:h-[700px]">
                  <Image
                    src="/payments-v-img.png"
                    alt="Nana Food Delivery Vendors App"
                    fill={true}
                    priority={true}
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="my-24">
        <div className="flex justify-between items-center  flex-col md:flex-row rounded-[20px] bg-nana-stone px-5 md:px-10 py-10 md:py-28">
          <div className="flex flex-col">
            <h1 className="font-bold text-3xl md:text-6xl">Become a vendor!</h1>
            <p className="text-lg">
              Download the mobile app now and get started
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center mt-10 justify-center space-y-4 md:space-y-0 space-x-0 md:space-x-4">
            <ActionButton style="bg-black" type="ios" />
            <ActionButton style="bg-black" type="android" />
          </div>
        </div>
      </div>
      <FaqComponent qa={VendorQA} />
    </PageWrapper>
  );
};

export default VendorsPage;
