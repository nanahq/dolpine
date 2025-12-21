'use client';

import React from 'react';
import { Search, ShoppingCart, CreditCard, Package, ArrowRight } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Browse & Search',
    description: 'Search through thousands of restaurants, stores, and vendors in your area.',
  },
  {
    number: '02',
    icon: ShoppingCart,
    title: 'Add to Cart',
    description: 'Select your favorite items and customize your order to your preferences.',
  },
  {
    number: '03',
    icon: CreditCard,
    title: 'Secure Payment',
    description: 'Pay securely using multiple payment options including cards, bank transfer, or wallet.',
  },
  {
    number: '04',
    icon: Package,
    title: 'Track & Receive',
    description: 'Track your order in real-time and receive it at your doorstep in minutes.',
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #469ADC 1px, transparent 0)',
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-block bg-nana-blue/10 text-nana-blue px-4 py-2 rounded-md mb-4 text-sm font-semibold">
            Simple Process
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight">
            How It Works
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Getting started is simple. Follow these easy steps to get your order delivered.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connection Line - Desktop Only */}
          <div className="hidden lg:block absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-nana-blue/20 via-nana-blue/30 to-nana-blue/20 -z-10"></div>

          {steps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === steps.length - 1;
            return (
              <div key={index} className="relative">
                {/* Step Card */}
                <div className="bg-white rounded-md p-8 text-center hover:bg-nana-blue/5 transition-all border-2 border-border-light hover:border-nana-blue/30 group">
                  {/* Step Number */}
                  <div className="text-7xl font-black text-nana-blue/5 mb-4 group-hover:text-nana-blue/10 transition-colors">
                    {step.number}
                  </div>

                  {/* Icon Container */}
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-nana-blue to-[#3a7bc8] rounded-md flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform">
                      <Icon className="h-10 w-10 text-white" />
                    </div>
                    {/* Pulse Effect */}
                    <div className="absolute inset-0 w-20 h-20 bg-nana-blue/20 rounded-md mx-auto animate-ping opacity-0 group-hover:opacity-100"></div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-text-primary mb-3 group-hover:text-nana-blue transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed text-base">
                    {step.description}
                  </p>
                </div>

                {/* Arrow - Desktop Only */}
                {!isLast && (
                  <div className="hidden lg:block absolute top-20 -right-3 z-10">
                    <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center border-2 border-nana-blue/30 shadow-md">
                      <ArrowRight className="h-3 w-3 text-nana-blue" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

