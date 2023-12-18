import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  return (
    <div className="relative">
      <div className="fixed container top-2 left-0 w-full z-50 hidden md:flex  flex flex-row justify-center">
        <header className="bg-nana-blue container rounded-[20px]">
          <nav className="py-2">
            <div className="flex flex-row items-center justify-between w-full">
              <div className="w-1/3">
                <div className="relative w-[80px] h-[52px]">
                  <Image
                    fill={true}
                    priority={true}
                    className="object-contain aspect-[25:16]"
                    src="/logo-white.png"
                    alt="Nana Food delivery logo"
                  />
                </div>
              </div>
              <div className="w-1/3 flex flex-row space-x-4 justify-center items-center">
                <HeaderLink link="vendors" label="Vendors" />
                <HeaderLink link="riders" label="Riders" />
                <HeaderLink link="locations" label="Locations" />
              </div>
              <div className="flex w-1/3 flex-row space-x-4 justify-end items-center">
                <HeaderLink link="company" label="Company" />
                <HeaderLink link="faq" label="FAQ" />
              </div>
            </div>
          </nav>
        </header>
      </div>
      <header className="flex md:hidden container z-50 flex-row w-full justify-between fixed top-2 left-0 items-center">
        <div>
          <div className="relative w-[80px] h-[52px] aspect-[25:16]">
            <Image
              fill={true}
              priority={true}
              className="object-contain aspect-[25:16]"
              src="/logo-blue.png"
              alt="Nana Food delivery logo"
            />
          </div>
        </div>
        <div>
          <button className="rounded-full w-16 h-16 bg-nana-blue p-4">
            <FontAwesomeIcon icon={faBars} size="lg" color="#fff" />
          </button>
        </div>
      </header>
    </div>
  );
};

const HeaderLink: React.FC<{ link: string; label: string }> = (props) => {
  return (
    <div className="text-white text-lg hover:text-black">
      <Link href={props.link}>{props.label}</Link>
    </div>
  );
};
