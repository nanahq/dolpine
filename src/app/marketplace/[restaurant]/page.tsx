import { OrderPreviewCard } from '@/app/components/marketplace/OrderPreviewCard';
import TestImage from '@/assets/site-hero.jpg';
import Image from 'next/image';
import VendorImage from '@/assets/cola.png';
import React from 'react';

const Restaurant = () => {
  return (
    <main className="mt-8">
      {/* Vendor/Restaurant Banner */}
      <header className="relative min-h-[320px] max-h-[620px]">
        <div className="absolute inset-0 z-0 min-h-[320px] max-h-[620px] top-0 right-0 left-0">
          <Image
            src={VendorImage}
            alt="testing"
            width={0}
            height={0}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 z-[0] bg-gradient-to-b from-black/50 to-black/10 "></div>
        <div className="p-4 md:p-8 absolute inset-0 flex flex-col justify-end items-start text-white">
          <h1 className="text-[1.625rem] md:text-[1.75rem] lg:text-[2.5rem] xl:text-[2.875rem] font-bold max-w-[50rem] text-center">
            Ussie Burgers
          </h1>
          <p className="sm:text-xs text-sm md:text-base lg:text-lg max-w-[50rem] text-center leading-normal">
            I'm loving it. Lorem ipsum.
          </p>
          <div className="flex justify-between w-full mt-4">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="bg-white rounded-[0.5rem] px-[0.5rem] py-[0.25rem] text-[10px] md:text-sm font-medium text-gray-800 inline-flex">
                <span>Delivery: N0.00</span>
              </div>
              <div className="bg-white rounded-[0.5rem] px-[0.5rem] py-[0.25rem] text-[10px] md:text-sm font-medium text-gray-800 inline-flex">
                <span>Min. Order: N350.00</span>
              </div>
              <div className="bg-white rounded-[0.5rem] px-[0.5rem] py-[0.25rem] text-[10px] md:text-sm font-medium text-gray-800 inline-flex">
                <span>Delivery in 15-20 min</span>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* Vendor Rating */}
      <div className="flex gap-4 flex-wrap justify-between w-full p-4 md:py-6 md:px-[30px] border-b-2">
        <div className="flex gap-y-4 gap-x-6 flex-wrap">
          <div className="flex gap-2 items-center">
            <span>
              <svg
                viewBox="0 0 16 16"
                color="primary"
                width="16"
                aria-hidden="true"
                className="fill-black"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8C15.9949 3.58385 12.4161 0.00514317 8 0ZM8 14.6667C4.3181 14.6667 1.33333 11.6819 1.33333 8C1.33333 4.3181 4.3181 1.33333 8 1.33333C11.6819 1.33333 14.6667 4.3181 14.6667 8C14.6626 11.6802 11.6802 14.6626 8 14.6667ZM11.4227 10.54L8.33333 7.70733V4.33333C8.33333 3.96514 8.03486 3.66667 7.66667 3.66667C7.29848 3.66667 7 3.96514 7 4.33333V8C6.99979 8.18704 7.07817 8.36556 7.216 8.492L10.522 11.522C10.7947 11.7672 11.2135 11.7492 11.464 11.4813C11.7123 11.2099 11.6938 10.7886 11.4227 10.54Z"
                ></path>
              </svg>
            </span>
            <p className="text-xs md:text-sm">Open all day</p>
          </div>
          <div className="flex gap-2 items-center">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <clipPath id="__lottie_element_118">
                    <rect width="24" height="24" x="0" y="0"></rect>
                  </clipPath>
                </defs>
                <g clip-path="url(#__lottie_element_118)">
                  <g
                    transform="matrix(1,0,0,1,12,12)"
                    opacity="1"
                    style={{ display: 'block' }}
                  >
                    <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                      <path
                        fill="rgb(253,168,12)"
                        fill-opacity="1"
                        d=" M0,-12 C-6.630000114440918,-12 -12,-6.630000114440918 -12,0 C-12,6.630000114440918 -6.630000114440918,12 0,12 C6.630000114440918,12 12,6.630000114440918 12,0 C11.989999771118164,-6.619999885559082 6.619999885559082,-11.989999771118164 0,-12z"
                      ></path>
                    </g>
                    <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                      <path
                        fill="rgb(253,168,12)"
                        fill-opacity="1"
                        d=" M-23.5,-8.050000190734863"
                      ></path>
                      <path
                        stroke-linecap="butt"
                        stroke-linejoin="miter"
                        fill-opacity="0"
                        stroke-miterlimit="4"
                        stroke="rgb(32,33,37)"
                        stroke-opacity="1"
                        stroke-width="2"
                        d=" M-23.5,-8.050000190734863"
                      ></path>
                    </g>
                    <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                      <path
                        fill="rgb(253,168,12)"
                        fill-opacity="1"
                        d=" M-20.399999618530273,-7.400000095367432"
                      ></path>
                      <path
                        stroke-linecap="butt"
                        stroke-linejoin="miter"
                        fill-opacity="0"
                        stroke-miterlimit="4"
                        stroke="rgb(32,33,37)"
                        stroke-opacity="1"
                        stroke-width="2"
                        d=" M-20.399999618530273,-7.400000095367432"
                      ></path>
                    </g>
                  </g>
                  <g
                    transform="matrix(1,0,0,1,11.800000190734863,-25.299999237060547)"
                    opacity="1"
                    style={{ display: 'block' }}
                  >
                    <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="miter"
                        fill-opacity="0"
                        stroke-miterlimit="4"
                        stroke="rgb(32,33,37)"
                        stroke-opacity="1"
                        stroke-width="1.9"
                        d=" M-3.819999933242798,40.33000183105469 C-3.819999933242798,40.33000183105469 -2.7699999809265137,42.849998474121094 0.23999999463558197,42.84000015258789 C2.9600000381469727,42.83000183105469 4.300000190734863,40.279998779296875 4.300000190734863,40.279998779296875"
                      ></path>
                    </g>
                  </g>
                  <g
                    transform="matrix(1.2999999523162842,0,0,1.2999999523162842,8.815000534057617,11.78700065612793)"
                    opacity="1"
                    style={{ display: 'block' }}
                  >
                    <g opacity="1" transform="matrix(1,0,0,1,-46.5,-35.5)">
                      <path
                        fill="rgb(32,33,37)"
                        fill-opacity="1"
                        d=" M45.849998474121094,31.809999465942383 C45.04999923706055,31.809999465942383 44.400001525878906,32.45000076293945 44.400001525878906,33.25 C44.400001525878906,34.04999923706055 45.04999923706055,34.70000076293945 45.849998474121094,34.70000076293945 C46.650001525878906,34.70000076293945 47.290000915527344,34.04999923706055 47.290000915527344,33.25 C47.290000915527344,32.45000076293945 46.650001525878906,31.809999465942383 45.849998474121094,31.809999465942383z"
                      ></path>
                      <path
                        stroke-linecap="butt"
                        stroke-linejoin="round"
                        fill-opacity="0"
                        stroke="rgb(32,33,37)"
                        stroke-opacity="1"
                        stroke-width="0"
                        d=" M45.849998474121094,31.809999465942383 C45.04999923706055,31.809999465942383 44.400001525878906,32.45000076293945 44.400001525878906,33.25 C44.400001525878906,34.04999923706055 45.04999923706055,34.70000076293945 45.849998474121094,34.70000076293945 C46.650001525878906,34.70000076293945 47.290000915527344,34.04999923706055 47.290000915527344,33.25 C47.290000915527344,32.45000076293945 46.650001525878906,31.809999465942383 45.849998474121094,31.809999465942383z"
                      ></path>
                    </g>
                  </g>
                  <g
                    transform="matrix(1.2999999523162842,0,0,1.2999999523162842,16.815000534057617,11.78700065612793)"
                    opacity="1"
                    style={{ display: 'block' }}
                  >
                    <g opacity="1" transform="matrix(1,0,0,1,-46.5,-35.5)">
                      <path
                        fill="rgb(32,33,37)"
                        fill-opacity="1"
                        d=" M45.849998474121094,31.809999465942383 C45.04999923706055,31.809999465942383 44.400001525878906,32.45000076293945 44.400001525878906,33.25 C44.400001525878906,34.04999923706055 45.04999923706055,34.70000076293945 45.849998474121094,34.70000076293945 C46.650001525878906,34.70000076293945 47.290000915527344,34.04999923706055 47.290000915527344,33.25 C47.290000915527344,32.45000076293945 46.650001525878906,31.809999465942383 45.849998474121094,31.809999465942383z"
                      ></path>
                      <path
                        stroke-linecap="butt"
                        stroke-linejoin="round"
                        fill-opacity="0"
                        stroke="rgb(32,33,37)"
                        stroke-opacity="1"
                        stroke-width="0"
                        d=" M45.849998474121094,31.809999465942383 C45.04999923706055,31.809999465942383 44.400001525878906,32.45000076293945 44.400001525878906,33.25 C44.400001525878906,34.04999923706055 45.04999923706055,34.70000076293945 45.849998474121094,34.70000076293945 C46.650001525878906,34.70000076293945 47.290000915527344,34.04999923706055 47.290000915527344,33.25 C47.290000915527344,32.45000076293945 46.650001525878906,31.809999465942383 45.849998474121094,31.809999465942383z"
                      ></path>
                    </g>
                  </g>
                </g>
              </svg>
            </span>
            <p className="text-xs md:text-sm">9.2</p>
          </div>
          <button className="text-nana-blue flex gap-2 items-center">
            <span>
              <svg viewBox="0 0 24 24" className="w-[14px] fill-nana-blue">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12C23.993 5.376 18.624.007 12 0zm.25 5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm2.25 13.5h-4a1 1 0 010-2h.75a.25.25 0 00.25-.25v-4.5a.25.25 0 00-.25-.25h-.75a1 1 0 010-2h1a2 2 0 012 2v4.75c0 .138.112.25.25.25h.75a1 1 0 010 2z"></path>
              </svg>
            </span>
            see more information
          </button>
        </div>
      </div>
      {/*Label Edition */}
      <div className="flex items-center justify-between gap-4 p-4 md:p-8 uppercase">
        <div className="flex justify-between text-sm lg:text-base overflow-hidden">
          <div className="flex items-center gap-2 md:gap-4 grow overflow-hidden sm:opacity-0 md:opacity-100">
            <div className="ease-in-out opacity-100 pointer-events-auto  antialiased  font-sans  leading-5 font-normal tracking-normal bg-nana-blue/5 text-nana-blue h-9 outline-none py-2 px-3 inline-flex items-center justify-center text-center rounded-full cursor-pointer whitespace-nowrap transition duration-100 linear">
              Limited Edition
            </div>
            <div>Combo Meal</div>
            <div>Suya Da Gishiri</div>
            <div>Suya Da Gishiri</div>
            <div>Suya Da Gishiri</div>
          </div>
        </div>
      </div>
      {/* Sample Category */}
      <div className="p-4 md:p-8">
        <h3 className="text-xl font-bold py-4">Limited Edition</h3>
        <div className=" max-w-[100rem]  mx-auto grid md:grid-cols-2 lg:grid-cols-3 grid-cols-[repeat(3, minmax(0px, 1fr))] gap-4">
          <OrderPreviewCard
            description=" Lorem ipsum, dolor sit amet consectetur adipisicing elit."
            imageUrl={TestImage}
            price="4000"
            title="Beast Shawarma"
          />
          <OrderPreviewCard
            description=" Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam, aliquam rerum nesciunt dolores mollitia vero totam temporibus doloribus ipsam quo!"
            imageUrl={TestImage}
            price="4000"
            title="Beast Shawarma"
          />
        </div>
      </div>
      {/* Sample Category */}
      <div className="p-4 md:p-8">
        <h3 className="text-xl font-bold py-4">Combo Jollof</h3>
        <div className=" max-w-[90rem]  mx-auto grid md:grid-cols-2 lg:grid-cols-3 grid-cols-[repeat(3, minmax(0px, 1fr))] gap-4">
          <OrderPreviewCard
            description=" Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam, aliquam rerum nesciunt dolores mollitia vero totam temporibus doloribus ipsam quo!"
            imageUrl={TestImage}
            price="1200"
            title="Awero Kitchen"
          />
          <OrderPreviewCard
            description=" Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam, aliquam rerum nesciunt dolores mollitia vero totam temporibus doloribus ipsam quo!"
            imageUrl={TestImage}
            price="3800"
            title="Awero Kitchen"
          />
          <OrderPreviewCard
            description=" Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam, aliquam rerum nesciunt dolores mollitia vero totam temporibus doloribus ipsam quo!"
            imageUrl={TestImage}
            price="5800"
            title="Awero Kitchen"
          />
          <OrderPreviewCard
            description=" Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam, aliquam rerum nesciunt dolores mollitia vero totam temporibus doloribus ipsam quo!"
            imageUrl={TestImage}
            price="2300"
            title="Awero Kitchen"
          />
          <OrderPreviewCard
            description=" Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam, aliquam rerum nesciunt dolores mollitia vero totam temporibus doloribus ipsam quo!"
            imageUrl={TestImage}
            price="400"
            title="Masa"
          />
          <OrderPreviewCard
            description=" Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam, aliquam rerum nesciunt dolores mollitia vero totam temporibus doloribus ipsam quo!"
            imageUrl={TestImage}
            price="400"
            title="Usee Shawarma"
          />
        </div>
      </div>
    </main>
  );
};

export default Restaurant;
