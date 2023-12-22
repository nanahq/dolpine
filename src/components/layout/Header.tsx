import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { ActionButton } from '@/components/ActionButton';
interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  const [showMobileNavbar, setShowMobileNavBar] = useState<boolean>(false);
  return (
    <div className="relative">
      <div className="fixed container top-2 left-0 w-full z-50 hidden md:flex  flex flex-row justify-center">
        <header className="bg-nana-blue container rounded-[20px]">
          <nav className="py-2">
            <div className="flex flex-row items-center justify-between w-full">
              <Link href="/" className="w-1/3">
                <div className="relative w-[80px] h-[52px]">
                  <Image
                    fill={true}
                    priority={true}
                    className="object-contain aspect-[25:16]"
                    src="/logo-white.png"
                    alt="Nana Food delivery logo"
                    sizes="100vw"
                  />
                </div>
              </Link>
              <div className="w-1/3 flex flex-row space-x-4 justify-center items-center">
                <HeaderLink link="vendors" label="Vendors" />
                <HeaderLink link="/" label="Riders" />
                <HeaderLink link="#faq" label="FAQ" />
              </div>
              <div className="flex w-1/3 flex-row space-x-4 justify-end items-center">
                <HeaderLink link="/" label="Company" />
                <HeaderLink link="/" label="Locations" />
              </div>
            </div>
          </nav>
        </header>
      </div>
      <header className="flex md:hidden container z-50 flex-row w-full justify-between fixed top-2 left-0 items-center">
        <div>
          <Link href="/">
            <div className="relative w-[80px] h-[52px] aspect-[25:16]">
              <Image
                fill={true}
                priority={true}
                className="object-contain aspect-[25:16]"
                src="/logo-blue.png"
                alt="Nana Food delivery logo"
                sizes="100vw"
              />
            </div>
          </Link>
        </div>
        <div>
          <button
            onClick={() => setShowMobileNavBar((prev) => !prev)}
            className="rounded-full w-16 h-16 bg-nana-blue p-4"
          >
            <FontAwesomeIcon icon={faBars} size="lg" color="#fff" />
          </button>
        </div>
      </header>
      {showMobileNavbar && (
        <div className="fixed top-0 left-0 w-full h-full bg-black z-[1000] overflow-y-auto scrollbar-hide transition-all -translate-x-[100%] translate-x-0">
          <div className="p-5 flex flex-col">
            <div className="flex mb-12 flex-row justify-between items-center">
              <div className="relative w-[80px] h-[52px] aspect-[25:16]">
                <Image
                  fill={true}
                  priority={true}
                  className="object-contain aspect-[25:16]"
                  src="/logo-blue.png"
                  alt="Nana Food delivery logo"
                  sizes="100vw"
                />
              </div>
              <button
                onClick={() => setShowMobileNavBar((prev) => !prev)}
                className="rounded-full w-14 h-14 bg-nana-blue p-4"
              >
                <FontAwesomeIcon icon={faXmark} size="xs" color="#fff" />
              </button>
            </div>
            <div className="my-10 flex flex-col">
              <div className="w-full flex flex-col space-y-5">
                <HeaderLink link="vendors" label="Vendors" />
                <HeaderLink link="/" label="Riders" />
                <HeaderLink link="#faq" label="FAQ" />
                <HeaderLink link="/" label="Company" />
                <HeaderLink link="/" label="Locations" />
              </div>
            </div>
            <div className="flex flex-col space-y-3">
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
      )}
    </div>
  );
};

const HeaderLink: React.FC<{ link: string; label: string }> = (props) => {
  return (
    <div className="text-white text-xl md:text-lg hover:text-black">
      <Link href={props.link}>{props.label}</Link>
    </div>
  );
};
