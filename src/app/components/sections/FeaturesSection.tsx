'use client';

import React from 'react';
import { Clock, MapPin, Shield, Zap, Package, Store } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Get your orders delivered in minutes, not hours. We prioritize speed without compromising quality.',
  },
  {
    icon: MapPin,
    title: 'Real-Time Tracking',
    description: 'Track your order from the moment you place it until it arrives at your doorstep.',
  },
  {
    icon: Shield,
    title: 'Secure Payments',
    description: 'Multiple payment options with bank-level security. Your transactions are safe with us.',
  },
  {
    icon: Store,
    title: 'Wide Selection',
    description: 'Choose from thousands of restaurants, grocery stores, and local vendors in your area.',
  },
  {
    icon: Package,
    title: 'Parcel Delivery',
    description: 'Send or receive packages quickly and reliably. We handle everything from documents to large items.',
  },
  {
    icon: Clock,
    title: '24/7 Availability',
    description: 'Order anytime, day or night. We\'re always here when you need us.',
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-24 lg:py-32 bg-background-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-block bg-nana-blue/10 text-nana-blue px-4 py-2 rounded-md mb-4 text-sm font-semibold">
            Why Choose Us
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight">
            Everything you need,<br />
            <span className="text-nana-blue">delivered fast</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Experience the future of delivery with features designed to make your life easier
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group bg-white p-8 rounded-md border border-border-light hover:border-nana-blue/30 transition-all hover:bg-nana-blue/5 relative overflow-hidden"
              >
                {/* Accent Line */}
                <div className="absolute top-0 left-0 w-1 h-full bg-nana-blue opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-nana-blue/20 to-nana-blue/10 rounded-md flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="h-8 w-8 text-nana-blue" />
                  </div>
                  <h3 className="text-2xl font-bold text-text-primary mb-3 group-hover:text-nana-blue transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed text-base">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

