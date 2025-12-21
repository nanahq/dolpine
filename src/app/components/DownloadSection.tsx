'use client';

import React from 'react';
import Image from 'next/image';
import AppMockup from '@/assets/download-app.jpg';
import { AppStoreButtons } from './AppStoreButtons';
import { Smartphone, Download } from 'lucide-react';

const DownloadApp = () => {
  return (
    <section className="py-24 lg:py-32 bg-gradient-to-b from-white via-background-secondary to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #469ADC 1px, transparent 0)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-nana-blue/10 text-nana-blue px-4 py-2 rounded-md mb-6 border border-nana-blue/20">
              <Smartphone className="h-4 w-4" />
              <span className="text-sm font-semibold">Download Now</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight">
              Get the Nana App
            </h2>
            
            <p className="text-xl text-text-secondary mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Get the Nana app and choose from 1500+ restaurants and hundreds of stores around. 
              Discover and get what you want – our courier partners bring it to you.
            </p>

            {/* Features List */}
            <div className="space-y-5 mb-10 text-left max-w-md mx-auto lg:mx-0">
              <div className="flex items-start gap-4 group">
                <div className="w-8 h-8 bg-gradient-to-br from-nana-blue to-[#3a7bc8] rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform shadow-md">
                  <div className="w-2.5 h-2.5 bg-white rounded-sm"></div>
                </div>
                <span className="text-text-secondary text-base pt-1">Order from your favorite restaurants</span>
              </div>
              <div className="flex items-start gap-4 group">
                <div className="w-8 h-8 bg-gradient-to-br from-nana-blue to-[#3a7bc8] rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform shadow-md">
                  <div className="w-2.5 h-2.5 bg-white rounded-sm"></div>
                </div>
                <span className="text-text-secondary text-base pt-1">Shop groceries and daily essentials</span>
              </div>
              <div className="flex items-start gap-4 group">
                <div className="w-8 h-8 bg-gradient-to-br from-nana-blue to-[#3a7bc8] rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform shadow-md">
                  <div className="w-2.5 h-2.5 bg-white rounded-sm"></div>
                </div>
                <span className="text-text-secondary text-base pt-1">Track orders in real-time</span>
              </div>
            </div>

            <div className="flex justify-center lg:justify-start">
              <AppStoreButtons className="!flex-row items-center gap-4" />
            </div>
          </div>

          {/* Image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              {/* Decorative Elements */}
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-nana-blue/10 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-nana-blue/10 rounded-full blur-2xl"></div>
              
              <div className="relative">
                <Image
                  src={AppMockup}
                  alt="Nana Mobile App"
                  width={400}
                  height={800}
                  className="rounded-md border-4 border-white shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadApp;
