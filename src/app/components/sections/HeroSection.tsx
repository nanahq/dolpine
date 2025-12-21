'use client';

import React from 'react';
import { Search, ArrowRight, Clock, MapPin, Shield, Zap, CheckCircle } from 'lucide-react';
import { AppStoreButtons } from '../AppStoreButtons';

export default function HeroSection() {
  return (
    <section className="relative w-full bg-gradient-to-br from-nana-blue via-[#3a7bc8] to-nana-blue overflow-hidden min-h-[95vh] flex items-center">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-white/3 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 w-full z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Main Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md text-white px-5 py-2.5 rounded-md mb-8 border border-white/25 shadow-lg">
              <Zap className="h-4 w-4" />
              <span className="text-sm font-bold">Lightning Fast Delivery</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-[1.05] tracking-tight">
              <span className="block">Get anything</span>
              <span className="block bg-gradient-to-r from-white via-white/95 to-white/90 bg-clip-text text-transparent">
                delivered to your door
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-xl sm:text-2xl text-white/95 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Order from your favorite restaurants, groceries, and stores. 
              Fast, reliable delivery in minutes.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto lg:mx-0 mb-10">
              <div className="relative flex items-center bg-white rounded-md overflow-hidden shadow-2xl border-2 border-white/20">
                <div className="absolute left-5 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-text-tertiary" />
                </div>
                <input
                  type="text"
                  placeholder="Search restaurants, groceries, or stores..."
                  className="w-full pl-14 pr-36 py-6 text-base text-text-primary placeholder-text-tertiary focus:outline-none font-medium"
                />
                <button className="absolute right-2 bg-nana-blue text-white px-8 py-4 rounded-md font-bold hover:bg-[#3a7bc8] transition-all flex items-center gap-2 shadow-lg hover:shadow-xl">
                  Search
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-8 mb-10 justify-center lg:justify-start">
              <div className="flex items-center gap-3 text-white">
                <div className="w-3 h-3 bg-white rounded-full shadow-lg"></div>
                <div>
                  <div className="font-black text-2xl">1500+</div>
                  <div className="text-white/80 text-sm">Restaurants</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-white">
                <div className="w-3 h-3 bg-white rounded-full shadow-lg"></div>
                <div>
                  <div className="font-black text-2xl">15min</div>
                  <div className="text-white/80 text-sm">Avg Delivery</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-white">
                <div className="w-3 h-3 bg-white rounded-full shadow-lg"></div>
                <div>
                  <div className="font-black text-2xl">24/7</div>
                  <div className="text-white/80 text-sm">Available</div>
                </div>
              </div>
            </div>

            {/* App Store Buttons */}
            <div className="flex justify-center lg:justify-start mb-10">
              <AppStoreButtons className="!flex-row items-center gap-4" />
            </div>
          </div>

          {/* Right Column - Floating Cards */}
          <div className="hidden lg:flex relative h-[600px] items-center justify-center">
            {/* Floating Card 1 - Top Right */}
            <div className="absolute top-8 right-0 bg-white p-6 rounded-md shadow-2xl border border-border-light z-20 animate-float w-[220px]">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-nana-blue to-[#3a7bc8] rounded-md flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-text-tertiary font-semibold mb-1 uppercase tracking-wide">Delivery Time</div>
                  <div className="text-2xl font-black text-text-primary">15 min</div>
                  <div className="text-xs text-semantic-success font-semibold mt-1 flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    Fastest
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Card 2 - Bottom Left */}
            <div className="absolute bottom-8 left-0 bg-white p-6 rounded-md shadow-2xl border border-border-light z-20 animate-float-delayed w-[220px]">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-semantic-success to-[#05a855] rounded-md flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-text-tertiary font-semibold mb-1 uppercase tracking-wide">Secure</div>
                  <div className="text-2xl font-black text-text-primary">100% Safe</div>
                  <div className="text-xs text-semantic-success font-semibold mt-1 flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    Verified
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Card 3 - Center Right */}
            <div className="absolute top-1/2 right-8 transform -translate-y-1/2 bg-white p-6 rounded-md shadow-2xl border border-border-light z-20 animate-float w-[220px]" style={{ animationDelay: '1s' }}>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-nana-lime to-[#3dd16a] rounded-md flex items-center justify-center flex-shrink-0 shadow-lg">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-text-tertiary font-semibold mb-1 uppercase tracking-wide">Track Live</div>
                  <div className="text-2xl font-black text-text-primary">Real-time</div>
                  <div className="text-xs text-semantic-success font-semibold mt-1 flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    Live Updates
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Card 4 - Top Left */}
            <div className="absolute top-20 left-8 bg-white p-6 rounded-md shadow-2xl border border-border-light z-20 animate-float-delayed w-[220px]" style={{ animationDelay: '0.5s' }}>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#F0B323] to-[#d99a1a] rounded-md flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-text-tertiary font-semibold mb-1 uppercase tracking-wide">Speed</div>
                  <div className="text-2xl font-black text-text-primary">Lightning</div>
                  <div className="text-xs text-semantic-success font-semibold mt-1 flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    Ultra Fast
                  </div>
                </div>
              </div>
            </div>

            {/* Center Decorative Element */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

