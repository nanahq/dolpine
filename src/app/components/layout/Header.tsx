import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import LogoBlue from "@/assets/logo-blue.png"

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

useEffect(() => {
    const scrollHandler = () => {
        setIsScrolled(window.scrollY <= 20);
    };
    window.addEventListener("scroll", scrollHandler);

    scrollHandler();

    return () => {
        window.removeEventListener("scroll", scrollHandler);
    };
}, []);


    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header
            className={`w-full p-4 lg:px-9 dark:bg-black bg-white dark:text-white fixed top-0 z-10 transition-shadow duration-300 z-50 ${
                !isScrolled &&
                "bg-white dark:bg-black bg-opacity-80 dark:bg-opacity-80 backdrop-blur-md dark:backdrop-blur-md drop-shadow-md transition duration-1000"
            }`}
        >
            <div className="flex justify-between items-center lg:max-w-[90rem] mx-auto">
                <div>
                    <Link href="/">
                        <Image
                            priority={true}
                            className="object-contain"
                            src = {LogoBlue}
                            alt="Nana logo"
                            width={62}
                            height="34"
                        />
                    </Link>
                </div>
                <nav className="hidden lg:flex gap-4 text-sm font-normal transition duration-300">
                    <ul className="flex gap-4 ">
                        <li className="hover:font-bold hover:text-nana-blue transition-transform delay-0 duration-500 ease-in hover:translate-y-0.5">
                            <Link href="/">For Couriers</Link>
                        </li>
                        <li className="hover:font-bold hover:text-nana-blue transition-transform delay-0 duration-500 ease-in hover:translate-y-0.5">
                            <Link href="/">For Merchants</Link>
                        </li>
                        <li className="hover:font-bold hover:text-nana-blue transition-transform delay-0 duration-500 ease-in hover:translate-y-0.5">
                            <Link href="#">Nana Box</Link>
                        </li>
                        <li className="hover:font-bold hover:text-nana-blue transition-transform delay-0 duration-500 ease-in hover:translate-y-0.5">
                            <Link href="#">Nana Businesses</Link>
                        </li>
                    </ul>
                </nav>
                <div className="lg:hidden flex items-center gap-2">
                    <div className="hidden md:flex text-sm">
                        <div className="hover:font-bold hover:text-nana-blue transition-transform delay-0 duration-500 ease-in hover:translate-y-0.5">
                            <Link href="/">Vendors</Link>
                        </div>
                    </div>
                    <button onClick={toggleMenu}>
                        <svg
                            width="800px"
                            height="800px"
                            viewBox="0 0 28 28"
                            fill="none"
                            className="size-8"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M4 7C4 6.44771 4.44772 6 5 6H24C24.5523 6 25 6.44771 25 7C25 7.55229 24.5523 8 24 8H5C4.44772 8 4 7.55229 4 7Z"
                                fill="#000000"
                                className="dark:fill-white"
                            />
                            <path
                                d="M4 13.9998C4 13.4475 4.44772 12.9997 5 12.9997L16 13C16.5523 13 17 13.4477 17 14C17 14.5523 16.5523 15 16 15L5 14.9998C4.44772 14.9998 4 14.552 4 13.9998Z"
                                fill="#000000"
                                className="dark:fill-white"
                            />
                            <path
                                d="M5 19.9998C4.44772 19.9998 4 20.4475 4 20.9998C4 21.552 4.44772 21.9997 5 21.9997H22C22.5523 21.9997 23 21.552 23 20.9998C23 20.4475 22.5523 19.9998 22 19.9998H5Z"
                                fill="#000000"
                                className="dark:fill-white"
                            />
                        </svg>
                    </button>
                </div>
                <div className="hidden lg:flex text-sm font-normal transition duration-300">
                    <div className="hover:font-bold transition-transform delay-0 duration-500 ease-in hover:translate-y-0.5">
                        <Link href="/" className="hover:text-nana-blue">
                            Jobs
                        </Link>
                    </div>
                </div>
            </div>

            {isMenuOpen && (
                <nav className="lg:hidden bg-opacity-0 transition-all duration-500">
                    <ul className="flex flex-col items-center m-4 gap-4 text-sm font-normal">
                        <li className="hover:font-bold transition-transform delay-0 duration-500 ease-in hover:translate-y-0.5">
                            <Link
                                href="https://courier.trynanaapp.com/"
                                className="hover:text-nana-blue"
                            >
                                For Couriers
                            </Link>
                        </li>
                        <li className="hover:font-bold hover:text-nana-blue transition-transform delay-0 duration-150 ease-in hover:translate-y-0.5">
                            <Link href="/">
                                For Vendor
                            </Link>
                        </li>
                    </ul>
                </nav>
            )}
        </header>
    );
};
