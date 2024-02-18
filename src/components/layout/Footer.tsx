import Image from 'next/image';
import { ActionButton } from '@/components/ActionButton';
import React from 'react';
import Link from 'next/link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare } from '@fortawesome/free-solid-svg-icons';

export const Footer = () => {
  return (
    <footer className="bg-nana-blue py-16 flex flex-col rounded-t-[20px]">
      <div className="container flex flex-col md:flex-row w-full justify-between">
        <div className="w-full mr-0 md:mr-10 md:w-1/2">
          <div className="flex flex-col">
            <Image
              src="/logo-white.png"
              priority={true}
              width="0"
              height="0"
              sizes="100vw"
              className="w-[150px] h-[97px]"
              alt="Nana Food Delivery"
            />
            <div className="flex flex-col mt-5">
              <p className="text-lg text-white">
                Nana Delivers Delights: Your Favorites, Our Fast Delivery!
              </p>
              <div className="flex flex-col md:flex-row md:items-center mt-5 space-y-3 md:space-y-0 md:space-x-3">
                <ActionButton style="bg-black" type="ios" />
                <ActionButton style="bg-black" type="android" />
              </div>
            </div>
          </div>
          <div className="hidden mt-10 text-white">
            <p>@2024 Imagyne Ventures Limited</p>
          </div>
        </div>
        <div className="w-full mt-16 md:mt-0 md:w-1/2 flex flex-wrap md:flex-nowrap space-x-0 md:space-x-10 items-center">
          <div className="flex flex-col">
            <h1 className="text-3xl text-white font-bold mb-2">Company</h1>
            <ul>
              <li>
                <FooterLink link="/" label="About Nana" />
              </li>
              <li>
                <FooterLink link="/vendors" label="Become a vendor" />
              </li>
              <li>
                <FooterLink link="/company" label="Company" />
              </li>
              <li>
                <FooterLink link="/" label="Nana for business" />
              </li>
              <li>
                <FooterLink link="/privacy" label="Privacy Policy" />
              </li>
              <li>
                <FooterLink link="/terms" label="Terms of usage" />
              </li>
            </ul>
          </div>
          <div className="flex flex-col">
            <h1 className="text-3xl text-white font-bold mb-2">Cites</h1>
            <ul>
              <li>
                <FooterLink link="/" label="Food Delivery In Tarauni" />
              </li>
              <li>
                <FooterLink link="/" label="Food Delivery In MM way" />
              </li>
              <li>
                <FooterLink link="/" label="Food Delivery In Zoo road" />
              </li>
              <li>
                <FooterLink link="/" label="Food Delivery In Sabon Gari" />
              </li>
              <li>
                <FooterLink link="/" label="Food Delivery In Lamido Cresent" />
              </li>
              <li>
                <FooterLink link="/" label="Food Delivery In Kabuga" />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container my-12 flex flex-col-reverse md:flex-row w-full justify-between">
        <div>
          <p className="text-white mt-8 md:mt-0">
            ©All Rights Reserved 2024, Imagyne Ventures Limited.
          </p>
        </div>
        <div className="flex flex-row items-center space-x-3 font-bold justify-center">
          <a className="flex flex-row items-center">
            <FontAwesomeIcon
              className="w-4 h-4 text-nana-stone"
              icon={faSquare}
              size="lg"
              color="#fff"
            />
            <p className="text-white ml-1">Facebook</p>
          </a>
          <a className="flex flex-row items-center">
            <FontAwesomeIcon
              className="w-4 h-4 text-nana-purple"
              icon={faSquare}
              size="lg"
              color="#fff"
            />
            <p className="text-white ml-1">Instagram</p>
          </a>
          <a className="flex flex-row items-center">
            <FontAwesomeIcon
              className="w-4 h-4 text-nana-lime"
              icon={faSquare}
              size="lg"
              color="#fff"
            />
            <p className="text-white ml-1">Linkedin</p>
          </a>
        </div>
      </div>
    </footer>
  );
};

const FooterLink: React.FC<{ link: string; label: string }> = (props) => {
  return (
    <div className="text-white my-3 hover:underline text-lg">
      <Link href={props.link}>{props.label}</Link>
    </div>
  );
};
