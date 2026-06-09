'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import GooglePlay from '@/assets/google-play.svg';
import AppStore from '@/assets/app-store.svg';

const ANDROID_PACKAGE = 'com.nanaeats.nana_app';
const PLAY_STORE_URL = `https://play.google.com/store/apps/details?id=${ANDROID_PACKAGE}`;
const APP_STORE_URL = 'https://apps.apple.com/us/app/nana-delivery-more/id6499050428';

function toDeepLink(path: string): string {
  // /merchant/abc123 → nanadelivery://merchant/abc123
  return `nanadelivery:/${path}`;
}

function toIntentUrl(path: string, fallback: string): string {
  return `intent:/${path}#Intent;scheme=nanadelivery;package=${ANDROID_PACKAGE};S.browser_fallback_url=${encodeURIComponent(fallback)};end`;
}

function getPlatform(): 'ios' | 'android' | 'unknown' {
  const ua = navigator.userAgent;
  if (/android/i.test(ua)) return 'android';
  if (/iphone|ipad|ipod/i.test(ua)) return 'ios';
  return 'unknown';
}

type State = 'launching' | 'not_installed' | 'unsupported';

function OpenPageContent() {
  const searchParams = useSearchParams();
  const to = searchParams.get('to') || '/';
  const [state, setState] = useState<State>('launching');

  useEffect(() => {
    const platform = getPlatform();

    if (platform === 'unknown') {
      setState('unsupported');
      return;
    }

    let appOpened = false;

    const onHide = () => { appOpened = true; };
    document.addEventListener('visibilitychange', onHide);
    window.addEventListener('pagehide', onHide);

    const fallback = `https://trynanaapp.com${to}`;

    if (platform === 'android') {
      window.location.href = toIntentUrl(to, PLAY_STORE_URL);
    } else {
      window.location.href = toDeepLink(to);
    }

    const timer = setTimeout(() => {
      document.removeEventListener('visibilitychange', onHide);
      window.removeEventListener('pagehide', onHide);
      if (!appOpened) setState('not_installed');
    }, 2500);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('visibilitychange', onHide);
      window.removeEventListener('pagehide', onHide);
    };
  }, [to]);

  if (state === 'launching') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-white px-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-orange-400 border-t-transparent rounded-full animate-spin" />
        </div>
        <div>
          <p className="text-lg font-semibold text-gray-900">Opening Nana…</p>
          <p className="text-sm text-gray-500 mt-1">Launching the app for you</p>
        </div>
      </div>
    );
  }

  if (state === 'unsupported') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-white px-6 text-center">
        <p className="text-lg font-semibold text-gray-900">Open this link on your phone</p>
        <p className="text-sm text-gray-500">Download the Nana app to continue.</p>
        <div className="flex flex-col gap-3 items-center">
          <Link href={APP_STORE_URL} target="_blank">
            <Image src={AppStore} alt="App Store" width={140} height={42} />
          </Link>
          <Link href={PLAY_STORE_URL} target="_blank">
            <Image src={GooglePlay} alt="Google Play" width={140} height={42} />
          </Link>
        </div>
      </div>
    );
  }

  // not_installed
  const platform = typeof window !== 'undefined' ? getPlatform() : 'unknown';
  const storeUrl = platform === 'ios' ? APP_STORE_URL : PLAY_STORE_URL;
  const storeLabel = platform === 'ios' ? 'App Store' : 'Google Play';
  const storeImage = platform === 'ios' ? AppStore : GooglePlay;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-white px-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center text-3xl">
        🍔
      </div>
      <div>
        <p className="text-xl font-bold text-gray-900">Get the Nana app</p>
        <p className="text-sm text-gray-500 mt-2">
          Download the app to view this and order from your favourite restaurants.
        </p>
      </div>
      <Link href={storeUrl} target="_blank">
        <Image src={storeImage} alt={storeLabel} width={160} height={48} priority />
      </Link>
    </div>
  );
}

export default function OpenPage() {
  return (
    <Suspense>
      <OpenPageContent />
    </Suspense>
  );
}
