"use client";
import React, {PropsWithChildren} from "react";
import localFont from 'next/font/local'
import { Header } from "./Header";
import { Footer } from "./Footer";
import Analytics from "../analytics";
const omnes = localFont({
    src: [
        {
            path: '../../../assets/fonts/nana-font.otf',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../../../assets/fonts/nana-font-bold.otf',
            weight: '700',
            style: 'normal',
        }
    ],
})
interface Page {
    seo?: {
        description?: string;
        title?: string;
    };
}
interface PageWrapperProps {
    location?: string;
    defaultTitle?: string;
    page?: Page;
}
export const PageWrapper: React.FC<PropsWithChildren<PageWrapperProps>> = (props) => {
    return (
            <div className={omnes.className}>
                <Header/>
                {props.children}
                <Footer/>
                <Analytics/>
            </div>
    )
}
