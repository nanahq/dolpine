"use client";

import React, {PropsWithChildren} from "react";
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import localFont from 'next/font/local'
import { Header } from "./Header";
import { Footer } from "./Footer";
import Analytics from "../analytics";
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'

if (typeof window !== 'undefined') {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as any, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
      person_profiles: 'identified_only',
      // Enable debug mode in development
      loaded: (posthog) => {
        if (process.env.NODE_ENV === 'development') posthog.debug()
      }
    })
  }
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


export const PageWrapper: React.FC<PropsWithChildren<any>> = (props) => {
    const router = useRouter()

    // useEffect(() => {
    //     // Track page views
    //     const handleRouteChange = () => posthog?.capture('$pageview')
    //     router.events.on('routeChangeComplete', handleRouteChange)

    //     return () => {
    //     router.events.off('routeChangeComplete', handleRouteChange)
    //     }
    // }, [])

    return (
      <PostHogProvider 
       client={posthog}
      >
        <div className={omnes.className}>
            <Header/>
            {props.children}
            <Footer/>
            <Analytics/>
        </div>
      </PostHogProvider>  
    )
}
