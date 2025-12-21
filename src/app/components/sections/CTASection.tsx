'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { AppStoreButtons } from '../AppStoreButtons';

export default function CTASection() {
  return (
    <section className="py-24 lg:py-32 bg-gradient-to-br from-nana-blue via-[#3a7bc8] to-nana-blue text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          Ready to get started?
        </h2>
        <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
          Download the Nana app today and experience fast, reliable delivery at your fingertips.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <AppStoreButtons className="!flex-row items-center gap-4" />
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center items-center gap-6 text-white/80">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <span>No hidden fees</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <span>Secure payments</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <span>24/7 support</span>
          </div>
        </div>
      </div>
    </section>
  );
}

