import React from 'react';
import Image from 'next/image';
import DropdownLinks from '../DropDownLink';
import Link from 'next/link';
import { AppStoreButtons } from '../AppStoreButtons';
import LogoWhite from '@/assets/logo-white.png';

interface FooterProps {}
export const Footer: React.FC<FooterProps> = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full bg-[#1E1E1E] p-4 md:p-9 text-white text-xs   ">
      <div className="flex flex-col gap-4 max-w-[90rem] mx-auto ">
        <div className="flex flex-col md:flex-row items-start w-full gap-10 md:items-stretch  md:justify-between">
          <div className="flex flex-col">
          <Image
                            priority={true}
                            className="object-contain"
                            src={require('@/assets/tranaparent-icon.png')}
                            alt="Nana logo"
                            width={100}
                            height={25}
                        />
            <AppStoreButtons className="!mt-5 !lg:mt-5 items-start md:items-center" />
          </div>
          <div className="flex-1 shrink-0 grid md:grid-cols-3 lg:grid-flow-col md:gap-6 gap-4 lg:gap-6">
            <DropdownLinks title="Partner with Nana">
              <Link href="https://vendors.trynanaapp.com/">
                <p className="hover:text-nana-blue hover:underline">
                  For Vendors
                </p>
              </Link>
              <Link href="https://courier.trynanaapp.com">
                <p className="hover:text-nana-blue hover:underline">
                  For Courier Partners
                </p>
              </Link>
              <Link href="https://courier.trynanaapp.com">
                <p className="hover:text-nana-blue hover:underline">
                  For Logistics Companies
                </p>
              </Link>
            </DropdownLinks>
            <DropdownLinks title="Company">
              <Link href="/about">
                <p className="hover:text-nana-blue hover:underline">About Us</p>
              </Link>
              <Link href="https://imagyne.notion.site/Open-positions-at-Imagyne-0c9edaa674db40ad8a78c232700a30dd">
                <p className="hover:text-nana-blue hover:underline">
                  Careers
                  <span className="text-xs ml-1 bg-nana-lime rounded-xl p-1 text-white">
                    Hiring
                  </span>
                </p>
              </Link>
              <Link href="/about">
                <p className="hover:text-nana-blue hover:underline">Team</p>
              </Link>
            </DropdownLinks>

            <DropdownLinks title="Follow Us">
              <Link href="https://trynanaapp.com/about">
                <p className="hover:text-nana-blue hover:underline">Blog</p>
              </Link>
              <Link href="https://www.instagram.com/nanahq_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==">
                <p className="hover:text-nana-blue hover:underline">
                  Instagram
                </p>
              </Link>
              <Link href="https://www.facebook.com/profile.php?id=61554441647404">
                <p className="hover:text-nana-blue hover:underline">Facebook</p>
              </Link>
              <Link href="https://ng.linkedin.com/company/nana-ng">
                <p className="hover:text-nana-blue hover:underline">Linkedin</p>
              </Link>
              <Link href="https://twitter.com/nana_app_hq">
                <p className="hover:text-nana-blue hover:underline">Twitter</p>
              </Link>
            </DropdownLinks>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <ul className="flex text-xs gap-2 md:gap-4">
            <Link href="/privacy">
              <p className="hover:text-nana-blue hover:underline">
                Privacy Statement
              </p>
            </Link>
            <Link href="/terms">
              <p className="hover:text-nana-blue hover:underline">
                Terms Of Usage
              </p>
            </Link>
            <Link href="/">
              <p className="hover:text-nana-blue hover:underline">Main Site</p>
            </Link>
          </ul>
          <p className="text-nana-stone">
            &copy; Nana - <span>{currentYear}</span>{' '}
          </p>
        </div>
      </div>
    </footer>
  );
};
