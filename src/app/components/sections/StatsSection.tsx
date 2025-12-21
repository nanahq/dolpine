'use client';

import React from 'react';

const stats = [
  {
    value: '1500+',
    label: 'Restaurants & Stores',
    description: 'Wide selection of vendors',
  },
  {
    value: '50K+',
    label: 'Happy Customers',
    description: 'Trusted by thousands',
  },
  {
    value: '15min',
    label: 'Average Delivery',
    description: 'Lightning fast service',
  },
  {
    value: '24/7',
    label: 'Available',
    description: 'Always here for you',
  },
];

export default function StatsSection() {
  return (
    <section className="py-16 lg:py-20 bg-gradient-to-r from-nana-blue via-[#3a7bc8] to-nana-blue text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="text-5xl sm:text-6xl lg:text-7xl font-black mb-3 bg-gradient-to-b from-white to-white/80 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                {stat.value}
              </div>
              <div className="text-lg sm:text-xl font-bold mb-2">
                {stat.label}
              </div>
              <div className="text-sm text-white/70">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

