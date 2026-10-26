'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import GooglePlay from '@/assets/google-play.svg';
import AppStore from '@/assets/app-store.svg';
import { track } from '@/lib/analytics';
import { api, CLIENT_API_BASE } from '@/lib/api/client';
import type { AmbassadorInvite } from '@/lib/api/ambassadors';

const PLAY_STORE_URL =
  'https://play.google.com/store/apps/details?id=com.nanaeats.nana_app&pcampaignid=web_share';
const APP_STORE_URL =
  'https://apps.apple.com/us/app/nana-delivery-more/id6499050428';

type Platform = 'android' | 'ios' | 'unknown';

function detectPlatform(): Platform {
  if (typeof navigator === 'undefined') return 'unknown';
  const ua = navigator.userAgent;
  if (/android/i.test(ua)) return 'android';
  if (/iphone|ipad|ipod/i.test(ua)) return 'ios';
  return 'unknown';
}

/**
 * /download, and /download/<code> for an ambassador's link: the same page and store
 * redirect, plus the ambassador's code when there's an invite.
 */
export function DownloadView({ invite = null }: { invite?: AmbassadorInvite | null }) {
  const [platform, setPlatform] = useState<Platform>('unknown');
  const [redirected, setRedirected] = useState(false);
  const [copied, setCopied] = useState(false);
  const clickId = useRef<string | null>(null);

  // The view is counted from the browser, so link previews (which don't run scripts) aren't.
  useEffect(() => {
    if (!invite) return;
    api<{ click_id: string | null }>(`a/${encodeURIComponent(invite.code)}/click`, { method: 'POST' })
      .then((res) => { clickId.current = res.click_id; })
      .catch(() => {});
  }, [invite]);

  // Copying the code or tapping a store button counts as a tap. sendBeacon survives the navigation.
  const tap = () => {
    if (!clickId.current) return;
    try { navigator.sendBeacon(`${CLIENT_API_BASE}/a/t/${encodeURIComponent(clickId.current)}`); } catch {}
  };

  const copyCode = async () => {
    if (!invite) return;
    try {
      await navigator.clipboard.writeText(invite.code);
      setCopied(true);
    } catch {}
    tap();
  };

  const placement = invite ? 'ambassador_download' : 'download_page';
  const storeClicked = (store: 'ios' | 'android') => {
    track('app_store_clicked', { platform: store, placement });
    tap();
  };

  useEffect(() => {
    const detected = detectPlatform();
    setPlatform(detected);

    if (detected === 'android' || detected === 'ios') {
      const timer = setTimeout(() => {
        setRedirected(true);
        track('app_store_clicked', {
          platform: detected,
          placement: invite ? 'ambassador_auto_redirect' : 'download_auto_redirect',
        });
        window.location.href =
          detected === 'android' ? PLAY_STORE_URL : APP_STORE_URL;
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, [invite]);

  const isAndroid = platform === 'android';
  const isIos = platform === 'ios';
  const isMobile = isAndroid || isIos;

  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-between px-6 py-10 md:py-16">

      <div className="flex flex-col mt-10 items-center text-center max-w-sm w-full gap-8">

        <div className="relative">
          <div className="w-24 h-24 rounded-[22px] overflow-hidden shadow-lg border border-gray-100 bg-[#469ADC] flex items-center justify-center">
            <Image
              src="/logo-blue.png"
              alt="Nana App"
              width={64}
              height={64}
              className="object-contain brightness-0 invert"
              priority
            />
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-white flex items-center justify-center">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Headline */}
        <div className="flex flex-col gap-3">
          <h1 className="text-[2rem] leading-tight font-bold text-gray-900 tracking-tight">
            {invite
              ? invite.first_name ? `${invite.first_name} invited you to Nana` : 'You’re invited to Nana'
              : isMobile && !redirected ? 'Taking you to the store…' : isMobile && redirected ? 'Opening store…' : 'Get the Nana app'}
          </h1>
          <p className="text-base text-gray-500 leading-relaxed">
            {isAndroid
              ? 'Download Nana on Google Play and start ordering food, groceries and more.'
              : isIos
              ? 'Download Nana on the App Store and start ordering food, groceries and more.'
              : 'Order food, groceries & packages delivered to your door. Available on Android and iOS.'}
          </p>
        </div>

        {invite && (
          <div className="w-full rounded-2xl border border-dashed border-[#AED5EF] bg-[#EEF6FC] p-4 flex flex-col gap-3">
            <p className="text-sm font-semibold text-gray-900">
              {invite.free_delivery ? 'Your code for free delivery on your first order' : 'Your invite code'}
            </p>
            <div className="flex items-center justify-center gap-3">
              <span className="text-[1.75rem] font-extrabold tracking-[0.12em] text-gray-900">{invite.code}</span>
              <button
                type="button"
                onClick={copyCode}
                className="rounded-full border-2 border-[#469ADC] px-4 py-1.5 text-sm font-bold text-[#469ADC]"
              >
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              In the app, open Account → Rewards &amp; promos and add it under “Have a code?” before your first order.
            </p>
          </div>
        )}

        {/* Redirect progress bar */}
        {isMobile && !redirected && (
          <div className="w-full bg-gray-100 rounded-full h-1 overflow-hidden">
            <div
              className="h-full bg-[#469ADC] rounded-full"
              style={{ animation: 'progress 1.8s linear forwards' }}
            />
          </div>
        )}

        {/* ── Store buttons ── */}
        <div className="flex flex-col items-center gap-3 w-full">

          {/* Primary button — Play Store (always first, except iOS) */}
          {!isIos && (
            <Link href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className="w-full" onClick={() => storeClicked('android')}>
              <div className="flex justify-center hover:transition-transform hover:duration-100 hover:scale-x-105 hover:scale-y-105">
                <Image
                  src={GooglePlay}
                  alt="Play store button"
                  priority={true}
                  className="object-contain w-36 cursor-pointer"
                  width={240}
                  height={68}
                />
              </div>
            </Link>
          )}

          {/* App Store button */}
          {!isAndroid && (
            <Link href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="w-full" onClick={() => storeClicked('ios')}>
              <div className="flex justify-center hover:transition-transform hover:duration-100 hover:scale-x-105 hover:scale-y-105">
                <Image
                  src={AppStore}
                  alt="App store"
                  priority={true}
                  className="object-contain w-36 cursor-pointer"
                  width={240}
                  height={68}
                />
              </div>
            </Link>
          )}

          {/* Secondary link for Android → App Store */}
          {isAndroid && (
            <Link href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="w-full" onClick={() => storeClicked('ios')}>
              <div className="flex justify-center hover:transition-transform hover:duration-100 hover:scale-x-105 hover:scale-y-105">
                <Image
                  src={AppStore}
                  alt="App store"
                  priority={true}
                  className="object-contain w-36 cursor-pointer"
                  width={240}
                  height={68}
                />
              </div>
            </Link>
          )}

          {/* Secondary link for iOS → Play Store */}
          {isIos && (
            <Link
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 underline underline-offset-2 mt-1"
              onClick={() => storeClicked('android')}
            >
              Also on Google Play
            </Link>
          )}
        </div>

        {/* Rating strip */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="#FACC15">
                <path d="M7 1l1.545 3.13 3.455.502-2.5 2.436.59 3.437L7 8.885l-3.09 1.62.59-3.437L2 4.632l3.455-.502L7 1z"/>
              </svg>
            ))}
          </div>
          <span className="text-sm text-gray-500">4.8 · 2,000+ downloads</span>
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="flex flex-col items-center gap-3 mt-10">
        <p className="text-xs text-gray-400 text-center">
          © {new Date().getFullYear()} Nana Delivery · All rights reserved
        </p>
        <div className="flex gap-4 text-xs text-gray-400">
          <Link href="/privacy" className="hover:text-gray-600 transition-colors">Privacy</Link>
          <Link href="/terms" className="hover:text-gray-600 transition-colors">Terms</Link>
        </div>
      </div>

      <style>{`
        @keyframes progress {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </main>
  );
}
