import React from 'react';
import Image from 'next/image';
import { StaticImageData } from 'next/image';
import LogoBlue from '@/assets/logo-blue.png';
import Link from "next/link";


interface FoodCardProps {
  friendlyUrl: string;
  imageUrl: StaticImageData | string;
  chefName: string;
  deliveryTime: string;
  rating: number | string;
}

const FoodCard: React.FC<FoodCardProps> = ({
  imageUrl,
  chefName,
  deliveryTime,
  rating,
  friendlyUrl
}) => {
  return (
      <Link href={`/marketplace/${friendlyUrl}`}>
        <div className="shadow-lg min-w-[150px] md:min-w-[290px] sm:max-h-[450px] md:max-h-[330px] max-h-[270px] lg:max-h-[340px] md:max-w-[480px] lg:min-w-[310px] lg:max-w-[500px] rounded-xl overflow-hidden flex flex-col gap-4 relative z-0 transition duration-200 ease-in-out hover:lg:shadow-lg cursor-pointer hover:scale-[1.02]">
          <div className="w-full max-h-[150px] sm:max-h-[320px] md:max-h-[180px]">
            <Image
                src={imageUrl}
                loading="lazy"
                sizes="(min-width: 1023px) 33vw, (min-width: 640px) 50vw, 100vw"
                alt={`Nana food delivery ${chefName}`}
                width={0}
                height={0}
                className="size-full object-cover"
            />
          </div>
          <div className="w-full h-full">
            <div className="mb-4 px-4 flex justify-between gap-2">
              <div className="space-y-1 truncate">
                <h5 className="text-lg lg:text-base">{chefName}</h5>
                {/*<p className="text-gray-500 text-sm truncate block overflow-hidden">*/}
                {/*  {description}*/}
                {/*</p>*/}
              </div>
              <div className="flex-col text-sm bg-nana-blue/10  rounded-lg px-2 py-1 min-h-10 min-w-14 justify-center items-center text-nana-blue flex">
                <div>{deliveryTime}</div>
                <div>min</div>
              </div>
            </div>
            <div className="border-dashed border-t-2 px-4 py-4">
              <div className="flex items-center">
            <span className="flex gap-1 items-center justify-center text-xs">
              <Image
                  src={LogoBlue}
                  alt="Nana delivery logo"
                  width={30}
                  height={10}
                  className="aspect-3/1"
              />
            </span>
                <span className="text-xs before:content-['·'] before:relative before:inline-block before:my-0 before:mx-1 flex gap-1 items-center">
              <span>
                ₦<span className="text-gray-500 ">₦₦₦</span>
              </span>
            </span>
                <span className="text-xs before:content-['·'] before:relative before:inline-block before:my-0 before:mx-1 flex gap-1 items-baseline">
              <svg
                  width="12px"
                  height="12px"
                  viewBox="0 -2.5 160 160"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
              >
                <path
                    d="M77.641 109.484C72.9009 109.484 65.9845 107.282 59.4934 103.692C55.9045 101.703 52.8079 99.087 50.9573 95.2983C50.3885 94.3292 50.0498 93.2424 49.9673 92.1217C49.9971 91.0383 50.0351 90.0267 51.0894 89.5737C51.6234 89.3877 52.1991 89.3564 52.7502 89.4832C53.3013 89.6101 53.8053 89.89 54.2042 90.2908C55.4807 91.5232 56.1747 93.4206 57.5453 94.4817C66.8574 101.695 77.1602 104.852 88.8085 101.248C94.2358 99.5683 98.0015 95.7554 100.849 90.9551C101.535 89.7978 102.028 88.3284 103.041 87.614C104.176 86.8143 106.105 86.0328 107.127 86.492C108.149 86.9511 108.975 88.9466 108.99 90.2786C109.005 91.7256 108.188 93.3061 107.389 94.619C101.248 104.714 92.1908 109.602 77.641 109.484Z"
                    fill="#000000"
                />
                <path
                    d="M48.7689 46.7527C56.5141 46.5808 61.2223 49.154 65.1558 53.3597C65.8554 54.0913 66.4025 54.9547 66.7654 55.8997C67.6822 58.4559 65.8553 60.6607 63.2585 59.8447C61.3835 59.1397 59.6673 58.0693 58.2096 56.6954C54.6627 53.6259 50.8044 52.8098 46.2844 54.0463C39.6382 55.8644 34.3666 59.2137 31.658 65.8659C31.0412 67.38 30.0464 68.7838 28.0956 68.1371C26.0134 67.4471 25.7736 65.4705 26.4596 63.9388C27.8179 60.9072 29.2135 57.709 31.3655 55.253C36.3662 49.5493 43.2061 47.3906 48.7689 46.7527Z"
                    fill="#000000"
                />
                <path
                    d="M128.999 55.286C128.647 55.7519 128.071 57.2802 127.103 57.5931C126.476 57.7121 125.831 57.6926 125.212 57.5359C124.594 57.3791 124.017 57.089 123.523 56.6858C122.394 55.6958 121.753 54.1234 120.986 52.7542C120.513 51.7836 119.747 50.9866 118.796 50.4761C117.844 49.9656 116.756 49.7676 115.686 49.9102C109.777 50.4194 104.475 52.115 100.66 57.1178C100.081 57.8775 98.0438 57.8937 97.6625 57.5449C96.8499 56.8001 96.0956 55.8521 96.382 54.9129C96.9428 53.2144 97.9063 51.677 99.1901 50.4316C104.299 45.4302 110.651 43.4299 117.672 43.6236C122.98 43.7671 128.8 49.51 128.999 55.286Z"
                    fill="#000000"
                />
                <path
                    d="M44.2051 75.5854C45.3123 76.1089 46.525 77.6676 46.5751 78.8113C46.5179 79.5021 46.3007 80.1701 45.9409 80.7626C45.581 81.355 45.0884 81.8556 44.5017 82.2248C40.3135 84.37 35.7929 85.2273 31.1368 83.9441C29.4047 83.4701 27.7274 82.5953 27.5967 80.3804C27.4701 78.2352 28.8027 76.9533 30.5375 76.3114C33.0281 75.3904 42.4391 74.7505 44.2051 75.5854Z"
                    fill="#000000"
                />
                <path
                    d="M120.918 78.5489C117.829 77.3348 117.058 74.0643 119.461 71.8148C120.841 70.5528 122.524 69.6701 124.347 69.253C126.265 68.8379 128.375 69.0864 130.374 69.3099C132.321 69.5279 134.129 70.2457 134.66 72.4776C134.962 73.4622 134.91 74.5213 134.513 75.4717C134.116 76.422 133.4 77.2037 132.488 77.6815C130.481 78.7595 122.457 79.1543 120.918 78.5489Z"
                    fill="#000000"
                />
                <path
                    d="M3.27272 55.9748C-3.73711 83.5259 2.40121 107.831 21.5299 128.223C22.0283 128.75 22.5355 129.277 23.0434 129.785C33.3184 140.06 46.1171 146.404 56.2588 150.819C60.6115 152.719 82.9451 155.028 88.988 154.128C124.899 148.765 148.531 128.511 156.762 94.625C158.333 87.9873 159.116 81.1873 159.094 74.3661C159.132 58.2974 152.366 39.6163 138.414 25.6251C136.977 24.4373 135.546 23.2069 134.162 22.0145C131.16 19.4339 128.057 16.762 124.81 14.4834C100.013 -2.97008 74.2479 -3.06774 48.2339 6.1875C24.6807 14.5618 9.55529 31.3158 3.27272 55.9748ZM48.3341 14.4373C71.1594 4.95246 94.0612 3.27855 116.398 17.4844C120.482 20.0847 131.371 28.8849 133.085 30.2067L133.195 30.2879L133.286 30.3889C142 39.6299 151.978 56.5268 151.758 73.8963C151.686 81.3232 150.68 88.7115 148.766 95.8878C143.092 116.511 129.527 131.541 107.295 141.821C84.6956 152.642 52.2846 141.702 43.6611 136.01C34.1295 129.493 25.7895 121.386 19.0056 112.043C8.36622 96.9802 5.97929 75.3276 11.6958 55.5339C14.3715 46.3948 19.0474 37.9656 25.3844 30.8574C31.7214 23.7493 39.5608 18.1403 48.3341 14.4373Z"
                    fill="#000000"
                />
              </svg>
              <span className="text-gray-500 ">{rating}</span>
            </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
  );
};

export default FoodCard;
